import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | The Atelier',
  description: 'The Atelier is a boutique language studio founded on the belief that language learning should be inspiring, cultural, and deeply human.',
}

export default function AboutUs() {
  return (
    <main>
      <div className="fixed top-0 left-0 w-full h-[12px] bg-[#C8006A] z-[1000]"></div>

      <div className="subpage-container bg-[#FAF7F0] pt-16">

        {/* Header */}
        <h1 className="subpage-title title-pink font-['Pacifico']">About Us</h1>

        {/* Our Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-['Pacifico'] text-[#C8006A] mb-6">Our Story</h2>
            <div className="space-y-5 text-base leading-relaxed font-bold uppercase text-black">
              <p>
                The Atelier is a boutique language and career development studio dedicated to teaching through culture, conversation, and intellectual curiosity.
              </p>
              <p>
                Founded with the belief that language learning should be inspiring and meaningful, The Atelier combines traditional language education with global culture, history, and contemporary topics.
              </p>
              <p>
                Our mission is to help students and professionals develop not only linguistic fluency, but also confidence, cultural awareness, and the ability to communicate thoughtfully in an international environment.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-[24px] p-10 border-4 border-[#C8006A] shadow-xl">
            <h2 className="text-3xl font-['Pacifico'] text-[#C8006A] mb-6">Our Philosophy</h2>
            <p className="font-black text-lg italic mb-6 uppercase">We believe language learning should be:</p>
            <div className="space-y-3">
              {['★ Curious', '★ Cultural', '★ Intellectual', '★ Practical', '★ Human'].map((item) => (
                <div key={item} className="font-black text-lg text-[#C8006A]">{item}</div>
              ))}
            </div>
            <p className="mt-6 font-bold text-sm uppercase leading-relaxed text-gray-700">
              Instead of memorizing endless grammar rules, students learn through conversations, ideas, global perspectives and meaningful discussions. Language becomes a bridge to understanding the world.
            </p>
          </div>
        </div>

        {/* Founder Section */}
        <div className="border-t-4 border-[#C8006A] pt-16 mb-16">
          <h2 className="text-5xl font-['Pacifico'] text-[#C8006A] mb-12 text-center">Meet the Founder</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Photo */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-[320px] h-[400px] rounded-[24px] overflow-hidden border-8 border-[#C8006A] shadow-[12px_12px_0px_#D9F060]">
                  <div
                    className="w-full h-full bg-cover bg-center bg-[#F4A7C3]"
                    style={{ backgroundImage: "url('/pages/mayan.png')" }}
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-[#D9F060] text-black font-black px-4 py-2 rounded-full text-sm uppercase tracking-widest shadow-lg transform rotate-3">
                  Founder ★
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <h3 className="text-4xl font-['Pacifico'] text-black mb-2">Mayan</h3>
              <p className="text-[#C8006A] font-black uppercase tracking-widest text-sm mb-8">Founder & Lead Educator · The Atelier</p>

              <div className="space-y-4 text-sm font-bold uppercase leading-relaxed text-black">
                <p>
                  Mayan founded The Atelier with a clear vision: to create a language learning experience that goes beyond grammar — one that builds confidence, cultural intelligence, and a genuine global voice.
                </p>
                <p>
                  With years of experience teaching English to professionals, academics, and global learners, Mayan developed a methodology where language becomes the vehicle for exploring ideas, history, and the world.
                </p>
                <p>
                  Every program at The Atelier reflects her belief that the best learning happens when students feel challenged, curious, and deeply understood.
                </p>
              </div>

              <Link
                href="/pages/mayan"
                className="inline-flex items-center gap-2 mt-8 bg-[#C8006A] text-white font-black px-8 py-4 rounded-full uppercase tracking-widest hover:bg-black transition-colors no-underline shadow-lg"
              >
                View Full Profile 👈
              </Link>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#C8006A] rounded-[24px] p-12 text-center mb-8">
          <h3 className="text-4xl font-['Pacifico'] text-white mb-4">Ready to join The Atelier?</h3>
          <p className="text-white font-bold uppercase text-sm mb-8 max-w-xl mx-auto">Book a free session and discover how language learning can transform your professional life.</p>
          <Link href="/pages/book-session" className="inline-block bg-[#D9F060] text-black font-black px-10 py-4 rounded-full uppercase tracking-widest hover:scale-105 transition-transform no-underline text-lg shadow-xl">
            Book a Free Session
          </Link>
        </div>

        {/* Bottom nav */}
        <div className="bottom-nav">
          <Link href="/" className="text-[#C8006A] font-black underline">← Back to Home</Link>
          <Link href="/pages/book-session" className="text-[#C8006A] font-black underline">Book a Session →</Link>
        </div>
      </div>
    </main>
  )
}