import type { DailyStat } from '../../data/types';
import { DashboardBarChart } from './DashboardBarChart';

export function CsatTrendChart({ stats }: { stats: DailyStat[] }): JSX.Element {
  return <DashboardBarChart title="CSAT TREND · LAST 7 DAYS" stats={stats} metric="csat" />;
}
