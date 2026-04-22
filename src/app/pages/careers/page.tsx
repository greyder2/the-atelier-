"use client";

import React from 'react';
import Link from 'next/link';

export default function CareersPage() {
    return (
        <main className="page active bg-[#C8006A]" style={{ backgroundColor: '#C8006A', minHeight: '100vh' }}>
            <div style={{ height: '12px', backgroundColor: 'white', width: '100%' }}></div>
            
            <div className="subpage-container" style={{ padding: '60px 8%', maxWidth: '1400px', margin: '0 auto' }}>
                <div className="breadcrumb" style={{ fontStyle: 'italic', color: 'white', opacity: 0.8, marginBottom: '10px' }}>
                    The Atelier / Careers
                </div>
                
                <h2 className="subpage-title cursive" style={{ fontFamily: "'Pacifico', cursive", fontSize: '4rem', color: '#111111', marginBottom: '30px' }}>
                    Join the Team
                </h2>
                
                <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center' }}>
                    <div className="retro-browser" style={{ width: '100%', maxWidth: '1000px', border: '4px solid white', borderRadius: '12px', overflow: 'hidden', backgroundColor: 'white' }}>
                        <div className="retro-header" style={{ borderBottom: '4px solid #C8006A', padding: '6px 12px', display: 'flex', gap: '8px' }}>
                            <span style={{ color: '#C8006A' }}>x</span> <span style={{ color: '#C8006A' }}>□</span> <span style={{ color: '#C8006A' }}>—</span>
                        </div>
                        <img src="/pages/careers.png" alt="Careers at the Atelier" style={{ width: '100%', display: 'block' }} />
                    </div>
                </div>

                <div className="card" style={{ backgroundColor: 'white', borderRadius: '24px', padding: '40px', color: '#111111', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '20px', fontFamily: "'Pacifico', cursive", color: '#C8006A' }}>Join us</h3>
                    <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '30px' }}>
                        WE ARE ALWAYS LOOKING TO CONNECT WITH TALENTED PEOPLE. IF YOU SHARE OUR PASSION FOR LANGUAGE EDUCATION, CULTURAL INTELLIGENCE, AND EMPOWERING PROFESSIONALS GLOBALLY, WE WOULD LOVE TO HEAR FROM YOU.
                    </p>
                    <a href="mailto:theenglishateliere@gmail.com" className="btn-pill pulse" style={{ backgroundColor: '#C8006A', color: 'white', padding: '14px 36px', borderRadius: '50px', fontWeight: 'bold', display: 'inline-block', textTransform: 'uppercase', textDecoration: 'none', fontSize: '1.2rem' }}>
                        theenglishateliere@gmail.com
                    </a>
                </div>

                <div className="bottom-nav" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '60px' }}>
                    <Link href="/" style={{ color: 'white', fontWeight: 'bold', fontStyle: 'italic', textDecoration: 'underline' }}>← return</Link>
                    <Link href="/" style={{ color: 'white', fontWeight: 'bold', fontStyle: 'italic', textDecoration: 'underline' }}>Go back to the main page</Link>
                </div>
            </div>
        </main>
    );
}
