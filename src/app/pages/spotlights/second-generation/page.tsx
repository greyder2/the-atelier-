import React from 'react';
import Link from 'next/link';
import { secondGeneration } from '@/data/spotlights';

export default function SecondGenerationPage() {
  return (
    <main style={{ backgroundColor: '#FAF7F0', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ height: '12px', backgroundColor: '#C8006A', width: '100%' }} />

      <div style={{ padding: '52px 8%', maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: 'clamp(1.8rem, 4vw, 3.5rem)', color: '#111', marginBottom: '52px', lineHeight: 1.1 }}>
          Atelier Spotlights — Second Generation
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>
          <div style={{ border: '4px solid #F4A7C3', borderRadius: '14px', overflow: 'hidden', backgroundColor: '#fff' }}>
            <div style={{ background: '#F4A7C3', padding: '7px 14px', display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span style={{ color: '#C8006A', fontWeight: 900, fontSize: '0.8rem' }}>X</span>
              <span style={{ color: '#888', fontSize: '0.8rem' }}>□</span>
              <span style={{ color: '#888', fontSize: '0.8rem' }}>—</span>
              <span style={{ marginLeft: '8px', fontSize: '0.6rem', color: '#999', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                new_spring_collection_Atelier Spotlights_by The Atelier
              </span>
            </div>
            <div style={{ background: '#D9F060', minHeight: '340px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', gap: '16px' }}>
              <div style={{ fontSize: '4rem', lineHeight: 1 }}>✦</div>
              <p style={{ fontFamily: "var(--font-cormorant), serif", fontSize: '2rem', color: '#C8006A', textAlign: 'center', lineHeight: 1.2 }}>
                Atelier<br />Spotlights<br />2nd Gen
              </p>
              <p style={{ fontSize: '0.7rem', color: '#666', fontWeight: 600, letterSpacing: '0.1em' }}>spring 2026</p>
            </div>
            <div style={{ background: '#F4A7C3', padding: '8px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.9rem', color: '#555' }}>&lt;</span>
              <div style={{ background: '#F9C4DC', borderRadius: '20px', padding: '4px 0', width: '55%' }} />
              <span style={{ fontSize: '0.9rem', color: '#555' }}>&gt;</span>
            </div>
          </div>

          <div>
            <p style={{ fontFamily: "var(--font-cormorant), serif", fontSize: '1.5rem', color: '#C8006A', marginBottom: '20px' }}>Meet the members</p>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', flexWrap: 'wrap' }}>
              {secondGeneration.map(profile => (
                <Link key={profile.slug} href={`/pages/spotlight/${profile.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
                  <div style={{ border: '3px solid #F4A7C3', borderRadius: '8px', overflow: 'hidden', width: '72px', height: '72px' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={profile.imagePath} alt={profile.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                </Link>
              ))}
            </div>

            <p style={{ fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.05em', marginBottom: '16px', textTransform: 'uppercase' }}>ATELIER SPOTLIGHTS - TÜRKIYE EDITION</p>

            {[
              'ATELIER SPOTLIGHTS IS A SERIES THAT HIGHLIGHTS WOMEN FROM THE ATELIER COMMUNITY WHO ARE DEVELOPING THEIR VOICE THROUGH LANGUAGE, CULTURE, AND GLOBAL CURIOSITY. EACH MEMBER BRINGS A UNIQUE BACKGROUND—FROM SCIENCE AND HEALTHCARE TO INTERNATIONAL RELATIONS AND CREATIVE INDUSTRIES—REFLECTING THE DIVERSE AND INTERNATIONAL SPIRIT OF THE ATELIER.',
              'WHAT MAKES THIS GROUP PARTICULARLY SPECIAL IS THAT MANY OF THESE WOMEN FIRST CONNECTED WHILE LIVING IN TÜRKIYE—A PLACE WHERE CULTURES, LANGUAGES, AND PERSPECTIVES CONSTANTLY MEET.',
              'FROM THAT SHARED ENVIRONMENT, A SMALL BUT REMARKABLE INTERNATIONAL COMMUNITY BEGAN TO FORM. PEOPLE FROM DIFFERENT COUNTRIES, PROFESSIONS, AND ACADEMIC PATHS FOUND THEMSELVES LEARNING TOGETHER, EXCHANGING IDEAS, AND SUPPORTING EACH OTHER\'S GROWTH THROUGH LANGUAGE.',
              'TODAY, THE ATELIER SPOTLIGHTS COMMUNITY CONTINUES TO GROW BEYOND BORDERS. SOME MEMBERS ARE PURSUING INTERNATIONAL CAREERS, OTHERS ARE STUDYING ABROAD, WHILE OTHERS ARE BUILDING THEIR PROFESSIONAL PATHS IN FIELDS SUCH AS GOVERNANCE & SUSTAINABILITY, HEALTHCARE, SCIENCE, AND INTERNATIONAL AFFAIRS.',
              'WHAT CONNECTS THEM ALL IS A SHARED MINDSET: CURIOSITY ABOUT THE WORLD, RESPECT FOR DIFFERENT CULTURES, AND THE BELIEF THAT LANGUAGE CAN OPEN DOORS TO NEW OPPORTUNITIES, FRIENDSHIPS, AND IDEAS.',
            ].map((text, i) => (
              <p key={i} style={{ fontSize: '0.72rem', lineHeight: 1.8, color: '#333', textAlign: 'justify', marginBottom: '10px', fontWeight: 600, textTransform: 'uppercase' }}>{text}</p>
            ))}

            <Link href="/pages/spotlights/first-generation" style={{ display: 'inline-block', marginTop: '24px', background: '#C8006A', color: '#fff', borderRadius: '50px', padding: '13px 36px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 700, boxShadow: '0 4px 0 #8a0047' }}>
              Discover more here
            </Link>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '40px 8%' }}>
        <Link href="/pages/spotlights" style={{ color: '#C8006A', fontWeight: 700, fontStyle: 'italic', textDecoration: 'underline', fontSize: '0.95rem' }}>← return</Link>
        <Link href="/" style={{ color: '#C8006A', fontFamily: 'serif', fontSize: '1.2rem', fontWeight: 700, textDecoration: 'underline' }}>Go back to the main page</Link>
      </div>
    </main>
  );
}