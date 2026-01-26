/**
 * Dati educativi per la sezione "Perché costa di più"
 *
 * Ogni materiale include:
 * - Processo produttivo dettagliato
 * - Specifiche tecniche comparative
 * - Timeline degrado nel tempo
 * - Breakdown costi e risparmio
 */

import { Layers, Grid3x3, Snowflake, Home } from 'lucide-react'

export interface MaterialSpec {
  metrica: string
  standard: {
    valore: string
    problemi: string
  }
  ecolive: {
    valore: string
    benefici: string
  }
}

export interface TimelineMilestone {
  anno: number
  standard: string
  ecolive: string
}

export interface CostBreakdownItem {
  nome: string
  costo: number
  percentuale: number
}

export interface RisparmioItem {
  nome: string
  anni: string
  valore: number
}

export interface PerformanceTrendPoint {
  anno: number
  ecolive: number
  standard: number
  metrica: string
}

export interface MaterialEducationData {
  id: string
  nome: string
  sottotitolo: string
  icon: any // Lucide icon component
  color: string // Colore principale per grafici e sparklines

  cosE: {
    descrizione: string
    processo: string[]
  }

  specs: MaterialSpec[]

  timeline: TimelineMilestone[]

  // Dati per sparklines (trend performance 0-25 anni)
  performanceTrend: PerformanceTrendPoint[]

  breakdown: {
    investimentoExtra: number
    voci: CostBreakdownItem[]
    risparmi: RisparmioItem[]
    totaleRisparmio: number
    roiNetto: number
    valoreAggiunto: string
  }
}

