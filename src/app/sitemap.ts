import { MetadataRoute } from 'next';

const BASE = 'https://theenglishatelier.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/pages/about-us`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/pages/book-session`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/pages/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/pages/private-coaching`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/pages/subscriptions`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/pages/corporate-training`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/pages/cohorts`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/pages/scholarships`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/pages/spotlights`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/pages/insights`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/pages/careers`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ];

  return staticRoutes;
}