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
      <div className="fixed top-0 left-0 w-full h-[12px] bg-[#9D174D] z-[10000]"></div>
      
      <header 
        style={{
          position: 'fixed',
          top: '12px',
          left: 0,
          right: 0,
          zIndex: 9900,
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
            <Link href="/#about" style={{ color: '#000', textDecoration: 'none', fontWeight: 700, fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase' }}>About</Link>
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
                backgroundColor: '#111', 
                color: '#fff', 
                borderRadius: '50px', 
                textDecoration: 'none', 
                fontWeight: 700, 
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              Client Portal
            </Link>
          </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden flex flex-col justify-center items-center w-[30px] h-[30px] z-[9902]"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`bg-black h-[2px] w-full rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[6px]' : '-translate-y-1'}`}></span>
          <span className={`bg-black h-[2px] w-full rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`bg-black h-[2px] w-full rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[6px]' : 'translate-y-1'}`}></span>
        </button>

        {/* Mobile Drawer */}
        <div 
          className={`fixed inset-0 bg-[#FAF7F0] z-[9901] flex flex-col justify-center items-center transition-all duration-500 ease-in-out md:hidden ${
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <nav className="flex flex-col items-center gap-8 font-dm-sans font-bold text-lg tracking-widest uppercase">
            <Link href="/" className="text-black hover:text-[#9D174D]">Home</Link>
            <Link href="/#about" className="text-black hover:text-[#9D174D]">About Us</Link>
            <Link href="/#programs" className="text-black hover:text-[#9D174D]">Programs</Link>
            <Link href="/pages/spotlights" className="text-black hover:text-[#9D174D]">Spotlights</Link>
            
            <div className="w-[40px] h-[2px] bg-[#9D174D] my-4"></div>
            
            <Link 
              href="/pages/book-session" 
              className="text-[#9D174D] px-8 py-3 border-2 border-[#9D174D] rounded-full"
            >
              Book Session
            </Link>
            <Link 
              href="/dashboard" 
              className="text-white bg-[#111] px-8 py-3 rounded-full"
            >
              Client Portal
            </Link>
          </nav>
        </div>
      </div>
    </header>
    </>
  );
}
