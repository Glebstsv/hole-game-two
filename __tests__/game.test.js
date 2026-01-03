import { chooseRandomDifferent } from '../src/game';

test('chooseRandomDifferent returns a number in [0,15] and different from current', () => {
  for (let i = 0; i < 100; i += 1) {
    const current = Math.floor(Math.random() * 16);
    const next = chooseRandomDifferent(current);
    expect(typeof next).toBe('number');
    expect(next).not.toBe(current);
    expect(next).toBeGreaterThanOrEqual(0);
    expect(next).toBeLessThan(16);
  }
});