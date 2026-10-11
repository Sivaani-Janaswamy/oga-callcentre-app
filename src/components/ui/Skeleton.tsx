export function Skeleton({ className = '' }: { className?: string }): JSX.Element {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-md bg-border/60 ${className}`.trim()}
    >
    </div>
  );
}

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description?: string;
}): JSX.Element {
  return (
    <div className="rounded-md border border-dashed border-border bg-card p-6 text-center shadow-soft">
      <p className="text-13 font-semibold text-text">{title}</p>
      {description ? (
        <p className="mt-1 text-12 text-text-muted">{description}</p>
      ) : null}
    </div>
  );
}

export function DashboardLoading(): JSX.Element {
  return (
    <div aria-busy="true" aria-label="Loading" className="space-y-6">
      <div className="rounded-md bg-gradient-to-br from-sidebar to-brand p-6">
        <Skeleton className="h-3 w-40 bg-white/20" />
        <Skeleton className="mt-3 h-6 w-48 bg-white/20" />
        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[0, 1, 2, 3].map((index) => (
            <Skeleton key={index} className="h-20 bg-white/20" />
          ))}
        </div>
      </div>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:grid-cols-1">
        <div className="space-y-6">
          <Skeleton className="h-36" />
          <Skeleton className="h-48" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
      </div>
    </div>
  );
}
