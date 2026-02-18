"use client";

import { useState } from "react";
import { FONT_SIZE_LABELS } from "@/lib/types";

interface FontSizeControlProps {
  currentLevel: number;
  onChange: (level: number) => void;
}

export default function FontSizeControl({
  currentLevel,
  onChange,
}: FontSizeControlProps) {
  const [isOpen, setIsOpen] = useState(false);

  const decrease = () => {
    if (currentLevel > 0) {
      onChange(currentLevel - 1);
    }
  };

  const increase = () => {
    if (currentLevel < FONT_SIZE_LABELS.length - 1) {
      onChange(currentLevel + 1);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="ui-icon-btn text-sm font-semibold"
        aria-label="Adjust font size"
      >
        Aa
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="ui-card-soft absolute right-0 top-12 z-50 min-w-[220px]">
            <p className="text-xs text-muted">
              Font Size: <span className="font-semibold">{FONT_SIZE_LABELS[currentLevel]}</span>
            </p>
            <div className="mt-2 flex items-center gap-2">
              <button
                onClick={decrease}
                disabled={currentLevel === 0}
                className="ui-secondary-btn min-h-0 h-10 w-12 px-0 text-sm"
                aria-label="Decrease font size"
              >
                A-
              </button>
              <div className="ui-progress flex-1">
                <span
                  style={{
                    width: `${(currentLevel / (FONT_SIZE_LABELS.length - 1)) * 100}%`,
                  }}
                />
              </div>
              <button
                onClick={increase}
                disabled={currentLevel === FONT_SIZE_LABELS.length - 1}
                className="ui-secondary-btn min-h-0 h-10 w-12 px-0 text-sm"
                aria-label="Increase font size"
              >
                A+
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
