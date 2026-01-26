"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Layers, Box, TreePine, Hammer, Check } from "lucide-react"
import { InteractiveMaterialCard } from "./InteractiveMaterialCard"

const premiumMaterials = [
  {
    icon: Layers,
    title: "Telaio in BILAM",
    comparison: "Massello → BILAM (2x costo)",
    benefitImmediate: "Stabilità dimensionale assoluta. Zero deformazioni nel tempo.",
    roiTimeline: [
      { year: 0, label: "Subito", value: "Nessuna deformazione, tolleranze perfette" },
      { year: 5, label: "5 anni", value: "Zero manutenzione strutturale" },
      { year: 10, label: "10 anni", value: "Risparmio €3.000 su interventi" },
      { year: 25, label: "25 anni", value: "Struttura integra come nuova" },
    ]
  },
  {
    icon: Box,
    title: "Pannelli 3-strati",
    comparison: "OSB → 3-strati (3x costo)",
    benefitImmediate: "Resistenza meccanica superiore. Nessun rilascio di formaldeide.",
    roiTimeline: [
      { year: 0, label: "Subito", value: "Qualità dell'aria eccellente" },
      { year: 5, label: "5 anni", value: "Nessuna sostituzione pannelli" },
      { year: 10, label: "10 anni", value: "Risparmio €5.000 su rifacimenti" },
      { year: 25, label: "25 anni", value: "Valore immobile +15%" },
    ]
  },
  {
    icon: TreePine,
    title: "Isolamento in Sughero",
    comparison: "Lana di roccia → Sughero (2.5x costo)",
    benefitImmediate: "Comfort termico e acustico superiore. Materiale naturale e traspirante.",
    roiTimeline: [
      { year: 0, label: "Subito", value: "Risparmio 30% su riscaldamento" },
      { year: 5, label: "5 anni", value: "Recupero investimento" },
      { year: 10, label: "10 anni", value: "Risparmio €8.000 su bollette" },
      { year: 25, label: "25 anni", value: "Proprietà isolanti inalterate" },
    ]
  },
  {
    icon: Hammer,
    title: "Finiture in Gesso-Fibra",
    comparison: "Cartongesso → Gesso-fibra (2x costo)",
    benefitImmediate: "Resistenza meccanica e ignifuga. Pareti che non si ammaccano.",
    roiTimeline: [
      { year: 0, label: "Subito", value: "Classe antincendio superiore" },
      { year: 5, label: "5 anni", value: "Zero danni da urti quotidiani" },
      { year: 10, label: "10 anni", value: "Risparmio €2.000 su riparazioni" },
      { year: 25, label: "25 anni", value: "Finiture perfette" },
    ]
  },
]

export default function InvestmentExcellenceSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })

  return (
    <section
      ref={containerRef}
      className="relative py-24 lg:py-32 px-4 bg-gradient-to-b from-[#1E3D30] via-[#152822] to-[#0a1628] overflow-hidden"
    >
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="investment-grid-small" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a3a5c" strokeWidth="0.5" />
            </pattern>
            <pattern id="investment-grid-large" width="100" height="100" patternUnits="userSpaceOnUse">
              <rect width="100" height="100" fill="url(#investment-grid-small)" />
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#1a3a5c" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#investment-grid-large)" />
        </svg>
      </div>

      {/* Animated Glow Orbs */}
      <motion.div
        className="absolute top-[10%] right-[8%] w-[400px] h-[400px] bg-gradient-to-br from-[#C4704B]/20 to-[#C4704B]/5 rounded-full blur-[120px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[15%] left-[5%] w-[350px] h-[350px] bg-gradient-to-tr from-[#4a9eff]/10 to-transparent rounded-full blur-[100px]"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2.5 px-6 py-3 mb-8 bg-white/[0.06] backdrop-blur-md rounded-full border border-white/15"
            whileHover={{ scale: 1.02, borderColor: "rgba(196, 112, 75, 0.3)" }}
          >
            <motion.span
              className="w-2.5 h-2.5 bg-[#C4704B] rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-white/90 text-sm font-semibold tracking-widest uppercase">
              Materiali di Qualità
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Perché Usiamo{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4896A] via-[#E8956B] to-[#D4896A]">
              Materiali Migliori
            </span>
          </h2>

          <p className="text-[#7da0b2] text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed mb-4">
            Costano un po' di più, ma durano molto di più
          </p>

          <p className="text-white/60 text-base lg:text-lg max-w-4xl mx-auto leading-relaxed">
            Le grandi aziende usano materiali economici per abbassare i prezzi.
            Noi usiamo{" "}
            <span className="text-[#C4704B] font-medium">materiali migliori</span>.
            Costano di più all'inizio, ma{" "}
            <span className="text-[#C4704B] font-medium">ti fanno risparmiare</span> negli anni.
          </p>
        </motion.div>

        {/* Subtitle for cards */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Passa il Mouse per Vedere il ROI
          </h3>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#C4704B] to-transparent mx-auto" />
        </motion.div>

        {/* Materials Cards Grid (2x2) */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {premiumMaterials.map((material, index) => (
            <motion.div
              key={material.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
              className="min-h-[320px]"
            >
              <InteractiveMaterialCard {...material} />
            </motion.div>
          ))}
        </div>

        {/* Connections Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="relative bg-gradient-to-br from-[#2D5A47]/30 to-[#1E3D30]/50 rounded-3xl p-8 lg:p-12 border border-white/10"
        >
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#C4704B] to-[#a85a3a] flex items-center justify-center shadow-xl shadow-[#C4704B]/30">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center lg:text-left">
              <h4 className="text-2xl font-bold text-white mb-3">
                Come Fissiamo il Legno
              </h4>
              <p className="text-white/60 leading-relaxed mb-4">
                Usiamo{" "}
                <span className="text-[#C4704B] font-medium">
                  viti in acciaio resistente
                </span>
                , avvitate una per una con calma. Le grandi aziende usano chiodi sparati
                velocemente da macchine automatiche. Noi lavoriamo lentamente per garantire
                che ogni vite tenga perfettamente, anche in caso di terremoto, e che il
                legno non si muova nel tempo.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-white/70 text-sm">Resistente ai terremoti</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-white/70 text-sm">Dura per sempre</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-white/70 text-sm">Il legno resta fermo</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
