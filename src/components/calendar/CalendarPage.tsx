import { CalendarDays, ChevronLeft, ChevronRight, Mail } from 'lucide-react';
import { useCallback, useMemo } from 'react';
import type { CalendarEvent } from '../../data/types';
import { useAsync } from '../../hooks/useAsync';
import { getEvents } from '../../services/api';
import { getDemoTodayIso } from '../../utils/clock';
import { formatMonthTitle, getMonthGrid } from '../../utils/calendar';
import { DashboardError, DashboardLoading } from '../dashboard/DashboardState';

const INITIAL_MONTH = '2026-10';
const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function CalendarGrid({
  month,
  events,
}: {
  month: string;
  events: CalendarEvent[];
}): JSX.Element {
  const eventDates = new Set(events.map((event) => event.date));
  const today = getDemoTodayIso();

  return (
    <div className="mt-4 grid grid-cols-7 gap-2">
      {WEEKDAYS.map((weekday, index) => (
        <span key={`${weekday}-${index}`} className="text-center text-11 text-text-muted">
          {weekday}
        </span>
      ))}
      {getMonthGrid(month).map((cell, index) =>
        cell.date ? (
          <div
            key={cell.date}
            className={`flex h-10 flex-col items-center justify-center rounded-md text-12 font-semibold shadow-soft ${
              cell.date === today ? 'border-2 border-info text-info' : 'bg-card-soft text-text'
            }`}
          >
            {cell.day}
            {eventDates.has(cell.date) && <span className="mt-0.5 h-1 w-1 rounded-full bg-danger" />}
          </div>
        ) : (
          <span key={`blank-${index}`} className="h-10" />
        ),
      )}
    </div>
  );
}

export function CalendarPage(): JSX.Element {
  const request = useCallback(() => getEvents(INITIAL_MONTH), []);
  const { data, loading, error } = useAsync(request);
  const events = useMemo(() => data ?? [], [data]);

  if (loading) {
    return <DashboardLoading />;
  }
  if (error) {
    return <DashboardError message={error.message} />;
  }

  return (
    <section>
      <header>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-brand" />
          <h1 className="text-20 font-semibold text-text">Calendar</h1>
        </div>
        <p className="mt-1 text-13 text-text-muted">
          Mirrored from your mailbox — invites created here land there too
        </p>
      </header>
      <div className="mt-5 flex items-center gap-3 rounded-md bg-info-soft p-3 text-12 text-text">
        <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-info">
          <Mail className="h-4 w-4" />
        </span>
        Store visits, coaching sessions, and meeting invites all show up here — and in your mailbox.
      </div>
      <div className="mt-5 max-w-[820px] rounded-md border border-border bg-card p-4 shadow-soft">
        <div className="flex items-center justify-between">
          <button type="button" disabled aria-label="Previous month" className="rounded-md p-2 opacity-40">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <h2 className="text-13 font-semibold text-text">{formatMonthTitle(INITIAL_MONTH)}</h2>
          <button type="button" disabled aria-label="Next month" className="rounded-md p-2 opacity-40">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <CalendarGrid month={INITIAL_MONTH} events={events} />
      </div>
    </section>
  );
}
