'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Check, X, Minus } from 'lucide-react'

interface ComparisonItem {
  feature: string
  xframe: 'full' | 'partial' | 'none'
  xlam: 'full' | 'partial' | 'none'
  platformFrame: 'full' | 'partial' | 'none'
  cement: 'full' | 'partial' | 'none'
}

const comparisonData: ComparisonItem[] = [
  {
    feature: 'Resistenza antisismica zona 1',
    xframe: 'full',
    xlam: 'full',
    platformFrame: 'partial',
    cement: 'partial',
  },
  {
    feature: 'Isolamento termico Passive House',
    xframe: 'full',
    xlam: 'partial',
    platformFrame: 'full',
    cement: 'none',
  },
  {
    feature: 'Velocita costruzione (< 60 gg)',
    xframe: 'full',
    xlam: 'full',
    platformFrame: 'full',
    cement: 'none',
  },
  {
    feature: 'Flessibilita progettuale',
    xframe: 'full',
    xlam: 'partial',
    platformFrame: 'full',
    cement: 'full',
  },
  {
    feature: 'Costo contenuto',
    xframe: 'full',
    xlam: 'partial',
    platformFrame: 'full',
    cement: 'partial',
  },
  {
    feature: 'Durabilita strutturale 100+ anni',
    xframe: 'full',
    xlam: 'full',
    platformFrame: 'partial',
    cement: 'full',
  },
  {
    feature: 'Sostenibilita CO2 negativo',
    xframe: 'full',
    xlam: 'full',
    platformFrame: 'full',
    cement: 'none',
  },
  {
    feature: 'Impiantistica integrata',
    xframe: 'full',
    xlam: 'none',
    platformFrame: 'full',
    cement: 'partial',
  },
  {
    feature: 'Resistenza al fuoco REI 60+',
    xframe: 'full',
    xlam: 'full',
    platformFrame: 'partial',
    cement: 'full',
  },
  {
    feature: 'Produzione industrializzata',
    xframe: 'full',
    xlam: 'full',
    platformFrame: 'partial',
    cement: 'none',
  },
]

