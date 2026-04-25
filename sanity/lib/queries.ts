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
  language,
  tier,
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
  language,
  tier,
  levelBefore,
  levelAfter
}`;

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0] {
  tierLabelFounding,
  tierLabelInternational,
  tierLabelAlumni,
  trustedCompanies,
  socialProofTitle,
  socialProofSubtitle
}`;

export const programsQuery = groq`*[_type == "program"] | order(_createdAt asc) {
  _id,
  title,
  "slug": slug.current,
  icon,
  subtitle,
  price,
  description,
  backgroundColor,
  textColor,
  features,
  ctaText,
  ctaLink,
  testimonialQuote,
  testimonialAuthor
}`;

export const programBySlugQuery = groq`*[_type == "program" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  icon,
  subtitle,
  price,
  description,
  backgroundColor,
  textColor,
  features,
  ctaText,
  ctaLink,
  testimonialQuote,
  testimonialAuthor
}`;
