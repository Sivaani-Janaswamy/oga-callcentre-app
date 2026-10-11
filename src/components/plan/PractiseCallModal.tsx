import { useEffect, useState } from 'react';
import type { PractiseScenario } from '../../data/types';
import { completePractise } from '../../services/api';
import { formatInr } from '../../utils/format';
import { Modal } from '../ui/Modal';

export function PractiseCallModal({
  scenario,
  onClose,
}: {
  scenario: PractiseScenario;
  onClose: () => void;
}): JSX.Element {
  const totalSteps = Math.floor(scenario.script.length / 2);
  const [completedSteps, setCompletedSteps] = useState(0);
  const [visibleStep, setVisibleStep] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [finished, setFinished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timerStartedAt = window.performance.now();
    const timer = window.setInterval(() => {
      setElapsedSeconds(Math.floor((window.performance.now() - timerStartedAt) / 1000));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (finished || completedSteps >= totalSteps) {
      return undefined;
    }

    const timeout = window.setTimeout(() => setVisibleStep(completedSteps), 800);
    return () => window.clearTimeout(timeout);
  }, [completedSteps, finished, totalSteps]);

  const formatTimer = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
  };

  const handleReply = async (): Promise<void> => {
    if (visibleStep === null || saving) {
      return;
    }

    const nextStep = visibleStep + 1;
    setVisibleStep(null);
    setCompletedSteps(nextStep);

    if (nextStep !== totalSteps) {
      return;
    }

    setSaving(true);
    setError(null);
    try {
      await completePractise(scenario.id);
      setFinished(true);
    } catch (caughtError: unknown) {
      setError(caughtError instanceof Error ? caughtError.message : 'Could not save reward.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal isOpen onClose={onClose} title="Practice customer">
      <div className="flex items-center justify-between text-12 text-text-muted">
        <span>{scenario.title}</span>
        <span className="font-semibold text-text">{formatTimer(elapsedSeconds)}</span>
      </div>
      <div className="mt-4 space-y-3 rounded-md bg-card-soft p-3">
        {Array.from({ length: completedSteps }, (_, index) => (
          <div key={index} className="space-y-2">
            <p className="max-w-[85%] rounded-md bg-border/50 p-3 text-12 text-text">
              {scenario.script[index * 2]?.text}
            </p>
            <p className="ml-auto max-w-[85%] rounded-md bg-brand p-3 text-12 text-white">
              {scenario.script[index * 2 + 1]?.text}
            </p>
          </div>
        ))}
        {visibleStep !== null && !finished && (
          <div className="space-y-3">
            <p className="max-w-[85%] rounded-md bg-border/50 p-3 text-12 text-text">
              {scenario.script[visibleStep * 2]?.text}
            </p>
            <button
              type="button"
              className="w-full rounded-md border-2 border-brand bg-success-soft p-3 text-left text-12 font-semibold text-brand-dark hover:bg-brand/10"
              onClick={() => void handleReply()}
              disabled={saving}
            >
              Say: {scenario.script[visibleStep * 2 + 1]?.text}
            </button>
          </div>
        )}
        {finished && (
          <div className="text-center">
            <p className="text-18 font-semibold text-success">Practice complete</p>
            <p className="mt-1 text-13 font-semibold text-success">
              +{formatInr(scenario.rewardInr)} earned
            </p>
            <button
              type="button"
              className="mt-4 rounded-md bg-brand px-5 py-2 text-12 font-semibold text-white hover:bg-brand-dark"
              onClick={onClose}
            >
              Done
            </button>
          </div>
        )}
        {error && <p className="text-12 text-danger">{error}</p>}
      </div>
    </Modal>
  );
}
