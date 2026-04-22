
import React from 'react';
import { client } from '../../sanity/lib/client';
import InteractiveClient from './InteractiveClient';
import FloatingEmailPopup from '../components/FloatingEmailPopup';

export const dynamic = 'force-dynamic';

export default async function Home() {
    // 1. Fetch dynamic data from Sanity (graceful fallback if not configured yet)
    let spotlights: any[] = [];
    try {
        spotlights = await client.fetch(`*[_type == "spotlight"] | order(_createdAt asc) {
          _id, name, "slug": slug.current, shortQuote, body,
          "imageUrl": image.asset->url
        }`);
    } catch (e) {
        // Sanity not configured yet — use empty array, site still works with hardcoded HTML
        spotlights = [];
    }

    return (
        <main>
            <InteractiveClient />
            
            {/* Top portion of original HTML */}
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
                    <a href="#" onclick="showPage('page-about-us'); return false;">Home</a> &middot; 
                    <a href="#" onclick="showPage('page-about-us'); return false;" onclick="showPage('page-about-us'); return false;">About Us</a> &middot; 
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
            <div class="speech-bubble" style="cursor:pointer" onclick="showPage('page-book-session')">
                JOIN THE ATELIER! <br>BOOK A FREE SESSION HERE
            </div>
            <div class="hand-cursor">👈</div>
            <a href="#index" class="go-back" style="margin-top: auto; color: var(--hot-pink);">Go back to the main page</a>
        </div>
        <div class="about-bottom-nav">
            <a href="#" onclick="showPage('page-about-us'); return false;">ABOUT US</a> &middot; 
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
            <a href="#" onclick="showPage('page-private-coaching'); return false;">Private Coaching</a>
            <a href="#" onclick="showPage('page-subscriptions'); return false;">Atelier Subscriptions</a>
            <a href="#" onclick="showPage('page-corporate-training-info'); return false;">Corporate Language Training</a>
            <a href="#">Cohorts & Special Programs</a>
        </div>
        <div class="right-col staggered-card">
            <div class="card">
                <h3>Our Programs</h3>
                <p>The Atelier offers a range of programs designed to support different learning goals and lifestyles.</p>
            </div>
        </div>
    </section>

    <!-- 5. CORPORATE LANGUAGE TRAINING -->
    <section id="corporate" class="section-padding">
        <div class="left-col staggered-left">
            <div class="breadcrumb">Programs / Services</div>
            <h2>Corporate<br>Language<br>Training</h2>
            <a href="#" onclick="showPage('page-corporate-quotation-form'); return false;" class="btn-pill btn-pink pulse">GET A CUSTOMIZED QUOTATION</a>
        </div>
        <div class="right-col staggered-card">
            <div class="card card-mint">
                <p>We design customized language training programs for international companies seeking to strengthen communication across global teams.</p>
                <p>Programs can include:</p>
                <ul>
                    <li>★ Professional English for international collaboration</li>
                    <li>★ Industry-specific vocabulary</li>
                    <li>★ Presentation and communication training</li>
                    <li>★ Leadership communication skills</li>
                </ul>
                <div class="overlapping-btn">
                    <a href="#" onclick="showPage('page-book-session'); return false;" class="btn-pill btn-pink pulse" style="box-shadow: 0 4px 15px rgba(0,0,0,0.2);">JOIN THE ATELIER! / BOOK A FREE SESSION HERE <span style="font-size:1.2rem">👆</span></a>
                </div>
            </div>
        </div>
    </section>

    <!-- 6. SOCIAL PROOF -->
    <section id="social-proof" class="section-padding">
        <h2 class="section-title staggered-left">Social Proof</h2>
        <p class="italic-upper sp-subtitle staggered-left">TESTIMONIALS FROM THE AMERICAS (MEXICO), ASIA (TÜRKİYE, LEBANON, LIBYA), AND EUROPE (POLAND).</p>
        `}} />
            
            {/* Dynamic Social Proof Grid */}
            <div className="sp-grid">
                {spotlights.map((s: any) => (
                    <div key={s._id} className="retro-browser sp-card" style={{cursor: 'pointer'}} onClick={(e: any) => { e.preventDefault(); if(typeof window !== 'undefined') (window as any).showPage('page-spotlight-' + s.slug); }}>
                        <div className="retro-header"><span>x</span> <span>o</span> <span>—</span></div>
                        <div className="sp-content" style={{background: `url('${s.imageUrl || '/pages/Mayan.png'}') center/cover`}}></div>
                        <div className="sp-nav">&lt; &gt;</div>
                    </div>
                ))}
            </div>

            {/* Middle portion of original HTML (after grid, before profiles) */}
            <div dangerouslySetInnerHTML={{__html: `</section>

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
            <a href="#index" class="go-back" style="position:absolute; bottom:0; right:0; color:var(--black);">Go back to the main page</a>
        </div>
    </section>

    <!-- 8. ATELIER SPOTLIGHTS -->
    <section id="spotlights" class="section-padding">
        <div class="left-col staggered-left">
            <h2 class="section-title">Atelier<br>Spotlights</h2>
            <div class="card">
                <p style="font-size: 1.2rem; font-style: italic; margin-bottom: 20px;">An exclusive, 'by invitation only' program focused on studying the lives and communication styles of remarkable women from history, science, fashion, and politics.</p>
                <a href="#" onclick="showPage('page-spotlight-gaby'); return false;" style="font-weight: bold; text-decoration: underline; font-size: 1.2rem; color: var(--black);">click here.</a>
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
            <a href="#index" class="go-back" style="position:absolute; bottom:0; right:0; color:var(--white);">Go back to the main page</a>
        </div>
    </section>

    <!-- 11. CAREERS -->
    <section id="careers" class="section-padding">
        <h2 class="section-title staggered-left">Careers at the Atelier</h2>
        <h3 class="staggered-left" style="font-family: 'Pacifico', cursive; font-size: 2.5rem; margin-bottom: 20px;">Join us</h3>
        <p class="staggered-card">We are always looking to connect with talented people. If you share our passion for language education, cultural intelligence, and empowering professionals globally, we would love to hear from you. Send us your CV and a brief introduction to:</p>
        <a href="mailto:theenglishateliere@gmail.com" class="staggered-card pulse" style="display:inline-block;">theenglishateliere@gmail.com</a>
    </section>

    <!-- GSAP & ScrollTrigger -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    
    </div>

    <!-- GROUP 1: ABOUT US PAGE -->
    <div id="page-about-us" class="page bg-hot-pink">
        <div class="subpage-container">
            <div class="responsive-grid split-layout" style="margin-top: 40px;">
                <div class="card card-white staggered-left text-pink-page-body" style="background-color: var(--light-pink); border-radius: var(--radius-card); text-align: center; color: var(--black);">
                    <h3 style="font-family: 'DM Sans', sans-serif; font-weight: 900; font-size: 2rem; margin-bottom: 20px;">OUR STORY</h3>
                    <p style="text-align: center; font-size: 0.9rem;">THE ATELIER IS A BOUTIQUE LANGUAGE AND CAREER DEVELOPMENT STUDIO DEDICATED TO TEACHING THROUGH CULTURE, CONVERSATION, AND INTELLECTUAL CURIOSITY.<br><br>FOUNDED WITH THE BELIEF THAT LANGUAGE LEARNING SHOULD BE INSPIRING AND MEANINGFUL, THE ATELIER COMBINES TRADITIONAL LANGUAGE EDUCATION WITH GLOBAL CULTURE, HISTORY, AND CONTEMPORARY TOPICS.<br><br>OUR MISSION IS TO HELP STUDENTS AND PROFESSIONALS DEVELOP NOT ONLY LINGUISTIC FLUENCY, BUT ALSO CONFIDENCE, CULTURAL AWARENESS, AND THE ABILITY TO COMMUNICATE THOUGHTFULLY IN AN INTERNATIONAL ENVIRONMENT.</p>
                </div>
                <div class="card staggered-card" style="background-color: var(--lime); border-radius: var(--radius-card); text-align: center; color: var(--black); font-weight: 700;">
                    <h3 style="font-family: 'DM Sans', sans-serif; font-weight: 900; font-size: 2rem; margin-bottom: 20px;">OUR PHILOSOPHY</h3>
                    <p style="margin-bottom: 20px;">WE BELIEVE LANGUAGE LEARNING SHOULD BE:<br>★ CURIOUS ★ CULTURAL ★ INTELLECTUAL ★ PRACTICAL ★ HUMAN ★</p>
                    <p style="margin-bottom: 20px;">INSTEAD OF MEMORIZING ENDLESS GRAMMAR RULES, STUDENTS LEARN THROUGH CONVERSATIONS, IDEAS, GLOBAL PERSPECTIVES AND MEANINGFUL DISCUSSIONS.</p>
                    <p style="margin-bottom: 40px;">LANGUAGE BECOMES A BRIDGE TO UNDERSTANDING THE WORLD.</p>
                    
                    <a href="#" onclick="showPage('page-mayan'); return false;" class="btn-pill" style="background-color: var(--mint); color: var(--black);">DISCOVER THE FOUNDER HERE!</a>
                    <div class="hand-cursor" style="margin-left: 10px;">👈</div>
                </div>
            </div>
            <div class="bottom-nav">
                <a href="#" onclick="showPage('page-main'); return false;">← return</a>
                <a href="#" onclick="showPage('page-main'); return false;">Go back to the main page</a>
            </div>
        </div>
    </div>

    <!-- GROUP 2: FOUNDER PROFILE - MAYAN -->
    <div id="page-mayan" class="page bg-hot-pink">
        <div class="subpage-container">
            <h2 class="subpage-title cursive title-black">Mayan</h2>
            <div class="responsive-grid split-layout" style="margin-top:0px">
                <div class="left-col staggered-left">
                    <div class="retro-browser profile-browser">
                        <div class="retro-header"><span>x</span> <span>□</span> <span>—</span></div>
                        <img src="pages/Mayan.png" alt="Mayan" style="width:100%; display:block; border-bottom: 4px solid var(--hot-pink);">
                        <div class="retro-nav"><span class="btn-pill btn-pink btn-sm">&lt; &gt;</span></div>
                    </div>
                </div>
                <div class="right-col staggered-card text-pink-page-body">
                    <h3 class="white-italic-heading">BEHIND THE ATELIER</h3>
                    <p>MAYAN IS THE FOUNDER OF THE ATELIER, A LANGUAGE & CAREER DEVELOPMENT STUDIO CREATED FOR CURIOUS, AMBITIOUS PEOPLE WHO WANT TO DEVELOP THEIR VOICE IN AN INTERNATIONAL WORLD.<br><br>SHE STUDIED FOOD ENGINEERING AT THE NATIONAL AUTONOMOUS UNIVERSITY OF MEXICO (UNAM) AND BEGAN HER PROFESSIONAL CAREER AS A NEXT GEN TRAINEE AT PEPSICO, WHERE SHE WORKED IN GLOBAL CORPORATE ROLES INCLUDING ENVIRONMENTAL, HEALTH & SAFETY AND LATER PROCUREMENT GOVERNANCE AT THE COMPANY'S MEXICO HEADQUARTERS. HER WORK FOCUSED ON CORPORATE STANDARDS, COMPLIANCE STRUCTURES, AND GLOBAL OPERATIONAL ALIGNMENT—EXPERIENCES THAT SHAPED HER ANALYTICAL THINKING AND STRATEGIC COMMUNICATION SKILLS.<br><br>ALONGSIDE HER CORPORATE CAREER, MAYAN HAS ALWAYS BEEN PASSIONATE ABOUT LANGUAGES AND CULTURAL EXCHANGE. SHE SPEAKS SPANISH AND ENGLISH FLUENTLY, STUDIED ITALIAN, PORTUGUESE AND GERMAN DURING UNIVERSITY, AND IS ALSO EXPLORING FRENCH AND TURKISH AS PART OF HER BROADER INTEREST IN INTERNATIONAL CULTURES AND COMMUNICATION.<br><br>HER TEACHING APPROACH IS INSPIRED BY THE BERLITZ METHOD, FOCUSING ON CONVERSATION, CRITICAL THINKING, AND REAL-WORLD TOPICS RATHER THAN TRADITIONAL MEMORIZATION. THROUGH THE ATELIER, SHE DESIGNS PERSONALIZED PROGRAMS WHERE LANGUAGE BECOMES A TOOL TO DISCUSS IDEAS, CAREERS, CULTURE, TRAVEL, AND GLOBAL PERSPECTIVES.<br><br>AFTER LEAVING THE CORPORATE WORLD TO LIVE ABROAD AND PURSUE A MORE INTERNATIONAL LIFESTYLE, SHE FOUNDED THE ATELIER WITH A SIMPLE IDEA: LANGUAGE LEARNING SHOULD FEEL INTELLECTUALLY STIMULATING, CULTURALLY RICH, AND DEEPLY HUMAN.<br><br>TODAY, THE ATELIER BRINGS TOGETHER WOMEN FROM DIFFERENT COUNTRIES AND PROFESSIONAL PATHS WHO SHARE CURIOSITY ABOUT THE WORLD AND THE AMBITION TO GROW BEYOND BORDERS.</p>
                </div>
            </div>
            <div class="bottom-nav">
                <a href="#" onclick="showPage('page-about-us'); return false;">← return</a>
                <a href="#" onclick="showPage('page-main'); return false;">Go back to the main page</a>
            </div>
        </div>
    </div>

    <!-- GROUP 3A: PRIVATE COACHING -->
    <div id="page-private-coaching" class="page bg-cream">
        <div class="subpage-container">
            <div class="breadcrumb" style="margin-top:20px;">Programs / Services</div>
            <div class="responsive-grid split-layout">
                <div class="left-col staggered-left">
                    <h2 class="subpage-title cursive title-black" style="margin-top: 0;">Private<br>Coaching</h2>
                </div>
                <div class="right-col staggered-card">
                    <div class="card" style="background-color: var(--lime); margin-bottom: 20px;">
                        <p style="font-weight:bold; font-size: 1.2rem; margin-bottom: 15px;">Personalized one-on-one language mentoring.</p>
                        <p style="margin-bottom: 15px;">Ideal for professionals, students and individuals seeking focused guidance and rapid progress.</p>
                        <p style="font-weight:700">Programs include:<br>★ Professional English<br>★ Conversation & Fluency<br>★ Pronunciation<br>★ Interview preparation<br>★ Communication skills</p>
                    </div>
                    <div style="text-align: center;">
                        <a href="#" onclick="showPage('page-book-session'); return false;" class="speech-bubble" style="background-color: var(--hot-pink); color: var(--white); display:inline-block; font-size:1rem; padding: 20px;">JOIN THE ATELIER! / BOOK A FREE SESSION HERE <span class="hand-cursor" style="font-size:1.5rem">👆</span></a>
                    </div>
                </div>
            </div>
            <div class="bottom-nav">
                <a href="#" onclick="showPage('page-main'); return false;">← return</a>
                <a href="#" onclick="showPage('page-main'); return false;">Go back to the main page</a>
            </div>
        </div>
    </div>

    <!-- GROUP 3B: ATELIER SUBSCRIPTIONS -->
    <div id="page-subscriptions" class="page bg-cream">
        <div class="subpage-container">
            <div class="breadcrumb" style="margin-top:20px;">Programs / Services</div>
            <div class="responsive-grid split-layout">
                <div class="left-col staggered-left">
                    <h2 class="subpage-title cursive title-black" style="margin-top:0;">Atelier<br>Subscriptions</h2>
                </div>
                <div class="right-col staggered-card">
                    <div class="card" style="background-color: var(--hot-pink); color: var(--white); margin-bottom: 20px;">
                        <p style="font-weight:bold; font-size: 1.2rem; margin-bottom: 15px;">Our subscription programs provide structured, ongoing language learning.</p>
                        <p style="margin-bottom: 15px;">Students participate in weekly sessions designed to strengthen vocabulary, conversation skills and cultural understanding.</p>
                        <p>Each month focuses on themes such as history, travel, global culture, leadership and professional communication.</p>
                    </div>
                    <div style="text-align: center;">
                        <a href="#" onclick="showPage('page-book-session'); return false;" class="speech-bubble" style="background-color: var(--lime); color: var(--black); display:inline-block; font-size:1rem; padding: 20px;">JOIN THE ATELIER! / BOOK A FREE SESSION HERE <span class="hand-cursor" style="font-size:1.5rem">👆</span></a>
                    </div>
                </div>
            </div>
            <div class="bottom-nav">
                <a href="#" onclick="showPage('page-main'); return false;">← return</a>
                <a href="#" onclick="showPage('page-main'); return false;">Go back to the main page</a>
            </div>
        </div>
    </div>

    <!-- GROUP 3C: CORPORATE LANGUAGE TRAINING (INFO) -->
    <div id="page-corporate-training-info" class="page bg-cream">
        <div class="subpage-container">
            <div class="breadcrumb" style="margin-top:20px;">Programs / Services</div>
            <div class="responsive-grid split-layout">
                <div class="left-col staggered-left">
                    <h2 class="subpage-title cursive title-black" style="margin-top:0">Corporate<br>Language<br>Training</h2>
                    <a href="#" onclick="showPage('page-corporate-quotation-form'); return false;" class="btn-pill btn-pink pulse">GET A CUSTOMIZED QUOTATION</a>
                </div>
                <div class="right-col staggered-card">
                    <div class="card card-mint" style="margin-bottom: 20px;">
                        <p style="font-weight:bold; font-size: 1.2rem; margin-bottom: 15px;">We design customized language training programs for international companies seeking to strengthen communication across global teams.</p>
                        <p style="font-weight:700">Programs can include:<br>★ Professional English for international collaboration<br>★ Industry-specific vocabulary<br>★ Presentation and communication training<br>★ Leadership communication skills</p>
                    </div>
                    <div style="text-align: center;">
                        <a href="#" onclick="showPage('page-book-session'); return false;" class="speech-bubble" style="background-color: var(--hot-pink); color: var(--white); display:inline-block; font-size:1rem; padding: 20px;">JOIN THE ATELIER! / BOOK A FREE SESSION HERE <span class="hand-cursor" style="font-size:1.5rem">👆</span></a>
                    </div>
                </div>
            </div>
            <div class="bottom-nav">
                <a href="#" onclick="showPage('page-main'); return false;">← return</a>
                <a href="#" onclick="showPage('page-main'); return false;">Go back to the main page</a>
            </div>
        </div>
    </div>

    <!-- GROUP 3D: CORPORATE QUOTATION FORM -->
    <div id="page-corporate-quotation-form" class="page bg-cream">
        <div class="subpage-container">
            <div class="breadcrumb" style="margin-top:20px;">Programs / Services</div>
            <div class="responsive-grid split-layout" style="margin-top: 0">
                <div class="left-col staggered-left">
                    <h2 class="subpage-title cursive title-black" style="margin-top:0;">Corporate<br>Language<br>Training</h2>
                </div>
                <div class="right-col staggered-card">
                    <div class="form-card">
                        <h3 style="font-family: 'DM Sans', sans-serif; font-weight: 800; font-size: 1.8rem; margin-bottom: 20px;">ARE YOU PART OF AN ORGANIZATION?</h3>
                        <div class="form-group">
                            <label>Your name</label>
                            <input type="text" class="form-input">
                        </div>
                        <div class="form-group">
                            <label>Company name</label>
                            <input type="text" class="form-input">
                        </div>
                        <div class="form-group">
                            <label>How many people are in your party?</label>
                            <input type="number" class="form-input">
                        </div>
                        <div class="form-group">
                            <label>Additional Notes</label>
                            <textarea class="form-input" rows="3"></textarea>
                        </div>
                        <button class="btn-pill btn-pink btn-full pulse">Get a quotation</button>
                        <p style="margin-top: 15px; font-size: 0.8rem; color: #888; text-align: center; font-style:italic;">By submitting this form, you agree to our terms and conditions.</p>
                    </div>
                </div>
            </div>
            <div class="bottom-nav">
                <a href="#" onclick="showPage('page-corporate-training-info'); return false;">← return</a>
                <a href="#" onclick="showPage('page-main'); return false;">Go back to the main page</a>
            </div>
        </div>
    </div>

    <!-- GROUP 4: BOOK A FREE SESSION -->
    <div id="page-book-session" class="page bg-white">
        <div class="subpage-container" style="justify-content: center; align-items: center; text-align: center;">
            <h2 class="subpage-title cursive title-pink staggered-left">Book a Free Session</h2>
            
            <div class="session-card staggered-card" style="width:100%;">
                <h3>Register to get a free demo!</h3>
                <div style="text-align: left; margin-bottom: 20px;">
                    <div style="margin-bottom: 15px;">
                        <label style="font-style: italic; color: #666; font-size: 0.9rem; margin-left: 10px; margin-bottom:5px; display:block;">Your Name</label>
                        <input type="text" id="booking-name" class="form-input" style="width: 100%;" placeholder="Enter your name">
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label style="font-style: italic; color: #666; font-size: 0.9rem; margin-left: 10px; margin-bottom:5px; display:block;">Your Email</label>
                        <input type="email" id="booking-email" class="form-input" style="width: 100%;" placeholder="Enter your email">
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label style="font-style: italic; color: #666; font-size: 0.9rem; margin-left: 10px; margin-bottom:5px; display:block;">Preferred Date & Time</label>
                        <input type="datetime-local" id="booking-time" class="form-input" style="width: 100%;">
                    </div>
                    <div class="input-group" style="justify-content: center; margin-top: 20px;">
                        <button id="btn-submit-booking" class="btn-pill btn-lime" style="padding: 12px 60px; font-size: 1.1rem; cursor: pointer;">Request Session</button>
                    </div>
                    <div id="booking-message" style="text-align: center; margin-top: 10px; font-weight: bold; display: none;"></div>
                </div>
                <p style="font-size: 0.8rem; color: #888; font-style:italic; text-align: center;">We respect your privacy. Unsubscribe at any time.</p>
            </div>

            <div class="bottom-nav">
                <div style="flex:1"></div>
                <a href="#" onclick="showPage('page-main'); return false;">Go back to the main page</a>
            </div>
        </div>
    </div>

    
    `}} />

            {/* Dynamic Spotlight Pages! */}
            {spotlights.map((s: any) => (
                <div key={s._id} id={'page-spotlight-' + s.slug} className="page bg-hot-pink">
                    <div className="subpage-container split-layout">
                        <div className="left-col staggered-left">
                            <div className="retro-browser profile-browser">
                                <div className="retro-header"><span>x</span> <span>□</span> <span>—</span></div>
                                <img src={s.imageUrl || '/pages/Mayan.png'} alt={s.name} style={{width:'100%', height:'auto', display:'block', objectFit:'cover', borderBottom: '4px solid var(--hot-pink)'}} />
                                <div className="retro-nav"><span className="btn-pill btn-pink btn-sm">&lt; &gt;</span></div>
                            </div>
                        </div>
                        <div className="right-col text-pink-page-body staggered-card" style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                            <h2 className="white-italic-heading">Meet {s.name}...</h2>
                            {s.shortQuote && <p style={{marginBottom: '10px'}}>{s.shortQuote}</p>}
                            <p style={{marginBottom: '20px'}}>
                              {s.body && s.body[0] ? s.body[0].children[0].text : 'Detailed story coming soon...'}
                            </p>
                            <div className="bottom-nav">
                                <a href="#" onClick={(e: any) => { e.preventDefault(); if(typeof window !== 'undefined') (window as any).showPage('page-main'); }}>← return</a>
                                <a href="#" onClick={(e: any) => { e.preventDefault(); if(typeof window !== 'undefined') (window as any).showPage('page-main'); }}>Go back to the main page</a>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <FloatingEmailPopup />
        </main>
    );
}
