import { PhoneMissed } from 'lucide-react';
import { useState } from 'react';
import type { MissedCall } from '../../data/types';
import { useAsync } from '../../hooks/useAsync';
import { getMissedCalls } from '../../services/api';
import { formatInr } from '../../utils/format';
import { DashboardError, DashboardLoading } from '../dashboard/DashboardState';
import { CallAction } from './CallAction';

const EMPTY_DEPS: unknown[] = [];

function MissedCallRow({
  call,
  calling,
  onCall,
  onCancel,
}: {
  call: MissedCall;
  calling: boolean;
  onCall: () => void;
  onCancel: () => void;
}): JSX.Element {
  return (
    <div className="flex items-center gap-3 rounded-md border border-border bg-card p-3 shadow-soft">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-danger-soft text-danger">
        <PhoneMissed className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-13 font-semibold text-text">{call.displayName}</p>
        <p className="mt-1 truncate text-11 text-text-muted">{call.metaLabel}</p>
      </div>
      <div className="shrink-0 text-right">
        {call.expectedValueInr === undefined ? (
          <p className="text-12 font-semibold text-text-muted">New contact</p>
        ) : (
          <p className="text-12 font-semibold text-success">{formatInr(call.expectedValueInr)} expected</p>
        )}
        <div className="mt-1 flex items-center justify-end gap-2">
          <CallAction
            calling={calling}
            label="Call back"
            onCall={onCall}
            onCancel={onCancel}
          />
        </div>
      </div>
    </div>
  );
}

export function IncomingCallsPage(): JSX.Element {
  const [callingId, setCallingId] = useState<string | null>(null);
  const { data, loading, error } = useAsync(getMissedCalls, EMPTY_DEPS);

  if (loading) {
    return <DashboardLoading />;
  }
  if (error) {
    return <DashboardError message={error.message} />;
  }

  return (
    <section>
      <h2 className="text-20 font-semibold text-text">Missed calls</h2>
      <p className="mt-1 text-13 text-text-muted">
        Ranked by expected value — call the highest-value leads back first
      </p>
      <div className="mt-5 flex items-center gap-5 rounded-md bg-warning-soft p-4">
        <div>
          <p className="text-20 font-semibold text-text">{data?.count ?? 0}</p>
          <p className="text-10 font-semibold tracking-[0.12em] text-text-muted">MISSED TODAY</p>
        </div>
        <div className="h-12 w-px bg-border" />
        <div>
          <p className="text-20 font-semibold text-success">{formatInr(data?.totalValueInr ?? 0)}</p>
          <p className="text-10 font-semibold tracking-[0.12em] text-text-muted">
            EXPECTED VALUE AT STAKE
          </p>
        </div>
      </div>
      <div className="mt-5 space-y-2">
        {(data?.items ?? []).map((call) => (
          <MissedCallRow
            key={call.id}
            call={call}
            calling={callingId === call.id}
            onCall={() => setCallingId(call.id)}
            onCancel={() => setCallingId(null)}
          />
        ))}
      </div>
    </section>
  );
}
