import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { spotlights } from '@/data/spotlights';
import { client } from '../../../../../sanity/lib/client';
import { spotlightBySlugQuery } from '../../../../../sanity/lib/queries';
import { groq } from 'next-sanity';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const sanityData = await client.fetch(spotlightBySlugQuery, { slug });
  const localData = require('@/data/spotlights').spotlights;
  const hardcoded = localData.find((s: any) => s.slug === slug);
  const name = sanityData?.name ?? hardcoded?.name ?? slug;
  return {
    title: `${name} — Atelier Spotlight`,
    description: `Read ${name}'s story — an Atelier Spotlights graduate. Discover their language learning and professional growth journey.`,
  };
}

export async function generateStaticParams() {
  const slugs = await client.fetch(groq`*[_type == "spotlight"] { "slug": slug.current }`);
  if (slugs.length > 0) return slugs;
  const localData = require('@/data/spotlights').spotlights;
  return localData.map((s: any) => ({ slug: s.slug }));
}

export default async function SpotlightProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let sanityData: any = null;
  try {
    sanityData = await client.fetch(spotlightBySlugQuery, { slug });
  } catch {
    // Sanity unavailable
  }

  const localData = require('@/data/spotlights').spotlights;
  const hardcoded = localData.find((s: any) => s.slug === slug);
  if (!sanityData && !hardcoded) notFound();

  const name = sanityData?.name ?? hardcoded?.name ?? '';
  const title = sanityData?.heading ?? hardcoded?.title ?? '';
  const imagePath = sanityData?.imageUrl ?? hardcoded?.imagePath ?? `/pages/${slug}.webp`;
  const returnPath = hardcoded?.returnPath ?? '/';

  const bioParagraphs: string[] = sanityData?.body
    ? sanityData.body.split('\n\n').filter(Boolean)
    : hardcoded?.bio ?? [];

  const bulletPoints = hardcoded?.bulletPoints ?? [];
  const closingQuote = sanityData?.shortQuote ?? hardcoded?.closingQuote ?? '';
  
  // Levels
  const levelBefore = sanityData?.levelBefore || hardcoded?.levelBefore;
  const levelAfter = sanityData?.levelAfter || hardcoded?.levelAfter;

  return (
    <main style={{ backgroundColor: '#9D174D', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif", paddingBottom: '60px' }}>
      <div style={{ height: '12px', backgroundColor: '#A0004F', width: '100%' }} />

      <div style={{ padding: '52px 8%', maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#111', marginBottom: '40px', lineHeight: 1.1 }}>
          {name}
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 420px) 1fr', gap: '52px', alignItems: 'start' }}>
          <div style={{ border: '4px solid #FDF2F8', borderRadius: '14px', overflow: 'hidden', backgroundColor: '#1a0010', flexShrink: 0 }}>
            <div style={{ background: '#FDF2F8', padding: '7px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#9D174D', fontWeight: 900, fontSize: '0.8rem' }}>X</span>
              <span style={{ color: '#888', fontSize: '0.8rem' }}>□</span>
              <span style={{ color: '#888', fontSize: '0.8rem' }}>—</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imagePath} alt={name} style={{ width: '100%', display: 'block', aspectRatio: '4/3', objectFit: 'cover', borderBottom: '4px solid #FDF2F8' }} />
            <div style={{ background: '#FDF2F8', padding: '8px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.9rem', color: '#555' }}>&lt;</span>
              <div style={{ background: '#F9C4DC', borderRadius: '20px', padding: '4px 0', width: '55%' }} />
              <span style={{ fontSize: '0.9rem', color: '#555' }}>&gt;</span>
            </div>
          </div>

          <div>
            <p style={{ fontStyle: 'italic', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.06em', marginBottom: '24px', color: '#fff', textTransform: 'uppercase' }}>
              {title}
            </p>
            {bioParagraphs.map((paragraph, i) => (
              <p key={i} style={{ fontSize: '0.75rem', lineHeight: 1.8, marginBottom: '14px', textAlign: 'justify', color: '#fff', textTransform: 'uppercase', fontWeight: 600 }}>
                {paragraph}
              </p>
            ))}
            {bulletPoints.length > 0 && (
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0' }}>
                {bulletPoints.map((point: string, i: number) => (
                  <li key={i} style={{ fontSize: '0.75rem', lineHeight: 1.8, color: '#fff', textTransform: 'uppercase', fontWeight: 600 }}>
                    {point}
                  </li>
                ))}
              </ul>
            )}
            {closingQuote && (
              <p style={{ fontSize: '0.75rem', lineHeight: 1.8, marginTop: '16px', textAlign: 'justify', color: '#fff', textTransform: 'uppercase', fontWeight: 600, fontStyle: 'italic' }}>
                {closingQuote}
              </p>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '24px 8%', marginTop: '20px' }}>
        <Link href={returnPath} style={{ color: '#111', fontWeight: 700, fontStyle: 'italic', textDecoration: 'underline', fontSize: '0.95rem' }}>← return</Link>
        <Link href="/" style={{ color: '#111', fontFamily: 'serif', fontSize: '1.2rem', fontWeight: 700, textDecoration: 'underline' }}>Go back to the main page</Link>
      </div>
    </main>
  );
}