"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState } from 'react';

export default function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [bookingTime, setBookingTime] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  const handleSchedule = async () => {
    if (!bookingTime) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.fullName,
          email: user.primaryEmailAddress?.emailAddress,
          time: bookingTime,
          programType: "Student Session",
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

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAF7F0', color: '#111', paddingTop: '2.5rem' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>
        
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', paddingBottom: '1rem', borderBottom: '4px solid #D4006A' }}>
            <div>
              <h1 style={{ fontFamily: "'Pacifico', cursive", fontSize: '2.5rem', color: '#D4006A' }}>Student Portal</h1>
              <p style={{ fontStyle: 'italic', color: '#666', marginTop: '0.5rem' }}>Welcome back, {user.firstName}!</p>
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div style={{ backgroundColor: 'white', border: '4px solid #98FFD9', borderRadius: '24px', padding: '2rem', boxShadow: '8px 8px 0px #111111' }}>
                <h2 style={{ fontFamily: "'Pacifico', cursive", fontSize: '2rem', marginBottom: '1.5rem' }}>Your Profile</h2>
                <div>
                    <p style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.75rem' }}>Name</p>
                    <p style={{ fontSize: '1.25rem', paddingBottom: '1rem', borderBottom: '2px solid #f0f0f0', marginBottom: '1rem' }}>{user.fullName}</p>
                    <p style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.75rem' }}>Email</p>
                    <p style={{ fontSize: '1.25rem', paddingBottom: '1rem', borderBottom: '2px solid #f0f0f0', marginBottom: '1rem' }}>{user.primaryEmailAddress?.emailAddress}</p>
                    <p style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.75rem' }}>Current Program</p>
                    <p><span style={{ backgroundColor: '#CCFF00', padding: '4px 12px', borderRadius: '50px', fontSize: '0.875rem', textTransform: 'uppercase' }}>Language Mastery — Level 1</span></p>
                </div>
            </div>

            <div style={{ backgroundColor: '#D4006A', color: 'white', border: '4px solid #111', borderRadius: '24px', padding: '2rem', boxShadow: '8px 8px 0px #111111' }}>
                <h2 style={{ fontFamily: "'Pacifico', cursive", fontSize: '2rem', marginBottom: '1rem', textAlign: 'center' }}>Schedule a Lesson</h2>
                <p style={{ textAlign: 'center', marginBottom: '1.5rem', fontStyle: 'italic' }}>Request your next session with us!</p>
                
                {status === "success" ? (
                  <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '2px solid white' }}>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>✓ Requested!</p>
                    <p>We'll confirm via email shortly.</p>
                    <button onClick={() => setStatus("idle")} style={{ marginTop: '1rem', color: 'white', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>Book another?</button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input 
                      type="datetime-local" 
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      style={{ padding: '0.75rem', borderRadius: '10px', border: '2px solid white', color: '#111', width: '100%' }}
                    />
                    <button 
                      onClick={handleSchedule}
                      disabled={status === "loading" || !bookingTime}
                      style={{ 
                        padding: '1rem', 
                        borderRadius: '50px', 
                        border: 'none', 
                        backgroundColor: '#CCFF00', 
                        color: 'black', 
                        fontWeight: 'bold', 
                        cursor: bookingTime ? 'pointer' : 'not-allowed',
                        opacity: status === "loading" ? 0.7 : 1
                      }}
                    >
                      {status === "loading" ? "Requesting..." : "SUBMIT REQUEST"}
                    </button>
                    {status === "error" && <p style={{ color: '#FFDADA', fontSize: '0.875rem', textAlign: 'center' }}>Something went wrong. Please try again.</p>}
                  </div>
                )}
                
                <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.75rem', opacity: 0.8 }}>
                  Bookings are subject to availability.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}
