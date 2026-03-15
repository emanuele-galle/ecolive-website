'use client'

import CountUp from '@/components/ui/CountUp'
import { motion } from 'framer-motion'

const stats = [
  {
    value: 7,
    suffix: '',
    bg: '7',
    label: 'Giorni di Montaggio',
    description: 'Struttura completa montata in 7 giorni lavorativi',
  },
  {
    value: 95,
    suffix: '%',
    bg: '95',
    label: 'Prodotto in Laboratorio',
    description: 'Pareti, solai e coperture arrivano già finiti',
  },
  {
    value: 50,
    suffix: '',
    bg: '50',
    label: 'Anni di Garanzia',
    description: 'Sulla struttura portante. Durabilità eterna.',
  },
  {
    value: 30,
    suffix: '',
    bg: '30',
    label: 'Giorni Chiavi in Mano',
    description: 'Casa abitabile completa di impianti e finiture',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * i, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
}

const borderVariants = {
  hidden: { scaleX: 0 },
  visible: (i: number) => ({
    scaleX: 1,
    transition: { delay: 0.15 * i + 0.3, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
}

export default function ValueProposition() {
  return (
    <section className="relative py-24 lg:py-36 bg-[#1D1D1F] overflow-hidden">
      {/* Grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Left-aligned header */}
        <motion.div
          className="mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold text-[#A0845C] uppercase tracking-[0.2em] mb-3">
            I numeri che contano
          </p>
          <p className="text-lg text-white/50 font-normal">
            Velocità, precisione, durabilità
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="relative bg-[#1D1D1F] p-10 lg:p-14 overflow-hidden"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              custom={i}
            >
              {/* Animated gold top border */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-px bg-[#A0845C] origin-left"
                variants={borderVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                custom={i}
              />

              {/* Giant background number */}
              <span
                className="pointer-events-none select-none absolute -right-4 -bottom-6 text-[8rem] md:text-[10rem] lg:text-[12rem] font-bold leading-none text-white/[0.04]"
                style={{ fontFeatureSettings: '"tnum"' }}
                aria-hidden
              >
                {stat.bg}
              </span>

              {/* Foreground content */}
              <div className="relative">
                <div
                  className="text-6xl md:text-7xl lg:text-8xl font-bold text-[#A0845C] mb-4"
                  style={{ fontFeatureSettings: '"tnum"' }}
                >
                  <CountUp to={stat.value} suffix={stat.suffix} duration={2.5} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1 tracking-tight">
                  {stat.label}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed max-w-xs">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