export const materialsEducationData: Record<string, MaterialEducationData> = {
  telaio: {
    id: 'telaio',
    nome: 'Telaio Strutturale',
    sottotitolo: 'BiLam Lamellare vs Legno Massello',
    icon: Layers,
    color: '#40916c', // Verde Ecolive

    cosE: {
      descrizione: "Legno fatto con tante tavole incollate in modo incrociato. Questo lo rende molto più forte e stabile del legno normale.",
      processo: [
        "Scegliamo solo legno perfetto (senza buchi o difetti)",
        "Lo asciughiamo alla giusta umidità",
        "Lo incolliamo con colle super resistenti",
        "Lo pressiamo forte per 24 ore",
        "Lo controlliamo con ultrasuoni per trovare difetti nascosti",
        "Ha tutte le certificazioni europee"
      ]
    },

    specs: [
      {
        metrica: "Si deforma nel tempo?",
        standard: {
          valore: "Sì, fino a 3-5mm",
          problemi: "Si muove con l'umidità e cambia con le stagioni"
        },
        ecolive: {
          valore: "Quasi per niente (0.2mm)",
          benefici: "Resta sempre uguale, non si deforma mai"
        }
      },
      {
        metrica: "Quanto è resistente?",
        standard: {
          valore: "Normale",
          problemi: "I buchi nel legno lo indeboliscono del 30-40%"
        },
        ecolive: {
          valore: "Molto più resistente",
          benefici: "Senza buchi, le fibre incrociate lo rendono più forte"
        }
      },
      {
        metrica: "Cambia con l'umidità?",
        standard: {
          valore: "Sì, cambia molto",
          problemi: "L'umidità lo fa gonfiare o restringere"
        },
        ecolive: {
          valore: "Sempre uguale",
          benefici: "Resta stabile con qualsiasi tempo"
        }
      },
      {
        metrica: "Garanzia",
        standard: {
          valore: "2 anni",
          problemi: "Dopo devi pagare tu le riparazioni"
        },
        ecolive: {
          valore: "30 anni",
          benefici: "Stai tranquillo per decenni"
        }
      }
    ],

    timeline: [
      {
        anno: 0,
        standard: "Installato, sembra perfetto",
        ecolive: "Installato, certificato"
      },
      {
        anno: 5,
        standard: "Prime deformazioni visibili, porte si incastrano",
        ecolive: "Perfetto come giorno 1"
      },
      {
        anno: 10,
        standard: "Crepe nei rivestimenti, ritiri evidenti",
        ecolive: "Perfetto come giorno 1"
      },
      {
        anno: 25,
        standard: "Intervento strutturale necessario (€8.000)",
        ecolive: "Perfetto come giorno 1, garanzia ancora attiva"
      }
    ],

    performanceTrend: [
      { anno: 0, ecolive: 100, standard: 100, metrica: "Stabilità %" },
      { anno: 5, ecolive: 100, standard: 85, metrica: "Stabilità %" },
      { anno: 10, ecolive: 100, standard: 70, metrica: "Stabilità %" },
      { anno: 15, ecolive: 100, standard: 55, metrica: "Stabilità %" },
      { anno: 20, ecolive: 100, standard: 45, metrica: "Stabilità %" },
      { anno: 25, ecolive: 100, standard: 30, metrica: "Stabilità %" }
    ],

    breakdown: {
      investimentoExtra: 15000,
      voci: [
        { nome: "Materia prima classe A", costo: 5000, percentuale: 33 },
        { nome: "Processo laminazione", costo: 4000, percentuale: 27 },
        { nome: "Controlli qualità ultrasuoni", costo: 2000, percentuale: 13 },
        { nome: "Certificazioni EN 14080", costo: 2000, percentuale: 13 },
        { nome: "Lavorazione precisione CNC", costo: 2000, percentuale: 14 }
      ],
      risparmi: [
        { nome: "Zero interventi manutenzione", anni: "0-25", valore: 2500 },
        { nome: "Nessuna sostituzione necessaria", anni: "10-25", valore: 1000 }
      ],
      totaleRisparmio: 3500,
      roiNetto: -11500,
      valoreAggiunto: "Valore immobile +10% (€25.000+ su €250k), zero stress problemi strutturali"
    }
  },

  pannelli: {
    id: 'pannelli',
    nome: 'Pannelli Parete',
    sottotitolo: '3 Strati Lamellare vs OSB Pressato',
    icon: Grid3x3,
    color: '#2a9d8f', // Teal

    cosE: {
      descrizione: "Pannelli fatti con 3 strati di legno incrociati. Ogni strato è messo di traverso rispetto all'altro per renderlo più stabile.",
      processo: [
        "Scegliamo legno di buona qualità",
        "Incolliamo 3 strati messi di traverso",
        "Li pressiamo forte insieme",
        "Li tagliamo con precisione",
        "Controlliamo che non rilascino sostanze nocive",
        "Verifichiamo che siano resistenti"
      ]
    },

    specs: [
      {
        metrica: "Quanto è resistente?",
        standard: {
          valore: "Normale",
          problemi: "Si scolla dopo 7-10 anni"
        },
        ecolive: {
          valore: "Molto più resistente",
          benefici: "Fatto tutto insieme, non si scolla mai"
        }
      },
      {
        metrica: "Fa male respirarlo?",
        standard: {
          valore: "Un po' (nei limiti di legge)",
          problemi: "Rilascia sostanze che non fanno bene"
        },
        ecolive: {
          valore: "Per niente (aria pulita)",
          benefici: "Non rilascia quasi nulla, aria sempre salubre"
        }
      },
      {
        metrica: "Si gonfia con l'umidità?",
        standard: {
          valore: "Sì, fino a 8mm",
          problemi: "Si gonfia quando c'è umidità"
        },
        ecolive: {
          valore: "Quasi per niente (1mm)",
          benefici: "Gli strati incrociati lo tengono fermo"
        }
      },
      {
        metrica: "Quanto dura?",
        standard: {
          valore: "10-12 anni",
          problemi: "Poi si rovina e va cambiato"
        },
        ecolive: {
          valore: "Più di 50 anni",
          benefici: "Dura per sempre"
        }
      }
    ],

    timeline: [
      {
        anno: 0,
        standard: "Montato, aspetto uniforme",
        ecolive: "Montato, certificato E0"
      },
      {
        anno: 5,
        standard: "Prime bollicine/gonfiamenti superficiali",
        ecolive: "Perfetto come giorno 1"
      },
      {
        anno: 10,
        standard: "Scollamenti evidenti, necessaria sostituzione",
        ecolive: "Perfetto come giorno 1"
      },
      {
        anno: 25,
        standard: "Già sostituito 2 volte (€12.000 totale)",
        ecolive: "Perfetto come giorno 1"
      }
    ],

    performanceTrend: [
      { anno: 0, ecolive: 100, standard: 100, metrica: "Qualità %" },
      { anno: 5, ecolive: 100, standard: 75, metrica: "Qualità %" },
      { anno: 10, ecolive: 100, standard: 40, metrica: "Qualità %" },
      { anno: 15, ecolive: 100, standard: 100, metrica: "Qualità %" }, // Sostituito
      { anno: 20, ecolive: 100, standard: 60, metrica: "Qualità %" },
      { anno: 25, ecolive: 100, standard: 20, metrica: "Qualità %" }
    ],

    breakdown: {
      investimentoExtra: 8000,
      voci: [
        { nome: "Legno lamellare 3-strati", costo: 3500, percentuale: 44 },
        { nome: "Pressatura continua", costo: 1800, percentuale: 22 },
        { nome: "Taglio CNC precisione", costo: 1200, percentuale: 15 },
        { nome: "Certificazione E0", costo: 1000, percentuale: 13 },
        { nome: "Test meccanici", costo: 500, percentuale: 6 }
      ],
      risparmi: [
        { nome: "Nessuna sostituzione 10 anni", anni: "10", valore: 6000 },
        { nome: "Nessuna sostituzione 20 anni", anni: "20", valore: 6000 }
      ],
      totaleRisparmio: 12000,
      roiNetto: 4000,
      valoreAggiunto: "Aria più salubre (zero VOC), tranquillità per decenni"
    }
  },

  sughero: {
    id: 'sughero',
    nome: 'Isolamento Termico',
    sottotitolo: 'Sughero Naturale vs Polistirolo (EPS)',
    icon: Snowflake,
    color: '#e76f51', // Arancione caldo

    cosE: {
      descrizione: "Pannelli di sughero naturale. Prendiamo la corteccia della quercia da sughero, la sbriciamo, la pressiamo e la cuociamo al vapore senza usare colle chimiche.",
      processo: [
        "Prendiamo la corteccia dalla quercia (ricresce ogni 9 anni)",
        "La lasciamo stagionare 6 mesi",
        "La sbriciamo in piccoli pezzi",
        "La pressiamo con vapore caldissimo (le resine naturali fanno da colla)",
        "La tagliamo nelle misure giuste",
        "Ha certificazioni per bioedilizia"
      ]
    },

    specs: [
      {
        metrica: "Isola dal caldo/freddo?",
        standard: {
          valore: "Benissimo",
          problemi: "Ma con il tempo perde efficacia"
        },
        ecolive: {
          valore: "Benissimo",
          benefici: "E resta così per sempre, traspira meglio"
        }
      },
      {
        metrica: "Mantiene la temperatura?",
        standard: {
          valore: "Poco",
          problemi: "Troppo leggero, la casa cambia temperatura subito"
        },
        ecolive: {
          valore: "Molto bene",
          benefici: "Più pesante, mantiene la temperatura stabile"
        }
      },
      {
        metrica: "È naturale?",
        standard: {
          valore: "No (fatto dal petrolio)",
          problemi: "Non rinnovabile, inquina"
        },
        ecolive: {
          valore: "Sì (100% naturale)",
          benefici: "Rinnovabile, non inquina"
        }
      },
      {
        metrica: "Quanto dura?",
        standard: {
          valore: "15-20 anni",
          problemi: "Poi si degrada e perde efficacia"
        },
        ecolive: {
          valore: "Più di 100 anni",
          benefici: "Resta uguale per sempre"
        }
      }
    ],

    timeline: [
      {
        anno: 0,
        standard: "Installato, lambda 0.038",
        ecolive: "Installato, lambda 0.040"
      },
      {
        anno: 5,
        standard: "Prime perdite prestazioni (-5%)",
        ecolive: "Prestazioni invariate"
      },
      {
        anno: 10,
        standard: "Lambda salito a 0.045 (-15% efficienza)",
        ecolive: "Prestazioni invariate"
      },
      {
        anno: 25,
        standard: "Lambda 0.055, bollette +30%",
        ecolive: "Prestazioni invariate, bollette -30% rispetto a standard"
      }
    ],

    performanceTrend: [
      { anno: 0, ecolive: 100, standard: 100, metrica: "Efficienza %" },
      { anno: 5, ecolive: 100, standard: 95, metrica: "Efficienza %" },
      { anno: 10, ecolive: 100, standard: 85, metrica: "Efficienza %" },
      { anno: 15, ecolive: 100, standard: 78, metrica: "Efficienza %" },
      { anno: 20, ecolive: 100, standard: 72, metrica: "Efficienza %" },
      { anno: 25, ecolive: 100, standard: 70, metrica: "Efficienza %" }
    ],

    breakdown: {
      investimentoExtra: 6000,
      voci: [
        { nome: "Sughero naturale espanso", costo: 2800, percentuale: 47 },
        { nome: "Lavorazione vapore", costo: 1500, percentuale: 25 },
        { nome: "Taglio precisione", costo: 800, percentuale: 13 },
        { nome: "Certificazioni bioedilizia", costo: 600, percentuale: 10 },
        { nome: "Trasporto (Portogallo)", costo: 300, percentuale: 5 }
      ],
      risparmi: [
        { nome: "Risparmio bollette 25 anni (30%)", anni: "0-25", valore: 18000 },
        { nome: "Nessuna sostituzione", anni: "15-25", valore: 6000 }
      ],
      totaleRisparmio: 24000,
      roiNetto: 18000,
      valoreAggiunto: "Casa fresca d'estate senza climatizzatori, aria sempre salubre"
    }
  },

  gesso: {
    id: 'gesso',
    nome: 'Rivestimenti Interni',
    sottotitolo: 'Gesso-Fibra 25mm vs Cartongesso 12mm',
    icon: Home,
    color: '#C4704B', // Marrone terra (Ecolive brand)

    cosE: {
      descrizione: "Pannelli di gesso naturale rinforzato con fibre. L'impasto viene pressato e fatto asciugare senza usare colle chimiche.",
      processo: [
        "Mescoliamo gesso naturale con fibre di carta",
        "Lo pressiamo forte",
        "Lo lasciamo asciugare 48 ore",
        "Controlliamo che sia perfettamente piatto",
        "Verifichiamo che resista agli urti",
        "Ha certificazione antincendio massima"
      ]
    },

    specs: [
      {
        metrica: "Resiste agli urti?",
        standard: {
          valore: "Si ammacca facilmente",
          problemi: "Basta un colpo per fare buchi o ammaccature"
        },
        ecolive: {
          valore: "Non si ammacca quasi mai",
          benefici: "Resiste agli urti di tutti i giorni"
        }
      },
      {
        metrica: "Mantiene la temperatura?",
        standard: {
          valore: "Poco",
          problemi: "La temperatura cambia subito"
        },
        ecolive: {
          valore: "Molto bene",
          benefici: "Tiene stabile la temperatura, più comfort"
        }
      },
      {
        metrica: "È spesso?",
        standard: {
          valore: "Sottile (12mm)",
          problemi: "Si sente tutto attraverso le pareti"
        },
        ecolive: {
          valore: "Doppio spessore (25mm)",
          benefici: "Rigido, isola meglio i rumori"
        }
      },
      {
        metrica: "È ignifugo?",
        standard: {
          valore: "Buono",
          problemi: "In caso di incendio rilascia fumo"
        },
        ecolive: {
          valore: "Eccellente (non brucia)",
          benefici: "Non prende fuoco, sicurezza massima"
        }
      }
    ],

    timeline: [
      {
        anno: 0,
        standard: "Montato, aspetto liscio",
        ecolive: "Montato, certificato A1"
      },
      {
        anno: 5,
        standard: "Prime ammaccature, buchi da fissaggi",
        ecolive: "Perfetto come giorno 1"
      },
      {
        anno: 10,
        standard: "Crepe negli angoli, necessarie riparazioni",
        ecolive: "Perfetto come giorno 1"
      },
      {
        anno: 25,
        standard: "Rifacimento parziale pareti (€4.000)",
        ecolive: "Perfetto come giorno 1"
      }
    ],

    performanceTrend: [
      { anno: 0, ecolive: 100, standard: 100, metrica: "Resistenza %" },
      { anno: 5, ecolive: 100, standard: 80, metrica: "Resistenza %" },
      { anno: 10, ecolive: 100, standard: 65, metrica: "Resistenza %" },
      { anno: 15, ecolive: 100, standard: 55, metrica: "Resistenza %" },
      { anno: 20, ecolive: 100, standard: 45, metrica: "Resistenza %" },
      { anno: 25, ecolive: 100, standard: 35, metrica: "Resistenza %" }
    ],

    breakdown: {
      investimentoExtra: 4000,
      voci: [
        { nome: "Gesso-fibra 25mm", costo: 1800, percentuale: 45 },
        { nome: "Lavorazione pressatura", costo: 1000, percentuale: 25 },
        { nome: "Test resistenza", costo: 600, percentuale: 15 },
        { nome: "Certificazione A1", costo: 400, percentuale: 10 },
        { nome: "Trasporto (Germania)", costo: 200, percentuale: 5 }
      ],
      risparmi: [
        { nome: "Zero riparazioni pareti", anni: "5-25", valore: 1500 },
        { nome: "Nessun rifacimento", anni: "25", valore: 4000 }
      ],
      totaleRisparmio: 5500,
      roiNetto: 1500,
      valoreAggiunto: "Casa più silenziosa, pareti robuste con bambini, sicurezza antincendio"
    }
  }
}
