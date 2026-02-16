"use client";

import RitualCard from "@/components/RitualCard";
import InstallPrompt from "@/components/InstallPrompt";
import PrepareOffline from "@/components/PrepareOffline";
import Link from "next/link";
import umrahData from "@/data/umrah.json";
import hajjData from "@/data/hajj.json";

export default function HomePage() {
  const hajjStepCount = hajjData.reduce(
    (acc, day) => acc + day.steps.length,
    0
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 safe-top">
        <h1 className="text-3xl font-bold text-foreground font-sans">
          Dua Nexus
        </h1>
        <p className="text-base text-muted mt-1 font-sans">
          Your Umrah & Hajj Companion
        </p>
        <p className="text-sm text-foreground/50 mt-3 leading-relaxed font-sans">
          High-readability dua reader designed for the Haram. Clear text under
          sunlight, one-handed navigation, works offline.
        </p>
      </div>

      {/* Ritual Cards */}
      <div className="px-4 pb-4 space-y-3">
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
      </div>

      {/* Prepare for offline (caches all reader pages for use without network) */}
      <PrepareOffline />

      {/* Settings Link */}
      <div className="px-4 pb-8">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-3 text-muted hover:text-foreground transition-colors"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
          <span className="text-sm font-sans">Settings</span>
        </Link>
      </div>

      <InstallPrompt />
    </div>
  );
}
