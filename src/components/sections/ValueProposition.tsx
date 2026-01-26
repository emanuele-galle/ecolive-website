'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Home, Heart, Leaf, TreePine, Shield, ShieldCheck } from 'lucide-react'
import TiltWrapper from '@/components/ui/TiltWrapper'
import HeroStatCard from '@/components/ui/HeroStatCard'
import InteractiveTimelineCard from '@/components/ui/InteractiveTimelineCard'
import Feature3DCard from '@/components/ui/Feature3DCard'
import ParticleBackground from '@/components/ui/ParticleBackground'
import SeismographVisual from '@/components/ui/SeismographVisual'

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

  // Scroll parallax
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -30])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -20])

  // Text reveal animation
  const titleWords = "Perché Scegliere Ecolive".split(" ")

  return (
    <section ref={ref} className="py-24 lg:py-32 px-4 bg-[#FAF7F2] relative overflow-hidden">
      {/* Particle Background (z-0) */}
      <ParticleBackground
        particleCount={180}
        particleColor="rgba(196, 112, 75, 0.3)"
        className="z-0"
      />

      {/* Animated gradient orbs (z-5) */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#C4704B]/10 rounded-full blur-3xl z-5"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-[#1E3D30]/10 rounded-full blur-3xl z-5"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-80 h-80 bg-[#C9A86C]/8 rounded-full blur-3xl z-5"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      <div className="max-w-6xl 3xl:max-w-7xl mx-auto relative z-10">
        {/* Header with text reveal */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <span className="text-[#C4704B] font-semibold text-sm uppercase tracking-wider">
            Perché Noi
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1E3D30] mt-2">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={word === "Ecolive" ? "text-[#C4704B]" : ""}
              >
                {word}{' '}
              </motion.span>
            ))}
          </h2>
          <p className="text-[#6B6560] text-lg max-w-2xl mx-auto mt-4">
            Oltre 25 anni di esperienza nella bioedilizia per case che durano nel tempo
          </p>
        </motion.div>

        {/* Bento Grid with Parallax */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* 1. Hero Stat Card - tall (md:row-span-2 md:col-span-1) with parallax */}
          <motion.div
            variants={itemVariants}
            className="md:row-span-2 md:col-span-1"
            style={{ y: y1 }}
          >
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

          {/* 2. Timeline Card - wide (md:col-span-2) with parallax */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2"
            style={{ y: y2 }}
          >
            <TiltWrapper>
              <InteractiveTimelineCard />
            </TiltWrapper>
          </motion.div>

          {/* 3. Sostenibilità Card - standard (md:col-span-1) with progress bars and icon animation */}
          <motion.div
            variants={itemVariants}
            style={{ y: y3 }}
          >
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
                showProgressBars={true}
                progressValues={[100, 95, 100]}
                animateIcons={true}
              />
            </TiltWrapper>
          </motion.div>

          {/* 4. Sicurezza Card - standard (md:col-span-1) with seismograph visual */}
          <motion.div
            variants={itemVariants}
            style={{ y: y3 }}
          >
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
                animateIcons={true}
                customVisual={<SeismographVisual amplitude={15} color="#C4704B" />}
              />
            </TiltWrapper>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
