import type { Metadata } from "next";
import { DM_Sans, Playfair_Display, Sarina } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const sarina = Sarina({
  variable: "--font-sarina",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Atelier – Boutique Language & Career Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Atelier | Where Ambitious Minds Learn to Speak the World",
    description:
      "A boutique language and career development studio dedicated to teaching through culture, conversation, and intellectual curiosity.",
    images: ["/og-image.png"],
    creator: "@theatelier.lab",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
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
        className={`${dmSans.variable} ${playfairDisplay.variable} ${sarina.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col pt-3 bg-pale-cream text-black font-dm-sans">
          <div className="top-bar"></div>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}