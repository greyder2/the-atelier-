import React from 'react';
import Link from 'next/link';
import { client } from '../../../../sanity/lib/client';
import { groq } from 'next-sanity';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Atelier Spotlights',
  description: 'Meet the women of Atelier Spotlights — an exclusive, by-invitation program exploring leadership, language, and communication through the stories of remarkable women.',
};

export const revalidate = 3600;

export default async function SpotlightsPage() {
  const spotlightsQuery = groq`*[_type == "spotlight"] | order(_createdAt asc) {
    name, "slug": slug.current, heading, shortQuote, category, "imagePath": image.asset->url
  }`;
  const fetchedSpotlights = await client.fetch(spotlightsQuery);
  const localData = require('@/data/spotlights');
  const spotlights = fetchedSpotlights.length > 0 ? fetchedSpotlights : localData.spotlights;
  
  const firstGeneration = spotlights.filter((s: any) => s.category === 'FIRST');
  const secondGeneration = spotlights.filter((s: any) => s.category === 'SECOND');

  return (
    <main style={{ backgroundColor: '#FAF7F0', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ height: '12px', backgroundColor: '#C8006A', width: '100%' }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'calc(100vh - 12px)' }}>
        <div style={{ padding: '60px 8%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.05, marginBottom: '40px', color: '#111' }}>
            Atelier<br />Spotlights
          </h1>

          <div style={{ background: '#F4A7C3', borderRadius: '24px', padding: '36px 40px', maxWidth: '500px', fontSize: '1rem', lineHeight: 1.8, color: '#111' }}>
            <p style={{ marginBottom: '16px' }}>Atelier Spotlights is a signature "by invitation only" program of The Atelier.</p>
            <p style={{ marginBottom: '16px' }}>Each edition focuses on remarkable women from history, science, fashion, politics, literature, and global culture.</p>
            <p style={{ marginBottom: '16px' }}>Through their stories, the Spotlights explore language while reflecting on leadership, ambition, and creativity.</p>
            <p style={{ marginBottom: '16px' }}>These conversations create a learning experience that is both intellectually enriching and deeply inspiring.</p>
            <p>To see more of the Atelier Spotlights graduates,{' '}
              <Link href="/pages/spotlights/first-generation" style={{ fontWeight: 800, textDecoration: 'underline', color: '#C8006A' }}>click here.</Link>
            </p>
          </div>

          <div style={{ marginTop: '12px', fontSize: '2.5rem', marginLeft: '60%' }}>👈</div>

          <div style={{ display: 'flex', gap: '16px', marginTop: '40px', flexWrap: 'wrap' }}>
            <Link href="/pages/spotlights/first-generation" style={{ background: '#C8006A', color: '#fff', borderRadius: '50px', padding: '12px 28px', textDecoration: 'none', fontWeight: 700, fontSize: '0.85rem', boxShadow: '0 4px 0 #8a0047' }}>
              First Generation ({firstGeneration.length})
            </Link>
            <Link href="/pages/spotlights/second-generation" style={{ background: '#D9F060', color: '#111', borderRadius: '50px', padding: '12px 28px', textDecoration: 'none', fontWeight: 700, fontSize: '0.85rem', boxShadow: '0 4px 0 #a8b800' }}>
              Second Generation ({secondGeneration.length})
            </Link>
          </div>
        </div>

        <div style={{ background: 'linear-gradient(160deg, #f8d7e8 0%, #e8a0c0 25%, #c8006a 60%, #8a0047 100%)', position: 'relative', overflow: 'hidden', minHeight: '100%' }}>
          <div style={{ position: 'absolute', top: '40%', left: '20%', fontFamily: "var(--font-cormorant), serif", fontSize: '5rem', color: 'rgba(255,255,255,0.12)', lineHeight: 1, userSelect: 'none' }}>
            The<br />Atelier
          </div>
          <div style={{ position: 'absolute', bottom: '10%', right: '8%', width: '180px', height: '180px', background: 'rgba(249,196,220,0.3)', clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }} />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '24px 8%', borderTop: '1px solid #eee' }}>
        <Link href="/" style={{ color: '#C8006A', fontWeight: 700, fontStyle: 'italic', textDecoration: 'underline', fontSize: '0.95rem' }}>← return</Link>
        <Link href="/" style={{ color: '#C8006A', fontFamily: 'serif', fontSize: '1.2rem', fontWeight: 700, textDecoration: 'underline' }}>Go back to the main page</Link>
      </div>
    </main>
  );
}