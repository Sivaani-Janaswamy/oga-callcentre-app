import { useState } from 'react';
import type { PractiseScenario } from '../../data/types';
import { useAsync } from '../../hooks/useAsync';
import { getPractiseScenarios } from '../../services/api';
import { formatInr } from '../../utils/format';
import { DashboardError, DashboardLoading } from '../dashboard/DashboardState';
import { EmptyState } from '../ui/Skeleton';
import { PractiseCallModal } from './PractiseCallModal';

const EMPTY_DEPS: unknown[] = [];

const difficultyClasses: Record<PractiseScenario['difficulty'], string> = {
  easy: 'bg-success-soft text-success',
  medium: 'bg-warn-soft text-warn',
  hard: 'bg-danger-soft text-danger',
};

function ScenarioCard({
  scenario,
  onStart,
}: {
  scenario: PractiseScenario;
  onStart: () => void;
}): JSX.Element {
  return (
    <article className="flex flex-wrap items-center gap-4 rounded-md border border-border bg-card p-4 shadow-soft">
      <div className="min-w-0 flex-1">
        <h3 className="text-13 font-semibold text-text">{scenario.title}</h3>
        <p className="mt-1 text-11 text-text-muted">{scenario.description}</p>
      </div>
      <span
        className={`rounded-full px-2 py-1 text-10 font-semibold ${difficultyClasses[scenario.difficulty]}`}
      >
        {scenario.difficulty}
      </span>
      <p className="text-13 font-semibold text-success">+{formatInr(scenario.rewardInr)}</p>
      <button
        type="button"
        className="rounded-md bg-brand px-4 py-2 text-12 font-semibold text-white hover:bg-brand-dark"
        onClick={onStart}
      >
        Start
      </button>
    </article>
  );
}

export function PractisePage(): JSX.Element {
  const { data, loading, error } = useAsync(getPractiseScenarios, EMPTY_DEPS);
  const [selectedScenario, setSelectedScenario] = useState<PractiseScenario | null>(null);

  if (loading) {
    return <DashboardLoading />;
  }
  if (error) {
    return <DashboardError message={error.message} />;
  }

  return (
    <section>
      <h2 className="text-20 font-semibold text-text">Practise a call</h2>
      <p className="mt-1 text-13 text-text-muted">Rehearse a scenario and earn coaching rewards</p>
      <div className="mt-5 space-y-3">
        {(data ?? []).length === 0 ? (
          <EmptyState
            title="No practice scenarios"
            description="Check back later for new coaching scenarios."
          />
        ) : (
          (data ?? []).map((scenario) => (
          <ScenarioCard
            key={scenario.id}
            scenario={scenario}
            onStart={() => setSelectedScenario(scenario)}
          />
          ))
        )}
      </div>
      {selectedScenario && (
        <PractiseCallModal scenario={selectedScenario} onClose={() => setSelectedScenario(null)} />
      )}
    </section>
  );
}
