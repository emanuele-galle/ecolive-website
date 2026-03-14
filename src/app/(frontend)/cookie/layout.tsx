import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Informativa sui cookie utilizzati dal sito Ecolive.',
}

export default function CookieLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
