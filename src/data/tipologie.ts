import { Tent, Home, Building2, Briefcase, LucideIcon } from 'lucide-react'

interface TipologiaSpec {
  label: string
  value: string
}

interface TipologiaModule {
  label: string
  mq: number
  livelli: number
}

interface Tipologia {
  id: string
  title: string
  category: string
  description: string
  extendedDescription: string
  imageUrl: string
  heroImage: string
  href: string
  color: string
  surfaceRange: string
  priceRange: string
  features: string[]
  specs: TipologiaSpec[]
  modules: TipologiaModule[]
  icon: LucideIcon
}

export const tipologie: Tipologia[] = [
  {
    id: 'glamping',
    title: 'Glamping',
    category: 'OSPITALITÀ',
    description: 'Il Tuo Angolo di Paradiso - Strutture per turismo eco-sostenibile',
    extendedDescription: 'Soluzioni ideali per agriturismi, camping di lusso, resort e strutture ricettive che desiderano offrire un\'esperienza unica a contatto con la natura senza rinunciare al comfort. Design moderno, materiali naturali e integrazione perfetta con l\'ambiente circostante.',
    imageUrl: '/images/glamping/glamping-triple-path.webp',
    heroImage: '/images/glamping/glamping-triple-path.webp',
    href: '/tipologie/glamping',
    color: '#6B8F71',
    surfaceRange: '25-50 m²',
    priceRange: 'Da 900 €/mq',
    features: [
      'Pronte in 30-45 giorni',
      'Impatto ambientale zero',
      'Design personalizzabile',
      'Manutenzione minima',
      'Integrazione con il paesaggio',
      'Comfort premium'
    ],
    specs: [
      { label: 'Superficie', value: '25-50 m²' },
      { label: 'Tempi realizzazione', value: '30-45 giorni' },
      { label: 'Garanzia struttura', value: '30 anni' },
      { label: 'Classe energetica', value: 'A1 (A4 opzionale)' },
    ],
    modules: [
      { label: '4×7 singolo', mq: 28, livelli: 1 },
      { label: '4×7 doppio', mq: 42, livelli: 1 },
    ],
    icon: Tent
  },
  {
    id: 'smartsuite',
    title: 'SmartSuite',
    category: 'BUSINESS',
    description: 'Uffici e showroom modulari per il business moderno',
    extendedDescription: 'Spazi professionali progettati per il business moderno. Uffici, showroom, sale meeting e strutture commerciali con design contemporaneo, massima flessibilità degli spazi interni e costi di gestione ridotti grazie all\'efficienza energetica.',
    imageUrl: '/images/tipologie/smartsuite-new.webp',
    heroImage: '/images/tipologie/smartsuite-new.webp',
    href: '/tipologie/smartsuite',
    color: '#1D1D1F',
    surfaceRange: '15-40 m²',
    priceRange: 'Da 950 €/mq',
    features: [
      'Layout flessibile',
      'Cablaggio integrato',
      'Acustica ottimizzata',
      'Climatizzazione efficiente',
      'Espandibile modulare',
      'Immagine professionale'
    ],
    specs: [
      { label: 'Superficie', value: '15-40 m²' },
      { label: 'Tempi realizzazione', value: '30-60 giorni' },
      { label: 'Garanzia struttura', value: '30 anni' },
      { label: 'Classe energetica', value: 'A1 (A4 opzionale)' },
    ],
    modules: [
      { label: '4×4 base', mq: 16, livelli: 1 },
      { label: '4×7 standard', mq: 28, livelli: 1 },
      { label: '4×8 esteso', mq: 32, livelli: 1 },
    ],
    icon: Briefcase
  },
  {
    id: 'residenziali',
    title: 'Residenziali',
    category: 'ABITAZIONI',
    description: 'La Casa dei tuoi Sogni diventa Realtà — Personalizzazione completa e rapporto qualità-prezzo imbattibile',
    extendedDescription: 'La soluzione ideale per famiglie e giovani coppie che cercano la prima casa o un\'abitazione su misura. Design funzionale, personalizzazione completa degli spazi e un rapporto qualità-prezzo eccellente. Dalla scelta dei materiali alla disposizione degli ambienti, ogni dettaglio viene progettato per le tue esigenze quotidiane. Efficienza energetica di serie, tempi di consegna certi e la solidità del sistema X-Frame.',
    imageUrl: '/images/tipologie/residenziali.webp',
    heroImage: '/images/tipologie/residenziali.webp',
    href: '/tipologie/residenziali',
    color: '#48484A',
    surfaceRange: '60-250 m²',
    priceRange: 'Da 1.250 €/mq (grezzo avanzato)',
    features: [
      'Personalizzazione completa',
      'Grezzo avanzato o chiavi in mano',
      'Struttura montata in 7 giorni',
      'Classe energetica A1 (A4 opzionale)',
      'Rapporto qualità-prezzo ottimale',
      'Garanzia struttura 30 anni'
    ],
    specs: [
      { label: 'Superficie', value: '60-250 m²' },
      { label: 'Grezzo avanzato', value: '7 giorni' },
      { label: 'Chiavi in mano', value: '30 giorni' },
      { label: 'Garanzia struttura', value: '30 anni' },
      { label: 'Classe energetica', value: 'A1 (A4 opzionale)' },
    ],
    modules: [
      { label: '4×7 bilocale', mq: 56, livelli: 1 },
      { label: '8×7 trilocale', mq: 112, livelli: 1 },
      { label: '8×7 due livelli', mq: 168, livelli: 2 },
      { label: '12×7 due livelli', mq: 224, livelli: 2 },
    ],
    icon: Building2
  },
  {
    id: 'luxury',
    title: 'Luxury',
    category: 'RESIDENZIALE PREMIUM',
    description: 'Architettura d\'Eccellenza — Ville su misura con finiture artigianali e tecnologia all\'avanguardia',
    extendedDescription: 'Ville su misura progettate da un architetto dedicato, dalla prima bozza alla consegna chiavi. Finiture artigianali selezionate, materiali esclusivi e domotica completa con integrazione Alexa, HomeKit e Matter. Ogni villa è un\'opera unica che integra design paesaggistico, wellness areas, cantine vini e piscine infinity. Classe energetica A4 di serie per lo standard casa passiva, con un servizio di consulenza esclusiva a livello concierge.',
    imageUrl: '/images/tipologie/luxury.webp',
    heroImage: '/images/tipologie/luxury-hero.webp',
    href: '/tipologie/luxury',
    color: '#8B6914',
    surfaceRange: '150-400 m²',
    priceRange: 'Da 1.680 €/mq (grezzo avanzato premium)',
    features: [
      'Progettazione architettonica firmata',
      'Finiture artigianali di lusso',
      'Domotica completa Alexa/HomeKit/Matter',
      'Classe A4 — Standard Casa Passiva',
      'Design paesaggistico integrato',
      'Garanzia struttura 30 anni + manutenzione premium'
    ],
    specs: [
      { label: 'Superficie', value: '150-400 m²' },
      { label: 'Grezzo avanzato', value: '10-15 giorni' },
      { label: 'Chiavi in mano', value: '60-90 giorni' },
      { label: 'Garanzia struttura', value: '30 anni' },
      { label: 'Classe energetica', value: 'A4 (casa passiva)' },
    ],
    modules: [
      { label: '12×7 due livelli', mq: 168, livelli: 2 },
      { label: '16×7 due livelli', mq: 224, livelli: 2 },
      { label: '16×8 due livelli', mq: 280, livelli: 2 },
      { label: '20×8 due livelli', mq: 360, livelli: 2 },
    ],
    icon: Home
  },
]

export function getTipologiaById(id: string): Tipologia | undefined {
  return tipologie.find(t => t.id === id)
}

