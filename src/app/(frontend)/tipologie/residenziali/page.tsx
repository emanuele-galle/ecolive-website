import type { Metadata } from 'next'
import { getTipologiaById } from '@/data/tipologie'
import TipologiaTemplate from '@/components/TipologiaTemplate'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Case Residenziali - La Casa dei Tuoi Sogni in 30 Giorni',
  description: 'Case residenziali EcoLive: 60-250 m², grezzo avanzato da 1.250 €/mq, chiavi in mano in 30 giorni, classe energetica A1 (A4 opzionale), garanzia 50 anni.',
}

export default function ResidenzialePage() {
  const tipologia = getTipologiaById('residenziali')
  if (!tipologia) return notFound()

  const { icon: _, ...props } = tipologia
  return <TipologiaTemplate {...props} />
}
