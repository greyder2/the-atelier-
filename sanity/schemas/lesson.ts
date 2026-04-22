export default {
  name: 'lesson',
  title: 'Lessons',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Topic / Lesson Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      initialValue: 'Language Session',
    },
    {
      name: 'client',
      title: 'Client / Student',
      type: 'reference',
      to: [{ type: 'client' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'professor',
      title: 'Professor',
      type: 'reference',
      to: [{ type: 'professor' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Date & Time',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Upcoming', value: 'upcoming' },
          { title: 'Completed', value: 'completed' },
          { title: 'Cancelled', value: 'cancelled' },
          { title: 'Missed', value: 'missed' },
        ],
      },
      initialValue: 'upcoming',
    },
    {
      name: 'notes',
      title: 'Professor Notes / Feedback',
      type: 'text',
      description: 'Shared with the student in their portal',
    },
  ],
  preview: {
    select: {
      title: 'title',
      student: 'client.name',
      date: 'date',
    },
    prepare({ title, student, date }: any) {
      return {
        title: `${title} - ${student || 'Unknown Student'}`,
        subtitle: new Date(date).toLocaleString(),
      };
    },
  },
};
