'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Link from 'next/link'
import {
  Gem, Factory, Users, Eye, Ruler, Droplets,
  ArrowRight, Quote, CheckCircle2
} from 'lucide-react'
import { useMouseTilt, useMouseFollow } from '@/lib/hooks/useMouseParallax'

// Dati per la sezione split
const craftVsIndustrial = {
  craft: {
    title: 'Approccio Sartoriale',
    subtitle: 'Come Ecolive',
    points: [
      {
        icon: Gem,
        title: 'Poche costruzioni, massima cura',
        description: 'Ogni progetto riceve attenzione totale del nostro team',
      },
      {
        icon: Ruler,
        title: 'Progettazione su misura',
        description: 'Ogni casa e unica, pensata per il tuo stile di vita',
      },
      {
        icon: Eye,
        title: 'Finiture di livello superiore',
        description: 'Dettagli che fanno la differenza nel lungo periodo',
      },
      {
        icon: Droplets,
        title: 'Lavorazione in laboratorio',
        description: 'Ambiente controllato, nessuna intemperia durante la produzione',
      },
    ],
  },
  industrial: {
    title: 'Produzione Industriale',
    subtitle: 'Grandi produttori',
    points: [
      {
        title: 'Volumi elevati',
        description: 'Centinaia di case/anno, standardizzazione forzata',
      },
      {
        title: 'Catalogo predefinito',
        description: 'Modelli fissi con personalizzazioni limitate',
      },
      {
        title: 'Finiture standard',
        description: 'Ottimizzazione costi su dettagli e materiali',
      },
      {
        title: 'Produzione continua',
        description: 'Priorita ai tempi di consegna, non alla perfezione',
      },
    ],
  },
}

// Qualita distintive
const distinctiveQualities = [
  {
    icon: Gem,
    title: 'Qualita verificabile',
    description: 'Vieni a trovarci e tocca con mano i materiali che usiamo',
  },
  {
    icon: Users,
    title: 'Rapporto diretto',
    description: 'Parli con chi costruira la tua casa, non con un call center',
  },
  {
    icon: Factory,
    title: 'Produzione locale',
    description: 'Stabilimento a Spadola, nel cuore della Calabria',
  },
]

// Component for quality cards with tilt
function QualityCard({ quality, index, isInView }: { quality: typeof distinctiveQualities[0], index: number, isInView: boolean }) {
  const { ref, rotateX, rotateY, scale, handlers } = useMouseTilt({
    maxRotation: 8,
    scale: 1.03
  })
  const Icon = quality.icon

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-2xl p-6 border border-[#D2D2D7] shadow-sm hover:shadow-lg transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.7 + index * 0.1 }}
      style={{
        rotateX,
        rotateY,
        scale,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d'
      }}
      {...handlers}
    >
      <motion.div
        className="w-12 h-12 rounded-xl bg-[#A0845C]/10 flex items-center justify-center mb-4"
        style={{ translateZ: 20 }}
      >
        <Icon className="w-6 h-6 text-[#A0845C]" />
      </motion.div>
      <motion.h4
        className="font-bold text-[#1D1D1F] mb-2"
        style={{ translateZ: 30 }}
      >
        {quality.title}
      </motion.h4>
      <motion.p
        className="text-[#86868B] text-sm"
        style={{ translateZ: 15 }}
      >
        {quality.description}
      </motion.p>
    </motion.div>
  )
}

