import { Badge } from '../ui/Badge';

export function KpiCard({
  value,
  label,
  delta,
  tone,
}: {
  value: string;
  label: string;
  delta: string;
  tone: 'success' | 'info';
}): JSX.Element {
  return (
    <div className="rounded-md border border-white/20 bg-white/10 p-3 text-center">
      <p className="text-20 font-semibold text-white">{value}</p>
      <p className="mt-1 text-10 font-semibold uppercase tracking-[0.08em] text-white/70">
        {label}
      </p>
      <div className="mt-2 flex justify-center">
        <Badge tone={tone} className="bg-white/15 text-white">
          {delta}
        </Badge>
      </div>
    </div>
  );
}
