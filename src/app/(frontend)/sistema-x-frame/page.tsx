import type { Metadata } from 'next'
import SistemaXFrameContent from './SistemaXFrameContent'

export const metadata: Metadata = {
  title: 'Sistema Costruttivo X-Frame',
  description:
    'Il sistema costruttivo ibrido X-Frame combina Platform Frame, X-Lam e Post and Beam. Pareti 29cm, trasmittanza 0,159 W/m²K, sfasamento 18,8 ore. Montaggio in 1 giorno.',
}

export default function SistemaXFramePage() {
  return <SistemaXFrameContent />
}
