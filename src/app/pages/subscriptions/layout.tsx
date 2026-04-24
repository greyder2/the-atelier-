import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Atelier Subscriptions',
  description: 'Ongoing language learning memberships with structured, themed programs covering history, professional communication, leadership, and global culture.',
}

export default function SubscriptionsLayout({ children }: { children: React.ReactNode }) {
  return children
}
