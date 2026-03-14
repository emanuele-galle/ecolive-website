import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Coperture X-Frame - Tetti Piani e Inclinati',
  description: 'Coperture X-Frame: tetto piano, una falda, due falde. Monoblocchi prefabbricati con camera di ventilazione e contro-listelli già montati.',
}

export default function CopertureLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
