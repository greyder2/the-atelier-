"use client";

import React from 'react';
import Link from 'next/link';

export default function AboutUsPage() {
    return (
        <main className="page active bg-hot-pink">
            <div className="subpage-container">
                <div className="responsive-grid split-layout" style={{ marginTop: '40px' }}>
                    <div className="card card-white staggered-left text-pink-page-body" style={{ backgroundColor: 'var(--light-pink)', borderRadius: 'var(--radius-card)', textAlign: 'center', color: 'var(--black)' }}>
                        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 900, fontSize: '2rem', marginBottom: '20px' }}>OUR STORY</h3>
                        <p style={{ textAlign: 'center', fontSize: '0.9rem' }}>
                            THE ATELIER IS A BOUTIQUE LANGUAGE AND CAREER DEVELOPMENT STUDIO DEDICATED TO TEACHING THROUGH CULTURE, CONVERSATION, AND INTELLECTUAL CURIOSITY.<br/><br/>
                            FOUNDED WITH THE BELIEF THAT LANGUAGE LEARNING SHOULD BE INSPIRING AND MEANINGFUL, THE ATELIER COMBINES TRADITIONAL LANGUAGE EDUCATION WITH GLOBAL CULTURE, HISTORY, AND CONTEMPORARY TOPICS.<br/><br/>
                            OUR MISSION IS TO HELP STUDENTS AND PROFESSIONALS DEVELOP NOT ONLY LINGUISTIC FLUENCY, BUT ALSO CONFIDENCE, CULTURAL AWARENESS, AND THE ABILITY TO COMMUNICATE THOUGHTFULLY IN AN INTERNATIONAL ENVIRONMENT.
                        </p>
                    </div>
                    <div className="card staggered-card" style={{ backgroundColor: 'var(--lime)', borderRadius: 'var(--radius-card)', textAlign: 'center', color: 'var(--black)', fontWeight: 700 }}>
                        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 900, fontSize: '2rem', marginBottom: '20px' }}>OUR PHILOSOPHY</h3>
                        <p style={{ marginBottom: '20px' }}>WE BELIEVE LANGUAGE LEARNING SHOULD BE:<br/>★ CURIOUS ★ CULTURAL ★ INTELLECTUAL ★ PRACTICAL ★ HUMAN ★</p>
                        <p style={{ marginBottom: '20px' }}>INSTEAD OF MEMORIZING ENDLESS GRAMMAR RULES, STUDENTS LEARN THROUGH CONVERSATIONS, IDEAS, GLOBAL PERSPECTIVES AND MEANINGFUL DISCUSSIONS.</p>
                        <p style={{ marginBottom: '40px' }}>LANGUAGE BECOMES A BRIDGE TO UNDERSTANDING THE WORLD.</p>
                        
                        <Link href="/pages/mayan" className="btn-pill" style={{ backgroundColor: 'var(--mint)', color: 'var(--black)' }}>DISCOVER THE FOUNDER HERE!</Link>
                        <div className="hand-cursor" style={{ marginLeft: '10px' }}>👈</div>
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
