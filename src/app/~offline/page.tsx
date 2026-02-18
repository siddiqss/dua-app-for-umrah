import Link from "next/link";

export const metadata = {
  title: "You're Offline | Your Umrah & Hajj Companion",
  description: "This page is not available offline. Go back to the home screen to use cached content.",
};

export default function OfflinePage() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4 py-8">
      <div className="ui-card w-full max-w-md text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-2 text-muted">
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
        <h1 className="text-xl font-semibold text-foreground">You&apos;re offline</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          This page wasn&apos;t saved for offline use. Go back home and open Umrah or Hajj guides
          once online to cache them.
        </p>
        <Link href="/" className="ui-primary-btn mt-6 inline-flex w-full">
          Go to Home
        </Link>
      </div>
    </div>
  );
}
