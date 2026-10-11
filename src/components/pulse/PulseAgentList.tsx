import type { PulseAgent } from '../../data/types';
import { Avatar } from '../ui/Avatar';
import { Card } from '../ui/Card';

function AgentGroup({
  title,
  agents,
}: {
  title: string;
  agents: PulseAgent[];
}): JSX.Element | null {
  if (agents.length === 0) {
    return null;
  }

  return (
    <div>
      <p className="text-11 font-semibold uppercase tracking-[0.12em] text-text-muted">{title}</p>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {agents.map((agent) => (
          <div key={agent.id} className="flex items-center gap-3 rounded-md bg-card p-3 shadow-soft">
            <Avatar initials={agent.initials} size="md" />
            <div className="min-w-0 flex-1">
              <p className="text-12 font-semibold text-text">{agent.name}</p>
              <p className="mt-1 truncate text-11 text-text-muted">{agent.description}</p>
            </div>
            {agent.progressPercent !== undefined && (
              <span className="rounded-full bg-success-soft px-2 py-1 text-10 font-semibold text-success">
                {agent.progressPercent}%
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function PulseAgentList({ agents }: { agents: PulseAgent[] }): JSX.Element {
  const roleAgents = agents.filter((agent) => agent.group === 'role');
  const taskAgents = agents.filter((agent) => agent.group === 'task');

  return (
    <Card className="mt-5 space-y-5">
      <AgentGroup title="Role agents" agents={roleAgents} />
      <AgentGroup title="Task agents" agents={taskAgents} />
    </Card>
  );
}
