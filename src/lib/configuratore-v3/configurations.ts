import type { ModuloDimensionale, Finitura, TipologiaId, Stanza } from './types'

/** Moduli disponibili per tipologia */
export const moduliPerTipologia: Record<TipologiaId, ModuloDimensionale[]> = {
  glamping: [
    { id: 'glamp-28', label: '4×7 Singolo', mq: 28, livelli: 1, larghezza: 4, profondita: 7, description: 'Monolocale con bagno' },
    { id: 'glamp-42', label: '4×7 + estensione', mq: 42, livelli: 1, larghezza: 6, profondita: 7, description: 'Open space con zona notte separata' },
  ],
  smartsuite: [
    { id: 'smart-16', label: '4×4 Base', mq: 16, livelli: 1, larghezza: 4, profondita: 4, description: 'Ufficio singolo' },
    { id: 'smart-28', label: '4×7 Standard', mq: 28, livelli: 1, larghezza: 4, profondita: 7, description: 'Ufficio con reception' },
    { id: 'smart-32', label: '4×8 Esteso', mq: 32, livelli: 1, larghezza: 4, profondita: 8, description: 'Showroom o sala meeting' },
  ],
  residenziali: [
    { id: 'res-56', label: '4×7 Bilocale', mq: 56, livelli: 1, larghezza: 8, profondita: 7, description: 'Bilocale con soggiorno e camera' },
    { id: 'res-112', label: '8×7 Trilocale', mq: 112, livelli: 1, larghezza: 8, profondita: 14, description: 'Trilocale con due camere' },
    { id: 'res-168', label: '8×7 Due livelli', mq: 168, livelli: 2, larghezza: 8, profondita: 14, description: 'Quadrilocale su due piani' },
    { id: 'res-224', label: '12×7 Due livelli', mq: 224, livelli: 2, larghezza: 12, profondita: 14, description: 'Villa con ampi spazi' },
  ],
  luxury: [
    { id: 'lux-168', label: '12×7 Due livelli', mq: 168, livelli: 2, larghezza: 12, profondita: 14, description: 'Villa compatta' },
    { id: 'lux-224', label: '16×7 Due livelli', mq: 224, livelli: 2, larghezza: 16, profondita: 14, description: 'Villa spaziosa' },
    { id: 'lux-280', label: '16×8 Due livelli', mq: 280, livelli: 2, larghezza: 16, profondita: 17.5, description: 'Villa premium' },
    { id: 'lux-360', label: '20×8 Due livelli', mq: 360, livelli: 2, larghezza: 20, profondita: 18, description: 'Villa esclusiva' },
  ],
}

/** Livelli di finitura disponibili */
export const finiture: Finitura[] = [
  {
    id: 'essenziale',
    label: 'Essenziale',
    description: 'Struttura con pannelli OSB e cappotto in polistirene. Eccellente rapporto qualità-prezzo.',
    materiali: [
      'Telaio strutturale Bilam',
      'Pannelli OSB3',
      'Lana di roccia 16cm',
      'Cappotto polistirene 3cm',
      'Rasatura esterna',
    ],
    moltiplicatorePrezzo: 0.82,
  },
  {
    id: 'premium',
    label: 'Premium',
    description: 'Lo standard EcoLive: pannelli tre strati μXlam, cappotto in sughero. Classe A1.',
    materiali: [
      'Telaio strutturale Bilam',
      'Pannelli lamellari 3 strati μXlam',
      'Lana di roccia 16cm',
      'Cappotto sughero alta densità 3cm',
      'Rasatura Mapetherm + acril silossanico',
      'Pannelli tecno-gesso HD 25mm',
    ],
    moltiplicatorePrezzo: 1.0,
  },
  {
    id: 'passiva',
    label: 'Casa Passiva',
    description: 'Premium + pompa di calore LG Therma V R290 e pannelli fotovoltaici bi-facciali. Classe A4.',
    materiali: [
      'Tutto il pacchetto Premium',
      'Pompa di calore LG Therma V R290 (A+++)',
      'Pannelli FV bi-facciali 700W',
      'Serramenti ad alte prestazioni',
      'Certificazione casa passiva',
    ],
    moltiplicatorePrezzo: 1.0, // same base, optional adds fixed cost
  },
]

/** Layout stanze di default per modulo */
export function getDefaultStanze(moduloId: string): Stanza[] {
  switch (moduloId) {
    case 'res-56':
      return [
        { id: 's1', tipo: 'soggiorno', label: 'Soggiorno/Cucina', x: 0, y: 0, w: 4, h: 4 },
        { id: 's2', tipo: 'camera', label: 'Camera', x: 4, y: 0, w: 4, h: 3 },
        { id: 's3', tipo: 'bagno', label: 'Bagno', x: 4, y: 3, w: 2, h: 2 },
        { id: 's4', tipo: 'ingresso', label: 'Ingresso', x: 6, y: 3, w: 2, h: 2 },
      ]
    case 'res-112':
      return [
        { id: 's1', tipo: 'soggiorno', label: 'Soggiorno', x: 0, y: 0, w: 5, h: 4 },
        { id: 's2', tipo: 'cucina', label: 'Cucina', x: 5, y: 0, w: 3, h: 4 },
        { id: 's3', tipo: 'camera', label: 'Camera matrimoniale', x: 0, y: 4, w: 4, h: 3 },
        { id: 's4', tipo: 'camera', label: 'Camera singola', x: 4, y: 4, w: 3, h: 3 },
        { id: 's5', tipo: 'bagno', label: 'Bagno', x: 7, y: 4, w: 1, h: 3 },
      ]
    case 'res-168':
    case 'res-224':
    case 'lux-168':
    case 'lux-224':
    case 'lux-280':
    case 'lux-360':
      return [
        { id: 's1', tipo: 'soggiorno', label: 'Soggiorno', x: 0, y: 0, w: 6, h: 4 },
        { id: 's2', tipo: 'cucina', label: 'Cucina', x: 6, y: 0, w: 4, h: 4 },
        { id: 's3', tipo: 'camera', label: 'Camera matrimoniale', x: 0, y: 4, w: 4, h: 3 },
        { id: 's4', tipo: 'camera', label: 'Camera 2', x: 4, y: 4, w: 3, h: 3 },
        { id: 's5', tipo: 'camera', label: 'Camera 3', x: 7, y: 4, w: 3, h: 3 },
        { id: 's6', tipo: 'bagno', label: 'Bagno 1', x: 0, y: 7, w: 2, h: 2 },
        { id: 's7', tipo: 'bagno', label: 'Bagno 2', x: 2, y: 7, w: 2, h: 2 },
      ]
    default:
      return [
        { id: 's1', tipo: 'soggiorno', label: 'Ambiente unico', x: 0, y: 0, w: 4, h: 4 },
        { id: 's2', tipo: 'bagno', label: 'Bagno', x: 4, y: 0, w: 2, h: 2 },
      ]
  }
}
