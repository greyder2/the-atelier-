import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond, Sarina } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
});

const sarina = Sarina({
  variable: "--font-sarina",
  weight: "400",
  subsets: ["latin"],
});

const BASE_URL = "https://theenglishatelier.vercel.app";

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
  metadataBase: new URL(BASE_URL),
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
    url: BASE_URL,
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

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "The Atelier",
  alternateName: "The English Atelier",
  url: BASE_URL,
  logo: `${BASE_URL}/og-image.png`,
  description:
    "A boutique language and career development studio dedicated to teaching through culture, conversation, and intellectual curiosity.",
  email: "theenglishateliere@gmail.com",
  sameAs: [
    "https://www.instagram.com/theatelier.lab/",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Language & Career Programs",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Course",
          name: "Private Coaching",
          description: "1-on-1 English coaching for ambitious professionals.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Course",
          name: "Atelier Subscriptions",
          description: "Monthly membership for continuous language development.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Course",
          name: "Corporate Language Training",
          description: "Tailored English programs for corporate teams.",
        },
      },
    ],
  },
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
        className={`${dmSans.variable} ${cormorantGaramond.variable} ${sarina.variable} h-full antialiased`}
      >
        <head>
          {/* JSON-LD Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          {/* Dark mode: read persisted preference before first paint to avoid flash */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
(function(){
  try {
    var saved = localStorage.getItem('atelier-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (!saved && prefersDark)) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  } catch(e){}
})();
              `.trim(),
            }}
          />
        </head>
        <body className="min-h-full flex flex-col pt-3 bg-pale-cream text-black font-dm-sans">
          <div className="top-bar"></div>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}