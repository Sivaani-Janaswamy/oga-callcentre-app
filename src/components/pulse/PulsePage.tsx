import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Channel } from '../../data/types';
import { useAsync } from '../../hooks/useAsync';
import { getChannels, getKudos, getPulseAgents } from '../../services/api';
import { DashboardError, DashboardLoading } from '../dashboard/DashboardState';
import { EmptyState } from '../ui/Skeleton';
import { AvaniBotCard } from './AvaniBotCard';
import { KudosCard } from './KudosCard';
import { PulseAgentList } from './PulseAgentList';
import { PulseChannelList } from './PulseChannelList';
import { PulseHeader } from './PulseHeader';

const EMPTY_DEPS: unknown[] = [];

export function PulsePage(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { data: agents, loading, error } = useAsync(getPulseAgents, EMPTY_DEPS);
  const {
    data: channels,
    loading: channelsLoading,
    error: channelsError,
  } = useAsync(getChannels, EMPTY_DEPS);
  const { data: kudos, loading: kudosLoading, error: kudosError } = useAsync(getKudos, EMPTY_DEPS);
  if (loading || channelsLoading || kudosLoading) {
    return <DashboardLoading />;
  }

  if (error || channelsError || kudosError) {
    return (
      <DashboardError
        message={(error ?? channelsError ?? kudosError)?.message ?? 'Pulse failed to load'}
      />
    );
  }

  const filteredAgents = (agents ?? []).filter((agent) => {
    const query = searchTerm.trim().toLowerCase();
    return (
      query.length === 0 ||
      agent.name.toLowerCase().includes(query) ||
      agent.description.toLowerCase().includes(query)
    );
  });
  const filterChannels = (items: Channel[]): Channel[] =>
    items.filter((channel) => {
      const query = searchTerm.trim().toLowerCase();
      return (
        query.length === 0 ||
        channel.slug.toLowerCase().includes(query) ||
        channel.description.toLowerCase().includes(query)
      );
    });
  const handleBotAction = (action: 'brief' | 'question'): void => {
    navigate('/pulse/avanibot', {
      state:
        action === 'brief' ? { autoMessage: 'Give me my daily brief' } : { focusComposer: true },
    });
  };

  const hasSearch = searchTerm.trim().length > 0;
  const noAgentResults = hasSearch && filteredAgents.length === 0;
  const allChannels =
    channels ?? { role: [], task: [], general: [], direct: [], bot: [] };
  const filteredChannelGroups = [
    filterChannels(allChannels.role),
    filterChannels(allChannels.task),
    filterChannels(allChannels.general),
    filterChannels(allChannels.direct),
    filterChannels(allChannels.bot),
  ];
  const noChannelResults =
    hasSearch && filteredChannelGroups.every((group) => group.length === 0);

  return (
    <section>
      <PulseHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <AvaniBotCard onAction={handleBotAction} />
      {noAgentResults ? (
        <EmptyState
          title={`No agents match "${searchTerm.trim()}"`}
          description="Try a different name or description."
        />
      ) : (
        <PulseAgentList agents={filteredAgents} />
      )}
      {channels && kudos && (
        <>
          {noChannelResults ? (
            <EmptyState
              title={`No channels match "${searchTerm.trim()}"`}
              description="Try a different channel name."
            />
          ) : (
            <PulseChannelList
              role={filteredChannelGroups[0]}
              task={filteredChannelGroups[1]}
              general={filteredChannelGroups[2]}
              direct={filteredChannelGroups[3]}
              bot={filteredChannelGroups[4]}
            />
          )}
          <KudosCard kudos={kudos} />
        </>
      )}
    </section>
  );
}
