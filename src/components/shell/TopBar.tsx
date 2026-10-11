import { Bell, Menu, Star, User } from 'lucide-react';
import { getCurrentAgent, getDashboard } from '../../services/api';
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
    <header className="flex h-[54px] items-center justify-between bg-gradient-to-r from-sidebar to-sidebar-end px-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuToggle}
          className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10 text-white transition-colors hover:bg-white/20 md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-4 w-4" />
        </button>
        <div className="flex h-[30px] w-[30px] items-center justify-center rounded-md bg-gradient-to-br from-brand to-brand-dark text-11 font-bold text-white">
          OG
        </div>
        <p className="text-13 font-semibold text-white">On-Ground.ai</p>
      </div>

      <div className="flex items-center gap-3">
        <div
          aria-hidden="true"
          className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-gradient-to-br from-danger to-danger-light shadow-[0_0_14px_rgba(217,80,80,0.45)] text-white"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border border-white bg-gold" />
          <span className="sr-only">
            {agentData?.unreadNotifications ?? 0} unread notifications
          </span>
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-white/20 bg-white/10 px-2.5 py-1.5 sm:flex">
          <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white/70 bg-sidebar-end text-10 font-bold text-white">
            {dashboardData?.kpis.qaScore ?? '—'}
          </span>
          <span className="flex items-center gap-1 text-11 font-bold text-gold">
            <Star className="h-3 w-3 fill-current" />#{agentData?.rank ?? '—'}
          </span>
        </div>
        <div className="flex h-9 w-9 flex-col items-center justify-center rounded-full border-2 border-transparent bg-gradient-to-br from-brand to-gold p-0.5 text-white">
          <span className="flex h-full w-full flex-col items-center justify-center rounded-full bg-sidebar-end">
            <User className="h-3 w-3" />
            <span className="text-10 font-bold leading-none">
              {agentData?.avatarInitials ?? '—'}
            </span>
          </span>
        </div>
      </div>
    </header>
  );
}
