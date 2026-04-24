import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Corporate Language Training',
  description: 'Customized English language training programs for international companies. Professional English, industry-specific vocabulary, presentation training, and leadership communication.',
};

export default function CorporateTrainingPage() {
    return (
        <main className="page active bg-[#A8DDD8]" style={{ backgroundColor: '#A8DDD8', minHeight: '100vh' }}>
            <div className="subpage-container" style={{ padding: '60px 8%', maxWidth: '1400px', margin: '0 auto', position: 'relative' }}>
                <div style={{ height: '12px', backgroundColor: 'white', width: '100%', position: 'absolute', top: 0, left: 0 }}></div>
                
                <h2 className="subpage-title cursive text-black text-7xl mb-12 font-[family-name:var(--font-cormorant)]">Corporate<br/>Language Training</h2>

                <div className="responsive-grid split-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
                    {/* Left: Detailed Program Card */}
                    <div className="card bg-white p-12 rounded-[24px] shadow-2xl border-4 border-black">
                        <h3 className="font-[family-name:var(--font-cormorant)] text-3xl mb-6 text-[#C8006A]">International Collaboration</h3>
                        <p className="text-xl font-bold mb-8 leading-relaxed text-black italic uppercase">
                            WE DESIGN CUSTOMIZED LANGUAGE TRAINING PROGRAMS FOR INTERNATIONAL COMPANIES SEEKING TO STRENGTHEN COMMUNICATION ACROSS GLOBAL TEAMS.
                        </p>
                        <div className="space-y-4 font-black">
                            <div className="flex items-center gap-3"><span className="text-[#C8006A]">★</span> PROFESSIONAL ENGLISH</div>
                            <div className="flex items-center gap-3"><span className="text-[#C8006A]">★</span> INDUSTRY-SPECIFIC VOCABULARY</div>
                            <div className="flex items-center gap-3"><span className="text-[#C8006A]">★</span> PRESENTATION TRAINING</div>
                            <div className="flex items-center gap-3"><span className="text-[#C8006A]">★</span> LEADERSHIP COMMUNICATION</div>
                        </div>
                    </div>

                    {/* Right: Interaction Area */}
                    <div className="flex flex-col items-center justify-center space-y-10">
                        <div className="bg-[#FAF7F0] p-12 rounded-[30px] border-4 border-black shadow-2xl">
                             <h3 className="text-2xl font-black mb-6 text-center">Ready to scale?</h3>
                             <Link href="/pages/corporate-quotation" className="btn-pill bg-[#C8006A] text-white py-5 px-10 rounded-full font-black no-underline block text-center shadow-lg hover:bg-black transition-all uppercase">
                                Get a Customized Quotation
                             </Link>
                        </div>

                        <Link href="/pages/book-session" className="btn-pill bg-[#D9F060] text-black p-10 rounded-full font-black text-center text-2xl shadow-[8px_8px_0px_#000] hover:scale-105 transition-transform no-underline pulse uppercase">
                           Book Demo Session
                        </Link>
                        <div className="hand-cursor text-6xl animate-bounce">👆</div>
                    </div>
                </div>

                <div className="bottom-nav flex justify-between mt-20">
                    <Link href="/" style={{ color: 'black', fontWeight: 'bold', fontStyle: 'italic', textDecoration: 'underline' }}>← return</Link>
                    <Link href="/" style={{ color: 'black', fontWeight: 'bold', fontStyle: 'italic', textDecoration: 'underline' }}>Go back to the main page</Link>
                </div>
            </div>
        </main>
    );
}
