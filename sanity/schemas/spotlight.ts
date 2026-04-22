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
      name: 'body',
      title: 'Detailed Story',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
};
