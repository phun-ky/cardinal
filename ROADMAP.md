# Roadmap

What cardinal intends to do, and not do, from October 2026 to October 2027.
It's a plan, not a promise: priorities can change, and changes to this file are
made in pull requests like any other. Individual pieces of work are tracked as
[GitHub issues](https://github.com/phun-ky/cardinal/issues), grouped in
milestones.

## Planned

### Keeping 3.x stable

The three functions work in Node.js, bundlers, browsers and TypeScript, and
every release is checked by installing the packed package, calling it from each
entry point and running every documented example. Until 4.0:

- **No breaking changes in 3.x.** The current major is supported as a whole and
  the previous one gets high and critical security fixes for 6 months; see the
  [security policy](SECURITY.md#supported-versions).
- **Deprecations before removals:** a deprecated API keeps working through one
  full major.

### 4.0

Changes that break callers, collected in the
[4.0 milestone](https://github.com/phun-ky/cardinal/milestone/5) with an
upgrading guide ([#114](https://github.com/phun-ky/cardinal/issues/114)):

- **Input checks:** a `TypeError` for values that aren't numbers, and for
  `NaN`, instead of `undefined` or a wrong direction
  ([#112](https://github.com/phun-ky/cardinal/issues/112)).
- **Node.js 22.12 or later** in `engines`, the first version where `require()`
  loads ES modules ([#113](https://github.com/phun-ky/cardinal/issues/113)).

### Project health

- **OpenSSF Best Practices:** the passing badge, then silver and OSPS Baseline
  ([#111](https://github.com/phun-ky/cardinal/issues/111)).
- **TypeScript 7**, once the tools the build and docs depend on support it
  ([#99](https://github.com/phun-ky/cardinal/issues/99)).
- **A second maintainer**, so that pull requests get a review from someone other
  than the author and access to the project doesn't rest on one person; see
  [governance](GOVERNANCE.md#continuity).

## Considered, not scheduled

Ideas that fit the project but have no decision yet. Each is discussed in an
issue first.

- **0° as north.** Today 0° is east and angles increase clockwise, so 90° is
  south. Compass bearings start at north; changing it would change every
  result, so it can only come in a major
  ([#112](https://github.com/phun-ky/cardinal/issues/112)).
- **Wrapping angles outside 0 to 360** (for example 450° as 90°) instead of
  throwing a `RangeError`
  ([#112](https://github.com/phun-ky/cardinal/issues/112)).

## Not planned

- **Runtime dependencies.** The package has none, and a new one would need a
  strong reason; see the [security policy](SECURITY.md#dependencies).
- **Collecting data.** The package doesn't collect, store or send data anywhere.
- **Provenance files on GitHub releases** to raise OpenSSF Scorecard's
  Signed-Releases score. Every npm release carries signed provenance; see
  [verifying releases](SECURITY.md#verifying-releases).
