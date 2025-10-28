# CARDINAL API Documentation

---

> Last updated 2025-10-28T08:20:24.054Z

## Type Aliases

### CardinalDirectionCrudeType

```ts
type CardinalDirectionCrudeType = 'north' | 'south' | 'west' | 'east';
```

Defined in: [main.ts:34](https://github.com/phun-ky/cardinal/blob/main/src/main.ts#L34)

---

### CardinalDirectionDetailedType

```ts
type CardinalDirectionDetailedType =
  | 'north'
  | 'north-east'
  | 'north-west'
  | 'north-north-east'
  | 'north-north-west'
  | 'south'
  | 'south-east'
  | 'south-west'
  | 'south-south-east'
  | 'south-south-west'
  | 'west'
  | 'north-west'
  | 'south-west'
  | 'west-south-west'
  | 'west-north-west'
  | 'east'
  | 'north-east'
  | 'south-east'
  | 'east-south-east'
  | 'east-north-east';
```

Defined in: [main.ts:2](https://github.com/phun-ky/cardinal/blob/main/src/main.ts#L2)

---

### CardinalDirectionType

```ts
type CardinalDirectionType =
  | 'east'
  | 'south-east'
  | 'south'
  | 'south-west'
  | 'west'
  | 'north-west'
  | 'north'
  | 'north-east';
```

Defined in: [main.ts:24](https://github.com/phun-ky/cardinal/blob/main/src/main.ts#L24)

## Functions

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

---

**Contributing**

Want to contribute? Please read the [CONTRIBUTING.md](https://github.com/phun-ky/cardinal/blob/main/CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](https://github.com/phun-ky/cardinal/blob/main/CODE_OF_CONDUCT.md)

**Sponsor me**

I'm an Open Source evangelist, creating stuff that does not exist yet to help get rid of secondary activities and to enhance systems already in place, be it documentation or web sites.

The sponsorship is an unique opportunity to alleviate more hours for me to maintain my projects, create new ones and contribute to the large community we're all part of :)

[Support me on GitHub Sponsors](https://github.com/sponsors/phun-ky).

---

This project created by [Alexander Vassbotn Røyne-Helgesen](http://phun-ky.net) is licensed under a [MIT License](https://choosealicense.com/licenses/mit/).
