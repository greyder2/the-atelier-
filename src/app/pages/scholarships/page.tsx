import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Scholarships & Grants',
  description: 'The Atelier grants support highly motivated students with financial assistance for language learning programs. Apply for a scholarship today.',
};

export default function ScholarshipsPage() {
    return (
        <main className="page active bg-[#9D174D]" style={{ backgroundColor: '#9D174D', minHeight: '100vh' }}>
            <div className="subpage-container" style={{ padding: '60px 8%', maxWidth: '1400px', margin: '0 auto', position: 'relative' }}>
                <div style={{ height: '12px', backgroundColor: 'white', width: '100%', position: 'absolute', top: 0, left: 0 }}></div>
                
                <h2 className="subpage-title cursive text-white text-7xl mb-12 font-[family-name:var(--font-cormorant)]">Scholarships / Grants</h2>

                <div className="responsive-grid split-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'center' }}>
                    {/* Left: Info Card */}
                    <div className="card bg-white p-12 rounded-[24px] shadow-2xl border-4 border-black">
                        <h3 className="font-[family-name:var(--font-cormorant)] text-4xl mb-6 text-[#9D174D]">The Atelier Grants</h3>
                        <p className="text-xl font-bold italic mb-8 leading-relaxed text-black uppercase">
                            WE BELIEVE IN SUPPORTING HIGHLY MOTIVATED STUDENTS. OUR GRANTS COVER A SIGNIFICANT PERCENTAGE OF PROGRAMS FOR LANGUAGE LEARNERS WHO DEMONSTRATE COMMITMENT AND PASSION.
                        </p>
                        <Link href="/pages/book-session" className="btn-pill bg-[#9D174D] text-white py-4 px-10 rounded-full font-black no-underline inline-block shadow-lg hover:scale-105 transition-transform uppercase">
                            Apply for a grant now
                        </Link>
                    </div>

                    {/* Right: CSS Star */}
                    <div className="star-container flex justify-center items-center relative py-20">
                         <div className="star-shape w-[400px] h-[400px] bg-[#FDF2F8] flex flex-col justify-center items-center text-center p-5 shadow-2xl animate-[spin_20s_linear_infinite]" 
                                 style={{ clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" }}>
                                <div className="font-[family-name:var(--font-cormorant)] text-[#9D174D] text-3xl">Atelier</div>
                                <div className="font-black text-5xl text-black">Grants</div>
                                <div className="text-[12px] italic text-black uppercase max-w-[150px] font-black mt-2">Scholarships with purpose</div>
                        </div>
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
