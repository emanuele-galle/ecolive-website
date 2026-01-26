"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { TrendingUp } from "lucide-react"
import MaterialExplainerSection from "./MaterialExplainerSection"
import HeroComparisonCards from "./HeroComparisonCards"
import MaterialTabs from "./MaterialTabs"
import { materialsEducationData } from "@/data/materialsEducationData"

export default function WhyCostMoreSection() {
  const [selectedMaterial, setSelectedMaterial] = useState<string>("telaio")

  const materialsList = Object.values(materialsEducationData)
  const currentMaterial = materialsEducationData[selectedMaterial]

  // Calculate totals
  const totalExtraCost = materialsList.reduce((sum, m) => sum + m.breakdown.costoAggiuntivo, 0)
  const totalSavings = materialsList.reduce((sum, m) => sum + m.breakdown.totaleRisparmio, 0)
  const totalSavingsNet = totalSavings - totalExtraCost

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

        {/* Hero Comparison Cards - Premium Version */}
        <HeroComparisonCards />

        {/* Material Tabs - Premium Version with Sparklines */}
        <MaterialTabs
          activeId={selectedMaterial}
          onSelect={setSelectedMaterial}
        />

        {/* Material Deep Dive */}
        <motion.div
          key={selectedMaterial}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <MaterialExplainerSection material={currentMaterial} />
        </motion.div>

        {/* Total Investment Summary */}
        <motion.div
          className="mt-20 p-8 lg:p-12 bg-gradient-to-br from-[#C4704B]/20 to-[#C4704B]/5 rounded-2xl border border-[#C4704B]/30"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-[#C4704B]" />
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Investimento Totale
              </h3>
            </div>
            <p className="text-white/70 max-w-2xl mx-auto">
              Somma di tutti e 4 i materiali premium vs risparmio reale in 25 anni
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* Investimento */}
            <div className="p-6 bg-white/[0.05] rounded-xl border border-white/10 text-center">
              <div className="text-white/60 text-sm mb-2 uppercase tracking-wide">
                Costo Aggiuntivo
              </div>
              <div className="text-[#C4704B] font-bold text-3xl lg:text-4xl mb-1">
                €{totalExtraCost.toLocaleString("it-IT")}
              </div>
              <div className="text-white/50 text-xs">
                4 materiali migliori
              </div>
            </div>

            {/* Risparmio */}
            <div className="p-6 bg-white/[0.05] rounded-xl border border-white/10 text-center">
              <div className="text-white/60 text-sm mb-2 uppercase tracking-wide">
                Risparmio 25 Anni
              </div>
              <div className="text-green-400 font-bold text-3xl lg:text-4xl mb-1">
                +€{totalSavings.toLocaleString("it-IT")}
              </div>
              <div className="text-white/50 text-xs">
                Costi evitati
              </div>
            </div>

            {/* ROI */}
            <div className={`p-6 bg-white/[0.05] rounded-xl border ${
              totalSavingsNet > 0 ? 'border-green-500/30' : 'border-orange-500/30'
            } text-center`}>
              <div className="text-white/60 text-sm mb-2 uppercase tracking-wide">
                Guadagno Netto
              </div>
              <div className={`font-bold text-3xl lg:text-4xl mb-1 ${
                totalSavingsNet > 0 ? 'text-green-400' : 'text-orange-400'
              }`}>
                {totalSavingsNet > 0 ? '+' : ''}€{totalSavingsNet.toLocaleString("it-IT")}
              </div>
              <div className="text-white/50 text-xs">
                {totalSavingsNet > 0 ? 'Risparmio netto' : 'Senza valore immobile'}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
              💡 <strong className="text-white">Nota:</strong> Questi numeri non considerano l'aumento di valore
              dell'immobile (stimato +10-15%) e il comfort quotidiano per decenni. Il vero guadagno è
              incalcolabile: <span className="text-[#C4704B] font-semibold">zero stress, zero problemi, zero sorprese</span>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
