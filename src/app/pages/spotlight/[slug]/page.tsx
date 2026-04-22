import React from 'react';
import Link from 'next/link';
import { createClient } from 'next-sanity';
import { notFound } from 'next/navigation';

const client = createClient({
  projectId: "1pu795c0",
  dataset: "production",
  apiVersion: "2024-03-12",
  useCdn: false,
});

async function getSpotlight(slug: string) {
  const query = `*[_type == "spotlight" && slug.current == $slug][0]`;
  const data = await client.fetch(query, { slug });
  return data;
}

export default async function SpotlightProfilePage({ params }: { params: { slug: string } }) {
  const spotlight = await getSpotlight(params.slug);

  if (!spotlight) {
    notFound();
  }

  // Fallback map for local image paths if Sanity image isn't uploaded yet
  const imageMap: Record<string, string> = {
    "gaby": "/pages/gaby.png",
    "marwa": "/pages/marwa.png",
    "aya": "/pages/aya.png",
    "saja": "/pages/saja.png",
    "buse": "/pages/sefika buse.png",
    "iris": "/pages/iris.png",
    "carolina": "/pages/carolina.png",
    "valeria": "/pages/valeria.png",
    "maria": "/pages/maria fernanda.png",
    "arletthe": "/pages/arletthe.png",
  };

  const localImagePath = imageMap[params.slug] || "/pages/mayan.png";

  return (
    <main className="page active bg-hot-pink" style={{ backgroundColor: '#C8006A', minHeight: '100vh', padding: '12px 0' }}>
      {/* Top Bar simulated */}
      <div style={{ height: '12px', backgroundColor: '#C8006A', width: '100%', position: 'absolute', top: 0 }}></div>
      
      <div className="subpage-container" style={{ padding: '60px 8%', maxWidth: '1400px', margin: '0 auto' }}>
        <h2 className="subpage-title cursive" style={{ fontFamily: "'Pacifico', cursive", fontSize: '4rem', color: '#111111', marginBottom: '30px' }}>
          {spotlight.name}
        </h2>
        
        <div className="responsive-grid split-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '40px' }}>
          {/* Left: Retro Browser Frame */}
          <div className="left-col">
            <div className="retro-browser profile-browser" style={{ border: '4px solid #C8006A', borderRadius: '12px', overflow: 'hidden', backgroundColor: 'white' }}>
              <div className="retro-header" style={{ borderBottom: '4px solid #C8006A', padding: '6px 12px', display: 'flex', gap: '8px' }}>
                <span style={{ color: '#C8006A' }}>x</span> <span style={{ color: '#C8006A' }}>□</span> <span style={{ color: '#C8006A' }}>—</span>
              </div>
              <img 
                src={localImagePath} 
                alt={spotlight.name} 
                style={{ width: '100%', display: 'block', borderBottom: '4px solid #C8006A' }} 
              />
              <div className="retro-nav" style={{ background: 'white', padding: '10px', display: 'flex', justifyContent: 'center' }}>
                <span style={{ backgroundColor: '#C8006A', color: 'white', padding: '6px 20px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>&lt; [ATELIER] &gt;</span>
              </div>
            </div>
          </div>

          {/* Right: Body Content */}
          <div className="right-col">
            <h3 style={{ fontStyle: 'italic', color: 'white', fontSize: '1.5rem', marginBottom: '20px', fontWeight: 'bold', textTransform: 'uppercase' }}>
              {spotlight.heading}
            </h3>
            <div className="text-pink-page-body" style={{ color: 'white', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 'bold', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
              {spotlight.body}
            </div>
          </div>
        </div>

        <div className="bottom-nav" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 'auto', paddingTop: '40px' }}>
          <Link href="/" style={{ color: '#111111', fontWeight: 'bold', fontStyle: 'italic', textDecoration: 'underline' }}>← return</Link>
          <Link href="/" style={{ color: '#111111', fontWeight: 'bold', fontStyle: 'italic', textDecoration: 'underline' }}>Go back to the main page</Link>
        </div>
      </div>
    </main>
  );
}
