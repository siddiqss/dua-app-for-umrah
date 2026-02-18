import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSeoPages, getSeoPageBySlug } from "@/data/seo-slugs";
import umrahData from "@/data/umrah.json";
import hajjData from "@/data/hajj.json";
import commonData from "@/data/common.json";
import SeoPageClient from "./SeoPageClient";
import { RitualStep, HajjDay } from "@/lib/types";

interface PageProps {
  params: { slug: string };
}

// Generate all static paths at build time
export async function generateStaticParams() {
  const pages = getAllSeoPages();
  return pages.map((page) => ({
    slug: page.slug,
  }));
}

// Dynamic metadata for each SEO page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = getSeoPageBySlug(params.slug);
  if (!page) return { title: "Not Found" };

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    openGraph: {
      title: page.title,
      description: page.description,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: page.title,
      description: page.description,
    },
  };
}

// Find the step data for this SEO page
function findStepData(stepId: string, ritual: string) {
  if (ritual === "umrah") {
    const steps = umrahData as unknown as RitualStep[];
    return steps.find((s) => s.id === stepId);
  }
  if (ritual === "hajj") {
    const days = hajjData as unknown as HajjDay[];
    for (const day of days) {
      const step = day.steps.find((s) => s.id === stepId);
      if (step) return step;
    }
  }
  if (ritual === "common") {
    const steps = commonData as unknown as RitualStep[];
    return steps.find((s) => s.id === stepId);
  }
  return undefined;
}

export default function SeoPage({ params }: PageProps) {
  const page = getSeoPageBySlug(params.slug);
  if (!page) notFound();

  const step = findStepData(page.stepId, page.ritual);
  if (!step) notFound();

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    name: page.h1,
    description: page.description,
    author: { "@type": "Organization", name: "Your Umrah & Hajj Companion" },
    publisher: { "@type": "Organization", name: "Your Umrah & Hajj Companion" },
    inLanguage: ["en", "ar"],
    about: {
      "@type": "Thing",
      name: page.ritual === "umrah" ? "Umrah" : page.ritual === "hajj" ? "Hajj" : "Islamic Supplications",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SeoPageClient page={page} step={step} />
    </>
  );
}
