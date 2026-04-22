"use client";

import React from 'react';
import Link from 'next/link';

export default function MayanPage() {
    return (
        <main className="page active bg-hot-pink">
            <div className="subpage-container">
                <h2 className="subpage-title cursive title-black">Mayan</h2>
                <div className="responsive-grid split-layout" style={{ marginTop: '0px' }}>
                    <div className="left-col staggered-left">
                        <div className="retro-browser profile-browser">
                            <div className="retro-header"><span>x</span> <span>□</span> <span>—</span></div>
                            <img src="/pages/Mayan.png" alt="Mayan" style={{ width: '100%', display: 'block', borderBottom: '4px solid var(--hot-pink)' }} />
                            <div className="retro-nav"><span className="btn-pill btn-pink btn-sm">&lt; &gt;</span></div>
                        </div>
                    </div>
                    <div className="right-col staggered-card text-pink-page-body">
                        <h3 className="white-italic-heading">BEHIND THE ATELIER</h3>
                        <p>MAYAN IS THE FOUNDER OF THE ATELIER, A LANGUAGE & CAREER DEVELOPMENT STUDIO CREATED FOR CURIOUS, AMBITIOUS PEOPLE WHO WANT TO DEVELOP THEIR VOICE IN AN INTERNATIONAL WORLD.<br/><br/>
                        SHE STUDIED FOOD ENGINEERING AT THE NATIONAL AUTONOMOUS UNIVERSITY OF MEXICO (UNAM) AND BEGAN HER PROFESSIONAL CAREER AS A NEXT GEN TRAINEE AT PEPSICO, WHERE SHE WORKED IN GLOBAL CORPORATE ROLES INCLUDING ENVIRONMENTAL, HEALTH & SAFETY AND LATER PROCUREMENT GOVERNANCE AT THE COMPANY'S MEXICO HEADQUARTERS. HER WORK FOCUSED ON CORPORATE STANDARDS, COMPLIANCE STRUCTURES, AND GLOBAL OPERATIONAL ALIGNMENT—EXPERIENCES THAT SHAPED HER ANALYTICAL THINKING AND STRATEGIC COMMUNICATION SKILLS.<br/><br/>
                        ALONGSIDE HER CORPORATE CAREER, MAYAN HAS ALWAYS BEEN PASSIONATE ABOUT LANGUAGES AND CULTURAL EXCHANGE. SHE SPEAKS SPANISH AND ENGLISH FLUENTLY, STUDIED ITALIAN, PORTUGUESE AND GERMAN DURING UNIVERSITY, AND IS ALSO EXPLORING FRENCH AND TURKISH AS PART OF HER BROADER INTEREST IN INTERNATIONAL CULTURES AND COMMUNICATION.<br/><br/>
                        HER TEACHING APPROACH IS INSPIRED BY THE BERLITZ METHOD, FOCUSING ON CONVERSATION, CRITICAL THINKING, AND REAL-WORLD TOPICS RATHER THAN TRADITIONAL MEMORIZATION. THROUGH THE ATELIER, SHE DESIGNS PERSONALIZED PROGRAMS WHERE LANGUAGE BECOMES A TOOL TO DISCUSS IDEAS, CAREERS, CULTURE, TRAVEL, AND GLOBAL PERSPECTIVES.<br/><br/>
                        AFTER LEAVING THE CORPORATE WORLD TO LIVE ABROAD AND PURSUE A MORE INTERNATIONAL LIFESTYLE, SHE FOUNDED THE ATELIER WITH A SIMPLE IDEA: LANGUAGE LEARNING SHOULD FEEL INTELLECTUALLY STIMULATING, CULTURALLY RICH, AND DEEPLY HUMAN.<br/><br/>
                        TODAY, THE ATELIER BRINGS TOGETHER WOMEN FROM DIFFERENT COUNTRIES AND PROFESSIONAL PATHS WHO SHARE CURIOSITY ABOUT THE WORLD AND THE AMBITION TO GROW BEYOND BORDERS.</p>
                    </div>
                </div>
                <div className="bottom-nav">
                    <Link href="/pages/about-us">← return</Link>
                    <Link href="/">Go back to the main page</Link>
                </div>
            </div>
        </main>
    );
}
