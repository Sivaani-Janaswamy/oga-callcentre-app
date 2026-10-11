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

export function parseIso(iso: string): Date {
  return new Date(iso);
}

export function demoNowIso(): string {
  return DEMO_TODAY.toISOString();
}

export function getDemoTodayIso(): string {
  return '2026-10-09';
}

export function hoursUntilDemo(iso: string): number {
  const hours = (parseIso(iso).getTime() - DEMO_TODAY.getTime()) / (60 * 60 * 1000);
  return Math.max(0, Math.round(hours));
}
