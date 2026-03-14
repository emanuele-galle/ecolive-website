import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Certificazioni · Passive House, Casa Clima, ARCA',
  description: 'Le certificazioni delle nostre case: Passive House, Casa Clima Gold, ARCA, Classe A4 NZEB. Standard internazionali di qualità e efficienza.',
}

export default function CertificazioniLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
