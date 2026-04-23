"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState, useEffect } from 'react';
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
const btn = (bg: string, color: string): React.CSSProperties => ({
  backgroundColor: bg, color, padding: '14px 40px', borderRadius: '50px',
  fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', border: 'none', boxShadow: '4px 4px 0px #111'
});

export default function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [sanityData, setSanityData] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [professors, setProfessors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedProfessor, setSelectedProfessor] = useState<any>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [lastBookingLink, setLastBookingLink] = useState<string | null>(null);

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      fetch('/api/sync-clerk', { method: 'POST' }).then(() => fetchAllData());
    }
  }, [isLoaded, isSignedIn, user]);

  const fetchAllData = async () => {
    try {
      const userId = user?.id;
      const query = `{
        "clientData": *[_type == "client" && clerkUserId == $userId][0] {
          ...,
          assignedProfessor->{ _id, name, specialty, bio, image }
        },
        "professors": *[_type == "professor"],
        "lessons": *[_type == "lesson" && client->clerkUserId == $userId] | order(date desc) {
          ...,
          professor->{ name, specialty }
        }
      }`;
      const { clientData, professors, lessons } = await sanityClient.fetch(query, { userId });
      if (clientData) setSanityData(clientData);
      setProfessors(professors || []);
      setLessons(lessons || []);
      if (clientData?.assignedProfessor) setSelectedProfessor(clientData.assignedProfessor);
      else if (professors?.length > 0) setSelectedProfessor(professors[0]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded || !isSignedIn) return null;

  const displayName = sanityData?.name || user.fullName;
  const currentProgram = sanityData?.program || "Unassigned Program";
  const currentLevel = sanityData?.level || "Pending Evaluation";
  const clientType = sanityData?.clientType || "individual";

  const handleSchedule = async () => {
    if (!selectedDate || !selectedSlot || !selectedProfessor) return;
    const [hours, minutes] = selectedSlot.split(':');
    const finalDate = new Date(selectedDate);
    finalDate.setHours(parseInt(hours), parseInt(minutes));
    setStatus("loading");
    try {
      const res = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: displayName,
          email: user.primaryEmailAddress?.emailAddress,
          time: finalDate.toISOString(),
          programType: `${currentProgram} (${clientType === 'corporate' ? 'Corporate' : 'Individual'})`,
          professorId: selectedProfessor._id,
          professorName: selectedProfessor.name,
          clientSanityId: sanityData?._id,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setLastBookingLink(data.calendarLink);
        setStatus("success");
        fetchAllData();
      } else setStatus("error");
    } catch (e) {
      console.error(e);
      setStatus("error");
    }
  };

  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push(d);
  }

  const timeSlots: string[] = [];
  for (let h = 7; h <= 22; h++) {
    ['00', '30'].forEach(m => {
      if (!(h === 22 && m === '30')) timeSlots.push(`${h.toString().padStart(2, '0')}:${m}`);
    });
  }

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

            {/* Scheduler */}
            <div style={card('#111111', '#111111')}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                  <h2 style={{ fontFamily: "'Pacifico', cursive", fontSize: '2rem', color: '#D4006A' }}>Schedule Session</h2>
                  <p style={{ fontStyle: 'italic', color: '#666' }}>Plan your next leap in mastery.</p>
                </div>
                {professors.length > 0 && (
                  <div style={{ textAlign: 'right' }}>
                    <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#888', display: 'block', marginBottom: '5px' }}>Professor</label>
                    <select
                      value={selectedProfessor?._id}
                      onChange={e => setSelectedProfessor(professors.find(p => p._id === e.target.value))}
                      style={{ padding: '8px 12px', borderRadius: '8px', border: '2px solid #111', backgroundColor: '#FAF7F0', fontWeight: 'bold' }}
                    >
                      {professors.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                    </select>
                  </div>
                )}
              </div>

              {status === "success" ? (
                <div style={{ textAlign: 'center', padding: '3rem', border: '4px dashed #98FFD9', borderRadius: '20px' }}>
                  <h3 style={{ fontSize: '2rem' }}>Request Sent! 🚀</h3>
                  <p style={{ color: '#666', marginBottom: '1.5rem' }}>{selectedDate?.toLocaleDateString()} with {selectedProfessor?.name}</p>
                  {lastBookingLink && (
                    <a href={lastBookingLink} target="_blank" style={{ display: 'inline-block', backgroundColor: '#111', color: 'white', padding: '12px 24px', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold' }}>
                      Add to Google Calendar
                    </a>
                  )}
                  <br />
                  <button onClick={() => { setStatus("idle"); setSelectedSlot(null); }} style={{ marginTop: '1.5rem', color: '#D4006A', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>
                    Make Another Request
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '10px' }}>
                    {days.map((day, i) => {
                      const active = selectedDate?.toDateString() === day.toDateString();
                      return (
                        <button key={i} onClick={() => setSelectedDate(day)} style={{ border: active ? '3px solid #D4006A' : '3px solid #f0f0f0', backgroundColor: active ? '#FFD1DC' : 'white', padding: '10px', borderRadius: '16px', minWidth: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
                          <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: '#999' }}>{day.toLocaleDateString(undefined, { weekday: 'short' })}</span>
                          <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{day.getDate()}</span>
                        </button>
                      );
                    })}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: '0.5rem' }}>
                    {timeSlots.map((slot, i) => {
                      const active = selectedSlot === slot;
                      return (
                        <button key={i} disabled={!selectedDate} onClick={() => setSelectedSlot(slot)} style={{ padding: '0.6rem', borderRadius: '10px', border: active ? '3px solid #111' : '1px solid #f0f0f0', backgroundColor: active ? '#CCFF00' : 'white', opacity: selectedDate ? 1 : 0.5, fontWeight: 'bold', cursor: selectedDate ? 'pointer' : 'not-allowed' }}>
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <button
                      onClick={handleSchedule}
                      disabled={!selectedDate || !selectedSlot || status === "loading"}
                      style={{ ...btn('#D4006A', 'white'), opacity: (selectedDate && selectedSlot) ? 1 : 0.5 }}
                    >
                      {status === "loading" ? "Processing..." : "Confirm Session"}
                    </button>
                  </div>
                </div>
              )}
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