"use client"

import { motion } from "framer-motion"
import { LucideIcon, Check } from "lucide-react"
import AnimatedCounter from "@/components/ui/AnimatedCounter"
import PerformanceSparkline from "@/components/charts/PerformanceSparkline"
import { PerformanceTrendPoint } from "@/data/materialsEducationData"

interface MaterialOverviewCardProps {
  icon: LucideIcon
  nome: string
  sottotitolo: string
  benefitPrincipale: string
  percheMigliore: string[]
  color: string
  numeroGigante: number
  numeroLabel: string
  numeroSuffix?: string
  numeroPrefix?: string
  performanceTrend: PerformanceTrendPoint[]
  badge: string
}

function MaterialOverviewCard({
  icon: Icon,
  nome,
  sottotitolo,
  benefitPrincipale,
  percheMigliore,
  color,
  numeroGigante,
  numeroLabel,
  numeroSuffix = "",
  numeroPrefix = "",
  performanceTrend,
  badge
}: MaterialOverviewCardProps) {
  return (
    <motion.div
      className="relative p-8 bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all group"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Icon + Nome */}
      <div className="flex items-center gap-4 mb-6">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-7 h-7" style={{ color }} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">{nome}</h3>
          <p className="text-white/60 text-sm">{sottotitolo}</p>
        </div>
      </div>

      {/* Numero Gigante Animato */}
      <div className="mb-6">
        <AnimatedCounter
          value={numeroGigante}
          prefix={numeroPrefix}
          suffix={numeroSuffix}
          duration={2}
          className="text-6xl font-bold leading-none"
          style={{ color }}
        />
        <p className="text-white/70 text-sm mt-2">{numeroLabel}</p>
      </div>

      {/* Mini Performance Chart */}
      <div className="mb-6 p-4 bg-white/[0.02] rounded-xl border border-white/5">
        <p className="text-white/60 text-xs mb-2">Performance nel tempo</p>
        <PerformanceSparkline
          data={performanceTrend}
          color={color}
          height={60}
        />
      </div>

      {/* Lista benefit (ridotta a 2 max) */}
      <ul className="space-y-3 mb-6">
        {percheMigliore.slice(0, 2).map((benefit, i) => (
          <li key={i} className="flex items-start gap-3">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ backgroundColor: `${color}30` }}
            >
              <Check className="w-3 h-3" style={{ color }} />
            </div>
            <span className="text-white/70 text-sm leading-snug">{benefit}</span>
          </li>
        ))}
      </ul>

      {/* Badge Dinamico */}
      <div className="pt-4 border-t border-white/10">
        <span
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
          style={{
            backgroundColor: `${color}15`,
            color: color
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
          {badge}
        </span>
      </div>

      {/* Glow effect on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-xl"
        style={{ backgroundColor: `${color}20` }}
      />
    </motion.div>
  )
}

interface MaterialOverviewGridProps {
  materials: MaterialOverviewCardProps[]
}

export default function MaterialOverviewGrid({
  materials
}: MaterialOverviewGridProps) {
  return (
    <motion.div
      className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-20"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.8, staggerChildren: 0.1 }}
    >
      {materials.map((material, index) => (
        <motion.div
          key={material.nome}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
        >
          <MaterialOverviewCard {...material} />
        </motion.div>
      ))}
    </motion.div>
  )
}
