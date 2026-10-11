import type { ReactNode } from 'react';

export function Card({
  className = '',
  role,
  ariaLabel,
  children,
}: {
  className?: string;
  role?: string;
  ariaLabel?: string;
  children: ReactNode;
}): JSX.Element {
  return (
    <div
      role={role}
      aria-label={ariaLabel}
      className={`rounded-md border border-border bg-card p-4 shadow-soft ${className}`.trim()}
    >
      {children}
    </div>
  );
}
