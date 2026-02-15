"use client";

import { useRouter } from "next/navigation";
import ProgressBar from "./ProgressBar";

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
    <header className="sticky top-0 z-50 bg-background safe-top border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {backHref && (
            <button
              onClick={() => router.push(backHref)}
              className="touch-btn w-10 h-10 min-h-0 min-w-0 rounded-lg bg-foreground/5 text-foreground flex-shrink-0"
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
            <h1 className="text-base font-bold text-foreground truncate font-sans">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-muted truncate font-sans">{subtitle}</p>
            )}
          </div>
        </div>
        {rightElement && <div className="flex-shrink-0 ml-2">{rightElement}</div>}
      </div>
      {current !== undefined && total !== undefined && (
        <ProgressBar current={current} total={total} />
      )}
    </header>
  );
}
