import { Pin } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import type { NeedsInput } from '../../data/types';
import { Card } from '../ui/Card';

export function NeedsInputCard({
  needsInput,
  onAnswer,
  showLabel = true,
}: {
  needsInput: NeedsInput;
  onAnswer?: (answer: string) => void;
  showLabel?: boolean;
}): JSX.Element {
  const answered = needsInput.status === 'answered';
  const [draft, setDraft] = useState('');

  const submit = (event: FormEvent): void => {
    event.preventDefault();
    const answer = draft.trim();

    if (answer.length > 0) {
      onAnswer?.(answer);
      setDraft('');
    }
  };

  if (answered) {
    return (
      <Card className="border border-success/30 bg-success-soft">
        <p className="text-12 font-semibold text-success">✓ Answered: {needsInput.answer}</p>
      </Card>
    );
  }

  return (
    <Card className="border border-warning/30 bg-warning-soft">
      <div className="flex items-start gap-3">
        <Pin className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
        <div className="min-w-0 flex-1">
          {showLabel && (
            <p className="text-11 font-semibold uppercase tracking-[0.12em] text-text-muted">
              Needs your input
            </p>
          )}
          <p className="mt-1 text-13 font-semibold text-text">{needsInput.title}</p>
          <p className="mt-1 text-11 text-text-muted">{needsInput.subtitle}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {needsInput.options.map((option) => (
              <button
                key={option}
                type="button"
                disabled={onAnswer === undefined}
                onClick={() => onAnswer?.(option)}
                className="rounded-md bg-white px-3 py-1.5 text-11 font-semibold text-text disabled:cursor-not-allowed disabled:opacity-60"
              >
                {option}
              </button>
            ))}
            <form onSubmit={submit} className="mt-2 flex w-full gap-2">
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Or type your answer"
                className="min-w-0 flex-1 rounded-md bg-white px-3 py-1.5 text-11 text-text outline-none placeholder:text-text-muted"
              />
              <button
                type="submit"
                disabled={draft.trim().length === 0 || onAnswer === undefined}
                className="rounded-md bg-warning px-3 py-1.5 text-11 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </Card>
  );
}
