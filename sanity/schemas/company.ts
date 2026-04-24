export default {
  name: 'company',
  title: 'Corporate: Companies',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Company Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Company Logo',
      type: 'image',
      options: { hotspot: true },
      description: 'Displayed on the corporate dashboard alongside The Atelier logo.',
    },
    {
      name: 'contactPerson',
      title: 'Primary Contact / HR Manager',
      type: 'string',
    },
    {
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    },
    {
      name: 'industry',
      title: 'Industry',
      type: 'string',
    },
    {
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
    },
    {
      name: 'active',
      title: 'Active Partnership',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: { title: 'name', media: 'logo' },
  },
};