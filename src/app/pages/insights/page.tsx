"use client";

import React from 'react';
import Link from 'next/link';

export default function InsightsPage() {
    return (
        <main className="page active bg-[#FAF7F0]" style={{ backgroundColor: '#FAF7F0', minHeight: '100vh' }}>
            <div style={{ height: '12px', backgroundColor: '#C8006A', width: '100%' }}></div>
            
            <div className="subpage-container" style={{ padding: '60px 8%', maxWidth: '1400px', margin: '0 auto' }}>
                <div className="breadcrumb" style={{ fontStyle: 'italic', color: '#555', marginBottom: '10px' }}>
                    The Atelier / Insights & Journal
                </div>
                
                <h2 className="subpage-title cursive title-black" style={{ fontFamily: "'Pacifico', cursive", fontSize: '4rem', color: '#111111', marginBottom: '30px' }}>
                    Atelier Journal
                </h2>
                
                <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center' }}>
                    <div className="retro-browser" style={{ width: '100%', maxWidth: '1000px', border: '4px solid #C8006A', borderRadius: '12px', overflow: 'hidden', backgroundColor: 'white' }}>
                        <div className="retro-header" style={{ borderBottom: '4px solid #C8006A', padding: '6px 12px', display: 'flex', gap: '8px' }}>
                            <span style={{ color: '#C8006A' }}>x</span> <span style={{ color: '#C8006A' }}>□</span> <span style={{ color: '#C8006A' }}>—</span>
                        </div>
                        <img src="/pages/insights  - journal.png" alt="Insights Journal" style={{ width: '100%', display: 'block' }} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="card" style={{ backgroundColor: '#F4A7C3', borderRadius: '24px', padding: '40px', color: '#111111' }}>
                        <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '20px' }}>Atelier Insights</h3>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                            OUR OFFICIAL JOURNAL COVERING ADVANCED TOPICS ON LANGUAGE LEARNING, GLOBAL COMMUNICATION, CULTURAL INTELLIGENCE, WOMEN IN HISTORY, AND PROFESSIONAL DEVELOPMENT.
                        </p>
                        <div style={{ marginTop: '30px' }}>
                            <button className="btn-pill" style={{ backgroundColor: '#C8006A', color: 'white', padding: '14px 36px', borderRadius: '50px', fontWeight: 'bold' }}>
                                ACCESS JOURNAL
                            </button>
                        </div>
                    </div>
                    
                    <div className="card" style={{ backgroundColor: '#A8DDD8', borderRadius: '24px', padding: '40px', color: '#111111' }}>
                        <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '20px' }}>Cultural Notes</h3>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                            EXPLORE THE INTERSECTION OF LANGUAGE AND CULTURE THROUGH OUR CURATED ARTICLES ON ART, HISTORY, AND GLOBAL DIPLOMACY.
                        </p>
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
