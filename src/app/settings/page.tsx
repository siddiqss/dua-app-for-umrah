"use client";

import { useState, useCallback } from "react";
import Header from "@/components/Header";
import DuaCard from "@/components/DuaCard";
import ReaderNav from "@/components/ReaderNav";
import FontSizeControl from "@/components/FontSizeControl";
import { usePreferences } from "@/hooks/usePreferences";
import { useSwipeNavigation } from "@/hooks/useSwipeNavigation";
import commonData from "@/data/common.json";
import { RitualStep } from "@/lib/types";
import { isVerifiedReference } from "@/lib/reference";

export default function SettingsPage() {
  const { prefs, updatePrefs } = usePreferences();
  const [currentStep, setCurrentStep] = useState(0);
  const [mode, setMode] = useState<"settings" | "reader">("settings");
  const [animDir, setAnimDir] = useState<"left" | "right" | null>(null);

  const steps = commonData as unknown as RitualStep[];
  const step = steps[currentStep];
  const visibleDuas = step
    ? step.duas.filter(
        (dua) => !prefs.verifiedOnly || isVerifiedReference(dua.reference)
      )
    : [];

  const goNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setAnimDir("left");
      setTimeout(() => {
        setCurrentStep((c) => c + 1);
        setAnimDir(null);
      }, 150);
    }
  }, [currentStep, steps.length]);

  const goPrev = useCallback(() => {
    if (currentStep > 0) {
      setAnimDir("right");
      setTimeout(() => {
        setCurrentStep((c) => c - 1);
        setAnimDir(null);
      }, 150);
    }
  }, [currentStep]);

  useSwipeNavigation({
    onSwipeLeft: goNext,
    onSwipeRight: goPrev,
    enabled: mode === "reader",
  });

  if (mode === "reader" && step) {
    return (
      <div className="min-h-dvh bg-background flex flex-col">
        <Header
          title={step.title}
          subtitle={`Common Duas - ${currentStep + 1} of ${steps.length}`}
          current={currentStep}
          total={steps.length}
          backHref="/settings"
          rightElement={
            <FontSizeControl
              currentLevel={prefs.fontSizeLevel}
              onChange={(level) => updatePrefs({ fontSizeLevel: level })}
            />
          }
        />

        <div
          className={`flex-1 overflow-y-auto pb-4 transition-all duration-150 ${
            animDir === "left"
              ? "opacity-0 translate-x-[-20px]"
              : animDir === "right"
              ? "opacity-0 translate-x-[20px]"
              : "opacity-100 translate-x-0"
          }`}
        >
          <div className="mx-auto max-w-xl px-4 py-4">
            <div className="ui-card-soft">
              <p className="text-sm leading-relaxed text-muted">{step.instructions}</p>
            </div>
          </div>
          <div>
            {visibleDuas.length === 0 && (
              <div className="mx-auto max-w-xl px-4 py-6">
                <p className="text-center text-sm text-muted">
                  No Quran/Sahih-tagged dua in this step. Disable verified-only to view all.
                </p>
              </div>
            )}
            {visibleDuas.map((dua, i) => (
              <DuaCard
                key={dua.id}
                dua={dua}
                fontSizeLevel={prefs.fontSizeLevel}
                showTransliteration={prefs.showTransliteration}
                showTranslation={prefs.showTranslation}
                index={i}
                total={visibleDuas.length}
              />
            ))}
          </div>
        </div>

        <ReaderNav
          onPrevious={goPrev}
          onNext={goNext}
          hasPrevious={currentStep > 0}
          hasNext={currentStep < steps.length - 1}
          currentLabel={`${currentStep + 1} / ${steps.length}`}
        />
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-background">
      <Header title="Settings & Common Duas" backHref="/" />

      <main className="mx-auto max-w-xl space-y-4 px-4 py-4 pb-16">
        <section className="space-y-3">
          <h2 className="ui-section-title">Display Settings</h2>
          <p className="text-xs leading-relaxed text-muted">
            Use Quran/Sahih-only mode for stricter source filtering during ritual.
            For fiqh details, follow your scholar/group guide.
          </p>

          <div className="ui-card-soft">
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="text-sm font-semibold text-foreground">Arabic Font Size</span>
              <FontSizeControl
                currentLevel={prefs.fontSizeLevel}
                onChange={(level) => updatePrefs({ fontSizeLevel: level })}
              />
            </div>
            <p
              className={`arabic-text font-arabic ${
                ["text-arabic-sm", "text-arabic-base", "text-arabic-lg", "text-arabic-xl", "text-arabic-2xl"][
                  prefs.fontSizeLevel
                ]
              } text-foreground`}
              dir="rtl"
            >
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </p>
          </div>

          <label className="ui-card-soft flex cursor-pointer items-center justify-between gap-3">
            <div>
              <span className="text-sm font-semibold text-foreground">Show Transliteration</span>
              <p className="mt-0.5 text-xs text-muted">Latin alphabet pronunciation guide</p>
            </div>
            <input
              type="checkbox"
              checked={prefs.showTransliteration}
              onChange={(e) => updatePrefs({ showTransliteration: e.target.checked })}
              className="h-5 w-5 accent-accent"
            />
          </label>

          <label className="ui-card-soft flex cursor-pointer items-center justify-between gap-3">
            <div>
              <span className="text-sm font-semibold text-foreground">Show Translation</span>
              <p className="mt-0.5 text-xs text-muted">English meaning of the dua</p>
            </div>
            <input
              type="checkbox"
              checked={prefs.showTranslation}
              onChange={(e) => updatePrefs({ showTranslation: e.target.checked })}
              className="h-5 w-5 accent-accent"
            />
          </label>

          <label className="ui-card-soft flex cursor-pointer items-center justify-between gap-3">
            <div>
              <span className="text-sm font-semibold text-foreground">Quran/Sahih only</span>
              <p className="mt-0.5 text-xs text-muted">
                Hide duas that are tagged as general or reported sources
              </p>
            </div>
            <input
              type="checkbox"
              checked={prefs.verifiedOnly}
              onChange={(e) => updatePrefs({ verifiedOnly: e.target.checked })}
              className="h-5 w-5 accent-accent"
            />
          </label>
        </section>

        <section className="space-y-2">
          <h2 className="ui-section-title">Common Duas</h2>
          {steps.map((commonStep, index) => (
            <button
              key={commonStep.id}
              onClick={() => {
                setCurrentStep(index);
                setMode("reader");
              }}
              className="ui-card-soft flex w-full items-center gap-3 text-left"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent tabular-nums">
                {index + 1}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{commonStep.title}</p>
                <p className="truncate text-xs text-muted font-arabic" dir="rtl">
                  {commonStep.titleAr}
                </p>
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
                className="shrink-0 text-muted"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          ))}
        </section>
      </main>
    </div>
  );
}
