'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { MessageSquare, PenTool, Factory, Truck } from 'lucide-react'

interface ProcessStep {
  icon: typeof MessageSquare
  number: string
  title: string
  description: string
  image: string
  imageAlt: string
}

interface GlampingProcessProps {
  color: string
}

const TERRACOTTA = '#A0845C'

const steps: ProcessStep[] = [
  {
    icon: MessageSquare,
    number: '01',
    title: 'Consulenza',
    description: 'Analizziamo le tue esigenze, il terreno e gli obiettivi del progetto per definire la soluzione ideale.',
    image: '/images/glamping/glamping-aframe-balcony.webp',
    imageAlt: 'Consulenza glamping - analisi del progetto'
  },
  {
    icon: PenTool,
    number: '02',
    title: 'Progettazione',
    description: 'Design personalizzato con render 3D, planimetrie dettagliate e scelta di materiali e finiture.',
    image: '/images/glamping/glamping-duo-symmetric.webp',
    imageAlt: 'Progettazione glamping - design personalizzato'
  },
  {
    icon: Factory,
    number: '03',
    title: 'Produzione',
    description: 'Realizzazione in stabilimento con controllo qualità certificato e materiali eco-sostenibili.',
    image: '/images/glamping/glamping-triple-frontal.webp',
    imageAlt: 'Produzione glamping - costruzione in stabilimento'
  },
  {
    icon: Truck,
    number: '04',
    title: 'Installazione',
    description: 'Montaggio in loco e consegna chiavi in mano. Pronto all\'uso in tempi record.',
    image: '/images/glamping/glamping-single-forest.webp',
    imageAlt: 'Installazione glamping - montaggio in loco'
  },
]

function TimelineStep({
  step,
  index,
  isInView,
}: {
  step: ProcessStep
  index: number
  isInView: boolean
}) {
  const Icon = step.icon
  const isEven = index % 2 === 0

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-0">
      {/* Left side */}
      <div className={`${isEven ? 'md:pr-12' : 'md:pr-12 md:order-1'}`}>
        {isEven ? (
          /* Card on left */
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 + index * 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="group md:text-right"
          >
            <div className="p-6 md:p-8 bg-white rounded-2xl border border-[#EDE6DB]/60 shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden">
              {/* Hover glow */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at ${isEven ? '100%' : '0%'} 50%, ${TERRACOTTA}08 0%, transparent 60%)`
                }}
              />

              <div className="relative z-10">
                {/* Mobile: show icon inline */}
                <div className="flex items-center gap-3 mb-3 md:justify-end">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center md:hidden"
                    style={{ backgroundColor: `${TERRACOTTA}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: TERRACOTTA }} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: TERRACOTTA }}>
                    Fase {step.number}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-[#1D1D1F] mb-2">{step.title}</h3>
                <p className="text-[#86868B] leading-relaxed text-sm md:text-base">{step.description}</p>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Image on left */
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 + index * 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block"
          >
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden group">
              <Image
                src={step.image}
                alt={step.imageAlt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 40vw"
                quality={75}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Center timeline */}
      <div className="hidden md:flex flex-col items-center md:order-none relative z-10">
        {/* Dot */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: 0.2 + index * 0.2, type: 'spring', stiffness: 300, damping: 20 }}
          className="relative"
        >
          {/* Pulse ring */}
          <motion.div
            className="absolute -inset-2 rounded-full"
            style={{ border: `2px solid ${TERRACOTTA}30` }}
            animate={isInView ? {
              scale: [1, 1.4, 1],
              opacity: [0.4, 0, 0.4],
            } : {}}
            transition={{ delay: 1 + index * 0.3, duration: 2.5, repeat: Infinity }}
          />
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-lg border-2 relative z-10"
            style={{ borderColor: TERRACOTTA }}
          >
            <Icon className="w-5 h-5" style={{ color: TERRACOTTA }} />
          </div>
          {/* Number badge */}
          <motion.div
            className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white z-20 shadow-sm"
            style={{ backgroundColor: TERRACOTTA }}
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.5 + index * 0.2, type: 'spring', stiffness: 400 }}
          >
            {step.number}
          </motion.div>
        </motion.div>
      </div>

      {/* Right side */}
      <div className={`${isEven ? 'md:pl-12' : 'md:pl-12 md:order-[-1]'}`}>
        {isEven ? (
          /* Image on right */
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 + index * 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block"
          >
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden group">
              <Image
                src={step.image}
                alt={step.imageAlt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 40vw"
                quality={75}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </motion.div>
        ) : (
          /* Card on right */
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 + index * 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="group"
          >
            <div className="p-6 md:p-8 bg-white rounded-2xl border border-[#EDE6DB]/60 shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 0% 50%, ${TERRACOTTA}08 0%, transparent 60%)`
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center md:hidden"
                    style={{ backgroundColor: `${TERRACOTTA}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: TERRACOTTA }} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: TERRACOTTA }}>
                    Fase {step.number}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-[#1D1D1F] mb-2">{step.title}</h3>
                <p className="text-[#86868B] leading-relaxed text-sm md:text-base">{step.description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Mobile image - shown below card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
        className="md:hidden"
      >
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
          <Image
            src={step.image}
            alt={step.imageAlt}
            fill
            className="object-cover"
            sizes="100vw"
            quality={70}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </motion.div>
    </div>
  )
}

export default function GlampingProcess({ color }: GlampingProcessProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-80px' })

  return (
    <section ref={containerRef} className="py-20 lg:py-28 px-4 bg-white relative overflow-hidden">
      {/* Subtle background */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #1D1D1F 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header - Left aligned with terracotta bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 md:mb-24"
        >
          <div className="flex items-start gap-4 md:gap-6">
            {/* Vertical accent bar */}
            <motion.div
              className="w-1 rounded-full shrink-0 mt-1"
              style={{ backgroundColor: TERRACOTTA }}
              initial={{ height: 0 }}
              animate={isInView ? { height: 80 } : {}}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1D1D1F] mb-3">
                Il nostro processo
              </h2>
              <p className="text-[#86868B] text-lg max-w-lg">
                Da idea a realtà in 4 passaggi, con assistenza dedicata in ogni fase.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line - desktop */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-[#EDE6DB]/50">
            <motion.div
              className="w-full origin-top rounded-full"
              style={{ backgroundColor: `${TERRACOTTA}40`, height: '100%' }}
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ delay: 0.5, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-12 md:space-y-20">
            {steps.map((step, i) => (
              <TimelineStep
                key={i}
                step={step}
                index={i}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
