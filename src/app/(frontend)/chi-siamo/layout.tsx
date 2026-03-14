import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chi Siamo - EcoLive S.r.l.',
  description:
    'EcoLive S.r.l., Spadola (VV): progettiamo, produciamo e costruiamo case prefabbricate in legno con il sistema X-Frame. La bioedilizia più innovativa parte dal Sud.',
}

export default function ChiSiamoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
