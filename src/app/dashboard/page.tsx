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

  // Calendly script yükle
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

  // Calendly booking tamamlandığında Sanity'e yaz
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
          assignedProfessor->{ _id, name, specialty, bio, image }
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

  const displayName = sanityData?.name || user.fullName || '';
  const currentProgram = sanityData?.program || "Unassigned Program";
  const currentLevel = sanityData?.level || "Pending Evaluation";
  const clientType = sanityData?.clientType || "individual";
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

        {/* Corporate banner */}
        {clientType === 'corporate' && (
          <div style={{ ...card('#D4006A', '#111'), marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#888', fontWeight: 'bold' }}>Corporate Account</p>
              <h2 style={{ fontFamily: "'Pacifico', cursive", fontSize: '1.5rem' }}>{sanityData?.companyName || 'Your Organization'}</h2>
              <p style={{ fontSize: '0.9rem', color: '#555', marginTop: '4px' }}>
                {sanityData?.teamSize ? `${sanityData.teamSize} team members enrolled` : 'Team details pending'}
              </p>
            </div>
            <span style={badge('#FFD1DC')}>Corporate</span>
          </div>
        )}

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
                  <span style={badge(clientType === 'corporate' ? '#FFD1DC' : '#CCFF00')}>{clientType}</span>
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