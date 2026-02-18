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
    <div className="nav-zone safe-bottom border-t border-border bg-surface/95 backdrop-blur">
      {currentLabel && (
        <p className="absolute left-0 right-0 top-2 text-center text-xs text-muted tabular-nums">
          {currentLabel}
        </p>
      )}
      <div className="mx-auto flex w-full max-w-xl gap-3 px-4">
        <button
          onClick={onPrevious}
          disabled={!hasPrevious}
          className="ui-secondary-btn flex-1 text-base"
          aria-label="Previous step"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={!hasNext}
          className="ui-primary-btn flex-1 text-base"
          aria-label="Next step"
        >
          Next
        </button>
      </div>
    </div>
  );
}
