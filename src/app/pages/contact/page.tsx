"use client";

import React from 'react';
import Link from 'next/link';

export default function ContactPage() {
    return (
        <main className="page active bg-[#C8006A]" style={{ backgroundColor: '#C8006A', minHeight: '100vh' }}>
            <div className="subpage-container" style={{ padding: '60px 8%', maxWidth: '1400px', margin: '0 auto', position: 'relative' }}>
                <div style={{ height: '12px', backgroundColor: 'white', width: '100%', position: 'absolute', top: 0, left: 0 }}></div>
                
                <h2 className="subpage-title cursive text-white text-7xl mb-12 font-['Pacifico']">Reach out</h2>

                <div className="responsive-grid grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                    {/* Left: Contact Info */}
                    <div className="contact-info text-white space-y-10">
                        <div>
                            <div className="font-black opacity-80 uppercase text-sm tracking-widest mb-2">PHONE</div>
                            <p className="text-2xl font-bold italic">Worldwide Contact - WhatsApp:<br/><a href="tel:+525521131676" className="underline hover:text-[#D9F060]">(+52) 552 113 1676</a></p>
                            <p className="text-2xl font-bold italic mt-4">Mexico Call Center:<br/><a href="tel:+525617592347" className="underline hover:text-[#D9F060]">(+52) 561 759 2347</a></p>
                        </div>
                        
                        <div>
                            <div className="font-black opacity-80 uppercase text-sm tracking-widest mb-2">EMAIL</div>
                            <p><a href="mailto:theenglishateliere@gmail.com" className="text-2xl underline italic font-bold hover:text-[#D9F060]">theenglishateliere@gmail.com</a></p>
                        </div>
                    </div>

                    {/* Middle: Mockup Phone */}
                    <div className="mockup-phone w-[280px] h-[550px] border-8 border-white rounded-[45px] mx-auto relative bg-[#FAF7F0] overflow-hidden shadow-2xl">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[25px] bg-white rounded-b-2xl z-10"></div>
                        <div className="pt-12 text-black text-center px-4">
                            <div className="w-24 h-24 bg-[#C8006A] rounded-full mx-auto mb-6 overflow-hidden border-4 border-white shadow-lg">
                                <img src="/pages/gaby.png" alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            <div className="font-black text-xl mb-1">theatelier.lab</div>
                            <div className="text-xs opacity-60 font-bold mb-4 italic">Boutique Language Studio</div>
                            
                            <div className="flex justify-around mb-6 text-xs font-black">
                                <div><strong>124</strong><br/>posts</div>
                                <div><strong>24K</strong><br/>followers</div>
                                <div><strong>0</strong><br/>following</div>
                            </div>
                            
                            <a href="https://www.instagram.com/theatelier.lab/" target="_blank" rel="noopener noreferrer" 
                               className="block bg-[#C8006A] text-white py-3 rounded-xl font-black text-sm shadow-md hover:bg-black transition-all mb-8 no-underline">
                                FOLLOW ON INSTAGRAM
                            </a>
                            
                            <div className="grid grid-cols-3 gap-1">
                                {Array.from({ length: 9 }).map((_, i) => (
                                    <div key={i} className="aspect-square bg-[#F4A7C3] opacity-40 hover:opacity-100 transition-opacity cursor-pointer"></div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Action Buttons */}
                    <div className="flex flex-col gap-8 items-start h-full justify-center">
                        <Link href="/pages/book-session" className="btn-pill bg-[#D9F060] text-black font-black no-underline shadow-xl hover:scale-105 transition-transform py-5 px-10 rounded-full text-xl pulse">
                            BOOK A FREE SESSION
                        </Link>
                        <Link href="/pages/careers" className="btn-pill bg-white text-[#C8006A] font-black no-underline shadow-xl hover:scale-105 transition-transform py-5 px-10 rounded-full text-xl">
                            WORK WITH US
                        </Link>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="btn-pill bg-black text-white no-underline shadow-xl hover:scale-105 transition-transform py-5 px-10 rounded-full text-xl font-black">
                            LINKEDIN Profile
                        </a>
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
