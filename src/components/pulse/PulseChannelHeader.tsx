import { ArrowLeft, Hash, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Channel } from '../../data/types';

export function PulseChannelHeader({ channel }: { channel: Channel }): JSX.Element {
  const isDirectMessage = channel.group === 'direct';
  const Icon = isDirectMessage ? MessageCircle : Hash;

  return (
    <header className="flex items-center gap-3">
      <Link
        to="/pulse"
        aria-label="Back to Pulse"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-card text-text-muted shadow-soft"
      >
        <ArrowLeft className="h-4 w-4" />
      </Link>
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-info-soft text-info">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <h1 className="truncate text-18 font-semibold text-text">{channel.slug}</h1>
        <p className="text-11 text-text-muted">{channel.description}</p>
      </div>
    </header>
  );
}
