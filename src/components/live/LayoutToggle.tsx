'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export type LiveView = 'section' | 'continuous';

type Props = {
  value: LiveView;
};

type ToggleButtonProps = {
  id: LiveView;
  label: string;
  active: boolean;
  onSelect: (id: LiveView) => void;
};

function ToggleButton({ id, label, active, onSelect }: ToggleButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() => onSelect(id)}
      className="px-4 py-2 text-xs font-medium rounded-[var(--r-pill)] transition-colors"
      style={{
        background: active ? 'var(--accent-gold)' : 'transparent',
        color: active ? 'var(--text-on-dark-primary)' : 'var(--text-secondary)',
      }}
    >
      {label}
    </button>
  );
}

export default function LayoutToggle({ value }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setView = useCallback(
    (next: LiveView) => {
      const params = new URLSearchParams(searchParams?.toString());
      if (next === 'section') params.delete('view');
      else params.set('view', next);
      const qs = params.toString();
      router.replace(qs ? `/live?${qs}` : '/live', { scroll: false });
    },
    [router, searchParams],
  );

  return (
    <div
      role="group"
      aria-label="Layout view"
      className="inline-flex items-center gap-1 p-1 rounded-[var(--r-pill)] border"
      style={{
        borderColor: 'var(--border-base)',
        background: 'var(--bg-surface)',
      }}
    >
      <ToggleButton
        id="section"
        label="By Section"
        active={value === 'section'}
        onSelect={setView}
      />
      <ToggleButton
        id="continuous"
        label="Continuous"
        active={value === 'continuous'}
        onSelect={setView}
      />
    </div>
  );
}
