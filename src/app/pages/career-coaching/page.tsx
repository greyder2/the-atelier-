import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Career Coaching | The Atelier',
  description: 'Professional career coaching services: CV building, interview preparation, LinkedIn optimization, and professional branding for ambitious professionals.',
}

export default function CareerCoachingPage() {
  return (
    <main>
      <div className="fixed top-0 left-0 w-full h-[12px] bg-[#9D174D] z-[1000]"></div>

      <div className="bg-[#FAF7F0] pt-3">
        {/* Hero Band */}
        <div className="bg-[#9D174D] text-center px-8 py-14">
          <h1 className="font-[family-name:var(--font-cormorant)] text-[clamp(40px,8vw,64px)] text-white leading-tight">
            Career Coaching
          </h1>
          <p className="mt-3 text-[11px] tracking-[4px] uppercase font-bold text-[#FDF2F8]">
            CV · Interview Prep · Professional Branding
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-8 md:px-16 py-16">

          {/* Left: What We Offer */}
          <div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[32px] text-[#9D174D] mb-6 leading-tight">
              Build Your Global Career
            </h2>
            <p className="text-[15px] leading-[1.85] text-[#333] mb-8">
              Our career coaching program goes beyond language — we help you position yourself as a strong candidate in international markets. Whether you&apos;re preparing for your first interview in English or building a professional brand, we&apos;ll work together to get you there.
            </p>

            <div className="space-y-5">
              {[
                { icon: '★', title: 'CV & RESUME BUILDING', desc: 'Create a professional, internationally competitive resume tailored to your industry.' },
                { icon: '★', title: 'INTERVIEW PREPARATION', desc: 'Practice real interview scenarios with feedback on language, structure, and confidence.' },
                { icon: '★', title: 'LINKEDIN OPTIMIZATION', desc: 'Build a compelling LinkedIn presence that attracts international recruiters.' },
                { icon: '★', title: 'PROFESSIONAL BRANDING', desc: 'Develop your professional identity and learn to communicate your value clearly in English.' },
                { icon: '★', title: 'PRESENTATION COACHING', desc: 'Master the art of presenting complex ideas with clarity and authority.' },
              ].map(service => (
                <div key={service.title} className="flex gap-4 items-start">
                  <span className="text-[#9D174D] text-xl mt-0.5 flex-shrink-0">{service.icon}</span>
                  <div>
                    <h3 className="font-bold text-[14px] text-black mb-1">{service.title}</h3>
                    <p className="text-[13px] text-gray-500 leading-[1.6]">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: CTA Card */}
          <div className="flex flex-col gap-8">
            <div className="bg-white border-[3px] border-[#9D174D] rounded-[20px] p-8">
              <h2 className="font-[family-name:var(--font-cormorant)] text-[26px] text-[#9D174D] mb-4 leading-tight">
                Who Is This For?
              </h2>
              <div className="space-y-3 mb-6">
                {[
                  'Professionals preparing for international job interviews',
                  'Executives who need to present in English with authority',
                  'Academics applying for programs abroad',
                  'Career changers building a new professional identity',
                  'Anyone who wants to communicate their value with confidence',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-[14px] text-[#333]">
                    <span className="w-2 h-2 rounded-full bg-[#C9B37B] flex-shrink-0 inline-block mt-1.5"></span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#A8DDD8] border-[3px] border-black rounded-[20px] p-8 text-center">
              <p className="text-[11px] tracking-[3px] uppercase font-bold text-black/50 mb-3">Ready to level up?</p>
              <h3 className="font-[family-name:var(--font-cormorant)] text-[28px] text-black mb-4">Start With a Free Session</h3>
              <p className="text-[13px] text-black/70 mb-6 leading-[1.7]">
                In your complimentary session, we&apos;ll assess your current level, discuss your career goals, and design a personalized coaching roadmap.
              </p>
              <Link
                href="/pages/book-session"
                className="inline-block bg-[#9D174D] text-white text-[12px] font-black tracking-[2px] uppercase px-8 py-4 rounded-full no-underline hover:bg-black transition-colors"
              >
                Book Your Free Session →
              </Link>
            </div>

            <div className="bg-[#FDF2F8] rounded-[20px] p-6 text-center">
              <p className="text-[12px] font-bold text-black/70 italic">
                &quot;After working with The Atelier, I landed my first international role. The interview coaching was a game changer.&quot;
              </p>
              <p className="text-[11px] font-black text-[#9D174D] mt-3 uppercase tracking-[1px]">— Atelier Graduate</p>
            </div>
          </div>
        </div>

        {/* Bottom Nav */}
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
