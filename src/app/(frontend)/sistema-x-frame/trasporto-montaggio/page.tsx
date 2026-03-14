import type { Metadata } from 'next'
import TrasportoMontaggioContent from './TrasportoMontaggioContent'

export const metadata: Metadata = {
  title: 'Trasporto e Montaggio X-Frame',
  description:
    'Trasporto orizzontale esclusivo X-Frame: dimezziamo i carichi. Montaggio struttura in 1 giornata con 8-12 operatori e autogru. Casa finita dalla mattina alla sera.',
}

export default function TrasportoMontaggioPage() {
  return <TrasportoMontaggioContent />
}
