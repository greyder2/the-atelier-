import React from 'react';
import { client } from '../../sanity/lib/client';
import InteractiveClient from './InteractiveClient';
import FloatingEmailPopup from '../components/FloatingEmailPopup';
import Link from 'next/link';
import { firstGeneration, secondGeneration } from '@/data/spotlights';

export const dynamic = 'force-dynamic';

interface Spotlight {
    name: string;
    slug: string;
    category?: string;
}

const slugToImageFile: Record<string, string> = {
  'sefika-buse': 'sefika buse',
  'maria-fernanda': 'maria fernanda',
}
function getImagePath(slug: string): string {
  const file = slugToImageFile[slug] ?? slug
  return `/pages/${file}.png`
}

export default async function Home() {
    let sanitySpotlights: Spotlight[] = [];
    try {
        sanitySpotlights = await client.fetch(`*[_type == "spotlight"]{
            name,
            "slug": slug.current,
            category
        }`);
    } catch {
        // Sanity unavailable — hardcoded data will be used
    }

    const useHardcoded = !sanitySpotlights || sanitySpotlights.length === 0;
    const firstGenSpotlights: Spotlight[] = useHardcoded
        ? firstGeneration.map(s => ({ name: s.name, slug: s.slug, category: 'FIRST' }))
        : sanitySpotlights.filter(s => !s.category || s.category.includes('FIRST'));
    const secondGenSpotlights: Spotlight[] = useHardcoded
        ? secondGeneration.map(s => ({ name: s.name, slug: s.slug, category: 'SECOND' }))
        : sanitySpotlights.filter(s => s.category?.includes('SECOND'));



    return (
        <main>
            <InteractiveClient />
            
            {/* 1. TOP PINK BAR */}
            <div className="fixed top-0 left-0 w-full h-[12px] bg-[#C8006A] z-[1000]"></div>

            {/* main-page Wrapper */}
            <div id="page-main" className="page active">
                
                {/* 2. HERO / INDEX */}
                <section id="hero" className="h-screen w-full flex flex-col justify-center items-center relative overflow-hidden pt-3 border-t-[12px] border-[#C8006A]" 
                         style={{ backgroundImage: "url('/pages/atelier background.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="absolute inset-0 bg-black/20 z-0"></div>
                    <h1 className="hero-title text-white font-['Sarina'] text-[clamp(80px,12vw,160px)] leading-[1.1] text-center z-10" style={{ textShadow: "4px 4px 6px #C8006A" }}>
                        <div className="line1">The</div>
                        <div className="line2">Atelier</div>
                    </h1>
                    <div className="w-full bg-[#C8006A] text-white text-center py-4 mt-8 text-[clamp(14px,2vw,20px)] tracking-[2px] z-10 uppercase italic font-bold">
                        Where ambitious minds learn to speak the world
                    </div>
                    <nav className="hero-nav mt-8 text-center z-10 px-5 max-w-[800px]">
                        <div className="mb-4 flex flex-wrap justify-center gap-x-4 gap-y-2">
                            <Link href="/" className="hero-link text-white font-['Pacifico'] text-2xl px-2 underline underline-offset-4 decoration-[#D9F060]">Home</Link>
                            <Link href="/pages/about-us" className="hero-link text-white font-['Pacifico'] text-2xl px-2 underline underline-offset-4">About Us</Link>
                            <a href="#programs" className="hero-link text-white font-['Pacifico'] text-2xl px-2 underline underline-offset-4">Programs / Services</a>
                            <a href="#corporate" className="hero-link text-white font-['Pacifico'] text-2xl px-2 underline underline-offset-4">Corporate Training</a>
                            <a href="#social-proof" className="hero-link text-white font-['Pacifico'] text-2xl px-2 underline underline-offset-4">Social Proof</a>
                            <Link href="/dashboard" className="hero-link font-['Pacifico'] text-2xl px-2 underline underline-offset-4" style={{ color: '#D9F060' }}>CLIENT PORTAL</Link>
                        </div>
                        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                            <a href="#scholarships" className="hero-link text-white font-['Pacifico'] text-2xl px-2 underline underline-offset-4">Scholarships / Grants</a>
                            <Link href="/pages/spotlights" className="hero-link text-white font-['Pacifico'] text-2xl px-2 underline underline-offset-4">Atelier Spotlights</Link>
                            <Link href="/pages/insights" className="hero-link text-white font-['Pacifico'] text-2xl px-2 underline underline-offset-4">Insights / Journal</Link>
                            <a href="#contact" className="hero-link text-white font-['Pacifico'] text-2xl px-2 underline underline-offset-4">Contact</a>
                            <a href="#careers" className="hero-link text-white font-['Pacifico'] text-2xl px-2 underline underline-offset-4">Work with us</a>
                        </div>
                    </nav>
                </section>

                {/* 3. HOME / ABOUT */}
                <section id="about" className="section-padding bg-white grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="about-left staggered-left">
                        <h2 className="title text-[4rem] leading-none mb-4 font-['Pacifico']">The Atelier</h2>
                        <div className="subtitle text-[#C8006A] text-2xl mb-8 italic font-bold">Language, Culture & Confidence for the Global Voices.</div>
                        <ul className="list-none space-y-6">
                            <li className="font-bold text-lg"><span className="text-[#C8006A] mr-2">★</span> <i>LANGUAGE EDUCATION</i> — ENGLISH PROGRAMS DESIGNED FOR AMBITIOUS PROFESSIONALS.</li>
                            <li className="font-bold text-lg"><span className="text-[#C8006A] mr-2">★</span> <i>CULTURAL INTELLIGENCE</i> — LEARN LANGUAGE THROUGH HISTORY, ART, AND GLOBAL CULTURE.</li>
                            <li className="font-bold text-lg"><span className="text-[#C8006A] mr-2">★</span> <i>CONFIDENCE & COMMUNICATION</i> — SPEAK WITH CLARITY, ELEGANCE AND PRESENCE.</li>
                        </ul>
                    </div>
                    <div className="about-right flex flex-col items-end justify-start staggered-card">
                        <Link href="/pages/book-session" className="speech-bubble bg-[#D9F060] rounded-[24px] rounded-br-0 p-8 font-bold text-center text-xl max-w-[300px] text-black mb-4 shadow-[4px_4px_0px_#C8006A] hover:scale-105 transition-transform no-underline">
                            JOIN THE ATELIER! <br/>BOOK A FREE SESSION HERE
                        </Link>
                        <div className="hand-cursor text-4xl mt-[-10px] animate-bounce">👈</div>
                    </div>
                </section>

                {/* 4. PROGRAMS / SERVICES */}
                <section id="programs" className="section-padding bg-[#FAF7F0] border-t-4 border-[#C8006A] grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="left-col staggered-left">
                        <h2 className="section-title text-6xl mb-8 font-['Pacifico']">Programs / Services</h2>
                        <div className="flex flex-col space-y-4 text-3xl font-bold">
                            <Link href="/pages/private-coaching" className="underline hover:text-[#C8006A] transition-colors">Private Coaching</Link>
                            <Link href="/pages/subscriptions" className="underline hover:text-[#C8006A] transition-colors">Atelier Subscriptions</Link>
                            <Link href="/pages/corporate-training" className="underline hover:text-[#C8006A] transition-colors">Corporate Language Training</Link>
                            <Link href="/pages/cohorts" className="underline hover:text-[#C8006A] transition-colors">Cohorts & Special Programs</Link>
                        </div>
                    </div>
                    <div className="right-col staggered-card">
                        <div className="bg-[#A8DDD8] p-10 rounded-[24px] border-4 border-[#C8006A] shadow-xl">
                            <h3 className="text-3xl mb-4 font-['Pacifico']">Our Programs</h3>
                            <p className="text-xl italic font-bold leading-relaxed">The Atelier offers a range of programs designed to support different learning goals and lifestyles, from one-on-one sessions to cultural community subscriptions.</p>
                        </div>
                    </div>
                </section>

                {/* 6. SOCIAL PROOF (GRID) */}
                <section id="social-proof" className="section-padding bg-[#C8006A] text-white text-center">
                    <h2 className="section-title text-black text-6xl mb-4 font-['Pacifico']">Social Proof</h2>
                    <p className="mb-10 text-lg max-w-[800px] mx-auto italic uppercase font-bold text-white">TESTIMONIALS FROM THE AMERICAS (MEXICO), ASIA (TÜRKİYE, LEBANON, LIBYA), AND EUROPE (POLAND).</p>
                    
                    {/* First Generation Section */}
                    {firstGenSpotlights.length > 0 && (
                        <div className="mb-12">
                            <div className="flex items-center justify-center gap-4 mb-8">
                                <div className="h-[4px] w-20 bg-black"></div>
                                <h3 className="font-['Pacifico'] text-3xl text-black">First Generation</h3>
                                <div className="h-[4px] w-20 bg-black"></div>
                            </div>
                            <div className="sp-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 px-5">
                                {firstGenSpotlights.map((person, idx) => (
                                    <Link key={idx} href={`/pages/spotlight/${person.slug}`} className="retro-browser sp-card group no-underline flex flex-col h-[220px] transition-transform hover:scale-110 active:scale-95 border-b-8 border-r-8 shadow-2xl relative">
                                        <div className="retro-header bg-white border-b-4 border-[#C8006A] p-2 flex gap-2">
                                            <span className="text-[#C8006A]">x</span> <span className="text-[#C8006A]">o</span> <span className="text-[#C8006A]">—</span>
                                        </div>
                                        <div className="flex-1 bg-cover bg-center" style={{ backgroundImage: `url('${getImagePath(person.slug)}')` }}></div>
                                        <div className="bg-white text-black font-black text-[10px] py-1 border-t border-gray-200 text-center uppercase tracking-wide truncate px-1">
                                            {person.name}
                                        </div>
                                        <div className="bg-white text-[#C8006A] font-black text-xs py-2 group-hover:bg-[#D9F060] transition-colors border-t-2 border-[#C8006A] uppercase italic">
                                            &lt; view profile &gt;
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Second Generation Section */}
                    {secondGenSpotlights.length > 0 && (
                        <div>
                            <div className="flex items-center justify-center gap-4 mb-8">
                                <div className="h-[4px] w-20 bg-black"></div>
                                <h3 className="font-['Pacifico'] text-3xl text-black">Second Generation</h3>
                                <div className="h-[4px] w-20 bg-black"></div>
                            </div>
                            <div className="sp-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 px-5">
                                {secondGenSpotlights.map((person, idx) => (
                                    <Link key={idx} href={`/pages/spotlight/${person.slug}`} className="retro-browser sp-card group no-underline flex flex-col h-[220px] transition-transform hover:scale-110 active:scale-95 border-b-8 border-r-8 shadow-2xl relative">
                                        <div className="retro-header bg-white border-b-4 border-[#C8006A] p-2 flex gap-2">
                                            <span className="text-[#C8006A]">x</span> <span className="text-[#C8006A]">o</span> <span className="text-[#C8006A]">—</span>
                                        </div>
                                        <div className="flex-1 bg-cover bg-center" style={{ backgroundImage: `url('${getImagePath(person.slug)}')` }}></div>
                                        <div className="bg-white text-black font-black text-[10px] py-1 border-t border-gray-200 text-center uppercase tracking-wide truncate px-1">
                                            {person.name}
                                        </div>
                                        <div className="bg-white text-[#C8006A] font-black text-xs py-2 group-hover:bg-[#D9F060] transition-colors border-t-2 border-[#C8006A] uppercase italic">
                                            &lt; view profile &gt;
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </section>

                {/* 7. SCHOLARSHIPS / GRANTS */}
                <section id="scholarships" className="section-padding bg-[#C8006A] grid grid-cols-1 md:grid-cols-2 gap-10 items-center border-t-4 border-black">
                    <div className="left-col staggered-left">
                        <h2 className="section-title text-white text-6xl mb-8 font-['Pacifico']">Scholarships / Grants</h2>
                        <div className="bg-white p-10 rounded-[24px] shadow-2xl border-4 border-black relative">
                            <h3 className="text-3xl font-['Pacifico'] mb-4 text-[#C8006A]">The Atelier Grants</h3>
                            <p className="text-lg leading-relaxed mb-6 font-bold text-black uppercase italic">We believe in supporting highly motivated students. Our grants cover a significant percentage of programs for language learners who demonstrate commitment and passion.</p>
                            <Link href="/pages/scholarships" className="font-black underline text-[#C8006A] uppercase tracking-widest hover:text-black transition-colors text-xl">learn more here.</Link>
                        </div>
                    </div>
                    <div className="right-col flex justify-center items-center h-full min-h-[400px]">
                         <div className="star-container flex justify-center items-center relative spin-slow">
                            <div className="star-shape w-[400px] h-[400px] bg-[#F4A7C3] flex flex-col justify-center items-center text-center p-8 shadow-2xl border-2 border-black/5" 
                                 style={{ clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" }}>
                                <div className="font-['Pacifico'] text-[#C8006A] text-2xl mb-1">Atelier</div>
                                <div className="font-black text-5xl text-black leading-none mb-2">Grants</div>
                                <div className="text-[12px] italic text-black uppercase max-w-[140px] font-black leading-tight">Scholarships with purpose</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 8. ATELIER SPOTLIGHTS */}
                <section id="spotlights" className="section-padding bg-[#FAF7F0] border-t-4 border-[#C8006A] grid grid-cols-1 md:grid-cols-2 gap-20">
                    <div className="left-col staggered-left">
                        <h2 className="section-title text-[#C8006A] text-6xl mb-8 font-['Pacifico']">Atelier Spotlight</h2>
                        <div className="bg-white p-12 rounded-[24px] space-y-8 shadow-2xl border-4 border-[#C8006A] relative">
                             <div className="absolute -top-6 -right-6 bg-[#D9F060] text-black font-black px-6 py-2 rounded-full shadow-lg transform rotate-3">
                                FEATURED
                            </div>
                            <p className="text-2xl font-black italic text-black uppercase leading-relaxed">
                                AN EXCLUSIVE, 'BY INVITATION ONLY' PROGRAM FOCUSED ON STUDYING THE LIVES AND COMMUNICATION STYLES OF REMARKABLE WOMEN FROM HISTORY, SCIENCE, AND ART.
                            </p>
                            <Link href="/pages/spotlight/gaby" className="text-2xl font-black underline inline-flex items-center gap-2 text-[#C8006A] hover:text-black transition-all">
                                view full profile. 
                            </Link>
                            <div className="hand-cursor text-5xl animate-bounce ml-5 inline-block">👈</div>
                        </div>
                    </div>
                    <div className="right-col staggered-card h-full">
                        <div className="retro-browser h-full shadow-[20px_20px_0px_rgba(200,0,106,0.2)]" style={{ border: '8px solid #C8006A', borderRadius: '30px', overflow: 'hidden' }}>
                             <div className="retro-header bg-white border-b-4 border-[#C8006A] p-3 flex gap-2">
                                 <span className="text-[#C8006A] font-bold">x</span> <span className="text-[#C8006A] font-bold">□</span> <span className="text-[#C8006A] font-bold">—</span>
                             </div>
                             <div className="bg-cover bg-center w-full h-[450px]" style={{ backgroundImage: "url('/pages/atelier spotlights.png')" }}></div>
                             <div className="bg-white p-4 font-black text-center text-[#C8006A] border-t-4 border-[#C8006A]">
                                 &lt; [COMMUNITY ARCHIVE] &gt;
                             </div>
                        </div>
                    </div>
                </section>

                {/* 10. CONTACT */}
                <section id="contact" className="section-padding bg-[#C8006A] text-white grid grid-cols-1 md:grid-cols-3 gap-16 items-center border-t-4 border-black">
                    <h2 className="text-7xl md:col-span-3 font-['Pacifico'] mb-10">Reach out</h2>
                    
                    <div className="contact-info space-y-12">
                        <div>
                            <div className="font-black opacity-60 uppercase text-xs tracking-widest mb-4">WHATSAPP / PHONE</div>
                            <p className="text-2xl font-black italic mb-4 leading-tight">(+52) 552 113 1676</p>
                            <p className="text-2xl font-black italic leading-tight">(+52) 561 759 2347</p>
                        </div>
                        <div>
                             <div className="font-black opacity-60 uppercase text-xs tracking-widest mb-4">EMAIL</div>
                             <a href="mailto:theenglishateliere@gmail.com" className="text-2xl underline italic font-black hover:text-[#D9F060] transition-colors">theenglishateliere@gmail.com</a>
                        </div>
                    </div>

                    {/* REDESIGNED PHONE MOCKUP - FUNCTIONAL HUB */}
                    <div className="mockup-phone w-[300px] h-[600px] border-[12px] border-white rounded-[50px] mx-auto relative bg-[#FAF7F0] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transform -rotate-1">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140px] h-[30px] bg-white rounded-b-3xl z-10"></div>
                        <div className="pt-16 text-black px-6">
                            <div className="w-24 h-24 bg-[#C8006A] rounded-full mx-auto mb-4 overflow-hidden border-4 border-white shadow-xl">
                                <img src="/pages/gaby.png" alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            <div className="text-center mb-8">
                                <div className="font-black text-xl tracking-tighter">theatelier.lab</div>
                                <div className="text-[10px] opacity-40 font-black uppercase tracking-widest italic">Join the global voice</div>
                            </div>
                            
                            <div className="space-y-3 font-black text-[13px]">
                                <a href="https://www.instagram.com/theatelier.lab/" className="block bg-[#C8006A] text-white py-4 rounded-2xl text-center shadow-md hover:bg-black transition-all no-underline tracking-widest">
                                    ★ INSTAGRAM
                                </a>
                                <Link href="/pages/contact" className="block bg-white border-2 border-black py-4 rounded-2xl text-center shadow-md hover:bg-[#D9F060] transition-all no-underline tracking-widest">
                                    ★ CONTACT FORM
                                </Link>
                                <Link href="/pages/careers" className="block bg-white border-2 border-black py-4 rounded-2xl text-center shadow-md hover:bg-[#D9F060] transition-all no-underline tracking-widest">
                                    ★ WORK WITH US
                                </Link>
                                <Link href="/pages/cohorts" className="block bg-[#D9F060] border-2 border-black py-4 rounded-2xl text-center shadow-md hover:scale-105 transition-all no-underline tracking-widest">
                                    ★ JOIN COHORT
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-8 items-start h-full justify-center">
                         <div className="bg-white/10 p-8 rounded-[30px] backdrop-blur-sm border-2 border-white/20 w-full mb-4">
                             <p className="font-bold italic text-white uppercase text-xl leading-relaxed">
                                Ready to join our international community of ambitious professionals?
                             </p>
                         </div>
                        <Link href="/pages/contact" className="btn-pill bg-white text-[#C8006A] font-black no-underline shadow-xl hover:scale-105 transition-transform py-5 px-10 rounded-full text-xl uppercase">SAY HELLO</Link>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn-pill bg-black text-white no-underline shadow-xl hover:scale-105 transition-transform py-5 px-10 rounded-full font-black text-xl uppercase">LINKEDIN Profile</a>
                    </div>
                </section>
            </div>

            <FloatingEmailPopup />
            <footer style={{ backgroundColor: '#C8006A', color: 'white', textAlign: 'center', padding: '40px 0' }}>
                <p>&copy; 2026 The Atelier. All Rights Reserved.</p>
                <div style={{ marginTop: '10px' }}>
                  <Link href="/pages/about-us" style={{ color: 'white', margin: '0 10px', textDecoration: 'underline' }}>About Us</Link>
                  <Link href="/pages/book-session" style={{ color: 'white', margin: '0 10px', textDecoration: 'underline' }}>Join Now</Link>
                </div>
            </footer>
        </main>
    );
}