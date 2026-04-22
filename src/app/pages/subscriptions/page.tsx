"use client";

import React from 'react';
import Link from 'next/link';

export default function SubscriptionsPage() {
    return (
        <main className="page active bg-cream">
            <div className="subpage-container">
                <div className="breadcrumb" style={{ marginTop: '20px' }}>Programs / Services</div>
                <div className="responsive-grid split-layout">
                    <div className="left-col staggered-left">
                        <h2 className="subpage-title cursive title-black" style={{ marginTop: '0' }}>Atelier<br/>Subscriptions</h2>
                    </div>
                    <div className="right-col staggered-card">
                        <div className="card" style={{ backgroundColor: 'var(--hot-pink)', color: 'var(--white)', marginBottom: '20px' }}>
                            <p style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '15px' }}>Our subscription programs provide structured, ongoing language learning.</p>
                            <p style={{ marginBottom: '15px' }}>Students participate in weekly sessions designed to strengthen vocabulary, conversation skills and cultural understanding.</p>
                            <p>Each month focuses on themes such as history, travel, global culture, leadership and professional communication.</p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <Link href="/pages/book-session" className="speech-bubble" style={{ backgroundColor: 'var(--lime)', color: 'var(--black)', display: 'inline-block', fontSize: '1rem', padding: '20px' }}>
                                JOIN THE ATELIER! / BOOK A FREE SESSION HERE <span className="hand-cursor" style={{ fontSize: '1.5rem' }}>👆</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="bottom-nav">
                    <Link href="/">← return</Link>
                    <Link href="/">Go back to the main page</Link>
                </div>
            </div>
        </main>
    );
}
