import React from 'react';
import { client } from '../../sanity/lib/client';
import InteractiveClient from './InteractiveClient';
import FloatingEmailPopup from '../components/FloatingEmailPopup';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface Spotlight {
    name: string;
    slug: string;
    category?: string;
}

export default async function Home() {
    const spotlights: Spotlight[] = await client.fetch(`*[_type == "spotlight"]{
        name,
        "slug": slug.current,
        category
    }`);

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
                            <a href="#spotlights" className="hero-link text-white font-['Pacifico'] text-2xl px-2 underline underline-offset-4">Atelier Spotlights</a>
                            <a href="#insights" className="hero-link text-white font-['Pacifico'] text-2xl px-2 underline underline-offset-4">Insights / Journal</a>
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
                            <a href="#" className="underline hover:text-[#C8006A] transition-colors">Cohorts & Special Programs</a>
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
                    {spotlights.filter(s => !s.category || s.category.includes('FIRST')).length > 0 && (
                        <div className="mb-12">
                            <div className="flex items-center justify-center gap-4 mb-8">
                                <div className="h-[4px] w-20 bg-black"></div>
                                <h3 className="font-['Pacifico'] text-3xl text-black">First Generation</h3>
                                <div className="h-[4px] w-20 bg-black"></div>
                            </div>
                            <div className="sp-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 px-5">
                                {spotlights.filter(s => !s.category || s.category.includes('FIRST')).map((person, idx) => (
                                    <Link key={idx} href={`/pages/spotlight/${person.slug}`} className="retro-browser sp-card group no-underline flex flex-col h-[220px] transition-transform hover:scale-105 active:scale-95 border-b-8 border-r-8 shadow-2xl">
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
                                <div className="h-[4px] w-20 bg-black"></div>
                                <h3 className="font-['Pacifico'] text-3xl text-black">Second Generation</h3>
                                <div className="h-[4px] w-20 bg-black"></div>
                            </div>
                            <div className="sp-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 px-5">
                                {spotlights.filter(s => s.category?.includes('SECOND')).map((person, idx) => (
                                    <Link key={idx} href={`/pages/spotlight/${person.slug}`} className="retro-browser sp-card group no-underline flex flex-col h-[220px] transition-transform hover:scale-105 active:scale-95 border-b-8 border-r-8 shadow-2xl">
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
                <section id="scholarships" className="section-padding bg-[#C8006A] grid grid-cols-1 md:grid-cols-2 gap-10 items-center border-t-4 border-black">
                    <div className="left-col staggered-left">
                        <h2 className="section-title text-black text-6xl mb-8 font-['Pacifico']">Scholarships / Grants</h2>
                        <div className="bg-white p-10 rounded-[24px] shadow-2xl border-4 border-black">
                            <h3 className="text-3xl font-['Pacifico'] mb-4">The Atelier Grants</h3>
                            <p className="text-lg leading-relaxed mb-6 font-bold">We believe in supporting highly motivated students. Our grants cover a significant percentage of programs for language learners who demonstrate commitment and passion.</p>
                            <Link href="/pages/scholarships" className="font-bold underline text-[#C8006A] uppercase tracking-widest hover:text-black transition-colors text-xl">learn more here.</Link>
                        </div>
                    </div>
                    <div className="right-col flex justify-center items-center h-full min-h-[400px]">
                         <div className="star-container flex justify-center items-center relative animate-[spin_20s_linear_infinite]">
                            <div className="star-shape w-[350px] h-[350px] bg-[#F4A7C3] flex flex-col justify-center items-center text-center p-5 shadow-2xl" 
                                 style={{ clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" }}>
                                <div className="font-['Pacifico'] text-[#C8006A] text-2xl">Atelier</div>
                                <div className="font-bold text-4xl text-black">Grants</div>
                                <div className="text-[10px] italic text-black uppercase max-w-[120px] font-black">Scholarships with purpose</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 8. ATELIER SPOTLIGHTS */}
                <section id="spotlights" className="section-padding bg-[#FAF7F0] border-t-4 border-[#C8006A] grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="left-col staggered-left">
                        <h2 className="section-title text-black text-6xl mb-8 font-['Pacifico']">Atelier Spotlight</h2>
                        <div className="bg-[#F4A7C3] p-10 rounded-[24px] space-y-6 shadow-xl border-4 border-[#C8006A]">
                            <p className="text-xl italic font-bold">
                                An exclusive, 'by invitation only' program focused on studying the lives and communication styles of remarkable women from history, science, fashion, and politics.
                            </p>
                            <Link href="/pages/spotlight/gaby" className="text-2xl font-bold underline inline-flex items-center gap-2 text-black hover:text-[#C8006A] transition-all font-['Pacifico']">
                                view full profile. 
                            </Link>
                            <div className="hand-cursor text-4xl animate-bounce ml-5 inline-block">👈</div>
                        </div>
                    </div>
                    <div className="right-col staggered-card h-full">
                        <div className="retro-browser h-full shadow-2xl" style={{ border: '8px solid #C8006A', borderRadius: '24px', overflow: 'hidden' }}>
                             <div className="bg-cover bg-center w-full h-[400px]" style={{ backgroundImage: "url('/pages/atelier spotlights.png')" }}></div>
                        </div>
                    </div>
                </section>

                {/* 9. INSIGHTS / JOURNAL */}
                <section id="insights" className="section-padding bg-[#D9F060] border-t-4 border-[#C8006A] flex flex-col items-center gap-10">
                    <h2 className="section-title text-black text-6xl font-['Pacifico']">Insights / Journal</h2>
                    <div className="card bg-white p-10 rounded-[24px] border-4 border-[#C8006A] shadow-2xl max-w-[800px] text-center">
                        <h3 className="font-['Pacifico'] text-3xl mb-4">Atelier Insights</h3>
                        <p className="text-xl font-bold italic mb-8">Our official journal covering advanced topics on language learning, global communication, cultural intelligence, women in history, and professional development.</p>
                        <Link href="/pages/insights" className="btn-pill bg-[#C8006A] text-white no-underline shadow-xl hover:scale-105 transition-transform inline-block py-4 px-10 rounded-full font-black">ACCESS JOURNAL HERE</Link>
                    </div>
                </section>

                {/* 10. CONTACT */}
                <section id="contact" className="section-padding bg-[#C8006A] text-white grid grid-cols-1 md:grid-cols-3 gap-10 items-center border-t-4 border-black">
                    <h2 className="text-6xl md:col-span-3 font-['Pacifico']">Reach out</h2>
                    <div className="contact-info">
                        <div className="font-black opacity-80 mb-2 uppercase text-sm tracking-widest">PHONE</div>
                        <p className="text-xl mb-4 font-bold italic">Worldwide Contact - WhatsApp:<br/>(+52) 552 113 1676</p>
                        <p className="text-xl mb-8 font-bold italic">Mexico Call Center:<br/>(+52) 561 759 2347</p>
                        <div className="font-black opacity-80 mb-2 uppercase text-sm tracking-widest">EMAIL</div>
                        <a href="mailto:theenglishateliere@gmail.com" className="text-xl underline italic text-white hover:text-[#D9F060] font-bold">theenglishateliere@gmail.com</a>
                    </div>
                    <div className="mockup-phone w-[260px] h-[500px] border-8 border-white rounded-[40px] mx-auto relative bg-[#FAF7F0] overflow-hidden shadow-2xl">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[25px] bg-white rounded-b-2xl"></div>
                        <div className="pt-10 text-black text-center px-4">
                            <div className="w-20 h-20 bg-[#C8006A] rounded-full mx-auto mb-4 overflow-hidden border-2 border-white shadow-lg">
                                <img src="/pages/gaby.png" alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            <div className="font-bold text-lg">theatelier.lab</div>
                            <div className="flex justify-around mt-4 text-xs font-bold">
                                <div><strong>124</strong><br/>posts</div>
                                <div><strong>24K</strong><br/>followers</div>
                                <div><strong>0</strong><br/>following</div>
                            </div>
                            <a href="https://www.instagram.com/theatelier.lab/" target="_blank" rel="noopener noreferrer" 
                               className="mt-4 block bg-[#C8006A] text-white py-2 rounded-lg font-bold text-sm shadow-md hover:bg-black transition-colors">
                                Follow on Instagram
                            </a>
                            <div className="grid grid-cols-3 gap-1 mt-6">
                                {Array.from({ length: 9 }).map((_, i) => <div key={i} className="aspect-square bg-[#F4A7C3] opacity-50"></div>)}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6 items-start h-full justify-center">
                        <Link href="/pages/contact" className="btn-pill bg-white text-[#C8006A] font-black no-underline shadow-lg hover:scale-105 transition-transform py-4 px-8 rounded-full">CONTACT FORM</Link>
                        <Link href="/pages/careers" className="btn-pill bg-[#F4A7C3] text-white no-underline shadow-lg hover:scale-105 transition-transform py-4 px-8 rounded-full font-black">WORK WITH US / CAREERS</Link>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn-pill bg-[#111] text-white no-underline hover:scale-105 transition-transform py-4 px-8 rounded-full font-black">LINKEDIN</a>
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
