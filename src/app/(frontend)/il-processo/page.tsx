import type { Metadata } from 'next'
import ProcessoContent from './ProcessoContent'

export const metadata: Metadata = {
  title: 'Il Processo - Dalla Prima Visita alla Casa Finita',
  description:
    'Il processo EcoLive in 7 step: primo contatto, visita in sede, progettazione Revit, contratto, preparazione cantiere, produzione in laboratorio, montaggio in 1 giorno.',
}

export default function IlProcessoPage() {
  return <ProcessoContent />
}
