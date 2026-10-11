import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PlanLayout } from '../components/plan/PlanLayout';
import { AppShell } from '../components/shell/AppShell';

const DashboardPage = lazy(() =>
  import('../components/dashboard/DashboardPage').then((module) => ({
    default: module.DashboardPage,
  })),
);
const CallsToMakePage = lazy(() =>
  import('../components/plan/CallsToMakePage').then((module) => ({
    default: module.CallsToMakePage,
  })),
);
const IncomingCallsPage = lazy(() =>
  import('../components/plan/IncomingCallsPage').then((module) => ({
    default: module.IncomingCallsPage,
  })),
);
const RecentCallsPage = lazy(() =>
  import('../components/plan/RecentCallsPage').then((module) => ({
    default: module.RecentCallsPage,
  })),
);
const CalendarPage = lazy(() =>
  import('../components/calendar/CalendarPage').then((module) => ({
    default: module.CalendarPage,
  })),
);
const PulsePage = lazy(() =>
  import('../components/pulse/PulsePage').then((module) => ({
    default: module.PulsePage,
  })),
);
const PulseChannelPage = lazy(() =>
  import('../components/pulse/PulseChannelPage').then((module) => ({
    default: module.PulseChannelPage,
  })),
);

function RouteLoading(): JSX.Element {
  return <p className="py-10 text-center text-13 text-text-muted">Loading…</p>;
}

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

function PractisePlaceholderPage(): JSX.Element {
  return (
    <PlaceholderPage
      title="Practise a call"
      description="Bonus practise flow placeholder for role-play and call coaching."
    />
  );
}

const PractisePage = lazy(async () => ({ default: PractisePlaceholderPage }));

export function AppRouter(): JSX.Element {
  return (
    <AppShell>
      <Suspense fallback={<RouteLoading />}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/plan" element={<PlanLayout />}>
            <Route index element={<Navigate to="/plan/calls" replace />} />
            <Route path="calls" element={<CallsToMakePage />} />
            <Route path="incoming" element={<IncomingCallsPage />} />
            <Route path="recent" element={<RecentCallsPage />} />
            <Route path="practise" element={<PractisePage />} />
          </Route>
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/pulse" element={<PulsePage />} />
          <Route path="/pulse/:channelId" element={<PulseChannelPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </AppShell>
  );
}
