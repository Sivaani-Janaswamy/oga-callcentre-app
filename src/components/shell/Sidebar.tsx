import { NavLink, useLocation } from 'react-router-dom';
import { CalendarDays, Home, MessagesSquare, PhoneCall, Sparkles, X } from 'lucide-react';

const mainItems = [
  { to: '/dashboard', label: 'Dashboard', Icon: Home },
  { to: '/calendar', label: 'Calendar', Icon: CalendarDays },
  { to: '/pulse', label: 'Pulse', Icon: MessagesSquare },
];

const planItems = [
  { to: '/plan/calls', label: 'Calls to make' },
  { to: '/plan/incoming', label: 'Incoming' },
  { to: '/plan/recent', label: 'Recent' },
  { to: '/plan/practise', label: 'Practise a call' },
];

export function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}): JSX.Element {
  const { pathname } = useLocation();
  const isPlanActive = pathname.startsWith('/plan');

  return (
    <>
      <aside className="hidden md:flex w-64 flex-col bg-sidebar px-4 py-5 text-white">
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10 text-12 font-semibold">
            OG
          </div>
          <div>
            <div className="text-13 font-semibold">On-Ground.ai</div>
          </div>
        </div>

        <nav aria-label="Sidebar navigation" className="space-y-3">
          {mainItems.map(({ to, label, Icon }) => {
            const isActive = pathname === to;

            return (
              <NavLink
                key={to}
                to={to}
                aria-current={isActive ? 'page' : undefined}
                className={({ isActive: linkActive }) =>
                  `flex items-center gap-3 rounded-md px-3 py-2 text-13 transition-colors ${
                    linkActive
                      ? 'bg-white/10 text-white'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            );
          })}

          <div className="pt-2">
            <button
              type="button"
              className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-13 transition-colors ${
                isPlanActive
                  ? 'bg-white/10 text-white'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
              aria-expanded={isPlanActive}
            >
              <span className="flex items-center gap-3">
                <PhoneCall className="h-4 w-4" />
                Plan
              </span>
              <Sparkles className="h-3.5 w-3.5" />
            </button>

            {isPlanActive && (
              <div className="mt-2 space-y-1 pl-7">
                {planItems.map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    aria-current={pathname === to ? 'page' : undefined}
                    className={({ isActive: linkActive }) =>
                      `block rounded-md px-2 py-1.5 text-12 transition-colors ${
                        linkActive
                          ? 'bg-brand/20 text-white'
                          : 'text-white/70 hover:bg-white/5 hover:text-white'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </nav>
      </aside>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-sidebar/50 md:hidden"
            onClick={onClose}
          />
          <aside className="fixed left-0 top-0 z-50 flex h-full w-64 flex-col bg-sidebar px-4 py-5 text-white md:hidden">
            <div className="mb-8 flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10 text-12 font-semibold">
                  OG
                </div>
                <div>
                  <div className="text-13 font-semibold">On-Ground.ai</div>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav aria-label="Sidebar navigation" className="space-y-3">
              {mainItems.map(({ to, label, Icon }) => {
                const isActive = pathname === to;

                return (
                  <NavLink
                    key={to}
                    to={to}
                    onClick={onClose}
                    aria-current={isActive ? 'page' : undefined}
                    className={({ isActive: linkActive }) =>
                      `flex items-center gap-3 rounded-md px-3 py-2 text-13 transition-colors ${
                        linkActive
                          ? 'bg-white/10 text-white'
                          : 'text-white/70 hover:bg-white/5 hover:text-white'
                      }`
                    }
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </NavLink>
                );
              })}

              <div className="pt-2">
                <button
                  type="button"
                  className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-13 transition-colors ${
                    isPlanActive
                      ? 'bg-white/10 text-white'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                  aria-expanded={isPlanActive}
                >
                  <span className="flex items-center gap-3">
                    <PhoneCall className="h-4 w-4" />
                    Plan
                  </span>
                  <Sparkles className="h-3.5 w-3.5" />
                </button>

                {isPlanActive && (
                  <div className="mt-2 space-y-1 pl-7">
                    {planItems.map(({ to, label }) => (
                      <NavLink
                        key={to}
                        to={to}
                        onClick={onClose}
                        aria-current={pathname === to ? 'page' : undefined}
                        className={({ isActive: linkActive }) =>
                          `block rounded-md px-2 py-1.5 text-12 transition-colors ${
                            linkActive
                              ? 'bg-brand/20 text-white'
                              : 'text-white/70 hover:bg-white/5 hover:text-white'
                          }`
                        }
                      >
                        {label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </aside>
        </>
      )}
    </>
  );
}
