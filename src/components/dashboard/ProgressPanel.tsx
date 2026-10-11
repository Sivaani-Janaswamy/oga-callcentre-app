import type { ProgressToday } from '../../data/types';
import { Badge } from '../ui/Badge';

export function ProgressPanel({ progress }: { progress: ProgressToday }): JSX.Element {
  const tiles = [
    {
      value: progress.leadsCreated,
      delta: progress.createdDelta,
      label: 'Leads Created',
      tone: 'warn' as const,
    },
    {
      value: progress.leadsCalled,
      delta: progress.calledDelta,
      label: 'Leads Called',
      tone: 'success' as const,
    },
  ];

  return (
    <section className="rounded-md bg-gradient-to-br from-brand to-success p-5 text-white shadow-soft">
      <h2 className="text-11 font-semibold uppercase tracking-[0.12em] text-white/80">
        ● MY PROGRESS · TODAY
      </h2>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {tiles.map((tile) => (
          <div key={tile.label} className="rounded-md border border-white/20 bg-white/10 p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="text-24 font-semibold">{tile.value}</p>
              <Badge tone={tile.tone} className="bg-white/90">
                ▲+{tile.delta}
              </Badge>
            </div>
            <p className="mt-2 text-12 text-white/80">{tile.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
