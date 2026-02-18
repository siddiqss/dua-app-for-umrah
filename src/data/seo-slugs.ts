// Programmatic SEO slug generation
// Maps search-optimized slugs to ritual data

import umrahData from "./umrah.json";
import hajjData from "./hajj.json";
import commonData from "./common.json";
import { RitualStep, HajjDay } from "@/lib/types";

export interface SeoPage {
  slug: string;
  title: string;
  description: string;
  h1: string;
  ritual: "umrah" | "hajj" | "common";
  stepId: string;
  keywords: string[];
}

// Helper to generate slug from text
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function generateUmrahSlugs(): SeoPage[] {
  const pages: SeoPage[] = [];
  const steps = umrahData as unknown as RitualStep[];

  // Base pages for each step
  steps.forEach((step) => {
    const baseSlug = slugify(step.title);

    // Primary slug
    pages.push({
      slug: baseSlug,
      title: `${step.title} - Dua & Guide | Your Umrah & Hajj Companion`,
      description: `${step.instructions.slice(0, 150)}... Read in large, clear font optimized for sunlight.`,
      h1: step.title,
      ritual: "umrah",
      stepId: step.id,
      keywords: [step.title.toLowerCase(), step.category, "umrah", "dua"],
    });

    // "dua for X" variant
    pages.push({
      slug: `dua-for-${baseSlug}`,
      title: `Dua for ${step.title} - Arabic Text & Translation | Your Umrah & Hajj Companion`,
      description: `Complete dua for ${step.title} with Arabic text, transliteration, and English translation. Large font, easy to read.`,
      h1: `Dua for ${step.title}`,
      ritual: "umrah",
      stepId: step.id,
      keywords: [`dua for ${step.title.toLowerCase()}`, "arabic", "translation"],
    });

    // "large font" variant
    pages.push({
      slug: `${baseSlug}-large-font`,
      title: `${step.title} Dua - Large Font for Easy Reading | Your Umrah & Hajj Companion`,
      description: `${step.title} dua in extra-large Arabic font. Perfect for elderly pilgrims or reading in bright sunlight.`,
      h1: `${step.title} - Large Font`,
      ritual: "umrah",
      stepId: step.id,
      keywords: [`${step.title.toLowerCase()} large font`, "readable", "elderly"],
    });

    // "printable" variant
    pages.push({
      slug: `printable-${baseSlug}`,
      title: `Printable ${step.title} Dua Card | Your Umrah & Hajj Companion`,
      description: `High-contrast printable ${step.title} dua. Black text on white background for maximum readability.`,
      h1: `Printable ${step.title} Dua`,
      ritual: "umrah",
      stepId: step.id,
      keywords: [`printable ${step.title.toLowerCase()}`, "card", "print"],
    });

    // Tawaf-specific: "circuit N" variants
    if (step.category === "tawaf" && step.subSequence) {
      const n = step.subSequence;
      const circuitVariants = [
        `tawaf-circuit-${n}-dua`,
        `tawaf-round-${n}-dua`,
        `tawaf-${n}th-round-dua`,
        `dua-tawaf-round-${n}-arabic`,
        `tawaf-round-${n}-large-font`,
        `readable-tawaf-circuit-${n}`,
        `tawaf-dua-round-${n}-with-translation`,
      ];

      circuitVariants.forEach((slug) => {
        pages.push({
          slug,
          title: `Tawaf Circuit ${n} Dua - Arabic & English | Your Umrah & Hajj Companion`,
          description: `Dua for the ${n}${n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th"} circuit of Tawaf with Arabic text, transliteration, and English translation.`,
          h1: `Tawaf - Circuit ${n} Dua`,
          ritual: "umrah",
          stepId: step.id,
          keywords: [`tawaf circuit ${n}`, `tawaf round ${n}`, "dua", "arabic"],
        });
      });
    }

    // Sa'i-specific: "lap N" variants
    if (step.category === "sai" && step.subSequence) {
      const n = step.subSequence;
      const lapVariants = [
        `sai-lap-${n}-dua`,
        `sai-round-${n}-dua`,
        `dua-sai-lap-${n}`,
        `sai-lap-${n}-arabic-english`,
        `readable-sai-lap-${n}`,
      ];

      lapVariants.forEach((slug) => {
        pages.push({
          slug,
          title: `Sa'i Lap ${n} Dua - Arabic & Translation | Your Umrah & Hajj Companion`,
          description: `Dua for lap ${n} of Sa'i between Safa and Marwa. Clear Arabic text with transliteration and English meaning.`,
          h1: `Sa'i - Lap ${n} Dua`,
          ritual: "umrah",
          stepId: step.id,
          keywords: [`sai lap ${n}`, "safa", "marwa", "dua"],
        });
      });
    }
  });

  // General Umrah pages
  const generalUmrahSlugs = [
    { slug: "umrah-dua-list", title: "Complete Umrah Dua List" },
    { slug: "umrah-duas-arabic-english", title: "Umrah Duas - Arabic & English" },
    { slug: "umrah-dua-pdf-alternative", title: "Umrah Dua Reader - Better Than PDF" },
    { slug: "umrah-dua-large-text", title: "Umrah Duas in Large Text" },
    { slug: "umrah-prayer-guide", title: "Umrah Prayer Guide" },
    { slug: "umrah-step-by-step-duas", title: "Step by Step Umrah Duas" },
    { slug: "umrah-dua-for-beginners", title: "Umrah Dua Guide for Beginners" },
    { slug: "umrah-dua-book-online", title: "Umrah Dua Book Online" },
    { slug: "umrah-dua-with-transliteration", title: "Umrah Duas with Transliteration" },
    { slug: "umrah-dua-elderly-friendly", title: "Elderly-Friendly Umrah Duas" },
    { slug: "umrah-dua-readable", title: "Readable Umrah Duas" },
    { slug: "umrah-dua-offline", title: "Umrah Duas - Works Offline" },
    { slug: "all-umrah-duas", title: "All Umrah Duas in One Place" },
    { slug: "umrah-duas-high-contrast", title: "High Contrast Umrah Duas" },
    { slug: "umrah-dua-sunlight-readable", title: "Sunlight-Readable Umrah Duas" },
    { slug: "tawaf-dua-all-7-rounds", title: "Tawaf Dua for All 7 Rounds" },
    { slug: "tawaf-dua-complete", title: "Complete Tawaf Duas" },
    { slug: "tawaf-dua-arabic-text", title: "Tawaf Dua Arabic Text" },
    { slug: "tawaf-prayers-each-round", title: "Tawaf Prayers for Each Round" },
    { slug: "tawaf-dua-large-font", title: "Tawaf Dua Large Font" },
    { slug: "sai-dua-all-7-laps", title: "Sa'i Dua for All 7 Laps" },
    { slug: "sai-dua-complete", title: "Complete Sa'i Duas" },
    { slug: "sai-dua-safa-marwa", title: "Sa'i Dua Between Safa & Marwa" },
    { slug: "sai-dua-arabic-english", title: "Sa'i Dua Arabic & English" },
    { slug: "sai-prayers-each-lap", title: "Sa'i Prayers for Each Lap" },
    { slug: "ihram-dua", title: "Ihram Dua" },
    { slug: "talbiyah-text-arabic", title: "Talbiyah Text in Arabic" },
    { slug: "talbiyah-transliteration", title: "Talbiyah with Transliteration" },
    { slug: "maqam-ibrahim-dua", title: "Dua at Maqam Ibrahim" },
    { slug: "zamzam-water-dua", title: "Dua for Drinking Zamzam Water" },
    { slug: "kaaba-first-sight-dua", title: "Dua Upon First Seeing the Kaaba" },
    { slug: "entering-masjid-al-haram-dua", title: "Dua for Entering Masjid al-Haram" },
    { slug: "umrah-completion-dua", title: "Dua After Completing Umrah" },
    { slug: "halq-taqsir-dua", title: "Dua for Halq and Taqsir" },
    { slug: "black-stone-dua", title: "Dua at the Black Stone" },
    { slug: "yemeni-corner-dua", title: "Dua Between Yemeni Corner & Black Stone" },
    { slug: "mount-safa-dua", title: "Dua at Mount Safa" },
    { slug: "mount-marwa-dua", title: "Dua at Mount Marwa" },
  ];

  generalUmrahSlugs.forEach((item) => {
    pages.push({
      slug: item.slug,
      title: `${item.title} | Your Umrah & Hajj Companion`,
      description: `${item.title} - High-readability Arabic text with transliteration and English translation. Optimized for mobile and sunlight reading.`,
      h1: item.title,
      ritual: "umrah",
      stepId: steps[0].id,
      keywords: [item.slug.replace(/-/g, " "), "umrah", "dua"],
    });
  });

  return pages;
}

