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
      { label: 'Garanzia struttura', value: '50 anni' },
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
      { label: 'Garanzia struttura', value: '50 anni' },
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
    description: 'In Soli 60 Giorni la Casa dei tuoi Sogni diventa Realtà',
    extendedDescription: 'La soluzione perfetta per chi desidera una casa moderna, efficiente e sostenibile. Dal monolocale alla villa, progettiamo abitazioni su misura per ogni esigenza familiare, con un rapporto qualità-prezzo imbattibile e tempi di consegna certi.',
    imageUrl: '/images/tipologie/residenziali.webp',
    heroImage: '/images/tipologie/residenziali.webp',
    href: '/tipologie/residenziali',
    color: '#48484A',
    surfaceRange: '60-250 m²',
    priceRange: 'Da 1.250 €/mq (grezzo avanzato)',
    features: [
      'Personalizzazione completa',
      'Grezzo avanzato o chiavi in mano',
      'Struttura montata in 1 giorno',
      'Classe energetica A1 (A4 opzionale)',
      'Comfort abitativo superiore',
      'Garanzia struttura 50 anni'
    ],
    specs: [
      { label: 'Superficie', value: '60-250 m²' },
      { label: 'Grezzo avanzato', value: '7 giorni' },
      { label: 'Chiavi in mano', value: '30 giorni' },
      { label: 'Garanzia struttura', value: '50 anni' },
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
    description: 'Ville esclusive in bioedilizia con finiture premium',
    extendedDescription: 'Ville esclusive che combinano l\'eccellenza costruttiva del sistema X-Frame con finiture di alto livello. Ampi spazi, design contemporaneo e prestazioni energetiche superiori per chi cerca il massimo della qualità abitativa in armonia con l\'ambiente.',
    imageUrl: '/images/tipologie/luxury.webp',
    heroImage: '/images/tipologie/luxury-hero.webp',
    href: '/tipologie/luxury',
    color: '#A0845C',
    surfaceRange: '150-400 m²',
    priceRange: 'Da 1.450 €/mq (grezzo avanzato)',
    features: [
      'Finiture premium personalizzate',
      'Domotica integrata Alexa/HomeKit',
      'Progettazione architettonica dedicata',
      'Classe A4 casa passiva',
      'Materiali esclusivi',
      'Garanzia struttura 50 anni'
    ],
    specs: [
      { label: 'Superficie', value: '150-400 m²' },
      { label: 'Grezzo avanzato', value: '10-15 giorni' },
      { label: 'Chiavi in mano', value: '60-90 giorni' },
      { label: 'Garanzia struttura', value: '50 anni' },
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

