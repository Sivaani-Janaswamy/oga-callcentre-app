import { parseIso } from './clock';

export interface CalendarCell {
  date: string | null;
  day: number | null;
}

export function getMonthGrid(month: string): CalendarCell[] {
  const firstDay = parseIso(`${month}-01T00:00:00Z`);
  const year = firstDay.getUTCFullYear();
  const monthIndex = firstDay.getUTCMonth();
  const offset = firstDay.getUTCDay();
  const daysInMonth = parseIso(
    `${monthIndex === 11 ? year + 1 : year}-${String((monthIndex + 1) % 12 + 1).padStart(2, '0')}-01T00:00:00Z`,
  );
  daysInMonth.setUTCDate(0);

  return Array.from({ length: offset + daysInMonth.getUTCDate() }, (_, index) => {
    if (index < offset) {
      return { date: null, day: null };
    }

    const day = index - offset + 1;
    return { date: `${month}-${String(day).padStart(2, '0')}`, day };
  });
}

export function formatMonthTitle(month: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(parseIso(`${month}-01T00:00:00Z`));
}
