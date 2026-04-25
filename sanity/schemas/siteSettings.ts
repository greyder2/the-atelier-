export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // Singleton: only one document of this type should exist
  __experimental_actions: ['update', 'publish'],
  fields: [
    // ── SOCIAL PROOF TIER LABELS ─────────────────────────────────────────────
    {
      name: 'tierLabelFounding',
      title: 'Tier 1 Label (Founding Members)',
      type: 'string',
      description: 'Label for the first tier in Social Proof. Default: "Founding Circle"',
      initialValue: 'Founding Circle',
    },
    {
      name: 'tierLabelInternational',
      title: 'Tier 2 Label (International Students)',
      type: 'string',
      description: 'Label for the second tier in Social Proof. Default: "International Cohort"',
      initialValue: 'International Cohort',
    },
    {
      name: 'tierLabelAlumni',
      title: 'Tier 3 Label (Alumni / Spotlights)',
      type: 'string',
      description: 'Label for the third tier in Social Proof. Default: "Atelier Alumni"',
      initialValue: 'Atelier Alumni',
    },

    // ── TRUSTED COMPANIES ────────────────────────────────────────────────────
    {
      name: 'trustedCompanies',
      title: 'Trusted By — Company Names',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Company names displayed in the "Trusted by professionals at" bar.',
    },

    // ── SOCIAL PROOF SECTION ─────────────────────────────────────────────────
    {
      name: 'socialProofTitle',
      title: 'Social Proof Section Title',
      type: 'string',
      description: 'Override the default social proof section title.',
    },
    {
      name: 'socialProofSubtitle',
      title: 'Social Proof Section Subtitle',
      type: 'text',
      description: 'Description text under the social proof section title.',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
        subtitle: 'Global configuration',
      };
    },
  },
};
