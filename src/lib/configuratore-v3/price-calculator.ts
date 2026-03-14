import type { TipologiaId, FinituraLevel, RangePrezzo } from './types'
import { finiture } from './configurations'

/**
 * Prezzo di riferimento: 1.250 €/mq per parete premium residenziale (grezzo avanzato)
 * Chiavi in mano: +430 €/mq
 * I prezzi per altre tipologie e finiture si calcolano da questo riferimento
 */
const PREZZO_BASE_PREMIUM_MQ = 1250
const SUPPLEMENTO_CHIAVI_IN_MANO_MQ = 430

/** Moltiplicatore per tipologia rispetto al residenziale */
const moltiplicatoreTipologia: Record<TipologiaId, number> = {
  glamping: 0.72, // strutture più piccole e semplici
  smartsuite: 0.76, // commerciale, meno finiture residenziali
  residenziali: 1.0, // riferimento
  luxury: 1.16, // materiali premium, complessità maggiore
}

/** Costo aggiuntivo fisso per opzione casa passiva (Classe A4) */
const COSTO_PASSIVA_PICCOLA = 10000 // fino a 150 mq
const COSTO_PASSIVA_GRANDE = 18000 // oltre 150 mq

/** Margine di variazione per il range (±) */
const MARGINE_PERCENTUALE = 0.08

/**
 * Calcola il range di prezzo indicativo per una configurazione
 */
export function calcolaRangePrezzo(
  tipologia: TipologiaId,
  mq: number,
  finitura: FinituraLevel,
): { grezzoAvanzato: RangePrezzo; chiaviInMano: RangePrezzo } {
  const finituraData = finiture.find(f => f.id === finitura)
  const moltiplicatoreFinitura = finituraData?.moltiplicatorePrezzo ?? 1.0
  const moltiplicatoreTipo = moltiplicatoreTipologia[tipologia]

  // Prezzo base al mq
  const prezzoBaseMq = PREZZO_BASE_PREMIUM_MQ * moltiplicatoreFinitura * moltiplicatoreTipo

  // Grezzo avanzato
  let prezzoGA = prezzoBaseMq * mq

  // Per casa passiva, aggiungi costo fisso
  if (finitura === 'passiva') {
    prezzoGA += mq <= 150 ? COSTO_PASSIVA_PICCOLA : COSTO_PASSIVA_GRANDE
  }

  // Chiavi in mano
  const prezzoCiM = prezzoGA + (SUPPLEMENTO_CHIAVI_IN_MANO_MQ * moltiplicatoreTipo * mq)

  // Range con margine
  const grezzoAvanzato: RangePrezzo = {
    min: Math.round(prezzoGA * (1 - MARGINE_PERCENTUALE) / 1000) * 1000,
    max: Math.round(prezzoGA * (1 + MARGINE_PERCENTUALE) / 1000) * 1000,
    tipo: 'grezzo-avanzato',
  }

  const chiaviInMano: RangePrezzo = {
    min: Math.round(prezzoCiM * (1 - MARGINE_PERCENTUALE) / 1000) * 1000,
    max: Math.round(prezzoCiM * (1 + MARGINE_PERCENTUALE) / 1000) * 1000,
    tipo: 'chiavi-in-mano',
  }

  return { grezzoAvanzato, chiaviInMano }
}

/** Formatta prezzo in formato italiano */
export function formatPrezzo(valore: number): string {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(valore)
}
