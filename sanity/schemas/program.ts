export default {
  name: 'program',
  title: 'Program / Course',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL Identifier',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Card Icon / Symbol',
      type: 'string',
      description: 'Emoji or symbol for the program card, e.g. ✦ ◈ ⬡ ★ ◆',
    },
    {
      name: 'subtitle',
      title: 'Subtitle / Tagline',
      type: 'string',
      description: 'Short tagline shown under the title on the card.',
    },
    {
      name: 'price',
      title: 'Price / Investment',
      type: 'string',
      description: 'e.g., "Starting from $800/month" or "Custom quotation"',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },

    // ── PAGE DESIGN ──────────────────────────────────────────────────────────
    {
      name: 'backgroundColor',
      title: 'Page Background Color',
      type: 'string',
      description: 'Hex color for the program page background, e.g. #FAF7F0',
      initialValue: '#FAF7F0',
    },
    {
      name: 'textColor',
      title: 'Page Text Color',
      type: 'string',
      description: 'Hex color for text on the program page, e.g. #111 or #fff',
      initialValue: '#2C2420',
    },

    // ── FEATURES ─────────────────────────────────────────────────────────────
    {
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', title: 'Icon', type: 'string', description: 'e.g., ★', initialValue: '★' },
            { name: 'title', title: 'Feature Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'string' },
          ],
          preview: { select: { title: 'title', subtitle: 'description' } },
        },
      ],
    },

    // ── CTA ──────────────────────────────────────────────────────────────────
    {
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      description: 'Text for the main call-to-action button.',
      initialValue: 'Book a Free Session',
    },
    {
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'string',
      description: 'URL for the CTA button.',
      initialValue: '/pages/book-session',
    },

    // ── TESTIMONIAL ──────────────────────────────────────────────────────────
    {
      name: 'testimonialQuote',
      title: 'Testimonial Quote',
      type: 'text',
      description: 'Optional testimonial to display on the program page.',
    },
    {
      name: 'testimonialAuthor',
      title: 'Testimonial Author',
      type: 'string',
      description: 'Attribution for the testimonial.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'price',
    },
  },
};
