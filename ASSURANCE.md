# Assurance Case

Why the [security expectations](SECURITY.md#security-expectations) of
`@phun-ky/cardinal` hold, what they rest on, and where they don't hold yet. It
is kept short because the package is small: three pure functions, no runtime
dependencies, and a build and release pipeline.

## What is being protected

- **Users of the package:** their applications must get a direction name, or a
  clear error, from the functions, and nothing else: no network, file system or
  global side effects, no code run from input.
- **The published package:** what users install from npm must be exactly what
  this repository built, with nothing added on the way.
- **The repository and its release pipeline:** the source, the workflows and the
  credentials that publish releases.

## Threat model

| Threat                               | Where                                    | How it is countered                                                                                                                                                                                                                |
| ------------------------------------ | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A tampered or substituted release    | npm                                      | Releases are built and published only from GitHub Actions with npm trusted publishing (no long-lived token) and carry Sigstore-signed provenance, verifiable with `npm audit signatures`; each GitHub release has a CycloneDX SBOM |
| A malicious or vulnerable dependency | Development dependencies, GitHub Actions | No runtime dependencies; `npm audit` blocks releases on high or critical runtime advisories; dependency review blocks pull requests; Dependabot proposes updates weekly after a 14-day cooldown; Actions are pinned to commit SHAs |
| A malicious change to the source     | Pull requests                            | Pull requests only, with required checks (lint, typecheck, tests, packaging, API docs, dependency review, CodeQL, the DCO) on `main`; no force pushes or deletion of `main`                                                        |
| Abuse of CI credentials              | Workflows                                | Read-only default permissions in every workflow, write only per job; pull requests from forks get no secrets; no untrusted value is interpolated into a script; secret scanning with push protection                               |
| Unexpected input                     | Callers of the functions                 | Angles below 0 or above 360 throw a `RangeError`; any other input gives a listed direction or `undefined`, never another value; the remaining gaps are listed under [Known gaps](#known-gaps)                                      |

## Trust boundaries

1. **Caller to the functions:** the argument comes from the application, which
   may pass user input. Each function compares it with 0 and 360, does
   arithmetic on it, and uses the result as an index into a fixed list of
   direction names. It keeps no state and calls nothing outside itself.
2. **Repository to npm:** only the publish workflow, after a merge to `main` and
   the release guard, can publish, through npm trusted publishing.
3. **npm to the user:** the user's package manager fetches the package;
   provenance and the npm registry's integrity hashes link it to this repository
   and build.

## Secure design principles

- **Economy of mechanism:** three functions of a few lines each, with no
  options.
- **Fail-safe defaults:** angles outside 0 to 360 throw instead of returning a
  value.
- **Least privilege:** the functions have no side effects; CI tokens are
  read-only by default and write only where a job needs it.
- **Open design:** everything is public, including the release pipeline and this
  document.
- **No dynamic code:** no `eval`, `new Function` or loading of code.
- **Minimal dependencies:** no runtime dependencies; `check:pack` fails a build
  that bundles or imports an undeclared one.

## Common weaknesses countered

| Weakness                                           | Status                                                                                                               |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| CWE-94 code injection                              | No dynamic code anywhere in the package                                                                              |
| CWE-1321 prototype pollution                       | No objects are built from input; the index into the direction list is a number, so no other property can be returned |
| CWE-20 improper input validation                   | The range is checked; the type is not (see below)                                                                    |
| CWE-829 inclusion from an untrusted control sphere | No runtime dependencies, provenance on releases, Actions pinned to SHAs                                              |
| CWE-494 download of code without integrity check   | npm verifies integrity hashes; releases carry signed provenance                                                      |

The prototype pollution and input claims were checked by calling the built
functions 600,000 times with numbers in and out of range, numeric and other
strings (including `"constructor"`, `"__proto__"` and `"length"`), arrays,
objects with `valueOf`, `null`, `undefined`, booleans, `NaN`, `-0` and BigInts:
every call returned a listed direction or `undefined`, or threw a `RangeError`,
or, for a BigInt, the `TypeError` JavaScript throws when mixing BigInts and
numbers.

## Known gaps

- **Type checks:** the functions don't check that the angle is a number.
  `NaN`, `undefined` and strings that aren't numbers return `undefined`, a
  numeric string such as `"90"` returns a wrong direction, and `null` returns
  `"east"`. Type checks are planned for 4.0
  ([#112](https://github.com/phun-ky/cardinal/issues/112)).
- **One maintainer:** pull requests by the maintainer get no second review, and
  access to the repository and the package rests on one person; see
  [governance](GOVERNANCE.md#continuity).
- **Tags are not signed;** releases are verified through npm provenance instead.
