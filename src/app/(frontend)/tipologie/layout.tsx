import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tipologie Case Prefabbricate in Legno',
  description: 'Esplora le nostre 4 linee di case prefabbricate in legno: Glamping, SmartSuite, Residenziali e Luxury. Da 15 a 400 m², consegna in 30-120 giorni.',
}

export default function TipologieLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
