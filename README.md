# @phun-ky/cardinal

![Cardinal: A snippet that gives you the cardinal direction based on degrees](./public/cardinal-logo-small.png)

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](http://makeapullrequest.com) [![SemVer 2.0](https://img.shields.io/badge/SemVer-2.0-green.svg)](http://semver.org/spec/v2.0.0.html) ![npm version](https://img.shields.io/npm/v/@phun-ky/cardinal) ![issues](https://img.shields.io/github/issues/phun-ky/cardinal) ![license](https://img.shields.io/npm/l/@phun-ky/cardinal) ![size](https://img.shields.io/bundlephobia/min/@phun-ky/cardinal) ![npm](https://img.shields.io/npm/dm/%40phun-ky/cardinal) ![GitHub Repo stars](https://img.shields.io/github/stars/phun-ky/cardinal) [![codecov](https://codecov.io/gh/phun-ky/cardinal/graph/badge.svg?token=VA91DL7ZLZ)](https://codecov.io/gh/phun-ky/cardinal) [![build](https://github.com/phun-ky/cardinal/actions/workflows/check.yml/badge.svg)](https://github.com/phun-ky/cardinal/actions/workflows/check.yml)

## About

A snippet that gives you the cardinal direction based on degrees

## Table of Contents<!-- omit from toc -->

- [@phun-ky/cardinal](#phun-kycardinal)
  - [About](#about)
  - [Installation](#installation)
  - [Usage](#usage)
  - [API](#api)
    - [cardinalDirection()](#cardinaldirection)
      - [Parameters](#parameters)
      - [Returns](#returns)
      - [Throws](#throws)
      - [Throws](#throws-1)
      - [Example](#example)
    - [cardinalDirectionCrude()](#cardinaldirectioncrude)
      - [Parameters](#parameters-1)
      - [Returns](#returns-1)
      - [Throws](#throws-2)
      - [Throws](#throws-3)
      - [Example](#example-1)
    - [cardinalDirectionDetailed()](#cardinaldirectiondetailed)
      - [Parameters](#parameters-2)
      - [Returns](#returns-2)
      - [Throws](#throws-4)
      - [Throws](#throws-5)
      - [Example](#example-2)
  - [Contributing](#contributing)
  - [License](#license)
  - [Changelog](#changelog)
  - [Sponsor me](#sponsor-me)
  - [Attributions](#attributions)

## Installation

```shell-session
npm i --save @phun-ky/cardinal
```

## Usage

With the default function:

```ts
import { cardinalDirection } from '@phun-ky/cardinal';

const direction = cardinalDirection(45);
console.log(direction); // south-east
```

Or with the crude function:

```ts
import { cardinalDirectionCrude } from '@phun-ky/cardinal';

const direction = cardinalDirectionCrude(45);
console.log(direction); // south
```

Or with the detailed function:

```ts
import { cardinalDirectionDetailed } from '@phun-ky/cardinal';

const direction = cardinalDirectionDetailed(56.25);
console.log(direction); // south-south-east
```

## API

### cardinalDirection()

```ts
function cardinalDirection(degrees): CardinalDirectionType;
```

Defined in: [main.ts:93](https://github.com/phun-ky/cardinal/blob/main/src/main.ts#L93)

Returns the 8-point cardinal direction based on degrees.
Note: 0 degrees is EAST, increasing clockwise.

#### Parameters

| Parameter | Type     | Description           |
| --------- | -------- | --------------------- |
| `degrees` | `number` | The angle in degrees. |

#### Returns

[`CardinalDirectionType`](#cardinaldirectiontype)

- The 8-point cardinal direction.

#### Throws

Parameter cannot exceed 360.

#### Throws

Parameter cannot be lower than 0.

#### Example

```ts
const direction = cardinalDirection(135); // "south"
```

---

### cardinalDirectionCrude()

```ts
function cardinalDirectionCrude(degrees): CardinalDirectionCrudeType;
```

Defined in: [main.ts:127](https://github.com/phun-ky/cardinal/blob/main/src/main.ts#L127)

Returns the crude 4-point cardinal direction based on degrees.
Note: 0 degrees is EAST, increasing clockwise.

#### Parameters

| Parameter | Type     | Description           |
| --------- | -------- | --------------------- |
| `degrees` | `number` | The angle in degrees. |

#### Returns

[`CardinalDirectionCrudeType`](#cardinaldirectioncrudetype)

- The 4-point cardinal direction.

#### Throws

Parameter cannot exceed 360.

#### Throws

Parameter cannot be lower than 0.

#### Example

```ts
const direction = cardinalDirectionCrude(200); // "west"
```

---

### cardinalDirectionDetailed()

```ts
function cardinalDirectionDetailed(degrees): CardinalDirectionDetailedType;
```

Defined in: [main.ts:49](https://github.com/phun-ky/cardinal/blob/main/src/main.ts#L49)

Returns the detailed 16-point cardinal direction based on degrees.
Note: 0 degrees is EAST, increasing clockwise.

#### Parameters

| Parameter | Type     | Description           |
| --------- | -------- | --------------------- |
| `degrees` | `number` | The angle in degrees. |

#### Returns

[`CardinalDirectionDetailedType`](#cardinaldirectiondetailedtype)

- The 16-point cardinal direction.

#### Throws

Parameter cannot exceed 360.

#### Throws

Parameter cannot be lower than 0.

#### Example

```ts
const direction = cardinalDirectionDetailed(101.25); // "south-south-east"
```

## Contributing

Want to contribute? Please read the [CONTRIBUTING.md](https://github.com/phun-ky/cardinal/blob/main/CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](https://github.com/phun-ky/cardinal/blob/main/CODE_OF_CONDUCT.md)

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/phun-ky/cardinal/blob/main/LICENSE) file for details.

## Changelog

See the [CHANGELOG.md](https://github.com/phun-ky/cardinal/blob/main/CHANGELOG.md) for details on the latest updates.

## Sponsor me

I'm an Open Source evangelist, creating stuff that does not exist yet to help get rid of secondary activities and to enhance systems already in place, be it documentation or web sites.

The sponsorship is an unique opportunity to alleviate more hours for me to maintain my projects, create new ones and contribute to the large community we're all part of :)

[Support me on GitHub Sponsors](https://github.com/sponsors/phun-ky).

p.s. **Ukraine is still under brutal Russian invasion. A lot of Ukrainian people are hurt, without shelter and need help**. You can help in various ways, for instance, directly helping refugees, spreading awareness, putting pressure on your local government or companies. You can also support Ukraine by donating e.g. to [Red Cross](https://www.icrc.org/en/donate/ukraine), [Ukraine humanitarian organisation](https://savelife.in.ua/en/donate-en/#donate-army-card-weekly) or [donate Ambulances for Ukraine](https://www.gofundme.com/f/help-to-save-the-lives-of-civilians-in-a-war-zone).

## Attributions

Compass by Justicon from <a href="https://thenounproject.com/browse/icons/term/compass/" target="_blank" title="Compass Icons">Noun Project</a> (CC BY 3.0)
