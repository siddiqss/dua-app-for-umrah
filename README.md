# Dua Nexus - Your Umrah & Hajj Companion

A high-readability Progressive Web App (PWA) for reading Umrah and Hajj duas. Designed for **optical clarity under the Makkah sun**, one-handed navigation in crowds, and **offline access** inside the Haram where cellular signals drop.

## Features

- **Haram Mode** - Pure white background, pure black text, zero decorations. Maximum contrast for sunlight readability.
- **Amiri Quran Font** - Classical Arabic typeface designed for digital Mushaf readability at 24px+ with 1.8x line height.
- **One-Thumb Navigation** - Giant Previous/Next buttons in the bottom 25% of the screen. Swipe gestures supported.
- **Adjustable Font Size** - 5 size levels from 20px to 36px for elderly pilgrims or those with vision difficulties.
- **Complete Umrah Guide** - 22 steps from Preparation through Halq, including all 7 Tawaf circuits and 7 Sa'i laps with individual duas.
- **Comprehensive Hajj Guide** - 8-day matrix with 27 steps, including timing/location, variant notes, and checklist support.
- **10 Common Duas** - Essential daily supplications (entering masjid, wudu, travel, sleep, distress, etc.)
- **Personal Duas** - Add your own duas or family requests, auto-formatted in the same readable style.
- **PWA / Full Offline** - Install to home screen in 2 seconds. The full reader (home, Umrah, Hajj, My Duas, Settings, and all 22 Umrah + 27 Hajj steps) is **pre-cached** on first visit, so it works offline without opening each page first. If you open a non-cached URL while offline, you see a friendly offline page with a link back to Home instead of a broken state.
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

## Cloudflare Deployment

This project is configured for **Cloudflare Workers** using **OpenNext for Cloudflare**.

### 1. Authenticate Wrangler

```bash
npx wrangler whoami
# if not logged in:
npx wrangler login
```

If your token has access to multiple accounts, set one of these before deploy:

```bash
export CLOUDFLARE_ACCOUNT_ID=<your-account-id>
# or set "account_id" inside wrangler.jsonc
```

### 2. Build and preview locally (Cloudflare runtime)

```bash
npm run cf:preview
```

### 3. Deploy to Cloudflare

```bash
npm run cf:deploy
```

### 4. Configure persistent incremental cache (recommended)

Create a KV namespace and set it in `wrangler.jsonc` as `NEXT_INC_CACHE_KV`:

```bash
npx wrangler kv namespace create NEXT_INC_CACHE_KV
```

Then replace the placeholder in `wrangler.jsonc` with the returned namespace `id`.

### 5. Offline behavior checks after deploy

1. Open the app once on Wi-Fi and tap **Prepare for offline** on home.
2. Confirm `https://<your-domain>/sw.js` is reachable.
3. In browser devtools, verify service worker is active and pages load in offline mode.

`next.config.mjs` includes service worker headers for `/sw.js` to keep updates reliable across deployments.

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
