"use client"

import { motion, useSpring, useTransform, useInView } from "framer-motion"
import { useRef, useEffect } from "react"
import { Euro, TrendingUp, TrendingDown, Award } from "lucide-react"
import type { CostBreakdownItem, RisparmioItem } from "@/data/materialsEducationData"
import InvestmentDonutChart from "@/components/charts/InvestmentDonutChart"
import SavingsAreaChart from "@/components/charts/SavingsAreaChart"

interface CostBreakdownInfographicProps {
  investimentoExtra: number
  voci: CostBreakdownItem[]
  risparmi: RisparmioItem[]
  totaleRisparmio: number
  roiNetto: number
  valoreAggiunto: string
}

function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 2
}: {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useSpring(0, { duration: duration * 1000, bounce: 0 })
  const isInView = useInView(ref, { once: false, margin: "0px" })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, value, motionValue])

  useEffect(() => {
    const unsubscribe = motionValue.on("change", (latest) => {
      if (ref.current) {
        const formatted =
          value >= 1000
            ? Math.floor(latest).toLocaleString("it-IT")
            : latest.toFixed(0)
        ref.current.textContent = prefix + formatted + suffix
      }
    })
    return unsubscribe
  }, [motionValue, prefix, suffix, value])

  return <span ref={ref}>{prefix}0{suffix}</span>
}

export default function CostBreakdownInfographic({
  investimentoExtra,
  voci,
  risparmi,
  totaleRisparmio,
  roiNetto,
  valoreAggiunto
}: CostBreakdownInfographicProps) {
  const isPositiveROI = roiNetto > 0

  // Generate savings accumulation data for area chart
  const savingsOverTime = Array.from({ length: 6 }, (_, i) => ({
    anno: i * 5,
    savings: Math.round((totaleRisparmio / 25) * (i * 5))
  }))

  return (
    <div className="w-full space-y-10">
      {/* Title */}
      <div className="text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Breakdown: Perché +€{investimentoExtra.toLocaleString("it-IT")}?
        </h3>
        <p className="text-white/60 text-sm md:text-base">
          Dove vanno esattamente i soldi dell'investimento premium
        </p>
      </div>

      {/* Cost Breakdown - Stacked Bars */}
      <motion.div
        className="bg-white/[0.03] backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-[#C4704B]/20 flex items-center justify-center">
            <Euro className="w-5 h-5 text-[#C4704B]" />
          </div>
          <div>
            <div className="text-white font-semibold text-lg">Investimento Extra</div>
            <div className="text-white/60 text-sm">Dettaglio voci di costo</div>
          </div>
        </div>

        <div className="space-y-4">
          {voci.map((voce, index) => (
            <motion.div
              key={voce.nome}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              {/* Label and Amount */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/90 text-sm md:text-base">{voce.nome}</span>
                <span className="text-[#C4704B] font-mono font-semibold text-sm md:text-base">
                  €<AnimatedCounter value={voce.costo} />
                </span>
              </div>

              {/* Progress Bar */}
              <div className="relative h-3 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#C4704B] to-[#D4896A] rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${voce.percentuale}%` }}
                  viewport={{ once: false }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 1, ease: "easeOut" }}
                />
              </div>

              {/* Percentage */}
              <div className="mt-1 text-right">
                <span className="text-[#C4704B]/70 text-xs font-medium">
                  {voce.percentuale}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-white font-semibold text-base md:text-lg">
              Totale Investimento Extra
            </span>
            <span className="text-[#C4704B] font-mono font-bold text-xl md:text-2xl">
              €<AnimatedCounter value={investimentoExtra} />
            </span>
          </div>
        </div>

        {/* Donut Chart Visualization */}
        <div className="mt-8 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <InvestmentDonutChart data={voci} />
          </motion.div>
        </div>
      </motion.div>

      {/* Savings Over 25 Years */}
      <motion.div
        className="bg-white/[0.03] backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
            <TrendingDown className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <div className="text-white font-semibold text-lg">Risparmio 25 Anni</div>
            <div className="text-white/60 text-sm">Costi evitati nel tempo</div>
          </div>
        </div>

        <div className="space-y-4">
          {risparmi.map((risparmio, index) => (
            <motion.div
              key={risparmio.nome}
              className="p-4 bg-green-500/5 rounded-xl border border-green-500/10"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="text-white/90 text-sm md:text-base font-medium mb-1">
                    {risparmio.nome}
                  </div>
                  <div className="text-green-400/60 text-xs">
                    Anni {risparmio.anni}
                  </div>
                </div>
                <div className="text-green-400 font-mono font-bold text-base md:text-lg">
                  +€<AnimatedCounter value={risparmio.valore} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Total Savings */}
        <div className="mt-6 pt-6 border-t border-green-500/20">
          <div className="flex items-center justify-between">
            <span className="text-white font-semibold text-base md:text-lg">
              Totale Risparmi
            </span>
            <span className="text-green-400 font-mono font-bold text-xl md:text-2xl">
              +€<AnimatedCounter value={totaleRisparmio} />
            </span>
          </div>
        </div>

        {/* Area Chart - Savings Accumulation */}
        <div className="mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-white/70 text-sm font-medium mb-4 text-center">
              Accumulo Risparmio nel Tempo
            </h4>
            <SavingsAreaChart data={savingsOverTime} height={250} />
          </motion.div>
        </div>
      </motion.div>

      {/* ROI Summary */}
      <motion.div
        className={`bg-gradient-to-br ${
          isPositiveROI
            ? 'from-green-500/10 to-green-500/5 border-green-500/30'
            : 'from-orange-500/10 to-orange-500/5 border-orange-500/30'
        } rounded-2xl p-6 md:p-8 border`}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-12 h-12 rounded-full ${
            isPositiveROI ? 'bg-green-500/20' : 'bg-orange-500/20'
          } flex items-center justify-center`}>
            {isPositiveROI ? (
              <TrendingUp className="w-6 h-6 text-green-400" strokeWidth={2.5} />
            ) : (
              <Award className="w-6 h-6 text-orange-400" strokeWidth={2.5} />
            )}
          </div>
          <div>
            <div className="text-white font-bold text-xl md:text-2xl">ROI Netto 25 Anni</div>
            <div className="text-white/60 text-sm">Investimento - Risparmi</div>
          </div>
        </div>

        {/* ROI Value */}
        <div className="text-center py-6">
          <div className={`text-5xl md:text-6xl font-black ${
            isPositiveROI ? 'text-green-400' : 'text-orange-400'
          } mb-2`}>
            {isPositiveROI ? '+' : ''}€<AnimatedCounter value={Math.abs(roiNetto)} />
          </div>
          <div className="text-white/70 text-base md:text-lg">
            {isPositiveROI
              ? 'Guadagno netto dopo 25 anni'
              : 'Investimento netto (senza considerare valore immobile)'}
          </div>
        </div>

        {/* Added Value */}
        {valoreAggiunto && (
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 text-[#C4704B] flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-white/90 font-medium mb-1">Valore Aggiunto</div>
                <p className="text-white/70 text-sm leading-relaxed">
                  {valoreAggiunto}
                </p>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
