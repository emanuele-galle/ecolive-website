'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Star, Quote, MapPin, TrendingUp, Users, Award } from 'lucide-react'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

interface Testimonial {
  id: number
  name: string
  role: string
  location: string
  rating: number
  quote: string
  initials: string
  highlight: string
}

interface GlampingTestimonialsProps {
  color: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Marco Bianchi',
    role: 'Proprietario Agriturismo',
    location: 'Toscana',
    rating: 5,
    quote: 'Le strutture glamping di Ecolive hanno trasformato il nostro agriturismo. Gli ospiti sono entusiasti e le prenotazioni sono raddoppiate in una sola stagione.',
    initials: 'MB',
    highlight: 'Prenotazioni +100%'
  },
  {
    id: 2,
    name: 'Francesca Romano',
    role: 'Resort Manager',
    location: 'Puglia',
    rating: 5,
    quote: 'Qualità costruttiva eccezionale e tempi di consegna rispettati al giorno. Il design si integra perfettamente con il paesaggio della nostra tenuta.',
    initials: 'FR',
    highlight: 'Consegna puntuale'
  },
  {
    id: 3,
    name: 'Alessandro Verdi',
    role: 'Imprenditore Turistico',
    location: 'Calabria',
    rating: 5,
    quote: 'Investimento ripagato in meno di due stagioni. I costi di manutenzione sono minimi e il comfort offerto ai clienti è di livello superiore.',
    initials: 'AV',
    highlight: 'ROI in 2 stagioni'
  }
]

const trustStats = [
  { icon: Award, value: 50, suffix: '+', label: 'Strutture realizzate' },
  { icon: Users, value: 98, suffix: '%', label: 'Clienti soddisfatti' },
  { icon: TrendingUp, value: 4, suffix: '.9', label: 'Rating medio' },
]

