import { notFound } from 'next/navigation';
import { client } from '../../../../sanity/lib/client';
import Link from 'next/link';

export async function generateStaticParams() {
  const query = `*[_type == "program" && defined(slug.current)][].slug.current`;
  const slugs = await client.fetch(query);
  return slugs.map((slug: string) => ({ slug }));
}

export default async function ProgramPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const query = `
    *[_type == "program" && slug.current == $slug][0]{
      title,
      tagline,
      description,
      details,
      benefits,
      price,
      ctaText
    }
  `;
  const program = await client.fetch(query, { slug });

  if (!program) {
    notFound();
  }

  return (
    <main className="page active bg-[#FAF7F0]" style={{ backgroundColor: '#FAF7F0', minHeight: '100vh' }}>
      <div className="subpage-container" style={{ padding: '60px 8%', maxWidth: '1400px', margin: '0 auto', position: 'relative' }}>
        <div style={{ height: '12px', backgroundColor: '#9D174D', width: '100%', position: 'absolute', top: 0, left: 0 }}></div>
        
        <h2 className="subpage-title cursive text-[#111] text-7xl mb-12 font-[family-name:var(--font-cormorant)]">
          {program.title.split(' ').map((word: string, i: number, arr: string[]) => (
            <span key={i}>
              {word}
              {i < arr.length - 1 && <br />}
            </span>
          ))}
        </h2>

        <div className="responsive-grid split-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
          {/* Left: Detailed Program Card */}
          <div className="card bg-white p-12 rounded-[24px] shadow-2xl border-4 border-[#9D174D]">
            <h3 className="font-[family-name:var(--font-cormorant)] text-3xl mb-6 text-[#9D174D]">{program.tagline || 'Program Details'}</h3>
            <p className="text-lg font-bold mb-8 leading-relaxed text-black italic uppercase">
              {program.description}
            </p>
            <ul className="list-none space-y-4 font-black text-black">
              {program.benefits?.map((benefit: string, index: number) => (
                <li key={index}>★ {benefit}</li>
              ))}
            </ul>
          </div>

          {/* Right: Interaction Area */}
          <div className="flex flex-col items-center justify-center space-y-10">
            {program.details && (
              <div className="retro-browser w-full max-w-[500px] border-4 border-black rounded-xl overflow-hidden shadow-2xl">
                <div className="bg-black p-2 flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#9D174D]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#C9B37B]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#A8DDD8]"></div>
                </div>
                <div className="p-8 bg-[#A8DDD8] text-black font-bold italic text-center whitespace-pre-wrap">
                  {program.details}
                </div>
              </div>
            )}

            <Link href="/pages/book-session" className="speech-bubble bg-[#9D174D] text-white p-10 rounded-[28px] rounded-br-0 font-black text-center text-xl shadow-[6px_6px_0px_#000] hover:scale-105 transition-transform no-underline pulse">
              {program.ctaText || 'JOIN THE ATELIER!\nBOOK A FREE SESSION HERE'}
            </Link>
            <div className="hand-cursor text-5xl animate-bounce">👆</div>
          </div>
        </div>

        <div className="bottom-nav flex justify-between mt-20">
          <Link href="/" style={{ color: '#9D174D', fontWeight: 'bold', fontStyle: 'italic', textDecoration: 'underline' }}>← return</Link>
          <Link href="/" style={{ color: '#9D174D', fontWeight: 'bold', fontStyle: 'italic', textDecoration: 'underline' }}>Go back to the main page</Link>
        </div>
      </div>
    </main>
  );
}
