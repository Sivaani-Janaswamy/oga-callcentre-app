import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import type { TooltipProps } from 'recharts';
import type { DailyStat } from '../../data/types';
import { getDemoTodayIso } from '../../utils/clock';
import { Card } from '../ui/Card';

type ChartMetric = 'calls' | 'csat';

const TODAY_ISO = getDemoTodayIso();

type ChartPoint = {
  dayLabel: string;
  value: number;
  barHeight: number;
  isToday: boolean;
};

function ChartTooltip({ active, payload }: TooltipProps<ValueType, NameType>): JSX.Element | null {
  const point = payload?.[0]?.payload as ChartPoint | undefined;

  if (!active || !point) {
    return null;
  }

  return (
    <div className="rounded-md border border-border bg-card px-2 py-1 text-11 text-text shadow-soft">
      {point.dayLabel}: {point.value}
    </div>
  );
}

export function DashboardBarChart({
  title,
  stats,
  metric,
}: {
  title: string;
  stats: DailyStat[];
  metric: ChartMetric;
}): JSX.Element {
  const data = stats.map((stat) => {
    const value = metric === 'calls' ? stat.callsHandled : stat.csatPercent;
    return {
      dayLabel: stat.label,
      value,
      barHeight: Math.min(value * 3, 54),
      isToday: stat.date === TODAY_ISO,
    };
  });
  const lightColor = metric === 'calls' ? 'var(--color-success-soft)' : 'var(--color-info-soft)';
  const darkColor = metric === 'calls' ? 'var(--color-brand)' : 'var(--color-info)';

  return (
    <section>
      <h2 className="mb-3 text-11 font-semibold uppercase tracking-[0.12em] text-text-muted">
        {title}
      </h2>
      <Card
        role="img"
        ariaLabel={`${title} bar chart, values ${data
          .map((item) => `${item.dayLabel} ${item.value}`)
          .join(', ')}`}
        className="h-32 px-2 py-2 sm:h-40 sm:px-3"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 18, right: 2, left: 2, bottom: 0 }}>
            <XAxis dataKey="dayLabel" axisLine={false} tickLine={false} tick={{ fontSize: 9 }} />
            <YAxis hide domain={[0, 54]} />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="barHeight" radius={[4, 4, 0, 0]} maxBarSize={20}>
              <LabelList dataKey="value" position="top" fill="var(--color-text)" fontSize={9} />
              {data.map((item) => (
                <Cell key={item.dayLabel} fill={item.isToday ? darkColor : lightColor} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </section>
  );
}
