// Check what npm would publish: pack the package, check the tarball holds the
// files package.json points at, its LICENSE and README, and no tests, lint it
// with publint and @arethetypeswrong/cli, then install it in an empty project,
// check every source map resolves, and call every function through import,
// require and a browser bundle. It also checks that the build bundles no
// dependencies. Run after `npm run build`.
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { rollup } from 'rollup';

import { execFileSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const BIN = join(ROOT, 'node_modules', '.bin');
/** Run a linter; return its output if it fails. */
const lint = (command, args) => {
  try {
    execFileSync(join(BIN, command), args, {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: 'pipe'
    });

    return undefined;
  } catch (error) {
    return `${error.stdout ?? ''}${error.stderr ?? ''}`.trim();
  }
};
// A bare package name after from, import( or require(
const IMPORT =
  /(?:\bfrom\s*|\bimport\s*\(?\s*|\brequire\s*\(\s*)["']([^"'.][^"']*)["']/g;
/** Every .map file under dir. */
const mapsIn = (dir) =>
  readdirSync(dir, { recursive: true })
    .filter((file) => file.endsWith('.map'))
    .map((file) => join(dir, file));
const npm = (args, cwd) =>
  execFileSync('npm', args, {
    cwd,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'inherit']
  });
/** Every file path a package.json points at, without the leading ./ */
const entryPoints = (pkg) => {
  const paths = [];
  const collect = (value) => {
    if (typeof value === 'string') paths.push(value);
    else if (value && typeof value === 'object')
      Object.values(value).forEach(collect);
  };

  collect(pkg.exports);
  collect(pkg.main);
  collect(pkg.module);
  collect(pkg.types);

  // Subpath patterns such as ./dist/* are not files
  return paths
    .filter((path) => !path.includes('*'))
    .map((path) => path.replace(/^\.\//, ''));
};
// What every way of loading the package must return
const EXPECTED = {
  cardinalDirection: [45, 'south-east'],
  cardinalDirectionCrude: [45, 'south'],
  cardinalDirectionDetailed: [56.25, 'south-south-east']
};
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
const work = mkdtempSync(join(tmpdir(), 'cardinal-pack-'));
const problems = [];

try {
  const output = JSON.parse(
    npm(['pack', '--json', '--pack-destination', work], ROOT)
  );
  // An array in npm 11, an object keyed by package name in npm 12
  const packed = Array.isArray(output) ? output[0] : Object.values(output)[0];
  const files = new Set(packed.files.map((file) => file.path));

  // npm adds LICENSE and README.md on its own, if the package has them
  for (const path of [...entryPoints(pkg), 'LICENSE', 'README.md']) {
    if (!files.has(path)) problems.push(`${path} is not in the tarball`);
  }

  for (const path of files) {
    if (/(^|\/)__tests__\/|\.tsbuildinfo$/.test(path)) {
      problems.push(`${path} should not be published`);
    }
  }

  const tarball = join(work, packed.filename);
  // ES modules only: require() of it needs Node 22.12 or later
  const types = lint('attw', ['--profile', 'esm-only', tarball]);
  const publint = lint('publint', ['--strict', tarball]);

  if (types) problems.push(`@arethetypeswrong/cli:\n${types}`);

  if (publint) problems.push(`publint:\n${publint}`);

  console.log(
    `${pkg.name}@${pkg.version}: ${files.size} files, ${packed.size} bytes`
  );

  if (problems.length === 0) {
    const app = join(work, 'app');
    const installed = join(app, 'node_modules', pkg.name);

    mkdirSync(app);
    writeFileSync(
      join(app, 'package.json'),
      '{ "name": "app", "private": true }\n'
    );
    npm(
      [
        'install',
        '--no-audit',
        '--no-fund',
        '--ignore-scripts',
        '--prefer-offline',
        tarball
      ],
      app
    );

    // Runtime dependencies are declared, never bundled: the build may not
    // contain code from node_modules, and every package it imports must be a
    // dependency.
    const declared = new Set([
      ...Object.keys(pkg.dependencies ?? {}),
      ...Object.keys(pkg.peerDependencies ?? {})
    ]);
    const builds = new Set(
      entryPoints(pkg).filter(
        (path) => path.endsWith('.js') && existsSync(join(installed, path))
      )
    );

    for (const file of builds) {
      const code = readFileSync(join(installed, file), 'utf8');
      const map = `${join(installed, file)}.map`;
      const inlined = existsSync(map)
        ? JSON.parse(readFileSync(map, 'utf8')).sources.filter((source) =>
            source.includes('node_modules/')
          )
        : [];
      const imported = [...code.matchAll(IMPORT)]
        .map(([, specifier]) => specifier)
        .filter((specifier) => !specifier.startsWith('node:'))
        .map((specifier) =>
          specifier
            .split('/')
            .slice(0, specifier.startsWith('@') ? 2 : 1)
            .join('/')
        );

      for (const source of inlined) {
        problems.push(
          `${file} inlines ${source}; declare it in dependencies and keep it external`
        );
      }

      for (const name of new Set(imported)) {
        if (!declared.has(name))
          problems.push(`${file} imports ${name}, which isn't in dependencies`);
      }
    }

    // A map resolves when the source it points at is published next to it,
    // or its content is embedded (sourcesContent)
    for (const map of mapsIn(installed)) {
      const { sources, sourcesContent = [] } = JSON.parse(
        readFileSync(map, 'utf8')
      );

      sources.forEach((source, index) => {
        const resolves =
          typeof sourcesContent[index] === 'string' ||
          (!source.includes('node_modules/') &&
            existsSync(join(dirname(map), source)));

        if (!resolves) {
          problems.push(
            `${relative(installed, map)} points at ${source}, which isn't published or embedded`
          );
        }
      });
    }

    const expect = `
      const EXPECTED = ${JSON.stringify(EXPECTED)};
      const check = (how, module) => {
        for (const [name, [degrees, direction]] of Object.entries(EXPECTED)) {
          if (typeof module?.[name] !== 'function') throw new Error(how + ': ' + name + ' is ' + typeof module?.[name]);
          const value = module[name](degrees);
          if (value !== direction) throw new Error(how + ': ' + name + '(' + degrees + ') gave ' + value);
        }
        console.log(how + ': all ' + Object.keys(EXPECTED).length + ' functions return the expected directions');
      };
    `;
    const name = JSON.stringify(pkg.name);
    const smokes = {
      'ES module import': [
        '--input-type=module',
        '-e',
        `${expect} check('import', await import(${name}));`
      ],
      // require(esm): works on the Node running this, which is 22.12 or later
      'CommonJS require': [
        '--input-type=commonjs',
        '--no-warnings',
        '-e',
        `${expect} check('require', require(${name}));`
      ]
    };

    for (const [how, args] of Object.entries(smokes)) {
      try {
        execFileSync('node', args, { cwd: app, stdio: 'inherit' });
      } catch {
        problems.push(`${how} of the installed tarball failed`);
      }
    }

    // Every example in the README and in the JSDoc (shipped in the .d.ts)
    // runs against the installed tarball, and each value it logs or assigns
    // must match the comment after it: `const x = f(1); // "east"`
    const examples = new Map();
    const readme = readFileSync(join(ROOT, 'README.md'), 'utf8');
    const declarations = readFileSync(
      join(installed, pkg.types.replace(/^\.\//, '')),
      'utf8'
    );

    for (const [, code] of readme.matchAll(/```(?:ts|js)\n([\s\S]*?)```/g))
      examples.set(code, 'README.md');

    for (const [, code] of declarations.matchAll(/```ts\n([\s\S]*?)\s*\* ```/g))
      examples.set(code.replace(/^\s*\* ?/gm, ''), pkg.types);

    const RESULT = /^(.*?);?\s*\/\/\s*"?([\w-]+)"?\s*$/;
    let ran = 0;

    for (const [code, file] of examples) {
      const lines = code.split('\n');

      if (!lines.some((line) => RESULT.test(line))) continue;

      const checked = lines.map((line) => {
        const [, statement, expected] = line.match(RESULT) ?? [];

        if (!statement) return line;

        const logged = statement.match(/^console\.log\((.*)\)$/);
        const assigned = statement.match(/^const (\w+) = (.*)$/);
        const value = logged?.[1] ?? assigned?.[1];

        if (!value) return line;

        return `${assigned ? `${statement};\n` : ''}if (${value} !== ${JSON.stringify(expected)}) throw new Error(${JSON.stringify(`${file}: ${line.trim()}`)} + ' gives ' + ${value});`;
      });
      const imports = code.includes('import ')
        ? ''
        : `import { ${Object.keys(EXPECTED).join(', ')} } from ${name};\n`;
      const example = join(app, `example-${ran++}.mjs`);

      writeFileSync(example, `${imports}${checked.join('\n')}\n`);

      try {
        execFileSync('node', [example], { cwd: app, stdio: 'pipe' });
      } catch (error) {
        problems.push(
          `an example doesn't do what its comment says: ${String(error.stderr).match(/Error: (.*)/)?.[1] ?? error}`
        );
      }
    }

    if (ran === 0) problems.push('no examples found in README.md or the types');
    else console.log(`examples: ${ran} run against the installed tarball`);

    // A browser bundler resolving the package from the app
    try {
      const entry = join(app, 'entry.js');

      writeFileSync(
        entry,
        `import * as cardinal from ${name};\nglobalThis.result = Object.fromEntries(Object.entries(${JSON.stringify(EXPECTED)}).map(([name, [degrees]]) => [name, cardinal[name](degrees)]));\n`
      );

      const bundle = await rollup({
        input: entry,
        plugins: [nodeResolve({ browser: true, rootDir: app })]
      });
      const { output } = await bundle.generate({ format: 'iife' });
      const sandbox = {};

      await bundle.close();
      runInNewContext(output[0].code, sandbox);

      for (const [fn, [degrees, direction]] of Object.entries(EXPECTED)) {
        if (sandbox.result?.[fn] !== direction)
          throw new Error(`${fn}(${degrees}) gave ${sandbox.result?.[fn]}`);
      }

      console.log(
        'browser bundle: all functions return the expected directions'
      );
    } catch (error) {
      problems.push(
        `a browser bundle of the installed tarball failed: ${error}`
      );
    }
  }
} finally {
  rmSync(work, { recursive: true, force: true });
}

if (problems.length > 0) {
  console.error('\nThe package would not publish correctly:\n');
  for (const problem of problems) console.error(`  - ${problem}`);
  console.error(
    '\nCheck "files" in package.json, and run npm run build first.'
  );
  process.exit(1);
}

console.log(`\n${pkg.name} packs, installs, and works from every entry point.`);
