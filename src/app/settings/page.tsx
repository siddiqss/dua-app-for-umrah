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
      <div className="min-h-screen bg-background flex flex-col">
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
          <div className="px-6 py-4 border-b border-border">
            <p className="text-sm text-foreground/70 leading-relaxed font-sans">
              {step.instructions}
            </p>
          </div>
          <div className="divide-y divide-border">
            {visibleDuas.length === 0 && (
              <div className="px-6 py-6">
                <p className="text-sm text-muted text-center font-sans">
                  No Quran/Sahih-tagged dua in this step. Disable verified-only
                  to view all.
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
    <div className="min-h-screen bg-background">
      <Header title="Settings & Common Duas" backHref="/" />

      {/* Display Settings */}
      <div className="px-4 py-4">
        <h2 className="text-sm font-bold text-muted uppercase tracking-wider mb-3 font-sans">
          Display Settings
        </h2>
        <p className="text-xs text-foreground/60 leading-relaxed mb-3 font-sans">
          Use Quran/Sahih-only mode for stricter source filtering during ritual.
          For fiqh details, follow your scholar/group guide.
        </p>

        {/* Font Size */}
        <div className="border border-border rounded-xl p-4 mb-3">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-foreground font-sans">
              Arabic Font Size
            </span>
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

        {/* Toggle: Transliteration */}
        <div className="border border-border rounded-xl p-4 mb-3">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <span className="text-sm font-semibold text-foreground font-sans">
                Show Transliteration
              </span>
              <p className="text-xs text-muted mt-0.5 font-sans">
                Latin alphabet pronunciation guide
              </p>
            </div>
            <input
              type="checkbox"
              checked={prefs.showTransliteration}
              onChange={(e) =>
                updatePrefs({ showTransliteration: e.target.checked })
              }
              className="w-5 h-5 accent-accent"
            />
          </label>
        </div>

        {/* Toggle: Translation */}
        <div className="border border-border rounded-xl p-4 mb-3">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <span className="text-sm font-semibold text-foreground font-sans">
                Show Translation
              </span>
              <p className="text-xs text-muted mt-0.5 font-sans">
                English meaning of the dua
              </p>
            </div>
            <input
              type="checkbox"
              checked={prefs.showTranslation}
              onChange={(e) =>
                updatePrefs({ showTranslation: e.target.checked })
              }
              className="w-5 h-5 accent-accent"
            />
          </label>
        </div>

        {/* Toggle: Verified sources */}
        <div className="border border-border rounded-xl p-4 mb-3">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <span className="text-sm font-semibold text-foreground font-sans">
                Quran/Sahih only
              </span>
              <p className="text-xs text-muted mt-0.5 font-sans">
                Hide duas that are tagged as general or reported sources
              </p>
            </div>
            <input
              type="checkbox"
              checked={prefs.verifiedOnly}
              onChange={(e) => updatePrefs({ verifiedOnly: e.target.checked })}
              className="w-5 h-5 accent-accent"
            />
          </label>
        </div>
      </div>

      {/* Common Duas */}
      <div className="px-4 py-2">
        <h2 className="text-sm font-bold text-muted uppercase tracking-wider mb-3 font-sans">
          Common Duas
        </h2>

        <div className="space-y-2">
          {steps.map((commonStep, index) => (
            <button
              key={commonStep.id}
              onClick={() => {
                setCurrentStep(index);
                setMode("reader");
              }}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border border-border hover:border-accent/30 active:scale-[0.98] transition-all text-left"
            >
              <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs font-bold flex-shrink-0 font-sans">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate font-sans">
                  {commonStep.title}
                </p>
                <p
                  className="text-xs text-muted truncate font-arabic"
                  dir="rtl"
                >
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
                className="text-muted flex-shrink-0"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <div className="h-8" />
    </div>
  );
}
