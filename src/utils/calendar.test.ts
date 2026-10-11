import { describe, expect, it } from 'vitest';
import { getMonthGrid } from './calendar';

describe('calendar month grid', () => {
  it('adds the correct blank offset before October 2026', () => {
    const grid = getMonthGrid('2026-10');

    expect(grid).toHaveLength(35);
    expect(grid.slice(0, 4).every((cell) => cell.date === null)).toBe(true);
    expect(grid[4]).toEqual({ date: '2026-10-01', day: 1 });
  });

  it('handles a month with fewer than 31 days', () => {
    const grid = getMonthGrid('2026-02');

    expect(grid).toHaveLength(28);
    expect(grid.at(-1)).toEqual({ date: '2026-02-28', day: 28 });
  });
});
