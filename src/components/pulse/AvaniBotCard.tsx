import { Bot, FileText, MessageCircle } from 'lucide-react';
import { Card } from '../ui/Card';

export function AvaniBotCard({
  onAction,
}: {
  onAction: (action: 'brief' | 'question') => void;
}): JSX.Element {
  return (
    <Card className="mt-5 bg-gradient-to-br from-info-soft to-white">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-info">
          <Bot className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-13 font-semibold text-text">AvaniBot</h2>
          <p className="mt-1 text-12 text-text-muted">
            Your AI call-centre coach is ready to help.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onAction('brief')}
              className="inline-flex items-center gap-1 rounded-md bg-info px-3 py-1.5 text-11 font-semibold text-white"
            >
              <FileText className="h-3 w-3" />
              Daily Brief
            </button>
            <button
              type="button"
              onClick={() => onAction('question')}
              className="inline-flex items-center gap-1 rounded-md bg-white px-3 py-1.5 text-11 font-semibold text-info"
            >
              <MessageCircle className="h-3 w-3" />
              Ask a question
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
