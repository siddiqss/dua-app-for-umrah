"use client";

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = total > 0 ? ((current + 1) / total) * 100 : 0;

  return (
    <div
      className="ui-progress"
      role="progressbar"
      aria-valuenow={current + 1}
      aria-valuemin={1}
      aria-valuemax={total}
    >
      <span style={{ width: `${percentage}%` }} />
    </div>
  );
}
