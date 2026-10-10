import { getDashboard } from '../../services/api';
import { useAsync } from '../../hooks/useAsync';
import { CallsHandledChart } from './CallsHandledChart';
import { CsatTrendChart } from './CsatTrendChart';
import { DashboardError, DashboardLoading } from './DashboardState';
import { GreetingBanner } from './GreetingBanner';
import { EarningsCard } from './EarningsCard';
import { KpiGrid } from './KpiGrid';
import { ProgressPanel } from './ProgressPanel';
import { TasksCard } from './TasksCard';
import { WaitingList } from './WaitingList';

const EMPTY_DEPS: unknown[] = [];

export function DashboardPage(): JSX.Element {
  const { data, loading, error } = useAsync(getDashboard, EMPTY_DEPS);

  if (loading) {
    return <DashboardLoading />;
  }

  if (error) {
    return <DashboardError message={error.message} />;
  }

  if (!data) {
    return <DashboardError message="No dashboard data was returned." />;
  }

  return (
    <div className="space-y-6">
      <GreetingBanner agent={data.agent}>
        <KpiGrid kpis={data.kpis} />
      </GreetingBanner>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
        <div>
          <ProgressPanel progress={data.progress} />
          <WaitingList items={data.waiting} />
        </div>
        <div className="space-y-6">
          <EarningsCard earnings={data.earnings} />
          <TasksCard tasks={data.tasks} />
        </div>
      </div>
      <CallsHandledChart stats={data.callsLast7} />
      <CsatTrendChart stats={data.csatLast7} />
    </div>
  );
}
