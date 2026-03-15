import type { Metadata } from 'next'
import TrasportoMontaggioContent from './TrasportoMontaggioContent'

export const metadata: Metadata = {
  title: 'Trasporto e Montaggio X-Frame',
  description:
    'Trasporto orizzontale esclusivo X-Frame: dimezziamo i carichi. Montaggio struttura in 7 giorni con 8-12 operatori e autogru.',
}

export default function TrasportoMontaggioPage() {
  return <TrasportoMontaggioContent />
}
