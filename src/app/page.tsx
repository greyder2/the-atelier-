import React from 'react';
import { client } from '../../sanity/lib/client';
import InteractiveClient from './InteractiveClient';
import FloatingEmailPopup from '../components/FloatingEmailPopup';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Home() {
    let spotlights: any[] = [];
    try {
        spotlights = await client.fetch(`*[_type == "spotlight"] | order(_createdAt asc) {
          _id, name, "slug": slug.current, shortQuote, body,
          "imageUrl": image.asset->url
        }`);
    } catch (e) {
        spotlights = [];
    }

    return (
        <main>
            <InteractiveClient />
            
            <div dangerouslySetInnerHTML={{__html: `
    <div id="page-main" class="page active">
    
    <!-- 2. HERO / INDEX -->
    <section id="index" class="hero-section">
        <div id="hero">
            <h1 class="hero-title" aria-label="The Atelier">
                <div class="line1">The</div>
                <div class="line2">Atelier</div>
            </h1>
            <div class="hero-banner italic-upper">
                Where ambitious minds learn to speak the world
            </div>
            <nav class="hero-nav">
                <div class="row">
                    <a href="/">Home</a> &middot; 
                    <a href="/pages/about-us">About Us</a> &middot; 
                    <a href="#programs">Programs / Services</a> &middot; 
                    <a href="#corporate">Corporate Training</a> &middot; 
                    <a href="#social-proof">Social Proof</a> &middot; 
                    <a href="/dashboard" style="color: var(--hot-pink); font-weight: bold; border-bottom: 2px solid var(--hot-pink);">CLIENT PORTAL</a>
                </div>
                <div class="row">
                    <a href="#scholarships">Scholarships / Grants</a> &middot; 
                    <a href="#spotlights">Atelier Spotlights</a> &middot; 
                    <a href="#insights">Insights / Journal</a> &middot; 
                    <a href="#contact">Contact</a> &middot; 
                    <a href="#careers">Work with us</a>
                </div>
            </nav>
        </div>
    </section>

    <!-- 3. HOME / ABOUT -->
    <section id="about" class="section-padding">
        <div class="about-left staggered-left">
            <h2 class="title">The Atelier</h2>
            <div class="subtitle">Language, Culture & Confidence for the Global Voices.</div>
            <ul>
                <li><span>★</span> <i>LANGUAGE EDUCATION</i> — ENGLISH PROGRAMS DESIGNED FOR AMBITIOUS PROFESSIONALS.</li>
                <li><span>★</span> <i>CULTURAL INTELLIGENCE</i> — LEARN LANGUAGE THROUGH HISTORY, ART, AND GLOBAL CULTURE.</li>
                <li><span>★</span> <i>CONFIDENCE & COMMUNICATION</i> — SPEAK WITH CLARITY, ELEGANCE AND PRESENCE.</li>
            </ul>
        </div>
        <div class="about-right staggered-card">
            <a href="/pages/book-session" class="speech-bubble" style="cursor:pointer; display:block; text-decoration:none;">
                JOIN THE ATELIER! <br>BOOK A FREE SESSION HERE
            </a>
            <div class="hand-cursor">👈</div>
        </div>
        <div class="about-bottom-nav">
            <a href="/pages/about-us">ABOUT US</a> &middot; 
            <a href="#programs">EXPLORE PROGRAMS</a> &middot; 
            <a href="#careers">WORK WITH US</a> &middot; 
            <a href="#social-proof">SOCIAL PROOF</a> &middot; 
            <a href="#spotlights">FEATURED PROGRAM</a>
        </div>
    </section>

    <!-- 4. PROGRAMS / SERVICES -->
    <section id="programs" class="section-padding">
        <div class="left-col staggered-left">
            <h2 class="section-title">Programs / Services</h2>
            <a href="/pages/private-coaching">Private Coaching</a>
            <a href="/pages/subscriptions">Atelier Subscriptions</a>
            <a href="/pages/corporate-training">Corporate Language Training</a>
            <a href="#">Cohorts & Special Programs</a>
        </div>
        <div class="right-col staggered-card">
            <h3>Atelier Programs</h3>
            <p>Our programs are built on the principles of conversation, critical thinking, and global perspective. Whether you choose private mentoring or a group subscription, you are joining a community of curious minds.</p>
        </div>
    </section>

    <!-- 5. CORPORATE -->
    <section id="corporate" class="section-padding">
        <div class="left-col staggered-left">
            <div class="breadcrumb">The Atelier / Programs / Services</div>
            <h2>Corporate<br>Language<br>Training</h2>
        </div>
        <div class="right-col staggered-card">
            <div class="card card-mint">
                <p>We design customized programs for international companies seeking to strengthen communication across global teams.</p>
                <ul>
                    <li>★ Professional English for International Business</li>
                    <li>★ Cultural Intelligence for Global Teams</li>
                    <li>★ Leadership Communication & Presence</li>
                </ul>
                <a href="/pages/corporate-training" class="btn-pill btn-pink overlapping-btn pulse">LEARN MORE HERE</a>
            </div>
        </div>
    </section>

    <!-- 6. SOCIAL PROOF (GRID) -->
    <section id="social-proof" class="section-padding">
        <h2 class="section-title staggered-left">The Atelier Social Proof</h2>
        <div class="sp-subtitle staggered-left">Trusted by ambitious professionals and global leaders worldwide.</div>
        
        <div class="sp-grid">
            <div class="sp-card staggered-card grad1"><div class="sp-content"></div><div class="sp-nav">COACHING</div></div>
            <div class="sp-card staggered-card grad2"><div class="sp-content"></div><div class="sp-nav">SUBSCRIPTIONS</div></div>
            <div class="sp-card staggered-card grad3"><div class="sp-content"></div><div class="sp-nav">CORPORATE</div></div>
            <div class="sp-card staggered-card grad4"><div class="sp-content"></div><div class="sp-nav">SPOTLIGHTS</div></div>
            <div class="sp-card staggered-card grad5"><div class="sp-content"></div><div class="sp-nav">INSIGHTS</div></div>
            <div class="sp-card staggered-card grad6"><div class="sp-content"></div><div class="sp-nav">ATELIER</div></div>
        </div>
    </section>

    <!-- 7. SCHOLARSHIPS / GRANTS -->
    <section id="scholarships" class="section-padding">
        <div class="left-col staggered-left">
            <h2 class="section-title">Scholarships / Grants</h2>
            <div class="card card-white grants-card">
                <h3>The Atelier Grants</h3>
                <p>We believe in supporting highly motivated students. Our grants cover a significant percentage of programs for language learners who demonstrate commitment and passion.</p>
                <a href="#">click here.</a>
            </div>
        </div>
        <div class="right-col star-container">
            <div class="star-shape attr-star">
                <div class="star-text-1">Atelier</div>
                <div class="star-text-2">Grants</div>
                <div class="star-text-3">SCHOLARSHIPS WITH PURPOSE</div>
            </div>
        </div>
    </section>

    <!-- 8. ATELIER SPOTLIGHTS -->
    <section id="spotlights" class="section-padding">
        <div class="left-col staggered-left">
            <h2 class="section-title">Atelier<br>Spotlights</h2>
            <div class="card">
                <p style="font-size: 1.2rem; font-style: italic; margin-bottom: 20px;">An exclusive, 'by invitation only' program focused on studying the lives and communication styles of remarkable women from history, science, fashion, and politics.</p>
                <a href="/pages/private-coaching" style="font-weight: bold; text-decoration: underline; font-size: 1.2rem; color: var(--black);">click here.</a>
                <div class="hand-cursor" style="margin-left: 10px;">👈</div>
            </div>
        </div>
        <div class="right-col staggered-card">
            <div class="spotlight-img"></div>
        </div>
    </section>

    <!-- 9. INSIGHTS / JOURNAL -->
    <section id="insights" class="section-padding">
        <div class="insights-left staggered-left">
            <h2 class="section-title">Insights / Journal</h2>
            <div style="font-style: italic; margin-top:-20px; margin-bottom: 20px; font-weight: bold;">Atelier Insights</div>
            <a href="#" class="btn-pill btn-pink pulse">ACCESS HERE</a>
            <p>Our official journal covering advanced topics on language learning, global communication, cultural intelligence, women in history, and professional development.</p>
        </div>
        <div class="insights-right staggered-card">
            <div class="insights-browser">
                <div class="insights-browser-head"><span>x</span> <span style="margin-left: 10px; color: #555;">index.html</span></div>
                <div class="insights-img"></div>
            </div>
        </div>
    </section>

    <!-- 10. CONTACT -->
    <section id="contact" class="section-padding">
        <h2 class="section-title staggered-left">Reach out</h2>
        <div class="contact-info staggered-left">
            <div class="label">PHONE</div>
            <p>Worldwide Contact - WhatsApp:<br><a href="#">(+52) 552 113 1676</a></p>
            <p>Mexico Call Center:<br><a href="#">(+52) 561 759 2347</a></p>
            
            <div class="label" style="margin-top:40px;">EMAIL</div>
            <p><a href="mailto:theenglishateliere@gmail.com">theenglishateliere@gmail.com</a></p>
        </div>
        <div class="mockup-phone staggered-card">
            <div class="mockup-notch"></div>
            <div class="mockup-ig">
                <div class="ig-avatar"></div>
                <div class="ig-name">theatelier.lab</div>
                <br>
                <div style="display:flex; justify-content:space-evenly; font-size: 0.8rem;">
                    <div><strong>124</strong><br>posts</div>
                    <div><strong>24K</strong><br>followers</div>
                    <div><strong>0</strong><br>following</div>
                </div>
                <div class="ig-grid">
                    <div class="grad1"></div><div class="grad2"></div><div class="grad3"></div>
                    <div class="grad4"></div><div class="grad5"></div><div class="grad6"></div>
                    <div class="grad1"></div><div class="grad2"></div><div class="grad3"></div>
                </div>
            </div>
        </div>
        <div class="contact-btns staggered-card" style="position:relative; height: 100%;">
            <div style="display:flex; flex-direction:column; justify-content:center; height:100%; gap: 20px;">
                <a href="#" class="btn-pill btn-pink pulse">CONTACT FORM</a>
                <a href="#" class="btn-pill btn-light-pink">LINKEDIN</a>
            </div>
        </div>
    </section>

    <!-- 11. CAREERS -->
    <section id="careers" class="section-padding">
        <h2 class="section-title staggered-left">Careers at the Atelier</h2>
        <h3 class="staggered-left" style="font-family: 'Pacifico', cursive; font-size: 2.5rem; margin-bottom: 20px;">Join us</h3>
        <p class="staggered-card">We are always looking to connect with talented people. If you share our passion for language education, cultural intelligence, and empowering professionals globally, we would love to hear from you. Send us your CV and a brief introduction to:</p>
        <a href="mailto:theenglishateliere@gmail.com" class="staggered-card pulse" style="display:inline-block; font-weight:bold; font-size:1.5rem; color:var(--hot-pink);">theenglishateliere@gmail.com</a>
    </section>

    </div>
    `}} />

            {/* Legacy sections removed - now in separate pages! */}

            <FloatingEmailPopup />
            <footer style={{ backgroundColor: 'var(--hot-pink)', color: 'white', textAlign: 'center', padding: '40px 0' }}>
                <p>&copy; 2026 The Atelier. All Rights Reserved.</p>
                <div style={{ marginTop: '10px' }}>
                  <Link href="/pages/about-us" style={{ color: 'white', margin: '0 10px', textDecoration: 'underline' }}>About Us</Link>
                  <Link href="/pages/book-session" style={{ color: 'white', margin: '0 10px', textDecoration: 'underline' }}>Join Now</Link>
                </div>
            </footer>
        </main>
    );
}
