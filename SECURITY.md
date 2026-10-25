# Security Policy

`@phun-ky/cardinal` has no runtime dependencies: the published package is three
functions and their types. Development dependencies are used to build, test and
release it; how they are chosen, tracked and kept clear of known
vulnerabilities is described under [Dependencies](#dependencies).

## Supported Versions

Support follows the major version:

| Release                  | Supported                                      |
| ------------------------ | ---------------------------------------------- |
| `3.x`, the current major | ✅                                             |
| `2.x`                    | High and critical fixes until 13 November 2026 |
| `1.x`                    | ❌                                             |

- **The current major is supported as a whole.** Fixes are released as a new
  patch or minor of it, and upgrading within a major never breaks your code.
- **The previous major gets fixes for high and critical vulnerabilities for 6
  months** after the next major is released, as a patch on its latest release.
  3.0.0 was released on 13 May 2026.
- **Security comes before the deprecation grace period.** If a vulnerability
  can't be fixed without breaking an API, the fix may change or remove it in a
  patch or minor release instead of waiting for a major. The change is kept as
  small as possible, and the advisory and the release notes say what changed and
  why.

To get a fix, upgrade to the newest release of your major.

## Reporting a Vulnerability

Report vulnerabilities privately, either with GitHub's
[private vulnerability reporting](https://github.com/phun-ky/cardinal/security/advisories/new)
or by email to <security@phun-ky.net>. Please don't open a public issue for a
security problem.

## How Reports Are Handled

1. **Acknowledgement:** you'll get a reply within 7 days confirming the report
   was received.
2. **Assessment:** the maintainer reproduces the issue and judges its severity,
   and may ask you for details.
3. **Fix:** a fix is developed in a private GitHub security advisory and
   released as a new version. The aim is a fix within 30 days for serious
   issues.
4. **Disclosure:** the advisory is published when the fix is released, with a
   CVE where one applies. Please keep the issue private until then.
5. **Credit:** reporters are credited in the advisory and the release notes,
   unless they ask to stay anonymous.

## Security Expectations

`cardinalDirection()`, `cardinalDirectionCrude()` and
`cardinalDirectionDetailed()` are pure functions: each takes an angle in degrees
and returns a direction name.

What you can rely on:

- **No side effects.** They read nothing and write nothing outside their
  argument: no network, no file system, no globals, no data collection.
- **No dynamic code.** No `eval`, `new Function` or loading of code, and no
  runtime dependencies.
- **Range checks.** An angle above 360, `Infinity` included, throws a
  `RangeError`, and so does an angle below 0, `-Infinity` included.
- **Releases are traceable.** Every release is built and published from GitHub
  Actions, with signed provenance (see below).

What you can't rely on:

- **Type checks.** The functions don't check that the angle is a number.
  `NaN`, `undefined` and strings that aren't numbers return `undefined`; a
  numeric string such as `"90"` returns a wrong direction (`"east"`), and `null`
  returns `"east"`. Check the input when it comes from users. Stricter checks
  are planned for 4.0
  ([#112](https://github.com/phun-ky/cardinal/issues/112)).

## Verifying Releases

Every release is published from GitHub Actions with npm trusted publishing, and
carries a signed provenance attestation (Sigstore) that links it to the commit
and workflow run that built it. To verify the package you've installed:

```sh
npm audit signatures
```

The provenance must name the repository `phun-ky/cardinal` and the workflow
`.github/workflows/publish.yml`. The package's page on npm shows this under
"Provenance", and `npm view @phun-ky/cardinal@<version> dist.attestations` lists
the attestations.

Each GitHub release since 3.0.6 also has a software bill of materials attached,
in CycloneDX format (`cardinal-<version>.cdx.json`). With no runtime
dependencies, it lists the package itself.

## Dependencies

**Choosing them.** The package has no runtime dependencies, and adding one is
discussed in an issue first. A runtime dependency would be declared in
`dependencies` and kept external, never bundled into the build;
`npm run check:pack` fails a build that breaks this rule. It must be widely
used, actively maintained and under an OSI-approved licence compatible with MIT;
strong copyleft licences (GPL, AGPL) are not accepted. Development dependencies
follow the same rules, judged more loosely.

**Obtaining them.** Packages come only from the npm registry, with exact
versions locked in `package-lock.json` and installed with `npm ci` in CI. GitHub
Actions are pinned to commit SHAs.

**Tracking them.** Dependabot proposes version updates weekly, only for versions
published at least 14 days earlier, and security updates as soon as an
advisory is published. Every pull request runs
[dependency review](https://github.com/phun-ky/cardinal/blob/main/.github/workflows/dependency-review.yml),
and every release runs `npm audit` on runtime dependencies first.

**Fixing known vulnerabilities.** Findings are checked against the GitHub
Advisory Database:

| Finding                    | Where                  | What happens                                                                                     |
| -------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------ |
| Critical or high           | Runtime dependency     | Blocks merging (dependency review) and releasing (`npm audit`); fixed and released within 7 days |
| Critical or high           | Development dependency | Blocks merging when introduced; an existing one is fixed within 30 days                          |
| Moderate or low            | Any dependency         | Fixed with the next update, within 90 days                                                       |
| Licence outside the policy | New runtime dependency | Not merged                                                                                       |

**Accepted exceptions.** A vulnerability that can't be fixed yet and can't be
exploited through this project is allowed in dependency review and listed here.
Each one is removed as soon as a fix is reachable:

| Advisory                                                                       | Package      | Why it is accepted                                                                                                                                                                               | Remove when                                               |
| ------------------------------------------------------------------------------ | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| [GHSA-238p-pmpm-9mq7](https://github.com/advisories/GHSA-238p-pmpm-9mq7) (low) | `katex` 0.16 | Development only, through `eslint-config-phun-ky` > `@eslint/markdown` > `micromark-extension-math`. ESLint loads katex but never calls it: lint parses Markdown and never renders math to HTML. | `micromark-extension-math` allows `katex` 0.18.2 or later |

## Code Scanning

CodeQL analyses every pull request and every push to `main`. The ruleset on
`main` blocks merging while CodeQL reports an error, or a security alert of high
or critical severity. Other CodeQL alerts are fixed within 90 days, or dismissed
with the reason when they are false positives. OpenSSF Scorecard runs on every
push to `main`, with results at
<https://scorecard.dev/viewer/?uri=github.com/phun-ky/cardinal>.

## Secrets

The project keeps as few secrets as possible:

| Secret          | Used by       | For                                                   |
| --------------- | ------------- | ----------------------------------------------------- |
| `GH_TOKEN`      | `publish.yml` | Pushing release commits and tags, and GitHub releases |
| `CODECOV_TOKEN` | `check.yml`   | Uploading coverage reports                            |

Publishing to npm needs no secret: it uses short-lived OIDC tokens from GitHub.

- **Storage:** secrets are kept only as encrypted GitHub Actions secrets, never
  in the repository. Secret scanning with push protection blocks commits that
  contain one.
- **Access:** only the maintainer can view or change them, and they are not
  available to workflows run from forks.
- **Rotation:** at least once a year, and immediately if one may have been
  exposed.
