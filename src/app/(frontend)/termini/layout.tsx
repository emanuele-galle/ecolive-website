import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Termini e Condizioni',
  description: 'Termini e condizioni d\'uso del sito Ecolive S.r.l.',
}

export default function TerminiLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
