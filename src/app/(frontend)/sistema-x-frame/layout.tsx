import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sistema X-Frame | Tecnologia Costruttiva Avanzata | Ecolive',
  description: 'Scopri il Sistema X-Frame: la tecnologia ibrida che unisce Platform Frame, X-Lam e Post & Beam. Massima resistenza antisismica, isolamento termico superiore e costruzione in soli 60 giorni.',
  keywords: ['X-Frame', 'case prefabbricate legno', 'sistema costruttivo', 'antisismica', 'bioedilizia'],
}

export default function XFrameLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
