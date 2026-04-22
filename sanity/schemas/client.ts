export default {
  name: 'client',
  title: 'Portal: Clients & Students',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      description: 'The name displayed in their Client Portal',
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule: any) => Rule.required().email(),
      description: 'Used to link their login to this profile',
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
      description: 'e.g., Language Mastery, Business English, etc.',
    },
    {
      name: 'level',
      title: 'Current Level / Progress',
      type: 'string',
      description: 'e.g., Level 1, Advanced, etc.',
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
      description: 'The students primary objectives for their training',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'clientType',
    },
  },
};
