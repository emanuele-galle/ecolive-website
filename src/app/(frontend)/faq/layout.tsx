import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Domande Frequenti · Case Prefabbricate',
  description: 'Risposte alle domande più frequenti sulle case prefabbricate in legno Ecolive: costi, tempi, permessi, sicurezza, certificazioni.',
}

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
