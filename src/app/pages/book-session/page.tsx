"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function BookSessionPage() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleBookingSubmit = async (e: any) => {
        e.preventDefault();
        const name = (document.getElementById('booking-name') as HTMLInputElement).value;
        const email = (document.getElementById('booking-email') as HTMLInputElement).value;
        const time = (document.getElementById('booking-time') as HTMLInputElement).value;

        if (!name || !email || !time) {
            alert("Please fill in all fields.");
            return;
        }

        setStatus("loading");

        try {
            const res = await fetch("/api/schedule", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    time,
                    programType: "Free Demo Request"
                })
            });

            if (res.ok) {
                setStatus("success");
            } else {
                throw new Error("Failed");
            }
        } catch (err) {
            setStatus("error");
        }
    };

    return (
        <main className="page active bg-white">
            <div className="subpage-container" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <h2 className="subpage-title cursive title-pink">Book a Free Session</h2>
                
                <div className="session-card" style={{ width: '100%', maxWidth: '600px' }}>
                    {status === "success" ? (
                        <div style={{ padding: '40px' }}>
                            <h3 style={{ color: 'var(--hot-pink)' }}>Success!</h3>
                            <p>We have received your request and will contact you shortly.</p>
                            <Link href="/" className="btn-pill btn-pink" style={{ marginTop: '20px' }}>Back to Home</Link>
                        </div>
                    ) : (
                        <>
                            <h3>Register to get a free demo!</h3>
                            <form onSubmit={handleBookingSubmit} style={{ textAlign: 'left', marginTop: '20px' }}>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ fontStyle: 'italic', color: '#666', fontSize: '0.9rem', marginBottom: '5px', display: 'block' }}>Your Name</label>
                                    <input type="text" id="booking-name" className="form-input" style={{ width: '100%' }} placeholder="Enter your name" required />
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ fontStyle: 'italic', color: '#666', fontSize: '0.9rem', marginBottom: '5px', display: 'block' }}>Your Email</label>
                                    <input type="email" id="booking-email" className="form-input" style={{ width: '100%' }} placeholder="Enter your email" required />
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ fontStyle: 'italic', color: '#666', fontSize: '0.9rem', marginBottom: '5px', display: 'block' }}>Preferred Date & Time</label>
                                    <input type="datetime-local" id="booking-time" className="form-input" style={{ width: '100%' }} required />
                                </div>
                                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                                    <button type="submit" disabled={status === "loading"} className="btn-pill btn-lime" style={{ padding: '12px 60px', fontSize: '1.1rem' }}>
                                        {status === "loading" ? "Processing..." : "Request Session"}
                                    </button>
                                </div>
                            </form>
                            {status === "error" && <p style={{ color: 'red', marginTop: '10px' }}>Error. Please try again.</p>}
                        </>
                    )}
                </div>

                <div className="bottom-nav">
                    <div style={{ flex: 1 }}></div>
                    <Link href="/" style={{ color: 'var(--hot-pink)' }}>Go back to the main page</Link>
                </div>
            </div>
        </main>
    );
}
