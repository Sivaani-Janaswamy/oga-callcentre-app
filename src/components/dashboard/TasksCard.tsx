import { CheckCircle2, ChevronRight, FileText, Phone, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Task, TaskKind } from '../../data/types';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

const TASK_STYLES: Record<TaskKind, { icon: typeof Phone; tile: string }> = {
  callbacks: { icon: Phone, tile: 'bg-info-soft text-info' },
  hot_leads: { icon: Users, tile: 'bg-purple-soft text-purple' },
  outcome: { icon: FileText, tile: 'bg-accent-soft text-accent' },
};

function TaskContent({ task }: { task: Task }): JSX.Element {
  const style = TASK_STYLES[task.kind];
  const Icon = style.icon;

  return (
    <>
      <span className={`flex h-9 w-9 items-center justify-center rounded-md ${style.tile}`}>
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-12 font-semibold text-text">{task.title}</span>
        <span className="mt-0.5 block text-11 text-text-muted">{task.subtitle}</span>
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-text-muted" />
    </>
  );
}

export function TasksCard({
  tasks,
  onHotLeadsClick,
}: {
  tasks: Task[];
  onHotLeadsClick: () => void;
}): JSX.Element {
  return (
    <Card className="bg-gradient-to-br from-sidebar to-accent">
      <div className="flex items-center justify-between">
        <h2 className="text-13 font-semibold text-white">My Tasks</h2>
        <Badge tone="danger">{tasks.length}</Badge>
      </div>
      <div className="mt-3 space-y-2">
        {tasks.length === 0 ? (
          <div className="flex items-center gap-3 rounded-md bg-white p-2.5">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
            <span className="text-12 font-semibold text-text">All caught up</span>
          </div>
        ) : (
          tasks.map((task) => {
          if (task.kind === 'callbacks') {
            return (
              <Link
                key={task.id}
                to="/plan/calls"
                className="flex items-center gap-3 rounded-md bg-white p-2.5"
              >
                <TaskContent task={task} />
              </Link>
            );
          }

          if (task.kind === 'outcome') {
            return (
              <Link
                key={task.id}
                to="/plan/recent"
                className="flex items-center gap-3 rounded-md bg-white p-2.5"
              >
                <TaskContent task={task} />
              </Link>
            );
          }

          return (
            <button
              key={task.id}
              type="button"
              onClick={onHotLeadsClick}
              className="flex w-full items-center gap-3 rounded-md bg-white p-2.5 text-left"
            >
              <TaskContent task={task} />
            </button>
          );
          })
        )}
      </div>
      {/* PLACEHOLDER: verify against mock - callback task target is assumed to open /plan/calls. */}
      {/* PLACEHOLDER: verify against mock - outcome task target is assumed to open /plan/recent. */}
    </Card>
  );
}
