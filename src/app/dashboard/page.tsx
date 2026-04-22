"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url'

// Standard client for fetching
const client = createClient({
  projectId: "1pu795c0",
  dataset: "production",
  apiVersion: "2024-03-12",
  useCdn: false,
});

const builder = imageUrlBuilder(client)
function urlFor(source: any) {
  return builder.image(source)
}

export default function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [sanityClientData, setSanityClientData] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [professors, setProfessors] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  
  // Scheduling States
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedProfessor, setSelectedProfessor] = useState<any>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [lastBookingLink, setLastBookingLink] = useState<string | null>(null);

  useEffect(() => {
    if (isLoaded && isSignedIn && user?.primaryEmailAddress?.emailAddress) {
      fetchAllData();
    }
  }, [isLoaded, isSignedIn, user]);

  const fetchAllData = async () => {
    try {
      const email = user?.primaryEmailAddress?.emailAddress;
      
      // Multi-query fetch
      const query = `{
        "clientData": *[_type == "client" && email == $email][0] {
          ...,
          assignedProfessor->{...}
        },
        "professors": *[_type == "professor"],
        "lessons": *[_type == "lesson" && client->email == $email] | order(date desc) {
          ...,
          professor->{ name, specialty }
        }
      }`;

      const { clientData, professors, lessons } = await client.fetch(query, { email });
      
      if (clientData) setSanityClientData(clientData);
      setProfessors(professors || []);
      setLessons(lessons || []);
      
      // Default to assigned professor if available
      if (clientData?.assignedProfessor) {
        setSelectedProfessor(clientData.assignedProfessor);
      } else if (professors?.length > 0) {
        setSelectedProfessor(professors[0]);
      }

    } catch (e) {
      console.error("LMS fetch error:", e);
    } finally {
      setLoadingData(false);
    }
  };

  if (!isLoaded || !isSignedIn) return null;

  const displayName = sanityClientData?.name || user.fullName;
  const currentProgram = sanityClientData?.program || "Unassigned Program";
  const currentLevel = sanityClientData?.level || "Pending Evaluation";
  const clientType = sanityClientData?.clientType || "individual";

  const handleSchedule = async () => {
    if (!selectedDate || !selectedSlot || !selectedProfessor) return;
    
    // Combine date and time slot
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
          notes: `Automatic booking via Portal. Assigned Professor: ${sanityClientData?.assignedProfessor?.name || 'None'}`
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setLastBookingLink(data.calendarLink);
        setStatus("success");
        fetchAllData(); // Refresh lesson list
      } else {
        setStatus("error");
      }
    } catch (e) {
      console.error(e);
      setStatus("error");
    }
  };

  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push(d);
  }

  // Generate 30-min slots from 08:00 to 20:00
  const timeSlots: string[] = [];
  for (let hour = 8; hour <= 20; hour++) {
    ['00', '30'].forEach(minute => {
      if (!(hour === 20 && minute === '30')) {
        timeSlots.push(`${hour.toString().padStart(2, '0')}:${minute}`);
      }
    });
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAF7F0', color: '#111', paddingTop: '2.5rem' }}>
      <div style={{ maxWidth: '85rem', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', paddingBottom: '1rem', borderBottom: '4px solid #D4006A' }}>
            <div>
              <h1 style={{ fontFamily: "'Pacifico', cursive", fontSize: '2.5rem', color: '#D4006A' }}>Client Portal</h1>
              <p style={{ fontStyle: 'italic', color: '#666', marginTop: '0.5rem' }}>The Atelier LMS — Welcome back, {displayName}!</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Link href="/" style={{ fontWeight: 'bold', textDecoration: 'underline', textTransform: 'uppercase', fontSize: '0.875rem' }}>
                ← Back to Main Site
              </Link>
              <div style={{ backgroundColor: '#FFD1DC', padding: '4px', borderRadius: '50%', border: '2px solid #D4006A' }}>
                <UserButton />
              </div>
            </div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr', gap: '2rem', alignItems: 'start' }}>
            
            {/* Sidebar LMS Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                
                {/* Profile Card */}
                <div style={{ backgroundColor: 'white', border: '4px solid #98FFD9', borderRadius: '24px', padding: '2rem', boxShadow: '8px 8px 0px #111111' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                      {sanityClientData?.image ? (
                        <img src={urlFor(sanityClientData.image).width(100).height(100).url()} style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px solid #111' }} alt="Profile" />
                      ) : (
                        <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', border: '2px solid #111' }}>👤</div>
                      )}
                      <h2 style={{ fontFamily: "'Pacifico', cursive", fontSize: '1.5rem' }}>My Profile</h2>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <p style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.6rem', fontWeight: 'bold' }}>Learning Level</p>
                            <span style={{ backgroundColor: '#CCFF00', padding: '4px 12px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 'bold' }}>{currentLevel}</span>
                        </div>
                        <div>
                            <p style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.6rem', fontWeight: 'bold' }}>Primary Goal</p>
                            <p style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>{sanityClientData?.learningGoals || "Speak with confidence in global sessions."}</p>
                        </div>
                    </div>
                </div>

                {/* Meet Your Mentor Section */}
                <div style={{ backgroundColor: '#111', color: 'white', borderRadius: '24px', padding: '2rem', border: '4px solid #D4006A', boxShadow: '8px 8px 0px #D4006A' }}>
                    <h2 style={{ fontFamily: "'Pacifico', cursive", fontSize: '1.5rem', marginBottom: '1.5rem', color: '#D4006A' }}>Your Mentor</h2>
                    {sanityClientData?.assignedProfessor ? (
                      <div style={{ textAlign: 'center' }}>
                        {sanityClientData.assignedProfessor.image && (
                          <img src={urlFor(sanityClientData.assignedProfessor.image).width(200).height(200).url()} style={{ width: '120px', height: '120px', borderRadius: '20px', marginBottom: '1rem', border: '3px solid white' }} alt="Professor" />
                        )}
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{sanityClientData.assignedProfessor.name}</h3>
                        <p style={{ color: '#98FFD9', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>{sanityClientData.assignedProfessor.specialty}</p>
                        <p style={{ fontSize: '0.85rem', fontStyle: 'italic', opacity: 0.8 }}>"{sanityClientData.assignedProfessor.bio || 'Ready to guide you through your mastery journey.'}"</p>
                      </div>
                    ) : (
                      <p style={{ fontStyle: 'italic', fontSize: '0.9rem', opacity: 0.7 }}>A personal mentor will be assigned shortly after your evaluation.</p>
                    )}
                </div>
            </div>

            {/* Main Content Area */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                
                {/* Visual Schedule */}
                <div style={{ backgroundColor: 'white', border: '4px solid #111111', borderRadius: '24px', padding: '2rem', boxShadow: '8px 8px 0px #111111' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                      <div>
                        <h2 style={{ fontFamily: "'Pacifico', cursive", fontSize: '2rem', color: '#D4006A' }}>Schedule Session</h2>
                        <p style={{ fontStyle: 'italic', color: '#666' }}>Plan your next leap in mastery.</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#888', display: 'block', marginBottom: '5px' }}>Choose Professor</label>
                        <select 
                          value={selectedProfessor?._id} 
                          onChange={(e) => setSelectedProfessor(professors.find(p => p._id === e.target.value))}
                          style={{ padding: '8px 12px', borderRadius: '8px', border: '2px solid #111', backgroundColor: '#FAF7F0', fontWeight: 'bold' }}
                        >
                          {professors.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                        </select>
                      </div>
                    </div>

                    {status === "success" ? (
                        <div style={{ textAlign: 'center', padding: '3rem', border: '4px dashed #98FFD9', borderRadius: '20px', backgroundColor: '#fafffa' }}>
                            <h3 style={{ fontSize: '2rem', color: '#111' }}>Booking Request Sent 🚀</h3>
                            <p style={{ color: '#666', marginBottom: '1.5rem' }}>You requested {selectedDate?.toLocaleDateString()} with {selectedProfessor?.name}.</p>
                            
                            {lastBookingLink && (
                              <a href={lastBookingLink} target="_blank" style={{ display: 'inline-block', backgroundColor: '#111', color: 'white', padding: '12px 24px', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold' }}>
                                📅 ADD TO GOOGLE CALENDAR
                              </a>
                            )}
                            
                            <br/>
                            <button onClick={() => { setStatus("idle"); setSelectedSlot(null); }} style={{ marginTop: '1.5rem', color: '#D4006A', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>Make Another Request</button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '10px' }}>
                                {days.map((day, idx) => {
                                    const active = selectedDate?.toDateString() === day.toDateString();
                                    return (
                                        <button key={idx} onClick={() => setSelectedDate(day)} style={{ border: active ? '3px solid #D4006A' : '3px solid #f0f0f0', backgroundColor: active ? '#FFD1DC' : 'white', padding: '10px', borderRadius: '16px', minWidth: '90px', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>
                                            <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: '#999' }}>{day.toLocaleDateString(undefined, { weekday: 'short' })}</span>
                                            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{day.getDate()}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '0.75rem' }}>
                                {timeSlots.map((slot, idx) => {
                                    const active = selectedSlot === slot;
                                    return (
                                        <button key={idx} disabled={!selectedDate} onClick={() => setSelectedSlot(slot)} style={{ padding: '0.75rem', borderRadius: '10px', border: active ? '3px solid #111' : '1px solid #f0f0f0', backgroundColor: active ? '#CCFF00' : 'white', opacity: selectedDate ? 1 : 0.5, fontWeight: 'bold', cursor: selectedDate ? 'pointer' : 'not-allowed', textAlign: 'center' }}>{slot}</button>
                                    );
                                })}
                            </div>

                            <div style={{ marginTop: '1rem', textAlign: 'right' }}>
                              <button onClick={handleSchedule} disabled={!selectedDate || !selectedSlot || status === "loading"} style={{ backgroundColor: '#D4006A', color: 'white', padding: '14px 40px', borderRadius: '50px', fontWeight: 'bold', fontSize: '1rem', cursor: (selectedDate && selectedSlot) ? 'pointer' : 'not-allowed', opacity: (selectedDate && selectedSlot) ? 1 : 0.5, boxShadow: '4px 4px 0px #111' }}>
                                  {status === "loading" ? "Processing..." : "CONFIRM LESSON"}
                              </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Learning Timeline (Lesson Tracker) */}
                <div style={{ backgroundColor: 'white', border: '4px solid #111111', borderRadius: '24px', padding: '2rem', boxShadow: '8px 8px 0px #98FFD9' }}>
                    <h2 style={{ fontFamily: "'Pacifico', cursive", fontSize: '2rem', marginBottom: '1.5rem' }}>Learning Timeline</h2>
                    {lessons.length > 0 ? (
                      <div style={{ overflowX: 'auto' }}>
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
                            {lessons.map((lesson, idx) => (
                              <React.Fragment key={lesson._id}>
                                <tr style={{ borderBottom: '1px solid #eee', fontSize: '0.9rem' }}>
                                  <td style={{ padding: '1rem 0', fontWeight: 'bold' }}>{lesson.title}</td>
                                  <td>{lesson.professor?.name || 'Staff'}</td>
                                  <td>{new Date(lesson.date).toLocaleDateString()}</td>
                                  <td>
                                    <span style={{ 
                                      backgroundColor: lesson.status === 'completed' ? '#98FFD9' : lesson.status === 'upcoming' ? '#FFD1DC' : '#eee',
                                      padding: '4px 10px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 'bold', border: '1px solid #111'
                                    }}>
                                      {lesson.status}
                                    </span>
                                  </td>
                                </tr>
                                {lesson.notes && (
                                  <tr>
                                    <td colSpan={4} style={{ padding: '0.5rem 1rem 1rem 1rem', backgroundColor: '#f9f9f9', fontSize: '0.8rem', fontStyle: 'italic', color: '#555', borderBottom: '1px solid #eee' }}>
                                      "Notes: {lesson.notes}"
                                    </td>
                                  </tr>
                                )}
                              </React.Fragment>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div style={{ textAlign: 'center', padding: '2rem', opacity: 0.5 }}>
                        <p>No lesson history found yet. Start your journey by booking a session!</p>
                      </div>
                    )}
                </div>
            </div>
        </div>

        <footer style={{ marginTop: '4rem', paddingBottom: '4rem', textAlign: 'center', color: '#888', fontSize: '0.8rem' }}>
            <p>&copy; 2026 The Atelier. Professional & Personalized Mentorship.</p>
        </footer>
      </div>
    </div>
  );
}
