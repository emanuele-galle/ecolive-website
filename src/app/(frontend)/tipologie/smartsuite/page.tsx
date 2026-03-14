import type { Metadata } from 'next'
import { getTipologiaById } from '@/data/tipologie'
import TipologiaTemplate from '@/components/TipologiaTemplate'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'SmartSuite - Uffici e Showroom Modulari',
  description: 'SmartSuite EcoLive: uffici e showroom modulari in bioedilizia, 15-40 m², layout flessibile, cablaggio integrato, climatizzazione efficiente.',
}

export default function SmartSuitePage() {
  const tipologia = getTipologiaById('smartsuite')
  if (!tipologia) return notFound()

  const { icon: _, ...props } = tipologia
  return <TipologiaTemplate {...props} />
}