function generateHajjSlugs(): SeoPage[] {
  const pages: SeoPage[] = [];
  const days = hajjData as unknown as HajjDay[];

  days.forEach((day) => {
    day.steps.forEach((step) => {
      const baseSlug = slugify(step.title);

      pages.push({
        slug: `hajj-${baseSlug}`,
        title: `${step.title} - Hajj Dua & Guide | Your Umrah & Hajj Companion`,
        description: `${step.instructions.slice(0, 150)}... Complete dua with Arabic text and translation.`,
        h1: `Hajj: ${step.title}`,
        ritual: "hajj",
        stepId: step.id,
        keywords: [step.title.toLowerCase(), "hajj", step.category, "dua"],
      });

      pages.push({
        slug: `dua-for-hajj-${baseSlug}`,
        title: `Dua for ${step.title} During Hajj | Your Umrah & Hajj Companion`,
        description: `Complete dua for ${step.title} with Arabic, transliteration, and English translation. Large, readable font.`,
        h1: `Dua for ${step.title}`,
        ritual: "hajj",
        stepId: step.id,
        keywords: [`dua ${step.title.toLowerCase()}`, "hajj", "arabic"],
      });

      pages.push({
        slug: `hajj-${baseSlug}-large-font`,
        title: `${step.title} Dua Large Font | Your Umrah & Hajj Companion`,
        description: `${step.title} dua in large, readable Arabic font for Hajj pilgrims.`,
        h1: `${step.title} - Large Font`,
        ritual: "hajj",
        stepId: step.id,
        keywords: [`${step.title.toLowerCase()} large font`, "hajj", "readable"],
      });
    });
  });

  // General Hajj SEO pages
  const generalHajjSlugs = [
    { slug: "hajj-dua-list", title: "Complete Hajj Dua List" },
    { slug: "hajj-duas-arabic-english", title: "Hajj Duas - Arabic & English" },
    { slug: "hajj-dua-day-by-day", title: "Hajj Duas Day by Day" },
    { slug: "hajj-dua-pdf-alternative", title: "Hajj Dua Reader - Better Than PDF" },
    { slug: "hajj-step-by-step-duas", title: "Step by Step Hajj Duas" },
    { slug: "hajj-dua-for-beginners", title: "Hajj Dua Guide for Beginners" },
    { slug: "hajj-dua-book-online", title: "Hajj Dua Book Online" },
    { slug: "arafah-dua", title: "Dua of Arafah" },
    { slug: "day-of-arafah-dua", title: "Day of Arafah Dua" },
    { slug: "arafah-dua-arabic-english", title: "Arafah Dua Arabic & English" },
    { slug: "best-dua-arafah", title: "Best Dua for Day of Arafah" },
    { slug: "arafah-dua-large-font", title: "Arafah Dua Large Font" },
    { slug: "muzdalifah-dua", title: "Dua at Muzdalifah" },
    { slug: "mina-dua", title: "Dua at Mina" },
    { slug: "jamarat-stoning-dua", title: "Dua for Stoning Jamarat" },
    { slug: "rami-jamarat-dua", title: "Rami al-Jamarat Dua" },
    { slug: "tawaf-ifadah-dua", title: "Tawaf al-Ifadah Dua" },
    { slug: "tawaf-wada-dua", title: "Farewell Tawaf Dua" },
    { slug: "tawaf-al-wada-dua", title: "Tawaf al-Wada Dua" },
    { slug: "qurbani-sacrifice-dua", title: "Qurbani Sacrifice Dua" },
    { slug: "eid-al-adha-dua", title: "Eid al-Adha Dua" },
    { slug: "takbeer-tashreeq", title: "Takbeer of Tashreeq" },
    { slug: "hajj-talbiyah", title: "Hajj Talbiyah Full Text" },
    { slug: "hajj-dua-readable", title: "Readable Hajj Duas" },
    { slug: "hajj-dua-elderly-friendly", title: "Elderly-Friendly Hajj Duas" },
    { slug: "hajj-dua-offline", title: "Hajj Duas - Works Offline" },
  ];

  generalHajjSlugs.forEach((item) => {
    pages.push({
      slug: item.slug,
      title: `${item.title} | Your Umrah & Hajj Companion`,
      description: `${item.title} - Clear Arabic text with transliteration and English translation. Optimized for mobile reading in sunlight.`,
      h1: item.title,
      ritual: "hajj",
      stepId: days[0].steps[0].id,
      keywords: [item.slug.replace(/-/g, " "), "hajj", "dua"],
    });
  });

  return pages;
}

