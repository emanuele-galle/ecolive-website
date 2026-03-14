import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Area Tecnica · Prestazioni e Certificazioni',
  description: 'Dati tecnici, certificazioni e prestazioni delle case Ecolive. Passive House, Casa Clima Gold, ARCA, Classe A4 NZEB, Zona Sismica 1.',
}

export default function AreaTecnicaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
