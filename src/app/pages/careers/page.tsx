"use client";

import React from 'react';
import Link from 'next/link';

export default function CareersPage() {
    return (
        <main className="page active bg-[#FAF7F0]" style={{ backgroundColor: '#FAF7F0', minHeight: '100vh' }}>
            <div className="subpage-container" style={{ padding: '60px 8%', maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
                <div style={{ height: '12px', backgroundColor: '#C8006A', width: '100%', position: 'absolute', top: 0, left: 0 }}></div>
                
                <h2 className="subpage-title cursive text-[#111] text-7xl mb-12 font-['Pacifico']">Careers at the Atelier</h2>

                <div className="card bg-white p-16 rounded-[24px] shadow-2xl border-4 border-[#C8006A] text-center max-w-[900px] mx-auto">
                    <h3 className="font-['Pacifico'] text-5xl mb-8 text-[#C8006A]">Join us</h3>
                    <p className="text-xl font-bold italic mb-12 leading-relaxed text-black uppercase">
                        WE ARE ALWAYS LOOKING TO CONNECT WITH TALENTED PEOPLE. IF YOU SHARE OUR PASSION FOR LANGUAGE EDUCATION, CULTURAL INTELLIGENCE, AND EMPOWERING PROFESSIONALS GLOBALLY, WE WOULD LOVE TO HEAR FROM YOU. SEND US YOUR CV AND A BRIEF INTRODUCTION TO:
                    </p>
                    <a href="mailto:theenglishateliere@gmail.com" className="btn-pill bg-[#C8006A] text-white py-6 px-12 rounded-full font-black no-underline inline-block shadow-lg hover:scale-105 transition-transform uppercase text-2xl pulse">
                        theenglishateliere@gmail.com
                    </a>
                </div>

                <div className="bottom-nav flex justify-between mt-20">
                    <Link href="/" style={{ color: '#C8006A', fontWeight: 'bold', fontStyle: 'italic', textDecoration: 'underline' }}>← return</Link>
                    <Link href="/" style={{ color: '#C8006A', fontWeight: 'bold', fontStyle: 'italic', textDecoration: 'underline' }}>Go back to the main page</Link>
                </div>
            </div>
        </main>
    );
}
