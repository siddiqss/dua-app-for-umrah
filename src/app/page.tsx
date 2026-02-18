"use client";

import RitualCard from "@/components/RitualCard";
import InstallPrompt from "@/components/InstallPrompt";
import PrepareOffline from "@/components/PrepareOffline";
import umrahData from "@/data/umrah.json";
import hajjData from "@/data/hajj.json";

export default function HomePage() {
  const hajjStepCount = hajjData.reduce(
    (acc, day) => acc + day.steps.length,
    0
  );

  return (
    <div className="min-h-dvh pb-24 pt-4">
      <main className="mx-auto max-w-xl space-y-4 px-4">
        <section className="ui-card safe-top">

          <h1 className="mt-2 text-3xl font-bold text-foreground">Your Umrah & Hajj Companion</h1>
          <p className="mt-1 text-sm text-muted">Clear guidance for every step of your pilgrimage.</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Everything you need for Umrah and Hajj in one place - clear text,
            simple navigation, and reliable offline access when you need it.
          </p>
        </section>

        <section className="space-y-3">
          <RitualCard
            href="/umrah"
            title="Umrah Guide"
            titleAr="دليل العمرة"
            description="Complete step-by-step guide with duas for every stage of Umrah."
            stepCount={`${umrahData.length} steps - Ihram to Halq`}
            icon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            }
          />

          <RitualCard
            href="/hajj"
            title="Hajj Guide"
            titleAr="دليل الحج"
            description="Day-by-day Hajj guide from Mina to the Farewell Tawaf."
            stepCount={`${hajjData.length} days, ${hajjStepCount} steps`}
            icon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            }
          />

          <RitualCard
            href="/my-duas"
            title="My Personal Duas"
            titleAr="أدعيتي الخاصة"
            description="Add your own duas or requests from family. Auto-formatted for easy reading."
            stepCount="Add and manage your collection"
            icon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            }
          />

          <RitualCard
            href="/settings"
            title="Common Duas & Settings"
            titleAr="الأدعية العامة"
            description="Essential daily duas and reading settings, including Quran/Sahih-only filter."
            stepCount="10 essential supplications"
            icon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
                <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
              </svg>
            }
          />
        </section>
      </main>

      <PrepareOffline />
      <footer className="mx-auto max-w-xl px-4 pb-20">
        <p className="text-center text-xs text-muted">
          Looking for the main site?{" "}
          <a
            href="https://thedeen.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-accent hover:underline"
          >
            Visit thedeen.app
          </a>
        </p>
      </footer>
      <InstallPrompt />
    </div>
  );
}
