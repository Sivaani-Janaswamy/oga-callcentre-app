import type { ReactNode } from 'react';

export function Badge({
  children,
  tone = 'default',
  className = '',
}: {
  children: ReactNode;
  tone?: 'default' | 'success' | 'danger' | 'warn' | 'purple';
  className?: string;
}): JSX.Element {
  const toneStyles: Record<string, string> = {
    default: 'bg-card-soft text-text-muted border border-border',
    success: 'bg-success-soft text-success border border-success/20',
    danger: 'bg-danger-soft text-danger border border-danger/20',
    warn: 'bg-warn-soft text-warn border border-warn/20',
    purple: 'bg-purple-soft text-purple border border-purple/20',
  };

  return <span className={`inline-flex items-center rounded-full px-2 py-1 text-10 font-medium ${toneStyles[tone]} ${className}`.trim()}>{children}</span>;
}
