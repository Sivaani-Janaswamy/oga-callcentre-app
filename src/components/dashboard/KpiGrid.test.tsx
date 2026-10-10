import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { getDashboard } from '../../services/api';
import { KpiGrid } from './KpiGrid';

it('renders KPI values returned by the dashboard service', async () => {
  const dashboard = await getDashboard();

  render(<KpiGrid kpis={dashboard.kpis} />);

  expect(screen.getByText('76')).toBeInTheDocument();
  expect(screen.getByText('4m 12s')).toBeInTheDocument();
  expect(screen.getByText('94%')).toBeInTheDocument();
  expect(screen.getByText('2')).toBeInTheDocument();
  expect(screen.getByText('▲13')).toBeInTheDocument();
  expect(screen.getByText('▼8%')).toBeInTheDocument();
  expect(screen.getByText('▲2pt')).toBeInTheDocument();
  expect(screen.getByText('● live')).toBeInTheDocument();
});
