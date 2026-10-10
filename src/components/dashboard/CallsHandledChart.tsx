import type { DailyStat } from '../../data/types';
import { DashboardBarChart } from './DashboardBarChart';

export function CallsHandledChart({ stats }: { stats: DailyStat[] }): JSX.Element {
  return (
    <DashboardBarChart title="CALLS HANDLED · LAST 7 DAYS" stats={stats} metric="calls" />
  );
}
