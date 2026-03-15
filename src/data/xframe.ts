// ---------------------------------------------------------------------------
// X-Frame Construction System Data
// Sistema costruttivo ibrido brevettato EcoLive: Platform Frame + X-Lam + Post and Beam
// ---------------------------------------------------------------------------

// ---- Types ----------------------------------------------------------------

/** Singolo strato della stratigrafia di parete o copertura */
export interface StratoParete {
  /** Codice identificativo da brochure (A-Q) */
  id: string
  /** Nome sintetico dello strato */
  name: string
  /** Materiale principale */
  material: string
  /** Spessore nominale (mm) — null se variabile */
  thickness: number | null
  /** Descrizione tecnica */
  description: string
}

export interface SpecificheTecnicheElemento {
  /** Spessore complessivo dell'elemento (cm) */
  spessore: number
  /** Trasmittanza termica U (W/m2K) */
  trasmittanza: number
  /** Sfasamento termico (ore) */
  sfasamento: number
}

export interface SpecificheTecniche {
  parete: SpecificheTecnicheElemento
  copertura: SpecificheTecnicheElemento
}

export interface ConfrontoSistemaRiga {
  /** Nome del parametro di confronto */
  parametro: string
  /** Valutazione sistema a telaio (1-5) */
  telaio: number
  /** Valutazione sistema X-Lam (1-5) */
  xlam: number
  /** Valutazione sistema X-Frame (1-5) */
  xframe: number
}

export interface ConfrontoMuraturaRiga {
  parametro: string
  xframe: string
  muratura: string
}

export interface Certificazione {
  /** Nome della certificazione */
  nome: string
  /** Ente certificatore */
  ente: string
  /** Breve descrizione */
  descrizione: string
}

export interface LivelloPrezzoGrezzo {
  /** Prezzo indicativo al m2 (euro) */
  prezzoMq: number
  /** Classe energetica raggiunta */
  classeEnergetica: string
  /** Tempo di montaggio in cantiere (giorni lavorativi) */
  tempoGiorni: number
}

export interface LivelloPrezzoChiaviInMano {
  /** Sovrapprezzo al m2 rispetto al grezzo avanzato (euro) */
  prezzoAggiuntivo: number
  /** Tempo aggiuntivo per completamento (giorni lavorativi) */
  tempoGiorni: number
}

export interface OptionalClasseA4 {
  /** Sovrapprezzo per abitazioni piccole/medie (euro) */
  piccoleMedie: number
  /** Sovrapprezzo per abitazioni medie/grandi (euro) */
  medieGrandi: number
}

export interface Garanzia {
  /** Anni di garanzia sulla struttura portante */
  struttura: number
  /** Anni di garanzia sulle finiture chiavi in mano */
  chiavInMano: number
}

export interface Listino2025 {
  grezzoAvanzato: LivelloPrezzoGrezzo
  chiavInMano: LivelloPrezzoChiaviInMano
  grezzoBase: { tempoGiorni: number }
  optionalClasseA4: OptionalClasseA4
  garanzia: Garanzia
  /** Sconto percentuale per "casa campione" */
  incentivoCasaCampione: number
}

export interface TrancePagamento {
  /** Descrizione della fase di pagamento */
  fase: string
  /** Percentuale sul totale */
  percentuale: number
  /** Quando avviene il pagamento */
  momento: string
}

// ---- 1. Stratigrafia Pareti -----------------------------------------------

