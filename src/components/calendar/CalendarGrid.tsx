import type { CalendarEvent } from '../../data/types';
import { getDemoTodayIso } from '../../utils/clock';
import { getMonthGrid } from '../../utils/calendar';

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export function CalendarGrid({
  month,
  events,
  selectedDate,
  onSelect,
}: {
  month: string;
  events: CalendarEvent[];
  selectedDate: string;
  onSelect: (date: string) => void;
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
          <button
            key={cell.date}
            type="button"
            onClick={() => onSelect(cell.date as string)}
            className={`flex h-10 flex-col items-center justify-center rounded-md text-12 font-semibold shadow-soft transition-colors ${
              cell.date === today || cell.date === selectedDate
                ? 'border-2 border-info text-info'
                : 'bg-card-soft text-text hover:bg-card'
            }`}
          >
            {cell.day}
            {eventDates.has(cell.date) && (
              <span className="mt-0.5 h-1 w-1 rounded-full bg-danger" />
            )}
          </button>
        ) : (
          <span key={`blank-${index}`} className="h-10" />
        ),
      )}
    </div>
  );
}
