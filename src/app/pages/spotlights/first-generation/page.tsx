import React from 'react';
import Link from 'next/link';
import { firstGeneration } from '@/data/spotlights';

export default function FirstGenerationPage() {
  const featured = firstGeneration.find(s => s.slug === 'sofia') ?? firstGeneration[0];
  const rest = firstGeneration.filter(s => s.slug !== featured.slug);

  return (
    <main style={{ backgroundColor: '#FAF7F0', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ height: '12px', backgroundColor: '#C8006A', width: '100%' }} />

      <div style={{ padding: '52px 8%', maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: "'Pacifico', cursive", fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', color: '#111', marginBottom: '52px', lineHeight: 1.1 }}>
          Atelier Spotlights — First Generation
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 420px) 1fr', gap: '52px', alignItems: 'start', marginBottom: '80px' }}>
          <div style={{ border: '4px solid #F4A7C3', borderRadius: '14px', overflow: 'hidden', backgroundColor: '#1a0010' }}>
            <div style={{ background: '#F4A7C3', padding: '7px 14px', display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span style={{ color: '#C8006A', fontWeight: 900, fontSize: '0.8rem' }}>X</span>
              <span style={{ color: '#888', fontSize: '0.8rem' }}>□</span>
              <span style={{ color: '#888', fontSize: '0.8rem' }}>—</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={featured.imagePath} alt={featured.name} style={{ width: '100%', display: 'block', aspectRatio: '4/3', objectFit: 'cover', borderBottom: '4px solid #F4A7C3' }} />
            <div style={{ background: '#F4A7C3', padding: '8px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.9rem', color: '#555' }}>&lt;</span>
              <div style={{ background: '#F9C4DC', borderRadius: '20px', padding: '4px 0', width: '55%' }} />
              <span style={{ fontSize: '0.9rem', color: '#555' }}>&gt;</span>
            </div>
          </div>

          <div>
            <h2 style={{ fontFamily: "'Pacifico', cursive", fontSize: '2.2rem', color: '#111', marginBottom: '6px' }}>{featured.name}</h2>
            <p style={{ fontStyle: 'italic', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.06em', marginBottom: '20px', color: '#333', textTransform: 'uppercase' }}>{featured.title}</p>
            {featured.bio.map((p, i) => (
              <p key={i} style={{ fontSize: '0.74rem', lineHeight: 1.8, marginBottom: '12px', textAlign: 'justify', color: '#111', textTransform: 'uppercase', fontWeight: 600 }}>{p}</p>
            ))}
            {featured.bulletPoints?.map((b, i) => (
              <p key={i} style={{ fontSize: '0.74rem', lineHeight: 1.8, color: '#C8006A', textTransform: 'uppercase', fontWeight: 700 }}>{b}</p>
            ))}
            {featured.closingQuote && (
              <p style={{ fontSize: '0.74rem', lineHeight: 1.8, marginTop: '14px', textAlign: 'justify', color: '#333', textTransform: 'uppercase', fontWeight: 600, fontStyle: 'italic' }}>{featured.closingQuote}</p>
            )}
            <Link href={`/pages/spotlight/${featured.slug}`} style={{ display: 'inline-block', marginTop: '24px', color: '#C8006A', fontWeight: 700, textDecoration: 'underline', fontSize: '0.9rem' }}>
              View full profile →
            </Link>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
          <div style={{ height: '3px', flex: 1, background: '#C8006A' }} />
          <span style={{ fontFamily: "'Pacifico', cursive", fontSize: '1.6rem', color: '#C8006A', whiteSpace: 'nowrap' }}>More First Generation</span>
          <div style={{ height: '3px', flex: 1, background: '#C8006A' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '24px' }}>
          {rest.map(profile => (
            <Link key={profile.slug} href={`/pages/spotlight/${profile.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
              <div style={{ border: '4px solid #F4A7C3', borderRadius: '14px', overflow: 'hidden', backgroundColor: '#1a0010', cursor: 'pointer' }}>
                <div style={{ background: '#F4A7C3', padding: '6px 12px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ color: '#C8006A', fontWeight: 900, fontSize: '0.75rem' }}>X</span>
                  <span style={{ color: '#888', fontSize: '0.75rem' }}>□</span>
                  <span style={{ color: '#888', fontSize: '0.75rem' }}>—</span>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={profile.imagePath} alt={profile.name} style={{ width: '100%', display: 'block', aspectRatio: '4/3', objectFit: 'cover', borderBottom: '3px solid #F4A7C3' }} />
                <div style={{ background: '#F4A7C3', padding: '7px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: '#555' }}>&lt;</span>
                  <span style={{ fontFamily: "'Pacifico', cursive", fontSize: '0.75rem', color: '#C8006A' }}>{profile.name}</span>
                  <span style={{ fontSize: '0.8rem', color: '#555' }}>&gt;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '40px 8%' }}>
        <Link href="/pages/spotlights" style={{ color: '#C8006A', fontWeight: 700, fontStyle: 'italic', textDecoration: 'underline', fontSize: '0.95rem' }}>← return</Link>
        <Link href="/" style={{ color: '#C8006A', fontFamily: 'serif', fontSize: '1.2rem', fontWeight: 700, textDecoration: 'underline' }}>Go back to the main page</Link>
      </div>
    </main>
  );
}