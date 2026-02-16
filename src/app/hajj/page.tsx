"use client";

import Header from "@/components/Header";
import Link from "next/link";
import hajjData from "@/data/hajj.json";
import { useMemo, useState } from "react";

export default function HajjOverview() {
  const [query, setQuery] = useState("");
  const [selectedDay, setSelectedDay] = useState(0);

  const totalSteps = useMemo(
    () => hajjData.reduce((sum, day) => sum + day.steps.length, 0),
    []
  );
  const q = query.trim().toLowerCase();
  const activeDay = hajjData[selectedDay];

  const filteredSteps = activeDay.steps
    .map((step, originalStepIndex) => ({ step, originalStepIndex }))
    .filter(({ step }) => {
      if (!q) return true;
      return (
        step.title.toLowerCase().includes(q) ||
        step.titleAr.includes(q) ||
        step.category.toLowerCase().includes(q) ||
        (step.location || "").toLowerCase().includes(q)
      );
    });

  return (
    <div className="min-h-screen bg-background">
      <Header title="Hajj Guide" subtitle="دليل الحج" backHref="/" />

      <div className="px-4 py-4 space-y-4">
        <div className="rounded-2xl border border-border p-4 bg-foreground/[0.02]">
          <p className="text-sm font-semibold text-foreground font-sans">
            Comprehensive Hajj Matrix
          </p>
          <p className="text-xs text-muted mt-1 font-sans">
            Day-by-day, timing-aware, and variant notes for practical guidance.
          </p>
          <div className="mt-3 flex gap-2">
            <div className="rounded-lg bg-background border border-border px-3 py-2">
              <p className="text-[11px] text-muted font-sans">Days</p>
              <p className="text-sm font-bold text-foreground font-sans">
                {hajjData.length}
              </p>
            </div>
            <div className="rounded-lg bg-background border border-border px-3 py-2">
              <p className="text-[11px] text-muted font-sans">Steps</p>
              <p className="text-sm font-bold text-foreground font-sans">
                {totalSteps}
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="flex gap-2 min-w-max pb-1">
            {hajjData.map((day, idx) => (
              <button
                key={day.day}
                type="button"
                onClick={() => setSelectedDay(idx)}
                className={`rounded-full px-3 py-2 text-sm font-sans border transition-colors ${
                  idx === selectedDay
                    ? "bg-accent text-white border-accent"
                    : "bg-background text-foreground border-border"
                }`}
              >
                {day.day === 0 ? "Prep" : `Day ${day.day}`}
              </button>
            ))}
          </div>
        </div>

        <div>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter steps in this day (arafah, rami, tawaf...)"
            className="w-full rounded-xl border border-border px-4 py-3 text-sm font-sans bg-background text-foreground outline-none focus:border-accent"
          />
        </div>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="px-4 py-3 bg-foreground/[0.02] border-b border-border">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-foreground font-sans">
                  {activeDay.title}
                </h2>
                <p className="text-xs text-muted font-sans">{activeDay.date}</p>
              </div>
              <p className="text-xs text-accent font-semibold font-sans">
                {activeDay.steps.length} steps
              </p>
            </div>
          </div>

          <div className="p-3 space-y-2">
            {filteredSteps.map(({ step, originalStepIndex }, stepIndex) => (
              <Link
                key={step.id}
                href={`/hajj/${selectedDay}/${originalStepIndex}`}
                className="block rounded-xl border border-border p-3 hover:border-accent/40 active:scale-[0.99] transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground font-sans">
                      {stepIndex + 1}. {step.title}
                    </p>
                    <p className="text-xs text-muted font-arabic mt-0.5" dir="rtl">
                      {step.titleAr}
                    </p>
                  </div>
                  <span className="text-[11px] px-2 py-1 rounded-full bg-accent/10 text-accent font-semibold font-sans shrink-0">
                    {step.duas.length} dua{step.duas.length > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {step.timing && (
                    <span className="text-[11px] px-2 py-1 rounded-full bg-foreground/5 text-foreground/70 font-sans">
                      {step.timing}
                    </span>
                  )}
                  {step.location && (
                    <span className="text-[11px] px-2 py-1 rounded-full bg-foreground/5 text-foreground/70 font-sans">
                      {step.location}
                    </span>
                  )}
                </div>
              </Link>
            ))}

            {filteredSteps.length === 0 && (
              <p className="text-sm text-muted text-center py-6 font-sans">
                No step found in this day for the current filter.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Start Button */}
      <div className="px-4 pb-8 pt-2">
        <Link
          href="/hajj/0/0"
          className="touch-btn w-full rounded-xl bg-accent text-white text-lg font-semibold font-sans"
        >
          Begin Hajj Guide
        </Link>
      </div>
    </div>
  );
}
