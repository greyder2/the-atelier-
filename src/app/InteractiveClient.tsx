"use client";
import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function InteractiveClient() {
    useEffect(() => {
        // Global showPage for the raw HTML interactions
        (window as any).showPage = (pageId: string) => {
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            let p = document.getElementById(pageId);
            if(p) p.classList.add('active');
            window.scrollTo({top: 0, behavior: 'instant'});
            
            setTimeout(() => {
                ScrollTrigger.refresh();
                if((window as any).gsap) {
                    gsap.fromTo(`#${pageId} .staggered-left`, 
                        { x: -60, opacity: 0 },
                        { x: 0, opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.1 }
                    );
                    gsap.fromTo(`#${pageId} .staggered-card`, 
                        { scale: 0.9, opacity: 0 },
                        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.5)", stagger: 0.2 }
                    );
                }
            }, 50);
        };

        // Initialize GSAP for main page
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

        // Intercept inline onclicks from raw HTML
        const handleNativeClicks = (e: any) => {
            const target = e.target.closest('a') || e.target.closest('.sp-card') || e.target.closest('.speech-bubble');
            if(target && target.hasAttribute('onclick')) {
                const attr = target.getAttribute('onclick');
                if(typeof attr === 'string' && attr.includes("showPage('")) {
                    e.preventDefault();
                    e.stopPropagation();
                    const match = attr.match(/showPage\('([^']+)'\)/);
                    if(match) (window as any).showPage(match[1]);
                }
            }
        };
        
        document.addEventListener('click', handleNativeClicks, true);
        return () => {
            document.removeEventListener('click', handleNativeClicks, true);
            delete (window as any).showPage;
        }
    }, []);

    return null; // This component handles side effects only
}
