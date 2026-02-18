"use client";

import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Header from "@/components/Header";
import DuaCard from "@/components/DuaCard";
import ReaderNav from "@/components/ReaderNav";
import FontSizeControl from "@/components/FontSizeControl";
import { useSwipeNavigation } from "@/hooks/useSwipeNavigation";
import { usePreferences } from "@/hooks/usePreferences";
import umrahData from "@/data/umrah.json";
import { RitualStep } from "@/lib/types";
import { isVerifiedReference } from "@/lib/reference";
import StepGuidance from "@/components/StepGuidance";

export default function UmrahStepReader() {
  const params = useParams();
  const router = useRouter();
  const stepIndex = parseInt(params.step as string, 10);
  const { prefs, updatePrefs, loaded } = usePreferences();
  const [animDir, setAnimDir] = useState<"left" | "right" | null>(null);

  const steps = umrahData as unknown as RitualStep[];
  const step = steps[stepIndex];
  const isValid = step && !isNaN(stepIndex);
  const visibleDuas = isValid
    ? step.duas.filter(
        (dua) => !prefs.verifiedOnly || isVerifiedReference(dua.reference)
      )
    : [];

  useEffect(() => {
    if (isValid && loaded) {
      updatePrefs({ lastUmrahStep: step.id });
    }
  }, [stepIndex, isValid, loaded]); // eslint-disable-line react-hooks/exhaustive-deps

  const goNext = useCallback(() => {
    if (stepIndex < steps.length - 1) {
      setAnimDir("left");
      setTimeout(() => {
        router.push(`/umrah/${stepIndex + 1}`);
        setAnimDir(null);
      }, 150);
    }
  }, [stepIndex, steps.length, router]);

  const goPrev = useCallback(() => {
    if (stepIndex > 0) {
      setAnimDir("right");
      setTimeout(() => {
        router.push(`/umrah/${stepIndex - 1}`);
        setAnimDir(null);
      }, 150);
    }
  }, [stepIndex, router]);

  useSwipeNavigation({
    onSwipeLeft: goNext,
    onSwipeRight: goPrev,
    enabled: isValid,
  });

  if (!isValid) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background px-4">
        <div className="ui-card w-full max-w-md text-center">
          <p className="text-lg font-semibold text-foreground">Step not found</p>
          <button onClick={() => router.push("/umrah")} className="ui-primary-btn mt-4">
            Back to Umrah Guide
          </button>
        </div>
      </div>
    );
  }

  const subtitle = step.subSequence
    ? `${step.category === "tawaf" ? "Circuit" : "Lap"} ${step.subSequence} of 7`
    : `Step ${stepIndex + 1} of ${steps.length}`;

  return (
    <div className="min-h-dvh bg-background flex flex-col">
      <Header
        title={step.title}
        subtitle={subtitle}
        current={stepIndex}
        total={steps.length}
        backHref="/umrah"
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
        <StepGuidance category={step.category} />
        <div className="mx-auto max-w-xl px-4 py-4">
          <div className="ui-card-soft">
            <p className="text-sm leading-relaxed text-muted">{step.instructions}</p>
          </div>
        </div>

        <div>
          {visibleDuas.length === 0 && (
            <div className="mx-auto max-w-xl px-4 py-6">
              <p className="text-center text-sm text-muted">
                No Quran/Sahih-tagged dua in this step. Disable verified-only in Settings to view all.
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
        hasPrevious={stepIndex > 0}
        hasNext={stepIndex < steps.length - 1}
        currentLabel={`${stepIndex + 1} / ${steps.length}`}
      />
    </div>
  );
}
