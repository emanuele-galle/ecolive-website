import type { Metadata } from 'next'
import { getTipologiaById } from '@/data/tipologie'
import TipologiaTemplate from '@/components/TipologiaTemplate'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Luxury - Ville Esclusive in Bioedilizia',
  description: 'Ville luxury EcoLive: 150-400 m², finiture premium, domotica integrata, classe A4 casa passiva, progettazione architettonica dedicata.',
}

export default function LuxuryPage() {
  const tipologia = getTipologiaById('luxury')
  if (!tipologia) return notFound()

  const { icon: _, ...props } = tipologia
  return <TipologiaTemplate {...props} />
}
