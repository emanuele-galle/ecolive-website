/** Tipologia selezionabile nel configuratore */
export type TipologiaId = 'glamping' | 'smartsuite' | 'residenziali' | 'luxury'

/** Livello di finitura */
export type FinituraLevel = 'essenziale' | 'premium' | 'passiva'

/** Tipo di tetto */
export type TipoTetto = 'piano' | 'una-falda' | 'due-falde'

/** Modulo dimensionale selezionabile */
export interface ModuloDimensionale {
  id: string
  label: string
  mq: number
  livelli: number
  larghezza: number // metri
  profondita: number // metri
  description: string
}

/** Finitura con dettagli */
export interface Finitura {
  id: FinituraLevel
  label: string
  description: string
  materiali: string[]
  /** Moltiplicatore prezzo rispetto al riferimento premium (1.0) */
  moltiplicatorePrezzo: number
}

/** Tipo di stanza */
export type TipoStanza = 'soggiorno' | 'cucina' | 'camera' | 'bagno' | 'studio' | 'ripostiglio' | 'ingresso'

/** Stanza nel layout planimetria */
export interface Stanza {
  id: string
  tipo: TipoStanza
  label: string
  /** Posizione x in griglia (unità modulari) */
  x: number
  /** Posizione y in griglia */
  y: number
  /** Larghezza in griglia */
  w: number
  /** Altezza in griglia */
  h: number
}

/** Preset layout planimetria */
export interface LayoutPreset {
  id: string
  label: string
  description: string
  stanze: Stanza[]
}

/** Dati contatto lead */
export interface ContattoLead {
  nome: string
  email: string
  telefono: string
  localitaTerreno: string
  note: string
}

/** Stato completo della configurazione */
export interface ConfigurazioneCompleta {
  tipologia: TipologiaId | null
  modulo: ModuloDimensionale | null
  finitura: FinituraLevel | null
  stanze: Stanza[]
  tetto: TipoTetto
  contatto: ContattoLead | null
}

/** Step del configuratore */
export type ConfigStep = 1 | 2 | 3 | 4 | 5

/** Range di prezzo calcolato */
export interface RangePrezzo {
  min: number
  max: number
  tipo: 'grezzo-avanzato' | 'chiavi-in-mano'
}
