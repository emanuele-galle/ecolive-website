'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Star, Quote, MapPin } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  role: string
  location: string
  rating: number
  quote: string
  initials: string
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
    initials: 'MB'
  },
  {
    id: 2,
    name: 'Francesca Romano',
    role: 'Resort Manager',
    location: 'Puglia',
    rating: 5,
    quote: 'Qualita costruttiva eccezionale e tempi di consegna rispettati al giorno. Il design si integra perfettamente con il paesaggio della nostra tenuta.',
    initials: 'FR'
  },
  {
    id: 3,
    name: 'Alessandro Verdi',
    role: 'Imprenditore Turistico',
    location: 'Calabria',
    rating: 5,
    quote: 'Investimento ripagato in meno di due stagioni. I costi di manutenzione sono minimi e il comfort offerto ai clienti e di livello superiore.',
    initials: 'AV'
  }
]

export default function GlampingTestimonials({ color }: GlampingTestimonialsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const
      }
    }
  }

  return (
    <section ref={containerRef} className="py-20 lg:py-28 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="text-sm font-semibold uppercase tracking-wider"
            style={{ color }}
          >
            Testimonianze
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1E3D30] mt-2 mb-4">
            Cosa dicono i nostri <span style={{ color }}>clienti</span>
          </h2>
          <p className="text-[#6B6560] max-w-xl mx-auto">
            Storie di successo da chi ha scelto le nostre strutture glamping
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="relative p-8 bg-gradient-to-br from-[#FAF7F2] to-white rounded-3xl border border-[#E8E0D5] group"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6">
                <Quote
                  className="w-10 h-10 opacity-10 group-hover:opacity-20 transition-opacity"
                  style={{ color }}
                />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <Star
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-[#E8E0D5]'
                      }`}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Quote text */}
              <blockquote className="text-[#1E3D30] leading-relaxed mb-8 text-lg">
                &quot;{testimonial.quote}&quot;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${color}, ${color}dd)`
                  }}
                >
                  {testimonial.initials}
                </div>

                <div>
                  <div className="font-semibold text-[#1E3D30]">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-[#6B6560]">
                    {testimonial.role}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#6B6560]/70 mt-1">
                    <MapPin className="w-3 h-3" />
                    <span>{testimonial.location}</span>
                  </div>
                </div>
              </div>

              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 100%, ${color}10, transparent 70%)`
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-8 mt-16 pt-8 border-t border-[#E8E0D5]"
        >
          <div className="text-center">
            <div className="text-3xl font-bold" style={{ color }}>50+</div>
            <div className="text-sm text-[#6B6560]">Strutture realizzate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold" style={{ color }}>98%</div>
            <div className="text-sm text-[#6B6560]">Clienti soddisfatti</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold" style={{ color }}>4.9</div>
            <div className="text-sm text-[#6B6560]">Rating medio</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
