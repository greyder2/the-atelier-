"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState, useEffect, useRef } from 'react';
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

const sanityClient = createClient({
  projectId: "1pu795c0",
  dataset: "production",
  apiVersion: "2024-03-12",
  useCdn: false,
});

const builder = imageUrlBuilder(sanityClient);
function urlFor(source: any) { return builder.image(source); }

const card = (border: string, shadow: string, bg = 'white'): React.CSSProperties => ({
  backgroundColor: bg, border: `4px solid ${border}`, borderRadius: '24px',
  padding: '2rem', boxShadow: `8px 8px 0px ${shadow}`
});
const badge = (bg: string, color = '#111'): React.CSSProperties => ({
  backgroundColor: bg, padding: '4px 12px', borderRadius: '50px',
  fontSize: '0.75rem', fontWeight: 'bold', border: '1px solid #111', color,
});

// ── SESSION PROGRESS BAR ──────────────────────────────────────────────────────

function SessionProgressCard({ sanityData }: { sanityData: any }) {
  const total = sanityData?.totalSessions ?? 4;
  const remaining = sanityData?.sessionCredits ?? 0;
  const used = Math.max(0, total - remaining);
  const pct = Math.min(100, Math.round((used / total) * 100));
  const isOut = remaining === 0;

  // colour shifts as credits run out
  const barColor = remaining === 0 ? '#9D174D' : remaining === 1 ? '#FFB347' : '#98FFD9';

  return (
    <div style={card('#D9F060', '#111')}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
        <div>
          <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#888', fontWeight: 'bold', marginBottom: '4px' }}>
            Sessions This Cycle
          </p>
          <h3 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: '1.4rem', color: '#111' }}>
            {isOut ? 'All sessions used!' : `${remaining} session${remaining !== 1 ? 's' : ''} left`}
          </h3>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '2.2rem', fontWeight: '900', color: isOut ? '#9D174D' : '#111', lineHeight: 1 }}>
            {used}
          </span>
          <span style={{ fontSize: '1rem', color: '#888', fontWeight: 'bold' }}>/{total}</span>
          <p style={{ fontSize: '0.65rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>used</p>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ backgroundColor: '#eee', borderRadius: '50px', height: '14px', border: '2px solid #111', overflow: 'hidden', marginBottom: '1rem' }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          backgroundColor: barColor,
          borderRadius: '50px',
          transition: 'width 0.6s ease, background-color 0.4s ease',
        }} />
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{
            width: '28px', height: '28px', borderRadius: '50%',
            border: '2px solid #111',
            backgroundColor: i < used ? barColor : '#f5f5f5',
            transition: 'background-color 0.3s ease',
            flexShrink: 0,
          }} />
        ))}
      </div>

      {isOut ? (
        <div style={{ backgroundColor: '#FFD1DC', border: '2px solid #9D174D', borderRadius: '12px', padding: '0.75rem 1rem', fontSize: '0.85rem', color: '#9D174D', fontWeight: 'bold' }}>
          You've used all your sessions for this cycle. Reach out to book more! →{' '}
          <a href="mailto:theenglishateliere@gmail.com" style={{ color: '#9D174D', textDecoration: 'underline' }}>theenglishateliere@gmail.com</a>
        </div>
      ) : (
        <p style={{ fontSize: '0.8rem', color: '#666', fontStyle: 'italic' }}>
          Sessions renew each cycle. Book yours above before they run out!
        </p>
      )}
    </div>
  );
}

// ── REFERRAL CARD ─────────────────────────────────────────────────────────────

