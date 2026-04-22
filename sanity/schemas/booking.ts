export default {
  name: 'booking',
  title: 'Lesson Booking',
  type: 'document',
  fields: [
    {
      name: 'studentName',
      title: 'Student Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'studentEmail',
      title: 'Student Email',
      type: 'string',
      validation: (Rule: any) => Rule.required().email(),
    },
    {
      name: 'requestedTime',
      title: 'Requested Date/Time',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'programType',
      title: 'Program / Goal',
      type: 'string',
      description: 'e.g., Private Coaching, Demo Session, etc.',
    },
    {
      name: 'status',
      title: 'Booking Status',
      type: 'string',
      options: {
        list: [
          { title: 'Requested', value: 'requested' },
          { title: 'Confirmed', value: 'confirmed' },
          { title: 'Completed', value: 'completed' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
      },
      initialValue: 'requested',
    },
    {
      name: 'notes',
      title: 'Notes',
      type: 'text',
    },
  ],
  preview: {
    select: {
      title: 'studentName',
      subtitle: 'requestedTime',
    },
  },
};
