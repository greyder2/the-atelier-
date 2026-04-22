"use client";

import React from 'react';
import Link from 'next/link';

export default function InsightsPage() {
    return (
        <main className="page active bg-[#FAF7F0]" style={{ backgroundColor: '#FAF7F0', minHeight: '100vh' }}>
            <div className="subpage-container" style={{ padding: '60px 8%', maxWidth: '1400px', margin: '0 auto', position: 'relative' }}>
                <div style={{ height: '12px', backgroundColor: '#C8006A', width: '100%', position: 'absolute', top: 0, left: 0 }}></div>
                
                <h2 className="subpage-title cursive text-[#C8006A] text-7xl mb-12 font-['Pacifico']">Atelier Insights</h2>

                <div className="responsive-grid split-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
                    {/* Left: Text Info */}
                    <div className="insights-info space-y-8">
                        <div style={{ fontStyle: 'italic', fontSize: '1.5rem', fontWeight: 'bold' }}>The Official Journal</div>
                        <p className="text-xl font-bold leading-relaxed text-black uppercase">
                            OUR OFFICIAL JOURNAL COVERING ADVANCED TOPICS ON LANGUAGE LEARNING, GLOBAL COMMUNICATION, CULTURAL INTELLIGENCE, WOMEN IN HISTORY, AND PROFESSIONAL DEVELOPMENT.
                        </p>
                        <button className="btn-pill bg-[#C8006A] text-white py-4 px-10 rounded-full font-black no-underline inline-block shadow-lg hover:scale-105 transition-transform uppercase pulse">
                            ACCESS JOURNAL HERE
                        </button>
                    </div>

                    {/* Right: Retro Browser Viewer */}
                    <div className="insights-browser border-8 border-[#C8006A] rounded-[24px] overflow-hidden bg-white shadow-2xl">
                        <div className="bg-[#F4A7C3] p-4 border-b-8 border-[#C8006A] flex gap-3 text-[#C8006A] font-black items-center">
                            <span>x</span> <span>□</span> <span className="flex-1">—</span>
                            <span className="text-xs opacity-60">journal_index.html</span>
                        </div>
                        <div className="h-[400px] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}></div>
                        <div className="p-6 bg-white border-t-4 border-[#C8006A]">
                             <div className="flex justify-between items-center">
                                <Link href="#" className="font-bold underline text-[#C8006A]">Next Issue →</Link>
                                <span className="text-xs opacity-40">Issue #24 - 2026</span>
                             </div>
                        </div>
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
