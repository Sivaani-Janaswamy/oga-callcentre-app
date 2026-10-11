import type { Message } from '../../data/types';
import { formatMessageTime } from '../../utils/format';
import { Sparkles } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { EmptyState } from '../ui/Skeleton';

function messageTime(message: Message): string {
  return message.timeLabel ?? formatMessageTime(message.sentAt);
}

function MessageBubble({ message }: { message: Message }): JSX.Element {
  if (message.kind === 'system') {
    return (
      <p className="text-center text-10 text-text-muted">
        {message.body} · {messageTime(message)}
      </p>
    );
  }

  if (message.isBot) {
    return (
      <div className="flex gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-soft text-purple">
          <Sparkles className="h-3.5 w-3.5" />
        </span>
        <div className="min-w-0 max-w-[75%]">
          <div className="flex items-center gap-2">
            <span className="text-12 font-semibold text-text">AvaniBot</span>
            <span className="rounded-full bg-purple-soft px-1.5 py-0.5 text-10 font-semibold text-purple">
              BOT
            </span>
            <span className="text-10 text-text-muted">{messageTime(message)}</span>
          </div>
          <div className="mt-1 rounded-md border border-border bg-card px-3 py-2">
            <p className="whitespace-pre-line text-12 text-text">{message.body}</p>
          </div>
        </div>
      </div>
    );
  }

  if (message.isSelf) {
    return (
      <div className="flex justify-end gap-2">
        <div className="max-w-[75%] items-end">
          <p className="text-right text-10 text-text-muted">
            <span className="font-semibold text-text">You</span> · {messageTime(message)}
          </p>
          <div className="mt-1 rounded-md bg-success px-3 py-2 text-white">
            <p className="text-12">{message.body}</p>
          </div>
        </div>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-success text-11 font-semibold text-white">
          Y
        </span>
      </div>
    );
  }

  return (
    <div className={`flex gap-2 ${message.isSelf ? 'justify-end' : 'justify-start'}`}>
      {!message.isSelf && <Avatar initials={message.authorInitials} size="sm" />}
      <div className={`max-w-[75%] ${message.isSelf ? 'items-end' : 'items-start'}`}>
        <div
          className={`rounded-md px-3 py-2 ${
            message.isSelf ? 'bg-info text-white' : 'bg-card-soft text-text'
          }`}
        >
          <p className="text-12">{message.body}</p>
        </div>
        <p className="mt-1 text-10 text-text-muted">
          {message.authorName} · {messageTime(message)}
        </p>
      </div>
    </div>
  );
}

export function MessageList({ messages }: { messages: Message[] }): JSX.Element {
  return (
    <div
      aria-label="Message history"
      tabIndex={0}
      className="mt-5 max-h-[480px] space-y-4 overflow-y-auto rounded-md bg-page p-4"
    >
      {messages.length === 0 ? (
        <EmptyState
          title="No messages yet"
          description="Say hello to start the conversation."
        />
      ) : (
        messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))
      )}
    </div>
  );
}
