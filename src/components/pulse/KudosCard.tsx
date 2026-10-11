import { Heart } from 'lucide-react';
import type { Kudos } from '../../data/types';
import { Card } from '../ui/Card';

export function KudosCard({ kudos }: { kudos: Kudos }): JSX.Element {
  return (
    <Card className="mt-5 bg-accent-soft">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-danger">
          <Heart className="h-4 w-4" />
        </span>
        <div>
          <p className="text-11 font-semibold uppercase tracking-[0.12em] text-text-muted">Kudos</p>
          <p className="mt-1 text-12 font-semibold text-text">From {kudos.from}</p>
          <p className="mt-1 text-12 text-text-muted">{kudos.message}</p>
        </div>
      </div>
    </Card>
  );
}
