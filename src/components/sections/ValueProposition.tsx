'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Home, Heart, Leaf, TreePine, Shield, ShieldCheck } from 'lucide-react'
import TiltWrapper from '@/components/ui/TiltWrapper'
import HeroStatCard from '@/components/ui/HeroStatCard'
import InteractiveTimelineCard from '@/components/ui/InteractiveTimelineCard'
import Feature3DCard from '@/components/ui/Feature3DCard'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
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

  return (
    <section ref={ref} className="py-24 lg:py-32 px-4 bg-[#FAF7F2] relative overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-0 right-0 w-96 3xl:w-[600px] h-96 3xl:h-[600px] bg-[#C4704B]/5 3xl:bg-[#C4704B]/8 rounded-full blur-3xl 3xl:-right-20" />
      <div className="absolute bottom-0 left-0 w-64 3xl:w-[500px] h-64 3xl:h-[500px] bg-[#1E3D30]/5 3xl:bg-[#1E3D30]/8 rounded-full blur-3xl 3xl:-left-20" />

      <div className="max-w-6xl 3xl:max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <span className="text-[#C4704B] font-semibold text-sm uppercase tracking-wider">
            Perche Noi
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1E3D30] mt-2">
            Perche Scegliere <span className="text-[#C4704B]">Ecolive</span>
          </h2>
          <p className="text-[#6B6560] text-lg max-w-2xl mx-auto mt-4">
            Oltre 25 anni di esperienza nella bioedilizia per case che durano nel tempo
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* 1. Hero Stat Card - tall (md:row-span-2 md:col-span-1) */}
          <motion.div variants={itemVariants} className="md:row-span-2 md:col-span-1">
            <TiltWrapper>
              <HeroStatCard
                statValue={25}
                statSuffix="+"
                statLabel="Anni di Esperienza"
                badges={[
                  { text: '40+ Case Realizzate', icon: Home },
                  { text: '98% Clienti Soddisfatti', icon: Heart },
                  { text: 'Certificazione PEFC', icon: Leaf }
                ]}
              />
            </TiltWrapper>
          </motion.div>

          {/* 2. Timeline Card - wide (md:col-span-2) */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <TiltWrapper>
              <InteractiveTimelineCard />
            </TiltWrapper>
          </motion.div>

          {/* 3. Sostenibilità Card - standard (md:col-span-1) */}
          <motion.div variants={itemVariants}>
            <TiltWrapper>
              <Feature3DCard
                icon={Leaf}
                title="Sostenibilità"
                stats={[
                  { label: 'CO₂ Assorbita (50 anni)', value: '~30 ton' },
                  { label: 'Materiali Riciclabili', value: '95%' },
                  { label: 'Sprechi Produzione', value: '0%' }
                ]}
                badge={{ text: 'Legno PEFC Certificato', icon: TreePine }}
              />
            </TiltWrapper>
          </motion.div>

          {/* 4. Sicurezza Card - standard (md:col-span-1) */}
          <motion.div variants={itemVariants}>
            <TiltWrapper>
              <Feature3DCard
                icon={Shield}
                title="Sicurezza Antisismica"
                stats={[
                  { label: 'Zona Sismica', value: '1' },
                  { label: 'Test Superati', value: '7.2 R' },
                  { label: 'Peso vs Laterizio', value: '-50%' }
                ]}
                badge={{ text: 'Certificato Antisismico', icon: ShieldCheck }}
              />
            </TiltWrapper>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
