'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after scrolling past the hero (roughly 80vh)
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Link
      href="/pages/book-session"
      aria-label="Book a free session"
      style={{
        position: 'fixed',
        bottom: 28,
        right: 24,
        zIndex: 9000,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        background: 'var(--hot-pink)',
        color: '#fff',
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 900,
        fontSize: '0.8rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        padding: '14px 22px',
        borderRadius: 'var(--radius-btn)',
        textDecoration: 'none',
        boxShadow: '0 8px 24px rgba(200,0,106,0.45)',
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(80px) scale(0.9)',
        opacity: visible ? 1 : 0,
        transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.35s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
      className="pulse"
    >
      <span style={{ fontSize: '1rem' }}>✦</span>
      Book Free Session
    </Link>
  );
}