// Animated Status Icon Component
const StatusIcon = ({ status, darkTheme = false, isXFrame = false }: { status: 'full' | 'partial' | 'none', darkTheme?: boolean, isXFrame?: boolean }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'full':
        return {
          bg: darkTheme ? 'bg-emerald-500/20' : 'bg-green-100',
          border: darkTheme ? 'border-emerald-500/40' : 'border-green-300',
          glow: 'group-hover:bg-emerald-500/30',
          iconColor: darkTheme ? 'text-emerald-400' : 'text-green-600',
          Icon: Check,
        }
      case 'partial':
        return {
          bg: darkTheme ? 'bg-amber-500/20' : 'bg-amber-100',
          border: darkTheme ? 'border-amber-500/40' : 'border-amber-300',
          glow: 'group-hover:bg-amber-500/30',
          iconColor: darkTheme ? 'text-amber-400' : 'text-amber-600',
          Icon: Minus,
        }
      case 'none':
        return {
          bg: darkTheme ? 'bg-red-500/20' : 'bg-red-100',
          border: darkTheme ? 'border-red-500/40' : 'border-red-300',
          glow: 'group-hover:bg-red-500/30',
          iconColor: darkTheme ? 'text-red-400' : 'text-red-500',
          Icon: X,
        }
    }
  }

  const config = getStatusConfig()
  const Icon = config.Icon

  if (darkTheme) {
    return (
      <motion.div
        className="relative group/icon"
        whileHover={{ scale: 1.2, rotate: status === 'full' ? 5 : -5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {/* Glow ring */}
        <div className={`absolute -inset-1.5 ${config.bg} rounded-full blur-md opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300`} />

        {/* Icon container */}
        <div className={`relative w-8 h-8 rounded-full flex items-center justify-center ${config.bg} border ${config.border} transition-all duration-300 ${isXFrame ? 'group-hover/icon:shadow-[0_0_12px_rgba(196,112,75,0.4)]' : ''}`}>
          <Icon className={`w-4 h-4 ${config.iconColor}`} />
        </div>
      </motion.div>
    )
  }

  // Light theme
  return (
    <div className={`w-7 h-7 rounded-full flex items-center justify-center ${config.bg}`}>
      <Icon className={`w-4 h-4 ${config.iconColor}`} />
    </div>
  )
}

interface XFrameComparisonProps {
  embedded?: boolean
  darkTheme?: boolean
}

export default function XFrameComparison({ embedded = false, darkTheme = false }: XFrameComparisonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })

  const content = darkTheme ? (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="overflow-x-auto rounded-2xl border border-[#1a3a5c]/60 bg-gradient-to-br from-[#0f2040]/60 to-[#0a1628]/60 backdrop-blur-md shadow-xl"
      >
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="bg-gradient-to-r from-[#0f2040]/80 via-[#1a3a5c]/50 to-[#0f2040]/80 border-b-2 border-[#C4704B]/30">
              <th className="text-left p-5 font-bold text-white tracking-wide">
                Caratteristica
              </th>
              <th className="text-center p-5 relative">
                {/* XFrame header glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#C4704B]/20 to-transparent" />
                <div className="relative flex flex-col items-center">
                  <span className="font-bold text-[#E8956B] text-lg">X-Frame</span>
                  <span className="text-xs font-normal text-[#C4704B]/80">Ecolive</span>
                </div>
              </th>
              <th className="text-center p-5 font-semibold text-white">
                <div className="flex flex-col items-center">
                  <span>X-Lam (CLT)</span>
                  <span className="text-xs font-normal text-[#6b8e9f]">Pannelli massicci</span>
                </div>
              </th>
              <th className="text-center p-5 font-semibold text-white">
                <div className="flex flex-col items-center">
                  <span>Platform Frame</span>
                  <span className="text-xs font-normal text-[#6b8e9f]">Telaio leggero</span>
                </div>
              </th>
              <th className="text-center p-5 font-semibold text-white">
                <div className="flex flex-col items-center">
                  <span>Cemento Armato</span>
                  <span className="text-xs font-normal text-[#6b8e9f]">Tradizionale</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.1 + index * 0.05 }}
                className="group border-t border-[#1a3a5c]/50 hover:bg-white/[0.04] transition-all duration-300 relative"
              >
                {/* Left accent bar on hover */}
                <td className="p-5 text-white/80 group-hover:text-white transition-colors relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#C4704B] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-r" />
                  <span className="pl-2">{row.feature}</span>
                </td>
                <td className="p-5 relative">
                  {/* XFrame column highlight */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#C4704B]/10 to-[#C4704B]/5 group-hover:from-[#C4704B]/20 group-hover:to-[#C4704B]/10 transition-all duration-300" />
                  <div className="relative flex justify-center">
                    <StatusIcon status={row.xframe} darkTheme isXFrame />
                  </div>
                </td>
                <td className="p-5">
                  <div className="flex justify-center">
                    <StatusIcon status={row.xlam} darkTheme />
                  </div>
                </td>
                <td className="p-5">
                  <div className="flex justify-center">
                    <StatusIcon status={row.platformFrame} darkTheme />
                  </div>
                </td>
                <td className="p-5">
                  <div className="flex justify-center">
                    <StatusIcon status={row.cement} darkTheme />
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Legend - Premium Style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-8 flex flex-wrap justify-center gap-6 lg:gap-10"
      >
        {[
          { status: 'full', label: 'Eccellente', bg: 'bg-emerald-500/20', border: 'border-emerald-500/40', iconColor: 'text-emerald-400', Icon: Check },
          { status: 'partial', label: 'Parziale', bg: 'bg-amber-500/20', border: 'border-amber-500/40', iconColor: 'text-amber-400', Icon: Minus },
          { status: 'none', label: 'Limitato/Assente', bg: 'bg-red-500/20', border: 'border-red-500/40', iconColor: 'text-red-400', Icon: X },
        ].map((item) => (
          <div key={item.status} className="flex items-center gap-2.5 px-4 py-2 bg-white/[0.03] rounded-full border border-white/10">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${item.bg} border ${item.border}`}>
              <item.Icon className={`w-3.5 h-3.5 ${item.iconColor}`} />
            </div>
            <span className="text-[#6b8e9f] text-sm">{item.label}</span>
          </div>
        ))}
      </motion.div>
    </>
  ) : (
    // Light theme (original)
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="overflow-x-auto rounded-2xl border border-[#DDD5C9] bg-white"
      >
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="bg-[#FAF7F2]">
              <th className="text-left p-5 font-semibold text-[#2C2825]">Caratteristica</th>
              <th className="text-center p-5 font-bold text-[#C4704B] bg-[#C4704B]/5">
                <div className="flex flex-col items-center">
                  <span>X-Frame</span>
                  <span className="text-xs font-normal text-[#6B6560]">Ecolive</span>
                </div>
              </th>
              <th className="text-center p-5 font-semibold text-[#2C2825]">
                <div className="flex flex-col items-center">
                  <span>X-Lam (CLT)</span>
                  <span className="text-xs font-normal text-[#6B6560]">Pannelli massicci</span>
                </div>
              </th>
              <th className="text-center p-5 font-semibold text-[#2C2825]">
                <div className="flex flex-col items-center">
                  <span>Platform Frame</span>
                  <span className="text-xs font-normal text-[#6B6560]">Telaio leggero</span>
                </div>
              </th>
              <th className="text-center p-5 font-semibold text-[#2C2825]">
                <div className="flex flex-col items-center">
                  <span>Cemento Armato</span>
                  <span className="text-xs font-normal text-[#6B6560]">Tradizionale</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row, index) => (
              <tr key={index} className="border-t border-[#DDD5C9] hover:bg-[#FAF7F2]/50 transition-colors">
                <td className="p-5 text-[#2C2825]">{row.feature}</td>
                <td className="p-5 bg-[#C4704B]/5">
                  <div className="flex justify-center">
                    <StatusIcon status={row.xframe} />
                  </div>
                </td>
                <td className="p-5">
                  <div className="flex justify-center">
                    <StatusIcon status={row.xlam} />
                  </div>
                </td>
                <td className="p-5">
                  <div className="flex justify-center">
                    <StatusIcon status={row.platformFrame} />
                  </div>
                </td>
                <td className="p-5">
                  <div className="flex justify-center">
                    <StatusIcon status={row.cement} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Legend */}
      <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full flex items-center justify-center bg-green-100">
            <Check className="w-3.5 h-3.5 text-green-600" />
          </div>
          <span className="text-[#6B6560]">Eccellente</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full flex items-center justify-center bg-amber-100">
            <Minus className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <span className="text-[#6B6560]">Parziale</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full flex items-center justify-center bg-red-100">
            <X className="w-3.5 h-3.5 text-red-500" />
          </div>
          <span className="text-[#6B6560]">Limitato/Assente</span>
        </div>
      </div>
    </>
  )

  if (embedded) {
    return <div ref={ref}>{content}</div>
  }

  return (
    <section ref={ref} className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#C4704B] font-semibold text-sm uppercase tracking-wider">
            Confronto Tecnologie
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C2825] mt-2 mb-4">
            X-Frame vs Altri Sistemi
          </h2>
          <p className="text-[#6B6560] text-lg max-w-2xl mx-auto">
            Scopri perche X-Frame rappresenta l'evoluzione dei sistemi costruttivi in legno.
          </p>
        </div>
        {content}
      </div>
    </section>
  )
}
