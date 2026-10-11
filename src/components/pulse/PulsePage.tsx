import { useState } from 'react';
import { useAsync } from '../../hooks/useAsync';
import { getPulseAgents } from '../../services/api';
import { DashboardError, DashboardLoading } from '../dashboard/DashboardState';
import { Modal } from '../ui/Modal';
import { AvaniBotCard } from './AvaniBotCard';
import { PulseAgentList } from './PulseAgentList';
import { PulseHeader } from './PulseHeader';

const EMPTY_DEPS: unknown[] = [];

export function PulsePage(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');
  const [botAction, setBotAction] = useState<'brief' | 'question' | null>(null);
  const { data: agents, loading, error } = useAsync(getPulseAgents, EMPTY_DEPS);
  const actionTitle = botAction === 'brief' ? 'Daily Brief' : 'Ask AvaniBot';

  if (loading) {
    return <DashboardLoading />;
  }

  if (error) {
    return <DashboardError message={error.message} />;
  }

  const filteredAgents = (agents ?? []).filter((agent) => {
    const query = searchTerm.trim().toLowerCase();
    return (
      query.length === 0 ||
      agent.name.toLowerCase().includes(query) ||
      agent.description.toLowerCase().includes(query)
    );
  });

  return (
    <section>
      <PulseHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <AvaniBotCard onAction={setBotAction} />
      <PulseAgentList agents={filteredAgents} />
      <Modal isOpen={botAction !== null} onClose={() => setBotAction(null)} title={actionTitle}>
        <p className="text-12 text-text-muted">
          {/* PLACEHOLDER: verify AvaniBot response content against mock. */}
          AvaniBot content will appear here.
        </p>
      </Modal>
    </section>
  );
}
