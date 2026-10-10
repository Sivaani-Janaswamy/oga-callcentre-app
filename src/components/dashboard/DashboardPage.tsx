import { getDashboard } from '../../services/api';
import { useAsync } from '../../hooks/useAsync';
import { GreetingBanner } from './GreetingBanner';

const EMPTY_DEPS: unknown[] = [];

export function DashboardPage(): JSX.Element {
  const { data } = useAsync(getDashboard, EMPTY_DEPS);

  if (!data) {
    return <div className="min-h-40" />;
  }

  return (
    <div className="space-y-6">
      <GreetingBanner agent={data.agent} />
    </div>
  );
}
