"use client";

import Header from "@/components/Header";
import DuaCard from "@/components/DuaCard";
import FontSizeControl from "@/components/FontSizeControl";
import { usePreferences } from "@/hooks/usePreferences";
import Link from "next/link";
import { SeoPage } from "@/data/seo-slugs";

interface SeoPageClientProps {
  page: SeoPage;
  step: {
    id: string;
    title: string;
    instructions: string;
    duas: Array<{
      id: string;
      arabic: string;
      transliteration: string;
      translation: string;
      reference?: string;
      note?: string;
    }>;
  };
}

export default function SeoPageClient({ page, step }: SeoPageClientProps) {
  const { prefs, updatePrefs } = usePreferences();

  const ctaHref =
    page.ritual === "umrah"
      ? "/umrah"
      : page.ritual === "hajj"
      ? "/hajj"
      : "/settings";

  return (
    <div className="min-h-screen bg-background">
      <Header
        title={page.h1}
        backHref="/"
        rightElement={
          <FontSizeControl
            currentLevel={prefs.fontSizeLevel}
            onChange={(level) => updatePrefs({ fontSizeLevel: level })}
          />
        }
      />

      {/* SEO Content Header */}
      <div className="px-6 py-6 border-b border-border">
        <h1 className="text-2xl font-bold text-foreground mb-3 font-sans">
          {page.h1}
        </h1>
        <p className="text-sm text-foreground/60 leading-relaxed font-sans">
          {page.description}
        </p>
      </div>

      {/* Instructions */}
      <div className="px-6 py-4 border-b border-border">
        <h2 className="text-sm font-bold text-muted uppercase tracking-wider mb-2 font-sans">
          How to Perform
        </h2>
        <p className="text-sm text-foreground/70 leading-relaxed font-sans">
          {step.instructions}
        </p>
      </div>

      {/* Duas */}
      <div className="divide-y divide-border">
        {step.duas.map((dua, i) => (
          <DuaCard
            key={dua.id}
            dua={dua}
            fontSizeLevel={prefs.fontSizeLevel}
            showTransliteration={prefs.showTransliteration}
            showTranslation={prefs.showTranslation}
            index={i}
            total={step.duas.length}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="px-4 py-8 border-t border-border">
        <div className="max-w-sm mx-auto text-center">
          <h3 className="text-lg font-bold text-foreground mb-2 font-sans">
            Read All {page.ritual === "umrah" ? "Umrah" : page.ritual === "hajj" ? "Hajj" : ""} Duas
          </h3>
          <p className="text-sm text-muted mb-4 font-sans">
            Get the complete step-by-step guide with all duas. Works offline for
            use in the Haram.
          </p>
          <Link
            href={ctaHref}
            className="touch-btn w-full rounded-xl bg-accent text-white text-lg font-semibold font-sans"
          >
            Open Full Guide
          </Link>
          <p className="text-xs text-muted mt-3 font-sans">
            Free. No download required. Add to Home Screen for offline use.
          </p>
        </div>
      </div>
    </div>
  );
}
