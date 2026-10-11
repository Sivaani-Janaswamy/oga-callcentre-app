export function Avatar({
  initials,
  size = 'md',
}: {
  initials: string;
  size?: 'sm' | 'md' | 'lg';
}): JSX.Element {
  const sizes: Record<string, string> = {
    sm: 'h-7 w-7 text-10',
    md: 'h-9 w-9 text-11',
    lg: 'h-11 w-11 text-12',
  };

  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center rounded-full bg-brand/10 text-text font-semibold ${sizes[size]}`.trim()}
    >
      {initials}
    </div>
  );
}
