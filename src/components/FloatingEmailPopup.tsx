"use client";
import React, { useState } from 'react';

export default function FloatingEmailPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
        const res = await fetch('/api/contact', {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: { 'Content-Type': 'application/json' }
        });
        if(res.ok) {
            setStatus('Thanks! We will be in touch.');
            setEmail('');
        } else {
            setStatus('Error. Please try again.');
        }
    } catch (e) {
        setStatus('Error. Please try again.');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {isOpen && (
            <div className="bg-white border-4 border-[var(--hot-pink)] p-6 rounded-[24px] shadow-2xl mb-4 w-72">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-pacifico text-[var(--hot-pink)] text-xl">Get in touch!</h3>
                    <button onClick={() => setIsOpen(false)} className="font-bold text-gray-500">X</button>
                </div>
                <p className="font-dm-sans text-sm italic text-gray-600 mb-4">Leave your email and we'll reach out to schedule a free demo session.</p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <input 
                        type="email" 
                        required 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="your@email.com" 
                        className="bg-gray-100 border-2 border-gray-200 rounded-full py-2 px-4 focus:outline-none focus:border-[var(--hot-pink)] font-dm-sans text-black"
                    />
                    <button type="submit" className="bg-[var(--lime)] text-black font-bold py-2 px-4 rounded-full mt-2 uppercase">Submit 👈</button>
                </form>
                {status && <p className="text-sm mt-3 font-semibold text-center text-black">{status}</p>}
            </div>
        )}
        
        {!isOpen && (
            <button 
                onClick={() => setIsOpen(true)}
                className="bg-[var(--hot-pink)] text-white font-pacifico text-2xl py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-transform border-[3px] border-white pulse"
            >
                Contact Us
            </button>
        )}
    </div>
  );
}
