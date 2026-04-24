import React from 'react';
import { client } from '../../sanity/lib/client';
import { groq } from 'next-sanity';
import InteractiveClient from './InteractiveClient';
import FloatingEmailPopup from '../components/FloatingEmailPopup';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';
// import { firstGeneration, secondGeneration, spotlights } from '@/data/spotlights';

export const revalidate = 3600;

const slugToImageFile: Record<string, string> = {
  'sefika-buse': 'sefika buse',
  'maria-fernanda': 'maria fernanda',
  'arletthe': 'arletthe',
  'carolina': 'carolina',
  'gaby': 'gaby',
  'iris': 'iris',
  'marwa': 'marwa',
  'saja': 'saja',
  'sofia': 'sofia',
  'valeria': 'valeria',
  'mayan': 'Mayan',
  'buse': 'sefika buse',
  'aya': 'aya'
};

function getImagePath(slug: string): string {
  const file = slugToImageFile[slug] ?? slug
  return `/pages/${file}.webp`
}

export default async function Home() {
    // Fetch spotlights from Sanity CMS
    const spotlightsQuery = groq`*[_type == "spotlight"] | order(_createdAt desc) {
      name, "slug": slug.current, heading, shortQuote, category, "imagePath": image.asset->url
    }`;
    const fetchedSpotlights = await client.fetch(spotlightsQuery);
    
    // Import fallback locally if Sanity is empty
    const localData = require('@/data/spotlights');
    const spotlightsList = fetchedSpotlights.length > 0 ? fetchedSpotlights : localData.spotlights;

    const firstGenSpotlights = spotlightsList.filter((s: any) => s.category === 'FIRST');
    const secondGenSpotlights = spotlightsList.filter((s: any) => s.category === 'SECOND');

    return (
        <main>
            <InteractiveClient />
            
            {/* main-page Wrapper */}
            <div id="page-main" className="page active">
                
                {/* 2. HERO / INDEX */}
                <section id="hero" className="h-screen w-full flex flex-col justify-center items-center relative overflow-hidden pt-3" 
                         style={{ backgroundImage: "url('/pages/atelier background.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="absolute inset-0 bg-black/20 z-0"></div>
                    <h1 className="hero-title text-white font-['Sarina'] text-[clamp(80px,12vw,160px)] leading-[1.1] text-center z-10" style={{ textShadow: "4px 4px 6px #9D174D" }}>
                        <div className="line1">The</div>
                        <div className="line2">Atelier</div>
                    </h1>
                    <div className="w-full bg-[#9D174D] text-white text-center py-4 mt-8 text-[clamp(14px,2vw,20px)] tracking-[2px] z-10 uppercase italic font-bold">
                        Where ambitious minds learn to speak the world
                    </div>

                    {/* Scroll indicator */}
                    <div className="scroll-indicator">
                        <span>Scroll</span>
                        <div className="scroll-mouse">
                            <div className="scroll-wheel"></div>
                        </div>
                    </div>
                </section>

                {/* 3. HOME / ABOUT */}
                <ScrollReveal>
                <section id="about" className="section-padding bg-white grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="about-left staggered-left">
                        <h2 className="title text-[4rem] leading-none mb-4 font-['Cormorant_Garamond']">The Atelier</h2>
                        <div className="subtitle text-[#9D174D] text-2xl mb-8 italic font-bold">Language, Culture & Confidence for the Global Voices.</div>
                        <ul className="list-none space-y-6">
                            <li className="font-bold text-lg"><span className="text-[#9D174D] mr-2">★</span> <i>LANGUAGE EDUCATION</i> — ENGLISH PROGRAMS DESIGNED FOR AMBITIOUS PROFESSIONALS.</li>
                            <li className="font-bold text-lg"><span className="text-[#9D174D] mr-2">★</span> <i>CULTURAL INTELLIGENCE</i> — LEARN LANGUAGE THROUGH HISTORY, ART, AND GLOBAL CULTURE.</li>
                            <li className="font-bold text-lg"><span className="text-[#9D174D] mr-2">★</span> <i>CONFIDENCE & COMMUNICATION</i> — SPEAK WITH CLARITY, ELEGANCE AND PRESENCE.</li>
                        </ul>
                    </div>
                    <div className="about-right flex flex-col items-center justify-center staggered-card gap-6">
                        <p className="text-sm uppercase tracking-widest text-[#9D174D] font-bold italic">Ready to begin?</p>
                        <Link href="/pages/book-session" className="speech-bubble no-underline">
                            Book a Free Session
                        </Link>
                        <p className="text-xs text-gray-400 italic">No commitment — first session is complimentary.</p>
                    </div>
                </section>
                </ScrollReveal>

                {/* COMPANY LOGOS BAR — Social Proof */}
                <ScrollReveal delay={150}>
                    <section className="py-12 px-[7%] bg-[#FAF7F0] border-t border-[#e8e4dc]">
                        <p className="text-center text-[10px] tracking-[4px] uppercase font-bold text-gray-400 mb-8">Trusted by professionals at</p>
                    <div className="flex flex-wrap justify-center items-center max-w-6xl mx-auto px-4">
                        {['AEROMEXICO', 'KRAFT HEINZ', 'MERSIN UNIVERSITY', 'AZS REFRACTORY', 'LALLEMAND MEXICO'].map((company, idx, arr) => (
                            <React.Fragment key={company}>
                                <span className="text-[14px] font-black tracking-[4px] text-gray-500 uppercase hover:text-[#9D174D] transition-colors py-4">
                                    {company}
                                </span>
                                {idx < arr.length - 1 && <span className="mx-12 text-gray-300">|</span>}
                            </React.Fragment>
                        ))}
                    </div>
                    </section>
                </ScrollReveal>

                {/* 4. PROGRAMS / SERVICES */}
                <ScrollReveal>
                    <section id="programs" className="section-padding bg-[#FAF7F0] border-t-4 border-[#9D174D] grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="left-col staggered-left">
                        <h2 className="section-title text-6xl mb-10 font-['Cormorant_Garamond']">Programs / Services</h2>
                        <div className="flex flex-col">
                            <Link href="/pages/private-coaching" className="program-item no-underline text-black group">
                                <div className="program-icon">✦</div>
                                <div>
                                    <span className="program-title group-hover:text-[#9D174D]">Private Coaching</span>
                                    <span className="program-tagline">One-on-one sessions tailored to your goals</span>
                                </div>
                            </Link>
                            <Link href="/pages/subscriptions" className="program-item no-underline text-black group">
                                <div className="program-icon">◈</div>
                                <div>
                                    <span className="program-title group-hover:text-[#9D174D]">Atelier Subscriptions</span>
                                    <span className="program-tagline">Ongoing cultural & language membership</span>
                                </div>
                            </Link>
                            <Link href="/pages/corporate-training" className="program-item no-underline text-black group">
                                <div className="program-icon">⬡</div>
                                <div>
                                    <span className="program-title group-hover:text-[#9D174D]">Corporate Language Training</span>
                                    <span className="program-tagline">English for global teams & executives</span>
                                </div>
                            </Link>
                            <Link href="/pages/cohorts" className="program-item no-underline text-black group">
                                <div className="program-icon">★</div>
                                <div>
                                    <span className="program-title group-hover:text-[#9D174D]">Cohorts & Special Programs</span>
                                    <span className="program-tagline">Curated group learning experiences</span>
                                </div>
                            </Link>
                            <Link href="/pages/career-coaching" className="program-item no-underline text-black group">
                                <div className="program-icon">◆</div>
                                <div>
                                    <span className="program-title group-hover:text-[#9D174D]">Career Coaching</span>
                                    <span className="program-tagline">CV building, interview prep & professional branding</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="right-col staggered-card">
                        <div className="bg-[#A8DDD8] p-10 rounded-[24px] border-4 border-[#9D174D] shadow-xl">
                            <h3 className="text-3xl mb-4 font-['Cormorant_Garamond']">Our Programs</h3>
                            <p className="text-xl italic font-bold leading-relaxed">The Atelier offers a range of programs designed to support different learning goals and lifestyles, from one-on-one sessions to cultural community subscriptions.</p>
                        </div>
                    </div>
                </section>
                </ScrollReveal>

                {/* 6. SOCIAL PROOF (GRID) */}
                <ScrollReveal>
                <section id="social-proof" className="section-padding bg-[#9D174D] text-white text-center">
                    <h2 className="section-title text-black text-6xl mb-4 font-['Cormorant_Garamond']">Social Proof</h2>
                    <p className="mb-10 text-lg max-w-[800px] mx-auto italic uppercase font-bold text-white">TESTIMONIALS FROM THE AMERICAS (MEXICO), ASIA (TÜRKİYE, LEBANON), AFRICA (LIBYA), AND EUROPE (POLAND).</p>
                    
                    {/* Testimonial quotes — scrollable carousel */}
                    <div className="carousel-hint max-w-5xl mx-auto">swipe to explore</div>
                    <div className="testimonial-track mb-14 max-w-5xl mx-auto">
                        <div className="testimonial-card">
                            <p className="text-white italic text-base leading-relaxed mb-4">"The classes were not only about learning a language, but about learning that, and so many other things."</p>
                            <span className="text-[#D9F060] font-black uppercase text-sm">— Arletthe, Mexico</span>
                        </div>
                        <div className="testimonial-card">
                            <p className="text-white italic text-base leading-relaxed mb-4">"I truly like the way you work — you focus on who the person is and what is happening in their life."</p>
                            <span className="text-[#D9F060] font-black uppercase text-sm">— Arletthe, Mexico</span>
                        </div>
                        <div className="testimonial-card">
                            <p className="text-white italic text-base leading-relaxed mb-4">"Her journey reflects what the Atelier is about: ambitious professionals using English as a tool for global conversations."</p>
                            <span className="text-[#D9F060] font-black uppercase text-sm">— Gaby, Aviation, Mexico</span>
                        </div>
                        <div className="testimonial-card">
                            <p className="text-white italic text-base leading-relaxed mb-4">"Every session left me with something new — not just English, but a way of seeing the world differently."</p>
                            <span className="text-[#D9F060] font-black uppercase text-sm">— Atelier Student</span>
                        </div>
                    </div>
                    
                    {/* First Generation Section */}
                    {firstGenSpotlights.length > 0 && (
                        <div className="mb-12">
                            <div className="flex items-center justify-center gap-4 mb-8">
                                <div className="h-[4px] w-20 bg-black"></div>
                                <h3 className="font-['Cormorant_Garamond'] text-3xl text-black">First Generation</h3>
                                <div className="h-[4px] w-20 bg-black"></div>
                            </div>
                            <div className="sp-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 px-5">
                                {firstGenSpotlights.map((person: any, idx: number) => (
                                    <Link key={idx} href={`/pages/spotlight/${person.slug}`} className="sp-card group no-underline flex flex-col border-4 border-[#9D174D] rounded-[12px] overflow-hidden transition-transform hover:scale-110 active:scale-95 border-b-8 border-r-8 shadow-2xl bg-white" style={{minHeight: '220px'}}>
                                        <div className="bg-white border-b-4 border-[#9D174D] p-2 flex gap-2 font-mono font-bold">
                                            <span className="text-[#9D174D]">x</span> <span className="text-[#9D174D]">o</span> <span className="text-[#9D174D]">—</span>
                                        </div>
                                        <div className="flex-1 bg-cover bg-center" style={{ backgroundImage: `url('${person.imagePath || getImagePath(person.slug)}')`, minHeight: '140px' }}></div>
                                        <div className="bg-white text-[#9D174D] font-black text-xs py-2 group-hover:bg-[#D9F060] transition-colors border-t-2 border-[#9D174D] uppercase italic text-center shrink-0">
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
                                <h3 className="font-['Cormorant_Garamond'] text-3xl text-black">Second Generation</h3>
                                <div className="h-[4px] w-20 bg-black"></div>
                            </div>
                            <div className="sp-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 px-5">
                                {secondGenSpotlights.map((person: any, idx: number) => (
                                    <Link key={idx} href={`/pages/spotlight/${person.slug}`} className="sp-card group no-underline flex flex-col border-4 border-[#9D174D] rounded-[12px] overflow-hidden transition-transform hover:scale-110 active:scale-95 border-b-8 border-r-8 shadow-2xl bg-white" style={{minHeight: '220px'}}>
                                        <div className="bg-white border-b-4 border-[#9D174D] p-2 flex gap-2 font-mono font-bold">
                                            <span className="text-[#9D174D]">x</span> <span className="text-[#9D174D]">o</span> <span className="text-[#9D174D]">—</span>
                                        </div>
                                        <div className="flex-1 bg-cover bg-center" style={{ backgroundImage: `url('${person.imagePath || getImagePath(person.slug)}')`, minHeight: '140px' }}></div>
                                        <div className="bg-white text-[#9D174D] font-black text-xs py-2 group-hover:bg-[#D9F060] transition-colors border-t-2 border-[#9D174D] uppercase italic text-center shrink-0">
                                            &lt; view profile &gt;
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                    {/* Book Session CTA */}
                    <div className="mt-14 text-center">
                        <Link href="/pages/book-session" className="inline-block bg-[#D9F060] text-black font-black px-12 py-5 rounded-full text-xl uppercase tracking-widest hover:scale-105 transition-transform no-underline shadow-2xl border-4 border-black">
                            Book a Free Session ★
                        </Link>
                    </div>
                </section>
                </ScrollReveal>

                {/* 7. SCHOLARSHIPS / GRANTS */}
                <section id="scholarships" className="section-padding bg-[#9D174D] grid grid-cols-1 md:grid-cols-2 gap-10 items-center border-t-4 border-black">
                    <div className="left-col staggered-left">
                        <h2 className="section-title text-white text-6xl mb-8 font-['Cormorant_Garamond']">Scholarships / Grants</h2>
                        <div className="bg-white p-10 rounded-[24px] shadow-2xl border-4 border-black relative">
                            <h3 className="text-3xl font-['Cormorant_Garamond'] mb-4 text-[#9D174D]">The Atelier Grants</h3>
                            <p className="text-lg leading-relaxed mb-6 font-bold text-black uppercase italic">We believe in supporting highly motivated students. Our grants cover a significant percentage of programs for language learners who demonstrate commitment and passion.</p>
                            <Link href="/pages/scholarships" className="font-black underline text-[#9D174D] uppercase tracking-widest hover:text-black transition-colors text-xl">learn more here.</Link>
                        </div>
                    </div>
                    <div className="right-col flex justify-center items-center h-full min-h-[400px]">
                         <div className="star-container flex justify-center items-center relative spin-slow">
                            <div className="star-shape w-[400px] h-[400px] bg-[#FDF2F8] flex flex-col justify-center items-center text-center p-8 shadow-2xl border-2 border-black/5" 
                                 style={{ clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" }}>
                                <div className="font-['Cormorant_Garamond'] text-[#9D174D] text-2xl mb-1">Atelier</div>
                                <div className="font-black text-5xl text-black leading-none mb-2">Grants</div>
                                <div className="text-[12px] italic text-black uppercase max-w-[140px] font-black leading-tight">Scholarships with purpose</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 8. ATELIER SPOTLIGHTS */}
                <section id="spotlights" className="section-padding bg-[#FAF7F0] border-t-4 border-[#9D174D] grid grid-cols-1 md:grid-cols-2 gap-20">
                    <div className="left-col staggered-left">
                        <h2 className="section-title text-[#9D174D] text-6xl mb-8 font-['Cormorant_Garamond']">Atelier Spotlight</h2>
                        <div className="bg-white p-12 rounded-[24px] space-y-8 shadow-2xl border-4 border-[#9D174D] relative overflow-visible">
                             <div className="inline-block bg-[#D9F060] text-black font-black px-4 py-1 text-sm rounded-full shadow-lg transform rotate-3 mb-2">
                                FEATURED
                            </div>
                            <p className="text-2xl font-black italic text-black uppercase leading-relaxed">
                                AN EXCLUSIVE, 'BY INVITATION ONLY' PROGRAM FOCUSED ON STUDYING THE LIVES AND COMMUNICATION STYLES OF REMARKABLE WOMEN FROM HISTORY, SCIENCE, AND ART.
                            </p>
                            <Link href="/pages/spotlight/gaby" className="text-2xl font-black underline inline-flex items-center gap-2 text-[#9D174D] hover:text-black transition-all">
                                view full profile. 
                            </Link>
                            <span className="animated-arrow">←</span>
                        </div>
                    </div>
                    <div className="right-col staggered-card h-full">
                        <div className="retro-browser h-full shadow-[20px_20px_0px_rgba(200,0,106,0.2)]" style={{ border: '8px solid #9D174D', borderRadius: '30px', overflow: 'hidden' }}>
                             <div className="retro-header bg-white border-b-4 border-[#9D174D] p-3 flex gap-2">
                                 <span className="text-[#9D174D] font-bold">x</span> <span className="text-[#9D174D] font-bold">□</span> <span className="text-[#9D174D] font-bold">—</span>
                             </div>
                             <div className="bg-cover bg-center w-full h-[450px] relative flex items-center justify-center" 
                                  style={{ backgroundImage: "url('/pages/atelier spotlights.webp')", backgroundColor: '#1a0010' }}>
                                  <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #f8d7e8 0%, #e8a0c0 25%, #9D174D 60%, #8a0047 100%)' }}></div>
                                  <div className="relative z-10 text-center px-8">
                                      <div className="font-black text-white text-xs uppercase tracking-widest mb-4 opacity-70">BY INVITATION ONLY</div>
                                      <div className="font-black text-white text-4xl leading-tight mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Atelier<br/>Spotlights</div>
                                      <div className="w-16 h-1 bg-white/50 mx-auto mb-6"></div>
                                      <div className="text-white/80 text-sm uppercase tracking-widest font-bold">First & Second Generation</div>
                                  </div>
                             </div>
                             <div className="bg-white p-4 font-black text-center text-[#9D174D] border-t-4 border-[#9D174D]">
                                 &lt; [COMMUNITY ARCHIVE] &gt;
                             </div>
                        </div>
                    </div>
                </section>

                {/* 10. CONTACT */}
                <section id="contact" className="section-padding bg-[#9D174D] text-white grid grid-cols-1 md:grid-cols-3 gap-16 items-center border-t-4 border-black">
                    <h2 className="text-7xl md:col-span-3 font-['Cormorant_Garamond'] mb-10">Reach out</h2>
                    
                    <div className="contact-info space-y-12">
                        <div>
                            <div className="font-black text-[#D9F060] uppercase text-xs tracking-widest mb-4">EMAIL</div>
                            <a href="mailto:theenglishateliere@gmail.com" className="text-xl underline italic font-black hover:text-[#D9F060] transition-colors break-all">theenglishateliere@gmail.com</a>
                        </div>
                        <div>
                            <div className="font-black text-[#D9F060] uppercase text-xs tracking-widest mb-4">CONTACT FORM</div>
                            <Link href="/pages/contact" className="inline-block bg-white text-[#9D174D] font-black px-8 py-4 rounded-full text-lg uppercase tracking-widest hover:bg-[#D9F060] hover:text-black transition-colors no-underline shadow-lg border-2 border-white">
                                SEND A MESSAGE →
                            </Link>
                        </div>
                        <div>
                            <div className="font-black text-[#D9F060] uppercase text-xs tracking-widest mb-4">INSTAGRAM</div>
                            <a href="https://www.instagram.com/theatelier.lab/" target="_blank" rel="noopener noreferrer" className="text-xl underline italic font-black hover:text-[#D9F060] transition-colors">@theatelier.lab</a>
                        </div>
                    </div>

                    {/* PHONE MOCKUP - INSTAGRAM */}
                    <a href="https://www.instagram.com/theatelier.lab/" target="_blank" rel="noopener noreferrer" className="mockup-phone w-[300px] h-[600px] border-[12px] border-white rounded-[50px] mx-auto relative overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transform -rotate-1 block no-underline">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140px] h-[30px] bg-white rounded-b-3xl z-10"></div>
                        <div className="absolute inset-0 bg-cover bg-top" style={{ backgroundImage: "url('/pages/instagram-screenshot.webp')" }} />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-center font-black text-xs py-3 tracking-widest uppercase z-10">
                            ★ follow @theatelier.lab
                        </div>
                    </a>

                    <div className="flex flex-col gap-6 items-start h-full justify-center">
                         <div className="bg-white/10 p-6 rounded-[24px] backdrop-blur-sm border-2 border-white/20 w-full">
                             <p className="font-bold italic text-white uppercase text-sm leading-relaxed break-words">
                                Ready to join our international community of ambitious professionals?
                             </p>
                         </div>
                        <Link href="/pages/contact" className="btn-pill bg-white text-[#9D174D] font-black no-underline shadow-xl hover:scale-105 transition-transform py-4 px-8 rounded-full text-lg uppercase">SAY HELLO</Link>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn-pill bg-black text-white no-underline shadow-xl hover:scale-105 transition-transform py-4 px-8 rounded-full font-black text-lg uppercase">LINKEDIN</a>
                    </div>
                </section>
            </div>

            <FloatingEmailPopup />
            <footer className="footer-enhanced">
                <div className="footer-grid">
                    <div>
                        <div className="footer-brand">The Atelier</div>
                        <div className="footer-tagline">Where ambitious minds learn to speak the world</div>
                    </div>
                    <div className="footer-col">
                        <div className="footer-col-title">Programs</div>
                        <Link href="/pages/private-coaching">Private Coaching</Link>
                        <Link href="/pages/subscriptions">Atelier Subscriptions</Link>
                        <Link href="/pages/corporate-training">Corporate Training</Link>
                        <Link href="/pages/career-coaching">Career Coaching</Link>
                        <Link href="/pages/cohorts">Cohorts & Special Programs</Link>
                        <Link href="/pages/scholarships">Scholarships / Grants</Link>
                    </div>
                    <div className="footer-col">
                        <div className="footer-col-title">Connect</div>
                        <Link href="/pages/about-us">About Us</Link>
                        <Link href="/pages/spotlights">Atelier Spotlights</Link>
                        <Link href="/pages/insights">Insights / Journal</Link>
                        <Link href="/pages/contact">Contact</Link>
                        <a href="https://www.instagram.com/theatelier.lab/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                            @theatelier.lab
                        </a>
                    </div>
                </div>
                <div className="footer-bottom">
                    <span>&copy; 2026 The Atelier. All Rights Reserved.</span>
                    <Link href="/pages/book-session" style={{ color: 'white', opacity: 1, textDecoration: 'underline', fontWeight: 700 }}>Book a Free Session →</Link>
                </div>
            </footer>
        </main>
    );
}