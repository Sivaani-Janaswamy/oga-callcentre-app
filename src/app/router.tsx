import { Navigate, Route, Routes } from 'react-router-dom';
import { DashboardPage } from '../components/dashboard/DashboardPage';
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
        <Route
          path="/plan/calls"
          element={
            <PlaceholderPage
              title="Calls to make"
              description="This route is the ranked call plan workspace for open leads and follow-ups."
            />
          }
        />
        <Route
          path="/plan/incoming"
          element={
            <PlaceholderPage
              title="Incoming"
              description="This route will display missed calls and callback actions."
            />
          }
        />
        <Route
          path="/plan/recent"
          element={
            <PlaceholderPage
              title="Recent"
              description="This route will review recent calls and call outcomes."
            />
          }
        />
        <Route
          path="/plan/practise"
          element={
            <PlaceholderPage
              title="Practise a call"
              description="Bonus practise flow placeholder for role-play and call coaching."
            />
          }
        />
        <Route
          path="/calendar"
          element={
            <PlaceholderPage
              title="Calendar"
              description="Calendar month view and event detail panel will render here."
            />
          }
        />
        <Route
          path="/pulse"
          element={
            <PlaceholderPage
              title="Pulse"
              description="Pulse home with channels and quick updates will render here."
            />
          }
        />
        <Route
          path="/pulse/:channelId"
          element={
            <PlaceholderPage
              title="Pulse channel"
              description="Individual channel conversation view with the pinned card and message bubbles will render here."
            />
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AppShell>
  );
}
