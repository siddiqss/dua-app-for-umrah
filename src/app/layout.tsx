import type { Metadata, Viewport } from "next";
import "@fontsource/amiri-quran";
import "./globals.css";

export const metadata: Metadata = {
  title: "Your Umrah & Hajj Companion",
  description:
    "Everything you need for Umrah and Hajj in one place - clear text, simple navigation, and reliable offline access when you need it.",
  keywords: [
    "umrah dua",
    "hajj dua",
    "tawaf dua",
    "sai dua",
    "umrah guide",
    "hajj guide",
    "islamic dua",
    "pilgrimage",
    "makkah",
    "umrah prayers",
  ],
  authors: [{ name: "Your Umrah & Hajj Companion" }],
  openGraph: {
    title: "Your Umrah & Hajj Companion",
    description:
      "Clear and practical Umrah and Hajj dua reader with offline access for use in the Haram.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Umrah & Hajj Companion",
    description:
      "Read duas clearly under the Makkah sun. Offline-first PWA for pilgrims.",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Your Umrah & Hajj Companion",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f8a6a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="icon" href="/icons/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="antialiased min-h-dvh">
        <div className="ramadan-lanterns" aria-hidden="true" />
        <div className="relative z-[1] min-h-dvh">{children}</div>
      </body>
    </html>
  );
}
