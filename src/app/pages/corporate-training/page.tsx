"use client";

import React from 'react';
import Link from 'next/link';

export default function CorporatePage() {
    return (
        <main className="page active bg-cream">
            <div className="subpage-container">
                <div className="breadcrumb" style={{ marginTop: '20px' }}>Programs / Services</div>
                <div className="responsive-grid split-layout">
                    <div className="left-col staggered-left">
                        <h2 className="subpage-title cursive title-black" style={{ marginTop: '0' }}>Corporate<br/>Language<br/>Training</h2>
                    </div>
                    <div className="right-col staggered-card">
                        <div className="card card-mint" style={{ marginBottom: '20px' }}>
                            <p style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '15px' }}>We design customized language training programs for international companies seeking to strengthen communication across global teams.</p>
                            <p style={{ fontWeight: 700 }}>Programs can include:<br/>★ Professional English for international collaboration<br/>★ Industry-specific vocabulary<br/>★ Presentation and communication training<br/>★ Leadership communication skills</p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <Link href="/pages/book-session" className="speech-bubble" style={{ backgroundColor: 'var(--hot-pink)', color: 'var(--white)', display: 'inline-block', fontSize: '1rem', padding: '20px' }}>
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
