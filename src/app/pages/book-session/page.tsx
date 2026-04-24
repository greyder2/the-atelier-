"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import FAQAccordion from '@/components/FAQAccordion';

export default function BookSessionPage() {
    const calendlyLoaded = useRef(false);

    useEffect(() => {
        if (calendlyLoaded.current) return;
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://assets.calendly.com/assets/external/widget.css';
        document.head.appendChild(link);
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        document.head.appendChild(script);
        calendlyLoaded.current = true;
    }, []);

    const calendlyUrl = `https://calendly.com/theenglishateliere/new-meeting?hide_gdpr_banner=1&primary_color=D4006A`;

    return (
        <main className="page active bg-white" style={{ backgroundColor: 'white', minHeight: '100vh', display: 'flex' }}>
            <div style={{ height: '12px', backgroundColor: '#9D174D', width: '100%', position: 'absolute', top: 0 }}></div>
            
            <div className="subpage-container" style={{ padding: '60px 8%', maxWidth: '1400px', margin: '0 auto', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h2 className="subpage-title" style={{ fontFamily: "var(--font-cormorant), serif", fontSize: '4rem', color: '#9D174D', marginBottom: '10px', textAlign: 'center' }}>
                    Book a Free Session
                </h2>
                <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666', fontStyle: 'italic', marginBottom: '30px', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
                    No commitment — your first session is complimentary. Pick a time that works for you.
                </p>

                {/* Calendly Embed */}
                <div style={{ 
                    border: '4px solid #9D174D', 
                    borderRadius: '24px', 
                    overflow: 'hidden', 
                    maxWidth: '700px', 
                    width: '100%', 
                    margin: '0 auto',
                    boxShadow: '12px 12px 0px rgba(200,0,106,0.15)'
                }}>
                    <div style={{ backgroundColor: 'white', borderBottom: '4px solid #9D174D', padding: '8px 14px', display: 'flex', gap: '8px', alignItems: 'center', fontFamily: 'monospace', fontWeight: 'bold', color: '#9D174D' }}>
                        <span>x</span> <span>□</span> <span>—</span>
                        <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#999', fontWeight: 'normal' }}>calendly.com</span>
                    </div>
                    <div
                        className="calendly-inline-widget"
                        data-url={calendlyUrl}
                        style={{ minWidth: '320px', height: '660px' }}
                    />
                </div>
                
                <FAQAccordion />

                <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#999', fontStyle: 'italic', marginTop: '20px' }}>
                    We respect your privacy. Your information is only used to schedule your session.
                </p>
                
                <div className="bottom-nav" style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '40px' }}>
                    <Link href="/" style={{ color: '#9D174D', fontWeight: 'bold', fontStyle: 'italic', textDecoration: 'underline' }}>
                        Go back to the main page
                    </Link>
                </div>
            </div>
        </main>
    );
}
