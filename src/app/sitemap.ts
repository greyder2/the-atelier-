import { MetadataRoute } from 'next';
import { client } from '../../sanity/lib/client';
import { groq } from 'next-sanity';

const BASE_URL = 'https://theenglishatelier.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    '',
    '/pages/about-us',
    '/pages/book-session',
    '/pages/cohorts',
    '/pages/corporate-training',
    '/pages/private-coaching',
    '/pages/spotlights',
    '/pages/spotlights/first-generation',
    '/pages/spotlights/second-generation',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    const slugs = await client.fetch(groq`*[_type == "spotlight"] { "slug": slug.current }`);
    const dynamicRoutes = slugs.map((s: any) => ({
      url: `${BASE_URL}/pages/spotlight/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
    return [...routes, ...dynamicRoutes];
  } catch (err) {
    // If sanity fails, return static routes
    return routes;
  }
}