function generateCommonSlugs(): SeoPage[] {
  const pages: SeoPage[] = [];
  const steps = commonData as unknown as RitualStep[];

  steps.forEach((step) => {
    const baseSlug = slugify(step.title);

    pages.push({
      slug: baseSlug,
      title: `${step.title} - Dua | Your Umrah & Hajj Companion`,
      description: `${step.instructions} Clear Arabic text with transliteration and English translation.`,
      h1: step.title,
      ritual: "common",
      stepId: step.id,
      keywords: [step.title.toLowerCase(), "dua", "islamic"],
    });

    pages.push({
      slug: `${baseSlug}-arabic-english`,
      title: `${step.title} Dua - Arabic & English | Your Umrah & Hajj Companion`,
      description: `${step.title} dua with full Arabic text, transliteration, and English translation.`,
      h1: `${step.title} - Arabic & English`,
      ritual: "common",
      stepId: step.id,
      keywords: [`${step.title.toLowerCase()} arabic english`, "dua"],
    });
  });

  // General Islamic dua pages
  const generalSlugs = [
    { slug: "islamic-dua-collection", title: "Islamic Dua Collection" },
    { slug: "daily-islamic-duas", title: "Daily Islamic Duas" },
    { slug: "masjid-dua-entering-leaving", title: "Masjid Dua - Entering & Leaving" },
    { slug: "travel-dua-arabic", title: "Travel Dua in Arabic" },
    { slug: "morning-evening-duas", title: "Morning & Evening Duas" },
    { slug: "dua-for-protection", title: "Dua for Protection" },
    { slug: "sayyid-al-istighfar-arabic", title: "Sayyid al-Istighfar in Arabic" },
    { slug: "dua-for-anxiety-distress", title: "Dua for Anxiety & Distress" },
    { slug: "after-prayer-dhikr", title: "After Prayer Dhikr" },
    { slug: "wudu-dua-arabic", title: "Wudu Dua in Arabic" },
    { slug: "dua-before-sleeping", title: "Dua Before Sleeping" },
    { slug: "dua-after-waking-up", title: "Dua After Waking Up" },
    { slug: "pilgrim-essential-duas", title: "Essential Duas for Pilgrims" },
    { slug: "large-font-islamic-duas", title: "Large Font Islamic Duas" },
    { slug: "readable-dua-collection", title: "Readable Dua Collection" },
    { slug: "dua-with-transliteration", title: "Duas with Transliteration" },
    { slug: "offline-dua-reader", title: "Offline Dua Reader" },
    { slug: "high-contrast-dua-reader", title: "High Contrast Dua Reader" },
    { slug: "printable-dua-cards", title: "Printable Dua Cards" },
    { slug: "dua-lanyard-card", title: "Dua Lanyard Card" },
    { slug: "umrah-dua-card-lanyard", title: "Umrah Dua Card for Lanyard" },
    { slug: "printable-umrah-dua-card-lanyard", title: "Printable Umrah Dua Card Lanyard" },
    { slug: "readable-sai-duas-elderly", title: "Readable Sa'i Duas for Elderly" },
  ];

  generalSlugs.forEach((item) => {
    pages.push({
      slug: item.slug,
      title: `${item.title} | Your Umrah & Hajj Companion`,
      description: `${item.title} - High-readability format with Arabic, transliteration, and English translation. Works offline.`,
      h1: item.title,
      ritual: "common",
      stepId: steps[0].id,
      keywords: [item.slug.replace(/-/g, " "), "dua", "islamic"],
    });
  });

  return pages;
}

export function getAllSeoPages(): SeoPage[] {
  return [
    ...generateUmrahSlugs(),
    ...generateHajjSlugs(),
    ...generateCommonSlugs(),
  ];
}

export function getSeoPageBySlug(slug: string): SeoPage | undefined {
  return getAllSeoPages().find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return getAllSeoPages().map((p) => p.slug);
}
