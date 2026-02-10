'use client'

import { motion } from 'framer-motion'
import { Home, Shield, Calendar, TrendingUp, Award, CheckCircle, FileCheck, Heart } from 'lucide-react'
import HeroStatCard from '@/components/ui/HeroStatCard'
import AnimatedProgressBar from '@/components/ui/AnimatedProgressBar'
import Button from '@/components/ui/Button'

export default function WhyItMattersSection() {
  return (
    <motion.section
      className="py-20 px-4"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Perché <span className="text-[#A0845C]">Ti Conviene</span>
          </h2>
          <p className="text-white/70 text-lg">
            I numeri parlano chiaro. Ecco il valore reale.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Card 1: Valore Immobile */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0, duration: 0.6 }}
          >
            <div className="relative h-full rounded-2xl p-8 backdrop-blur-xl bg-white/60 border border-[#A0845C]/20 shadow-xl overflow-hidden group">
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{
                  background: [
                    'linear-gradient(135deg, rgba(196, 112, 75, 0.10) 0%, rgba(30, 61, 48, 0.05) 100%)',
                    'linear-gradient(135deg, rgba(196, 112, 75, 0.15) 0%, rgba(30, 61, 48, 0.08) 100%)',
                    'linear-gradient(135deg, rgba(196, 112, 75, 0.10) 0%, rgba(30, 61, 48, 0.05) 100%)',
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="mb-4">
                  <div className="text-8xl lg:text-9xl font-bold text-[#A0845C] leading-none">
                    €25k
                  </div>
                  <p className="text-lg lg:text-xl text-[#1D1D1F] font-semibold mt-2">
                    Valore Aggiunto
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="my-6">
                  <p className="text-sm text-[#1D1D1F]/70 mb-2">Rivalutazione immobile</p>
                  <AnimatedProgressBar value={10} color="#A0845C" height="h-3" />
                  <p className="text-xs text-[#1D1D1F]/60 mt-1">+10% su casa €250k</p>
                </div>

                {/* Badges */}
                <div className="space-y-3">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 p-3 bg-white/80 backdrop-blur-sm rounded-lg border border-[#A0845C]/10 shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#A0845C]/10 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-4 h-4 text-[#A0845C]" />
                    </div>
                    <span className="text-sm text-[#1D1D1F] font-medium">
                      +10% rivalutazione
                    </span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.65, duration: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 p-3 bg-white/80 backdrop-blur-sm rounded-lg border border-[#A0845C]/10 shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#A0845C]/10 flex items-center justify-center flex-shrink-0">
                      <Award className="w-4 h-4 text-[#A0845C]" />
                    </div>
                    <span className="text-sm text-[#1D1D1F] font-medium">
                      Certificato CasaClima
                    </span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Zero Interventi - Custom layout */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <motion.div
              className="relative h-full rounded-2xl p-8 backdrop-blur-xl bg-white/60 border border-[#A0845C]/20 shadow-xl"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="mb-4">
                  <div className="text-8xl lg:text-9xl font-bold text-[#6B8F71] leading-none">0</div>
                  <p className="text-lg lg:text-xl text-[#1D1D1F] font-semibold mt-2">
                    Interventi Necessari
                  </p>
                </div>

                {/* Giant Checkmark */}
                <div className="flex justify-center my-8">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <CheckCircle className="w-20 h-20 text-[#6B8F71]" />
                  </motion.div>
                </div>

                {/* Description */}
                <p className="text-sm text-[#1D1D1F]/70 mb-4 line-through">
                  Standard: 3-5 interventi (€15k)
                </p>

                <div className="space-y-3">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className="flex items-center gap-3 p-3 bg-white/80 rounded-lg"
                  >
                    <CheckCircle className="w-4 h-4 text-[#6B8F71]" />
                    <span className="text-sm text-[#1D1D1F]">Zero sorprese</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.65, duration: 0.4 }}
                    className="flex items-center gap-3 p-3 bg-white/80 rounded-lg"
                  >
                    <Shield className="w-4 h-4 text-[#6B8F71]" />
                    <span className="text-sm text-[#1D1D1F]">Garanzia totale</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Card 3: 30 Anni Garanzia */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="relative h-full rounded-2xl p-8 backdrop-blur-xl bg-white/60 border border-[#A0845C]/20 shadow-xl overflow-hidden">
              {/* Content */}
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="mb-4">
                  <div className="text-8xl lg:text-9xl font-bold text-[#A0845C] leading-none">
                    30
                  </div>
                  <p className="text-lg lg:text-xl text-[#1D1D1F] font-semibold mt-2">
                    Anni di Garanzia
                  </p>
                </div>

                {/* Timeline visual */}
                <div className="my-6">
                  <p className="text-sm text-[#1D1D1F]/70 mb-2">2026 ━━━━━ 2056</p>
                  <AnimatedProgressBar value={100} color="#A0845C" height="h-3" delay={0.3} />
                  <p className="text-xs text-[#1D1D1F]/60 mt-1 line-through">Standard: 2 anni (15x meno)</p>
                </div>

                {/* Badges */}
                <div className="space-y-3">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 p-3 bg-white/80 backdrop-blur-sm rounded-lg border border-[#A0845C]/10 shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#A0845C]/10 flex items-center justify-center flex-shrink-0">
                      <FileCheck className="w-4 h-4 text-[#A0845C]" />
                    </div>
                    <span className="text-sm text-[#1D1D1F] font-medium">
                      Certificato EN 14080
                    </span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.65, duration: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 p-3 bg-white/80 backdrop-blur-sm rounded-lg border border-[#A0845C]/10 shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#A0845C]/10 flex items-center justify-center flex-shrink-0">
                      <Heart className="w-4 h-4 text-[#A0845C]" />
                    </div>
                    <span className="text-sm text-[#1D1D1F] font-medium">
                      Stai tranquillo
                    </span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div className="text-center">
          <p className="text-white/80 text-xl mb-8 max-w-3xl mx-auto">
            Non parliamo solo di soldi. Parliamo di <strong>tranquillità</strong>.
          </p>
          <Button variant="primary" size="lg" icon={false}>
            Parlane con Noi
          </Button>
        </motion.div>
      </div>
    </motion.section>
  )
}
