export default {
  name: 'client',
  title: 'Portal: Clients & Students',
  type: 'document',
  fields: [
    // ── IDENTITY ─────────────────────────────────────────────────────────────
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
      name: 'company',
      title: 'Company',
      type: 'reference',
      to: [{ type: 'company' }],
      description: 'For corporate clients only.',
      hidden: ({ document }: any) => document?.clientType !== 'corporate',
    },

    // ── SESSION CREDITS (individual only) ────────────────────────────────────
    {
      name: 'sessionTrackingEnabled',
      title: '📊 Enable Session Tracking',
      type: 'boolean',
      description: 'Turn ON to activate the session credit system for this client. Leave OFF to hide everything — no progress bar, no Calendly block.',
      initialValue: false,
      hidden: ({ document }: any) => document?.clientType !== 'individual',
    },
    {
      name: 'totalSessions',
      title: 'Total Sessions (This Cycle)',
      type: 'number',
      description: 'How many sessions you assigned this client (e.g. 4 per month). Sets the progress bar max.',
      initialValue: 4,
      validation: (Rule: any) => Rule.min(1),
      hidden: ({ document }: any) =>
        document?.clientType !== 'individual' || !document?.sessionTrackingEnabled,
    },
    {
      name: 'sessionCredits',
      title: 'Session Credits Remaining',
      type: 'number',
      description: 'Decreases by 1 on each Calendly booking. Top up manually each cycle.',
      initialValue: 4,
      validation: (Rule: any) => Rule.min(0),
      hidden: ({ document }: any) =>
        document?.clientType !== 'individual' || !document?.sessionTrackingEnabled,
    },

    // ── REFERRAL (individual only) ────────────────────────────────────────────
    {
      name: 'referralCode',
      title: 'Referral Code',
      type: 'string',
      description: 'Auto-generated on first login. Client shares /join?ref=CODE — you see who they brought in via "Referred By" on the new client.',
      readOnly: true,
      hidden: ({ document }: any) => document?.clientType !== 'individual',
    },
    {
      name: 'referralCredits',
      title: 'Referral Credits (Pending Approval)',
      type: 'number',
      description: "Each approved referral = 1. When ready to reward: add 1 to Session Credits above, then reset this to 0.",
      initialValue: 0,
      hidden: ({ document }: any) => document?.clientType !== 'individual',
    },
    {
      name: 'referredBy',
      title: 'Referred By',
      type: 'reference',
      to: [{ type: 'client' }],
      description: 'Populated automatically if this client signed up via a referral link.',
      hidden: ({ document }: any) => document?.clientType !== 'individual',
    },

    // ── ONBOARDING ────────────────────────────────────────────────────────────
    {
      name: 'onboardingCompleted',
      title: 'Onboarding Completed',
      type: 'boolean',
      initialValue: false,
      description: 'Flips to true automatically once the client finishes the welcome wizard.',
    },

    // ── PROGRAM & PROGRESS ────────────────────────────────────────────────────
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

    // ── CONTENT ───────────────────────────────────────────────────────────────
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
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'clientType',
      media: 'image',
    },
    prepare({ title, subtitle, media }: any) {
      return {
        title,
        subtitle: subtitle === 'corporate' ? '🏢 Corporate' : '👤 Individual',
        media,
      };
    },
  },
};