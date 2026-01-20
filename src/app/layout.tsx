import type { Metadata } from 'next'
import { Inter, Roboto } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
  weight: ['300', '400', '500', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ecolive.srl'),
  title: {
    default: 'Ecolive - Case Prefabbricate in Legno',
    template: '%s | Ecolive',
  },
  description: 'Leader nella progettazione e realizzazione di case prefabbricate in legno. Sistema costruttivo X-Frame, bioedilizia e sostenibilità dal 1999.',
  keywords: ['case prefabbricate', 'case in legno', 'bioedilizia', 'X-Frame', 'sostenibilita', 'passive house'],
  authors: [{ name: 'Ecolive S.r.l.' }],
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://www.ecolive.srl',
    siteName: 'Ecolive',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ecolive - Case Prefabbricate in Legno',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className={`${inter.variable} ${roboto.variable}`}>
      <body className="font-roboto antialiased">{children}</body>
    </html>
  )
}
