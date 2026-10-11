import { PhoneCall } from 'lucide-react';

interface CallActionProps {
  calling: boolean;
  label: string;
  onCall: () => void;
  onCancel: () => void;
}

export function CallAction({
  calling,
  label,
  onCall,
  onCancel,
}: CallActionProps): JSX.Element {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        disabled={calling}
        onClick={onCall}
        className="inline-flex items-center gap-1 rounded-md bg-success px-2 py-1 text-10 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        <PhoneCall className="h-3 w-3" />
        {calling ? 'Calling…' : label}
      </button>
      {calling && (
        <button type="button" onClick={onCancel} className="text-10 text-text-muted underline">
          Cancel
        </button>
      )}
    </div>
  );
}