export const stratigrafiaPareti: StratoParete[] = [
  {
    id: 'A',
    name: 'Struttura portante lamellare',
    material: 'Legno lamellare',
    thickness: null,
    description:
      'Montanti portanti in legno lamellare sezione 16x32 cm. Costituiscono lo scheletro strutturale primario del sistema X-Frame, dimensionati per carichi verticali e azioni sismiche secondo Eurocodice 5.',
  },
  {
    id: 'B',
    name: 'Telaio strutturale bilam',
    material: 'Legno bilaminato',
    thickness: null,
    description:
      'Telaio secondario in legno bilaminato con sezioni 6x24 e 6x16 cm. Definisce la geometria delle campate e accoglie l\'isolamento termoacustico tra i montanti.',
  },
  {
    id: 'C',
    name: 'Lamellare 3 strati \u03BCXlam',
    material: 'Micro X-Lam (pannello a strati incrociati)',
    thickness: 20,
    description:
      'Pannello micro X-Lam a 3 strati incrociati (~20 mm). Garantisce controvento strutturale, tenuta all\'aria e rigidezza di piano, unendo i vantaggi del Platform Frame e dell\'X-Lam.',
  },
  {
    id: 'D',
    name: 'Lana minerale doppia densit\u00e0',
    material: 'Lana minerale a doppia densit\u00e0',
    thickness: 160,
    description:
      'Pannello isolante in lana minerale a doppia densit\u00e0 (160 mm) inserito tra i montanti del telaio. Elevate prestazioni termiche e acustiche con ottima traspirabilit\u00e0 al vapore.',
  },
  {
    id: 'E',
    name: '\u03BCSughero alta densit\u00e0',
    material: 'Micro-sughero espanso alta densit\u00e0',
    thickness: 30,
    description:
      'Cappotto esterno in micro-sughero espanso ad alta densit\u00e0 (30 mm). Materiale 100% naturale con eccellente inerzia termica estiva. Nelle zone ad alta umidit\u00e0 viene sostituito con pannelli XPS equivalenti.',
  },
  {
    id: 'F',
    name: 'Telo freno vapore / traspirante diffusore',
    material: 'Membrana igrovariabile',
    thickness: null,
    description:
      'Membrana igrovariabile che funge da freno al vapore lato interno e da telo traspirante diffusore lato esterno. Regola la migrazione del vapore acqueo proteggendo la struttura dalla condensa interstiziale.',
  },
  {
    id: 'H',
    name: 'Pannelli tecno-gesso HD',
    material: 'Tecno-gesso ad alta densit\u00e0',
    thickness: 25,
    description:
      'Lastre in tecno-gesso ad alta densit\u00e0 (s=25 mm) per il rivestimento interno. Offrono massa areica elevata (miglior isolamento acustico), resistenza al fuoco REI e superficie pronta per la finitura.',
  },
  {
    id: 'I',
    name: 'Pannelli OSB3',
    material: 'OSB/3 strutturale',
    thickness: null,
    description:
      'Pannelli in OSB di tipo 3 (uso strutturale in ambiente umido). Contribuiscono alla rigidezza di parete e alla distribuzione dei carichi, applicati come controvento aggiuntivo dove richiesto dal calcolo sismico.',
  },
  {
    id: 'L',
    name: '4\u00b0 lato in Purenit HD',
    material: 'Purenit alta densit\u00e0',
    thickness: null,
    description:
      'Elemento sagomato in Purenit HD utilizzato come quarto lato del davanzale finestra. Garantisce la continuit\u00e0 dell\'isolamento e l\'impermeabilizzazione nel nodo critico serramento-parete, eliminando ponti termici e infiltrazioni.',
  },
  {
    id: 'M',
    name: 'Intercapedine d\'aria per canalizzazioni',
    material: 'Aria (intercapedine impiantistica)',
    thickness: null,
    description:
      'Intercapedine d\'aria tra la struttura e il rivestimento interno. Ospita canalizzazioni elettriche, idrauliche e VMC senza forare gli strati strutturali, consentendo manutenzione e aggiornamento impiantistico nel tempo.',
  },
  {
    id: 'N',
    name: 'Portapilastri zincati e barre filettate f16',
    material: 'Acciaio zincato a caldo',
    thickness: null,
    description:
      'Sistema di ancoraggio a fondazione con portapilastri in acciaio zincato a caldo e barre filettate M16. Trasmette i carichi verticali e le azioni di sollevamento sismico/vento alla platea di fondazione.',
  },
  {
    id: 'O',
    name: 'Rasante Mapetherm + acril-silossanico',
    material: 'Rasante armato + finitura acril-silossanica',
    thickness: null,
    description:
      'Ciclo di finitura esterna composto da rasante armato Mapetherm con rete in fibra di vetro e finitura acril-silossanica. Protegge il cappotto dagli agenti atmosferici garantendo traspirabilit\u00e0 e durabilit\u00e0 estetica.',
  },
  {
    id: 'P',
    name: 'Base XPS alta densit\u00e0',
    material: 'XPS estruso ad alta densit\u00e0 (700 kPa)',
    thickness: null,
    description:
      'Elemento di base in XPS estruso ad alta densit\u00e0 (resistenza a compressione 700 kPa). Sostituisce il tradizionale cordolo in cemento armato, eliminando il ponte termico alla base della parete e velocizzando il montaggio.',
  },
  {
    id: 'Q',
    name: 'Manto finale di copertura',
    material: 'Variabile (tegole, lamiera, guaina)',
    thickness: null,
    description:
      'Strato di finitura del tetto, scelto in base al progetto architettonico: tegole in laterizio, coppi, lamiera aggraffata o guaina ardesiata. Posato su listellatura ventilata per garantire la microventilazione del pacchetto copertura.',
  },
]

