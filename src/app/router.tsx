import { Navigate, Route, Routes } from 'react-router-dom';
import { DashboardPage } from '../components/dashboard/DashboardPage';
import { CalendarPage } from '../components/calendar/CalendarPage';
import { CallsToMakePage } from '../components/plan/CallsToMakePage';
import { IncomingCallsPage } from '../components/plan/IncomingCallsPage';
import { PlanLayout } from '../components/plan/PlanLayout';
import { RecentCallsPage } from '../components/plan/RecentCallsPage';
import { PulsePage } from '../components/pulse/PulsePage';
import { PulseChannelPage } from '../components/pulse/PulseChannelPage';
import { AppShell } from '../components/shell/AppShell';

function PlaceholderPage({
  title,
  description,
}: {
  title: string;
  description: string;
}): JSX.Element {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
      <p className="text-12 font-semibold uppercase tracking-[0.12em] text-text-muted">
        Placeholder
      </p>
      <h1 className="mt-3 text-24 font-semibold text-text">{title}</h1>
      <p className="mt-2 max-w-xl text-13 text-text-muted">{description}</p>
    </div>
  );
}

export function AppRouter(): JSX.Element {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/plan" element={<PlanLayout />}>
          <Route index element={<Navigate to="/plan/calls" replace />} />
          <Route
            path="calls"
            element={<CallsToMakePage />}
          />
          <Route
            path="incoming"
            element={<IncomingCallsPage />}
          />
          <Route path="recent" element={<RecentCallsPage />} />
          <Route
            path="practise"
            element={
              <PlaceholderPage
                title="Practise a call"
                description="Bonus practise flow placeholder for role-play and call coaching."
              />
            }
          />
        </Route>
        <Route
          path="/calendar"
          element={<CalendarPage />}
        />
        <Route
          path="/pulse"
          element={<PulsePage />}
        />
        <Route
          path="/pulse/:channelId"
          element={<PulseChannelPage />}
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AppShell>
  );
}
