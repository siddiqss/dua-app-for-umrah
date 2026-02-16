import type { Metadata, Viewport } from "next";
import "@fontsource/amiri-quran";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dua Nexus - Your Umrah & Hajj Companion",
  description:
    "High-readability dua reader for Umrah and Hajj. Designed for sunlight, one-handed use, and offline access. The Kindle of Umrah duas.",
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
  authors: [{ name: "Dua Nexus" }],
  openGraph: {
    title: "Dua Nexus - Your Umrah & Hajj Companion",
    description:
      "High-readability dua reader for Umrah and Hajj rituals. Works offline in the Haram.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dua Nexus - Umrah & Hajj Dua Reader",
    description:
      "Read duas clearly under the Makkah sun. Offline-first PWA for pilgrims.",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Dua Nexus",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
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
        <link rel="apple-touch-icon" href="/icons/icon-192x192.svg" />
        <link rel="icon" href="/icons/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="haram-mode antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
