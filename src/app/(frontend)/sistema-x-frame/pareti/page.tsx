import type { Metadata } from 'next'
import ParetiContent from './ParetiContent'

export const metadata: Metadata = {
  title: 'Pareti X-Frame - Stratigrafie e Prestazioni',
  description:
    'Pareti X-Frame: spessore 29cm, trasmittanza 0,159 W/m²K, sfasamento 18,8 ore. Telaio Bilam, lana di roccia 16cm, cappotto sughero, monoblocco finestra con Purenit.',
}

export default function ParetiPage() {
  return <ParetiContent />
}
