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
      descrizione: "Legno lamellare stratificato con fibre incrociate. Le tavole vengono incollate sotto pressione creando un materiale più stabile del massello.",
      processo: [
        "Selezione tavole classe A (zero nodi critici)",
        "Essiccazione controllata al 12% umidità",
        "Incollaggio con colle certificate classe D4",
        "Pressatura 8 bar per 24h",
        "Controllo ultrasuoni per difetti interni",
        "Certificazione CE secondo EN 14080"
      ]
    },

    specs: [
      {
        metrica: "Stabilità dimensionale",
        standard: {
          valore: "±3-5mm variazione",
          problemi: "Deformazioni con umidità, ritiri stagionali"
        },
        ecolive: {
          valore: "±0.2mm tolleranza",
          benefici: "Stabilità assoluta, zero deformazioni"
        }
      },
      {
        metrica: "Resistenza flessionale",
        standard: {
          valore: "18 N/mm²",
          problemi: "Nodi riducono resistenza 30-40%"
        },
        ecolive: {
          valore: "28 N/mm²",
          benefici: "Nodi eliminati, fibre incrociate"
        }
      },
      {
        metrica: "Contenuto umidità",
        standard: {
          valore: "8-18% variabile",
          problemi: "Influisce su stabilità e durabilità"
        },
        ecolive: {
          valore: "12% controllato",
          benefici: "Costante in ogni condizione climatica"
        }
      },
      {
        metrica: "Garanzia strutturale",
        standard: {
          valore: "2 anni",
          problemi: "Dopo garanzia: problemi a carico cliente"
        },
        ecolive: {
          valore: "30 anni",
          benefici: "Tranquillità a lungo termine"
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
      descrizione: "Pannelli in legno lamellare a 3 strati incrociati. Ogni strato è orientato perpendicolarmente agli altri per massima stabilità.",
      processo: [
        "Selezione legno abete classe A/B",
        "Stratificazione 3 strati incrociati 90°",
        "Pressatura continua 12 bar",
        "Taglio dimensionale CNC",
        "Controllo emissioni formaldeide (E1)",
        "Test resistenza meccanica"
      ]
    },

    specs: [
      {
        metrica: "Resistenza meccanica",
        standard: {
          valore: "2.8 kN/m²",
          problemi: "Scollamenti dopo 7-10 anni"
        },
        ecolive: {
          valore: "4.5 kN/m²",
          benefici: "Struttura monolitica, nessun scollamento"
        }
      },
      {
        metrica: "Emissioni formaldeide",
        standard: {
          valore: "E2 (0.12 mg/m³)",
          problemi: "Limiti legali ma non salutari"
        },
        ecolive: {
          valore: "E0 (0.03 mg/m³)",
          benefici: "Praticamente zero emissioni"
        }
      },
      {
        metrica: "Stabilità dimensionale",
        standard: {
          valore: "±8mm ogni 2m",
          problemi: "Gonfiamenti con umidità"
        },
        ecolive: {
          valore: "±1mm ogni 2m",
          benefici: "Fibre incrociate compensano"
        }
      },
      {
        metrica: "Durata stimata",
        standard: {
          valore: "10-12 anni",
          problemi: "Degradazione irreversibile"
        },
        ecolive: {
          valore: "50+ anni",
          benefici: "Materiale strutturale permanente"
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
      descrizione: "Pannelli di sughero naturale espanso. La corteccia della quercia da sughero viene granulata, pressata e cotta al vapore senza collanti artificiali.",
      processo: [
        "Estrazione corteccia quercia (rinnovabile ogni 9 anni)",
        "Stagionatura naturale 6 mesi",
        "Granulazione meccanica",
        "Pressatura vapore 350°C (resine naturali)",
        "Taglio dimensionale",
        "Certificazione ANAB-IBR (bioedilizia)"
      ]
    },

    specs: [
      {
        metrica: "Lambda termico",
        standard: {
          valore: "0.038 W/mK",
          problemi: "Degrada con UV, perde efficacia"
        },
        ecolive: {
          valore: "0.040 W/mK",
          benefici: "Stabile per decenni, traspirante"
        }
      },
      {
        metrica: "Densità",
        standard: {
          valore: "15-20 kg/m³",
          problemi: "Leggero, zero inerzia termica"
        },
        ecolive: {
          valore: "110-120 kg/m³",
          benefici: "Elevata inerzia, accumulo termico"
        }
      },
      {
        metrica: "Rinnovabilità",
        standard: {
          valore: "Derivato petrolio",
          problemi: "Non rinnovabile, CO₂ alta"
        },
        ecolive: {
          valore: "100% naturale",
          benefici: "Carbon negative, rigenerabile"
        }
      },
      {
        metrica: "Durata isolamento",
        standard: {
          valore: "15-20 anni",
          problemi: "Degrado UV, assestamento"
        },
        ecolive: {
          valore: "100+ anni",
          benefici: "Stabile, nessun degrado"
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
      descrizione: "Pannelli di gesso naturale rinforzato con fibre di cellulosa. L'impasto viene pressato e essiccato senza collanti chimici.",
      processo: [
        "Impasto gesso naturale + fibre cellulosa",
        "Pressatura continua 18 bar",
        "Essiccazione controllata 48h",
        "Controllo planarità (±0.5mm)",
        "Test resistenza urti",
        "Certificazione ignifugo classe A1"
      ]
    },

    specs: [
      {
        metrica: "Resistenza urti",
        standard: {
          valore: "0.5 kN (fragile)",
          problemi: "Ammaccature facili, buchi con colpi"
        },
        ecolive: {
          valore: "1.8 kN (robusto)",
          benefici: "Resistente a urti quotidiani"
        }
      },
      {
        metrica: "Accumulo termico",
        standard: {
          valore: "6 Wh/mK (basso)",
          problemi: "Nessuna inerzia, sbalzi temperatura"
        },
        ecolive: {
          valore: "18 Wh/mK (elevato)",
          benefici: "Stabilizza temperatura, comfort"
        }
      },
      {
        metrica: "Spessore",
        standard: {
          valore: "12mm (sottile)",
          problemi: "Flessibile, trasmette rumori"
        },
        ecolive: {
          valore: "25mm (doppio)",
          benefici: "Rigido, isolamento acustico"
        }
      },
      {
        metrica: "Classe ignifugo",
        standard: {
          valore: "A2 (combustibile)",
          problemi: "Rilascia fumi in caso incendio"
        },
        ecolive: {
          valore: "A1 (incombustibile)",
          benefici: "Zero propagazione fiamma"
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
