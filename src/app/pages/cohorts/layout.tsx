import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cohorts & Special Programs',
  description: 'Small group learning experiences designed around unique themes: cultural language immersion, women in history, and global communication programs.',
}

export default function CohortsLayout({ children }: { children: React.ReactNode }) {
  return children
}
