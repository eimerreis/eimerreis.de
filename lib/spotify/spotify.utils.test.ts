import { calculateRequestsNeeded } from './spotify.utils';
import { expect, it } from 'vitest';

it('calculates total request count', () => {
  expect(calculateRequestsNeeded(200, 50)).toBe(4);
});

it('subtracts first request when already fetched', () => {
  expect(calculateRequestsNeeded(200, 50, true)).toBe(3);
});
