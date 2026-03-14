import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chi Siamo · La Nostra Storia',
  description: 'Scopri la storia di Ecolive, il team e la passione per la bioedilizia dal 1999. Case prefabbricate in legno con sistema X-Frame dalla Calabria.',
}

export default function ChiSiamoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
