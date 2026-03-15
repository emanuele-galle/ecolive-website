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
    default: 'EcoLive - Case Prefabbricate in Legno | Sistema X-Frame',
    template: '%s | EcoLive',
  },
  description: 'EcoLive progetta, produce e costruisce case prefabbricate in legno con il sistema X-Frame. Struttura montata in 7 giorni, classe A4, garanzia 30 anni. Spadola (VV), Calabria.',
  keywords: ['case prefabbricate legno', 'case in legno Calabria', 'bioedilizia', 'sistema X-Frame', 'casa passiva', 'EcoLive', 'case prefabbricate Sud Italia', 'costruttore case legno'],
  authors: [{ name: 'EcoLive S.r.l.' }],
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://www.ecolive.srl',
    siteName: 'EcoLive',
    description: 'EcoLive progetta, produce e costruisce case prefabbricate in legno con il sistema X-Frame. La bioedilizia più innovativa parte dal Sud.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EcoLive - Case Prefabbricate in Legno | Sistema X-Frame',
    description: 'EcoLive progetta, produce e costruisce case prefabbricate in legno con il sistema X-Frame. Struttura montata in 7 giorni, classe A4, garanzia 30 anni.',
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
