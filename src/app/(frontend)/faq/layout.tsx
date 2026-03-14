import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ - Domande Frequenti',
  description: 'Risposte alle domande pi\u00F9 frequenti sulle case EcoLive: costi, tempi, materiali, garanzie, terreno, confronto con muratura tradizionale.',
}

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
