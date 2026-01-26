"use client"

import { motion } from "framer-motion"
import ComparisonTable from "./ComparisonTable"
import DegradationTimeline from "./DegradationTimeline"
import CostBreakdownInfographic from "./CostBreakdownInfographic"
import type { MaterialEducationData } from "@/data/materialsEducationData"

interface MaterialExplainerSectionProps {
  material: MaterialEducationData
}

export default function MaterialExplainerSection({ material }: MaterialExplainerSectionProps) {
  const Icon = material.icon

  return (
    <div className="w-full space-y-16 md:space-y-20">
      {/* Material Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-[#C4704B] to-[#A85A3A]">
          <Icon className="w-10 h-10 text-white" strokeWidth={1.5} />
        </div>
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          {material.nome}
        </h3>
        <p className="text-xl md:text-2xl text-white/70 font-light">
          {material.sottotitolo}
        </p>
      </motion.div>

      {/* Section A: Cos'è e come è fatto */}
      <motion.div
        className="bg-white/[0.03] backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-6">
          <h4 className="text-2xl md:text-3xl font-bold text-white mb-4">
            🔍 Cos'è e come è fatto
          </h4>
          <p className="text-white/80 text-base md:text-lg leading-relaxed">
            {material.cosE.descrizione}
          </p>
        </div>

        {/* Processo Produttivo - Steps */}
        <div>
          <div className="text-white/60 font-semibold text-sm uppercase tracking-wider mb-4">
            Processo Produttivo
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {material.cosE.processo.map((step, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3 p-4 bg-white/[0.02] rounded-xl border border-white/5"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C4704B]/20 flex items-center justify-center">
                  <span className="text-[#C4704B] font-bold text-sm">{index + 1}</span>
                </div>
                <p className="text-white/80 text-sm md:text-base leading-relaxed flex-1">
                  {step}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Section B: Comparison Table */}
      <ComparisonTable specs={material.specs} />

      {/* Section C: Degradation Timeline */}
      <DegradationTimeline timeline={material.timeline} />

      {/* Section D: Cost Breakdown */}
      <CostBreakdownInfographic
        costoAggiuntivo={material.breakdown.costoAggiuntivo}
        voci={material.breakdown.voci}
        risparmi={material.breakdown.risparmi}
        totaleRisparmio={material.breakdown.totaleRisparmio}
        guadagnoNetto={material.breakdown.guadagnoNetto}
        valoreAggiunto={material.breakdown.valoreAggiunto}
      />
    </div>
  )
}
