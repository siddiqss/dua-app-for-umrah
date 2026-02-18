"use client";

import { useMemo, useState } from "react";

interface StepMetaPanelProps {
  stepId: string;
  location?: string;
  timing?: string;
  variantNotes?: string[];
  checklist?: string[];
}

function storageKey(stepId: string) {
  return `dua-nexus-hajj-checklist-${stepId}`;
}

export default function StepMetaPanel({
  stepId,
  location,
  timing,
  variantNotes,
  checklist,
}: StepMetaPanelProps) {
  const [expanded, setExpanded] = useState(false);

  const items = useMemo(() => checklist || [], [checklist]);

  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const raw = localStorage.getItem(storageKey(stepId));
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const toggleItem = (item: string) => {
    const next = { ...checked, [item]: !checked[item] };
    setChecked(next);
    try {
      localStorage.setItem(storageKey(stepId), JSON.stringify(next));
    } catch {
      // ignore storage failures
    }
  };

  if (!location && !timing && (!variantNotes || variantNotes.length === 0) && items.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-xl px-4 pt-3">
      <div className="ui-card-soft">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="flex w-full items-center justify-between text-left"
          aria-expanded={expanded}
        >
          <p className="ui-section-title">Step Matrix</p>
          <span className="text-xs font-semibold text-accent">{expanded ? "Hide" : "Show"}</span>
        </button>

        {expanded && (
          <div className="mt-3 space-y-3">
            {timing && (
              <p className="text-sm text-foreground">
                <span className="font-semibold">Timing:</span> <span className="text-muted">{timing}</span>
              </p>
            )}
            {location && (
              <p className="text-sm text-foreground">
                <span className="font-semibold">Location:</span> <span className="text-muted">{location}</span>
              </p>
            )}

            {variantNotes && variantNotes.length > 0 && (
              <div>
                <p className="ui-section-title">Variant Notes</p>
                <ul className="mt-2 space-y-2">
                  {variantNotes.map((note) => (
                    <li key={note} className="text-sm leading-relaxed text-muted">
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {items.length > 0 && (
              <div>
                <p className="ui-section-title">Personal Checklist</p>
                <div className="mt-2 space-y-2">
                  {items.map((item) => (
                    <label
                      key={item}
                      className="flex cursor-pointer items-start gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-sm text-muted"
                    >
                      <input
                        type="checkbox"
                        className="mt-0.5 accent-accent"
                        checked={!!checked[item]}
                        onChange={() => toggleItem(item)}
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
