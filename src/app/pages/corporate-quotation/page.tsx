"use client";

import React from 'react';
import Link from 'next/link';

export default function CorporateQuotationPage() {
    return (
        <main className="page active bg-cream" style={{ backgroundColor: '#FAF7F0', minHeight: '100vh' }}>
            <div style={{ height: '12px', backgroundColor: '#C8006A', width: '100%' }}></div>
            
            <div className="subpage-container" style={{ padding: '60px 8%', maxWidth: '1400px', margin: '0 auto' }}>
                <div className="breadcrumb" style={{ fontStyle: 'italic', color: '#555', marginBottom: '10px', marginTop: '20px' }}>
                    Programs / Services
                </div>
                
                <div className="responsive-grid split-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '40px' }}>
                    <div className="left-col staggered-left">
                        <h2 className="subpage-title cursive title-black" style={{ fontFamily: "'Pacifico', cursive", fontSize: '4rem', color: '#111111', lineHeight: '1.1', marginTop: '0' }}>
                            Corporate<br/>Language<br/>Training
                        </h2>
                    </div>
                    
                    <div className="right-col staggered-card">
                        <div className="form-card" style={{ border: '4px solid #A8DDD8', padding: '40px', borderRadius: '24px', backgroundColor: 'white' }}>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: '1.8rem', marginBottom: '20px', color: '#111' }}>
                                ARE YOU PART OF AN ORGANIZATION?
                            </h3>
                            <div className="form-group" style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', opacity: 0.7, marginBottom: '5px', fontStyle: 'italic', fontSize: '0.9rem' }}>Your name</label>
                                <input type="text" className="form-input" style={{ width: '100%', padding: '12px 20px', borderRadius: '30px', border: '2px solid #ddd' }} />
                            </div>
                            <div className="form-group" style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', opacity: 0.7, marginBottom: '5px', fontStyle: 'italic', fontSize: '0.9rem' }}>Company name</label>
                                <input type="text" className="form-input" style={{ width: '100%', padding: '12px 20px', borderRadius: '30px', border: '2px solid #ddd' }} />
                            </div>
                            <div className="form-group" style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', opacity: 0.7, marginBottom: '5px', fontStyle: 'italic', fontSize: '0.9rem' }}>How many people are in your party?</label>
                                <input type="number" className="form-input" style={{ width: '100%', padding: '12px 20px', borderRadius: '30px', border: '2px solid #ddd' }} />
                            </div>
                            <div className="form-group" style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', opacity: 0.7, marginBottom: '5px', fontStyle: 'italic', fontSize: '0.9rem' }}>Additional Notes</label>
                                <textarea className="form-input" rows={3} style={{ width: '100%', padding: '12px 20px', borderRadius: '20px', border: '2px solid #ddd' }}></textarea>
                            </div>
                            <button className="btn-pill" style={{ width: '100%', padding: '14px', borderRadius: '50px', backgroundColor: '#C8006A', color: 'white', fontWeight: 'bold', border: 'none', cursor: 'pointer', textTransform: 'uppercase', transition: 'transform 0.3s' }}>
                                Get a quotation
                            </button>
                            <p style={{ marginTop: '15px', fontSize: '0.8rem', color: '#888', textAlign: 'center', fontStyle: 'italic' }}>
                                By submitting this form, you agree to our terms and conditions.
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="bottom-nav" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 'auto', paddingTop: '30px' }}>
                    <Link href="/pages/corporate-training" style={{ color: '#C8006A', fontWeight: 'bold', fontStyle: 'italic', textDecoration: 'underline' }}>← return</Link>
                    <Link href="/" style={{ color: '#C8006A', fontWeight: 'bold', fontStyle: 'italic', textDecoration: 'underline' }}>Go back to the main page</Link>
                </div>
            </div>
        </main>
    );
}
