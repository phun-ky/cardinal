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
    - [cardinal_direction()](#cardinal_direction)
      - [Parameters](#parameters)
      - [Returns](#returns)
      - [Throws](#throws)
      - [Throws](#throws-1)
      - [Example](#example)
    - [cardinal_direction_crude()](#cardinal_direction_crude)
      - [Parameters](#parameters-1)
      - [Returns](#returns-1)
      - [Throws](#throws-2)
      - [Throws](#throws-3)
      - [Example](#example-1)
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

```ts
import { cardinal_direction } from '@phun-ky/cardinal';

const direction = cardinal_direction(45);
```

```ts
import { cardinal_direction_crude } from '@phun-ky/cardinal';

const direction = cardinal_direction_crude(45);
```

## API

### cardinal_direction()

```ts
function cardinal_direction(degrees): string;
```

Defined in: main.ts:18

Gives you the cardinal direction based on degrees.
Note: The degrees start at 0, which is EAST (originally, north should be 0, but here, north is 270),
and we travel clockwise.

#### Parameters

| Parameter | Type     | Description           |
| --------- | -------- | --------------------- |
| `degrees` | `number` | The angle in degrees. |

#### Returns

`string`

- The cardinal direction.

#### Throws

Parameter cannot exceed 360.

#### Throws

Parameter cannot be lower than 0.

#### Example

```ts
// Get the cardinal direction for an angle in degrees
const direction = cardinal_direction(45);
```

---

### cardinal_direction_crude()

```ts
function cardinal_direction_crude(degrees): string;
```

Defined in: main.ts:57

Gives you the cardinal direction based on degrees (crude version).
Note: The degrees start at 0, which is EAST (originally, north should be 0, but here, north is 270),
and we travel clockwise.

#### Parameters

| Parameter | Type     | Description           |
| --------- | -------- | --------------------- |
| `degrees` | `number` | The angle in degrees. |

#### Returns

`string`

- The cardinal direction (NSEW).

#### Throws

Parameter cannot exceed 360.

#### Throws

Parameter cannot be lower than 0.

#### Example

```ts
// Get the cardinal direction (crude) for an angle in degrees
const direction = cardinal_direction_crude(45);
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
