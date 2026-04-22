"use client";

import React from 'react';
import Link from 'next/link';

export default function PrivateCoachingPage() {
    return (
        <main className="page active bg-[#FAF7F0]" style={{ backgroundColor: '#FAF7F0', minHeight: '100vh' }}>
            <div className="subpage-container" style={{ padding: '60px 8%', maxWidth: '1400px', margin: '0 auto', position: 'relative' }}>
                <div style={{ height: '12px', backgroundColor: '#C8006A', width: '100%', position: 'absolute', top: 0, left: 0 }}></div>
                
                <h2 className="subpage-title cursive text-[#111] text-7xl mb-12 font-['Pacifico']">Private<br/>Coaching</h2>

                <div className="responsive-grid split-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
                    {/* Left: Detailed Program Card */}
                    <div className="card bg-white p-12 rounded-[24px] shadow-2xl border-4 border-[#C8006A]">
                        <h3 className="font-['Pacifico'] text-3xl mb-6 text-[#C8006A]">Personalized Mentoring</h3>
                        <p className="text-lg font-bold mb-8 leading-relaxed text-black italic uppercase">
                            IDEAL FOR PROFESSIONALS, STUDENTS AND INDIVIDUALS SEEKING FOCUSED GUIDANCE AND RAPID PROGRESS.
                        </p>
                        <ul className="list-none space-y-4 font-black text-black">
                            <li>★ PROFESSIONAL ENGLISH</li>
                            <li>★ CONVERSATION & FLUENCY</li>
                            <li>★ PRONUNCIATION</li>
                            <li>★ INTERVIEW PREPARATION</li>
                            <li>★ LEADERSHIP COMMUNICATION SKILLS</li>
                        </ul>
                    </div>

                    {/* Right: Interaction Area */}
                    <div className="flex flex-col items-center justify-center space-y-10">
                        <div className="retro-browser w-full max-w-[500px] border-4 border-black rounded-xl overflow-hidden shadow-2xl">
                             <div className="bg-black p-2 flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#C8006A]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#D9F060]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#A8DDD8]"></div>
                             </div>
                             <div className="p-8 bg-[#A8DDD8] text-black font-bold italic text-center">
                                "The Atelier is where language becomes an art form."
                             </div>
                        </div>

                        <Link href="/pages/book-session" className="speech-bubble bg-[#C8006A] text-white p-10 rounded-[28px] rounded-br-0 font-black text-center text-xl shadow-[6px_6px_0px_#000] hover:scale-105 transition-transform no-underline pulse">
                            JOIN THE ATELIER!<br/>
                            BOOK A FREE SESSION HERE
                        </Link>
                        <div className="hand-cursor text-5xl animate-bounce">👆</div>
                    </div>
                </div>

                <div className="bottom-nav flex justify-between mt-20">
                    <Link href="/" style={{ color: '#C8006A', fontWeight: 'bold', fontStyle: 'italic', textDecoration: 'underline' }}>← return</Link>
                    <Link href="/" style={{ color: '#C8006A', fontWeight: 'bold', fontStyle: 'italic', textDecoration: 'underline' }}>Go back to the main page</Link>
                </div>
            </div>
        </main>
    );
}
