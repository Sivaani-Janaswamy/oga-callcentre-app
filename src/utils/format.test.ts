import { describe, expect, it } from 'vitest';
import { formatDurationSeconds, formatInr, formatTimeLeftHours } from './format';

describe('format utils', () => {
  it('formats Indian rupees', () => {
    expect(formatInr(5200)).toBe('₹5,200');
  });

  it('formats duration as minutes and seconds', () => {
    expect(formatDurationSeconds(252)).toBe('4m 12s');
  });

  it('formats time left with hours', () => {
    expect(formatTimeLeftHours(3)).toBe('3h');
  });
});
