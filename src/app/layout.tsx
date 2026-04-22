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
  title: "The Atelier | Where Ambitious Minds Learn to Speak the World",
  description: "A boutique language and career development studio dedicated to teaching through culture, conversation, and intellectual curiosity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
      variables: {
        colorPrimary: '#D4006A',
        colorText: '#111111',
        colorBackground: '#FAF7F0',
      }
    }}>
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
