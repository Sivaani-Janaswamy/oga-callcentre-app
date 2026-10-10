import { Bell, Trophy, Zap } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';

export function TopBar(): JSX.Element {
  return (
    <header className="flex items-center justify-between border-b border-border bg-card px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-brand/10 text-12 font-semibold text-brand">
          OG
        </div>
        <div>
          <p className="text-13 font-semibold text-text">On-Ground.ai</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Badge tone="danger" className="gap-1">
          <Bell className="h-3 w-3" />
          3
        </Badge>
        <Badge tone="success" className="gap-1">
          <Trophy className="h-3 w-3" />
          8 day streak
        </Badge>
        <Badge tone="purple" className="gap-1">
          <Zap className="h-3 w-3" />
          1,240 pts
        </Badge>
        <div className="flex items-center gap-2 rounded-full border border-border bg-card-soft px-2 py-1.5">
          <Avatar initials="AR" size="sm" />
          <span className="text-12 font-medium text-text">Arvind</span>
        </div>
      </div>
    </header>
  );
}
