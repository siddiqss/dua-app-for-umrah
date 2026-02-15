"use client";

interface ReaderNavProps {
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  currentLabel?: string;
}

export default function ReaderNav({
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
  currentLabel,
}: ReaderNavProps) {
  return (
    <div className="nav-zone safe-bottom border-t border-border bg-background">
      {currentLabel && (
        <p className="absolute top-2 left-0 right-0 text-center text-xs text-muted font-sans">
          {currentLabel}
        </p>
      )}
      <div className="flex w-full gap-3 px-4 max-w-lg mx-auto">
        <button
          onClick={onPrevious}
          disabled={!hasPrevious}
          className={`touch-btn flex-1 rounded-xl font-sans text-lg font-semibold transition-all ${
            hasPrevious
              ? "bg-foreground/5 text-foreground active:bg-foreground/10"
              : "bg-transparent text-foreground/20 cursor-not-allowed"
          }`}
          aria-label="Previous step"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={!hasNext}
          className={`touch-btn flex-1 rounded-xl font-sans text-lg font-semibold transition-all ${
            hasNext
              ? "bg-accent text-white active:bg-accent-dark"
              : "bg-transparent text-foreground/20 cursor-not-allowed"
          }`}
          aria-label="Next step"
        >
          Next
        </button>
      </div>
    </div>
  );
}
