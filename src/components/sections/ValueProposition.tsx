'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Home, Heart, Leaf, Award, Euro, MapPin, Ruler, Check, ArrowRight, CheckCircle2, Gem } from 'lucide-react'
import Link from 'next/link'
import PulsarGridBackground from '@/components/ui/PulsarGridBackground'
import { BouncyCard3D } from '@/components/ui/BouncyCard3D'
import EnhancedFeatureCard from '@/components/ui/EnhancedFeatureCard'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import WarrantyTimelineCard from '@/components/ui/WarrantyTimelineCard'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15
    }
  }
}

export default function ValueProposition() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })

  // Text reveal animation
  const titleWords = "Perché Scegliere Ecolive".split(" ")

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* Pulsar Grid Background - Interactive */}
      <PulsarGridBackground
        backgroundColor="#FAF7F2"
        dotColor="rgba(196, 112, 75, 0.8)"
        gridSpacing={50}
        className="py-24 lg:py-32 px-4"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header with animated text reveal */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9 }}
          >
            <motion.span
              className="inline-block px-4 py-2 rounded-full bg-[#C4704B]/10 border border-[#C4704B]/30 text-[#C4704B] font-semibold text-sm uppercase tracking-wider mb-4"
              whileHover={{ scale: 1.05 }}
            >
              Perché Noi
            </motion.span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1E3D30] mt-4">
              {titleWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20, rotateX: -90 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.15,
                    duration: 0.7,
                    type: 'spring',
                    stiffness: 100
                  }}
                  className={word === "Ecolive" ? "text-[#C4704B] inline-block" : "inline-block"}
                >
                  {word}{' '}
                </motion.span>
              ))}
            </h2>
            <motion.p
              className="text-[#6B6560] text-xl max-w-3xl mx-auto mt-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Oltre 25 anni di esperienza nella bioedilizia per case che durano nel tempo
            </motion.p>
          </motion.div>

          {/* Enhanced Grid Layout */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* 1. Esperienza Hero Card - Large */}
            <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-1 lg:row-span-2">
              <BouncyCard3D className="h-full">
                <div className="h-full rounded-2xl bg-gradient-to-br from-[#C4704B] to-[#1E3D30] p-8 text-white flex flex-col justify-between relative overflow-hidden">
                  {/* Animated background pattern */}
                  <motion.div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }}
                    animate={{
                      backgroundPosition: ['0px 0px', '20px 20px'],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                  />

                  <div className="relative z-10">
                    <motion.div
                      className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm mb-6"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Award className="w-8 h-8" />
                    </motion.div>

                    <div className="mb-6">
                      <motion.div
                        className="text-7xl font-bold mb-2 flex items-baseline gap-2"
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                      >
                        <AnimatedCounter
                          value={25}
                          duration={2}
                          className="text-7xl font-bold"
                        />
                        <span className="text-4xl">+</span>
                      </motion.div>
                      <p className="text-2xl font-semibold opacity-90">Anni di Esperienza</p>
                    </div>
                  </div>

                  {/* Stats badges */}
                  <div className="space-y-3 relative z-10">
                    {[
                      { icon: Home, text: '40+ Case Realizzate' },
                      { icon: Heart, text: '98% Clienti Soddisfatti' },
                      { icon: MapPin, text: 'Vieni a Trovarci a Spadola' }
                    ].map((badge, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.8 + idx * 0.1 }}
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: 'rgba(255, 255, 255, 0.2)'
                        }}
                      >
                        <badge.icon className="w-5 h-5" />
                        <span className="font-medium">{badge.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </BouncyCard3D>
            </motion.div>

            {/* 2. Artigianato Sartoriale Card */}
            <motion.div variants={itemVariants}>
              <BouncyCard3D className="h-full min-h-[320px]">
                <EnhancedFeatureCard
                  icon={Gem}
                  title="Casa su Misura"
                  description="Come un sarto crea abiti su misura, noi costruiamo case uniche. Pochi progetti all'anno, massima cura."
                  badge={{ text: 'Approccio Sartoriale', icon: Ruler }}
                  gradient="from-[#C4704B]/20 to-[#1E3D30]/20"
                >
                  {/* Split comparison mini */}
                  <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-[#1E3D30]/10 rounded-lg border border-[#1E3D30]/20">
                      <div className="font-bold text-[#1E3D30] mb-1 flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Ecolive
                      </div>
                      <div className="text-[#6B6560]">• Poche case/anno</div>
                      <div className="text-[#6B6560]">• Progetto unico</div>
                      <div className="text-[#6B6560]">• Rapporto diretto</div>
                    </div>
                    <div className="p-3 bg-[#8A857F]/10 rounded-lg">
                      <div className="font-bold text-[#6B6560] mb-1">Standard</div>
                      <div className="text-[#8A857F]">• Centinaia unità</div>
                      <div className="text-[#8A857F]">• Catalogo fisso</div>
                      <div className="text-[#8A857F]">• Call center</div>
                    </div>
                  </div>
                </EnhancedFeatureCard>
              </BouncyCard3D>
            </motion.div>

            {/* 3. Risparmio €15.000 Card */}
            <motion.div variants={itemVariants}>
              <BouncyCard3D className="h-full min-h-[320px]">
                <EnhancedFeatureCard
                  icon={Euro}
                  title="€15.000 Risparmiati"
                  description="Bollette ridotte del 70%. Clima perfetto 365 giorni senza riscaldamento aggiuntivo."
                  stats={[
                    { label: 'Risparmio Annuo', value: '€1,500' },
                    { label: 'Classe Energetica', value: 'A4' },
                    { label: 'Comfort Termico', value: '365 gg' }
                  ]}
                  badge={{ text: 'Casa Passiva', icon: Leaf }}
                  gradient="from-green-500/20 to-emerald-600/20"
                >
                  <div className="mt-4 pt-4 border-t border-[#E5E0D8]">
                    <AnimatedCounter
                      value={15000}
                      prefix="€"
                      duration={2}
                      className="text-3xl font-bold text-[#C4704B]"
                    />
                    <p className="text-xs text-[#6B6560] mt-1">Risparmio totale in 10 anni</p>
                  </div>
                </EnhancedFeatureCard>
              </BouncyCard3D>
            </motion.div>

            {/* 4. Garanzia 30 Anni Timeline - Full span */}
            <motion.div variants={itemVariants} className="lg:col-span-3">
              <BouncyCard3D>
                <WarrantyTimelineCard
                  milestones={[
                    { year: 0, label: 'Consegna', status: 'Perfetta' },
                    { year: 10, label: '10 Anni', status: 'Come Nuova' },
                    { year: 20, label: '20 Anni', status: 'Intatta' },
                    { year: 30, label: '30 Anni', status: 'Garanzia Attiva' }
                  ]}
                />
              </BouncyCard3D>
            </motion.div>
          </motion.div>

          {/* Call to Action Specifico */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <p className="text-[#6B6560] mb-4 text-lg">
              Vuoi toccare con mano i nostri materiali?
            </p>
            <Link
              href="/contatti"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#C4704B] text-white font-semibold text-lg shadow-xl hover:shadow-2xl transition-all group"
            >
              <MapPin className="w-5 h-5" />
              <span>Visita il Laboratorio a Spadola</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <p className="text-[#8A857F] text-sm mt-4 flex items-center justify-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              Via Conte Ruggiero 128, Spadola (VV)
            </p>
          </motion.div>
        </div>
      </PulsarGridBackground>
    </section>
  )
}
