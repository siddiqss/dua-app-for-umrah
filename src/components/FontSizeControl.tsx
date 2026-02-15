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
        className="touch-btn w-10 h-10 min-h-0 min-w-0 rounded-lg bg-foreground/5 text-foreground text-sm font-bold font-sans"
        aria-label="Adjust font size"
      >
        Aa
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-12 z-50 bg-background border border-border rounded-xl shadow-lg p-3 min-w-[200px]">
            <p className="text-xs text-muted mb-2 font-sans">
              Font Size: {FONT_SIZE_LABELS[currentLevel]}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={decrease}
                disabled={currentLevel === 0}
                className="touch-btn w-12 h-12 min-h-0 min-w-0 rounded-lg bg-foreground/5 text-foreground text-lg font-bold disabled:opacity-30 font-sans"
                aria-label="Decrease font size"
              >
                A-
              </button>
              <div className="flex-1 h-1 bg-foreground/10 rounded-full relative">
                <div
                  className="absolute top-0 left-0 h-full bg-accent rounded-full transition-all"
                  style={{
                    width: `${(currentLevel / (FONT_SIZE_LABELS.length - 1)) * 100}%`,
                  }}
                />
              </div>
              <button
                onClick={increase}
                disabled={currentLevel === FONT_SIZE_LABELS.length - 1}
                className="touch-btn w-12 h-12 min-h-0 min-w-0 rounded-lg bg-foreground/5 text-foreground text-lg font-bold disabled:opacity-30 font-sans"
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
