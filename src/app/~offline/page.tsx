import Link from "next/link";

export const metadata = {
  title: "You're Offline | Dua Nexus",
  description: "This page is not available offline. Go back to the home screen to use cached content.",
};

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <div className="max-w-sm w-full text-center">
        <div className="w-16 h-16 rounded-2xl bg-foreground/10 flex items-center justify-center mx-auto mb-6">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="1" y1="1" x2="23" y2="23" />
            <path d="M16.72 11.06A10.94 10.94 0 0119 8.02M10 3a10.89 10.89 0 018.52 5.36" />
            <path d="M20 6L4 6" />
            <path d="M8 18H4a2 2 0 01-2-2v-5" />
            <path d="M22 12v2a2 2 0 01-2 2H2" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-foreground font-sans mb-2">
          You&apos;re offline
        </h1>
        <p className="text-sm text-muted font-sans mb-6">
          This page wasn&apos;t saved for offline use. Open the home screen and
          use the Umrah or Hajj guides — those work without internet once
          you&apos;ve opened the app online once.
        </p>
        <Link
          href="/"
          className="touch-btn w-full rounded-xl bg-accent text-white font-sans font-semibold"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
