'use client'

import { motion, useInView, useSpring } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Layers, Grid3X3, Boxes, Calendar, CheckCircle2 } from 'lucide-react'

// ============================================
// DATA
// ============================================
const technologies = [
  {
    id: 'platform-frame',
    name: 'Platform Frame',
    year: 2008,
    icon: Layers,
    description: 'Sistema costruttivo tradizionale nordamericano adottato per la sua flessibilità e velocità di realizzazione.',
    features: [
      'Struttura leggera e flessibile',
      'Velocità di costruzione elevata',
      'Ideale per architetture complesse',
    ],
    color: '#48484A',
  },
  {
    id: 'xlam',
    name: 'X-Lam (CLT)',
    year: 2012,
    icon: Grid3X3,
    description: 'Pannelli in legno lamellare a strati incrociati per massima resistenza strutturale e precisione millimetrica.',
    features: [
      'Resistenza sismica superiore',
      'Precisione industriale',
      'Eccellente isolamento termico',
    ],
    color: '#1D1D1F',
  },
  {
    id: 'xframe',
    name: 'X-Frame',
    year: 2024,
    icon: Boxes,
    description: 'Sistema brevettato che unisce il meglio di entrambe le tecnologie. Presentato a KlimaHouse 2024.',
    features: [
      'Tecnologia brevettata esclusiva',
      'Il meglio di Platform + X-Lam',
      'Montaggio in soli 60 giorni',
    ],
    color: '#A0845C',
    isNew: true,
  },
]

const stats = [
  { value: 25, suffix: '+', label: 'Anni esperienza' },
  { value: 500, suffix: '+', label: 'Progetti realizzati' },
  { value: 3, suffix: '', label: 'Sistemi costruttivi' },
  { value: 4, suffix: '', label: 'Classe energetica A', prefix: 'A' },
]

// ============================================
// ANIMATED COUNTER COMPONENT
// ============================================
function AnimatedCounter({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })
  const springValue = useSpring(0, { stiffness: 50, damping: 20 })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (isInView) {
      springValue.set(value)
    }
  }, [isInView, value, springValue])

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest))
    })
    return unsubscribe
  }, [springValue])

  return (
    <span ref={ref}>
      {prefix}{displayValue}{suffix}
    </span>
  )
}

// ============================================
// TECHNOLOGY CARD COMPONENT
// ============================================
function TechnologyCard({
  tech,
  index
}: {
  tech: typeof technologies[0]
  index: number
}) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = tech.icon

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-[#D2D2D7] overflow-hidden h-full"
        whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }}
        transition={{ duration: 0.3 }}
      >
        {/* Background gradient on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${tech.color}08 0%, transparent 60%)`
          }}
        />

        {/* Year badge */}
        <motion.div
          className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold"
          style={{ backgroundColor: `${tech.color}15`, color: tech.color }}
          whileHover={{ scale: 1.05 }}
        >
          <Calendar className="w-3.5 h-3.5" />
          {tech.year}
        </motion.div>

        {/* New badge for X-Frame */}
        {tech.isNew && (
          <motion.div
            className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#A0845C] text-white text-xs font-bold uppercase tracking-wider"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
          >
            Brevettato
          </motion.div>
        )}

        {/* Icon */}
        <motion.div
          className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-6"
          style={{ backgroundColor: `${tech.color}12` }}
          animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Icon
            className="w-8 h-8 md:w-10 md:h-10"
            style={{ color: tech.color }}
            strokeWidth={1.5}
          />
        </motion.div>

        {/* Content */}
        <div className="relative">
          <h3 className="text-xl md:text-2xl font-bold text-[#1D1D1F] mb-3">
            {tech.name}
          </h3>
          <p className="text-[#86868B] text-sm md:text-base leading-relaxed mb-6">
            {tech.description}
          </p>

          {/* Features list - revealed on hover */}
          <motion.div
            className="space-y-3 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={isHovered ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {tech.features.map((feature, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2 text-sm"
                initial={{ x: -20, opacity: 0 }}
                animate={isHovered ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: tech.color }} />
                <span className="text-[#1D1D1F]">{feature}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Always visible features (compact) */}
          <motion.div
            className="flex flex-wrap gap-2"
            animate={isHovered ? { opacity: 0, height: 0 } : { opacity: 1, height: 'auto' }}
            transition={{ duration: 0.2 }}
          >
            {tech.features.slice(0, 2).map((feature, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs"
                style={{ backgroundColor: `${tech.color}10`, color: tech.color }}
              >
                <CheckCircle2 className="w-3 h-3" />
                {feature.split(' ').slice(0, 2).join(' ')}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Decorative corner */}
        <div
          className="absolute -bottom-16 -right-16 w-40 h-40 rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-500"
          style={{ backgroundColor: tech.color }}
        />
      </motion.div>
    </motion.div>
  )
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function TechnologyEvolution() {
  return (
    <section className="py-20 lg:py-32 px-4 bg-[#F5F5F7] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#A0845C]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#1D1D1F]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">
            La Nostra Evoluzione
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1D1D1F] mt-3">
            Evoluzione{' '}
            <span className="text-[#A0845C]">Tecnologica</span>
          </h2>
          <p className="text-[#86868B] text-lg mt-4 max-w-2xl mx-auto">
            Da costruttori tradizionali a innovatori del settore: tre sistemi costruttivi
            che rappresentano 25 anni di ricerca e sviluppo.
          </p>
        </motion.div>

        {/* Technology Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {technologies.map((tech, index) => (
            <TechnologyCard key={tech.id} tech={tech} index={index} />
          ))}
        </div>

        {/* Evolution Arrow/Timeline (visual connector) */}
        <motion.div
          className="hidden md:flex items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#D2D2D7] to-[#48484A]" />
          <motion.div
            className="w-3 h-3 rounded-full bg-[#48484A]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="flex-1 h-px bg-[#1D1D1F]" />
          <motion.div
            className="w-3 h-3 rounded-full bg-[#1D1D1F]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          />
          <div className="flex-1 h-px bg-gradient-to-r from-[#1D1D1F] to-[#A0845C]" />
          <motion.div
            className="w-4 h-4 rounded-full bg-[#A0845C]"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          />
          <div className="flex-1 h-px bg-gradient-to-r from-[#A0845C] to-transparent" />
        </motion.div>

        {/* Stats Counter Section */}
        <motion.div
          className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-[#D2D2D7]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.3 }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <motion.div
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1D1D1F]"
                  whileHover={{ scale: 1.05, color: '#A0845C' }}
                  transition={{ duration: 0.2 }}
                >
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                  />
                </motion.div>
                <div className="text-[#86868B] text-sm md:text-base mt-2 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