export default function GlampingTestimonials({ color }: GlampingTestimonialsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <section ref={containerRef} className="py-20 lg:py-28 px-4 bg-[#F5F5F7] relative overflow-hidden">
      {/* Large decorative quote watermark with floating animation */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        animate={{
          rotate: [0, 5, -3, 0],
          scale: [1, 1.05, 0.98, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Quote
          className="w-[350px] h-[350px] md:w-[500px] md:h-[500px]"
          style={{ color, opacity: 0.03 }}
        />
      </motion.div>

      {/* Animated floating shapes */}
      <motion.div
        className="absolute top-10 right-0 w-80 h-80 rounded-full blur-3xl"
        style={{ backgroundColor: `${color}08` }}
        animate={{ x: [0, 40, -20, 0], y: [0, 50, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-10 w-64 h-64 rounded-full blur-3xl"
        style={{ backgroundColor: '#1D1D1F08' }}
        animate={{ x: [0, -35, 20, 0], y: [0, -30, 0], scale: [1, 0.8, 1.15, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Crossing animated lines */}
      <motion.div
        className="absolute top-1/4 left-0 w-full h-[1px] pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${color}10, transparent)` }}
        animate={{ x: ['-50%', '50%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header - Decorative lines variant */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          {/* Decorative line above title */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              className="h-[1px] w-12 md:w-20 bg-[#EDE6DB]"
              initial={{ scaleX: 0, originX: 1 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            />
            <motion.div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: '#A0845C' }}
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
            />
            <motion.div
              className="h-[1px] w-12 md:w-20 bg-[#EDE6DB]"
              initial={{ scaleX: 0, originX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-[#1D1D1F] mb-4">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              Storie di{' '}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35 }}
              style={{ color }}
            >
              successo
            </motion.span>
          </h2>

          {/* Decorative line below title */}
          <div className="flex items-center justify-center gap-4 mt-4 mb-4">
            <motion.div
              className="h-[1px] w-8 md:w-14 bg-[#EDE6DB]"
              initial={{ scaleX: 0, originX: 1 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            />
            <motion.div
              className="h-[1px] w-6 rounded-full"
              style={{ backgroundColor: '#A0845C' }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.4 }}
            />
            <motion.div
              className="h-[1px] w-8 md:w-14 bg-[#EDE6DB]"
              initial={{ scaleX: 0, originX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="text-[#86868B] max-w-xl mx-auto text-lg"
          >
            Chi ha scelto Ecolive per le proprie strutture glamping
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: 10 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : {}}
              transition={{ delay: i * 0.18, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="relative group"
              style={{ perspective: 800 }}
            >
              {/* Animated border on hover */}
              <motion.div
                className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${color}60, transparent 50%, ${color}30)`,
                }}
              />

              {/* Star border effect */}
              <div className="absolute -inset-[1px] rounded-3xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <motion.div
                  className="absolute w-[300%] h-[50%] bottom-[-11px] right-[-250%] rounded-full"
                  style={{ background: `radial-gradient(circle, ${color}80, transparent 10%)` }}
                  animate={{ x: ['0%', '-100%'] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute w-[300%] h-[50%] top-[-10px] left-[-250%] rounded-full"
                  style={{ background: `radial-gradient(circle, ${color}80, transparent 10%)` }}
                  animate={{ x: ['0%', '100%'] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                />
              </div>

              <div className="relative p-8 bg-white rounded-3xl border border-[#EDE6DB]/60 shadow-sm group-hover:shadow-2xl transition-all duration-500 overflow-hidden">
                {/* Ambient colored glow */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 100%, ${color}10, transparent 60%)`,
                    boxShadow: `inset 0 -20px 60px ${color}08`
                  }}
                />

                {/* Quote icon with rotation */}
                <motion.div
                  className="absolute top-6 right-6"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Quote
                    className="w-14 h-14 opacity-[0.05] group-hover:opacity-[0.15] transition-opacity duration-700"
                    style={{ color }}
                  />
                </motion.div>

                {/* Highlight badge */}
                <motion.div
                  initial={{ opacity: 0, x: -15, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, type: 'spring', stiffness: 300 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-5"
                  style={{ color, backgroundColor: `${color}12` }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  >
                    <TrendingUp className="w-3 h-3" />
                  </motion.div>
                  {testimonial.highlight}
                </motion.div>

                {/* Stars with dramatic entrance */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, scale: 0, rotate: -180, y: -10 }}
                      animate={isInView ? { opacity: 1, scale: 1, rotate: 0, y: 0 } : {}}
                      transition={{
                        delay: 0.3 + j * 0.1 + i * 0.12,
                        type: 'spring',
                        stiffness: 400,
                        damping: 15
                      }}
                    >
                      <Star
                        className={`w-4.5 h-4.5 ${
                          j < testimonial.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-[#EDE6DB]'
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Quote text */}
                <blockquote className="text-[#1D1D1F] leading-relaxed mb-8 text-[1.05rem]">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Author with enhanced avatar */}
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                    className="relative"
                  >
                    {/* Animated ring around avatar */}
                    <motion.div
                      className="absolute -inset-1 rounded-full"
                      style={{
                        background: `conic-gradient(from 0deg, ${color}, transparent, ${color})`,
                      }}
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    />
                    <div
                      className="relative w-[52px] h-[52px] rounded-full flex items-center justify-center text-white font-bold text-base shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${color}, ${color}cc)`,
                      }}
                    >
                      {testimonial.initials}
                    </div>
                  </motion.div>

                  <div>
                    <div className="font-semibold text-[#1D1D1F]">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-[#86868B]">
                      {testimonial.role}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[#86868B]/70 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      <span>{testimonial.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Stats with AnimatedCounter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="mt-16"
        >
          <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-2xl mx-auto">
            {trustStats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 + i * 0.12, type: 'spring', stiffness: 200 }}
                  whileHover={{ y: -6, scale: 1.03, transition: { duration: 0.2 } }}
                  className="text-center p-4 md:p-6 bg-white rounded-2xl border border-[#EDE6DB]/60 shadow-sm hover:shadow-xl transition-all group/stat relative overflow-hidden"
                >
                  {/* Animated background on hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at 50% 100%, ${color}10, transparent 70%)`
                    }}
                  />

                  <div className="relative z-10">
                    <motion.div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                      style={{ backgroundColor: `${color}12` }}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <Icon className="w-5 h-5" style={{ color }} />
                    </motion.div>
                    <div className="text-3xl md:text-4xl font-bold" style={{ color }}>
                      <AnimatedCounter
                        value={stat.value}
                        suffix={stat.suffix}
                        className="text-3xl md:text-4xl font-bold"
                        style={{ color } as React.CSSProperties}
                      />
                    </div>
                    <div className="text-xs md:text-sm text-[#86868B] mt-1">{stat.label}</div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
