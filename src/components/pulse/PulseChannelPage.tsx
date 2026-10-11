import { useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAsync } from '../../hooks/useAsync';
import { getChannel } from '../../services/api';
import { DashboardError, DashboardLoading } from '../dashboard/DashboardState';
import { NeedsInputCard } from './NeedsInputCard';
import { PulseChannelHeader } from './PulseChannelHeader';
import { MessageList } from './MessageList';
import { MessageComposer } from './MessageComposer';

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
      {data.needsInput && <NeedsInputCard needsInput={data.needsInput} />}
      <MessageList messages={data.messages} />
      <MessageComposer />
    </section>
  );
}
