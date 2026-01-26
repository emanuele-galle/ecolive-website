'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Home, Heart, Leaf, TreePine, Shield, ShieldCheck, Award, Clock, Gauge } from 'lucide-react'
import PulsarGridBackground from '@/components/ui/PulsarGridBackground'
import { BouncyCard3D } from '@/components/ui/BouncyCard3D'
import EnhancedFeatureCard from '@/components/ui/EnhancedFeatureCard'
import SeismographVisual from '@/components/ui/SeismographVisual'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

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
                      { icon: Leaf, text: 'Certificazione PEFC' }
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

            {/* 2. Sostenibilità Card */}
            <motion.div variants={itemVariants}>
              <BouncyCard3D className="h-full min-h-[320px]">
                <EnhancedFeatureCard
                  icon={Leaf}
                  title="Sostenibilità"
                  description="Materiali eco-compatibili per un futuro migliore"
                  stats={[
                    { label: 'CO₂ Assorbita', value: '~30 ton' },
                    { label: 'Riciclabili', value: '95%' },
                    { label: 'Sprechi', value: '0%' }
                  ]}
                  badge={{ text: 'PEFC Certificato', icon: TreePine }}
                  gradient="from-green-500/20 to-emerald-600/20"
                />
              </BouncyCard3D>
            </motion.div>

            {/* 3. Sicurezza Antisismica Card */}
            <motion.div variants={itemVariants}>
              <BouncyCard3D className="h-full min-h-[320px]">
                <EnhancedFeatureCard
                  icon={Shield}
                  title="Sicurezza Antisismica"
                  description="Strutture testate per resistere a eventi sismici estremi"
                  stats={[
                    { label: 'Zona Sismica', value: '1' },
                    { label: 'Test Superati', value: '7.2 R' },
                    { label: 'Peso', value: '-50%' }
                  ]}
                  badge={{ text: 'Certificato', icon: ShieldCheck }}
                  gradient="from-red-500/20 to-orange-600/20"
                >
                  <div className="mt-4">
                    <SeismographVisual amplitude={15} color="#C4704B" />
                  </div>
                </EnhancedFeatureCard>
              </BouncyCard3D>
            </motion.div>

            {/* 4. Tempi di Realizzazione */}
            <motion.div variants={itemVariants}>
              <BouncyCard3D className="h-full min-h-[280px]">
                <EnhancedFeatureCard
                  icon={Clock}
                  title="Tempi Rapidi"
                  description="Dalla progettazione al montaggio in tempi record"
                  stats={[
                    { label: 'Progettazione', value: '2-3 sett' },
                    { label: 'Produzione', value: '8-12 sett' },
                    { label: 'Montaggio', value: '3-5 gg' }
                  ]}
                  badge={{ text: 'Chiavi in Mano', icon: Home }}
                  gradient="from-blue-500/20 to-indigo-600/20"
                />
              </BouncyCard3D>
            </motion.div>

            {/* 5. Efficienza Energetica */}
            <motion.div variants={itemVariants}>
              <BouncyCard3D className="h-full min-h-[280px]">
                <EnhancedFeatureCard
                  icon={Gauge}
                  title="Efficienza Energetica"
                  description="Risparmio garantito sulle bollette energetiche"
                  stats={[
                    { label: 'Classe Energetica', value: 'A4' },
                    { label: 'Risparmio', value: '-70%' },
                    { label: 'Isolamento', value: '0.15 W/mK' }
                  ]}
                  badge={{ text: 'Casa Passiva', icon: Leaf }}
                  gradient="from-yellow-500/20 to-amber-600/20"
                />
              </BouncyCard3D>
            </motion.div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <motion.button
              className="px-8 py-4 rounded-full bg-[#C4704B] text-white font-semibold text-lg shadow-xl hover:shadow-2xl transition-shadow"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 25px 50px -12px rgba(196, 112, 75, 0.5)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              Scopri Tutti i Vantaggi →
            </motion.button>
          </motion.div>
        </div>
      </PulsarGridBackground>
    </section>
  )
}