// ---- 2. Specifiche Tecniche -----------------------------------------------

export const specificheTecniche: SpecificheTecniche = {
  parete: {
    spessore: 29,
    trasmittanza: 0.159,
    sfasamento: 18.8,
  },
  copertura: {
    spessore: 40,
    trasmittanza: 0.137,
    sfasamento: 14.5,
  },
}

// ---- 3. Confronto Sistemi Costruttivi -------------------------------------

export const confrontoSistemi: ConfrontoSistemaRiga[] = [
  { parametro: 'Diffusione storica', telaio: 4, xlam: 3, xframe: 2 },
  { parametro: 'Numero costruzioni', telaio: 5, xlam: 4, xframe: 2 },
  { parametro: 'Eurocodice 5', telaio: 4, xlam: 4, xframe: 5 },
  { parametro: 'Prefabbricazione', telaio: 2, xlam: 3, xframe: 5 },
  { parametro: 'Tempi cantiere', telaio: 2, xlam: 3, xframe: 5 },
  { parametro: 'Capacit\u00e0 dissipativa sismica', telaio: 3, xlam: 4, xframe: 5 },
  { parametro: 'Resistenza fuoco', telaio: 3, xlam: 4, xframe: 5 },
  { parametro: 'Trasmittanza', telaio: 3, xlam: 2, xframe: 5 },
  { parametro: 'Sfasamento', telaio: 2, xlam: 3, xframe: 5 },
  { parametro: 'Tenuta aria', telaio: 2, xlam: 5, xframe: 5 },
  { parametro: 'Sostituibilit\u00e0 parti', telaio: 5, xlam: 2, xframe: 5 },
  { parametro: 'Multipiano', telaio: 2, xlam: 5, xframe: 4 },
  { parametro: 'Flessibilit\u00e0 impiantistica', telaio: 4, xlam: 2, xframe: 5 },
  { parametro: 'Prezzo (a parit\u00e0 di classe)', telaio: 3, xlam: 2, xframe: 5 },
]

// ---- 4. Confronto con Muratura Tradizionale -------------------------------

