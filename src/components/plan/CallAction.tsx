import { PhoneCall } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CallActionProps {
  calling: boolean;
  label: string;
  onCall: () => void;
  onCancel: () => void;
  onEndCall: () => void;
  showCalledBack?: boolean;
}

export function CallAction({
  calling,
  label,
  onCall,
  onCancel,
  onEndCall,
  showCalledBack = false,
}: CallActionProps): JSX.Element {
  const [inCall, setInCall] = useState(false);
  const [callSeconds, setCallSeconds] = useState(0);
  const [showLogged, setShowLogged] = useState(false);

  useEffect(() => {
    if (!calling) {
      setInCall(false);
      setCallSeconds(0);
      return undefined;
    }

    const callingTimer = window.setTimeout(() => {
      setInCall(true);
    }, 2000);

    return () => window.clearTimeout(callingTimer);
  }, [calling]);

  useEffect(() => {
    if (!inCall) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setCallSeconds((prev) => prev + 1);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [inCall]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = (): void => {
    setInCall(false);
    setCallSeconds(0);
    onEndCall();
    if (!showCalledBack) {
      setShowLogged(true);
      window.setTimeout(() => setShowLogged(false), 2000);
    }
  };

  if (showCalledBack) {
    return (
      <span className="inline-flex items-center gap-1 rounded-md bg-success-soft px-2 py-1 text-10 font-semibold text-success">
        ✓ Called back
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        disabled={calling || inCall}
        onClick={onCall}
        className="inline-flex items-center gap-1 rounded-md bg-success px-2 py-1 text-10 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        <PhoneCall className="h-3 w-3" />
        {inCall ? `In call ${formatTime(callSeconds)}` : calling ? 'Calling…' : label}
      </button>
      {calling && !inCall && (
        <button type="button" onClick={onCancel} className="text-10 text-text-muted underline">
          Cancel
        </button>
      )}
      {inCall && (
        <button
          type="button"
          onClick={handleEndCall}
          className="text-10 font-semibold text-danger underline"
        >
          End call
        </button>
      )}
      {showLogged && <span className="text-10 font-semibold text-success">Call logged</span>}
    </div>
  );
}
