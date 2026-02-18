"use client";

import Header from "@/components/Header";
import Link from "next/link";
import umrahData from "@/data/umrah.json";
import { usePreferences } from "@/hooks/usePreferences";
import { useEffect, useState } from "react";

export default function UmrahOverview() {
  const { prefs } = usePreferences();
  const [lastStep, setLastStep] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (prefs.lastUmrahStep) {
      setLastStep(prefs.lastUmrahStep);
    }
  }, [prefs.lastUmrahStep]);

  const lastStepIndex = lastStep
    ? umrahData.findIndex((s) => s.id === lastStep)
    : -1;
  const filteredSteps = umrahData.filter((step) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      step.title.toLowerCase().includes(q) ||
      step.titleAr.includes(q) ||
      step.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-dvh bg-background">
      <Header title="Umrah Guide" subtitle="دليل العمرة" backHref="/" />

      <main className="mx-auto max-w-xl space-y-4 px-4 pt-3 pb-24">
        {lastStepIndex > 0 && (
          <Link href={`/umrah/${lastStepIndex}`} className="ui-card-soft block w-full">
            <p className="ui-section-title">Resume</p>
            <p className="mt-1 text-sm font-semibold text-accent">Continue where you left off</p>
            <p className="mt-1 text-xs text-muted tabular-nums">
              {umrahData[lastStepIndex].title} - Step {lastStepIndex + 1} of {umrahData.length}
            </p>
          </Link>
        )}

        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search steps (e.g., tawaf, sa'i, miqat)"
          className="ui-input"
        />

        <section className="space-y-2">
          {filteredSteps.map((step) => {
            const index = umrahData.findIndex((s) => s.id === step.id);
            const isCompleted = lastStepIndex >= 0 && index < lastStepIndex;
            const isCurrent = index === lastStepIndex;

            return (
              <Link
                key={step.id}
                href={`/umrah/${index}`}
                className={`ui-card-soft flex items-center gap-4 ${isCurrent ? "border-accent" : ""}`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold tabular-nums ${
                    isCompleted
                      ? "bg-accent text-white"
                      : isCurrent
                      ? "bg-accent/15 text-accent"
                      : "bg-surface text-muted"
                  }`}
                >
                  {isCompleted ? (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`truncate text-base font-semibold ${isCurrent ? "text-accent" : "text-foreground"}`}>
                    {step.title}
                  </p>
                  <p className="truncate text-sm text-muted font-arabic" dir="rtl">
                    {step.titleAr}
                  </p>
                </div>
                <div className="shrink-0 text-xs text-muted tabular-nums">
                  {step.duas.length} dua{step.duas.length !== 1 ? "s" : ""}
                </div>
              </Link>
            );
          })}
          {filteredSteps.length === 0 && (
            <p className="py-6 text-center text-sm text-muted">No step found for this search.</p>
          )}
        </section>

        <Link href="/umrah/0" className="ui-primary-btn w-full text-base">
          {lastStepIndex > 0 ? "Start from Beginning" : "Begin Umrah Guide"}
        </Link>
      </main>
    </div>
  );
}
