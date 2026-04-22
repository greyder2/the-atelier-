"use client";

import React from 'react';
import Link from 'next/link';

export default function ScholarshipsPage() {
    return (
        <main className="page active bg-[#FAF7F0]" style={{ backgroundColor: '#FAF7F0', minHeight: '100vh' }}>
            <div style={{ height: '12px', backgroundColor: '#C8006A', width: '100%' }}></div>
            
            <div className="subpage-container" style={{ padding: '60px 8%', maxWidth: '1400px', margin: '0 auto' }}>
                <div className="breadcrumb" style={{ fontStyle: 'italic', color: '#555', marginBottom: '10px' }}>
                    The Atelier / Scholarships
                </div>
                
                <h2 className="subpage-title cursive title-black" style={{ fontFamily: "'Pacifico', cursive", fontSize: '4rem', color: '#111111', marginBottom: '30px' }}>
                    Scholarships & Grants
                </h2>
                
                <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center' }}>
                    <div className="retro-browser" style={{ width: '100%', maxWidth: '1000px', border: '4px solid #C8006A', borderRadius: '12px', overflow: 'hidden', backgroundColor: 'white' }}>
                        <div className="retro-header" style={{ borderBottom: '4px solid #C8006A', padding: '6px 12px', display: 'flex', gap: '8px' }}>
                            <span style={{ color: '#C8006A' }}>x</span> <span>□</span> <span>—</span>
                        </div>
                        <img src="/pages/scholarships - grants.png" alt="Scholarships and Grants" style={{ width: '100%', display: 'block' }} />
                    </div>
                </div>

                <div className="card" style={{ backgroundColor: '#D9F060', borderRadius: '24px', padding: '40px', color: '#111111', maxWidth: '800px', margin: '0 auto' }}>
                    <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '20px' }}>THE ATELIER GRANTS</h3>
                    <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
                        We believe in supporting highly motivated students. Our grants cover a significant percentage of programs for language learners who demonstrate commitment and passion.<br/><br/>
                        If you are eligible for one of our scholarship programs, you will receive a personalized code after your demo session.
                    </p>
                    <div style={{ marginTop: '30px', textAlign: 'center' }}>
                        <Link href="/pages/book-session" className="btn-pill" style={{ backgroundColor: '#C8006A', color: 'white', padding: '14px 36px', borderRadius: '50px', fontWeight: 'bold', display: 'inline-block', textTransform: 'uppercase', textDecoration: 'none' }}>
                            Apply for a grant now
                        </Link>
                    </div>
                </div>

                <div className="bottom-nav" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '60px' }}>
                    <Link href="/" style={{ color: '#C8006A', fontWeight: 'bold', fontStyle: 'italic', textDecoration: 'underline' }}>← return</Link>
                    <Link href="/" style={{ color: '#C8006A', fontWeight: 'bold', fontStyle: 'italic', textDecoration: 'underline' }}>Go back to the main page</Link>
                </div>
            </div>
        </main>
    );
}
