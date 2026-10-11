import { DashboardLoading, EmptyState, Skeleton } from '../ui/Skeleton';

export { DashboardLoading, EmptyState, Skeleton };

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
