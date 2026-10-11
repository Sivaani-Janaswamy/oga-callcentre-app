import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useMemo } from 'react';
import { useAsync } from '../../hooks/useAsync';
import { getHotLeads, getSignals } from '../../services/api';
import { DashboardError, DashboardLoading } from '../dashboard/DashboardState';
import { Modal } from '../ui/Modal';
import { LeadSignals } from './LeadSignals';
import { LeadSummaryCard } from './LeadSummaryCard';

const EMPTY_DEPS: unknown[] = [];

export function HotLeadsModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}): JSX.Element | null {
  const [index, setIndex] = useState(0);
  const { data: leads, loading, error } = useAsync(getHotLeads, EMPTY_DEPS);
  const lead = leads?.[index];
  const signalsRequest = useCallback(() => getSignals(lead?.id ?? ''), [lead?.id]);
  const signalsDeps = useMemo(() => [lead?.id], [lead?.id]);
  const {
    data: signals,
    loading: signalsLoading,
    error: signalsError,
  } = useAsync(signalsRequest, signalsDeps);

  useEffect(() => {
    if (isOpen) {
      setIndex(0);
    }
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent): void => {
      if (!isOpen || !leads || leads.length === 0) {
        return;
      }
      if (event.key === 'ArrowLeft') {
        setIndex((current) => (current === 0 ? leads.length - 1 : current - 1));
      }
      if (event.key === 'ArrowRight') {
        setIndex((current) => (current === leads.length - 1 ? 0 : current + 1));
      }
    },
    [isOpen, leads],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const canGoBack = index > 0;
  const canGoForward = leads ? index < leads.length - 1 : false;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Hot leads">
      {loading && <DashboardLoading />}
      {error && <DashboardError message={error.message} />}
      {!loading && !error && lead && leads && (
        <>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-12 font-semibold text-text">
              Lead {index + 1} of {leads.length}
            </p>
            <div className="flex gap-1">
              {leads.map((item, itemIndex) => (
                <span
                  key={item.id}
                  className={`h-1.5 w-1.5 rounded-full ${
                    itemIndex === index ? 'bg-brand' : 'bg-border'
                  }`}
                />
              ))}
            </div>
          </div>
          <LeadSummaryCard lead={lead} />
          {signalsLoading && <DashboardLoading />}
          {signalsError && <DashboardError message={signalsError.message} />}
          {!signalsLoading && !signalsError && signals && (
            <LeadSignals lead={lead} signals={signals} />
          )}
          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              aria-label="Previous lead"
              disabled={!canGoBack}
              onClick={() => setIndex((current) => current - 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next lead"
              disabled={!canGoForward}
              onClick={() => setIndex((current) => current + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}
