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
    <div className="min-h-screen bg-background">
      <Header title="Umrah Guide" subtitle="دليل العمرة" backHref="/" />

      {/* Resume Banner */}
      {lastStepIndex > 0 && (
        <div className="px-4 pt-4">
          <Link
            href={`/umrah/${lastStepIndex}`}
            className="block w-full bg-accent/10 border border-accent/20 rounded-xl p-4 transition-all active:scale-[0.98]"
          >
            <p className="text-sm font-semibold text-accent font-sans">
              Continue where you left off
            </p>
            <p className="text-xs text-accent/70 mt-1 font-sans">
              {umrahData[lastStepIndex].title} - Step {lastStepIndex + 1} of{" "}
              {umrahData.length}
            </p>
          </Link>
        </div>
      )}

      {/* Steps List */}
      <div className="px-4 py-4 space-y-2">
        <div className="mb-3">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search steps (e.g., tawaf, sa'i, miqat)"
            className="w-full rounded-xl border border-border px-4 py-3 text-sm font-sans bg-background text-foreground outline-none focus:border-accent"
          />
        </div>
        {filteredSteps.map((step) => {
          const index = umrahData.findIndex((s) => s.id === step.id);
          const isCompleted = lastStepIndex >= 0 && index < lastStepIndex;
          const isCurrent = index === lastStepIndex;

          return (
            <Link
              key={step.id}
              href={`/umrah/${index}`}
              className={`flex items-center gap-4 px-4 py-4 rounded-xl border transition-all active:scale-[0.98] ${
                isCurrent
                  ? "border-accent bg-accent/5"
                  : "border-border hover:border-accent/30"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 font-sans ${
                  isCompleted
                    ? "bg-accent text-white"
                    : isCurrent
                    ? "bg-accent/20 text-accent"
                    : "bg-foreground/5 text-muted"
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
              <div className="flex-1 min-w-0">
                <p
                  className={`text-base font-semibold truncate font-sans ${
                    isCurrent ? "text-accent" : "text-foreground"
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-sm text-muted truncate font-arabic" dir="rtl">
                  {step.titleAr}
                </p>
              </div>
              <div className="text-xs text-muted flex-shrink-0 font-sans">
                {step.duas.length} dua{step.duas.length !== 1 ? "s" : ""}
              </div>
            </Link>
          );
        })}
        {filteredSteps.length === 0 && (
          <p className="text-sm text-muted text-center py-6 font-sans">
            No step found for this search.
          </p>
        )}
      </div>

      {/* Start Button */}
      <div className="px-4 pb-8 pt-2">
        <Link
          href="/umrah/0"
          className="touch-btn w-full rounded-xl bg-accent text-white text-lg font-semibold font-sans"
        >
          {lastStepIndex > 0 ? "Start from Beginning" : "Begin Umrah Guide"}
        </Link>
      </div>
    </div>
  );
}
