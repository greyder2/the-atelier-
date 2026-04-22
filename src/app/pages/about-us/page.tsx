"use client";

import React from 'react';
import Link from 'next/link';

export default function AboutUsPage() {
    return (
        <main className="page active bg-[#C8006A]" style={{ backgroundColor: '#C8006A', minHeight: '100vh' }}>
            <div className="subpage-container" style={{ padding: '60px 8%', maxWidth: '1400px', margin: '0 auto', position: 'relative' }}>
                <div style={{ height: '12px', backgroundColor: 'white', width: '100%', position: 'absolute', top: 0, left: 0 }}></div>
                
                <div className="responsive-grid split-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginTop: '40px' }}>
                    {/* Left Card: OUR STORY */}
                    <div className="card bg-[#F4A7C3] p-10 rounded-[24px] text-center shadow-2xl border-4 border-black">
                        <h3 style={{ fontWeight: 900, fontSize: '2.5rem', marginBottom: '20px', color: '#111' }}>OUR STORY</h3>
                        <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#111', fontWeight: 'bold', textTransform: 'uppercase' }}>
                            THE ATELIER IS A BOUTIQUE LANGUAGE AND CAREER DEVELOPMENT STUDIO DEDICATED TO TEACHING THROUGH CULTURE, CONVERSATION, AND INTELLECTUAL CURIOSITY.<br/><br/>
                            FOUNDED WITH THE BELIEF THAT LANGUAGE LEARNING SHOULD BE INSPIRING AND MEANINGFUL, THE ATELIER COMBINES TRADITIONAL LANGUAGE EDUCATION WITH GLOBAL CULTURE, HISTORY, AND CONTEMPORARY TOPICS.<br/><br/>
                            OUR MISSION IS TO HELP STUDENTS AND PROFESSIONALS DEVELOP NOT ONLY LINGUISTIC FLUENCY, BUT ALSO CONFIDENCE, CULTURAL AWARENESS, AND THE ABILITY TO COMMUNICATE THOUGHTFULLY IN AN INTERNATIONAL ENVIRONMENT.
                        </p>
                    </div>

                    {/* Right Card: OUR PHILOSOPHY */}
                    <div className="card bg-[#D9F060] p-10 rounded-[24px] text-center shadow-2xl border-4 border-black">
                        <h3 style={{ fontWeight: 900, fontSize: '2.5rem', marginBottom: '20px', color: '#111' }}>OUR PHILOSOPHY</h3>
                        <p style={{ marginBottom: '20px', fontWeight: 'bold', fontSize: '1.2rem', textTransform: 'uppercase' }}>WE BELIEVE LANGUAGE LEARNING SHOULD BE:<br/>★ CURIOUS ★ CULTURAL ★ INTELLECTUAL ★ PRACTICAL ★ HUMAN ★</p>
                        <p style={{ marginBottom: '20px', fontSize: '1.1rem', lineHeight: '1.6', textTransform: 'uppercase', fontWeight: 'bold' }}>INSTEAD OF MEMORIZING ENDLESS GRAMMAR RULES, STUDENTS LEARN THROUGH CONVERSATIONS, IDEAS, GLOBAL PERSPECTIVES AND MEANINGFUL DISCUSSIONS.</p>
                        <p style={{ marginBottom: '40px', fontSize: '1.1rem', textTransform: 'uppercase', fontWeight: 'bold' }}>LANGUAGE BECOMES A BRIDGE TO UNDERSTANDING THE WORLD.</p>
                        
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <Link href="/pages/mayan" className="btn-pill" style={{ backgroundColor: '#A8DDD8', color: '#111111', textDecoration: 'none', padding: '14px 36px', borderRadius: '50px', fontWeight: 'bold', display: 'inline-block', boxShadow: '0 4px 0px #000' }}>
                                DISCOVER THE FOUNDER HERE!
                            </Link>
                            <span className="hand-cursor" style={{ marginLeft: '10px', fontSize: '2rem', display: 'inline-block', animation: 'bounce 1s infinite alternate' }}>👈</span>
                        </div>
                    </div>
                </div>

                <div className="bottom-nav" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '40px' }}>
                    <Link href="/" style={{ color: 'white', fontWeight: 'bold', fontStyle: 'italic', textDecoration: 'underline' }}>← return</Link>
                    <Link href="/" style={{ color: 'white', fontWeight: 'bold', fontStyle: 'italic', textDecoration: 'underline' }}>Go back to the main page</Link>
                </div>
            </div>
        </main>
    );
}
