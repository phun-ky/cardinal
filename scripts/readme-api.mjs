// Copy the functions from the TypeDoc output (docs/api/README.md) into the
// README, between the api:start and api:end markers, so the README's API
// section always matches the source. Links to the type aliases point at the
// API docs. With --check, generate the docs into a temporary directory and
// fail if the README differs instead of writing it.
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const README = join(ROOT, 'README.md');
const DOCS_URL =
  'https://github.com/phun-ky/cardinal/blob/main/docs/api/README.md';
const START =
  '<!-- api:start: generated from docs/api/README.md by npm run docs:gen -->';
const END = '<!-- api:end -->';
const check = process.argv.includes('--check');
const work = check ? mkdtempSync(join(tmpdir(), 'cardinal-docs-')) : undefined;

try {
  if (work) {
    execFileSync(
      join(ROOT, 'node_modules', '.bin', 'typedoc'),
      ['--out', work],
      {
        cwd: ROOT,
        stdio: ['ignore', 'ignore', 'inherit']
      }
    );
  }

  const docs = readFileSync(
    join(work ?? join(ROOT, 'docs', 'api'), 'README.md'),
    'utf8'
  );
  const functions = docs.match(
    /^## Functions\n\n([\s\S]*?)\n\n---\n\n\*\*Contributing\*\*/m
  );

  if (!functions) {
    console.error('docs/api/README.md has no "## Functions" section.');
    process.exit(1);
  }

  const section = functions[1].replace(
    /\]\(#(cardinal[a-z]*type)\)/g,
    `](${DOCS_URL}#$1)`
  );
  const readme = readFileSync(README, 'utf8');
  const [before, rest] = readme.split(START);
  const after = rest?.split(END)[1];

  if (after === undefined) {
    console.error(`README.md needs the markers ${START} and ${END}.`);
    process.exit(1);
  }

  const updated = `${before}${START}\n\n${section}\n\n${END}${after}`;

  if (!check) writeFileSync(README, updated);
  else if (updated !== readme) {
    console.error(
      'The API section in README.md is out of date. Run npm run docs:gen.'
    );
    process.exit(1);
  } else console.log('README.md API section matches the source.');
} finally {
  if (work) rmSync(work, { recursive: true, force: true });
}
