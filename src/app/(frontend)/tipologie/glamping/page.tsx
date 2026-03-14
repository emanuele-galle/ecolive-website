import type { Metadata } from 'next'
import { getTipologiaById } from '@/data/tipologie'
import TipologiaTemplate from '@/components/TipologiaTemplate'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Glamping - Strutture Eco-Luxury per Ospitalità',
  description: 'Strutture glamping EcoLive in bioedilizia: 25-50 m², pronte in 30-45 giorni, impatto ambientale zero. Ideali per agriturismi, resort e campeggi di lusso.',
}

export default function GlampingPage() {
  const tipologia = getTipologiaById('glamping')
  if (!tipologia) return notFound()

  const { icon: _, ...props } = tipologia
  return <TipologiaTemplate {...props} />
}
