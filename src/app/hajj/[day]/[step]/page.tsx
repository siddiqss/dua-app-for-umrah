"use client";

import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Header from "@/components/Header";
import DuaCard from "@/components/DuaCard";
import ReaderNav from "@/components/ReaderNav";
import FontSizeControl from "@/components/FontSizeControl";
import { useSwipeNavigation } from "@/hooks/useSwipeNavigation";
import { usePreferences } from "@/hooks/usePreferences";
import hajjData from "@/data/hajj.json";
import { isVerifiedReference } from "@/lib/reference";
import StepGuidance from "@/components/StepGuidance";
import StepMetaPanel from "@/components/StepMetaPanel";

// Build flat list of all steps with day/step references
interface FlatStep {
  dayIndex: number;
  stepIndex: number;
  dayTitle: string;
  step: (typeof hajjData)[number]["steps"][number];
}

function buildFlatSteps(): FlatStep[] {
  const flat: FlatStep[] = [];
  hajjData.forEach((day, dayIndex) => {
    day.steps.forEach((step, stepIndex) => {
      flat.push({ dayIndex, stepIndex, dayTitle: day.title, step });
    });
  });
  return flat;
}

const flatSteps = buildFlatSteps();

export default function HajjStepReader() {
  const params = useParams();
  const router = useRouter();
  const dayIndex = parseInt(params.day as string, 10);
  const stepIndex = parseInt(params.step as string, 10);
  const { prefs, updatePrefs, loaded } = usePreferences();
  const [animDir, setAnimDir] = useState<"left" | "right" | null>(null);

  // Find current flat index
  const flatIndex = flatSteps.findIndex(
    (s) => s.dayIndex === dayIndex && s.stepIndex === stepIndex
  );
  const current = flatSteps[flatIndex];
  const isValid = current !== undefined;
  const visibleDuas = isValid
    ? current.step.duas.filter(
        (dua) => !prefs.verifiedOnly || isVerifiedReference(dua.reference)
      )
    : [];

  // Save progress
  useEffect(() => {
    if (isValid && loaded) {
      updatePrefs({
        lastHajjDay: dayIndex,
        lastHajjStep: current.step.id,
      });
    }
  }, [dayIndex, stepIndex, isValid, loaded]); // eslint-disable-line react-hooks/exhaustive-deps

  const goNext = useCallback(() => {
    if (flatIndex < flatSteps.length - 1) {
      const next = flatSteps[flatIndex + 1];
      setAnimDir("left");
      setTimeout(() => {
        router.push(`/hajj/${next.dayIndex}/${next.stepIndex}`);
        setAnimDir(null);
      }, 150);
    }
  }, [flatIndex, router]);

  const goPrev = useCallback(() => {
    if (flatIndex > 0) {
      const prev = flatSteps[flatIndex - 1];
      setAnimDir("right");
      setTimeout(() => {
        router.push(`/hajj/${prev.dayIndex}/${prev.stepIndex}`);
        setAnimDir(null);
      }, 150);
    }
  }, [flatIndex, router]);

  useSwipeNavigation({
    onSwipeLeft: goNext,
    onSwipeRight: goPrev,
    enabled: isValid,
  });

  if (!isValid) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-8">
          <p className="text-lg font-bold text-foreground font-sans">
            Step not found
          </p>
          <button
            onClick={() => router.push("/hajj")}
            className="mt-4 touch-btn px-6 rounded-xl bg-accent text-white font-sans"
          >
            Back to Hajj Guide
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        title={current.step.title}
        subtitle={current.dayTitle}
        current={flatIndex}
        total={flatSteps.length}
        backHref="/hajj"
        rightElement={
          <FontSizeControl
            currentLevel={prefs.fontSizeLevel}
            onChange={(level) => updatePrefs({ fontSizeLevel: level })}
          />
        }
      />

      {/* Content */}
      <div
        className={`flex-1 overflow-y-auto pb-4 transition-all duration-150 ${
          animDir === "left"
            ? "opacity-0 translate-x-[-20px]"
            : animDir === "right"
            ? "opacity-0 translate-x-[20px]"
            : "opacity-100 translate-x-0"
        }`}
      >
        {/* Instructions */}
        <StepGuidance category={current.step.category} />
        <StepMetaPanel
          stepId={current.step.id}
          timing={current.step.timing}
          location={current.step.location}
          variantNotes={current.step.variantNotes}
          checklist={current.step.checklist}
        />
        <div className="px-6 py-4 border-b border-border">
          <p className="text-sm text-foreground/70 leading-relaxed font-sans">
            {current.step.instructions}
          </p>
        </div>

        {/* Duas */}
        <div className="divide-y divide-border">
          {visibleDuas.length === 0 && (
            <div className="px-6 py-6">
              <p className="text-sm text-muted text-center font-sans">
                No Quran/Sahih-tagged dua in this step. Disable verified-only in
                Settings to view all.
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

      {/* Navigation */}
      <ReaderNav
        onPrevious={goPrev}
        onNext={goNext}
        hasPrevious={flatIndex > 0}
        hasNext={flatIndex < flatSteps.length - 1}
        currentLabel={`${flatIndex + 1} / ${flatSteps.length}`}
      />
    </div>
  );
}
