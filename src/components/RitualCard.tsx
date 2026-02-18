"use client";

import Link from "next/link";

interface RitualCardProps {
  href: string;
  title: string;
  titleAr: string;
  description: string;
  stepCount: string;
  icon: React.ReactNode;
}

export default function RitualCard({
  href,
  title,
  titleAr,
  description,
  stepCount,
  icon,
}: RitualCardProps) {
  return (
    <Link
      href={href}
      className="ui-card block w-full transition-all hover:border-accent/40 active:translate-y-px"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          <p className="mt-0.5 truncate text-sm text-muted font-arabic" dir="rtl">
            {titleAr}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
          <p className="mt-2 text-xs font-semibold text-accent tabular-nums">
            {stepCount}
          </p>
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mt-1 shrink-0 text-muted"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </div>
    </Link>
  );
}
