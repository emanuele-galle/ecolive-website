'use client'

import { motion, AnimatePresence, useInView, useSpring, useMotionValue } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionTransition from '@/components/ui/SectionTransition'

const testimonials = [
  {
    id: 1,
    name: 'Cliente Verificato',
    initials: 'CV',
    project: 'Villa Moderna',
    location: 'Catanzaro',
    rating: 5,
    quote: 'La qualita costruttiva e l\'attenzione ai dettagli hanno superato ogni nostra aspettativa. Casa pronta in 28 giorni, esattamente come promesso.',
  },
  {
    id: 2,
    name: 'Cliente Verificato',
    initials: 'CV',
    project: 'Casa Bifamiliare',
    location: 'Cosenza',
    rating: 5,
    quote: 'Processo trasparente dall\'inizio alla fine, nessuna sorpresa sui costi. La casa e efficientissima, in inverno spendiamo pochissimo di riscaldamento.',
  },
  {
    id: 3,
    name: 'Cliente Verificato',
    initials: 'CV',
    project: 'Casa Passiva',
    location: 'Reggio Calabria',
    rating: 5,
    quote: 'Bollette ridotte del 90% rispetto alla nostra vecchia casa! Il comfort abitativo e incredibile: temperatura costante tutto l\'anno.',
  },
]

const stats = [
  { value: 98, suffix: '%', label: 'Clienti Soddisfatti' },
  { value: 40, suffix: '+', label: 'Case Realizzate' },
  { value: 4.9, suffix: '/5', label: 'Rating Medio', isDecimal: true },
]

function StatCounter({ value, suffix, isDecimal }: { value: number; suffix: string; isDecimal?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(value)
  const springValue = useSpring(motionValue, { duration: 2000 })
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true
      motionValue.set(0)
      requestAnimationFrame(() => motionValue.set(value))
    }
  }, [isInView, value, motionValue])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = isDecimal
          ? latest.toFixed(1) + suffix
          : Math.floor(latest).toString() + suffix
      }
    })
    return unsubscribe
  }, [springValue, suffix, isDecimal])

  const display = isDecimal ? value.toFixed(1) + suffix : value.toString() + suffix
  return <span ref={ref}>{display}</span>
}

/* Decorative background pattern */
function BackgroundPattern() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="testimonial-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="1.5" fill="#1E3D30" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#testimonial-grid)" />
      </svg>
    </div>
  )
}

export default function TestimonialSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [isPaused])

  const current = testimonials[currentIndex]

  return (
    <>
      <SectionTransition from="#1E3D30" to="#FAF7F2" variant="wave" height={80} />
      <section
        ref={containerRef}
        className="py-28 lg:py-36 px-6 bg-[#FAF7F2] relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <BackgroundPattern />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Header */}
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E3D30]">
                Cosa Dicono i <span className="text-[#C4704B]">Nostri Clienti</span>
              </h2>
              {/* Google Reviews badge */}
              <div className="flex items-center justify-center gap-2 mt-5">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FBBC04] text-[#FBBC04]" />
                  ))}
                </div>
                <span className="text-[#6B6560] text-sm font-medium">4.9/5 su Google Reviews</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Testimonial card */}
          <ScrollReveal>
            <div className="relative">
              {/* Navigation - Desktop */}
              <button
                onClick={() => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="hidden lg:flex absolute -left-16 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-[#E5E0D8] items-center justify-center text-[#6B6560] hover:border-[#C4704B] hover:text-[#C4704B] hover:bg-[#C4704B]/5 transition-all duration-300"
                aria-label="Precedente"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonials.length)}
                className="hidden lg:flex absolute -right-16 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-[#E5E0D8] items-center justify-center text-[#6B6560] hover:border-[#C4704B] hover:text-[#C4704B] hover:bg-[#C4704B]/5 transition-all duration-300"
                aria-label="Successiva"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-[#E5E0D8] relative overflow-hidden"
                >
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C4704B]/5 to-transparent rounded-bl-[100px]" />

                  <Quote className="w-10 h-10 text-[#C4704B]/20 mb-6" />

                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < current.rating ? 'fill-[#C4704B] text-[#C4704B]' : 'text-[#E5E0D8]'}`}
                      />
                    ))}
                  </div>

                  <blockquote className="text-xl md:text-2xl text-[#1E3D30] leading-relaxed mb-8 font-serif italic">
                    &quot;{current.quote}&quot;
                  </blockquote>

                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1E3D30] to-[#2D5A47] flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {current.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-[#1E3D30]">{current.name}</div>
                      <div className="text-[#6B6560] text-sm">{current.project} &middot; {current.location}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </ScrollReveal>

          {/* Dots */}
          <div className="flex justify-center gap-2.5 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-[#C4704B] w-8' : 'bg-[#E5E0D8] w-2.5 hover:bg-[#D4C8BC]'
                }`}
                aria-label={`Testimonianza ${index + 1}`}
              />
            ))}
          </div>

          {/* Stats */}
          <ScrollReveal delay={0.3}>
            <div className="grid grid-cols-3 gap-8 mt-16 pt-10 border-t border-[#E5E0D8]">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-[#C4704B]">
                    <StatCounter value={stat.value} suffix={stat.suffix} isDecimal={stat.isDecimal} />
                  </div>
                  <div className="text-[#6B6560] text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
