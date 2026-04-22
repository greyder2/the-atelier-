"use client";

import React from 'react';
import Link from 'next/link';

export default function AboutUsPage() {
    return (
        <main className="page active bg-hot-pink" style={{ backgroundColor: '#C8006A', minHeight: '100vh' }}>
            <div className="subpage-container">
                <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center' }}>
                    <div className="retro-browser" style={{ maxWidth: '800px', border: '4px solid #F4A7C3', borderRadius: '12px', overflow: 'hidden', backgroundColor: 'white' }}>
                        <div className="retro-header" style={{ borderBottom: '4px solid #F4A7C3', padding: '6px 12px', display: 'flex', gap: '8px' }}>
                            <span style={{ color: '#F4A7C3' }}>x</span> <span style={{ color: '#F4A7C3' }}>□</span> <span style={{ color: '#F4A7C3' }}>—</span>
                        </div>
                        <img src="/pages/about us.png" alt="About Us" style={{ width: '100%', display: 'block' }} />
                    </div>
                </div>
                
                <div className="responsive-grid split-layout" style={{ marginTop: '0px' }}>
                    {/* Left Card: OUR STORY */}
                    <div className="card card-white staggered-left text-pink-page-body" 
                         style={{ backgroundColor: '#F4A7C3', borderRadius: '24px', textAlign: 'center', color: '#111111', padding: '40px' }}>
                        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 900, fontSize: '2rem', marginBottom: '20px' }}>OUR STORY</h3>
                        <p style={{ textAlign: 'center', fontSize: '0.85rem', textTransform: 'uppercase', fontWeight: 'bold', lineHeight: '1.6' }}>
                            THE ATELIER IS A BOUTIQUE LANGUAGE AND CAREER DEVELOPMENT STUDIO DEDICATED TO TEACHING THROUGH CULTURE, CONVERSATION, AND INTELLECTUAL CURIOSITY.<br/><br/>
                            FOUNDED WITH THE BELIEF THAT LANGUAGE LEARNING SHOULD BE INSPIRING AND MEANINGFUL, THE ATELIER COMBINES TRADITIONAL LANGUAGE EDUCATION WITH GLOBAL CULTURE, HISTORY, AND CONTEMPORARY TOPICS.<br/><br/>
                            OUR MISSION IS TO HELP STUDENTS AND PROFESSIONALS DEVELOP NOT ONLY LINGUISTIC FLUENCY, BUT ALSO CONFIDENCE, CULTURAL AWARENESS, AND THE ABILITY TO COMMUNICATE THOUGHTFULLY IN AN INTERNATIONAL ENVIRONMENT.
                        </p>
                    </div>

                    {/* Right Card: OUR PHILOSOPHY */}
                    <div className="card staggered-card" 
                         style={{ backgroundColor: '#D9F060', borderRadius: '24px', textAlign: 'center', color: '#111111', padding: '40px', fontWeight: 700 }}>
                        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 900, fontSize: '2rem', marginBottom: '20px' }}>OUR PHILOSOPHY</h3>
                        <p style={{ marginBottom: '20px', fontSize: '0.9rem' }}>WE BELIEVE LANGUAGE LEARNING SHOULD BE:<br/>★ CURIOUS ★ CULTURAL ★ INTELLECTUAL ★ PRACTICAL ★ HUMAN ★</p>
                        <p style={{ marginBottom: '20px', fontSize: '0.9rem' }}>INSTEAD OF MEMORIZING ENDLESS GRAMMAR RULES, STUDENTS LEARN THROUGH CONVERSATIONS, IDEAS, GLOBAL PERSPECTIVES AND MEANINGFUL DISCUSSIONS.</p>
                        <p style={{ marginBottom: '40px', fontSize: '0.9rem' }}>LANGUAGE BECOMES A BRIDGE TO UNDERSTANDING THE WORLD.</p>
                        
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <Link href="/pages/mayan" className="btn-pill" style={{ backgroundColor: '#A8DDD8', color: '#111111', textDecoration: 'none', padding: '14px 36px', borderRadius: '50px', fontWeight: 'bold', display: 'inline-block' }}>
                                DISCOVER THE FOUNDER HERE!
                            </Link>
                            <span className="hand-cursor" style={{ marginLeft: '10px', fontSize: '1.5rem' }}>👈</span>
                        </div>
                    </div>
                </div>

                <div className="bottom-nav" style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto', paddingBottom: '20px' }}>
                    <Link href="/" style={{ color: '#111111', fontWeight: 'bold', fontStyle: 'italic', textDecoration: 'underline' }}>← return</Link>
                    <Link href="/" style={{ color: '#111111', fontWeight: 'bold', fontStyle: 'italic', textDecoration: 'underline' }}>Go back to the main page</Link>
                </div>
            </div>
        </main>
    );
}
