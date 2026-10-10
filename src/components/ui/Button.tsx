import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export function Button({
  children,
  className = '',
  variant = 'primary',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
}): JSX.Element {
  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-brand text-white hover:bg-brand/90',
    secondary: 'bg-card-soft text-text border border-border hover:bg-card',
    ghost: 'bg-transparent text-text-muted hover:bg-card-soft',
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-md px-3 py-2 text-12 font-medium transition-colors ${variants[variant]} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
