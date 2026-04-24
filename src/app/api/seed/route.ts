import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import { spotlights } from '@/data/spotlights';

const writeClient = createClient({
  projectId: "1pu795c0",
  dataset: "production",
  apiVersion: "2024-03-12",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

export async function GET() {
  try {
    for (const s of spotlights) {
      await writeClient.createOrReplace({
        _type: 'spotlight',
        _id: `seed-${s.slug}`,
        name: s.name,
        slug: { _type: 'slug', current: s.slug },
        heading: s.title,
        category: s.generation === 'first' ? "ATELIER SPOTLIGHTS — FIRST GENERATION" : "ATELIER SPOTLIGHTS — SECOND GENERATION",
        body: s.bio.join('\n\n'),
        levelBefore: s.levelBefore || "",
        levelAfter: s.levelAfter || "",
        shortQuote: s.closingQuote || "",
      });
    }
    return NextResponse.json({ message: "Seeding successful" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
