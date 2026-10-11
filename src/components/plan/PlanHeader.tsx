import { DEMO_TODAY } from '../../utils/clock';

function formatPlanDate(date: Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: 'Asia/Kolkata',
  }).format(date);
}

export function PlanHeader(): JSX.Element {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4 rounded-md bg-gradient-to-r from-navy via-navy-mid to-navy-light p-6 text-white shadow-soft">
      <div>
        <p className="text-13 text-white/70">Today&apos;s calling plan</p>
        <h1 className="mt-1 text-24 font-semibold">Planner</h1>
      </div>
      <span className="rounded-full bg-white/15 px-3 py-1.5 text-12 text-white/90">
        {formatPlanDate(DEMO_TODAY)}
      </span>
    </header>
  );
}
