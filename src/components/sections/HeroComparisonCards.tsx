'use client'

import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import NumberFlow from '@number-flow/react'
import ParticleBackground from '@/components/effects/ParticleBackground'

interface ComparisonItem {
  label: string
  status: 'good' | 'bad'
}

const standardIssues: ComparisonItem[] = [
  { label: 'Deformazioni strutturali', status: 'bad' },
  { label: 'Crepe nei rivestimenti', status: 'bad' },
  { label: 'Infiltrazioni umidità', status: 'bad' },
  { label: 'Interventi necessari', status: 'bad' }
]

const ecoliveFeatures: ComparisonItem[] = [
  { label: 'Struttura perfetta', status: 'good' },
  { label: 'Zero deformazioni', status: 'good' },
  { label: 'Totalmente intatta', status: 'good' },
  { label: 'Zero problemi', status: 'good' }
]

export default function HeroComparisonCards() {
  return (
    <div className="relative py-20">
      {/* Particle background decorations */}
      <ParticleBackground
        particleCount={30}
        color="#C4704B"
        opacity={0.1}
      />

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            La Differenza Dopo 10 Anni
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[#8A857F]"
          >
            Confronto oggettivo tra casa standard e casa Ecolive
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Casa Standard - Red */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{
              rotateY: -5,
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
            className="relative group"
            style={{ perspective: '1000px' }}
          >
            <div className="relative bg-gradient-to-br from-red-950/30 to-red-900/20 backdrop-blur-xl border border-red-500/20 rounded-3xl p-8 shadow-2xl overflow-hidden">
              {/* Gradient glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-full mb-6">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-red-400 font-semibold text-sm">CASA STANDARD</span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-8">Dopo 10 Anni</h3>

              {/* Issues list */}
              <div className="space-y-4 mb-8">
                {standardIssues.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * idx }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                      <X className="w-4 h-4 text-red-500" />
                    </div>
                    <span className="text-gray-300">{item.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* Cost counter */}
              <div className="pt-6 border-t border-red-500/20">
                <p className="text-sm text-gray-400 mb-2">Costi manutenzione e riparazioni:</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-red-500">€</span>
                  <NumberFlow
                    value={15000}
                    className="text-4xl font-bold text-red-500"
                    format={{ notation: 'standard' }}
                    animated
                  />
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-xl text-red-400"
                  >
                    +
                  </motion.span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Casa Ecolive - Green */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{
              rotateY: 5,
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
            className="relative group"
            style={{ perspective: '1000px' }}
          >
            <div className="relative bg-gradient-to-br from-green-950/30 to-green-900/20 backdrop-blur-xl border border-[#40916c]/30 rounded-3xl p-8 shadow-2xl overflow-hidden">
              {/* Gradient glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#40916c]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Pulsing ring effect on hover */}
              <div className="absolute inset-0 rounded-3xl ring-2 ring-[#40916c]/0 group-hover:ring-[#40916c]/50 transition-all duration-500" />

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#40916c]/20 border border-[#40916c]/40 rounded-full mb-6">
                <div className="w-2 h-2 bg-[#40916c] rounded-full animate-pulse" />
                <span className="text-[#40916c] font-semibold text-sm">CASA ECOLIVE</span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-8">Dopo 10 Anni</h3>

              {/* Features list */}
              <div className="space-y-4 mb-8">
                {ecoliveFeatures.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * idx }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#40916c]/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-[#40916c]" />
                    </div>
                    <span className="text-gray-200">{item.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* Cost counter */}
              <div className="pt-6 border-t border-[#40916c]/20">
                <p className="text-sm text-gray-400 mb-2">Costi manutenzione e riparazioni:</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-[#40916c]">€</span>
                  <NumberFlow
                    value={0}
                    className="text-4xl font-bold text-[#40916c]"
                    format={{ notation: 'standard' }}
                    animated
                  />
                  <motion.span
                    initial={{ opacity: 0, rotate: 0 }}
                    whileInView={{ opacity: 1, rotate: 180 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="text-xl text-[#40916c]"
                  >
                    ✓
                  </motion.span>
                </div>
                <p className="text-sm text-green-400 mt-2">Zero problemi, zero spese</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Central connecting gradient glow */}
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-radial from-[#C4704B]/20 to-transparent blur-3xl pointer-events-none" />
      </div>
    </div>
  )
}
