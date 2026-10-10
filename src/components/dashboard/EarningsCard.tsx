import type { Earnings } from '../../data/types';
import { formatInr } from '../../utils/format';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';

export function EarningsCard({ earnings }: { earnings: Earnings }): JSX.Element {
  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-13 font-semibold text-text">💰 My earnings this month</h2>
        <p className="text-right text-11 text-text-muted">
          {formatInr(earnings.slabFloorInr)} to {formatInr(earnings.targetInr)} slab
        </p>
      </div>
      <p className="mt-5 text-24 font-semibold text-success">{formatInr(earnings.totalInr)}</p>
      <p className="mt-1 text-12 text-text-muted">
        {formatInr(earnings.fromPractiseInr)} from coached moves
      </p>
      <ProgressBar value={earnings.totalInr} max={earnings.targetInr} className="mt-4" />
    </Card>
  );
}
