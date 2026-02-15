"use client";

import Header from "@/components/Header";
import Link from "next/link";
import hajjData from "@/data/hajj.json";

export default function HajjOverview() {
  return (
    <div className="min-h-screen bg-background">
      <Header title="Hajj Guide" subtitle="دليل الحج" backHref="/" />

      {/* Day Cards */}
      <div className="px-4 py-4 space-y-3">
        {hajjData.map((day, dayIndex) => (
          <div
            key={dayIndex}
            className="border border-border rounded-xl overflow-hidden"
          >
            {/* Day Header */}
            <div className="px-4 py-3 bg-foreground/[0.02] border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center text-sm font-bold flex-shrink-0 font-sans">
                  {day.day === 0 ? "P" : `D${day.day}`}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-base font-bold text-foreground font-sans">
                    {day.title}
                  </h2>
                  <p className="text-xs text-muted font-sans">{day.date}</p>
                </div>
              </div>
            </div>

            {/* Steps */}
            <div className="divide-y divide-border">
              {day.steps.map((step, stepIndex) => (
                <Link
                  key={step.id}
                  href={`/hajj/${dayIndex}/${stepIndex}`}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-foreground/[0.02] active:bg-foreground/5 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs font-bold flex-shrink-0 font-sans">
                    {stepIndex + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate font-sans">
                      {step.title}
                    </p>
                    <p
                      className="text-xs text-muted truncate font-arabic"
                      dir="rtl"
                    >
                      {step.titleAr}
                    </p>
                  </div>
                  <div className="text-xs text-muted flex-shrink-0 font-sans">
                    {step.duas.length} dua{step.duas.length !== 1 ? "s" : ""}
                  </div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-muted flex-shrink-0"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        ))}
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
