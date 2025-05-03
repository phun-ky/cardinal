import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  cardinalDirection,
  cardinalDirectionCrude,
  cardinalDirectionDetailed
} from '../main';

describe('Cardinal Direction Functions', () => {
  it('throws RangeError if degrees < 0', () => {
    assert.throws(() => cardinalDirectionDetailed(-1), {
      name: 'RangeError',
      message: 'Parameter cannot be lower than 0'
    });
  });

  it('throws RangeError if degrees > 360', () => {
    assert.throws(() => cardinalDirectionDetailed(361), {
      name: 'RangeError',
      message: 'Parameter cannot exceed 360'
    });
  });

  it('returns correct direction for all 16 segments', () => {
    const cases = [
      [0, 'east'],
      [11.24, 'east'],
      [11.25, 'east-south-east'],
      [33.74, 'east-south-east'],
      [33.75, 'south-east'],
      [56.24, 'south-east'],
      [56.25, 'south-south-east'],
      [78.74, 'south-south-east'],
      [78.75, 'south'],
      [101.24, 'south'],
      [101.25, 'south-south-west'],
      [123.74, 'south-south-west'],
      [123.75, 'south-west'],
      [146.24, 'south-west'],
      [146.25, 'west-south-west'],
      [168.74, 'west-south-west'],
      [168.75, 'west'],
      [191.24, 'west'],
      [191.25, 'west-north-west'],
      [213.74, 'west-north-west'],
      [213.75, 'north-west'],
      [236.24, 'north-west'],
      [236.25, 'north-north-west'],
      [258.74, 'north-north-west'],
      [258.75, 'north'],
      [281.24, 'north'],
      [281.25, 'north-north-east'],
      [303.74, 'north-north-east'],
      [303.75, 'north-east'],
      [326.24, 'north-east'],
      [326.25, 'east-north-east'],
      [348.74, 'east-north-east'],
      [348.75, 'east'],
      [360, 'east']
    ];

    for (const [deg, expected] of cases) {
      assert.equal(
        cardinalDirectionDetailed(deg as number),
        expected,
        `Failed for ${deg}`
      );
    }
  });
  it('cardinalDirection should return the cardinal direction based on degrees', () => {
    // Test cases for cardinalDirection
    const direction1 = cardinalDirection(45);
    const direction2 = cardinalDirection(135);
    const direction3 = cardinalDirection(225);
    const direction4 = cardinalDirection(315);

    assert.equal(direction1, 'south-east');
    assert.equal(direction2, 'south-west');
    assert.equal(direction3, 'north-west');
    assert.equal(direction4, 'north-east');
  });

  it('cardinalDirectionCrude should return the cardinal direction based on degrees (crude)', () => {
    // Test cases for cardinalDirectionCrude
    const direction1 = cardinalDirectionCrude(45);
    const direction2 = cardinalDirectionCrude(135);
    const direction3 = cardinalDirectionCrude(225);
    const direction4 = cardinalDirectionCrude(315);

    assert.equal(direction1, 'south');
    assert.equal(direction2, 'west');
    assert.equal(direction3, 'north');
    assert.equal(direction4, 'east');
  });

  it('should throw a RangeError when degrees exceed 360', () => {
    // Test if it throws an error when degrees exceed 360
    assert.throws(() => cardinalDirection(361), RangeError);
    assert.throws(() => cardinalDirectionCrude(361), RangeError);
  });

  it('should throw a RangeError when degrees are lower than 0', () => {
    // Test if it throws an error when degrees are lower than 0
    assert.throws(() => cardinalDirection(-1), RangeError);
    assert.throws(() => cardinalDirectionCrude(-1), RangeError);
  });
});
