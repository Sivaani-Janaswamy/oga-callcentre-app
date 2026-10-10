import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { DailyStat } from '../../data/types';
import { getDemoTodayIso, parseIso } from '../../utils/clock';
import { Card } from '../ui/Card';

type ChartMetric = 'calls' | 'csat';

const TODAY_ISO = getDemoTodayIso();

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
    const dayLabel = stat.date === TODAY_ISO ? 'Today' : parseIso(stat.date).toLocaleDateString('en-US', {
      weekday: 'short',
    });

    return {
      dayLabel,
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
      <Card className="h-40 px-3 py-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 22, right: 4, left: 4, bottom: 0 }}>
            <XAxis dataKey="dayLabel" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
            <YAxis hide domain={[0, 54]} />
            <Tooltip formatter={(value, _name, item) => [item.payload.value, 'Value']} />
            <Bar dataKey="barHeight" radius={[4, 4, 0, 0]} maxBarSize={24}>
              <LabelList dataKey="value" position="top" fill="var(--color-text)" fontSize={10} />
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
