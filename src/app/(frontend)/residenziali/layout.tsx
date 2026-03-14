import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Case Residenziali Prefabbricate · 60-250 m²',
  description: 'Case residenziali prefabbricate in legno con sistema X-Frame. Da 60 a 250 m², Classe A4, garanzia 50 anni. Pronte in 45-90 giorni.',
}

export default function ResidenzialLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
