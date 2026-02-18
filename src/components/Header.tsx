"use client";

import { useRouter } from "next/navigation";
import ProgressBar from "./ProgressBar";
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  title: string;
  subtitle?: string;
  current?: number;
  total?: number;
  backHref?: string;
  rightElement?: React.ReactNode;
}

export default function Header({
  title,
  subtitle,
  current,
  total,
  backHref,
  rightElement,
}: HeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto max-w-xl px-4 pt-2 pb-2 safe-top">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-3">
            {backHref && (
              <button
                onClick={() => router.push(backHref)}
                className="ui-icon-btn"
                aria-label="Go back"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
            )}
            <div className="min-w-0">
              <h1 className="truncate text-base font-semibold text-foreground">
                {title}
              </h1>
              {subtitle && <p className="truncate text-xs text-muted">{subtitle}</p>}
            </div>
          </div>
          <div className="ml-2 flex shrink-0 items-center gap-2">
            {rightElement}
            <ThemeToggle />
          </div>
        </div>
      </div>
      {current !== undefined && total !== undefined && (
        <div className="mx-auto max-w-xl px-4 pb-1.5">
          <ProgressBar current={current} total={total} />
        </div>
      )}
    </header>
  );
}
