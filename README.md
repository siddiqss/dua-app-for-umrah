# Dua Nexus - Your Umrah & Hajj Companion

A high-readability Progressive Web App (PWA) for reading Umrah and Hajj duas. Designed for **optical clarity under the Makkah sun**, one-handed navigation in crowds, and **offline access** inside the Haram where cellular signals drop.

## Features

- **Haram Mode** - Pure white background, pure black text, zero decorations. Maximum contrast for sunlight readability.
- **Amiri Quran Font** - Classical Arabic typeface designed for digital Mushaf readability at 24px+ with 1.8x line height.
- **One-Thumb Navigation** - Giant Previous/Next buttons in the bottom 25% of the screen. Swipe gestures supported.
- **Adjustable Font Size** - 5 size levels from 20px to 36px for elderly pilgrims or those with vision difficulties.
- **Complete Umrah Guide** - 22 steps from Preparation through Halq, including all 7 Tawaf circuits and 7 Sa'i laps with individual duas.
- **Complete Hajj Guide** - Day-by-day guide covering all 6 days from Mina to the Farewell Tawaf.
- **10 Common Duas** - Essential daily supplications (entering masjid, wudu, travel, sleep, distress, etc.)
- **Personal Duas** - Add your own duas or family requests, auto-formatted in the same readable style.
- **PWA / Full Offline** - Install to home screen in 2 seconds. The full reader (home, Umrah, Hajj, My Duas, Settings, and all 22 Umrah + 14 Hajj steps) is **pre-cached** on first visit, so it works offline without opening each page first. If you open a non-cached URL while offline, you see a friendly offline page with a link back to Home instead of a broken state.
- **300+ SEO Pages** - Programmatic landing pages targeting search queries like "Tawaf Circuit 1 Dua Large Font."
- **Progress Tracking** - Resume where you left off via localStorage.

## Tech Stack

- **Next.js 14** (App Router, Static Site Generation)
- **TypeScript**
- **Tailwind CSS**
- **@ducanh2912/next-pwa** (Service Worker + offline caching)
- **@fontsource/amiri-quran** (Arabic typography)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Deployment

Optimized for Vercel (free tier). Just push to GitHub and connect to Vercel for automatic deployments with HTTPS and edge CDN.

**Vercel:** A `vercel.json` sets headers for `/sw.js`. The app precaches only the shell so the SW install does not fail; use **Prepare for offline** on the home page once on Wi-Fi to cache all reader steps. If `/sw.js` returns 404, clear the Vercel build cache and redeploy. If you use a custom domain or Vercel’s preview URLs, the relative precache URLs still resolve correctly.

## Project Structure

```
src/
  app/             - Next.js App Router pages
    umrah/         - Umrah overview + step reader
    hajj/          - Hajj overview + day/step reader
    my-duas/       - Personal duas manager
    settings/      - Display settings + common duas reader
    dua/[slug]/    - 300+ SEO landing pages
  components/      - Reusable UI components
  data/            - Static JSON dua datasets
  hooks/           - Custom React hooks
  lib/             - Types, store, utilities
```

## Data Sources

All duas are curated from authentic Islamic sources including:
- Sahih al-Bukhari
- Sahih Muslim
- Sunan Abu Dawud
- Jami' at-Tirmidhi
- Sunan Ibn Majah
- The Noble Quran
