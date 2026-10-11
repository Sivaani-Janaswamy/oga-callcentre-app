import { Pin } from 'lucide-react';
import type { NeedsInput } from '../../data/types';
import { Card } from '../ui/Card';

export function NeedsInputCard({
  needsInput,
  onAnswer,
}: {
  needsInput: NeedsInput;
  onAnswer?: (answer: string) => void;
}): JSX.Element {
  const answered = needsInput.status === 'answered';

  return (
    <Card className="mt-5 border-l-4 border-l-warning bg-warning-soft">
      <div className="flex items-start gap-3">
        <Pin className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
        <div className="min-w-0 flex-1">
          <p className="text-11 font-semibold uppercase tracking-[0.12em] text-text-muted">
            Needs your input
          </p>
          <p className="mt-1 text-13 font-semibold text-text">{needsInput.title}</p>
          <p className="mt-1 text-11 text-text-muted">{needsInput.subtitle}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {needsInput.options.map((option) => (
              <button
                key={option}
                type="button"
                disabled={answered || onAnswer === undefined}
                onClick={() => onAnswer?.(option)}
                className="rounded-md bg-white px-3 py-1.5 text-11 font-semibold text-text disabled:cursor-not-allowed disabled:opacity-60"
              >
                {option}
              </button>
            ))}
          </div>
          {answered && (
            <p className="mt-2 text-11 font-semibold text-success">Answer saved: {needsInput.answer}</p>
          )}
        </div>
      </div>
    </Card>
  );
}
