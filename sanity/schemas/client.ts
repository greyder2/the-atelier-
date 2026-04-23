export default {
  name: 'client',
  title: 'Portal: Clients & Students',
  type: 'document',
  fields: [
    {
      name: 'clerkUserId',
      title: 'Clerk User ID',
      type: 'string',
      description: 'Auto-populated on first login. Do not edit manually.',
      readOnly: true,
    },
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule: any) => Rule.required().email(),
    },
    {
      name: 'clientType',
      title: 'Client Type',
      type: 'string',
      options: {
        list: [
          { title: 'Individual Student', value: 'individual' },
          { title: 'Corporate Client', value: 'corporate' },
        ],
      },
      initialValue: 'individual',
    },
    {
      name: 'program',
      title: 'Enrolled Program',
      type: 'string',
    },
    {
      name: 'level',
      title: 'Current Level / Progress',
      type: 'string',
    },
    {
      name: 'status',
      title: 'Account Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Paused', value: 'paused' },
          { title: 'Completed', value: 'completed' },
        ],
      },
      initialValue: 'active',
    },
    {
      name: 'notes',
      title: 'Internal Admin Notes',
      type: 'text',
    },
    {
      name: 'teacherMessage',
      title: 'Message from Your Professor',
      type: 'text',
      description: 'Visible to the client on their personal page.',
    },
    {
      name: 'resources',
      title: 'Resources & Materials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
            { name: 'description', title: 'Description', type: 'string' },
          ],
          preview: { select: { title: 'title', subtitle: 'description' } },
        },
      ],
    },
    {
      name: 'image',
      title: 'Profile Picture',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'assignedProfessor',
      title: 'Assigned Professor',
      type: 'reference',
      to: [{ type: 'professor' }],
    },
    {
      name: 'learningGoals',
      title: 'Learning Goals',
      type: 'text',
    },
    {
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      description: 'For corporate clients only.',
    },
    {
      name: 'teamSize',
      title: 'Team Size',
      type: 'number',
      description: 'Number of employees in program.',
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'clientType' },
  },
};