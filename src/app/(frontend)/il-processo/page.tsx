import type { Metadata } from 'next'
import ProcessoContent from './ProcessoContent'
import JsonLd from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Il Processo - Dalla Prima Visita alla Casa Finita',
  description:
    'Il processo EcoLive in 7 step: primo contatto, visita in sede, progettazione Revit, contratto, preparazione cantiere, produzione in laboratorio, montaggio in 1 giorno.',
}

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Come costruire una casa in legno con EcoLive',
  description: 'Il percorso completo dalla prima visita alla consegna della casa prefabbricata in legno con sistema X-Frame.',
  totalTime: 'P90D',
  estimatedCost: {
    '@type': 'MonetaryAmount',
    currency: 'EUR',
    value: '1250',
    unitText: 'al metro quadro (grezzo avanzato)',
  },
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Primo Contatto', text: 'Contatti EcoLive e vieni invitato a visitare la sede di Spadola con la documentazione del terreno.' },
    { '@type': 'HowToStep', position: 2, name: 'Visita in Sede', text: 'Visiti lo stabilimento, vedi il sistema X-Frame dal vivo e firmi il mandato di progettazione.' },
    { '@type': 'HowToStep', position: 3, name: 'Progettazione', text: 'Sopralluogo drone, modellazione Revit, rendering fotorealistici della casa nel contesto reale.' },
    { '@type': 'HowToStep', position: 4, name: 'Contratto', text: 'Firma del contratto di appalto formale con termini, fasi e pagamenti strutturati.' },
    { '@type': 'HowToStep', position: 5, name: 'Preparazione Cantiere', text: 'Scavi, fondazioni e platea a cura del committente. EcoLive verifica prima del montaggio.' },
    { '@type': 'HowToStep', position: 6, name: 'Produzione in Laboratorio', text: 'Pareti, solai e coperture prodotti in ambiente controllato nello stabilimento di Spadola.' },
    { '@type': 'HowToStep', position: 7, name: 'Montaggio', text: 'Struttura completa montata in 1 giornata con 8-12 operatori specializzati e autogru.' },
  ],
}

export default function IlProcessoPage() {
  return (
    <>
      <JsonLd data={howToJsonLd} />
      <ProcessoContent />
    </>
  )
}
