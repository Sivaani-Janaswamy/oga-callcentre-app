import { useState } from 'react';
import type { Channel } from '../../data/types';
import { useAsync } from '../../hooks/useAsync';
import { getChannels, getKudos, getPulseAgents } from '../../services/api';
import { DashboardError, DashboardLoading } from '../dashboard/DashboardState';
import { Modal } from '../ui/Modal';
import { AvaniBotCard } from './AvaniBotCard';
import { KudosCard } from './KudosCard';
import { PulseAgentList } from './PulseAgentList';
import { PulseChannelList } from './PulseChannelList';
import { PulseHeader } from './PulseHeader';

const EMPTY_DEPS: unknown[] = [];

export function PulsePage(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');
  const [botAction, setBotAction] = useState<'brief' | 'question' | null>(null);
  const { data: agents, loading, error } = useAsync(getPulseAgents, EMPTY_DEPS);
  const { data: channels, loading: channelsLoading, error: channelsError } = useAsync(
    getChannels,
    EMPTY_DEPS,
  );
  const { data: kudos, loading: kudosLoading, error: kudosError } = useAsync(
    getKudos,
    EMPTY_DEPS,
  );
  const actionTitle = botAction === 'brief' ? 'Daily Brief' : 'Ask AvaniBot';

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

  return (
    <section>
      <PulseHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <AvaniBotCard onAction={setBotAction} />
      <PulseAgentList agents={filteredAgents} />
      {channels && kudos && (
        <>
          <PulseChannelList
            role={filterChannels(channels.role)}
            task={filterChannels(channels.task)}
            general={filterChannels(channels.general)}
            direct={filterChannels(channels.direct)}
          />
          <KudosCard kudos={kudos} />
        </>
      )}
      <Modal isOpen={botAction !== null} onClose={() => setBotAction(null)} title={actionTitle}>
        <p className="text-12 text-text-muted">
          {/* PLACEHOLDER: verify AvaniBot response content against mock. */}
          AvaniBot content will appear here.
        </p>
      </Modal>
    </section>
  );
}
