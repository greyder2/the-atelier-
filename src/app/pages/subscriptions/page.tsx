"use client";

import React from 'react';
import Link from 'next/link';

export default function SubscriptionsPage() {
    return (
        <main className="page active bg-cream" style={{ backgroundColor: '#FAF7F0', minHeight: '100vh' }}>
            <div style={{ height: '12px', backgroundColor: '#C8006A', width: '100%' }}></div>
            
            <div className="subpage-container" style={{ padding: '60px 8%', maxWidth: '1400px', margin: '0 auto' }}>
                <div className="breadcrumb" style={{ fontStyle: 'italic', color: '#555', marginBottom: '10px', marginTop: '20px' }}>
                    Programs / Services
                </div>
                
                <div className="responsive-grid split-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '40px' }}>
                    <div className="left-col staggered-left">
                        <h2 className="subpage-title cursive title-black" style={{ fontFamily: "'Pacifico', cursive", fontSize: '4rem', color: '#111111', lineHeight: '1.1', marginTop: '0' }}>
                            Atelier<br/>Subscriptions
                        </h2>
                    </div>
                    
                    <div className="right-col staggered-card">
                        <div className="card" style={{ backgroundColor: '#C8006A', color: 'white', borderRadius: '24px', padding: '40px', marginBottom: '20px' }}>
                            <p style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '15px' }}>
                                Our subscription programs provide structured, ongoing language learning.
                            </p>
                            <p style={{ marginBottom: '15px' }}>
                                Students participate in weekly sessions designed to strengthen vocabulary, conversation skills and cultural understanding.
                            </p>
                            <p>
                                Each month focuses on themes such as history, travel, global culture, leadership and professional communication.
                            </p>
                        </div>
                        
                        <div style={{ textAlign: 'center' }}>
                            <Link href="/pages/book-session" 
                                className="speech-bubble" 
                                style={{ 
                                    backgroundColor: '#D9F060', 
                                    color: '#111111', 
                                    display: 'inline-block', 
                                    fontSize: '1rem', 
                                    padding: '20px 30px', 
                                    borderRadius: '24px', 
                                    borderBottomRightRadius: '0',
                                    fontWeight: 'bold',
                                    textDecoration: 'none',
                                    boxShadow: '4px 4px 0px #C8006A'
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
