import type { ReactNode } from 'react';

export function Card({
  className = '',
  children,
}: {
  className?: string;
  children: ReactNode;
}): JSX.Element {
  return <div className={`rounded-md border border-border bg-card p-4 shadow-soft ${className}`.trim()}>{children}</div>;
}
