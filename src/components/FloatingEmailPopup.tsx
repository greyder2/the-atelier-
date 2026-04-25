'use client';

import { useState, useEffect, useRef } from 'react';

export default function FloatingEmailPopup() {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    level: 'A1-A2',
    goal: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [closing, setClosing] = useState(false);
  const [loading, setLoading] = useState(false);
  const triggered = useRef(false);

  const trigger = () => {
    if (triggered.current) return;
    triggered.current = true;
    setVisible(true);
  };

  useEffect(() => {
    // Temporarily disabled for verification
    // if (sessionStorage.getItem('popup-dismissed')) return;

    // Remove the timer to make it strictly exit-intent as per plan
    // const timer = setTimeout(trigger, 8000); 

    const onMouseLeave = (e: MouseEvent) => {
      // Trigger if mouse leaves through the top (standard exit intent)
      if (e.clientY <= 10) trigger();
    };

    document.addEventListener('mouseleave', onMouseLeave);
    return () => {
      // clearTimeout(timer);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  const dismiss = () => {
    setClosing(true);
    sessionStorage.setItem('popup-dismissed', '1');
    setTimeout(() => {
      setVisible(false);
      setClosing(false);
    }, 400);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.name) return;
    
    setLoading(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData,
          type: 'consultation-application'
        }),
      });
      setSubmitted(true);
      setTimeout(dismiss, 3000);
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={dismiss}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 10998,
          opacity: closing ? 0 : 1,
          transition: 'opacity 0.4s ease',
        }}
      />
      
      {/* Modal */}
      <div
        style={{
          position: 'fixed',
          top: '50%', left: '50%',
          transform: `translate(-50%, -50%) scale(${closing ? 0.9 : 1})`,
          opacity: closing ? 0 : 1,
          transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
          zIndex: 10999,
          width: 'min(90vw, 500px)',
          background: '#FAF7F0',
          border: '4px solid #9D174D',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '16px 16px 0px rgba(157,23,77,0.2)',
        }}
      >
        <button
          onClick={dismiss}
          aria-label="Close"
          style={{
            position: 'absolute', top: 18, right: 22,
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '1.6rem', color: '#9D174D', fontWeight: 900, lineHeight: 1,
          }}
        >×</button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>🕊️</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', color: '#9D174D', fontWeight: 700, marginBottom: 12 }}>
              Application Received
            </h2>
            <p style={{ fontSize: '1rem', color: '#111', opacity: 0.8, lineHeight: 1.6 }}>
              Thank you for your interest in The Atelier. Our team will review your profile and contact you shortly.
            </p>
          </div>
        ) : (
          <>
            <div style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9D174D', fontWeight: 900, marginBottom: 12 }}>
              BY INVITATION ONLY
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', lineHeight: 1.1, marginBottom: 14, color: '#111' }}>
              Apply for a Complimentary Consultation
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#555', marginBottom: 28, lineHeight: 1.6 }}>
              Our mentorship is tailored for high-potential professionals. Submit your details to request an assessment.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  style={{ padding: '14px 20px', borderRadius: '12px', border: '2px solid #e8e4dc', background: '#fff', fontSize: '0.9rem' }}
                />
                <select
                  value={formData.level}
                  onChange={e => setFormData({...formData, level: e.target.value})}
                  style={{ padding: '14px 20px', borderRadius: '12px', border: '2px solid #e8e4dc', background: '#fff', fontSize: '0.9rem' }}
                >
                  <option value="A1-A2">Beginner (A1-A2)</option>
                  <option value="B1-B2">Intermediate (B1-B2)</option>
                  <option value="C1-C2">Advanced (C1-C2)</option>
                  <option value="Native">Native/Fluent</option>
                </select>
              </div>

              <input
                type="email"
                placeholder="Work Email Address"
                required
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                style={{ padding: '14px 20px', borderRadius: '12px', border: '2px solid #e8e4dc', background: '#fff', fontSize: '0.9rem' }}
              />

              <textarea
                placeholder="What is your primary professional goal?"
                required
                rows={3}
                value={formData.goal}
                onChange={e => setFormData({...formData, goal: e.target.value})}
                style={{ padding: '14px 20px', borderRadius: '12px', border: '2px solid #e8e4dc', background: '#fff', fontSize: '0.9rem', resize: 'none' }}
              />

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%', padding: '16px',
                  borderRadius: '50px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                  background: '#9D174D', color: '#fff',
                  fontWeight: 900, fontSize: '0.9rem', letterSpacing: '0.15em', 
                  textTransform: 'uppercase', transition: 'all 0.3s ease',
                  opacity: loading ? 0.7 : 1,
                  boxShadow: '0 4px 12px rgba(157,23,77,0.3)'
                }}
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
            
            <p style={{ fontSize: '0.75rem', color: '#888', textAlign: 'center', marginTop: 20, fontStyle: 'italic' }}>
              We respect your privacy and professional time.
            </p>
          </>
        )}
      </div>
    </>
  );
}