export const confrontoMuratura: ConfrontoMuraturaRiga[] = [
  {
    parametro: 'Tempi di costruzione',
    xframe: '7-30 giorni (grezzo \u2192 chiavi in mano)',
    muratura: '12-18 mesi',
  },
  {
    parametro: 'Classe energetica',
    xframe: 'A1 di serie, A4 opzionale',
    muratura: 'B/C di serie, A con interventi costosi',
  },
  {
    parametro: 'Trasmittanza parete (U)',
    xframe: '0,159 W/m\u00b2K',
    muratura: '0,30-0,45 W/m\u00b2K',
  },
  {
    parametro: 'Sfasamento termico',
    xframe: '18,8 ore',
    muratura: '8-12 ore',
  },
  {
    parametro: 'Spessore parete',
    xframe: '29 cm',
    muratura: '40-50 cm (per prestazioni simili)',
  },
  {
    parametro: 'Resistenza sismica',
    xframe: 'Struttura dissipativa, leggerezza e duttilit\u00e0',
    muratura: 'Massa elevata, comportamento fragile',
  },
  {
    parametro: 'Peso strutturale',
    xframe: '~1/5 rispetto alla muratura',
    muratura: 'Riferimento (1x)',
  },
  {
    parametro: 'Cantiere',
    xframe: 'A secco, prefabbricato, nessun tempo di maturazione',
    muratura: 'Umido, tempi di presa e stagionatura',
  },
  {
    parametro: 'Ponti termici',
    xframe: 'Eliminati (base XPS, Purenit, cappotto continuo)',
    muratura: 'Frequenti (cordoli, pilastri, davanzali)',
  },
  {
    parametro: 'Manutenzione impianti',
    xframe: 'Intercapedine dedicata, accesso senza demolizioni',
    muratura: 'Tracce a muro, demolizione per interventi',
  },
  {
    parametro: 'Costo a parit\u00e0 di prestazione',
    xframe: 'Inferiore del 15-25%',
    muratura: 'Riferimento',
  },
  {
    parametro: 'Sostenibilit\u00e0 ambientale',
    xframe: 'Legno certificato, CO\u2082 negativo, materiali naturali',
    muratura: 'Cemento e laterizio ad alta energia incorporata',
  },
  {
    parametro: 'Garanzia strutturale',
    xframe: '30 anni',
    muratura: '10 anni (legge)',
  },
]

// ---- 5. Certificazioni ---------------------------------------------------

export const certificazioni: Certificazione[] = [
  {
    nome: 'A4 CliMAX',
    ente: 'Certificazione energetica italiana',
    descrizione:
      'Massima classe energetica raggiungibile. L\'opzione A4 CliMAX garantisce consumo quasi zero (nZEB) con fabbisogno energetico inferiore a 15 kWh/m\u00b2 anno.',
  },
  {
    nome: 'Passive House Institute / PHIUS',
    ente: 'Passive House Institute (Darmstadt) / PHIUS (USA)',
    descrizione:
      'Certificazione internazionale per edifici a consumo energetico ultra-basso. Il sistema X-Frame raggiunge i requisiti Passive House grazie a trasmittanze ridotte, tenuta all\'aria e assenza di ponti termici.',
  },
  {
    nome: 'ARCA',
    ente: 'ARchitettura Comfort Ambiente',
    descrizione:
      'Certificazione italiana specifica per edifici in legno. Attesta qualit\u00e0 costruttiva, durabilit\u00e0, sicurezza sismica e al fuoco, comfort abitativo e sostenibilit\u00e0 ambientale.',
  },
  {
    nome: 'LEED for Homes',
    ente: 'U.S. Green Building Council',
    descrizione:
      'Sistema di rating internazionale per la sostenibilit\u00e0 degli edifici residenziali. Valuta efficienza energetica, uso di materiali sostenibili, qualit\u00e0 dell\'aria interna e gestione delle risorse idriche.',
  },
  {
    nome: 'Woodworks for Residential Construction',
    ente: 'WoodWorks',
    descrizione:
      'Programma di supporto tecnico e certificazione per costruzioni in legno. Attesta la conformit\u00e0 strutturale e le best practice nella progettazione e realizzazione di edifici residenziali in legno.',
  },
]

// ---- 6. Listino 2025 ------------------------------------------------------

export const listino2025: Listino2025 = {
  grezzoAvanzato: {
    prezzoMq: 1250,
    classeEnergetica: 'A1',
    tempoGiorni: 7,
  },
  chiavInMano: {
    prezzoAggiuntivo: 430,
    tempoGiorni: 30,
  },
  grezzoBase: {
    tempoGiorni: 3,
  },
  optionalClasseA4: {
    piccoleMedie: 10_000,
    medieGrandi: 18_000,
  },
  garanzia: {
    struttura: 30,
    chiavInMano: 10,
  },
  incentivoCasaCampione: 5,
}

