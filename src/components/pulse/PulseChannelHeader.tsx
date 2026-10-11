import { ArrowLeft, Hash, MessageCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Channel } from '../../data/types';

export function PulseChannelHeader({ channel }: { channel: Channel }): JSX.Element {
  const isDirectMessage = channel.group === 'direct';
  const isAvaniBot = channel.slug === 'avanibot';
  const Icon = isDirectMessage ? MessageCircle : Hash;

  return (
    <header
      className={`flex items-center gap-3 rounded-md p-3 ${
        isAvaniBot ? 'bg-purple text-white' : 'bg-card'
      }`}
    >
      <Link
        to="/pulse"
        aria-label="Back to Pulse"
        className={`flex h-8 w-8 items-center justify-center rounded-full shadow-soft ${
          isAvaniBot ? 'bg-white/20 text-white' : 'bg-card text-text-muted'
        }`}
      >
        <ArrowLeft className="h-4 w-4" />
      </Link>
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full ${
          isAvaniBot ? 'bg-white/20 text-white' : 'bg-info-soft text-info'
        }`}
      >
        {isAvaniBot ? <Sparkles className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
      </span>
      <div className="min-w-0">
        <h1 className={`truncate text-18 font-semibold ${isAvaniBot ? 'text-white' : 'text-text'}`}>
          {isAvaniBot ? 'AvaniBot' : channel.slug}
        </h1>
        <p className={isAvaniBot ? 'text-11 text-white/70' : 'text-11 text-text-muted'}>
          {isAvaniBot ? 'Your AI call-centre coach' : channel.description}
        </p>
      </div>
      {isAvaniBot && (
        <button
          type="button"
          tabIndex={-1}
          aria-label="AvaniBot sparkle"
          className="pointer-events-none ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white"
        >
          <Sparkles className="h-4 w-4" />
        </button>
      )}
    </header>
  );
}
