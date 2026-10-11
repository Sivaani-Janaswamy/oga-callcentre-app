import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { AvaniBotCard } from './AvaniBotCard';
import { PulseHeader } from './PulseHeader';

export function PulsePage(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');
  const [botAction, setBotAction] = useState<'brief' | 'question' | null>(null);
  const actionTitle = botAction === 'brief' ? 'Daily Brief' : 'Ask AvaniBot';

  return (
    <section>
      <PulseHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <AvaniBotCard onAction={setBotAction} />
      {/* PLACEHOLDER: verify Pulse sections against mock until their fixtures are wired. */}
      <div className="mt-5 rounded-md border border-dashed border-border bg-card p-5 text-12 text-text-muted">
        Pulse updates and channels will appear here.
      </div>
      <Modal isOpen={botAction !== null} onClose={() => setBotAction(null)} title={actionTitle}>
        <p className="text-12 text-text-muted">
          {/* PLACEHOLDER: verify AvaniBot response content against mock. */}
          AvaniBot content will appear here.
        </p>
      </Modal>
    </section>
  );
}
