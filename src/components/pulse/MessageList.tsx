import type { Message } from '../../data/types';
import { formatMessageTime } from '../../utils/format';
import { Avatar } from '../ui/Avatar';

function MessageBubble({ message }: { message: Message }): JSX.Element {
  if (message.kind === 'system') {
    return (
      <p className="text-center text-10 text-text-muted">
        {message.body} · {formatMessageTime(message.sentAt)}
      </p>
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
          {message.authorName} · {formatMessageTime(message.sentAt)}
        </p>
      </div>
    </div>
  );
}

export function MessageList({ messages }: { messages: Message[] }): JSX.Element {
  return (
    <div className="mt-5 max-h-[480px] space-y-4 overflow-y-auto rounded-md bg-page p-4">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </div>
  );
}
