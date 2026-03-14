import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SmartSuite · Uffici Modulari in Legno',
  description: 'Uffici modulari e showroom prefabbricati in legno. Soluzioni SmartSuite da 15 a 40 m², pronti in 30-60 giorni. Classe energetica A4.',
}

export default function SmartSuiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
