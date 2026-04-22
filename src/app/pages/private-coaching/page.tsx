"use client";

import React from 'react';
import Link from 'next/link';

export default function PrivateCoachingPage() {
    return (
        <main className="page active bg-cream" style={{ backgroundColor: '#FAF7F0', minHeight: '100vh' }}>
            {/* Top Bar inherited or simulated */}
            <div style={{ height: '12px', backgroundColor: '#C8006A', width: '100%' }}></div>
            
            <div className="subpage-container" style={{ padding: '60px 8%', maxWidth: '1400px', margin: '0 auto' }}>
                <div className="breadcrumb" style={{ fontStyle: 'italic', color: '#555', marginBottom: '10px', marginTop: '20px' }}>
                    Programs / Services
                </div>
                
                <div className="responsive-grid split-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '40px' }}>
                    <div className="left-col staggered-left">
                        <div className="retro-browser" style={{ border: '4px solid #C8006A', borderRadius: '12px', overflow: 'hidden', backgroundColor: 'white', marginBottom: '20px' }}>
                            <div className="retro-header" style={{ borderBottom: '4px solid #C8006A', padding: '6px 12px', display: 'flex', gap: '8px' }}>
                                <span style={{ color: '#C8006A' }}>x</span> <span>□</span> <span>—</span>
                            </div>
                            <img src="/pages/programs private coaching.png" alt="Private Coaching" style={{ width: '100%', display: 'block' }} />
                        </div>
                        <h2 className="subpage-title cursive title-black" style={{ fontFamily: "'Pacifico', cursive", fontSize: '4rem', color: '#111111', lineHeight: '1.1', marginTop: '0' }}>
                            Private<br/>Coaching
                        </h2>
                    </div>
                    
                    <div className="right-col staggered-card">
                        <div className="card" style={{ backgroundColor: '#D9F060', borderRadius: '24px', padding: '40px', marginBottom: '20px', color: '#111111' }}>
                            <p style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '15px' }}>
                                Personalized one-on-one language mentoring.
                            </p>
                            <p style={{ marginBottom: '15px' }}>
                                Ideal for professionals, students and individuals seeking focused guidance and rapid progress.
                            </p>
                            <p style={{ fontWeight: 700 }}>
                                Programs include:<br/>
                                ★ Professional English<br/>
                                ★ Conversation & Fluency<br/>
                                ★ Pronunciation<br/>
                                ★ Interview preparation<br/>
                                ★ Communication skills
                            </p>
                        </div>
                        
                        <div style={{ textAlign: 'center' }}>
                            <Link href="/pages/book-session" 
                                className="speech-bubble" 
                                style={{ 
                                    backgroundColor: '#C8006A', 
                                    color: 'white', 
                                    display: 'inline-block', 
                                    fontSize: '1rem', 
                                    padding: '20px 30px', 
                                    borderRadius: '24px', 
                                    borderBottomRightRadius: '0',
                                    fontWeight: 'bold',
                                    textDecoration: 'none',
                                    boxShadow: '4px 4px 0px #111'
                                }}>
                                JOIN THE ATELIER! / BOOK A FREE SESSION HERE 
                                <span className="hand-cursor" style={{ fontSize: '1.5rem', marginLeft: '10px' }}>👆</span>
                            </Link>
                        </div>
                    </div>
                </div>
                
                <div className="bottom-nav" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 'auto', paddingTop: '30px' }}>
                    <Link href="/" style={{ color: '#C8006A', fontWeight: 'bold', fontStyle: 'italic', textDecoration: 'underline' }}>← return</Link>
                    <Link href="/" style={{ color: '#C8006A', fontWeight: 'bold', fontStyle: 'italic', textDecoration: 'underline' }}>Go back to the main page</Link>
                </div>
            </div>
        </main>
    );
}
