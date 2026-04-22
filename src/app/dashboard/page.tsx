"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { createClient } from 'next-sanity';

// Standard client for fetching
const client = createClient({
  projectId: "1pu795c0",
  dataset: "production",
  apiVersion: "2024-03-12",
  useCdn: false,
});

export default function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [sanityClientData, setSanityClientData] = useState<any>(null);
  const [loadingData, setLoadingData] = useState(true);
  
  // Scheduling States
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    if (isLoaded && isSignedIn && user?.primaryEmailAddress?.emailAddress) {
      fetchClientData();
    }
  }, [isLoaded, isSignedIn, user]);

  const fetchClientData = async () => {
    try {
      const email = user?.primaryEmailAddress?.emailAddress;
      const data = await client.fetch(`*[_type == "client" && email == $email][0]`, { email });
      if (data) {
        setSanityClientData(data);
      }
    } catch (e) {
      console.error("Sanity fetch error:", e);
    } finally {
      setLoadingData(false);
    }
  };

  if (!isLoaded || !isSignedIn) return null;

  // Metadata prioritization: Sanity > Clerk
  const displayName = sanityClientData?.name || user.fullName;
  const currentProgram = sanityClientData?.program || "Unassigned Program";
  const currentLevel = sanityClientData?.level || "Pending Evaluation";
  const clientType = sanityClientData?.clientType || "individual";

  const handleSchedule = async () => {
    if (!selectedDate || !selectedSlot) return;
    
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
          notes: `Booking requested via Client Portal. Type: ${clientType}`
        }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (e) {
      console.error(e);
      setStatus("error");
    }
  };

  // Calendar Helper Logic
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push(d);
  }

  const timeSlots = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00", "18:30"];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAF7F0', color: '#111', paddingTop: '2.5rem' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', paddingBottom: '1rem', borderBottom: '4px solid #D4006A' }}>
            <div>
              <h1 style={{ fontFamily: "'Pacifico', cursive", fontSize: '2.5rem', color: '#D4006A' }}>Client Portal</h1>
              <p style={{ fontStyle: 'italic', color: '#666', marginTop: '0.5rem' }}>Welcome back, {displayName}!</p>
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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '2rem', alignItems: 'start' }}>
            
            {/* Sidebar CRM Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ backgroundColor: 'white', border: '4px solid #98FFD9', borderRadius: '24px', padding: '2rem', boxShadow: '8px 8px 0px #111111' }}>
                    <h2 style={{ fontFamily: "'Pacifico', cursive", fontSize: '1.5rem', marginBottom: '1.5rem' }}>Client Profile</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <p style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.65rem', fontWeight: 'bold' }}>Name</p>
                            <p style={{ fontSize: '1.1rem' }}>{displayName}</p>
                        </div>
                        <div>
                            <p style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.65rem', fontWeight: 'bold' }}>Email</p>
                            <p style={{ fontSize: '1rem', color: '#666' }}>{user.primaryEmailAddress?.emailAddress}</p>
                        </div>
                        <div>
                            <p style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.65rem', fontWeight: 'bold' }}>Program</p>
                            <p style={{ fontWeight: 'bold', color: '#D4006A' }}>{currentProgram}</p>
                        </div>
                        <div>
                            <p style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.65rem', fontWeight: 'bold' }}>Level</p>
                            <span style={{ backgroundColor: '#CCFF00', padding: '4px 12px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 'bold' }}>{currentLevel}</span>
                        </div>
                        <div>
                            <p style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.65rem', fontWeight: 'bold' }}>Category</p>
                            <span style={{ backgroundColor: clientType === 'corporate' ? '#98FFD9' : '#FFD1DC', border: '1px solid #111', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                                {clientType}
                            </span>
                        </div>
                    </div>
                </div>

                {clientType === 'corporate' && (
                    <div style={{ backgroundColor: '#111', color: '#98FFD9', borderRadius: '24px', padding: '1.5rem', border: '4px solid #98FFD9' }}>
                        <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Corporate Training Status</h3>
                        <div style={{ height: '8px', backgroundColor: '#333', borderRadius: '4px', overflow: 'hidden', marginBottom: '0.5rem' }}>
                            <div style={{ width: '65%', height: '100%', backgroundColor: '#98FFD9' }}></div>
                        </div>
                        <p style={{ fontSize: '0.75rem' }}>65% Course Progress Complete</p>
                    </div>
                )}
            </div>

            {/* Main Scheduling Area (Visual Calendar) */}
            <div style={{ backgroundColor: 'white', border: '4px solid #111111', borderRadius: '24px', padding: '2rem', boxShadow: '8px 8px 0px #111111' }}>
                <h2 style={{ fontFamily: "'Pacifico', cursive", fontSize: '2rem', marginBottom: '0.5rem', color: '#D4006A' }}>Visual Schedule</h2>
                <p style={{ fontStyle: 'italic', color: '#666', marginBottom: '2rem' }}>Select a date and time slot to request your next session.</p>

                {status === "success" ? (
                    <div style={{ textAlign: 'center', padding: '4rem', border: '4px dashed #98FFD9', borderRadius: '20px' }}>
                        <h3 style={{ fontSize: '2rem', color: '#111' }}>Booking Requested!</h3>
                        <p style={{ color: '#666' }}>We have received your request for {selectedDate?.toLocaleDateString()} at {selectedSlot}.</p>
                        <button onClick={() => { setStatus("idle"); setSelectedSlot(null); }} style={{ marginTop: '2rem', padding: '12px 24px', backgroundColor: '#D4006A', color: 'white', borderRadius: '50px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>Make Another Request</button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        
                        {/* Day Selector */}
                        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '10px' }}>
                            {days.map((day, idx) => {
                                const active = selectedDate?.toDateString() === day.toDateString();
                                return (
                                    <button 
                                        key={idx}
                                        onClick={() => setSelectedDate(day)}
                                        style={{
                                            border: active ? '3px solid #D4006A' : '3px solid #f0f0f0',
                                            backgroundColor: active ? '#FFD1DC' : 'white',
                                            padding: '12px',
                                            borderRadius: '16px',
                                            minWidth: '100px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#999' }}>{day.toLocaleDateString(undefined, { weekday: 'short' })}</span>
                                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{day.getDate()}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Time Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '1rem' }}>
                            {timeSlots.map((slot, idx) => {
                                const active = selectedSlot === slot;
                                return (
                                    <button 
                                        key={idx}
                                        disabled={!selectedDate}
                                        onClick={() => setSelectedSlot(slot)}
                                        style={{
                                            padding: '1rem',
                                            borderRadius: '12px',
                                            border: active ? '3px solid #111' : '3px solid #f0f0f0',
                                            backgroundColor: active ? '#CCFF00' : 'white',
                                            opacity: selectedDate ? 1 : 0.5,
                                            fontWeight: 'bold',
                                            cursor: selectedDate ? 'pointer' : 'not-allowed',
                                            textAlign: 'center'
                                        }}
                                    >
                                        {slot}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Submit Action */}
                        <div style={{ marginTop: '1rem', borderTop: '2px solid #f0f0f0', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                {selectedDate && selectedSlot ? (
                                    <p style={{ fontWeight: 'bold' }}>Requesting: <span style={{ color: '#D4006A' }}>{selectedDate.toLocaleDateString()} @ {selectedSlot}</span></p>
                                ) : (
                                    <p style={{ color: '#999', fontStyle: 'italic' }}>Please select a date and time slot above...</p>
                                )}
                            </div>
                            <button 
                                onClick={handleSchedule}
                                disabled={!selectedDate || !selectedSlot || status === "loading"}
                                style={{
                                    backgroundColor: '#111',
                                    color: 'white',
                                    padding: '16px 40px',
                                    borderRadius: '50px',
                                    fontWeight: 'bold',
                                    fontSize: '1.1rem',
                                    cursor: (selectedDate && selectedSlot) ? 'pointer' : 'not-allowed',
                                    opacity: (selectedDate && selectedSlot) ? 1 : 0.5,
                                    boxShadow: '4px 4px 0px #D4006A'
                                }}
                            >
                                {status === "loading" ? "Processing..." : "CONFIRM REQUEST"}
                            </button>
                        </div>
                        {status === "error" && <p style={{ color: 'red', textAlign: 'right' }}>Failed to submit request. Please try again.</p>}
                    </div>
                )}
            </div>
        </div>

        {/* Footer info */}
        <footer style={{ marginTop: '4rem', paddingBottom: '4rem', borderTop: '2px solid #ddd', paddingTop: '2rem', textAlign: 'center', color: '#888', fontSize: '0.8rem' }}>
            <p>&copy; 2026 The Atelier. Professional & Corporate Language Training.</p>
        </footer>
      </div>
    </div>
  );
}
