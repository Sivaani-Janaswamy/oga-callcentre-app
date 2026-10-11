import { CalendarDays, ChevronLeft, ChevronRight, Mail, Users } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { useAsync } from '../../hooks/useAsync';
import { getEvents } from '../../services/api';
import { getDemoTodayIso } from '../../utils/clock';
import {
  formatCalendarDate,
  formatEventTime,
  formatMonthTitle,
  shiftMonth,
} from '../../utils/calendar';
import { DashboardError, DashboardLoading } from '../dashboard/DashboardState';
import { CalendarGrid } from './CalendarGrid';

const INITIAL_MONTH = '2026-10';
export function CalendarPage(): JSX.Element {
  const [month, setMonth] = useState(INITIAL_MONTH);
  const [selectedDate, setSelectedDate] = useState(getDemoTodayIso());
  const request = useCallback(() => getEvents(month), [month]);
  const requestDeps = useMemo(() => [month], [month]);
  const { data, loading, error } = useAsync(request, requestDeps);
  const events = useMemo(() => data ?? [], [data]);
  const todayMonth = getDemoTodayIso().slice(0, 7);
  const selectedEvents = events.filter((event) => event.date === selectedDate);
  const upcomingEvents = events
    .filter((event) => event.date >= getDemoTodayIso())
    .sort((left, right) => left.date.localeCompare(right.date));

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
          <button
            type="button"
            aria-label="Previous month"
            onClick={() => setMonth((current) => shiftMonth(current, -1))}
            className="rounded-md p-2 text-text hover:bg-card-soft"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2">
            <h2 className="text-13 font-semibold text-text">{formatMonthTitle(month)}</h2>
            <button
              type="button"
              onClick={() => {
                setMonth(todayMonth);
                setSelectedDate(getDemoTodayIso());
              }}
              className="rounded-full bg-info-soft px-2.5 py-1 text-10 font-semibold text-info"
            >
              Today
            </button>
          </div>
          <button
            type="button"
            aria-label="Next month"
            onClick={() => setMonth((current) => shiftMonth(current, 1))}
            className="rounded-md p-2 text-text hover:bg-card-soft"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <CalendarGrid
          month={month}
          events={events}
          selectedDate={selectedDate}
          onSelect={setSelectedDate}
        />
        {/* PLACEHOLDER: verify the selected-day panel copy and layout against mock. */}
        <div className="mt-4 rounded-md bg-card-soft p-3">
          <p className="text-11 font-semibold text-text">{formatCalendarDate(selectedDate)}</p>
          {selectedEvents.length === 0 ? (
            <p className="mt-1 text-11 text-text-muted">No events</p>
          ) : (
            selectedEvents.map((event) => (
              <p key={event.id} className="mt-1 text-11 text-text-muted">
                {event.title}
              </p>
            ))
          )}
        </div>
      </div>
      <div className="mt-6">
        <p className="text-11 font-semibold uppercase tracking-[0.12em] text-text-muted">
          UPCOMING
        </p>
        <div className="mt-3 space-y-2">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="flex gap-3 border-l-2 border-info pl-3">
              <p className="w-20 shrink-0 text-12 font-semibold text-info">
                {formatEventTime(event.time)}
              </p>
              <div className="min-w-0">
                <p className="text-13 font-semibold text-text">{event.title}</p>
                <p className="mt-1 flex items-center gap-1 text-11 text-text-muted">
                  <Users className="h-3 w-3 shrink-0" />
                  {formatCalendarDate(event.date)} · {event.metaLabel}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
