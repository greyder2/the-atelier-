"use client";

import React from 'react';
import Link from 'next/link';

export default function ContactPage() {
    return (
        <main className="page active bg-[#C8006A]" style={{ backgroundColor: '#C8006A', minHeight: '100vh' }}>
            <div className="subpage-container" style={{ padding: '60px 8%', maxWidth: '1400px', margin: '0 auto', position: 'relative' }}>
                <div style={{ height: '12px', backgroundColor: 'white', width: '100%', position: 'absolute', top: 0, left: 0 }}></div>
                
                <h2 className="subpage-title cursive text-white text-[5rem] mb-12 font-['Pacifico'] leading-tight">Reach out</h2>

                <div className="responsive-grid grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
                    {/* Left: Contact Info */}
                    <div className="contact-info text-white space-y-12">
                        <div>
                            <div className="font-black opacity-60 uppercase text-xs tracking-[0.2em] mb-4">PHONE & WHATSAPP</div>
                            <p className="text-3xl font-black italic mb-2 tracking-tight">Worldwide:<br/><a href="tel:+525521131676" className="underline hover:text-[#D9F060] transition-colors">(+52) 552 113 1676</a></p>
                            <p className="text-3xl font-black italic tracking-tight mt-6">Mexico Center:<br/><a href="tel:+525617592347" className="underline hover:text-[#D9F060] transition-colors">(+52) 561 759 2347</a></p>
                        </div>
                        
                        <div>
                            <div className="font-black opacity-60 uppercase text-xs tracking-[0.2em] mb-4">OFFICIAL EMAIL</div>
                            <p><a href="mailto:theenglishateliere@gmail.com" className="text-3xl underline italic font-black hover:text-[#D9F060] transition-colors tracking-tight">theenglishateliere@gmail.com</a></p>
                        </div>

                        <div className="pt-8">
                             <div className="font-black opacity-60 uppercase text-xs tracking-[0.2em] mb-4">LOCATION</div>
                             <p className="text-xl font-bold italic">MEXICO CITY / GLOBAL ONLINE</p>
                        </div>
                    </div>

                    {/* Middle: Mockup Phone - Instagram Style */}
                    <div className="mockup-phone w-[300px] h-[600px] border-[12px] border-white rounded-[50px] mx-auto relative bg-[#FAF7F0] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140px] h-[30px] bg-white rounded-b-3xl z-10"></div>
                        <div className="pt-16 text-black text-center px-6">
                            <div className="w-28 h-28 bg-[#C8006A] rounded-full mx-auto mb-6 overflow-hidden border-4 border-white shadow-xl">
                                <img src="/pages/gaby.png" alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            <div className="font-black text-2xl mb-1 tracking-tighter">theatelier.lab</div>
                            <div className="text-[10px] opacity-40 font-black mb-6 uppercase tracking-widest">Boutique Language Studio</div>
                            
                            <div className="flex justify-around mb-8 text-[11px] font-black border-y border-black/5 py-4">
                                <div className="leading-tight"><strong>124</strong><br/><span className="opacity-40">posts</span></div>
                                <div className="leading-tight"><strong>24K</strong><br/><span className="opacity-40">followers</span></div>
                                <div className="leading-tight"><strong>0</strong><br/><span className="opacity-40">following</span></div>
                            </div>
                            
                            <a href="https://www.instagram.com/theatelier.lab/" target="_blank" rel="noopener noreferrer" 
                               className="block bg-[#C8006A] text-white py-4 rounded-2xl font-black text-xs shadow-lg hover:bg-black transition-all mb-8 no-underline tracking-widest">
                                FOLLOW US
                            </a>
                            
                            <div className="grid grid-cols-3 gap-1">
                                {Array.from({ length: 9 }).map((_, i) => (
                                    <div key={i} className="aspect-square bg-[#F4A7C3] opacity-30 hover:opacity-100 transition-opacity cursor-pointer"></div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Action Buttons */}
                    <div className="flex flex-col gap-10 items-start h-full justify-center">
                        <Link href="/pages/book-session" className="btn-pill bg-[#D9F060] text-black font-black no-underline shadow-[6px_6px_0px_#000] hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all py-6 px-12 rounded-full text-2xl pulse uppercase tracking-tighter">
                            Book Free Session
                        </Link>
                        <Link href="/pages/careers" className="btn-pill bg-white text-[#C8006A] font-black no-underline shadow-[6px_6px_0px_#000] hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all py-6 px-12 rounded-full text-2xl uppercase tracking-tighter">
                            Work With Us
                        </Link>
                        <Link href="/pages/cohorts" className="btn-pill bg-[#F4A7C3] text-black font-black no-underline shadow-[6px_6px_0px_#000] hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all py-6 px-12 rounded-full text-2xl uppercase tracking-tighter">
                            Cohorts 2026
                        </Link>
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
