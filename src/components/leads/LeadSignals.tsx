import { Quote } from 'lucide-react';
import type { BuyingSignal, Lead } from '../../data/types';
import { Badge } from '../ui/Badge';

export function LeadSignals({
  lead,
  signals,
}: {
  lead: Lead;
  signals: BuyingSignal[];
}): JSX.Element {
  return (
    <div className="mt-4 border-t border-border pt-4">
      <p className="text-12 font-semibold text-text">Buying signals</p>
      {signals.length === 0 ? (
        <p className="mt-2 text-11 text-text-muted">No buying signals recorded.</p>
      ) : (
        <div className="mt-2 space-y-2">
          {signals.map((signal) => (
            <div key={signal.id} className="rounded-md bg-card-soft p-2.5">
              <p className="text-11 font-semibold text-text">{signal.title}</p>
              <p className="mt-1 flex gap-1 text-11 italic text-text-muted">
                <Quote className="h-3 w-3 shrink-0" />
                {signal.evidence}
              </p>
            </div>
          ))}
        </div>
      )}
      <Badge tone="danger" className="mt-3">
        {lead.cumulativeMissed} missed follow-up{lead.cumulativeMissed === 1 ? '' : 's'}
      </Badge>
    </div>
  );
}
