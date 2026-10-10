import { CalendarDays, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import type { Agent } from '../../data/types';

const PERIOD_OPTIONS = ['Today', 'This Week', 'This Month'] as const;

export function GreetingBanner({ agent }: { agent: Agent }): JSX.Element {
  const [period, setPeriod] = useState<(typeof PERIOD_OPTIONS)[number]>('This Week');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="rounded-md bg-gradient-to-br from-sidebar to-brand p-6 text-white shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="text-13 text-white/70">{agent.greeting}</p>
          <h1 className="mt-1 text-24 font-semibold">{agent.name}</h1>
          <p className="mt-1 text-12 text-white/70">
            {agent.company} · {agent.role}
          </p>
        </div>

        <div className="flex flex-col items-start gap-2 sm:items-end">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-11 font-medium">
            <span className="h-2 w-2 rounded-full bg-success" />
            On Queue
          </span>
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-12 hover:bg-white/20"
            >
              <CalendarDays className="h-4 w-4" />
              {period}
              <ChevronDown className="h-3 w-3" />
            </button>
            {menuOpen ? (
              <div className="absolute right-0 z-10 mt-2 w-32 rounded-md bg-card p-1 text-text shadow-soft">
                {PERIOD_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className="block w-full rounded px-2 py-1.5 text-left text-11 hover:bg-card-soft"
                    onClick={() => {
                      setPeriod(option);
                      setMenuOpen(false);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {/* PLACEHOLDER: verify against mock - period menu behavior is not specified. */}
    </section>
  );
}
