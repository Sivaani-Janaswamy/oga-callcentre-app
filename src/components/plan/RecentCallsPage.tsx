import { ChevronRight, PhoneIncoming, PhoneOff, PhoneOutgoing } from 'lucide-react';
import { useAsync } from '../../hooks/useAsync';
import type { Call } from '../../data/types';
import { getRecentCalls } from '../../services/api';
import { DashboardError, DashboardLoading } from '../dashboard/DashboardState';

const EMPTY_DEPS: unknown[] = [];

function CallIcon({ call }: { call: Call }): JSX.Element {
  if (call.outcome === 'no_answer' || call.outcome === 'unknown') {
    return <PhoneOff className="h-4 w-4" />;
  }

  return call.direction === 'outgoing' ? (
    <PhoneOutgoing className="h-4 w-4" />
  ) : (
    <PhoneIncoming className="h-4 w-4" />
  );
}

function getIconStyle(call: Call): string {
  if (call.outcome === 'no_answer' || call.outcome === 'unknown') {
    return 'bg-danger-soft text-danger';
  }

  return call.direction === 'outgoing'
    ? 'bg-info-soft text-info'
    : 'bg-success-soft text-success';
}

export function RecentCallsPage({ onSelect }: { onSelect: (call: Call) => void }): JSX.Element {
  const { data, loading, error } = useAsync(getRecentCalls, EMPTY_DEPS);

  if (loading) {
    return <DashboardLoading />;
  }

  if (error) {
    return <DashboardError message={error.message} />;
  }

  return (
    <section>
      <h2 className="text-20 font-semibold text-text">Recent calls</h2>
      <p className="mt-1 text-13 text-text-muted">Tap a call to review it against SOP</p>
      <div className="mt-5 space-y-2">
        {(data ?? []).map((call) => (
          <button
            key={call.id}
            type="button"
            onClick={() => onSelect(call)}
            className="flex w-full items-center gap-3 rounded-md border border-border bg-card p-3 text-left shadow-soft transition-colors hover:border-brand"
          >
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${getIconStyle(call)}`}
            >
              <CallIcon call={call} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-13 font-semibold text-text">{call.displayName}</span>
              <span className="mt-0.5 block truncate text-11 text-text-muted">
                {call.whenLabel}
              </span>
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-text-muted" />
          </button>
        ))}
      </div>
    </section>
  );
}
