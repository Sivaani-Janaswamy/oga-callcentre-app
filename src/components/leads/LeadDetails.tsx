import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Lead } from '../../data/types';

function ScoreBar({ label, value }: { label: string; value: number }): JSX.Element {
  return (
    <div>
      <div className="flex items-center justify-between text-11">
        <span className="text-text-muted">{label}</span>
        <strong className="text-text">{value}%</strong>
      </div>
      <div className="mt-1 h-2 rounded-full bg-border">
        <div className="h-2 rounded-full bg-success" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function DetailSection({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: JSX.Element;
}): JSX.Element {
  return (
    <div className="border-t border-border pt-3">
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className="flex w-full items-center justify-between text-left text-12 font-semibold text-text"
      >
        {title}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}

export function LeadDetails({ lead }: { lead: Lead }): JSX.Element {
  const [openSection, setOpenSection] = useState<'icp' | 'story' | null>(null);

  useEffect(() => {
    setOpenSection(null);
  }, [lead.id]);

  return (
    <div className="mt-4 space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <ScoreBar label="ICP fit" value={lead.icpScore} />
        <ScoreBar label="Lead intent" value={lead.intentScore} />
      </div>
      <DetailSection
        title="ICP breakdown"
        open={openSection === 'icp'}
        onToggle={() => setOpenSection((current) => (current === 'icp' ? null : 'icp'))}
      >
        <div className="grid gap-2 sm:grid-cols-2">
          {lead.icpBreakdown.map((factor) => (
            <div key={factor.label} className="rounded-md bg-card-soft p-2 text-11">
              <p className="font-semibold text-text">{factor.label}</p>
              <p className="mt-1 text-text-muted">
                {factor.value}% fit · {Math.round(factor.weight * 100)}% weight
              </p>
            </div>
          ))}
        </div>
      </DetailSection>
      <DetailSection
        title="How we got here"
        open={openSection === 'story'}
        onToggle={() => setOpenSection((current) => (current === 'story' ? null : 'story'))}
      >
        <div className="space-y-2">
          {lead.provenance.map((step) => (
            <p key={step.at} className="text-11 text-text-muted">
              {step.label}
            </p>
          ))}
        </div>
      </DetailSection>
    </div>
  );
}
