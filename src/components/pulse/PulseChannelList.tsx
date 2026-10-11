import { Hash, MessageCircle, Sparkles, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Channel } from '../../data/types';
import { Card } from '../ui/Card';

function ChannelGroup({
  title,
  channels,
  icon: Icon,
}: {
  title: string;
  channels: Channel[];
  icon: typeof Hash;
}): JSX.Element | null {
  if (channels.length === 0) {
    return null;
  }

  return (
    <div>
      <p className="text-11 font-semibold uppercase tracking-[0.12em] text-text-muted">{title}</p>
      <div className="mt-2 space-y-2">
        {channels.map((channel) => (
          <Link
            key={channel.id}
            to={channel.slug === 'avanibot' ? '/pulse/avanibot' : `/pulse/${channel.id}`}
            className="flex items-center gap-3 rounded-md bg-card p-3 shadow-soft transition-colors hover:bg-card-soft"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-info-soft text-info">
              <Icon className="h-4 w-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-12 font-semibold text-text">{channel.slug}</span>
              <span className="mt-1 block truncate text-11 text-text-muted">
                {channel.description}
              </span>
            </span>
            {channel.unreadCount > 0 && (
              <span className="rounded-full bg-danger-soft px-2 py-1 text-10 font-semibold text-danger">
                {channel.unreadCount}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function PulseChannelList({
  role,
  task,
  general,
  direct,
  bot,
}: {
  role: Channel[];
  task: Channel[];
  general: Channel[];
  direct: Channel[];
  bot: Channel[];
}): JSX.Element {
  return (
    <Card className="mt-5 space-y-5">
      <ChannelGroup title="Role channels" channels={role} icon={Users} />
      <ChannelGroup title="Task channels" channels={task} icon={Hash} />
      <ChannelGroup title="General" channels={general} icon={Hash} />
      <ChannelGroup title="Direct messages" channels={direct} icon={MessageCircle} />
      <ChannelGroup title="AvaniBot" channels={bot} icon={Sparkles} />
    </Card>
  );
}
