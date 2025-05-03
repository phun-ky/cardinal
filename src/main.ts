/* eslint-disable import/no-unused-modules */
export type CardinalDirectionDetailedType =
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

export type CardinalDirectionType =
  | 'east'
  | 'south-east'
  | 'south'
  | 'south-west'
  | 'west'
  | 'north-west'
  | 'north'
  | 'north-east';

export type CardinalDirectionCrudeType = 'north' | 'south' | 'west' | 'east';

/**
 * Returns the detailed 16-point cardinal direction based on degrees.
 * Note: 0 degrees is EAST, increasing clockwise.
 *
 * @param {number} degrees - The angle in degrees.
 * @throws {RangeError} Parameter cannot exceed 360.
 * @throws {RangeError} Parameter cannot be lower than 0.
 * @returns {string} - The 16-point cardinal direction.
 * @example
 * ```ts
 * const direction = cardinalDirectionDetailed(101.25); // "south-south-east"
 * ```
 */
export const cardinalDirectionDetailed = (
  degrees: number
): CardinalDirectionDetailedType => {
  if (degrees > 360) throw new RangeError('Parameter cannot exceed 360');

  if (degrees < 0) throw new RangeError('Parameter cannot be lower than 0');

  const directions: CardinalDirectionDetailedType[] = [
    'east',
    'east-south-east',
    'south-east',
    'south-south-east',
    'south',
    'south-south-west',
    'south-west',
    'west-south-west',
    'west',
    'west-north-west',
    'north-west',
    'north-north-west',
    'north',
    'north-north-east',
    'north-east',
    'east-north-east'
  ];
  // Each direction covers 22.5°, so we divide the angle accordingly
  const index = Math.floor(((degrees + 11.25) % 360) / 22.5);

  return directions[index];
};

/**
 * Returns the 8-point cardinal direction based on degrees.
 * Note: 0 degrees is EAST, increasing clockwise.
 *
 * @param {number} degrees - The angle in degrees.
 * @throws {RangeError} Parameter cannot exceed 360.
 * @throws {RangeError} Parameter cannot be lower than 0.
 * @returns {string} - The 8-point cardinal direction.
 * @example
 * ```ts
 * const direction = cardinalDirection(135); // "south"
 * ```
 */
export const cardinalDirection = (degrees: number): CardinalDirectionType => {
  if (degrees > 360) throw new RangeError('Parameter cannot exceed 360');

  if (degrees < 0) throw new RangeError('Parameter cannot be lower than 0');

  const directions: CardinalDirectionType[] = [
    'east',
    'south-east',
    'south',
    'south-west',
    'west',
    'north-west',
    'north',
    'north-east'
  ];
  // Each direction covers 45°, so we divide accordingly
  const index = Math.floor(((degrees + 22.5) % 360) / 45);

  return directions[index];
};

/**
 * Returns the crude 4-point cardinal direction based on degrees.
 * Note: 0 degrees is EAST, increasing clockwise.
 *
 * @param {number} degrees - The angle in degrees.
 * @throws {RangeError} Parameter cannot exceed 360.
 * @throws {RangeError} Parameter cannot be lower than 0.
 * @returns {string} - The 4-point cardinal direction.
 * @example
 * ```ts
 * const direction = cardinalDirectionCrude(200); // "west"
 * ```
 */
export const cardinalDirectionCrude = (
  degrees: number
): CardinalDirectionCrudeType => {
  if (degrees > 360) throw new RangeError('Parameter cannot exceed 360');

  if (degrees < 0) throw new RangeError('Parameter cannot be lower than 0');

  const directions: CardinalDirectionCrudeType[] = [
    'east',
    'south',
    'west',
    'north'
  ];
  // Each direction covers 90°, so we divide accordingly
  const index = Math.floor(((degrees + 45) % 360) / 90);

  return directions[index];
};
