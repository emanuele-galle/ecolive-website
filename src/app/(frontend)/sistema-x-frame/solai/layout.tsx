import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Solai X-Frame - Copertura e Interpiano',
  description: 'Solai X-Frame prefabbricati: spessore tetto 40cm, trasmittanza 0,137 W/m²K, sfasamento 14,5 ore. Moduli 2,10m × 13m, immediatamente calpestabili.',
}

export default function SolaiLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
