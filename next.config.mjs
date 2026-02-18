import withPWAInit from "@ducanh2912/next-pwa";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const precacheEntries = require("./scripts/precache-urls.js");

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: false,
  aggressiveFrontEndNavCaching: false,
  cacheStartUrl: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: process.env.NODE_ENV === "development",
  fallbacks: {
    document: "/~offline",
  },
  workboxOptions: {
    disableDevLogs: true,
    additionalManifestEntries: precacheEntries,
    runtimeCaching: [
      {
        // Cache all same-origin navigations (reader pages) for offline reopen.
        urlPattern: ({ request, url }) =>
          request.mode === "navigate" &&
          url.origin === self.location.origin &&
          !url.pathname.startsWith("/api"),
        handler: "NetworkFirst",
        options: {
          cacheName: "app-pages",
          networkTimeoutSeconds: 4,
          expiration: {
            maxEntries: 200,
            maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
          },
        },
      },
      {
        urlPattern: /^https:\/\/fonts\.(?:gstatic|googleapis)\.com\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "google-fonts",
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
          },
        },
      },
      {
        urlPattern: /\.(?:js|css|woff|woff2)$/i,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "static-resources",
          expiration: {
            maxEntries: 120,
            maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year - avoid evicting cached app
          },
        },
      },
      {
        urlPattern: /\.(?:json)$/i,
        handler: "CacheFirst",
        options: {
          cacheName: "dua-data",
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 365 * 24 * 60 * 60,
          },
        },
      },
    ],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
          { key: "Service-Worker-Allowed", value: "/" },
        ],
      },
    ];
  },
};

export default withPWA(nextConfig);
