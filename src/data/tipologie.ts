import { Tent, Home, Building2, Briefcase, LucideIcon } from 'lucide-react'

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
  features: string[]
  specs: {
    label: string
    value: string
  }[]
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
    href: '/glamping',
    color: '#6B8F71',
    surfaceRange: '25-50 m²',
    features: [
      'Pronte in 60 giorni',
      'Zero fondazioni invasive',
      'Design personalizzabile',
      'Manutenzione minima',
      'Integrazione con il paesaggio',
      'Comfort premium'
    ],
    specs: [
      { label: 'Superficie', value: '25-50 m²' },
      { label: 'Tempi realizzazione', value: '30-45 giorni' },
      { label: 'Garanzia struttura', value: '30 anni' },
    ],
    icon: Tent
  },
  {
    id: 'smartsuite',
    title: 'SmartSuite',
    category: 'BUSINESS',
    description: 'Uffici e showroom modulari per il business moderno',
    extendedDescription: 'Spazi professionali progettati per il business moderno. Uffici, showroom, sale meeting e strutture commerciali con design contemporaneo, massima flessibilità degli spazi interni e costi di gestione ridotti grazie all\'efficienza energetica.',
    imageUrl: '/images/tipologie/smartsuite-new.png',
    heroImage: '/images/tipologie/smartsuite-new.png',
    href: '/smartsuite',
    color: '#1D1D1F',
    surfaceRange: '15-40 m²',
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
    href: '/residenziali',
    color: '#48484A',
    surfaceRange: '60-250 m²',
    features: [
      'Personalizzazione completa',
      'Consegna chiavi in mano',
      'Mutuo agevolato',
      'Efficienza energetica massima',
      'Comfort abitativo superiore',
      'Valore immobiliare garantito'
    ],
    specs: [
      { label: 'Superficie', value: '60-250 m²' },
      { label: 'Tempi realizzazione', value: '45-90 giorni' },
      { label: 'Garanzia struttura', value: '30 anni' },
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
    href: '/luxury',
    color: '#A0845C',
    surfaceRange: '150-400 m²',
    features: [
      'Finiture premium personalizzate',
      'Domotica integrata',
      'Piscina e spa opzionali',
      'Progettazione architettonica dedicata',
      'Materiali esclusivi',
      'Certificazioni top di gamma'
    ],
    specs: [
      { label: 'Superficie', value: '150-400 m²' },
      { label: 'Tempi realizzazione', value: '90-120 giorni' },
      { label: 'Garanzia struttura', value: '30 anni' },
    ],
    icon: Home
  },
]

export function getTipologiaById(id: string): Tipologia | undefined {
  return tipologie.find(t => t.id === id)
}

function getTipologiaByHref(href: string): Tipologia | undefined {
  return tipologie.find(t => t.href === href)
}
