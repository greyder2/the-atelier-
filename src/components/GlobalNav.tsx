"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function GlobalNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* 12px Top Bar - Always fixed at the very top */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '12px', backgroundColor: '#9D174D', zIndex: 15001 }}></div>
      
      <header 
        style={{
          position: 'fixed',
          top: '12px',
          left: 0,
          right: 0,
          zIndex: 15000,
          transition: 'all 0.3s ease',
          padding: scrolled ? '15px 0' : '25px 0',
          backgroundImage: "url('/pages/atelier background.webp')", 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.15)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(157,23,77,0.3)' : 'none'
        }}
      >
        {/* Semi-transparent overlay for readability */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          backgroundColor: scrolled ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.4)',
          backdropFilter: 'blur(8px)',
          transition: 'background-color 0.3s ease'
        }}></div>
        
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 5%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          zIndex: 10
        }}>
          {/* Logo - Sarina font - Forced size */}
          <Link href="/" style={{ 
            fontFamily: "'Sarina', cursive", 
            fontSize: '32px', 
            color: '#9D174D', 
            textDecoration: 'none',
            lineHeight: 1,
            whiteSpace: 'nowrap'
          }}>
            The Atelier
          </Link>

          {/* Desktop Nav - Using flex instead of hidden md:flex for better reliability */}
          <nav className="hidden md:flex" style={{ alignItems: 'center', gap: '32px' }}>
            <Link href="/pages/about-us" style={{ color: '#000', textDecoration: 'none', fontWeight: 700, fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase' }}>About Us</Link>
            <Link href="/#programs" style={{ color: '#000', textDecoration: 'none', fontWeight: 700, fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase' }}>Programs</Link>
            <Link href="/pages/spotlights" style={{ color: '#000', textDecoration: 'none', fontWeight: 700, fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase' }}>Spotlights</Link>
            
            <div style={{ width: '1px', height: '16px', backgroundColor: '#ccc' }}></div>
            
            <Link 
              href="/pages/book-session" 
              style={{ 
                padding: '10px 24px', 
                border: '2px solid #9D174D', 
                color: '#9D174D', 
                borderRadius: '50px', 
                textDecoration: 'none', 
                fontWeight: 700, 
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              Book Free Session
            </Link>
            <Link 
              href="/dashboard" 
              style={{ 
                padding: '10px 24px', 
                backgroundColor: '#D9F060', 
                color: '#111', 
                borderRadius: '50px', 
                textDecoration: 'none', 
                fontWeight: 900, 
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}
            >
              Client Portal
            </Link>
          </nav>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          style={{
            display: scrolled || (typeof window !== 'undefined' && window.innerWidth < 768) ? 'flex' : 'none',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '40px',
            height: '40px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            zIndex: 15002,
            position: 'relative'
          }}
          className="md:hidden"
        >
          <span style={{ 
            width: '24px', 
            height: '2px', 
            backgroundColor: '#000', 
            marginBottom: '6px',
            transition: 'all 0.3s ease',
            transform: isOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none'
          }}></span>
          <span style={{ 
            width: '24px', 
            height: '2px', 
            backgroundColor: '#000', 
            marginBottom: '6px',
            transition: 'all 0.3s ease',
            opacity: isOpen ? 0 : 1
          }}></span>
          <span style={{ 
            width: '24px', 
            height: '2px', 
            backgroundColor: '#000', 
            transition: 'all 0.3s ease',
            transform: isOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none'
          }}></span>
        </button>

        {/* Mobile Backdrop Overlay */}
        <div 
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(4px)',
            zIndex: 15001,
            display: isOpen ? 'block' : 'none',
            opacity: isOpen ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
        ></div>

        {/* Mobile Slide-in Drawer */}
        <div 
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '85%',
            maxWidth: '400px',
            height: '100%',
            backgroundColor: '#FAF7F0',
            zIndex: 15002,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '30px',
            boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
            transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Internal Close Button for Mobile Drawer */}
          <button 
            onClick={() => setIsOpen(false)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'none',
              border: 'none',
              fontSize: '32px',
              cursor: 'pointer'
            }}
          >
            ×
          </button>

          <Link href="/" onClick={() => setIsOpen(false)} style={{ color: '#000', textDecoration: 'none', fontWeight: 900, fontSize: '20px', textTransform: 'uppercase', letterSpacing: '4px' }}>Home</Link>
          <Link href="/pages/about-us" onClick={() => setIsOpen(false)} style={{ color: '#000', textDecoration: 'none', fontWeight: 900, fontSize: '20px', textTransform: 'uppercase', letterSpacing: '4px' }}>About Us</Link>
          <Link href="/#programs" onClick={() => setIsOpen(false)} style={{ color: '#000', textDecoration: 'none', fontWeight: 900, fontSize: '20px', textTransform: 'uppercase', letterSpacing: '4px' }}>Programs</Link>
          <Link href="/pages/spotlights" onClick={() => setIsOpen(false)} style={{ color: '#000', textDecoration: 'none', fontWeight: 900, fontSize: '20px', textTransform: 'uppercase', letterSpacing: '4px' }}>Spotlights</Link>
          
          <div style={{ width: '40px', height: '2px', backgroundColor: '#9D174D', margin: '20px 0' }}></div>
          
          <Link 
            href="/pages/book-session" 
            onClick={() => setIsOpen(false)}
            style={{ color: '#9D174D', textDecoration: 'underline', fontWeight: 900, fontSize: '16px', textTransform: 'uppercase' }}
          >
            Book Free Session
          </Link>
          <Link 
            href="/dashboard" 
            onClick={() => setIsOpen(false)}
            style={{ padding: '12px 32px', backgroundColor: '#D9F060', color: '#111', borderRadius: '50px', textDecoration: 'none', fontWeight: 900, fontSize: '12px', textTransform: 'uppercase' }}
          >
            Client Portal
          </Link>
        </div>
      </div>
    </header>
  </>
);
}
