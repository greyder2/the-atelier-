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
const badge = (bg: string): React.CSSProperties => ({
  backgroundColor: bg, padding: '4px 12px', borderRadius: '50px',
  fontSize: '0.75rem', fontWeight: 'bold', border: '1px solid #111'
});

// ─── STATUS CONFIG ────────────────────────────────────────────────────────────
const STATUS_BADGE: Record<string, string> = {
  active: '#98FFD9',
  paused: '#FFE999',
  completed: '#FFD1DC',
};

// ─── CORPORATE DASHBOARD ──────────────────────────────────────────────────────

function CorporateDashboard({
  sanityData,
  user,
}: {
  sanityData: any;
  user: any;
}) {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const company = sanityData?.company;

  useEffect(() => {
    if (!company?._ref && !company?._id) return;
    const companyId = company?._id || company?._ref;
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
    const matchSearch =
      e.name?.toLowerCase().includes(search.toLowerCase()) ||
      e.email?.toLowerCase().includes(search.toLowerCase()) ||
      e.program?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || e.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: employees.length,
    active: employees.filter((e) => e.status === 'active').length,
    completed: employees.filter((e) => e.status === 'completed').length,
    paused: employees.filter((e) => e.status === 'paused').length,
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAF7F0', color: '#111', paddingTop: '2.5rem' }}>
      {/* Top pink bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '12px', backgroundColor: '#C8006A', zIndex: 1000 }} />

      <div style={{ maxWidth: '90rem', margin: '0 auto', padding: '0 2rem' }}>

        {/* ── HEADER: dual logo ── */}
        <header style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: '2.5rem', paddingBottom: '1.5rem',
          borderBottom: '4px solid #C8006A'
        }}>
          {/* Left: company logo + divider + atelier logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {company?.logo ? (
              <img
                src={urlFor(company.logo).height(56).url()}
                alt={company.name}
                style={{ height: '56px', objectFit: 'contain' }}
              />
            ) : (
              <div style={{
                height: '56px', minWidth: '120px', backgroundColor: '#111', borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontWeight: 'bold', fontSize: '0.85rem', padding: '0 1rem'
              }}>
                {company?.name || 'Your Company'}
              </div>
            )}

            {/* divider */}
            <div style={{ width: '2px', height: '48px', backgroundColor: '#C8006A', borderRadius: '2px' }} />

            <span style={{ fontFamily: "'Pacifico', cursive", fontSize: '1.8rem', color: '#C8006A' }}>
              The Atelier
            </span>
          </div>

          {/* Right: nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link href="/" style={{
              fontWeight: 'bold', textDecoration: 'underline',
              textTransform: 'uppercase', fontSize: '0.875rem', color: '#111'
            }}>
              ← Main Site
            </Link>
            <div style={{ backgroundColor: '#FFD1DC', padding: '4px', borderRadius: '50%', border: '2px solid #C8006A' }}>
              <UserButton />
            </div>
          </div>
        </header>

        {/* ── CORPORATE BANNER ── */}
        <div style={{
          ...card('#C8006A', '#111'),
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, #C8006A 0%, #9B0050 100%)',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div>
            <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.75, marginBottom: '4px' }}>
              Corporate Training Dashboard
            </p>
            <h2 style={{ fontFamily: "'Pacifico', cursive", fontSize: '2rem', marginBottom: '4px' }}>
              {company?.name || 'Your Organization'}
            </h2>
            <p style={{ fontSize: '0.9rem', opacity: 0.85 }}>
              {company?.industry || 'Corporate Partner'} · Welcome, {sanityData?.name || user.fullName}
            </p>
          </div>
          <span style={{
            ...badge('#D9F060'),
            fontSize: '0.8rem',
            padding: '6px 16px',
            border: '2px solid #D9F060',
          }}>
            Corporate Account
          </span>
        </div>

        {/* ── STATS ROW ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Total Enrolled', value: stats.total, color: '#111', bg: '#D9F060' },
            { label: 'Active', value: stats.active, color: '#111', bg: '#98FFD9' },
            { label: 'Completed', value: stats.completed, color: '#111', bg: '#FFD1DC' },
            { label: 'Paused', value: stats.paused, color: '#111', bg: '#FFE999' },
          ].map((s) => (
            <div key={s.label} style={{
              backgroundColor: s.bg,
              border: '3px solid #111',
              borderRadius: '20px',
              padding: '1.5rem',
              textAlign: 'center',
              boxShadow: '4px 4px 0px #111',
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '900', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '6px', fontWeight: 'bold' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── FILTERS ── */}
        <div style={{
          display: 'flex', gap: '1rem', marginBottom: '1.5rem',
          flexWrap: 'wrap', alignItems: 'center'
        }}>
          <input
            type="text"
            placeholder="Search employees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1, minWidth: '200px', padding: '10px 16px',
              border: '3px solid #111', borderRadius: '50px',
              fontSize: '0.9rem', outline: 'none',
              backgroundColor: 'white', fontFamily: 'inherit',
            }}
          />
          {(['all', 'active', 'paused', 'completed'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              style={{
                padding: '8px 20px', borderRadius: '50px',
                border: '2px solid #111', cursor: 'pointer',
                fontWeight: 'bold', fontSize: '0.8rem',
                textTransform: 'capitalize',
                backgroundColor: statusFilter === s ? '#C8006A' : 'white',
                color: statusFilter === s ? 'white' : '#111',
                transition: 'all 0.15s',
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* ── EMPLOYEE TABLE ── */}
        <div style={card('#111', '#C8006A')}>
          <h2 style={{ fontFamily: "'Pacifico', cursive", fontSize: '1.8rem', marginBottom: '1.5rem', color: '#C8006A' }}>
            Team Progress
          </h2>

          {loadingEmployees ? (
            <p style={{ textAlign: 'center', padding: '3rem', opacity: 0.5, fontStyle: 'italic' }}>
              Loading team data...
            </p>
          ) : filtered.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '3rem', opacity: 0.5, fontStyle: 'italic' }}>
              No employees found. Employees need to sign up and be linked to your company by the admin.
            </p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #111', fontSize: '0.7rem', textTransform: 'uppercase', color: '#888', letterSpacing: '1px' }}>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Employee</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Program</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Level</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Professor</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((emp) => (
                  <tr key={emp._id} style={{ borderBottom: '1px solid #eee', fontSize: '0.9rem' }}>
                    <td style={{ padding: '1rem 0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {emp.image ? (
                          <img
                            src={urlFor(emp.image).width(40).height(40).fit('crop').url()}
                            alt={emp.name}
                            style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid #111', flexShrink: 0 }}
                          />
                        ) : (
                          <div style={{
                            width: '36px', height: '36px', borderRadius: '50%',
                            backgroundColor: '#D9F060', border: '2px solid #111',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontWeight: 'bold', fontSize: '0.85rem', flexShrink: 0,
                          }}>
                            {emp.name?.[0] ?? '?'}
                          </div>
                        )}
                        <div>
                          <div style={{ fontWeight: 'bold' }}>{emp.name}</div>
                          <div style={{ fontSize: '0.75rem', color: '#888' }}>{emp.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '1rem 0.5rem', color: '#555' }}>{emp.program || '—'}</td>
                    <td style={{ padding: '1rem 0.5rem' }}>
                      {emp.level
                        ? <span style={badge('#D9F060')}>{emp.level}</span>
                        : <span style={{ color: '#bbb' }}>—</span>}
                    </td>
                    <td style={{ padding: '1rem 0.5rem', color: '#555' }}>
                      {emp.assignedProfessor?.name || '—'}
                    </td>
                    <td style={{ padding: '1rem 0.5rem' }}>
                      <span style={badge(STATUS_BADGE[emp.status] ?? '#eee')}>
                        {emp.status ?? 'unknown'}
                      </span>
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

// ─── INDIVIDUAL DASHBOARD (mevcut kod, temizlenmiş) ───────────────────────────

function IndividualDashboard({
  sanityData,
  lessons,
  user,
}: {
  sanityData: any;
  lessons: any[];
  user: any;
}) {
  const displayName = sanityData?.name || user.fullName || '';
  const currentProgram = sanityData?.program || 'Unassigned Program';
  const currentLevel = sanityData?.level || 'Pending Evaluation';
  const email = user.primaryEmailAddress?.emailAddress || '';

  const calendlyUrl = `https://calendly.com/theenglishateliere/new-meeting?hide_gdpr_banner=1&primary_color=D4006A&name=${encodeURIComponent(displayName)}&email=${encodeURIComponent(email)}`;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAF7F0', color: '#111', paddingTop: '2.5rem' }}>
      <div style={{ maxWidth: '85rem', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', paddingBottom: '1rem', borderBottom: '4px solid #D4006A' }}>
          <div>
            <h1 style={{ fontFamily: "'Pacifico', cursive", fontSize: '2.5rem', color: '#D4006A' }}>Client Portal</h1>
            <p style={{ fontStyle: 'italic', color: '#666', marginTop: '0.5rem' }}>Welcome back, {displayName}!</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link href="/dashboard/me" style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.8rem', backgroundColor: '#CCFF00', padding: '8px 16px', borderRadius: '50px', border: '2px solid #111', textDecoration: 'none', color: '#111' }}>
              My Profile
            </Link>
            <Link href="/" style={{ fontWeight: 'bold', textDecoration: 'underline', textTransform: 'uppercase', fontSize: '0.875rem', color: '#111' }}>
              ← Main Site
            </Link>
            <div style={{ backgroundColor: '#FFD1DC', padding: '4px', borderRadius: '50%', border: '2px solid #D4006A' }}>
              <UserButton />
            </div>
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
                  <h2 style={{ fontFamily: "'Pacifico', cursive", fontSize: '1.3rem' }}>{displayName}</h2>
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
            <div style={card('#D4006A', '#D4006A', '#111')}>
              <h2 style={{ fontFamily: "'Pacifico', cursive", fontSize: '1.5rem', marginBottom: '1.5rem', color: '#D4006A' }}>Your Mentor</h2>
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
          </div>

          {/* Main content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Calendly Scheduler */}
            <div style={card('#111111', '#111111')}>
              <div style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontFamily: "'Pacifico', cursive", fontSize: '2rem', color: '#D4006A' }}>Schedule a Session</h2>
                <p style={{ fontStyle: 'italic', color: '#666' }}>Pick a time that works for you — your info is prefilled.</p>
              </div>
              <div
                className="calendly-inline-widget"
                data-url={calendlyUrl}
                style={{ minWidth: '320px', height: '700px', borderRadius: '16px', overflow: 'hidden' }}
              />
            </div>

            {/* Lessons timeline */}
            <div style={card('#111111', '#98FFD9')}>
              <h2 style={{ fontFamily: "'Pacifico', cursive", fontSize: '2rem', marginBottom: '1.5rem' }}>Learning Timeline</h2>
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

// ─── ROOT COMPONENT ───────────────────────────────────────────────────────────

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

  // Calendly script
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

  // Calendly booking → Sanity
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
          company->{ _id, name, logo, industry, contactPerson }
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
        <p style={{ fontFamily: "'Pacifico', cursive", fontSize: '1.5rem', color: '#C8006A' }}>Loading your portal...</p>
      </div>
    );
  }

  const clientType = sanityData?.clientType ?? 'individual';

  if (clientType === 'corporate') {
    return <CorporateDashboard sanityData={sanityData} user={user} />;
  }

  return <IndividualDashboard sanityData={sanityData} lessons={lessons} user={user} />;
}