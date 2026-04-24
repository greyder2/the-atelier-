'use client';

import { useState, useEffect, useRef } from 'react';

export default function FloatingEmailPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [closing, setClosing] = useState(false);
  const triggered = useRef(false);

  const trigger = () => {
    if (triggered.current) return;
    triggered.current = true;
    setVisible(true);
  };

  useEffect(() => {
    if (sessionStorage.getItem('popup-dismissed')) return;
    const timer = setTimeout(trigger, 30_000);
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10) trigger();
    };
    document.addEventListener('mouseleave', onMouseLeave);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  const dismiss = () => {
    setClosing(true);
    sessionStorage.setItem('popup-dismissed', '1');
    setTimeout(() => setVisible(false), 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
    } catch {
      // silently fail
    }
    setSubmitted(true);
    setTimeout(dismiss, 2500);
  };

  if (!visible) return null;

  return (
    <>
      <div
        onClick={dismiss}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.45)',
          zIndex: 9998,
          opacity: closing ? 0 : 1,
          transition: 'opacity 0.3s ease',
        }}
      />
      <div
        style={{
          position: 'fixed',
          bottom: '50%', left: '50%',
          transform: `translate(-50%, 50%) scale(${closing ? 0.9 : 1})`,
          opacity: closing ? 0 : 1,
          transition: 'transform 0.3s ease, opacity 0.3s ease',
          zIndex: 9999,
          width: 'min(90vw, 480px)',
          background: '#FAF7F0',
          border: '4px solid #C8006A',
          borderRadius: '24px',
          padding: '40px 36px',
          boxShadow: '12px 12px 0px rgba(200,0,106,0.25)',
        }}
      >
        <button
          onClick={dismiss}
          aria-label="Close"
          style={{
            position: 'absolute', top: 14, right: 18,
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '1.4rem', color: '#C8006A', fontWeight: 900, lineHeight: 1,
          }}
        >x</button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>✨</div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', color: '#C8006A', fontWeight: 700 }}>
              Welcome to the Atelier!
            </p>
            <p style={{ fontSize: '0.9rem', opacity: 0.7, marginTop: 8, color: '#111' }}>
              We will be in touch soon.
            </p>
          </div>
        ) : (
          <>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C8006A', fontWeight: 900, marginBottom: 10 }}>
              EXCLUSIVE OFFER
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.6rem, 4vw, 2rem)', lineHeight: 1.15, marginBottom: 10, color: '#111' }}>
              Get our free Language & Career Starter Guide
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#555', marginBottom: 24, lineHeight: 1.65 }}>
              Join ambitious professionals from various countries around the world. No spam — only curated insights.
            </p>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  width: '100%', padding: '12px 20px',
                  borderRadius: '50px', border: '2px solid #ddd',
                  fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem',
                  outline: 'none', background: '#fff', color: '#111',
                }}
                onFocus={e => (e.target.style.borderColor = '#C8006A')}
                onBlur={e => (e.target.style.borderColor = '#ddd')}
              />
              <button
                type="submit"
                style={{
                  width: '100%', padding: '14px 20px',
                  borderRadius: '50px', border: 'none', cursor: 'pointer',
                  background: '#C8006A', color: '#fff',
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 900,
                  fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                }}
              >
                GET FREE GUIDE
              </button>
            </form>
            <p style={{ fontSize: '0.7rem', color: '#999', textAlign: 'center', marginTop: 14, letterSpacing: '0.08em' }}>
              Unsubscribe anytime. No spam, ever.
            </p>
          </>
        )}
      </div>
    </>
  );
}