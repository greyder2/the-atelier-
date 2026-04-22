export default {
  name: 'professor',
  title: 'Professors',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Profile Picture',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'specialty',
      title: 'Specialty / Expertise',
      type: 'string',
      description: 'e.g., Business English, French Literature, etc.',
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'text',
      description: 'Short introduction for the student portal',
    },
    {
      name: 'email',
      title: 'Email Contact',
      type: 'string',
      description: 'Internal use for notifications',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'specialty',
      media: 'image',
    },
  },
};
