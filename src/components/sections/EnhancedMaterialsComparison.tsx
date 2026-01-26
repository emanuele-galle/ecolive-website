"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Sparkles, Filter } from "lucide-react"
import MaterialFlipCard from "./MaterialFlipCard"
import LifetimeCostCalculator from "./LifetimeCostCalculator"

// Dati materiali con ROI dettagliato
const materialsData = [
  {
    id: "telaio",
    component: "Telaio Strutturale",
    category: "struttura",
    ecolive: {
      name: "BiLam (Lamellare)",
      features: [
        "Stabilità dimensionale assoluta",
        "Nessuna deformazione nel tempo",
        "Certificazioni strutturali complete",
        "Nodi critici eliminati",
      ],
    },
    standard: {
      name: "Massello",
      issues: [
        "Soggetto a deformazioni",
        "Nodi naturali = punti deboli",
        "Variazioni con umidità",
      ],
    },
    costMultiplier: "2x",
    roi: {
      year5: "Nessun intervento strutturale necessario",
      year10: "Risparmio €3.500 su riparazioni",
      year25: "Struttura integra come al giorno 1",
    },
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    id: "pannelli",
    component: "Pannelli Parete",
    category: "struttura",
    ecolive: {
      name: "3 Strati Lamellare",
      features: [
        "Copertura full-size (no giunzioni)",
        "Resistenza strutturale superiore",
        "Zero problemi umidità",
        "Qualità certificata",
      ],
    },
    standard: {
      name: "OSB",
      issues: [
        "Scarti di lavorazione compressi",
        "Instabile con umidità",
        "Giunzioni multiple necessarie",
      ],
    },
    costMultiplier: "3x",
    roi: {
      year5: "Nessuna sostituzione pannelli",
      year10: "Risparmio €5.000 su rifacimento",
      year25: "Valore immobile +15% per qualità",
    },
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    id: "cappotto",
    component: "Isolamento Esterno",
    category: "isolamento",
    ecolive: {
      name: "Sughero Alta Densità 30mm",
      features: [
        "100% naturale e rinnovabile",
        "Corteccia che ricresce",
        "Spessore ridotto, stesse performance",
        "Zero derivati petrolio",
      ],
    },
    standard: {
      name: "Polistirolo (EPS)",
      issues: [
        "Derivato del petrolio",
        "Non rinnovabile",
        "Spessori maggiori necessari",
      ],
    },
    costMultiplier: "2.5x",
    roi: {
      year5: "Risparmio 30% su bollette energetiche",
      year10: "Recupero totale investimento iniziale",
      year25: "Proprietà isolanti inalterate, risparmio €12.000",
    },
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    id: "interno",
    component: "Rivestimento Interno",
    category: "finiture",
    ecolive: {
      name: "Gesso Fibra Ceramizzato 25mm",
      features: [
        "Accumulo termico superiore",
        "Resistenza urti eccezionale",
        "Insonorizzazione ottimale",
        "Doppio spessore standard",
      ],
    },
    standard: {
      name: "Cartongesso 12mm",
      issues: [
        "Fragile agli urti",
        "Minimo accumulo termico",
        "Spessore ridotto",
      ],
    },
    costMultiplier: "2x",
    roi: {
      year5: "Zero danni da urti quotidiani",
      year10: "Risparmio €2.500 su riparazioni pareti",
      year25: "Finiture perfette senza ritocchi",
    },
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    id: "connessioni",
    component: "Sistema Connessioni",
    category: "struttura",
    ecolive: {
      name: "Viti Acciaio Carbonio Avvitate",
      features: [
        "Tenuta sismica garantita",
        "Nessun rifollamento nel tempo",
        "Precisione millimetrica",
        "Smontaggio possibile",
      ],
    },
    standard: {
      name: "Chiodi Sparati",
      issues: [
        "Rifollamento progressivo",
        "Minor resistenza sismica",
        "Assemblaggio irreversibile",
      ],
    },
    costMultiplier: "1.8x",
    roi: {
      year5: "Stabilità strutturale garantita",
      year10: "Zero interventi su connessioni",
      year25: "Tenuta perfetta come al giorno 1",
    },
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

const categories = [
  { id: "all", label: "Tutti i Materiali" },
  { id: "struttura", label: "Struttura" },
  { id: "isolamento", label: "Isolamento" },
  { id: "finiture", label: "Finiture" },
]

export default function EnhancedMaterialsComparison() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredMaterials = activeCategory === "all"
    ? materialsData
    : materialsData.filter(m => m.category === activeCategory)

  return (
    <>
      <section
        ref={containerRef}
        className="relative py-20 lg:py-28 px-4 bg-gradient-to-b from-[#152822] via-[#1E3D30] to-[#1a2c26] overflow-hidden"
      >
        {/* Background patterns */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />
          <div className="absolute top-20 right-10 w-80 h-80 bg-[#C4704B]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-40 left-10 w-96 h-96 bg-white/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-[#C4704B]" />
              <span className="text-white/90 text-xs sm:text-sm font-medium uppercase tracking-wider">
                Confronto Interattivo
              </span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              Perché costa <span className="text-[#C4704B]">di più</span>
            </h2>

            <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Tocca le cards per vedere il guadagno reale. I materiali migliori ti fanno risparmiare nel tempo.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            className="flex justify-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <div className="inline-flex bg-white/5 backdrop-blur-md rounded-2xl p-2 gap-2 border border-white/10">
              <div className="flex items-center gap-2 px-3 text-white/60">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">Filtra:</span>
              </div>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`
                    px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300
                    ${
                      activeCategory === cat.id
                        ? "bg-[#C4704B] text-white shadow-lg shadow-[#C4704B]/30"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }
                  `}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Material Cards Grid */}
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-2">
            {filteredMaterials.map((material, index) => (
              <MaterialFlipCard
                key={material.id}
                material={material}
                index={index}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            <p className="text-white/60 text-sm mb-4">
              <span className="text-[#C4704B] font-semibold">💡 Suggerimento:</span> Tocca le cards per vedere il risparmio reale nel tempo
            </p>
          </motion.div>
        </div>
      </section>

      {/* Lifetime Cost Calculator Section */}
      <LifetimeCostCalculator />
    </>
  )
}
