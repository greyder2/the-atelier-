"use client";

import React from 'react';
import Link from 'next/link';

export default function BookSessionPage() {
    return (
        <main className="page active bg-white" style={{ backgroundColor: 'white', minHeight: '100vh', display: 'flex' }}>
            {/* Top Bar inherited or simulated */}
            <div style={{ height: '12px', backgroundColor: '#C8006A', width: '100%', position: 'absolute', top: 0 }}></div>
            
            <div className="subpage-container" style={{ padding: '60px 8%', maxWidth: '1400px', margin: '0 auto', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <h2 className="subpage-title cursive title-pink" style={{ fontFamily: "'Pacifico', cursive", fontSize: '4rem', color: '#C8006A', marginBottom: '30px' }}>
                    Book a Free Session
                </h2>
                
                <div className="session-card" style={{ backgroundColor: '#F4A7C3', border: '4px solid #D9F060', padding: '50px', borderRadius: '24px', width: '100%', maxWidth: '600px' }}>
                    <h3 style={{ color: '#C8006A', fontSize: '2rem', fontFamily: "'DM Sans', sans-serif", fontWeight: 900, marginBottom: '20px' }}>
                        Register to get a free demo!
                    </h3>
                    
                    <div style={{ textAlign: 'left', marginBottom: '20px' }}>
                        <label style={{ fontStyle: 'italic', color: '#666', fontSize: '0.9rem', marginBottom: '10px', display: 'block', marginLeft: '10px' }}>
                            Enter your email
                        </label>
                        <div className="input-group" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <input 
                                type="email" 
                                className="form-input" 
                                placeholder="name@example.com"
                                style={{ flex: 1, padding: '12px 20px', borderRadius: '30px', border: '2px solid #ddd' }} 
                            />
                            <button className="btn-pill" style={{ padding: '12px 30px', borderRadius: '50px', backgroundColor: '#D9F060', color: '#111', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
                                Submit
                            </button>
                            <span className="hand-cursor" style={{ fontSize: '1.5rem', marginLeft: '5px' }}>👈</span>
                        </div>
                    </div>
                    
                    <p style={{ fontSize: '0.8rem', color: '#888', fontStyle: 'italic', marginTop: '15px' }}>
                        We respect your privacy. Unsubscribe at any time.
                    </p>
                </div>
                
                <div className="bottom-nav" style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '40px' }}>
                    <Link href="/" style={{ color: '#C8006A', fontWeight: 'bold', fontStyle: 'italic', textDecoration: 'underline' }}>
                        Go back to the main page
                    </Link>
                </div>
            </div>
        </main>
    );
}
