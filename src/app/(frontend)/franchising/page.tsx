import { Metadata } from 'next'
import FranchisingContent from './FranchisingContent'

export const metadata: Metadata = {
  title: 'Franchising - Porta X-Frame nel Tuo Territorio',
  description:
    'Affiliati a EcoLive: produci case X-Frame nel tuo territorio. Know-how, formazione, macchinari e clienti garantiti. Investimento da 100.000 euro.',
}

export default function FranchisingPage() {
  return <FranchisingContent />
}
