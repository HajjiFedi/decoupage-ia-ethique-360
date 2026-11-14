import { describe, expect, it } from 'vitest';
import { sideOfLine } from './geometry';

describe('sideOfLine', () => {
  const a = { x: 0, y: 0 };
  const b = { x: 10, y: 0 };
  it('returns opposite signs for opposite sides', () => {
    expect(sideOfLine({ x: 5, y: 3 }, a, b)).toBe(1);
    expect(sideOfLine({ x: 5, y: -3 }, a, b)).toBe(-1);
  });
  it('returns 0 on the line, even beyond the actors', () => {
    expect(sideOfLine({ x: 20, y: 0 }, a, b)).toBe(0);
  });
});
