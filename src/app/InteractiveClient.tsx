"use client";
import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function InteractiveClient() {
    useEffect(() => {
        // Initialize GSAP animations for the home grid
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

        // showPage is no longer needed for internal navigation since we use real Next.js routes
        // But we'll leave it as a no-op fallback to prevent reference errors if any old HTML remains
        (window as any).showPage = (id: string) => {
            console.log("Navigating to legacy section:", id);
            // Optional: fallback redirection logic if needed
        };

        return () => {
            delete (window as any).showPage;
        }
    }, []);

    return null;
}