// ---- 7. Piani di Pagamento ------------------------------------------------

/** Tranche di pagamento per il livello "Grezzo Avanzato" */
export const pagamentiGrezzoAvanzato: TrancePagamento[] = [
  {
    fase: 'Acconto alla conferma d\'ordine',
    percentuale: 30,
    momento: 'Alla firma del contratto',
  },
  {
    fase: 'Inizio produzione in stabilimento',
    percentuale: 30,
    momento: 'Avvio lavorazione pannelli',
  },
  {
    fase: 'Consegna e montaggio in cantiere',
    percentuale: 30,
    momento: 'Arrivo materiali e inizio montaggio',
  },
  {
    fase: 'Saldo a fine lavori strutturali',
    percentuale: 10,
    momento: 'Completamento grezzo avanzato e collaudo',
  },
]

/** Tranche di pagamento per il livello "Chiavi in Mano" */
export const pagamentiChiaviInMano: TrancePagamento[] = [
  {
    fase: 'Acconto alla conferma d\'ordine',
    percentuale: 20,
    momento: 'Alla firma del contratto',
  },
  {
    fase: 'Inizio produzione in stabilimento',
    percentuale: 20,
    momento: 'Avvio lavorazione pannelli',
  },
  {
    fase: 'Consegna e montaggio struttura',
    percentuale: 20,
    momento: 'Arrivo materiali e completamento grezzo',
  },
  {
    fase: 'Completamento impianti',
    percentuale: 20,
    momento: 'Fine installazione impianti elettrici, idraulici e VMC',
  },
  {
    fase: 'Saldo a consegna chiavi',
    percentuale: 20,
    momento: 'Collaudo finale e consegna dell\'abitazione',
  },
]

// ---- 8. Cosa include il Grezzo Avanzato e Chiavi in Mano ------------------

/** Voci incluse nel livello "Grezzo Avanzato" */
export const inclusoGrezzoAvanzato: string[] = [
  'Struttura portante in legno lamellare certificato',
  'Pannelli \u03BCXlam di controvento e tenuta aria',
  'Isolamento in lana minerale doppia densit\u00e0 (160 mm)',
  'Cappotto esterno in \u03BCSughero o XPS (30 mm)',
  'Telo freno vapore interno e telo traspirante esterno',
  'Pannelli tecno-gesso HD interni (25 mm)',
  'Pannelli OSB3 strutturali',
  'Base XPS alta densit\u00e0 (700 kPa) in sostituzione del cordolo',
  'Portapilastri zincati e ancoraggio a fondazione',
  'Rasante armato e finitura acril-silossanica esterna',
  'Serramenti in PVC o legno-alluminio con triplo vetro',
  'Copertura completa con listellatura ventilata e manto finale',
  'Impermeabilizzazione e lattoneria completa',
  'Trasporto e montaggio in cantiere',
  'Progetto strutturale e relazione di calcolo',
  'Certificazione energetica APE',
  'Garanzia strutturale 30 anni',
]

/** Voci incluse nel livello "Chiavi in Mano" (in aggiunta al Grezzo Avanzato) */
export const inclusoChiaviInMano: string[] = [
  'Tutto quanto incluso nel Grezzo Avanzato',
  'Impianto elettrico completo a norma CEI',
  'Impianto idraulico e sanitario completo',
  'Impianto di riscaldamento a pavimento o radiante',
  'Predisposizione impianto di climatizzazione',
  'Impianto VMC (Ventilazione Meccanica Controllata)',
  'Pavimentazione interna in gres porcellanato o parquet',
  'Rivestimenti bagni e cucina',
  'Porte interne e portoncino blindato',
  'Tinteggiatura completa pareti e soffitti',
  'Sanitari e rubinetteria di prima scelta',
  'Intercapedine impiantistica con canalizzazioni',
  'Davanzali in Purenit HD con impermeabilizzazione',
  'Collaudo finale e certificazioni impiantistiche',
  'Garanzia finiture 10 anni',
]
