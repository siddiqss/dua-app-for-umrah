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
    <section className="px-4 pt-3">
      <div className="rounded-xl border border-border bg-foreground/[0.02] p-4">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="w-full flex items-center justify-between text-left"
          aria-expanded={expanded}
        >
          <p className="text-xs uppercase tracking-wider text-muted font-semibold font-sans">
            Step Matrix
          </p>
          <span className="text-xs text-accent font-semibold font-sans">
            {expanded ? "Hide" : "Show"}
          </span>
        </button>

        {expanded && (
          <div className="mt-3 space-y-3">
            {timing && (
              <p className="text-sm text-foreground/80 font-sans">
                <span className="font-semibold">Timing:</span> {timing}
              </p>
            )}
            {location && (
              <p className="text-sm text-foreground/80 font-sans">
                <span className="font-semibold">Location:</span> {location}
              </p>
            )}

            {variantNotes && variantNotes.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-wider text-muted font-semibold font-sans">
                  Variant Notes
                </p>
                <ul className="mt-2 space-y-2">
                  {variantNotes.map((note) => (
                    <li key={note} className="text-sm text-foreground/75 leading-relaxed font-sans">
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {items.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-wider text-muted font-semibold font-sans">
                  Personal Checklist
                </p>
                <div className="mt-2 space-y-2">
                  {items.map((item) => (
                    <label
                      key={item}
                      className="flex items-start gap-2 text-sm text-foreground/80 font-sans cursor-pointer"
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
