import type { Metadata } from 'next'
import ConfrontoContent from './ConfrontoContent'

export const metadata: Metadata = {
  title: 'Confronto X-Frame vs Telaio vs X-Lam vs Muratura',
  description:
    'Confronto dettagliato del sistema X-Frame con Telaio, X-Lam e muratura tradizionale su 14 parametri tecnici. Dati reali di prestazione.',
}

export default function ConfrontoPage() {
  return <ConfrontoContent />
}
