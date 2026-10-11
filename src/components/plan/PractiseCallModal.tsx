import { Modal } from '../ui/Modal';
import type { PractiseScenario } from '../../data/types';

export function PractiseCallModal({
  scenario,
  onClose,
}: {
  scenario: PractiseScenario;
  onClose: () => void;
}): JSX.Element {
  return (
    <Modal isOpen onClose={onClose} title="Practice customer">
      <p className="text-13 text-text-muted">{scenario.title}</p>
      <p className="mt-4 text-12 text-text-muted">
        The scripted call will appear here.
      </p>
    </Modal>
  );
}
