import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond, Sarina } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import FloatingCTA from '../components/FloatingCTA';
import DarkModeToggle from '../components/DarkModeToggle';
import FloatingEmailPopup from '../components/FloatingEmailPopup';
import GlobalNav from '../components/GlobalNav';
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
  alternates: { canonical: "/" },
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
        url: "/og-image.webp",
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
    images: ["/og-image.webp"],
    creator: "@theatelier.lab",
  },
  icons: {
    icon: [
      { url: "/icon.png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/icon.png",
  },
  manifest: "/site.webmanifest",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "The Atelier",
  alternateName: "The English Atelier",
  url: BASE_URL,
  logo: `${BASE_URL}/og-image.webp`,
  description:
    "A boutique language and career development studio dedicated to teaching through culture, conversation, and intellectual curiosity.",
  email: "theenglishateliere@gmail.com",
  sameAs: ["https://www.instagram.com/theatelier.lab/"],
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
          colorPrimary: "#9D174D",
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
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          {/* Dark mode: respect saved preference without flash */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){try{var t=localStorage.getItem('atelier-theme');if(t==='dark'){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();`,
            }}
          />
        </head>
        <body className="min-h-full flex flex-col pt-[80px] bg-pale-cream text-black font-dm-sans">
          <GlobalNav />
          {children}
          <FloatingCTA />
          <DarkModeToggle />
          <FloatingEmailPopup />
        </body>
      </html>
    </ClerkProvider>
  );
}