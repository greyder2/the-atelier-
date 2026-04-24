import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join The Atelier team. We are looking for talented professionals passionate about language education, cultural intelligence, and empowering global voices.',
};

export default function CareersPage() {
    return (
        <main className="page active bg-[#FAF7F0]" style={{ backgroundColor: '#FAF7F0', minHeight: '100vh' }}>
            <div className="subpage-container" style={{ padding: '60px 8%', maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
                <div style={{ height: '12px', backgroundColor: '#C8006A', width: '100%', position: 'absolute', top: 0, left: 0 }}></div>
                
                <h2 className="subpage-title cursive text-[#111] text-[5rem] mb-12 font-[family-name:var(--font-cormorant)] leading-tight">Careers at the Atelier</h2>

                <div className="responsive-grid grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="left-col staggered-left">
                         <div className="card bg-white p-12 rounded-[40px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border-4 border-[#C8006A] relative">
                            <div className="absolute -top-6 -left-6 bg-[#D9F060] text-black font-black px-6 py-2 rounded-full shadow-lg transform -rotate-3 uppercase tracking-tighter">
                                Now Hiring
                            </div>
                            <h3 className="font-[family-name:var(--font-cormorant)] text-4xl mb-6 text-[#C8006A]">Join our team</h3>
                            <p className="text-xl font-bold italic mb-8 leading-relaxed text-black uppercase tracking-tight">
                                WE ARE ALWAYS LOOKING TO CONNECT WITH TALENTED PROFESSIONALS. IF YOU SHARE OUR PASSION FOR LANGUAGE EDUCATION, CULTURAL INTELLIGENCE, AND EMPOWERING GLOBAL VOICES, WE WOULD LOVE TO HEAR FROM YOU.
                            </p>
                            <p className="text-lg opacity-70 font-bold mb-8 italic">
                                We value diversity, creativity, and a results-driven mindset in an international environment.
                            </p>
                            <div className="border-t-2 border-black/5 pt-8">
                                <span className="block text-xs font-black opacity-40 uppercase tracking-widest mb-4">Application Email</span>
                                <a href="mailto:theenglishateliere@gmail.com" className="text-[#C8006A] font-black text-2xl underline hover:text-black transition-colors">
                                    theenglishateliere@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="right-col staggered-card text-center space-y-10">
                        <div className="bg-[#A8DDD8] p-10 rounded-[30px] shadow-xl transform rotate-2">
                            <p className="text-black font-black text-2xl uppercase tracking-tighter">
                                "Shaping the future of global communication, one voice at a time."
                            </p>
                        </div>
                        <Link href="/pages/contact" className="btn-pill bg-[#C8006A] text-white py-6 px-12 rounded-full font-black no-underline inline-block shadow-[6px_6px_0px_#000] hover:translate-x-1 hover:translate-y-1 transition-all uppercase text-2xl pulse">
                            Contact HR Dept
                        </Link>
                    </div>
                </div>

                <div className="bottom-nav flex justify-between mt-32">
                    <Link href="/" className="text-[#C8006A] font-black italic underline text-xl hover:text-black transition-colors uppercase">← return</Link>
                    <Link href="/" className="text-[#C8006A] font-black italic underline text-xl hover:text-black transition-colors uppercase">Go back to the main page</Link>
                </div>
            </div>
        </main>
    );
}
