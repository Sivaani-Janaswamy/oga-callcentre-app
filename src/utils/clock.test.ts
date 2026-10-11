import { describe, expect, it } from 'vitest';
import { demoNowIso, hoursUntilDemo, parseIso } from './clock';

describe('clock utils', () => {
  it('parses an ISO timestamp', () => {
    expect(parseIso('2026-10-09T10:09:00+05:30').toISOString()).toBe('2026-10-09T04:39:00.000Z');
  });

  it('returns the fixed demo timestamp', () => {
    expect(demoNowIso()).toBe('2026-10-08T18:30:00.000Z');
  });

  it('calculates non-negative hours remaining from the demo clock', () => {
    expect(hoursUntilDemo('2026-10-09T03:00:00+05:30')).toBe(3);
    expect(hoursUntilDemo('2026-10-08T23:00:00+05:30')).toBe(0);
  });
});
