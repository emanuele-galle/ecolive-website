import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ecolive.srl'),
  title: {
    default: 'Ecolive - Case Prefabbricate in Legno',
    template: '%s | Ecolive',
  },
  description: 'Leader nella progettazione e realizzazione di case prefabbricate in legno. Sistema costruttivo X-Frame, bioedilizia e sostenibilità dal 1999.',
  keywords: ['case prefabbricate', 'case in legno', 'bioedilizia', 'X-Frame', 'sostenibilità', 'passive house'],
  authors: [{ name: 'Ecolive S.r.l.' }],
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://www.ecolive.srl',
    siteName: 'Ecolive',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ecolive - Case Prefabbricate in Legno',
    description: 'Leader nella progettazione e realizzazione di case prefabbricate in legno. Sistema costruttivo X-Frame, bioedilizia e sostenibilità dal 1999.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
