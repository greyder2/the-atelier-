"use client";

import React from 'react';
import Link from 'next/link';

export default function MayanPage() {
    return (
        <main className="page active bg-hot-pink" style={{ backgroundColor: '#C8006A', minHeight: '100vh' }}>
            <div className="subpage-container">
                <h2 className="subpage-title" style={{ fontFamily: "'Pacifico', cursive", fontSize: '4rem', color: '#111111', marginTop: '20px' }}>Mayan</h2>
                
                <div className="responsive-grid split-layout" style={{ marginTop: '0px', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '40px' }}>
                    {/* Left: Retro Browser with Mayan Photo */}
                    <div className="left-col staggered-left">
                        <div className="retro-browser" style={{ border: '4px solid #C8006A', borderRadius: '12px', overflow: 'hidden', backgroundColor: 'white' }}>
                            <div className="retro-header" style={{ borderBottom: '4px solid #C8006A', padding: '6px 12px', display: 'flex', gap: '8px' }}>
                                <span style={{ color: '#C8006A' }}>x</span> <span style={{ color: '#C8006A' }}>□</span> <span style={{ color: '#C8006A' }}>—</span>
                            </div>
                            <img src="/pages/Mayan.png" alt="Mayan" style={{ width: '100%', display: 'block' }} />
                            <div className="retro-nav" style={{ padding: '10px', textAlign: 'center' }}>
                                <span className="btn-pill" style={{ backgroundColor: '#C8006A', color: 'white', padding: '6px 20px', borderRadius: '20px', fontSize: '12px' }}>&lt; &gt;</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Text Block */}
                    <div className="right-col staggered-card">
                        <h3 style={{ fontStyle: 'italic', color: 'white', fontSize: '1.5rem', marginBottom: '20px', fontWeight: 'bold' }}>BEHIND THE ATELIER</h3>
                        <p className="text-pink-page-body" style={{ color: 'white', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 'bold', lineHeight: '1.6', letterSpacing: '0.5px' }}>
                            MAYAN IS THE FOUNDER OF THE ATELIER, A LANGUAGE & CAREER DEVELOPMENT STUDIO CREATED FOR CURIOUS, AMBITIOUS PEOPLE WHO WANT TO DEVELOP THEIR VOICE IN AN INTERNATIONAL WORLD.<br/><br/>
                            SHE STUDIED FOOD ENGINEERING AT THE NATIONAL AUTONOMOUS UNIVERSITY OF MEXICO (UNAM) AND BEGAN HER PROFESSIONAL CAREER AS A NEXT GEN TRAINEE AT PEPSICO, WHERE SHE WORKED IN GLOBAL CORPORATE ROLES INCLUDING ENVIRONMENTAL, HEALTH & SAFETY AND LATER PROCUREMENT GOVERNANCE AT THE COMPANY'S MEXICO HEADQUARTERS. HER WORK FOCUSED ON CORPORATE STANDARDS, COMPLIANCE STRUCTURES, AND GLOBAL OPERATIONAL ALIGNMENT—EXPERIENCES THAT SHAPED HER ANALYTICAL THINKING AND STRATEGIC COMMUNICATION SKILLS.<br/><br/>
                            ALONGSIDE HER CORPORATE CAREER, MAYAN HAS ALWAYS BEEN PASSIONATE ABOUT LANGUAGES AND CULTURAL EXCHANGE. SHE SPEAKS SPANISH AND ENGLISH FLUENTLY, STUDIED ITALIAN, PORTUGUESE AND GERMAN DURING UNIVERSITY, AND IS ALSO EXPLORING FRENCH AND TURKISH AS PART OF HER BROADER INTEREST IN INTERNATIONAL CULTURES AND COMMUNICATION.<br/><br/>
                            HER TEACHING APPROACH IS INSPIRED BY THE BERLITZ METHOD, FOCUSING ON CONVERSATION, CRITICAL THINKING, AND REAL-WORLD TOPICS RATHER THAN TRADITIONAL MEMORIZATION. THROUGH THE ATELIER, SHE DESIGNS PERSONALIZED PROGRAMS WHERE LANGUAGE BECOMES A TOOL TO DISCUSS IDEAS, CAREERS, CULTURE, TRAVEL, AND GLOBAL PERSPECTIVES.<br/><br/>
                            AFTER LEAVING THE CORPORATE WORLD TO LIVE ABROAD AND PURSUE A MORE INTERNATIONAL LIFESTYLE, SHE FOUNDED THE ATELIER WITH A SIMPLE IDEA: LANGUAGE LEARNING SHOULD FEEL INTELLECTUALLY STIMULATING, CULTURALLY RICH, AND DEEPLY HUMAN.<br/><br/>
                            TODAY, THE ATELIER BRINGS TOGETHER WOMEN FROM DIFFERENT COUNTRIES AND PROFESSIONAL PATHS WHO SHARE CURIOSITY ABOUT THE WORLD AND THE AMBITION TO GROW BEYOND BORDERS.
                        </p>
                    </div>
                </div>

                <div className="bottom-nav" style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto', paddingBottom: '20px' }}>
                    <Link href="/pages/about-us" style={{ color: '#111111', fontWeight: 'bold', fontStyle: 'italic', textDecoration: 'underline' }}>← return</Link>
                    <Link href="/" style={{ color: '#111111', fontWeight: 'bold', fontStyle: 'italic', textDecoration: 'underline' }}>Go back to the main page</Link>
                </div>
            </div>
        </main>
    );
}
