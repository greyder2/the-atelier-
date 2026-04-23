import type { Metadata } from "next";
import { DM_Sans, Pacifico, Sarina } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  weight: "400",
  subsets: ["latin"],
});

const sarina = Sarina({
  variable: "--font-sarina",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // ── Core ──────────────────────────────────────────────────────────────────
  title: {
    default: "The Atelier | Where Ambitious Minds Learn to Speak the World",
    template: "%s | The Atelier",
  },
  description:
    "A boutique language and career development studio dedicated to teaching through culture, conversation, and intellectual curiosity.",
  keywords: [
    "language learning",
    "career development",
    "boutique language studio",
    "language coaching",
    "cultural immersion",
    "English tutoring",
    "professional communication",
    "intellectual curiosity",
    "The Atelier",
  ],
  authors: [{ name: "The Atelier" }],
  creator: "The Atelier",
  publisher: "The Atelier",

  // ── Canonical & Robots ────────────────────────────────────────────────────
  metadataBase: new URL("https://theenglishatelier.vercel.app"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Open Graph ────────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://theenglishatelier.vercel.app",
    siteName: "The Atelier",
    title: "The Atelier | Where Ambitious Minds Learn to Speak the World",
    description:
      "A boutique language and career development studio dedicated to teaching through culture, conversation, and intellectual curiosity.",
    images: [
      {
        url: "/og-image.png", // ← /public klasörüne koy, 1200×630 önerilir
        width: 1200,
        height: 630,
        alt: "The Atelier – Boutique Language & Career Studio",
      },
    ],
  },

  // ── Twitter / X ───────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "The Atelier | Where Ambitious Minds Learn to Speak the World",
    description:
      "A boutique language and career development studio dedicated to teaching through culture, conversation, and intellectual curiosity.",
    images: ["/og-image.png"],
    creator: "@theatelier.lab", // Instagram: @theatelier.lab
  },

  // ── Icons ─────────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },

  // ── Manifest (PWA) ────────────────────────────────────────────────────────
  manifest: "/site.webmanifest",

  // ── Verification ──────────────────────────────────────────────────────────
  // verification: {
  //   google: "GOOGLE_SEARCH_CONSOLE_TOKEN",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#D4006A",
          colorText: "#111111",
          colorBackground: "#FAF7F0",
        },
      }}
    >
      <html
        lang="en"
        className={`${dmSans.variable} ${pacifico.variable} ${sarina.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col pt-3 bg-pale-cream text-black font-dm-sans">
          <div className="top-bar"></div>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}