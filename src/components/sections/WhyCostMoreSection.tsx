"use client"

import { motion } from "framer-motion"
import { Layers, Grid3x3, Snowflake, Home } from "lucide-react"
import HeroComparisonCards from "./HeroComparisonCards"
import PerformanceEvolutionSection from "./PerformanceEvolutionSection"
import MaterialOverviewGrid from "./MaterialOverviewGrid"
import WhyItMattersSection from "./WhyItMattersSection"
import { materialsEducationData } from "@/data/materialsEducationData"

export default function WhyCostMoreSection() {
  // Prepara dati per MaterialOverviewGrid
  const materialsOverview = [
    {
      icon: Layers,
      nome: "Telaio Strutturale",
      sottotitolo: "BiLam Lamellare",
      benefitPrincipale: materialsEducationData.telaio.descrizioneBreve,
      percheMigliore: materialsEducationData.telaio.benefitPrincipali,
      color: materialsEducationData.telaio.color,
      numeroGigante: 30,
      numeroLabel: "Anni di garanzia",
      numeroSuffix: "",
      numeroPrefix: "",
      performanceTrend: materialsEducationData.telaio.performanceTrend,
      badge: "Zero deformazioni"
    },
    {
      icon: Grid3x3,
      nome: "Pannelli Parete",
      sottotitolo: "3-Strati Premium",
      benefitPrincipale: materialsEducationData.pannelli.descrizioneBreve,
      percheMigliore: materialsEducationData.pannelli.benefitPrincipali,
      color: materialsEducationData.pannelli.color,
      numeroGigante: 50,
      numeroLabel: "Anni di durata",
      numeroSuffix: "+",
      numeroPrefix: "",
      performanceTrend: materialsEducationData.pannelli.performanceTrend,
      badge: "Aria 100% pulita"
    },
    {
      icon: Snowflake,
      nome: "Isolamento",
      sottotitolo: "Sughero Naturale",
      benefitPrincipale: materialsEducationData.sughero.descrizioneBreve,
      percheMigliore: materialsEducationData.sughero.benefitPrincipali,
      color: materialsEducationData.sughero.color,
      numeroGigante: 18000,
      numeroLabel: "Risparmio netto 25 anni",
      numeroSuffix: "",
      numeroPrefix: "€",
      performanceTrend: materialsEducationData.sughero.performanceTrend,
      badge: "Bollette -30%"
    },
    {
      icon: Home,
      nome: "Rivestimenti",
      sottotitolo: "Gesso-Fibra",
      benefitPrincipale: materialsEducationData.gesso.descrizioneBreve,
      percheMigliore: materialsEducationData.gesso.benefitPrincipali,
      color: materialsEducationData.gesso.color,
      numeroGigante: 2,
      numeroLabel: "Volte più spesso",
      numeroSuffix: "x",
      numeroPrefix: "",
      performanceTrend: materialsEducationData.gesso.performanceTrend,
      badge: "Antincendio A1"
    }
  ]

  return (
    <section className="relative py-20 lg:py-28 px-4 bg-gradient-to-b from-[#0a1628] via-[#0f2040] to-[#152822] overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cost-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1a3a5c" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cost-grid)"/>
        </svg>
      </div>

      {/* Animated Glow */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C4704B]/15 rounded-full blur-[150px]"
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Header */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.9 }}
        >
          <motion.div
            className="inline-flex items-center gap-2.5 px-6 py-3 mb-8 bg-white/[0.06] backdrop-blur-md rounded-full border border-white/15"
          >
            <motion.span
              className="w-2.5 h-2.5 bg-[#C4704B] rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-white/90 text-sm font-semibold tracking-widest uppercase">
              Prezzi Chiari
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Perché Costa di Più{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4896A] to-[#E8956B]">
              (e perché conviene)
            </span>
          </h2>

          <p className="text-[#7da0b2] text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            4 materiali migliori che fanno durare la tua casa 100 anni invece di 30.
          </p>
        </motion.div>

        {/* Hero Comparison Cards - già OK */}
        <HeroComparisonCards />

        {/* NUOVO: Performance Evolution Timeline */}
        <PerformanceEvolutionSection />

        {/* NUOVO: Material Overview Grid (sostituisce MaterialTabs) */}
        <MaterialOverviewGrid materials={materialsOverview} />

        {/* NUOVO: Why It Matters (sostituisce Total Investment Summary) */}
        <WhyItMattersSection />
      </div>
    </section>
  )
}
