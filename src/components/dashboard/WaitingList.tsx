import { ArrowRight, Headset } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { WaitingItem } from '../../data/types';
import { Badge } from '../ui/Badge';
import { EmptyState } from '../ui/Skeleton';

const URGENCY_TONES = {
  high: 'danger',
  medium: 'warn',
  low: 'success',
} as const;

export function WaitingList({ items }: { items: WaitingItem[] }): JSX.Element {
  return (
    <section className="mt-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-11 font-semibold uppercase tracking-[0.12em] text-text-muted">
          WHO&apos;S WAITING
        </h2>
        <Link
          to="/plan/calls"
          className="inline-flex items-center gap-1 text-12 font-semibold text-brand hover:text-success"
        >
          Open planner <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="mt-3 space-y-2">
        {items.length === 0 ? (
          <EmptyState
            title="Nobody is waiting"
            description="Customers in your queue will show up here."
          />
        ) : (
          items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 rounded-md border border-border bg-card p-3 shadow-soft transition-colors hover:border-brand"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-success-soft text-success">
              <Headset className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-13 font-semibold text-text">{item.name}</p>
              <p className="truncate text-11 text-text-muted">{item.reason}</p>
            </div>
            <Badge tone={URGENCY_TONES[item.urgency]}>{item.waitingLabel}</Badge>
          </div>
          ))
        )}
      </div>
    </section>
  );
}
