import React from 'react';
import { client } from '../../sanity/lib/client';
import InteractiveClient from './InteractiveClient';
import FloatingEmailPopup from '../components/FloatingEmailPopup';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Home() {
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
                    <nav className="mt-8 text-center z-10 px-5">
                        <div className="mb-4">
                            <Link href="/" className="hero-link">Home</Link> &middot; 
                            <Link href="/pages/about-us" className="hero-link">About Us</Link> &middot; 
                            <a href="#programs" className="hero-link">Programs / Services</a> &middot; 
                            <a href="#corporate" className="hero-link">Corporate Training</a> &middot; 
                            <a href="#social-proof" className="hero-link">Social Proof</a> &middot; 
                            <Link href="/dashboard" className="hero-link" style={{ color: '#D9F060' }}>CLIENT PORTAL</Link>
                        </div>
                        <div>
                            <a href="#scholarships" className="hero-link">Scholarships / Grants</a> &middot; 
                            <a href="#spotlights" className="hero-link">Atelier Spotlights</a> &middot; 
                            <a href="#insights" className="hero-link">Insights / Journal</a> &middot; 
                            <a href="#contact" className="hero-link">Contact</a> &middot; 
                            <a href="#careers" className="hero-link">Work with us</a>
                        </div>
                    </nav>
                </section>

                {/* 3. HOME / ABOUT */}
                <section id="about" className="section-padding bg-white grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="about-left staggered-left">
                        <h2 className="title text-[4rem] leading-none mb-4 font-['Pacifico']">The Atelier</h2>
                        <div className="subtitle text-[#C8006A] text-2xl mb-8 italic">Language, Culture & Confidence for the Global Voices.</div>
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
                        </div>
                    </div>
                    <div className="right-col staggered-card">
                        <div className="bg-[#F4A7C3] p-10 rounded-[24px]">
                            <h3 className="text-3xl mb-4 font-['Pacifico']">Our Programs</h3>
                            <p className="text-xl italic leading-relaxed">The Atelier offers a range of programs designed to support different learning goals and lifestyles, from one-on-one sessions to cultural community subscriptions.</p>
                        </div>
                    </div>
                </section>

                {/* 5. CORPORATE */}
                <section id="corporate" className="section-padding bg-[#FAF7F0] border-t-4 border-[#C8006A] flex flex-wrap justify-between gap-10">
                    <div className="left-col staggered-left flex-1 min-w-[300px]">
                        <div className="italic text-gray-600 mb-2">Programs / Services</div>
                        <h2 className="text-6xl mb-8 leading-[1.1] font-['Pacifico']">Corporate<br/>Language<br/>Training</h2>
                        <Link href="/pages/corporate-quotation" className="btn-pill bg-[#C8006A] text-white no-underline inline-block">GET A CUSTOMIZED QUOTATION</Link>
                    </div>
                    <div className="right-col staggered-card flex-1 min-w-[300px] relative">
                        <div className="bg-[#A8DDD8] p-10 rounded-[24px] text-black">
                            <p className="text-xl mb-6 font-bold">We design customized language training programs for international companies seeking to strengthen communication across global teams.</p>
                            <p className="font-bold mb-4">Programs can include:</p>
                            <ul className="list-none space-y-2 mb-12 font-bold">
                                <li>★ Professional English for international collaboration</li>
                                <li>★ Industry-specific vocabulary</li>
                                <li>★ Presentation and communication training</li>
                                <li>★ Leadership communication skills</li>
                            </ul>
                            <div className="absolute bottom-[-25px] left-1/2 -translate-x-1/2 whitespace-nowrap">
                                <Link href="/pages/book-session" className="btn-pill bg-[#C8006A] text-white pulse no-underline shadow-xl">
                                    JOIN THE ATELIER! / BOOK A FREE SESSION HERE <span className="hand-cursor">👆</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. SOCIAL PROOF (GRID) */}
                <section id="social-proof" className="section-padding bg-[#C8006A] text-white text-center">
                    <h2 className="section-title text-black text-6xl mb-4 font-['Pacifico']">Social Proof</h2>
                    <p className="mb-10 text-lg max-w-[600px] mx-auto italic uppercase">TESTIMONIALS FROM ELITE PROFESSIONALS ACROSS THE AMERICAS, ASIA, AND EUROPE.</p>
                    
                    {/* First Generation Section */}
                    {spotlights.filter(s => !s.category || s.category.includes('FIRST')).length > 0 && (
                        <div className="mb-12">
                            <div className="flex items-center justify-center gap-4 mb-8">
                                <img src="/pages/spotlights first gen.png" alt="First Generation" style={{ height: '60px' }} />
                            </div>
                            <div className="sp-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                                {spotlights.filter(s => !s.category || s.category.includes('FIRST')).map((person, idx) => (
                                    <Link key={idx} href={`/pages/spotlight/${person.slug}`} className="retro-browser sp-card group no-underline flex flex-col h-[200px] transition-transform hover:scale-105 active:scale-95">
                                        <div className="retro-header bg-white border-b-4 border-[#C8006A] p-2 flex gap-2">
                                            <span className="text-[#C8006A]">x</span> <span className="text-[#C8006A]">o</span> <span className="text-[#C8006A]">—</span>
                                        </div>
                                        <div className="flex-1 bg-cover bg-center" style={{ backgroundImage: `url('/pages/${person.slug}.png')` }}></div>
                                        <div className="bg-white text-[#C8006A] font-bold py-1 group-hover:bg-[#D9F060] transition-colors">&lt; &gt;</div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Second Generation Section */}
                    {spotlights.filter(s => s.category?.includes('SECOND')).length > 0 && (
                        <div>
                            <div className="flex items-center justify-center gap-4 mb-8">
                                <img src="/pages/spotlights second gen.png" alt="Second Generation" style={{ height: '60px' }} />
                            </div>
                            <div className="sp-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                                {spotlights.filter(s => s.category?.includes('SECOND')).map((person, idx) => (
                                    <Link key={idx} href={`/pages/spotlight/${person.slug}`} className="retro-browser sp-card group no-underline flex flex-col h-[200px] transition-transform hover:scale-105 active:scale-95">
                                        <div className="retro-header bg-white border-b-4 border-[#C8006A] p-2 flex gap-2">
                                            <span className="text-[#C8006A]">x</span> <span className="text-[#C8006A]">o</span> <span className="text-[#C8006A]">—</span>
                                        </div>
                                        <div className="flex-1 bg-cover bg-center" style={{ backgroundImage: `url('/pages/${person.slug}.png')` }}></div>
                                        <div className="bg-white text-[#C8006A] font-bold py-1 group-hover:bg-[#D9F060] transition-colors">&lt; &gt;</div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </section>

                {/* 7. SCHOLARSHIPS / GRANTS */}
                <section id="scholarships" className="section-padding bg-[#C8006A] grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div className="left-col staggered-left">
                        <h2 className="section-title text-black text-6xl mb-8 font-['Pacifico']">Scholarships / Grants</h2>
                        <div className="bg-white p-10 rounded-[24px] shadow-2xl">
                            <h3 className="text-3xl font-['Pacifico'] mb-4">The Atelier Grants</h3>
                            <p className="text-lg leading-relaxed mb-6">We believe in supporting highly motivated students. Our grants cover a significant percentage of programs for language learners who demonstrate commitment and passion.</p>
                            <Link href="/pages/scholarships" className="font-bold underline text-black uppercase tracking-widest hover:text-[#C8006A] transition-colors">learn more here.</Link>
                        </div>
                    </div>
                    <div className="right-col flex justify-center items-center h-full min-h-[400px]">
                        <div className="retro-browser shadow-2xl" style={{ border: '4px solid white', borderRadius: '12px', overflow: 'hidden', backgroundColor: 'white' }}>
                            <div className="retro-header bg-[#C8006A] p-2 flex gap-2">
                                <span className="text-white">x</span> <span className="text-white">□</span> <span className="text-white">—</span>
                            </div>
                            <img src="/pages/scholarships - grants.png" alt="Grants" style={{ maxWidth: '100%', display: 'block' }} />
                        </div>
                    </div>
                </section>

                {/* 8. ATELIER SPOTLIGHTS */}
                <section id="spotlights" className="section-padding bg-[#FAF7F0] border-t-4 border-[#C8006A] grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="left-col staggered-left">
                        <h2 className="section-title text-black text-6xl mb-8 font-['Pacifico']">Atelier Spotlight</h2>
                        <div className="bg-[#F4A7C3] p-10 rounded-[24px] space-y-6 shadow-xl">
                            <p className="text-xl italic">
                                An exclusive, 'by invitation only' program focused on studying the lives and communication styles of remarkable women from history, science, fashion, and politics.
                            </p>
                            <Link href="/pages/spotlight/gaby" className="text-2xl font-bold underline inline-flex items-center gap-2 text-black hover:text-[#C8006A] transition-all">
                                view full profile. <span className="hand-cursor animate-bounce">👈</span>
                            </Link>
                        </div>
                    </div>
                    <div className="right-col staggered-card">
                        <div className="retro-browser shadow-2xl" style={{ border: '4px solid #C8006A', borderRadius: '24px', overflow: 'hidden' }}>
                           <img src="/pages/atelier spotlights.png" alt="Atelier Spotlights" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </section>

                {/* 9. INSIGHTS / JOURNAL */}
                <section id="insights" className="section-padding bg-[#D9F060] border-t-4 border-[#C8006A] flex flex-col items-center gap-10">
                    <h2 className="section-title text-black text-6xl font-['Pacifico']">Insights / Journal</h2>
                    <div className="retro-browser max-w-[900px] shadow-2xl" style={{ border: '4px solid #C8006A', borderRadius: '12px', overflow: 'hidden', backgroundColor: 'white' }}>
                         <div className="retro-header bg-white border-b-4 border-[#C8006A] p-2 flex gap-2">
                             <span className="text-[#C8006A]">x</span> <span className="text-[#C8006A]">□</span> <span className="text-[#C8006A]">—</span>
                         </div>
                        <img src="/pages/insights  - journal.png" alt="Journal" className="w-full" />
                    </div>
                    <Link href="/pages/insights" className="btn-pill bg-[#C8006A] text-white no-underline shadow-xl hover:scale-105 transition-transform">READ THE ATELIER JOURNAL</Link>
                </section>

                {/* 10. CONTACT */}
                <section id="contact" className="section-padding bg-[#C8006A] text-white grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
                    <h2 className="text-6xl md:col-span-3 font-['Pacifico']">Reach out</h2>
                    <div className="contact-info">
                        <div className="font-bold opacity-80 mb-2 uppercase text-sm">Phone</div>
                        <p className="text-xl mb-6">WhatsApp: (+52) 552 113 1676</p>
                        <div className="font-bold opacity-80 mb-2 uppercase text-sm">Email</div>
                        <a href="mailto:theenglishateliere@gmail.com" className="text-xl underline italic text-white hover:text-[#D9F060]">theenglishateliere@gmail.com</a>
                    </div>
                    <div className="mockup-phone w-[260px] h-[500px] border-8 border-white rounded-[40px] mx-auto relative bg-[#FAF7F0] overflow-hidden shadow-2xl">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[25px] bg-white rounded-b-2xl"></div>
                        <div className="pt-10 text-black text-center">
                            <div className="w-20 h-20 bg-[#C8006A] rounded-full mx-auto mb-4 overflow-hidden border-2 border-[#C8006A]">
                                <img src="/pages/gaby.png" alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            <div className="font-bold">theatelier.lab</div>
                            <div className="grid grid-cols-3 gap-1 mt-6 px-1">
                                {Array.from({ length: 9 }).map((_, i) => <div key={i} className="aspect-square bg-[#F4A7C3]"></div>)}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 items-start h-full justify-center">
                        <Link href="/pages/contact" className="btn-pill bg-white text-[#C8006A] font-extrabold no-underline shadow-lg hover:scale-105 transition-transform">GO TO CONTACT PAGE</Link>
                        <Link href="/pages/careers" className="btn-pill bg-[#F4A7C3] text-white no-underline shadow-lg hover:scale-105 transition-transform">WORK WITH US / CAREERS</Link>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn-pill bg-[#111] text-white no-underline hover:scale-105 transition-transform">LINKEDIN</a>
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
