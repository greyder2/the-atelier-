import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | The Atelier',
  description: 'The Atelier is a boutique language studio founded on the belief that language learning should be inspiring, cultural, and deeply human.',
}

export default function AboutUs() {
  return (
    <main>
      <div className="fixed top-0 left-0 w-full h-[12px] bg-[#9D174D] z-[1000]"></div>

      <div className="bg-[#FAF7F0] pt-3">

        {/* ── HERO BAND ── */}
        <div className="bg-[#9D174D] text-center px-8 py-14">
          <h1 className="font-[family-name:var(--font-cormorant)] text-[clamp(40px,8vw,64px)] text-white leading-tight">
            About Us
          </h1>
          <p className="mt-3 text-[11px] tracking-[4px] uppercase font-bold text-[#FDF2F8]">
            Language · Culture · Confidence
          </p>
        </div>

        {/* ── OUR STORY + PHILOSOPHY ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-8 md:px-16 py-16">

          {/* Story */}
          <div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[32px] text-[#9D174D] mb-6 leading-tight">
              Our Story
            </h2>
            <div className="space-y-5 text-[15px] leading-[1.85] text-[#333]">
              <p>
                The Atelier is a boutique language and career development studio dedicated to teaching through culture, conversation, and intellectual curiosity.
              </p>
              <p>
                Founded with the belief that language learning should be inspiring and meaningful, The Atelier combines traditional education with global culture, history, and contemporary ideas.
              </p>
              <p>
                Our mission is to help students and professionals develop linguistic fluency, cultural awareness, and the ability to communicate thoughtfully in any international environment.
              </p>
            </div>
          </div>

          {/* Philosophy */}
          <div className="bg-white border-[3px] border-[#9D174D] rounded-[20px] p-8">
            <h2 className="font-[family-name:var(--font-cormorant)] text-[26px] text-[#9D174D] mb-4 leading-tight">
              Our Philosophy
            </h2>
            <p className="text-[11px] tracking-[2px] uppercase font-bold text-gray-400 mb-5">
              We believe language learning should be
            </p>
            <div className="space-y-3 mb-6">
              {['Curious', 'Cultural', 'Intellectual', 'Practical', 'Human'].map((item) => (
                <div key={item} className="flex items-center gap-3 text-[15px] font-bold text-[#9D174D]">
                  <span className="w-2 h-2 rounded-full bg-[#D9F060] flex-shrink-0 inline-block"></span>
                  {item}
                </div>
              ))}
            </div>
            <p className="text-[13px] leading-[1.75] text-gray-500 border-t border-gray-100 pt-4">
              Instead of memorizing grammar rules, students learn through conversations and real ideas. Language becomes a bridge to understanding the world.
            </p>
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div className="border-t-[3px] border-[#9D174D] mx-8 md:mx-16"></div>

        {/* ── MEET THE FOUNDER ── */}
        <div className="px-8 md:px-16 py-16">
          <p className="text-center text-[11px] tracking-[3px] uppercase font-bold text-[#9D174D] mb-2">
            The Atelier
          </p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-[40px] text-black text-center mb-14 leading-tight">
            Meet the Founder
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

            {/* Photo */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-[280px] h-[360px] rounded-[20px] overflow-hidden border-[6px] border-[#9D174D]">
                  <div
                    className="w-full h-full bg-[#FDF2F8] bg-cover bg-center"
                    style={{ backgroundImage: "url('/pages/Mayan.webp')" }}
                  />
                </div>
                <div
                  className="absolute -bottom-3 -right-3 bg-[#D9F060] text-black text-[11px] font-black uppercase tracking-[2px] px-4 py-2 rounded-full"
                  style={{ transform: 'rotate(3deg)' }}
                >
                  Founder ★
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <h3 className="font-[family-name:var(--font-cormorant)] text-[36px] text-black mb-1 leading-tight">Mayan</h3>
              <p className="text-[11px] tracking-[3px] uppercase font-bold text-[#9D174D] border-b-2 border-[#D9F060] pb-4 mb-7 inline-block">
                Founder &amp; Lead Educator · The Atelier
              </p>

              <div className="space-y-4 text-[15px] leading-[1.85] text-[#444]">
                <p>
                  Mayan founded The Atelier with a clear vision: to create a language learning experience that goes beyond grammar — one that builds confidence, cultural intelligence, and a genuine global voice.
                </p>
                <p>
                  With years of experience teaching English to professionals, academics, and global learners, she developed a methodology where language becomes the vehicle for exploring ideas, history, and the world.
                </p>
                <p>
                  Every program at The Atelier reflects her belief that the best learning happens when students feel challenged, curious, and deeply understood.
                </p>
              </div>

              {/* Credentials */}
              <div className="grid grid-cols-2 gap-4 mt-8 mb-6">
                {[
                  { label: 'Education', value: 'UNAM — Food Engineering' },
                  { label: 'Corporate Experience', value: 'PepsiCo (EHS & Procurement)' },
                  { label: 'Languages', value: 'EN · ES · IT · PT · DE · FR · TR' },
                  { label: 'Students Coached', value: '200+' },
                  { label: 'Countries', value: '12+ nationalities' },
                  { label: 'Methodology', value: 'Berlitz-Inspired Conversational' },
                ].map(cred => (
                  <div key={cred.label} className="bg-[#FAF7F0] border border-[#e8e4dc] rounded-[12px] p-3">
                    <p className="text-[9px] tracking-[2px] uppercase font-bold text-gray-400 mb-1">{cred.label}</p>
                    <p className="text-[13px] font-bold text-[#333]">{cred.value}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/pages/mayan"
                className="inline-block mt-2 bg-[#9D174D] text-white text-[12px] font-black tracking-[2px] uppercase px-7 py-4 rounded-full no-underline hover:bg-black transition-colors"
              >
                View Full Profile →
              </Link>
            </div>
          </div>
        </div>

        {/* ── CTA BAND ── */}
        <div className="bg-[#9D174D] px-8 py-16 text-center">
          <h3 className="font-[family-name:var(--font-cormorant)] text-[36px] text-white mb-3 leading-tight">
            Ready to join The Atelier?
          </h3>
          <p className="text-[13px] font-bold uppercase tracking-[1px] text-[#FDF2F8] max-w-md mx-auto mb-9 leading-[1.75]">
            Book a free session and discover how language learning can transform your professional life.
          </p>
          <Link
            href="/pages/book-session"
            className="inline-block bg-[#D9F060] text-black text-[13px] font-black tracking-[2px] uppercase px-10 py-4 rounded-full no-underline hover:scale-105 transition-transform"
          >
            Book a Free Session
          </Link>
        </div>

        {/* ── BOTTOM NAV ── */}
        <div className="flex justify-between px-8 md:px-16 py-7 border-t-2 border-gray-200 bg-white">
          <Link href="/" className="text-[13px] font-bold text-[#9D174D] underline">
            ← Back to Home
          </Link>
          <Link href="/pages/book-session" className="text-[13px] font-bold text-[#9D174D] underline">
            Book a Session →
          </Link>
        </div>
      </div>
    </main>
  )
}
