"use client";

import { useState } from 'react';

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "Do I need a specific English level to join?",
    answer: "Our programs are generally designed for B1 (Intermediate) levels and above. We focus on fluency, professional vocabulary, and cultural nuances rather than basic grammar. If you're unsure of your level, the free session is the perfect time to find out!"
  },
  {
    question: "How long is the free session and what happens during it?",
    answer: "The session lasts 30 minutes. It's a casual conversation where we discuss your professional background, your language goals, and identify areas for improvement. There is zero pressure to commit—it's about seeing if our methodology is right for you."
  },
  {
    question: "Are the sessions 1-on-1 or in groups?",
    answer: "We offer both! Private Coaching is strictly 1-on-1 for personalized attention. We also offer 'Cohorts' which are small, curated group experiences focused on specific themes like leadership or cultural immersion."
  },
  {
    question: "What makes The Atelier different from traditional language schools?",
    answer: "We don't use textbooks or grammar drills. Our methodology is inspired by the Berlitz method, focusing heavily on real-world conversation, critical thinking, and intellectual curiosity. Language becomes a tool to discuss culture, business, and global ideas."
  }
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-16">
      <h3 style={{ fontFamily: "var(--font-cormorant), serif" }} className="text-3xl text-center text-[#C8006A] font-bold mb-8">
        Frequently Asked Questions
      </h3>
      <div className="flex flex-col gap-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index} 
              className="border-2 border-[#e8e4dc] bg-white rounded-[16px] overflow-hidden transition-all duration-300"
              style={{ 
                boxShadow: isOpen ? '0 8px 16px rgba(200,0,106,0.1)' : 'none',
                borderColor: isOpen ? '#C8006A' : '#e8e4dc'
              }}
            >
              <button
                className="w-full text-left px-6 py-5 flex justify-between items-center bg-white cursor-pointer"
                onClick={() => toggle(index)}
              >
                <span className="font-bold text-[15px] text-[#111] pr-4 leading-tight">
                  {faq.question}
                </span>
                <span 
                  className="text-[#C8006A] font-black text-xl transition-transform duration-300"
                  style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                >
                  +
                </span>
              </button>
              <div 
                className="px-6 overflow-hidden transition-all duration-300 ease-in-out"
                style={{ 
                  maxHeight: isOpen ? '200px' : '0px',
                  opacity: isOpen ? 1 : 0,
                  paddingBottom: isOpen ? '20px' : '0px'
                }}
              >
                <p className="text-[14px] text-[#555] leading-relaxed border-t border-gray-100 pt-4">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
