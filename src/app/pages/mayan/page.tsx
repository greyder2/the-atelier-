"use client";

import React from 'react';
import Link from 'next/link';

export default function MayanPage() {
    return (
        <main className="page active" style={{ backgroundColor: '#C8006A', minHeight: '100vh', padding: '12px 0', position: 'relative' }}>
            <div style={{ height: '12px', backgroundColor: '#C8006A', width: '100%', position: 'absolute', top: 0, left: 0 }}></div>
            
            <div className="subpage-container" style={{ padding: '60px 8%', maxWidth: '1400px', margin: '0 auto' }}>
                <h2 className="subpage-title cursive" style={{ fontFamily: "'Pacifico', cursive", fontSize: '5rem', color: '#111111', marginBottom: '40px', lineHeight: '1' }}>Mayan</h2>
                
                <div className="responsive-grid grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-16 items-start">
                    {/* Left: High-Fidelity Retro Browser with Mayan Photo */}
                    <div className="left-col sticky top-10">
                         <div className="retro-browser shadow-[20px_20px_0px_#000] border-8 border-white rounded-[40px] overflow-hidden bg-white transform -rotate-1">
                            <div className="retro-header bg-white border-b-8 border-[#C8006A] p-4 flex gap-3">
                                <div className="w-4 h-4 rounded-full border-2 border-[#C8006A]"></div>
                                <div className="w-4 h-4 rounded-full border-2 border-[#C8006A]"></div>
                                <div className="w-4 h-4 rounded-full border-2 border-[#C8006A]"></div>
                            </div>
                            <div className="aspect-[4/5] bg-cover bg-center" style={{ backgroundImage: "url('/pages/Mayan.png')" }}></div>
                            <div className="bg-white p-4 font-black text-center text-[#C8006A] border-t-8 border-[#C8006A] uppercase tracking-widest text-sm italic">
                                &lt; Founder _ The Atelier &gt;
                            </div>
                        </div>
                    </div>

                    {/* Right: Text Block */}
                    <div className="right-col space-y-10">
                        <div className="category-tag inline-block bg-[#D9F060] text-black px-6 py-2 rounded-full font-black text-sm uppercase tracking-tighter transform rotate-2">
                            BEHIND THE ATELIER
                        </div>
                        
                        <div className="text-pink-page-body space-y-8" style={{ color: 'white', textTransform: 'uppercase', fontSize: '1rem', fontWeight: '900', lineHeight: '1.8', letterSpacing: '0.05em' }}>
                            <p>
                                MAYAN IS THE FOUNDER OF THE ATELIER, A LANGUAGE & CAREER DEVELOPMENT STUDIO CREATED FOR CURIOUS, AMBITIOUS PEOPLE WHO WANT TO DEVELOP THEIR VOICE IN AN INTERNATIONAL WORLD.
                            </p>
                            <p>
                                SHE STUDIED FOOD ENGINEERING AT THE NATIONAL AUTONOMOUS UNIVERSITY OF MEXICO (UNAM) AND BEGAN HER PROFESSIONAL CAREER AS A NEXT GEN TRAINEE AT PEPSICO, WHERE SHE WORKED IN GLOBAL CORPORATE ROLES INCLUDING ENVIRONMENTAL, HEALTH & SAFETY AND LATER PROCUREMENT GOVERNANCE AT THE COMPANY'S MEXICO HEADQUARTERS. HER WORK FOCUSED ON CORPORATE STANDARDS, COMPLIANCE STRUCTURES, AND GLOBAL OPERATIONAL ALIGNMENT—EXPERIENCES THAT SHAPED HER ANALYTICAL THINKING AND STRATEGIC COMMUNICATION SKILLS.
                            </p>
                            <p>
                                ALONGSIDE HER CORPORATE CAREER, MAYAN HAS ALWAYS BEEN PASSIONATE ABOUT LANGUAGES AND CULTURAL EXCHANGE. SHE SPEAKS SPANISH AND ENGLISH FLUENTLY, STUDIED ITALIAN, PORTUGUESE AND GERMAN DURING UNIVERSITY, AND IS ALSO EXPLORING FRENCH AND TURKISH AS PART OF HER BROADER INTEREST IN INTERNATIONAL CULTURES AND COMMUNICATION.
                            </p>
                            <p>
                                HER TEACHING APPROACH IS INSPIRED BY THE BERLITZ METHOD, FOCUSING ON CONVERSATION, CRITICAL THINKING, AND REAL-WORLD TOPICS RATHER THAN TRADITIONAL MEMORIZATION. THROUGH THE ATELIER, SHE DESIGNS PERSONALIZED PROGRAMS WHERE LANGUAGE BECOMES A TOOL TO DISCUSS IDEAS, CAREERS, CULTURE, TRAVEL, AND GLOBAL PERSPECTIVES.
                            </p>
                            <p>
                                AFTER LEAVING THE CORPORATE WORLD TO LIVE ABROAD AND PURSUE A MORE INTERNATIONAL LIFESTYLE, SHE FOUNDED THE ATELIER WITH A SIMPLE IDEA: LANGUAGE LEARNING SHOULD FEEL INTELLECTUALLY STIMULATING, CULTURALLY RICH, AND DEEPLY HUMAN.
                            </p>
                            <p>
                                TODAY, THE ATELIER BRINGS TOGETHER WOMEN FROM DIFFERENT COUNTRIES AND PROFESSIONAL PATHS WHO SHARE CURIOSITY ABOUT THE WORLD AND THE AMBITION TO GROW BEYOND BORDERS.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bottom-nav flex justify-between mt-32 border-t-4 border-black/10 pt-10">
                    <Link href="/pages/about-us" className="text-black font-black italic underline text-xl hover:text-white transition-colors uppercase tracking-tighter">← return</Link>
                    <Link href="/" className="text-black font-black italic underline text-xl hover:text-white transition-colors uppercase tracking-tighter">Go back to the main page</Link>
                </div>
            </div>
        </main>
    );
}
