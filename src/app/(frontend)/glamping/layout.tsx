import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Glamping in Legno · Strutture 25-50 m²',
  description: 'Strutture glamping prefabbricate in legno certificato. Ideali per agriturismi, campeggi di lusso e resort. Pronte in 30-45 giorni.',
}

export default function GlampingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
