"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function CorporateQuotationPage() {
    const [formData, setFormData] = useState({ name: '', company: '', people: '', notes: '', email: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const errs: Record<string, string> = {};
        if (!formData.name.trim()) errs.name = 'Your name is required';
        if (!formData.email.trim()) errs.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Please enter a valid email';
        if (!formData.company.trim()) errs.company = 'Company name is required';
        if (!formData.people.trim()) errs.people = 'Number of participants is required';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setStatus('loading');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    type: 'corporate-quotation',
                    name: formData.name,
                    company: formData.company,
                    people: formData.people,
                    notes: formData.notes,
                }),
            });
            if (!res.ok) throw new Error('Failed');
            setStatus('success');
        } catch {
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <main className="page active bg-cream" style={{ backgroundColor: '#FAF7F0', minHeight: '100vh' }}>
                <div style={{ height: '12px', backgroundColor: '#9D174D', width: '100%' }}></div>
                <div style={{ padding: '120px 8%', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '20px' }}>✓</div>
                    <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: '2.5rem', color: '#9D174D', marginBottom: '16px' }}>Request Received!</h2>
                    <p style={{ fontSize: '1rem', color: '#555', lineHeight: 1.7, marginBottom: '30px' }}>
                        Thank you, {formData.name}. We&apos;ll prepare a customized quotation for <strong>{formData.company}</strong> and reach out to you shortly.
                    </p>
                    <Link href="/" style={{ color: '#9D174D', fontWeight: 'bold', textDecoration: 'underline', fontSize: '1rem' }}>
                        ← Back to Home
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="page active bg-cream" style={{ backgroundColor: '#FAF7F0', minHeight: '100vh' }}>
            <div style={{ height: '12px', backgroundColor: '#9D174D', width: '100%' }}></div>
            
            <div className="subpage-container" style={{ padding: '60px 8%', maxWidth: '1400px', margin: '0 auto' }}>
                <div className="breadcrumb" style={{ fontStyle: 'italic', color: '#555', marginBottom: '10px', marginTop: '20px' }}>
                    Programs / Services
                </div>
                
                <div className="responsive-grid split-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '40px' }}>
                    <div className="left-col staggered-left">
                        <h2 className="subpage-title cursive title-black" style={{ fontFamily: "var(--font-cormorant), serif", fontSize: '4rem', color: '#111111', lineHeight: '1.1', marginTop: '0' }}>
                            Corporate<br/>Language<br/>Training
                        </h2>
                    </div>
                    
                    <div className="right-col staggered-card">
                        <form onSubmit={handleSubmit} className="form-card" style={{ border: '4px solid #A8DDD8', padding: '40px', borderRadius: '24px', backgroundColor: 'white' }}>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: '1.8rem', marginBottom: '20px', color: '#111' }}>
                                ARE YOU PART OF AN ORGANIZATION?
                            </h3>
                            
                            <div style={{ marginBottom: '20px' }}>
                                <label htmlFor="corp-name" style={{ display: 'block', opacity: 0.7, marginBottom: '5px', fontStyle: 'italic', fontSize: '0.9rem' }}>Your name *</label>
                                <input id="corp-name" type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    style={{ width: '100%', padding: '12px 20px', borderRadius: '30px', border: errors.name ? '2px solid #9D174D' : '2px solid #ddd', outline: 'none' }} />
                                {errors.name && <p style={{ color: '#9D174D', fontSize: '0.75rem', marginTop: '4px', fontStyle: 'italic' }}>{errors.name}</p>}
                            </div>
                            
                            <div style={{ marginBottom: '20px' }}>
                                <label htmlFor="corp-email" style={{ display: 'block', opacity: 0.7, marginBottom: '5px', fontStyle: 'italic', fontSize: '0.9rem' }}>Your email *</label>
                                <input id="corp-email" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    style={{ width: '100%', padding: '12px 20px', borderRadius: '30px', border: errors.email ? '2px solid #9D174D' : '2px solid #ddd', outline: 'none' }} />
                                {errors.email && <p style={{ color: '#9D174D', fontSize: '0.75rem', marginTop: '4px', fontStyle: 'italic' }}>{errors.email}</p>}
                            </div>
                            
                            <div style={{ marginBottom: '20px' }}>
                                <label htmlFor="corp-company" style={{ display: 'block', opacity: 0.7, marginBottom: '5px', fontStyle: 'italic', fontSize: '0.9rem' }}>Company name *</label>
                                <input id="corp-company" type="text" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })}
                                    style={{ width: '100%', padding: '12px 20px', borderRadius: '30px', border: errors.company ? '2px solid #9D174D' : '2px solid #ddd', outline: 'none' }} />
                                {errors.company && <p style={{ color: '#9D174D', fontSize: '0.75rem', marginTop: '4px', fontStyle: 'italic' }}>{errors.company}</p>}
                            </div>
                            
                            <div style={{ marginBottom: '20px' }}>
                                <label htmlFor="corp-people" style={{ display: 'block', opacity: 0.7, marginBottom: '5px', fontStyle: 'italic', fontSize: '0.9rem' }}>How many people in your party? *</label>
                                <input id="corp-people" type="number" min="1" value={formData.people} onChange={e => setFormData({ ...formData, people: e.target.value })}
                                    style={{ width: '100%', padding: '12px 20px', borderRadius: '30px', border: errors.people ? '2px solid #9D174D' : '2px solid #ddd', outline: 'none' }} />
                                {errors.people && <p style={{ color: '#9D174D', fontSize: '0.75rem', marginTop: '4px', fontStyle: 'italic' }}>{errors.people}</p>}
                            </div>
                            
                            <div style={{ marginBottom: '20px' }}>
                                <label htmlFor="corp-notes" style={{ display: 'block', opacity: 0.7, marginBottom: '5px', fontStyle: 'italic', fontSize: '0.9rem' }}>Additional Notes</label>
                                <textarea id="corp-notes" rows={3} value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                    style={{ width: '100%', padding: '12px 20px', borderRadius: '20px', border: '2px solid #ddd', outline: 'none', resize: 'vertical' }}></textarea>
                            </div>
                            
                            <button type="submit" disabled={status === 'loading'}
                                style={{ width: '100%', padding: '14px', borderRadius: '50px', backgroundColor: status === 'loading' ? '#999' : '#9D174D', color: 'white', fontWeight: 'bold', border: 'none', cursor: status === 'loading' ? 'wait' : 'pointer', textTransform: 'uppercase', transition: 'all 0.3s', fontSize: '0.9rem' }}>
                                {status === 'loading' ? 'Sending...' : 'Get a Quotation →'}
                            </button>
                            
                            {status === 'error' && (
                                <p style={{ marginTop: '12px', fontSize: '0.85rem', color: '#9D174D', textAlign: 'center', fontWeight: 'bold' }}>
                                    Something went wrong. Please try again or email us directly.
                                </p>
                            )}
                            
                            <p style={{ marginTop: '15px', fontSize: '0.8rem', color: '#888', textAlign: 'center', fontStyle: 'italic' }}>
                                We respect your privacy. Your data is only used to prepare your quotation.
                            </p>
                        </form>
                    </div>
                </div>
                
                <div className="bottom-nav" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 'auto', paddingTop: '30px' }}>
                    <Link href="/pages/corporate-training" style={{ color: '#9D174D', fontWeight: 'bold', fontStyle: 'italic', textDecoration: 'underline' }}>← return</Link>
                    <Link href="/" style={{ color: '#9D174D', fontWeight: 'bold', fontStyle: 'italic', textDecoration: 'underline' }}>Go back to the main page</Link>
                </div>
            </div>
        </main>
    );
}
