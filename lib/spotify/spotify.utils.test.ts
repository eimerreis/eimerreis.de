import { calculateRequestsNeeded } from './spotify.utils';

it('calculates total request count', () => {
  expect(calculateRequestsNeeded(200, 50)).toBe(4);
});

it('subtracts first request when already fetched', () => {
  expect(calculateRequestsNeeded(200, 50, true)).toBe(3);
});
