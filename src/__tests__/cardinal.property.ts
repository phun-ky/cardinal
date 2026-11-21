import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import fc from 'fast-check';

import {
  cardinalDirection,
  cardinalDirectionCrude,
  cardinalDirectionDetailed
} from '../main';

const degrees = fc.double({ min: 0, max: 360, noNaN: true });
const OPPOSITE: Record<string, string> = {
  north: 'south',
  south: 'north',
  east: 'west',
  west: 'east'
};
/** Every compass word in a direction, so 'south-south-east' is south and east. */
const words = (direction: string) => new Set(direction.split('-'));

describe('cardinal direction properties', () => {
  it('names a compass direction at every precision from 0 to 360', () => {
    fc.assert(
      fc.property(degrees, (value) => {
        for (const direction of [
          cardinalDirectionDetailed(value),
          cardinalDirection(value),
          cardinalDirectionCrude(value)
        ]) {
          assert.ok(
            [...words(direction)].every((word) => word in OPPOSITE),
            `got ${direction} at ${value}`
          );
        }
      })
    );
  });

  it('only narrows a coarser direction as the precision grows', () => {
    fc.assert(
      fc.property(degrees, (value) => {
        const detailed = words(cardinalDirectionDetailed(value));
        const eight = cardinalDirection(value);

        assert.ok(words(eight).has(cardinalDirectionCrude(value)));
        assert.ok([...words(eight)].every((word) => detailed.has(word)));
      })
    );
  });

  it('points the opposite way half a turn later', () => {
    // Sector edges fall on fractions, so whole degrees never land on a tie
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 180 }), (value) => {
        const flip = (direction: string) =>
          direction
            .split('-')
            .map((word) => OPPOSITE[word])
            .join('-');

        assert.equal(
          cardinalDirectionDetailed(value + 180),
          flip(cardinalDirectionDetailed(value))
        );
        assert.equal(
          cardinalDirection(value + 180),
          flip(cardinalDirection(value))
        );
        assert.equal(
          cardinalDirectionCrude(value + 180),
          flip(cardinalDirectionCrude(value))
        );
      })
    );
  });

  it('throws a RangeError for any degree outside 0 to 360', () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.double({ max: -Number.MIN_VALUE, noNaN: true }),
          fc.double({ min: 360, minExcluded: true, noNaN: true })
        ),
        (value) => {
          assert.throws(() => cardinalDirectionDetailed(value), RangeError);
          assert.throws(() => cardinalDirection(value), RangeError);
          assert.throws(() => cardinalDirectionCrude(value), RangeError);
        }
      )
    );
  });
});
