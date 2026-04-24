import { groq } from 'next-sanity';

export const spotlightsQuery = groq`*[_type == "spotlight"] | order(_createdAt asc) {
  _id,
  name,
  "slug": slug.current,
  "imageUrl": image.asset->url,
  shortQuote,
  heading,
  category,
  body,
  levelBefore,
  levelAfter
}`;

export const spotlightBySlugQuery = groq`*[_type == "spotlight" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  "imageUrl": image.asset->url,
  shortQuote,
  heading,
  category,
  body,
  levelBefore,
  levelAfter
}`;
