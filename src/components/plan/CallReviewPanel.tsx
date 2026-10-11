import { Check, FileText, X } from 'lucide-react';
import { useCallback, useMemo } from 'react';
import type { Call } from '../../data/types';
import { useAsync } from '../../hooks/useAsync';
import { getCallReview } from '../../services/api';
import { DashboardError, DashboardLoading } from '../dashboard/DashboardState';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { ProgressBar } from '../ui/ProgressBar';

export function CallReviewPanel({
  call,
  onClose,
}: {
  call: Call | null;
  onClose: () => void;
}): JSX.Element {
  const request = useCallback(() => {
    if (!call) {
      return Promise.resolve(null);
    }

    return getCallReview(call.id);
  }, [call]);
  const requestDeps = useMemo(() => [call?.id], [call?.id]);
  const { data: review, loading, error } = useAsync(request, requestDeps);

  if (!call) {
    return <></>;
  }

  return (
    <Modal
      isOpen
      onClose={onClose}
      title={`Call with ${call.displayName}.`}
      titleAdornment={
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-purple-soft text-purple">
          <FileText className="h-4 w-4" />
        </span>
      }
    >
      <p className="mb-4 text-11 text-text-muted">{call.whenLabel}</p>
      {loading ? <DashboardLoading /> : null}
      {error ? <DashboardError message={error.message} /> : null}
      {!loading && !error && review ? <ReviewContent review={review} /> : null}
      {!loading && !error && !review ? (
        <p className="rounded-md bg-card-soft p-4 text-13 text-text-muted">
          No SOP review available for this call.
        </p>
      ) : null}
    </Modal>
  );
}

function ReviewContent({
  review,
}: {
  review: NonNullable<Awaited<ReturnType<typeof getCallReview>>>;
}): JSX.Element {
  return (
    <>
      <div className="rounded-md bg-card-soft p-4">
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-12 font-semibold text-text">SOP adherence on this call</p>
            <ProgressBar value={review.adherencePercent} className="mt-3" />
          </div>
          <p className="text-24 font-semibold text-success">{review.adherencePercent}%</p>
        </div>
      </div>
      <div className="mt-4 divide-y divide-border">
        {review.checklist.map((item) => (
          <div key={item.label} className="flex gap-3 py-3">
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                item.passed ? 'bg-success-soft text-success' : 'bg-danger-soft text-danger'
              }`}
            >
              {item.passed ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <p className={`text-12 font-semibold ${item.passed ? 'text-text' : 'text-danger'}`}>
                  {item.label}
                </p>
                {!item.passed ? <Badge tone="danger">Missed</Badge> : null}
              </div>
              {item.quote ? (
                <p className="mt-1 text-12 italic text-text-muted">“{item.quote}”</p>
              ) : null}
              {item.failureMessage ? (
                <p className="mt-1 text-12 text-danger">{item.failureMessage}</p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
