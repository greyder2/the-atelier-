"use client";

import React from 'react';
import Link from 'next/link';

export default function CorporateTrainingPage() {
    return (
        <main className="page active bg-cream" style={{ backgroundColor: '#FAF7F0', minHeight: '100vh' }}>
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
                            <img src="/pages/programs corporate language training.png" alt="Corporate training" style={{ width: '100%', display: 'block' }} />
                        </div>
                        <h2 className="subpage-title cursive title-black" style={{ fontFamily: "'Pacifico', cursive", fontSize: '4rem', color: '#111111', lineHeight: '1.1', marginTop: '0' }}>
                            Corporate<br/>Language<br/>Training
                        </h2>
                        
                        <div style={{ marginTop: '30px' }}>
                            <Link href="/pages/corporate-quotation" 
                                className="btn-pill" 
                                style={{ 
                                    backgroundColor: '#C8006A', 
                                    color: 'white', 
                                    padding: '14px 36px', 
                                    borderRadius: '50px', 
                                    fontWeight: 'bold', 
                                    fontSize: '14px',
                                    textTransform: 'uppercase',
                                    display: 'inline-block',
                                    textDecoration: 'none'
                                }}>
                                GET A CUSTOMIZED QUOTATION
                            </Link>
                        </div>
                    </div>
                    
                    <div className="right-col staggered-card">
                        <div className="card" style={{ backgroundColor: '#A8DDD8', color: '#111111', borderRadius: '24px', padding: '40px', marginBottom: '20px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' }}>
                            <p style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '15px' }}>
                                We design customized language training programs for international companies seeking to strengthen communication across global teams.
                            </p>
                            <p style={{ fontWeight: 700 }}>
                                Programs can include:<br/>
                                ★ Professional English for international collaboration<br/>
                                ★ Industry-specific vocabulary<br/>
                                ★ Presentation and communication training<br/>
                                ★ Leadership communication skills
                            </p>
                        </div>

                        <div className="retro-browser" style={{ border: '4px solid #C8006A', borderRadius: '12px', overflow: 'hidden', backgroundColor: 'white', marginBottom: '20px' }}>
                             <img src="/pages/corporate language training continue.png" alt="Corporate training details" style={{ width: '100%', display: 'block' }} />
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
