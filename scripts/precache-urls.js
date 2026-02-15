/**
 * Builds the list of URLs to precache for offline support.
 * Used by next.config.mjs at build time.
 *
 * We only precache static shell routes here. Dynamic routes (/umrah/[step],
 * /hajj/[day]/[step]) are server-rendered on Vercel; precaching them can cause
 * "bad-precaching-response" (e.g. timeouts or 404 during SW install) and break
 * the whole service worker. Those pages are cached at runtime when the user
 * visits them (or when they tap "Prepare for offline" on the home page).
 */
const urls = [
  "/",
  "/~offline",
  "/umrah",
  "/hajj",
  "/my-duas",
  "/settings",
];

const buildId = process.env.BUILD_ID || `build-${Date.now()}`;

module.exports = urls.map((url) => ({
  url,
  revision: buildId,
}));
