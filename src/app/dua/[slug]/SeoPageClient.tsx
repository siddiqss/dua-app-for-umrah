"use client";

import Header from "@/components/Header";
import DuaCard from "@/components/DuaCard";
import FontSizeControl from "@/components/FontSizeControl";
import { usePreferences } from "@/hooks/usePreferences";
import Link from "next/link";
import { SeoPage } from "@/data/seo-slugs";
import { isVerifiedReference } from "@/lib/reference";

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
  const visibleDuas = step.duas.filter(
    (dua) => !prefs.verifiedOnly || isVerifiedReference(dua.reference)
  );

  const ctaHref =
    page.ritual === "umrah"
      ? "/umrah"
      : page.ritual === "hajj"
      ? "/hajj"
      : "/settings";

  return (
    <div className="min-h-dvh bg-background">
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

      <main className="mx-auto max-w-xl space-y-4 px-4 py-4 pb-20">
        <section className="ui-card">
          <h1 className="text-2xl font-bold text-foreground">{page.h1}</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">{page.description}</p>
        </section>

        <section className="ui-card-soft">
          <h2 className="ui-section-title">How To Perform</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{step.instructions}</p>
        </section>

        <div>
          {visibleDuas.length === 0 && (
            <div className="py-6">
              <p className="text-center text-sm text-muted">
                No Quran/Sahih-tagged dua in this page while verified-only is on.
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

        <section className="ui-card text-center">
          <h3 className="text-lg font-semibold text-foreground">
            Read All {page.ritual === "umrah" ? "Umrah" : page.ritual === "hajj" ? "Hajj" : ""} Duas
          </h3>
          <p className="mt-2 text-sm text-muted">
            Get the complete step-by-step guide with all duas. Works offline in the Haram.
          </p>
          <Link href={ctaHref} className="ui-primary-btn mt-4 inline-flex w-full">
            Open Full Guide
          </Link>
          <p className="mt-3 text-xs text-muted">
            Free. No account required. Add to Home Screen for offline use.
          </p>
        </section>
      </main>
    </div>
  );
}
