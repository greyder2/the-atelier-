import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book a Free Session',
  description: 'Schedule your complimentary session with The Atelier. No commitment — discover how personalized language and career coaching can transform your professional life.',
}

export default function BookSessionLayout({ children }: { children: React.ReactNode }) {
  return children
}