export default function CraftmanshipSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })
  const [hoveredSide, setHoveredSide] = useState<'craft' | 'industrial' | null>(null)

  // Floating shapes with mouse follow
  const floatingSlow = useMouseFollow({ intensity: 0.15, delay: 3 })
  const floatingMedium = useMouseFollow({ intensity: 0.25, delay: 2 })

  // Tilt for comparison cards
  const craftTilt = useMouseTilt({ maxRotation: 4, scale: 1.01 })
  const industrialTilt = useMouseTilt({ maxRotation: 4, scale: 1.01 })

  return (
    <section
      ref={containerRef}
      className="relative py-20 lg:py-28 px-4 bg-[#F5F5F7] overflow-hidden"
    >
      {/* Background decoration with mouse follow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-[#A0845C]/5 rounded-full blur-[120px]"
          style={{ x: floatingSlow.x, y: floatingSlow.y }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-80 h-80 bg-[#1D1D1F]/5 rounded-full blur-[100px]"
          style={{ x: floatingMedium.x, y: floatingMedium.y }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[#A0845C] text-sm uppercase tracking-[0.2em] font-medium">
            Il Nostro Approccio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mt-3 leading-tight">
            Non siamo una <span className="text-[#A0845C]">fabbrica</span>
          </h2>
          <p className="text-[#86868B] text-base sm:text-lg max-w-2xl mx-auto mt-4">
            Come un sarto crea abiti su misura, noi costruiamo case uniche.
            Pochi progetti, massima cura per ogni dettaglio.
          </p>
        </motion.div>

        {/* Split comparison with tilt */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {/* Craft side */}
          <motion.div
            ref={craftTilt.ref}
            className={`
              relative bg-white rounded-3xl p-6 sm:p-8 border-2 transition-all duration-300
              ${hoveredSide === 'craft' ? 'border-[#1D1D1F] shadow-2xl' : 'border-[#D2D2D7] shadow-lg'}
            `}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            onMouseEnter={() => setHoveredSide('craft')}
            onMouseMove={craftTilt.handlers.onMouseMove}
            onMouseLeave={(e) => {
              setHoveredSide(null)
              craftTilt.handlers.onMouseLeave()
            }}
            style={{
              rotateX: craftTilt.rotateX,
              rotateY: craftTilt.rotateY,
              scale: craftTilt.scale,
              transformPerspective: 1200,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Highlight badge */}
            <motion.div
              className="absolute -top-3 left-6"
              style={{ translateZ: 40 }}
            >
              <span className="px-4 py-1.5 bg-[#1D1D1F] text-white text-xs font-bold rounded-full uppercase tracking-wider">
                Ecolive
              </span>
            </motion.div>

            <motion.div className="mt-4" style={{ translateZ: 20 }}>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#1D1D1F]">
                {craftVsIndustrial.craft.title}
              </h3>
              <p className="text-[#A0845C] font-medium mt-1">{craftVsIndustrial.craft.subtitle}</p>
            </motion.div>

            <div className="mt-8 space-y-6">
              {craftVsIndustrial.craft.points.map((point, index) => {
                const Icon = point.icon
                return (
                  <motion.div
                    key={point.title}
                    className="flex gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    style={{ translateZ: 15 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1D1D1F] to-[#48484A] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1D1D1F]">{point.title}</h4>
                      <p className="text-[#86868B] text-sm mt-0.5">{point.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Visual accent */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#1D1D1F]/5 to-transparent rounded-tl-full" />
          </motion.div>

          {/* Industrial side */}
          <motion.div
            ref={industrialTilt.ref}
            className={`
              relative bg-[#F5F2EE] rounded-3xl p-6 sm:p-8 border-2 transition-all duration-300
              ${hoveredSide === 'industrial' ? 'border-[#AEAEB2]/50' : 'border-transparent'}
            `}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            onMouseEnter={() => setHoveredSide('industrial')}
            onMouseMove={industrialTilt.handlers.onMouseMove}
            onMouseLeave={() => {
              setHoveredSide(null)
              industrialTilt.handlers.onMouseLeave()
            }}
            style={{
              rotateX: industrialTilt.rotateX,
              rotateY: industrialTilt.rotateY,
              scale: industrialTilt.scale,
              transformPerspective: 1200,
              transformStyle: 'preserve-3d'
            }}
          >
            <motion.div style={{ translateZ: 20 }}>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#86868B]">
                {craftVsIndustrial.industrial.title}
              </h3>
              <p className="text-[#AEAEB2] font-medium mt-1">{craftVsIndustrial.industrial.subtitle}</p>
            </motion.div>

            <div className="mt-8 space-y-6">
              {craftVsIndustrial.industrial.points.map((point, index) => (
                <motion.div
                  key={point.title}
                  className="flex gap-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  style={{ translateZ: 15 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-[#D2D2D7]/50 flex items-center justify-center flex-shrink-0">
                    <Factory className="w-6 h-6 text-[#AEAEB2]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#86868B]">{point.title}</h4>
                    <p className="text-[#AEAEB2] text-sm mt-0.5">{point.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quote */}
        <motion.div
          className="relative bg-[#1D1D1F] rounded-3xl p-8 sm:p-12 mb-16 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          {/* Background pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <Quote className="w-12 h-12 text-[#A0845C] mx-auto mb-6 opacity-60" />
            <blockquote className="text-xl sm:text-2xl lg:text-3xl text-white font-light leading-relaxed italic">
              &ldquo;Non costruiamo case in serie. Costruiamo la casa che hai sempre sognato,
              con la cura che meriti.&rdquo;
            </blockquote>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#A0845C] flex items-center justify-center text-white font-bold">
                DG
              </div>
              <div className="text-left">
                <p className="text-white font-semibold">Dominik Galle</p>
                <p className="text-white/60 text-sm">Founder & CEO</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Distinctive qualities with tilt */}
        <motion.div
          className="grid sm:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          {distinctiveQualities.map((quality, index) => (
            <QualityCard
              key={quality.title}
              quality={quality}
              index={index}
              isInView={isInView}
            />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9 }}
        >
          <p className="text-[#86868B] mb-4">
            Vuoi vedere come lavoriamo?
          </p>
          <Link
            href="/contatti"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1D1D1F] text-white font-semibold rounded-full hover:bg-[#48484A] transition-colors group"
          >
            <span>Vieni a trovarci in laboratorio</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-[#AEAEB2] text-sm mt-4">
            <CheckCircle2 className="w-4 h-4 inline mr-1" />
            Via Conte Ruggiero 128, Spadola (VV)
          </p>
        </motion.div>
      </div>
    </section>
  )
}
