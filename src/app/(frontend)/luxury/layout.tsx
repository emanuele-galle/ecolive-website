import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ville di Lusso in Legno · 150-400 m²',
  description: 'Ville di lusso prefabbricate in legno. Design esclusivo, finiture premium, da 150 a 400 m². Consegna in 90-120 giorni.',
}

export default function LuxuryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
