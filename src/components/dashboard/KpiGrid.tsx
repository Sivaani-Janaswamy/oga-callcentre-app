import type { KpiSet } from '../../data/types';
import { formatDurationSeconds } from '../../utils/format';
import { KpiCard } from './KpiCard';

export function KpiGrid({ kpis }: { kpis: KpiSet }): JSX.Element {
  const cards = [
    {
      value: String(kpis.qaScore),
      label: 'OG SCORE™',
      delta: `▲${kpis.deltas.qaScore}`,
      tone: 'success' as const,
    },
    {
      value: formatDurationSeconds(kpis.avgHandleTimeSec),
      label: 'AVG HANDLE TIME',
      delta: `▼${kpis.deltas.avgHandleTimePercent}%`,
      tone: 'success' as const,
    },
    {
      value: `${kpis.csatTodayPercent}%`,
      label: 'CSAT TODAY',
      delta: `▲${kpis.deltas.csatTodayPoints}pt`,
      tone: 'success' as const,
    },
    {
      value: String(kpis.inQueue),
      label: 'IN QUEUE',
      delta: kpis.deltas.inQueueLive ? '● live' : '○ offline',
      tone: 'info' as const,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {cards.map((card) => (
        <KpiCard key={card.label} {...card} />
      ))}
    </div>
  );
}
