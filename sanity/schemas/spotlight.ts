export default {
  name: 'spotlight',
  title: 'Spotlight Profile',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL Identifier',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'shortQuote',
      title: 'Short Quote / Tagline',
      type: 'text',
      description: 'The quote that appears in the grid/browser header',
    },
    {
      name: 'heading',
      title: 'Profile Heading',
      type: 'string',
      description: 'e.g., LEADING THE AVIATION OPERATIONS IN MEXICO',
    },
    {
      name: 'category',
      title: 'Generation / Category',
      type: 'string',
      description: 'e.g., ATELIER SPOTLIGHTS — SECOND GENERATION',
    },
    {
      name: 'body',
      title: 'Detailed Story',
      type: 'text',
      description: 'The full bio text',
    },
    {
      name: 'levelBefore',
      title: 'Level Before',
      type: 'string',
      description: 'e.g., A2',
    },
    {
      name: 'levelAfter',
      title: 'Level After',
      type: 'string',
      description: 'e.g., B2',
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
};
