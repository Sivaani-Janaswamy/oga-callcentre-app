export function DashboardLoading(): JSX.Element {
  return (
    <div className="rounded-md border border-border bg-card p-6 text-13 text-text-muted shadow-soft">
      Loading dashboard…
    </div>
  );
}

export function DashboardError({ message }: { message: string }): JSX.Element {
  return (
    <div
      role="alert"
      className="rounded-md border border-danger/20 bg-danger-soft p-6 text-13 text-danger"
    >
      Unable to load the dashboard: {message}
    </div>
  );
}
