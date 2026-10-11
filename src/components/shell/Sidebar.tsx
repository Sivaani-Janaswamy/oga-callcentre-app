import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  CalendarDays,
  Clock3,
  Home,
  MessagesSquare,
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  Radio,
  X,
} from 'lucide-react';

const mainItems = [
  { to: '/dashboard', label: 'Dashboard', Icon: Home, tile: 'bg-gradient-to-br from-brand to-brand-dark', icon: 'text-white' },
  { to: '/plan', label: 'Plan', Icon: PhoneCall, tile: 'bg-info/25', icon: 'text-info' },
  { to: '/calendar', label: 'Calendar', Icon: CalendarDays, tile: 'bg-amber/25', icon: 'text-amber' },
  { to: '/pulse', label: 'Pulse', Icon: MessagesSquare, tile: 'bg-purple/30', icon: 'text-purple' },
];

const planItems = [
  { to: '/plan/calls', label: 'Calls to make', Icon: PhoneOutgoing },
  { to: '/plan/incoming', label: 'Incoming', Icon: PhoneIncoming },
  { to: '/plan/recent', label: 'Recent', Icon: Clock3 },
  { to: '/plan/practise', label: 'Practise a call', Icon: Radio },
];

export function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}): JSX.Element {
  const { pathname } = useLocation();
  const isPlanActive = pathname === '/plan' || pathname.startsWith('/plan');
  const drawerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      drawerRef.current?.focus();
    }
  }, [isOpen]);

  const renderNav = (variant: 'desktop' | 'drawer'): JSX.Element => (
    <nav aria-label="Sidebar navigation" className="space-y-1">
      {mainItems.map(({ to, label, Icon, tile, icon }) => {
        const isActive =
          to === '/plan' ? isPlanActive : pathname === to || (to === '/dashboard' && pathname === '/');

        return (
          <div key={to}>
            <NavLink
              to={to}
              onClick={variant === 'drawer' ? onClose : undefined}
              aria-current={isActive ? 'page' : undefined}
              className={({ isActive: linkActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 text-13 transition-colors ${
                  isActive || linkActive
                    ? 'bg-white/10 font-semibold text-white'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <span className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-md ${tile}`}>
                <Icon className={`h-4 w-4 ${icon}`} />
              </span>
              {label}
            </NavLink>

            {to === '/plan' && (
              <div className="mt-1 space-y-0.5 pl-[38px]">
                {planItems.map(({ to: subTo, label: subLabel, Icon: SubIcon }) => (
                  <NavLink
                    key={subTo}
                    to={subTo}
                    onClick={variant === 'drawer' ? onClose : undefined}
                    aria-current={pathname === subTo ? 'page' : undefined}
                    className={({ isActive: linkActive }) =>
                      `flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-12 transition-colors ${
                        isActive || linkActive
                          ? 'bg-mint/15 font-semibold text-mint'
                          : 'text-white/50 hover:bg-white/5 hover:text-white/80'
                      }`
                    }
                  >
                    <SubIcon className="h-3.5 w-3.5" />
                    {subLabel}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );

  return (
    <>
      <aside className="hidden w-56 flex-col bg-gradient-to-b from-sidebar to-sidebar-end px-3 py-5 text-white md:flex">
        <p className="mb-6 px-3 text-13 font-bold text-white">On-Ground.ai</p>
        {renderNav('desktop')}
      </aside>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-sidebar/50 md:hidden"
            onClick={onClose}
          />
          <aside
            ref={drawerRef}
            tabIndex={-1}
            aria-label="Mobile menu"
            className="fixed left-0 top-0 z-50 flex w-56 flex-col bg-gradient-to-b from-sidebar to-sidebar-end px-3 py-5 text-white outline-none md:hidden"
          >
            <div className="mb-6 flex items-center justify-between px-3">
              <p className="text-13 font-bold text-white">On-Ground.ai</p>
              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {renderNav('drawer')}
          </aside>
        </>
      )}
    </>
  );
}
