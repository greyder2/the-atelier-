"use client";

import React from 'react';
import Link from 'next/link';

export default function SubscriptionsPage() {
    return (
        <main className="page active bg-[#C8006A]" style={{ backgroundColor: '#C8006A', minHeight: '100vh' }}>
            <div className="subpage-container" style={{ padding: '60px 8%', maxWidth: '1400px', margin: '0 auto', position: 'relative' }}>
                <div style={{ height: '12px', backgroundColor: 'white', width: '100%', position: 'absolute', top: 0, left: 0 }}></div>
                
                <h2 className="subpage-title cursive text-white text-7xl mb-12 font-['Pacifico']">Atelier<br/>Subscriptions</h2>

                <div className="responsive-grid split-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
                    {/* Left: Program Overview */}
                    <div className="card bg-white p-12 rounded-[24px] shadow-2xl border-4 border-black">
                        <h3 className="font-['Pacifico'] text-3xl mb-6 text-[#C8006A]">Structured Learning</h3>
                        <p className="text-xl font-bold mb-8 leading-relaxed text-black italic uppercase">
                            OUR SUBSCRIPTION PROGRAMS PROVIDE STRUCTURED, ONGOING LANGUAGE LEARNING THROUGH CATEGORICAL THEMES.
                        </p>
                        <div className="space-y-4">
                            <div className="p-4 bg-[#F4A7C3] rounded-xl font-black text-black">★ HISTORY & GLOBAL CULTURE</div>
                            <div className="p-4 bg-[#D9F060] rounded-xl font-black text-black">★ PROFESSIONAL COMMUNICATION</div>
                            <div className="p-4 bg-[#A8DDD8] rounded-xl font-black text-black">★ LEADERSHIP & TRAVEL</div>
                        </div>
                    </div>

                    {/* Right: Interaction Area */}
                    <div className="flex flex-col items-center justify-center space-y-10">
                        <div className="bg-white p-10 rounded-[30px] border-4 border-black shadow-2xl rotate-2">
                            <p className="text-black font-bold text-lg italic text-center max-w-[400px]">
                                "Students participate in weekly sessions designed to strengthen vocabulary, conversation skills and cultural understanding."
                            </p>
                        </div>

                        <Link href="/pages/book-session" className="btn-pill bg-[#D9F060] text-black p-10 rounded-full font-black text-center text-2xl shadow-[8px_8px_0px_#000] hover:scale-105 transition-transform no-underline pulse uppercase">
                           Enroll in Subscription
                        </Link>
                        <div className="hand-cursor text-6xl animate-bounce">👆</div>
                    </div>
                </div>

                <div className="bottom-nav flex justify-between mt-20">
                    <Link href="/" style={{ color: 'white', fontWeight: 'bold', fontStyle: 'italic', textDecoration: 'underline' }}>← return</Link>
                    <Link href="/" style={{ color: 'white', fontWeight: 'bold', fontStyle: 'italic', textDecoration: 'underline' }}>Go back to the main page</Link>
                </div>
            </div>
        </main>
    );
}
