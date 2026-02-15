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
      className="block w-full border border-border rounded-2xl p-6 transition-all active:scale-[0.98] active:bg-foreground/5 hover:border-accent/30"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold text-foreground font-sans">{title}</h2>
          <p className="text-sm text-muted font-arabic mt-0.5" dir="rtl">
            {titleAr}
          </p>
          <p className="text-sm text-foreground/60 mt-2 font-sans">{description}</p>
          <p className="text-xs text-accent font-semibold mt-2 font-sans">
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
          className="text-muted flex-shrink-0 mt-1"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </div>
    </Link>
  );
}
