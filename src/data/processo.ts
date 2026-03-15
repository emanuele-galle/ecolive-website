import type { LucideIcon } from 'lucide-react'
import {
  MessageCircle,
  Building,
  Pencil,
  FileSignature,
  HardHat,
  Factory,
  Wrench,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ProcessStep {
  id: string
  number: number
  title: string
  description: string
  highlights: string[]
  icon: LucideIcon
}

export interface Tranche {
  numero: number
  percentuale: string
  descrizione: string
}

export interface InclusoItem {
  categoria: string
  voci: string[]
}

export interface OpzioneClasseA4 {
  descrizione: string
  taglie: {
    dimensione: string
    pompa: string
    fotovoltaico: string
    sovrapprezzo: string
  }[]
}

// ---------------------------------------------------------------------------
// 1. Process Steps
// ---------------------------------------------------------------------------

export const processoSteps: ProcessStep[] = [
  {
    id: 'primo-contatto',
    number: 1,
    title: 'Primo Contatto',
    description:
      'Il cliente scopre EcoLive online e ci contatta per informazioni. Viene invitato a visitare la sede operativa a Spadola (VV) portando con s\u00e9 la documentazione necessaria: schizzo con misure del progetto desiderato, rilievo del terreno, visura catastale e posizionamento. L\u2019obiettivo \u00e8 comprendere le esigenze del cliente e mostrare le nostre capacit\u00e0 costruttive.',
    highlights: [
      'Scoperta online e primo contatto',
      'Invito a visitare la sede a Spadola (VV)',
      'Documentazione richiesta: schizzo con misure, rilievo terreno, visura catastale, posizionamento',
      'Obiettivo: capire le esigenze e mostrare le capacit\u00e0 EcoLive',
    ],
    icon: MessageCircle,
  },
  {
    id: 'visita-in-sede',
    number: 2,
    title: 'Visita in Sede',
    description:
      'Il cliente visita la sede EcoLive e vede dal vivo il sistema X-Frame: sezioni trasversali, campioni di materiali, dettagli costruttivi. Pu\u00f2 osservare l\u2019organizzazione aziendale, le postazioni Revit per la progettazione BIM, i rendering di progetti precedenti e 2-3 strutture di riferimento (piccola, media, grande). Al termine viene firmato il \u201cmandato di progettazione\u201d. La prima visita \u00e8 senza costi.',
    highlights: [
      'Visione dal vivo del sistema X-Frame (sezioni, campioni, dettagli)',
      'Organizzazione aziendale: postazioni Revit, rendering, progetti realizzati',
      'Visita a 2-3 strutture di riferimento (piccola, media, grande)',
      'Firma del mandato di progettazione',
      'Prima visita senza costi',
    ],
    icon: Building,
  },
  {
    id: 'progettazione',
    number: 3,
    title: 'Progettazione',
    description:
      'Sopralluogo sul terreno con video-mappatura drone e rilievo 3D. Il progetto viene modellato in Revit secondo le esigenze concordate, con rendering fotorealistici e animazioni nel contesto reale realizzati con Blender e Twinmotion. Il pagamento della progettazione \u00e8 suddiviso: 50% alla consegna della prima versione, 50% alla consegna della versione definitiva. L\u2019importo viene interamente detratto dal prezzo della casa.',
    highlights: [
      'Sopralluogo con drone: video-mappatura e rilievo 3D',
      'Modellazione BIM in Revit su misura',
      'Rendering fotorealistici e animazioni nel contesto reale (Blender/Twinmotion)',
      'Pagamento: 50% alla prima versione, 50% alla versione definitiva',
      'Importo progettazione detratto dal prezzo della casa',
    ],
    icon: Pencil,
  },
  {
    id: 'contratto',
    number: 4,
    title: 'Contratto',
    description:
      'Stipula del contratto formale dettagliato con tutte le specifiche costruttive e le scadenze essenziali. Viene definita la fase di realizzazione: grezzo avanzato e/o chiavi in mano. I pagamenti sono strutturati in tranches secondo il listino prezzi 2025. Il contratto prevede conseguenze chiare in caso di ritardi imputabili al cliente.',
    highlights: [
      'Contratto formale dettagliato con scadenze essenziali',
      'Definizione fase: grezzo avanzato e/o chiavi in mano',
      'Pagamenti strutturati in tranches (listino 2025)',
      'Conseguenze chiare per ritardi lato cliente',
    ],
    icon: FileSignature,
  },
  {
    id: 'preparazione-cantiere',
    number: 5,
    title: 'Preparazione Cantiere',
    description:
      'Fase a carico del cliente: scavo, magrone, fondazioni e platea con barre filettate predisposte per l\u2019ancoraggio della struttura. Il cliente documenta ogni fase con foto e video. EcoLive verifica la conformit\u00e0 della platea prima di attivare la produzione in laboratorio. Sessanta giorni prima della data di inizio prevista, il cliente versa la tranche di pagamento programmata.',
    highlights: [
      'A carico del cliente: scavo, magrone, fondazioni, platea con barre filettate',
      'Documentazione fotografica e video di ogni fase',
      'Verifica della platea da parte di EcoLive prima della produzione',
      '60 giorni prima: versamento della tranche programmata',
    ],
    icon: HardHat,
  },
  {
    id: 'produzione-laboratorio',
    number: 6,
    title: 'Produzione in Laboratorio',
    description:
      'EcoLive produce in laboratorio pareti, solai, copertura e struttura portante principale. Tutto avviene in ambiente controllato: temperatura, umidit\u00e0 e tempi di lavorazione sono monitorati per garantire la massima qualit\u00e0. Il carico \u00e8 ottimizzato sui camion (1-2 viaggi). Vantaggio esclusivo: trasporto in orizzontale che preserva l\u2019integrit\u00e0 degli elementi.',
    highlights: [
      'Produzione completa: pareti, solai, copertura, struttura portante',
      'Ambiente controllato: temperatura, umidit\u00e0, tempi monitorati',
      'Carico ottimizzato sui camion (1-2 viaggi)',
      'Trasporto in orizzontale (vantaggio esclusivo EcoLive)',
    ],
    icon: Factory,
  },
  {
    id: 'montaggio',
    number: 7,
    title: 'Montaggio',
    description:
      'Montaggio in 7 giorni: giorno 1-2 pilastri e struttura portante, giorno 3-4 pareti e controventatura, giorno 5-6 copertura, giorno 7 fissaggio definitivo e sigillature. Sul cantiere operano 8-12 operatori, 1 autogrù con braccio 30+ metri e 3 squadre specializzate, coordinati da un direttore generale (responsabile sicurezza). L\u2019intera operazione viene documentata con time-lapse, drone e reportage fotografico. Al termine manca solo la finitura esterna in acril-silossanico.',
    highlights: [
      '7 giorni: struttura portante (gg 1-2), pareti (gg 3-4), copertura (gg 5-6), fissaggio (gg 7)',
      'Fissaggio definitivo il giorno successivo',
      '8-12 operatori, 1 autogrù (braccio 30+ m), 3 squadre specializzate',
      'Coordinatore generale (responsabile sicurezza)',
      'Documentazione: time-lapse, drone, reportage fotografico',
      'Dopo il montaggio: manca solo finitura esterna acril-silossanica',
    ],
    icon: Wrench,
  },
]

// ---------------------------------------------------------------------------
// 2. Payment Schedules
// ---------------------------------------------------------------------------

export const pagamentiGrezzoAvanzato: Tranche[] = [
  {
    numero: 1,
    percentuale: '10%',
    descrizione: 'Alla firma del contratto',
  },
  {
    numero: 2,
    percentuale: '30%',
    descrizione:
      'Sessanta giorni prima della data di inizio lavori (preparazione struttura)',
  },
  {
    numero: 3,
    percentuale: '30%',
    descrizione: 'Al completamento del grezzo di base \u2014 PRIMO SAL',
  },
  {
    numero: 4,
    percentuale: '30%',
    descrizione: 'Al grezzo avanzato \u2014 SECONDO SAL',
  },
]

export const pagamentiChiaviInMano: Tranche[] = [
  {
    numero: 1,
    percentuale: '30%',
    descrizione:
      'Al completamento degli impianti tecnici, tramezze e massetti interni',
  },
  {
    numero: 2,
    percentuale: '40%',
    descrizione: 'All\u2019installazione degli infissi (porte e finestre)',
  },
  {
    numero: 3,
    percentuale: '20%',
    descrizione:
      'A pavimentazione, intonaci, tinteggiatura, porte interne, scala \u2014 TERZO SAL',
  },
  {
    numero: 4,
    percentuale: '10%',
    descrizione:
      'Alla consegna / verbale di consegna (al netto di eventuali riserve)',
  },
]

/** Nota: i pagamenti delle singole fasi chiavi in mano vengono versati 50% in anticipo e saldo a fine lavori. */
export const notaPagamentiChiaviInMano =
  'I pagamenti delle singole fasi chiavi in mano vengono versati 50% in anticipo e saldo a fine lavori.'

// ---------------------------------------------------------------------------
// 3. What's Included
// ---------------------------------------------------------------------------

export const inclusoGrezzoAvanzato: InclusoItem[] = [
  {
    categoria: 'Fondazioni e Struttura',
    voci: [
      'Verifica dimensionamento cordolo di fondazione',
      'Telaio strutturale portante principale (travi e pilastri lamellari)',
    ],
  },
  {
    categoria: 'Pareti Perimetrali X-Frame',
    voci: [
      'Telaio duolam + pannelli \u03BCX-Lam a 3 strati',
      'Cappotto in sughero super-compresso',
      'Intonaco Mapetherm Ar1 con rete in fibra di vetro',
    ],
  },
  {
    categoria: 'Solai e Copertura',
    voci: [
      'Eventuali solai interpiano (duolam + OSB3)',
      'Solai di copertura X-Frame (duolam + OSB + cartongesso/lastre silicato o legno a vista)',
      'Copertura con pannelli coibentati grecati o coppi per pendenze >10%',
      'Lana di roccia nelle intercapedini',
    ],
  },
  {
    categoria: 'Finiture Grezzo',
    voci: [
      'Scala con gradini al grezzo',
      'Davanzali in marmo sui davanzali finestra',
      'Seconda mano di intonaco/finitura bianco',
      'Pannelli di chiusura interni (\u03BCXLam)',
      'Strutture metalliche per tramezze divisorie',
    ],
  },
]

export const inclusoChiaviInMano: InclusoItem[] = [
  {
    categoria: 'Impianti e Predisposizioni',
    voci: [
      'Canalizzazione impianti tecnici + massetti interni (alleggeriti al 1\u00B0 piano)',
      'VMC puntuale con recupero entalpico',
      'Climatizzazione multisplit LG dual inverter con ionizzatori (A+++)',
      'Pompa di calore ACS dual inverter LG WH20S con accumulo 300 Lt + pannelli solari termici',
      'Domotica integrata Alexa/Apple HomeKit',
    ],
  },
  {
    categoria: 'Infissi e Serramenti',
    voci: [
      'Finestre PVC 76 mm (Libra Horizon SPI), 3 guarnizioni, Ug=0,7',
      'Porta d\u2019ingresso blindata RC3 UNI-EN 1627 con trasmittanza 1,3 W/m\u00B2K',
      'Persiane orientabili motorizzate (alluminio estruso)',
    ],
  },
  {
    categoria: 'Finiture Interne',
    voci: [
      'Intonacatura e tinteggiatura interna',
      'Pavimentazione SPC/Gres',
      'Porte interne (telai filo-muro, cerniere a scomparsa, serrature magnetiche smart)',
    ],
  },
  {
    categoria: 'Finitura Esterna',
    voci: ['Finitura esterna in acril-silossanico'],
  },
]

export const opzioneClasseA4: OpzioneClasseA4 = {
  descrizione:
    'Pompa di calore LG Therma V R290 (A+++) + pannelli fotovoltaici bifacciali 700W',
  taglie: [
    {
      dimensione: 'Piccola/Media',
      pompa: '8 kW',
      fotovoltaico: '6 kW',
      sovrapprezzo: '+\u20AC10.000',
    },
    {
      dimensione: 'Media/Grande',
      pompa: '16 kW',
      fotovoltaico: '12 kW',
      sovrapprezzo: '+\u20AC18.000',
    },
  ],
}
