import { Send } from 'lucide-react';
import { useState, type ElementRef, type FormEvent, type RefObject } from 'react';

export function MessageComposer({
  onSend,
  placeholder = 'Write a message...',
  inputRef,
}: {
  onSend?: (body: string) => void;
  placeholder?: string;
  inputRef?: RefObject<ElementRef<'input'>>;
}): JSX.Element {
  const [draft, setDraft] = useState('');
  const canSend = draft.trim().length > 0 && onSend !== undefined;

  const submit = (event: FormEvent): void => {
    event.preventDefault();
    if (!canSend) {
      return;
    }

    onSend(draft.trim());
    setDraft('');
  };

  return (
    <form onSubmit={submit} className="mt-3 flex items-center gap-2 rounded-md bg-card p-2 shadow-soft">
      <input
        ref={inputRef}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent px-2 text-12 text-text outline-none placeholder:text-text-muted"
      />
      <button
        type="submit"
        disabled={!canSend}
        aria-label="Send message"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-info text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}
