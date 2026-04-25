"use client";

import { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  threshold?: number;
  delay?: number;
  className?: string;
  staggerChildren?: boolean;
  staggerDelay?: number;
}

export default function ScrollReveal({ 
  children, 
  threshold = 0.1, 
  delay = 0,
  className = "",
  staggerChildren = false,
  staggerDelay = 200
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, delay]);

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{
        transition: 'none' // We'll handle transition on children if staggering
      }}
    >
      {staggerChildren ? (
        // Apply staggering to direct children
        Array.isArray(children) ? (
          children.map((child, i) => (
            <div 
              key={i}
              className="reveal-child"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${i * staggerDelay}ms`,
                willChange: 'opacity, transform'
              }}
            >
              {child}
            </div>
          ))
        ) : (
          <div 
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0ms`
            }}
          >
            {children}
          </div>
        )
      ) : (
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 1s cubic-bezier(0.22, 1, 0.36, 1)',
            willChange: 'opacity, transform'
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
