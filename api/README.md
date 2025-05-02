# CARDINAL API Documentation

---

> Last updated 2025-05-02T20:50:00.349Z

## Functions

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

---

**Contributing**

Want to contribute? Please read the [CONTRIBUTING.md](https://github.com/phun-ky/cardinal/blob/main/CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](https://github.com/phun-ky/cardinal/blob/main/CODE_OF_CONDUCT.md)

**Sponsor me**

I'm an Open Source evangelist, creating stuff that does not exist yet to help get rid of secondary activities and to enhance systems already in place, be it documentation or web sites.

The sponsorship is an unique opportunity to alleviate more hours for me to maintain my projects, create new ones and contribute to the large community we're all part of :)

[Support me on GitHub Sponsors](https://github.com/sponsors/phun-ky).

---

This project created by [Alexander Vassbotn Røyne-Helgesen](http://phun-ky.net) is licensed under a [MIT License](https://choosealicense.com/licenses/mit/).
