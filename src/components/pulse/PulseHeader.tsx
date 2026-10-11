import { Search, Sparkles } from 'lucide-react';

export function PulseHeader({
  searchTerm,
  onSearchChange,
}: {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}): JSX.Element {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-brand" />
        <div>
          <h1 className="text-20 font-semibold text-text">Pulse</h1>
          <p className="text-11 text-text-muted">Your team, in one place</p>
        </div>
      </div>
      <label className="flex min-w-[220px] items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-12 text-text-muted shadow-soft">
        <Search className="h-4 w-4 shrink-0" />
        <span className="sr-only">Search Pulse</span>
        <input
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search Pulse"
          className="min-w-0 flex-1 bg-transparent text-text outline-none placeholder:text-text-muted"
        />
      </label>
    </header>
  );
}
