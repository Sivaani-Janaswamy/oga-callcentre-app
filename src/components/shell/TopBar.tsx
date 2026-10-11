import { Bell, Menu, Star } from 'lucide-react';
import { getCurrentAgent, getDashboard } from '../../services/api';
import { Avatar } from '../ui/Avatar';
import { useAsync } from '../../hooks/useAsync';

const EMPTY_DEPS: unknown[] = [];

export function TopBar({
  onMenuToggle,
}: {
  onMenuToggle: () => void;
}): JSX.Element {
  const { data: agentData } = useAsync(getCurrentAgent, EMPTY_DEPS);
  const { data: dashboardData } = useAsync(getDashboard, EMPTY_DEPS);

  return (
    <header className="flex items-center justify-between border-b border-border bg-card px-6 py-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuToggle}
          className="md:hidden flex h-9 w-9 items-center justify-center rounded-md bg-sidebar text-white transition-colors hover:bg-brand"
          aria-label="Open menu"
        >
          <Menu className="h-4 w-4" />
        </button>
        <div className="hidden md:flex h-8 w-8 items-center justify-center rounded-md bg-brand/10 text-12 font-semibold text-brand">
          OG
        </div>
        <div>
          <p className="text-13 font-semibold text-text">On-Ground.ai</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-danger text-white">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-accent" />
          <span className="sr-only">
            {agentData?.unreadNotifications ?? 0} unread notifications
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 rounded-full border border-accent bg-card-soft px-2 py-1.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-brand text-10 font-semibold text-brand">
            {dashboardData?.kpis.qaScore ?? '—'}
          </span>
          <span className="flex items-center gap-1 text-11 font-semibold text-accent">
            <Star className="h-3 w-3 fill-current" />#{agentData?.rank ?? '—'}
          </span>
        </div>
        <div className="rounded-full border-2 border-accent p-0.5">
          <Avatar initials={agentData?.avatarInitials ?? '—'} size="sm" />
        </div>
      </div>
    </header>
  );
}
