import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with The Atelier. Reach out via phone, WhatsApp, email, or Instagram. Based in Mexico City with global online availability.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
