import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import type { PlannedCall } from '../../data/types';
import { useAsync } from '../../hooks/useAsync';
import { getPlannedCalls } from '../../services/api';
import { formatInr } from '../../utils/format';
import { DashboardError, DashboardLoading } from '../dashboard/DashboardState';
import { Avatar } from '../ui/Avatar';

const PAGE_SIZE = 2;

function avatarClass(tone: PlannedCall['avatarTone']): string {
  const classes: Record<PlannedCall['avatarTone'], string> = {
    peach: 'bg-danger-soft',
    mint: 'bg-success-soft',
    blue: 'bg-info-soft',
    yellow: 'bg-warning-soft',
  };
  return classes[tone];
}

// PLACEHOLDER: verify score thresholds against mock.
function scoreClass(score: number): string {
  if (score >= 70) {
    return 'text-success';
  }
  if (score >= 40) {
    return 'text-warning';
  }
  return 'text-danger';
}

function LeadRow({
  lead,
  expanded,
  onToggle,
}: {
  lead: PlannedCall;
  expanded: boolean;
  onToggle: () => void;
}): JSX.Element {
  return (
    <div className="rounded-md border border-border bg-card shadow-soft">
      <button
        type="button"
        aria-expanded={expanded}
        onClick={onToggle}
        className="flex w-full items-center gap-3 p-3 text-left"
      >
        <div className={`rounded-full ${avatarClass(lead.avatarTone)}`}>
          <Avatar initials={lead.initials} size="md" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-13 font-semibold text-text">{lead.name}</p>
          <p className="mt-1 truncate text-11 text-text-muted">
            Interested: {lead.productInterest} · {formatInr(lead.quoteValueInr)}
          </p>
        </div>
        <div className="text-right">
          <p className={`text-20 font-semibold ${scoreClass(lead.score)}`}>{lead.score}</p>
          <p className="text-10 font-semibold tracking-[0.12em] text-text-muted">SCORE</p>
        </div>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-text-muted transition-transform ${
            expanded ? 'rotate-180' : ''
          }`}
        />
      </button>
      {expanded && (
        // PLACEHOLDER: verify the expandable detail content against the mock.
        <div className="grid gap-3 border-t border-border px-3 py-3 text-11 text-text-muted sm:grid-cols-3">
          <p>
            <span className="block text-10 uppercase tracking-[0.1em]">ICP fit</span>
            <strong className="mt-1 block text-13 text-text">{lead.icpScore}%</strong>
          </p>
          <p>
            <span className="block text-10 uppercase tracking-[0.1em]">Lead intent score</span>
            <strong className="mt-1 block text-13 text-text">{lead.intentScore}</strong>
          </p>
          <p>
            <span className="block text-10 uppercase tracking-[0.1em]">Last note</span>
            <span className="mt-1 block text-text">{lead.lastNote}</span>
          </p>
        </div>
      )}
    </div>
  );
}

export function CallsToMakePage(): JSX.Element {
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const request = useCallback(() => getPlannedCalls(page, PAGE_SIZE), [page]);
  const requestDeps = useMemo(() => [page], [page]);
  const { data, loading, error } = useAsync(request, requestDeps);

  if (loading) {
    return <DashboardLoading />;
  }
  if (error) {
    return <DashboardError message={error.message} />;
  }

  const result = data;
  const canGoPrevious = page > 1;
  const canGoNext = result ? page < result.totalPages : false;

  return (
    <section>
      <h2 className="text-20 font-semibold text-text">Planned outgoing calls</h2>
      <p className="mt-1 text-13 text-text-muted">
        Ranked by lead attractiveness score — tap a lead for the full picture
      </p>
      <div className="mt-5 space-y-2">
        {(result?.items ?? []).map((lead) => (
          <LeadRow
            key={lead.id}
            lead={lead}
            expanded={expandedId === lead.id}
            onToggle={() => setExpandedId((current) => (current === lead.id ? null : lead.id))}
          />
        ))}
      </div>
      <div className="mt-5 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Previous page"
          disabled={!canGoPrevious}
          onClick={() => setPage((current) => current - 1)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <strong className="text-12 text-text">
          Page {result?.page ?? page} of {result?.totalPages ?? 1}
        </strong>
        <button
          type="button"
          aria-label="Next page"
          disabled={!canGoNext}
          onClick={() => setPage((current) => current + 1)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