function ReferralCard({ sanityData }: { sanityData: any }) {
  const [copied, setCopied] = useState(false);
  const code = sanityData?.referralCode;
  const referralUrl = code ? `${typeof window !== 'undefined' ? window.location.origin : 'https://theenglishatelier.vercel.app'}/join?ref=${code}` : null;
  const pendingCredits = sanityData?.referralCredits ?? 0;

  const handleCopy = () => {
    if (!referralUrl) return;
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!code) return null;

  return (
    <div style={card('#111', '#D9F060')}>
      <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#888', fontWeight: 'bold', marginBottom: '4px' }}>
        Refer a Friend
      </p>
      <h3 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: '1.4rem', marginBottom: '0.5rem' }}>
        Earn a free session
      </h3>
      <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: '1.25rem', lineHeight: 1.5 }}>
        Share your link — when a friend joins The Atelier, you get <strong>1 free session</strong> on us.
      </p>

      {/* Link box */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '1rem' }}>
        <div style={{
          flex: 1, backgroundColor: '#f5f5f5', border: '2px solid #111',
          borderRadius: '12px', padding: '10px 14px',
          fontSize: '0.8rem', fontFamily: 'monospace', color: '#333',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {referralUrl}
        </div>
        <button onClick={handleCopy} style={{
          padding: '10px 18px', backgroundColor: copied ? '#98FFD9' : '#D9F060',
          border: '2px solid #111', borderRadius: '12px',
          fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer',
          transition: 'all 0.2s', whiteSpace: 'nowrap', flexShrink: 0,
        }}>
          {copied ? '✓ Copied!' : 'Copy link'}
        </button>
      </div>

      {pendingCredits > 0 && (
        <div style={{ backgroundColor: '#D9F060', border: '2px solid #111', borderRadius: '12px', padding: '0.75rem 1rem', fontSize: '0.85rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🎉 You have <strong>{pendingCredits} referral credit{pendingCredits !== 1 ? 's' : ''}</strong> pending — we'll add them to your sessions shortly!
        </div>
      )}
    </div>
  );
}

// ── CORPORATE DASHBOARD ───────────────────────────────────────────────────────

function CorporateDashboard({ sanityData, user }: { sanityData: any; user: any }) {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const company = sanityData?.company;

  useEffect(() => {
    const companyId = company?._id || company?._ref;
    if (!companyId) { setLoadingEmployees(false); return; }
    sanityClient
      .fetch(
        `*[_type == "client" && references($companyId)] | order(name asc) {
          _id, name, email, program, level, status, image,
          assignedProfessor->{ name, specialty }
        }`,
        { companyId }
      )
      .then((data) => setEmployees(data || []))
      .finally(() => setLoadingEmployees(false));
  }, [company]);

  const filtered = employees.filter((e) => {
    const matchSearch = [e.name, e.email, e.program].some(f => f?.toLowerCase().includes(search.toLowerCase()));
    return matchSearch && (statusFilter === 'all' || e.status === statusFilter);
  });

  const stats = {
    total: employees.length,
    active: employees.filter(e => e.status === 'active').length,
    completed: employees.filter(e => e.status === 'completed').length,
    paused: employees.filter(e => e.status === 'paused').length,
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAF7F0', color: '#111', paddingTop: '2.5rem' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '12px', backgroundColor: '#9D174D', zIndex: 1000 }} />
      <div style={{ maxWidth: '90rem', margin: '0 auto', padding: '0 2rem' }}>

        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', paddingBottom: '1.5rem', borderBottom: '4px solid #9D174D' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {company?.logo
              ? <img src={urlFor(company.logo).height(56).url()} alt={company.name} style={{ height: '56px', objectFit: 'contain' }} />
              : <div style={{ height: '56px', minWidth: '120px', backgroundColor: '#111', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '0.85rem', padding: '0 1rem' }}>{company?.name || 'Your Company'}</div>
            }
            <div style={{ width: '2px', height: '48px', backgroundColor: '#9D174D', borderRadius: '2px' }} />
            <span style={{ fontFamily: "var(--font-cormorant), serif", fontSize: '1.8rem', color: '#9D174D' }}>The Atelier</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link href="/" style={{ fontWeight: 'bold', textDecoration: 'underline', textTransform: 'uppercase', fontSize: '0.875rem', color: '#111' }}>← Main Site</Link>
            <div style={{ backgroundColor: '#FFD1DC', padding: '4px', borderRadius: '50%', border: '2px solid #9D174D' }}><UserButton /></div>
          </div>
        </header>

        <div style={{ background: 'linear-gradient(135deg, #9D174D 0%, #9B0050 100%)', ...card('#9D174D', '#111'), color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.75, marginBottom: '4px' }}>Corporate Training Dashboard</p>
            <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: '2rem', marginBottom: '4px' }}>{company?.name || 'Your Organization'}</h2>
            <p style={{ fontSize: '0.9rem', opacity: 0.85 }}>{company?.industry || 'Corporate Partner'} · Welcome, {sanityData?.name || user.fullName}</p>
          </div>
          <span style={{ ...badge('#D9F060'), fontSize: '0.8rem', padding: '6px 16px', border: '2px solid #D9F060' }}>Corporate Account</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Total Enrolled', value: stats.total, bg: '#D9F060' },
            { label: 'Active', value: stats.active, bg: '#98FFD9' },
            { label: 'Completed', value: stats.completed, bg: '#FFD1DC' },
            { label: 'Paused', value: stats.paused, bg: '#FFE999' },
          ].map(s => (
            <div key={s.label} style={{ backgroundColor: s.bg, border: '3px solid #111', borderRadius: '20px', padding: '1.5rem', textAlign: 'center', boxShadow: '4px 4px 0px #111' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '900', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '6px', fontWeight: 'bold' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <input type="text" placeholder="Search employees..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: '200px', padding: '10px 16px', border: '3px solid #111', borderRadius: '50px', fontSize: '0.9rem', outline: 'none', backgroundColor: 'white', fontFamily: 'inherit' }} />
          {(['all', 'active', 'paused', 'completed'] as const).map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} style={{ padding: '8px 20px', borderRadius: '50px', border: '2px solid #111', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'capitalize', backgroundColor: statusFilter === s ? '#9D174D' : 'white', color: statusFilter === s ? 'white' : '#111' }}>
              {s}
            </button>
          ))}
        </div>

        <div style={card('#111', '#9D174D')}>
          <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: '1.8rem', marginBottom: '1.5rem', color: '#9D174D' }}>Team Progress</h2>
          {loadingEmployees ? (
            <p style={{ textAlign: 'center', padding: '3rem', opacity: 0.5, fontStyle: 'italic' }}>Loading team data...</p>
          ) : filtered.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '3rem', opacity: 0.5, fontStyle: 'italic' }}>No employees found.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #111', fontSize: '0.7rem', textTransform: 'uppercase', color: '#888', letterSpacing: '1px' }}>
                  {['Employee', 'Program', 'Level', 'Professor', 'Status'].map(h => <th key={h} style={{ padding: '0.75rem 0.5rem' }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {filtered.map(emp => (
                  <tr key={emp._id} style={{ borderBottom: '1px solid #eee', fontSize: '0.9rem' }}>
                    <td style={{ padding: '1rem 0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {emp.image
                          ? <img src={urlFor(emp.image).width(40).height(40).fit('crop').url()} alt={emp.name} style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid #111', flexShrink: 0 }} />
                          : <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#D9F060', border: '2px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.85rem', flexShrink: 0 }}>{emp.name?.[0] ?? '?'}</div>
                        }
                        <div>
                          <div style={{ fontWeight: 'bold' }}>{emp.name}</div>
                          <div style={{ fontSize: '0.75rem', color: '#888' }}>{emp.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '1rem 0.5rem', color: '#555' }}>{emp.program || '—'}</td>
                    <td style={{ padding: '1rem 0.5rem' }}>{emp.level ? <span style={badge('#D9F060')}>{emp.level}</span> : <span style={{ color: '#bbb' }}>—</span>}</td>
                    <td style={{ padding: '1rem 0.5rem', color: '#555' }}>{emp.assignedProfessor?.name || '—'}</td>
                    <td style={{ padding: '1rem 0.5rem' }}>
                      <span style={badge(emp.status === 'active' ? '#98FFD9' : emp.status === 'completed' ? '#FFD1DC' : '#FFE999')}>{emp.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <footer style={{ marginTop: '4rem', paddingBottom: '4rem', textAlign: 'center', color: '#888', fontSize: '0.8rem' }}>
          <p>© 2026 The Atelier · Corporate Training Division</p>
        </footer>
      </div>
    </div>
  );
}

// ── INDIVIDUAL DASHBOARD ──────────────────────────────────────────────────────

function IndividualDashboard({ sanityData, lessons, user }: { sanityData: any; lessons: any[]; user: any }) {
  const displayName = sanityData?.name || user.fullName || '';
  const currentProgram = sanityData?.program || 'Unassigned Program';
  const currentLevel = sanityData?.level || 'Pending Evaluation';
  const email = user.primaryEmailAddress?.emailAddress || '';
  const trackingEnabled = sanityData?.sessionTrackingEnabled === true;
  const creditsOut = trackingEnabled && (sanityData?.sessionCredits ?? 0) === 0;

  const calendlyUrl = `https://calendly.com/theenglishateliere/new-meeting?hide_gdpr_banner=1&primary_color=D4006A&name=${encodeURIComponent(displayName)}&email=${encodeURIComponent(email)}`;

  useEffect(() => {
    const initCalendly = () => {
      if ((window as any).Calendly) {
        (window as any).Calendly.initInlineWidget({
          url: calendlyUrl,
          parentElement: document.querySelector('.calendly-inline-widget'),
          prefill: {
            name: displayName,
            email: email,
          }
        });
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initCalendly, 500);
    return () => clearTimeout(timer);
  }, [calendlyUrl, displayName, email, creditsOut]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAF7F0', color: '#111', paddingTop: '2.5rem' }}>
      <div style={{ maxWidth: '85rem', margin: '0 auto', padding: '0 1.5rem' }}>

        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', paddingBottom: '1rem', borderBottom: '4px solid #9D174D' }}>
          <div>
            <h1 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: '2.5rem', color: '#9D174D' }}>Client Portal</h1>
            <p style={{ fontStyle: 'italic', color: '#666', marginTop: '0.5rem' }}>Welcome back, {displayName}!</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link href="/dashboard/me" style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.8rem', backgroundColor: '#CCFF00', padding: '8px 16px', borderRadius: '50px', border: '2px solid #111', textDecoration: 'none', color: '#111' }}>My Profile</Link>
            <Link href="/" style={{ fontWeight: 'bold', textDecoration: 'underline', textTransform: 'uppercase', fontSize: '0.875rem', color: '#111' }}>← Main Site</Link>
            <div style={{ backgroundColor: '#FFD1DC', padding: '4px', borderRadius: '50%', border: '2px solid #9D174D' }}><UserButton /></div>
          </div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr', gap: '2rem', alignItems: 'start' }}>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Profile card */}
            <div style={card('#98FFD9', '#111111')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                {sanityData?.image
                  ? <img src={urlFor(sanityData.image).width(100).height(100).url()} style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px solid #111' }} alt="Profile" />
                  : <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', border: '2px solid #111' }}>👤</div>
                }
                <div>
                  <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: '1.3rem' }}>{displayName}</h2>
                  <span style={badge('#CCFF00')}>individual</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <p style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.6rem', fontWeight: 'bold' }}>Program</p>
                  <p style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{currentProgram}</p>
                </div>
                <div>
                  <p style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.6rem', fontWeight: 'bold' }}>Level</p>
                  <span style={badge('#CCFF00')}>{currentLevel}</span>
                </div>
                <div>
                  <p style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.6rem', fontWeight: 'bold' }}>Goal</p>
                  <p style={{ fontSize: '0.85rem', fontStyle: 'italic' }}>{sanityData?.learningGoals || 'Set in your profile.'}</p>
                </div>
                <Link href="/dashboard/me" style={{ textAlign: 'center', display: 'block', padding: '10px', backgroundColor: '#111', color: 'white', borderRadius: '50px', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 'bold', marginTop: '0.5rem' }}>
                  Edit My Profile →
                </Link>
              </div>
            </div>

            {/* Mentor card */}
            <div style={card('#9D174D', '#9D174D', '#111')}>
              <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: '1.5rem', marginBottom: '1.5rem', color: '#9D174D' }}>Your Mentor</h2>
              {sanityData?.assignedProfessor ? (
                <div style={{ textAlign: 'center', color: 'white' }}>
                  {sanityData.assignedProfessor.image && (
                    <img src={urlFor(sanityData.assignedProfessor.image).width(200).height(200).url()} style={{ width: '100px', height: '100px', borderRadius: '20px', marginBottom: '1rem', border: '3px solid white' }} alt="Professor" />
                  )}
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{sanityData.assignedProfessor.name}</h3>
                  <p style={{ color: '#98FFD9', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>{sanityData.assignedProfessor.specialty}</p>
                  {sanityData.teacherMessage && (
                    <div style={{ backgroundColor: '#1a1a1a', borderRadius: '12px', padding: '1rem', marginTop: '0.5rem' }}>
                      <p style={{ fontSize: '0.75rem', color: '#aaa', textTransform: 'uppercase', marginBottom: '6px' }}>Message from your professor</p>
                      <p style={{ fontSize: '0.85rem', fontStyle: 'italic', color: '#eee' }}>"{sanityData.teacherMessage}"</p>
                    </div>
                  )}
                </div>
              ) : (
                <p style={{ fontStyle: 'italic', fontSize: '0.9rem', opacity: 0.7, color: 'white' }}>A personal mentor will be assigned shortly.</p>
              )}
            </div>

            {/* Referral card — always show for individual */}
            <ReferralCard sanityData={sanityData} />

          </div>

          {/* Main content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Session progress — only if tracking enabled */}
            {trackingEnabled && <SessionProgressCard sanityData={sanityData} />}

            {/* Calendly Scheduler */}
            <div style={card('#111111', '#111111')}>
              <div style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: '2rem', color: '#9D174D' }}>Schedule a Session</h2>
                <p style={{ fontStyle: 'italic', color: '#666' }}>
                  {creditsOut
                    ? 'You\'ve used all your sessions this cycle. Contact us to top up!'
                    : 'Pick a time that works for you — your info is prefilled.'}
                </p>
              </div>

              {creditsOut ? (
                /* Blocked state */
                <div style={{ backgroundColor: '#FFF0F5', border: '3px solid #9D174D', borderRadius: '16px', padding: '3rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
                  <h3 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: '1.5rem', color: '#9D174D', marginBottom: '0.75rem' }}>No sessions remaining</h3>
                  <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    You've completed all sessions in your current cycle. Reach out and we'll get you set up for the next one.
                  </p>
                  <a href="mailto:theenglishateliere@gmail.com" style={{ display: 'inline-block', backgroundColor: '#9D174D', color: 'white', padding: '12px 28px', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.9rem', border: '2px solid #111' }}>
                    Contact us →
                  </a>
                </div>
              ) : (
                <div
                  className="calendly-inline-widget"
                  data-url={calendlyUrl}
                  style={{ minWidth: '320px', height: '700px', borderRadius: '16px', overflow: 'hidden' }}
                />
              )}
            </div>

            {/* Lessons timeline */}
            <div style={card('#111111', '#98FFD9')}>
              <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: '2rem', marginBottom: '1.5rem' }}>Learning Timeline</h2>
              {lessons.length > 0 ? (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #111', fontSize: '0.75rem', textTransform: 'uppercase', color: '#888' }}>
                      <th style={{ padding: '1rem 0' }}>Lesson</th>
                      <th>Professor</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lessons.map(lesson => (
                      <React.Fragment key={lesson._id}>
                        <tr style={{ borderBottom: '1px solid #eee', fontSize: '0.9rem' }}>
                          <td style={{ padding: '1rem 0', fontWeight: 'bold' }}>{lesson.title}</td>
                          <td>{lesson.professor?.name || 'Staff'}</td>
                          <td>{new Date(lesson.date).toLocaleDateString()}</td>
                          <td>
                            <span style={badge(lesson.status === 'completed' ? '#98FFD9' : lesson.status === 'upcoming' ? '#FFD1DC' : '#eee')}>
                              {lesson.status}
                            </span>
                          </td>
                        </tr>
                        {lesson.notes && (
                          <tr>
                            <td colSpan={4} style={{ padding: '0.5rem 1rem 1rem', backgroundColor: '#f9f9f9', fontSize: '0.8rem', fontStyle: 'italic', color: '#555', borderBottom: '1px solid #eee' }}>
                              "{lesson.notes}"
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem', opacity: 0.5 }}>
                  <p>No lesson history yet. Book your first session above!</p>
                </div>
              )}
            </div>

          </div>
        </div>

        <footer style={{ marginTop: '4rem', paddingBottom: '4rem', textAlign: 'center', color: '#888', fontSize: '0.8rem' }}>
          <p>© 2026 The Atelier. Professional & Personalized Mentorship.</p>
        </footer>
      </div>
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [sanityData, setSanityData] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const calendlyLoaded = useRef(false);

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      fetch('/api/sync-clerk', { method: 'POST' }).then(() => fetchAllData());
    }
  }, [isLoaded, isSignedIn, user]);

  useEffect(() => {
    if (calendlyLoaded.current) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    document.head.appendChild(link);
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.head.appendChild(script);
    calendlyLoaded.current = true;
  }, []);

  useEffect(() => {
    const handleCalendlyEvent = (e: MessageEvent) => {
      if (e.data?.event === 'calendly.event_scheduled') {
        const payload = e.data.payload;
        fetch('/api/webhooks/calendly', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventUri: payload?.event?.uri,
            inviteeUri: payload?.invitee?.uri,
            clientSanityId: sanityData?._id,
            clientName: sanityData?.name || user?.fullName,
            clientEmail: user?.primaryEmailAddress?.emailAddress,
          }),
        }).then(() => fetchAllData());
      }
    };
    window.addEventListener('message', handleCalendlyEvent);
    return () => window.removeEventListener('message', handleCalendlyEvent);
  }, [sanityData, user]);

  const fetchAllData = async () => {
    try {
      const userId = user?.id;
      const query = `{
        "clientData": *[_type == "client" && clerkUserId == $userId][0] {
          ...,
          assignedProfessor->{ _id, name, specialty, bio, image },
          company->{ _id, name, logo, industry }
        },
        "lessons": *[_type == "lesson" && client->clerkUserId == $userId] | order(date desc) {
          ...,
          professor->{ name, specialty }
        }
      }`;
      const { clientData, lessons } = await sanityClient.fetch(query, { userId });
      if (clientData) setSanityData(clientData);
      setLessons(lessons || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded || !isSignedIn) return null;

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAF7F0' }}>
        <p style={{ fontFamily: "var(--font-cormorant), serif", fontSize: '1.5rem', color: '#9D174D' }}>Loading your portal...</p>
      </div>
    );
  }

  if (sanityData?.clientType === 'corporate') {
    return <CorporateDashboard sanityData={sanityData} user={user} />;
  }

  return <IndividualDashboard sanityData={sanityData} lessons={lessons} user={user} />;
}