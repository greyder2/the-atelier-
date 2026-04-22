"use client";

import React from 'react';
import Link from 'next/link';

export default function InsightsPage() {
  return (
    <main style={{ backgroundColor: '#FAF7F0', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ height: '12px', backgroundColor: '#C8006A', width: '100%' }} />

      <div style={{ padding: '60px 8%', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
          <div>
            <h1 style={{ fontFamily: "'Pacifico', cursive", fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.05, marginBottom: '40px', color: '#111' }}>
              Insights/ Journal
            </h1>
            <p style={{ fontSize: '1.1rem', marginBottom: '24px', color: '#333', fontWeight: 500 }}>Atelier Insights</p>
            <a href="https://medium.com/@theenglishatelier" target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-block', background: '#F472B6', color: '#111', borderRadius: '50px', padding: '14px 0', width: '340px', maxWidth: '100%', textAlign: 'center', textDecoration: 'underline', fontWeight: 700, fontSize: '1rem', marginBottom: '40px', letterSpacing: '0.05em', boxShadow: '0 4px 0 #C8006A' }}>
              ACCESS HERE
            </a>
            <div style={{ fontSize: '1rem', lineHeight: 1.85, color: '#333' }}>
              <p style={{ marginBottom: '16px' }}>A journal exploring language, culture, and global ideas.</p>
              <p style={{ marginBottom: '8px' }}>Articles cover topics such as:</p>
              <p style={{ margin: '4px 0' }}>★ Language learning strategies</p>
              <p style={{ margin: '4px 0' }}>★ Global communication</p>
              <p style={{ margin: '4px 0' }}>★ Cultural intelligence</p>
              <p style={{ margin: '4px 0' }}>★ Women in history and leadership</p>
              <p style={{ margin: '4px 0 24px' }}>★ Professional development</p>
              <p>The Atelier Journal reflects our belief that language learning is inseparable from cultural curiosity.</p>
            </div>
          </div>

          <div>
            <div style={{ border: '5px solid #C8006A', borderRadius: '4px', overflow: 'hidden', maxWidth: '560px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ background: '#C8006A', padding: '7px 12px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ background: '#fff', color: '#C8006A', borderRadius: '3px', padding: '1px 7px', fontWeight: 900, fontSize: '0.8rem', lineHeight: 1.4 }}>✕</span>
                </div>
                <div style={{ flex: 1, background: '#A8DDD8', height: '34px' }} />
              </div>
              <div style={{ background: 'linear-gradient(135deg, #6b5a4e 0%, #8b7355 40%, #a89070 70%, #6b5a4e 100%)', minHeight: '440px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ textAlign: 'center', color: 'rgba(250,247,240,0.6)', padding: '40px' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '16px' }}>📚</div>
                  <p style={{ fontFamily: "'Pacifico', cursive", fontSize: '1.4rem', marginBottom: '8px' }}>Atelier Journal</p>
                  <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.7 }}>Language · Culture · Ideas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 8% 40px' }}>
        <Link href="/" style={{ color: '#C8006A', fontFamily: "'Pacifico', cursive", fontSize: '1.1rem', textDecoration: 'underline', fontWeight: 600 }}>
          Go back to the main page
        </Link>
      </div>
    </main>
  );
}