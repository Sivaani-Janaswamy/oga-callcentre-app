import { getDashboard } from '../../services/api';
import { useAsync } from '../../hooks/useAsync';
import { GreetingBanner } from './GreetingBanner';
import { EarningsCard } from './EarningsCard';
import { KpiGrid } from './KpiGrid';
import { ProgressPanel } from './ProgressPanel';
import { TasksCard } from './TasksCard';
import { WaitingList } from './WaitingList';

const EMPTY_DEPS: unknown[] = [];

export function DashboardPage(): JSX.Element {
  const { data } = useAsync(getDashboard, EMPTY_DEPS);

  if (!data) {
    return <div className="min-h-40" />;
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
    </div>
  );
}
