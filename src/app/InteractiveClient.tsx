"use client";
import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function InteractiveClient() {
    useEffect(() => {
        // GSAP stagger animations
        gsap.utils.toArray('.staggered-left').forEach((elem: any) => {
            gsap.from(elem, {
                scrollTrigger: { trigger: elem, start: "top 85%" },
                x: -60, opacity: 0, duration: 0.8, ease: "power2.out"
            });
        });
        gsap.utils.toArray('.staggered-card').forEach((elem: any, i: number) => {
            gsap.from(elem, {
                scrollTrigger: { trigger: elem, start: "top 85%" },
                scale: 0.9, opacity: 0, duration: 0.8, ease: "back.out(1.5)", delay: i * 0.1
            });
        });
        gsap.utils.toArray('.retro-browser').forEach((elem: any) => {
            gsap.fromTo(elem,
                { rotationY: -10, rotationX: 5 },
                {
                    rotationY: 10, rotationX: -5,
                    scrollTrigger: { trigger: elem, start: "top bottom", end: "bottom top", scrub: 1 }
                }
            );
        });

        // Hero parallax
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            gsap.to(heroSection, {
                backgroundPosition: `50% ${50 + 20}%`,
                ease: "none",
                scrollTrigger: {
                    trigger: heroSection,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        }

        // Scroll-aware active state for hero nav links
        const sections = ['about', 'programs', 'corporate', 'social-proof', 'scholarships', 'spotlights', 'contact', 'careers'];
        const navLinks = document.querySelectorAll('.hero-link[href^="#"]');

        const observers = sections.map(id => {
            const el = document.getElementById(id);
            if (!el) return null;
            const obs = new IntersectionObserver(
                ([entry]) => {
                    const link = document.querySelector(`.hero-link[href="#${id}"]`);
                    if (link) {
                        if (entry.isIntersecting) {
                            link.classList.add('hero-link-active');
                        } else {
                            link.classList.remove('hero-link-active');
                        }
                    }
                },
                { threshold: 0.4 }
            );
            obs.observe(el);
            return obs;
        });

        // Scroll indicator fade out on scroll
        const scrollIndicator = document.querySelector('.scroll-indicator') as HTMLElement | null;
        const handleScroll = () => {
            if (scrollIndicator) {
                const opacity = Math.max(0, 1 - window.scrollY / 200);
                scrollIndicator.style.opacity = String(opacity);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        (window as any).showPage = (id: string) => {
            console.log("Navigating to legacy section:", id);
        };

        return () => {
            observers.forEach(obs => obs?.disconnect());
            window.removeEventListener('scroll', handleScroll);
            delete (window as any).showPage;
        };
    }, []);

    return null;
}