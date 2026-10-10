export function ProgressBar({
  value,
  max = 100,
  className = '',
}: {
  value: number;
  max?: number;
  className?: string;
}): JSX.Element {
  const safeValue = Math.min(Math.max(0, value), max);
  const percentage = max === 0 ? 0 : (safeValue / max) * 100;

  return (
    <div className={`h-2.5 w-full overflow-hidden rounded-full bg-card-soft ${className}`.trim()}>
      <div className="h-full rounded-full bg-brand" style={{ width: `${percentage}%` }} />
    </div>
  );
}
