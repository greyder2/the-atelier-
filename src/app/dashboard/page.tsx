"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from 'react';

export default function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--pale-cream)', color: '#111', paddingTop: '2.5rem' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>
        
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', paddingBottom: '1rem', borderBottom: '4px solid var(--hot-pink)' }}>
            <div>
              <h1 style={{ fontFamily: "'Pacifico', cursive", fontSize: '2.5rem', color: 'var(--hot-pink)' }}>Student Portal</h1>
              <p style={{ fontStyle: 'italic', color: '#666', marginTop: '0.5rem' }}>Welcome back, {user.firstName}!</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Link href="/" style={{ fontWeight: 'bold', textDecoration: 'underline', textTransform: 'uppercase', fontSize: '0.875rem' }}>
                ← Back to Main Site
              </Link>
              <div style={{ backgroundColor: 'var(--light-pink)', padding: '4px', borderRadius: '50%', border: '2px solid var(--hot-pink)' }}>
                <UserButton />
              </div>
            </div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div style={{ backgroundColor: 'white', border: '4px solid var(--mint)', borderRadius: '24px', padding: '2rem', boxShadow: '8px 8px 0px #111111' }}>
                <h2 style={{ fontFamily: "'Pacifico', cursive", fontSize: '2rem', marginBottom: '1.5rem' }}>Your Profile</h2>
                <div>
                    <p style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.75rem' }}>Name</p>
                    <p style={{ fontSize: '1.25rem', paddingBottom: '1rem', borderBottom: '2px solid #f0f0f0', marginBottom: '1rem' }}>{user.fullName}</p>
                    <p style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.75rem' }}>Email</p>
                    <p style={{ fontSize: '1.25rem', paddingBottom: '1rem', borderBottom: '2px solid #f0f0f0', marginBottom: '1rem' }}>{user.primaryEmailAddress?.emailAddress}</p>
                    <p style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.75rem' }}>Current Program</p>
                    <p><span style={{ backgroundColor: 'var(--lime)', padding: '4px 12px', borderRadius: '50px', fontSize: '0.875rem', textTransform: 'uppercase' }}>Language Mastery — Level 1</span></p>
                </div>
            </div>

            <div style={{ backgroundColor: 'var(--hot-pink)', color: 'white', border: '4px solid #111', borderRadius: '24px', padding: '2rem', boxShadow: '8px 8px 0px #111111', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
                <h2 style={{ fontFamily: "'Pacifico', cursive", fontSize: '2rem', marginBottom: '1rem', textAlign: 'center' }}>Schedule a Class</h2>
                <p style={{ textAlign: 'center', marginBottom: '2rem', fontStyle: 'italic' }}>Book your next session directly through our scheduling system!</p>
                <div style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.2)', padding: '2.5rem', borderRadius: '12px', border: '2px dashed white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>
                  [ Cal.com / Calendly Widget ]
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
