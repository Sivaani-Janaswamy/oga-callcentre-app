import { Outlet } from 'react-router-dom';
import { PlanHeader } from './PlanHeader';

export function PlanLayout(): JSX.Element {
  return (
    <div className="space-y-6">
      <PlanHeader />
      <Outlet />
    </div>
  );
}
