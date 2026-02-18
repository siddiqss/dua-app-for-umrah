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
    <div className="min-h-dvh bg-background">
      <Header title="Hajj Guide" subtitle="دليل الحج" backHref="/" />

      <main className="mx-auto max-w-xl space-y-4 px-4 py-4 pb-24">
        <section className="ui-card-soft">
          <p className="ui-section-title">Overview</p>
          <p className="mt-1 text-sm font-semibold text-foreground">Comprehensive Hajj Matrix</p>
          <p className="mt-1 text-xs text-muted">
            Day-by-day, timing-aware, and variant notes for practical guidance.
          </p>
          <div className="mt-3 flex gap-2">
            <div className="ui-card-soft p-3">
              <p className="text-[11px] text-muted">Days</p>
              <p className="text-lg font-bold text-foreground tabular-nums">{hajjData.length}</p>
            </div>
            <div className="ui-card-soft p-3">
              <p className="text-[11px] text-muted">Steps</p>
              <p className="text-lg font-bold text-foreground tabular-nums">{totalSteps}</p>
            </div>
          </div>
        </section>

        <div className="overflow-x-auto">
          <div className="flex min-w-max gap-2 pb-1">
            {hajjData.map((day, idx) => (
              <button
                key={day.day}
                type="button"
                onClick={() => setSelectedDay(idx)}
                className={`ui-chip ${idx === selectedDay ? "ui-chip-active" : ""}`}
              >
                {day.day === 0 ? "Prep" : `Day ${day.day}`}
              </button>
            ))}
          </div>
        </div>

        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter steps in this day (arafah, rami, tawaf...)"
          className="ui-input"
        />

        <section className="ui-card-soft p-3">
          <div className="border-b border-border px-2 pb-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-foreground">{activeDay.title}</h2>
                <p className="text-xs text-muted">{activeDay.date}</p>
              </div>
              <p className="text-xs font-semibold text-accent tabular-nums">{activeDay.steps.length} steps</p>
            </div>
          </div>

          <div className="space-y-2 px-1 pt-3">
            {filteredSteps.map(({ step, originalStepIndex }, stepIndex) => (
              <Link
                key={step.id}
                href={`/hajj/${selectedDay}/${originalStepIndex}`}
                className="ui-card-soft block p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">
                      {stepIndex + 1}. {step.title}
                    </p>
                    <p className="mt-0.5 text-xs text-muted font-arabic" dir="rtl">
                      {step.titleAr}
                    </p>
                  </div>
                  <span className="ui-chip ui-chip-active shrink-0">
                    {step.duas.length} dua{step.duas.length > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {step.timing && <span className="ui-chip">{step.timing}</span>}
                  {step.location && <span className="ui-chip">{step.location}</span>}
                </div>
              </Link>
            ))}

            {filteredSteps.length === 0 && (
              <p className="py-6 text-center text-sm text-muted">
                No step found in this day for the current filter.
              </p>
            )}
          </div>
        </section>

        <Link href="/hajj/0/0" className="ui-primary-btn w-full text-base">
          Begin Hajj Guide
        </Link>
      </main>
    </div>
  );
}
