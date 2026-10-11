import { Clock3 } from 'lucide-react';
import type { Lead } from '../../data/types';
import { hoursUntilDemo } from '../../utils/clock';
import { formatInr, formatTimeLeftHours } from '../../utils/format';
import { Badge } from '../ui/Badge';

export function LeadSummaryCard({ lead }: { lead: Lead }): JSX.Element {
  return (
    <div className="rounded-md bg-card-soft p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-18 font-semibold text-text">{lead.name}</p>
          <p className="mt-1 text-12 text-text-muted">
            {lead.productInterest} · {formatInr(lead.quoteValueInr)}
          </p>
        </div>
        <Badge tone={lead.status === 'open' ? 'success' : 'default'}>{lead.status}</Badge>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3 text-11 text-text-muted">
        <span className="inline-flex items-center gap-1 rounded-full bg-warning-soft px-2 py-1 text-warning">
          <Clock3 className="h-3 w-3" />
          {formatTimeLeftHours(hoursUntilDemo(lead.closeBy))} left
        </span>
        <span>{lead.nextAction}</span>
      </div>
      <p className="mt-3 text-12 text-text">{lead.context}</p>
    </div>
  );
}
