import { useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAsync } from '../../hooks/useAsync';
import { getChannel } from '../../services/api';
import { DashboardError, DashboardLoading } from '../dashboard/DashboardState';
import { PulseChannelHeader } from './PulseChannelHeader';

export function PulseChannelPage(): JSX.Element {
  const { channelId } = useParams<{ channelId: string }>();
  const request = useCallback(() => getChannel(channelId ?? ''), [channelId]);
  const requestDeps = useMemo(() => [channelId], [channelId]);
  const { data, loading, error } = useAsync(request, requestDeps);

  if (loading) {
    return <DashboardLoading />;
  }

  if (error) {
    return <DashboardError message={error.message} />;
  }

  if (!data) {
    return <DashboardError message="Channel could not be loaded." />;
  }

  return (
    <section>
      <PulseChannelHeader channel={data.channel} />
      {/* PLACEHOLDER: verify channel message layout against mock until the chat is wired. */}
      <div className="mt-5 rounded-md border border-dashed border-border bg-card p-5 text-12 text-text-muted">
        Messages for this channel will appear here.
      </div>
    </section>
  );
}
