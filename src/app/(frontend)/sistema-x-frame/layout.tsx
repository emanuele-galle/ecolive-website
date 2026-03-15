import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Sistema X-Frame · Ecolive',
    default: 'Sistema X-Frame · Tecnologia Costruttiva Avanzata',
  },
  description:
    'Scopri il Sistema X-Frame: la tecnologia ibrida che unisce Platform Frame, X-Lam e Post & Beam. Massima resistenza antisismica, isolamento termico superiore e montaggio in 7 giorni.',
  keywords: [
    'X-Frame',
    'case prefabbricate legno',
    'sistema costruttivo',
    'antisismica',
    'bioedilizia',
    'Platform Frame',
    'X-Lam',
    'Post and Beam',
  ],
}

export default function XFrameLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
