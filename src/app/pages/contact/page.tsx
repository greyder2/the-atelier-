"use client";

import React from 'react';
import Link from 'next/link';

export default function ContactPage() {
    return (
        <main className="page active bg-[#FAF7F0]" style={{ backgroundColor: '#FAF7F0', minHeight: '100vh' }}>
            <div style={{ height: '12px', backgroundColor: '#C8006A', width: '100%' }}></div>
            
            <div className="subpage-container" style={{ padding: '60px 8%', maxWidth: '1400px', margin: '0 auto' }}>
                <div className="breadcrumb" style={{ fontStyle: 'italic', color: '#555', marginBottom: '10px' }}>
                    The Atelier / Contact
                </div>
                
                <h2 className="subpage-title cursive title-black" style={{ fontFamily: "'Pacifico', cursive", fontSize: '4rem', color: '#111111', marginBottom: '30px' }}>
                    Contact Us
                </h2>
                
                <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center' }}>
                    <div className="retro-browser" style={{ width: '100%', maxWidth: '1000px', border: '4px solid #C8006A', borderRadius: '12px', overflow: 'hidden', backgroundColor: 'white' }}>
                        <div className="retro-header" style={{ borderBottom: '4px solid #C8006A', padding: '6px 12px', display: 'flex', gap: '8px' }}>
                            <span style={{ color: '#C8006A' }}>x</span> <span style={{ color: '#C8006A' }}>□</span> <span style={{ color: '#C8006A' }}>—</span>
                        </div>
                        <img src="/pages/contact.png" alt="Contact Information" style={{ width: '100%', display: 'block' }} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="card" style={{ backgroundColor: '#D9F060', borderRadius: '24px', padding: '40px', color: '#111111' }}>
                        <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '20px' }}>Reach out</h3>
                        <div className="mb-6">
                            <div style={{ opacity: 0.7, textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 'bold' }}>Phone</div>
                            <p style={{ fontSize: '1.2rem' }}>WhatsApp: (+52) 552 113 1676</p>
                            <p style={{ fontSize: '1.2rem' }}>Call Center: (+52) 561 759 2347</p>
                        </div>
                        <div className="mb-6">
                            <div style={{ opacity: 0.7, textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 'bold' }}>Email</div>
                            <p style={{ fontSize: '1.2rem' }}>theenglishateliere@gmail.com</p>
                        </div>
                    </div>
                    
                    <div className="card" style={{ backgroundColor: '#F4A7C3', borderRadius: '24px', padding: '40px', color: '#111111' }}>
                        <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '20px' }}>Send a Message</h3>
                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontStyle: 'italic' }}>Name</label>
                            <input type="text" className="form-input" style={{ width: '100%', padding: '12px 20px', borderRadius: '30px', border: '2px solid #ddd' }} />
                        </div>
                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontStyle: 'italic' }}>Message</label>
                            <textarea className="form-input" rows={3} style={{ width: '100%', padding: '12px 20px', borderRadius: '20px', border: '2px solid #ddd' }}></textarea>
                        </div>
                        <button className="btn-pill" style={{ backgroundColor: '#C8006A', color: 'white', padding: '14px 36px', borderRadius: '50px', fontWeight: 'bold', width: '100%' }}>
                            SUBMIT
                        </button>
                    </div>
                </div>

                <div className="bottom-nav" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '60px' }}>
                    <Link href="/" style={{ color: '#C8006A', fontWeight: 'bold', fontStyle: 'italic', textDecoration: 'underline' }}>← return</Link>
                    <Link href="/" style={{ color: '#C8006A', fontWeight: 'bold', fontStyle: 'italic', textDecoration: 'underline' }}>Go back to the main page</Link>
                </div>
            </div>
        </main>
    );
}
