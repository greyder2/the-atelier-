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
    <header 
      className={`fixed top-0 left-0 right-0 z-[9900] transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-[5%] flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="font-['Sarina'] text-2xl text-[#C8006A] tracking-tighter">
          The Atelier
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-dm-sans font-bold text-[13px] tracking-widest uppercase">
          <Link href="/#about" className="text-black hover:text-[#C8006A] transition-colors">About</Link>
          <Link href="/#programs" className="text-black hover:text-[#C8006A] transition-colors">Programs</Link>
          <Link href="/pages/spotlights" className="text-black hover:text-[#C8006A] transition-colors">Spotlights</Link>
          
          <div className="w-[1px] h-[16px] bg-gray-300"></div>
          
          <Link 
            href="/pages/book-session" 
            className="px-5 py-2 border-2 border-[#C8006A] text-[#C8006A] hover:bg-[#C8006A] hover:text-white rounded-full transition-all duration-300"
          >
            Book Free Session
          </Link>
          <Link 
            href="/dashboard" 
            className="px-5 py-2 bg-[#111] text-white hover:bg-[#C8006A] rounded-full transition-all duration-300"
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
            <Link href="/" className="text-black hover:text-[#C8006A]">Home</Link>
            <Link href="/#about" className="text-black hover:text-[#C8006A]">About Us</Link>
            <Link href="/#programs" className="text-black hover:text-[#C8006A]">Programs</Link>
            <Link href="/pages/spotlights" className="text-black hover:text-[#C8006A]">Spotlights</Link>
            
            <div className="w-[40px] h-[2px] bg-[#C8006A] my-4"></div>
            
            <Link 
              href="/pages/book-session" 
              className="text-[#C8006A] px-8 py-3 border-2 border-[#C8006A] rounded-full"
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
  );
}
