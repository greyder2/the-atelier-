"use client";

import React from 'react';
import Link from 'next/link';

export default function CohortsPage() {
    return (
        <main className="page active bg-[#FAF7F0]" style={{ backgroundColor: '#FAF7F0', minHeight: '100vh' }}>
            {/* Top Bar Wrapper */}
            <div style={{ height: '12px', backgroundColor: '#C8006A', width: '100%', position: 'fixed', top: 0, left: 0, zIndex: 100 }}></div>
            
            <div className="subpage-container pt-16" style={{ padding: '80px 8%', maxWidth: '1400px', margin: '0 auto', position: 'relative' }}>
                
                {/* Breadcrumb */}
                <div className="breadcrumb mb-4 text-[#111] italic font-bold text-lg">
                    Programs / Services
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-start mt-4">
                    {/* Left Column: Title */}
                    <div className="lg:w-1/3">
                        <h2 className="subpage-title cursive text-[#111] text-7xl font-['Pacifico'] leading-[1.1]">
                            Cohorts &<br/>Special<br/>Programs
                        </h2>
                    </div>

                    {/* Right Column: Content Card */}
                    <div className="lg:w-2/3 relative pt-10">
                        <div className="card bg-[#F4A7C3] p-12 rounded-[40px] shadow-2xl relative z-10">
                            <p className="text-2xl font-bold italic mb-10 leading-relaxed text-black max-w-[500px]">
                                Small group learning experiences designed around unique themes.
                            </p>
                            
                            <div className="space-y-4">
                                <p className="text-xl font-bold italic mb-4">Examples include:</p>
                                <ul className="space-y-4 list-none">
                                    <li className="flex items-center gap-4 text-2xl font-bold italic">
                                        <span className="text-black text-3xl">★</span> Cultural language immersion
                                    </li>
                                    <li className="flex items-center gap-4 text-2xl font-bold italic">
                                        <span className="text-black text-3xl">★</span> Women in history and leadership
                                    </li>
                                    <li className="flex items-center gap-4 text-2xl font-bold italic">
                                        <span className="text-black text-3xl">★</span> Global communication programs
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Speech Bubble CTA */}
                        <div className="absolute -bottom-24 -right-10 z-20 flex flex-col items-center">
                            <Link href="/pages/book-session" className="no-underline group">
                                <div className="bg-[#A8DDD8] p-8 rounded-[40px] rounded-bl-0 shadow-xl border-4 border-white transform hover:scale-105 transition-all relative">
                                    <p className="text-black font-black uppercase text-center text-sm leading-tight">
                                        JOIN THE ATELIER!<br/>
                                        <span className="underline italic">BOOK A FREE SESSION HERE</span>
                                    </p>
                                    {/* Bubble Tail */}
                                    <div className="absolute -bottom-6 left-0 w-0 h-0 border-l-[30px] border-l-transparent border-t-[30px] border-t-[#A8DDD8]"></div>
                                </div>
                            </Link>
                            {/* Animated Hand Cursor */}
                            <div className="hand-cursor text-7xl mt-2 animate-bounce self-end">👈</div>
                        </div>
                    </div>
                </div>

                {/* Bottom Navigation */}
                <div className="bottom-nav flex justify-between mt-40">
                    <Link href="/" className="text-[#D4006A] font-black italic underline text-xl hover:text-black transition-colors uppercase">
                        ← return
                    </Link>
                    <Link href="/" className="text-[#D4006A] font-black italic underline text-xl hover:text-black transition-colors uppercase">
                        Go back to the main page
                    </Link>
                </div>
            </div>
            
            <style jsx>{`
                .cursive { font-family: 'Pacifico', cursive; }
                .hand-cursor { animation: bounce 1s infinite alternate; }
                @keyframes bounce {
                    from { transform: translateY(0); }
                    to { transform: translateY(-10px); }
                }
            `}</style>
        </main>
    );
}
