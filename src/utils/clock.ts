export const DEMO_TODAY = new Date('2026-10-09T00:00:00+05:30');

export function isSameDay(date: Date, baseDate: Date = DEMO_TODAY): boolean {
  return (
    date.getFullYear() === baseDate.getFullYear() &&
    date.getMonth() === baseDate.getMonth() &&
    date.getDate() === baseDate.getDate()
  );
}

export function toDateFromIso(value: string): Date {
  return new Date(value);
}

export function getDemoTodayIso(): string {
  return '2026-10-09';
}
