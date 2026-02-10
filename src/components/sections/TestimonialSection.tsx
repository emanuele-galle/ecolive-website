'use client'

import { useRef, useEffect } from 'react'
import { useInView, useSpring, useMotionValue } from 'framer-motion'
import { Quote, Star, CheckCircle } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const testimonials = [
  {
    id: 1,
    name: 'Marco e Giulia Ferretti',
    project: 'Villa Residenziale, 180 mq',
    location: 'Catanzaro',
    rating: 5,
    quote:
      'Abbiamo scelto Ecolive dopo mesi di ricerca. La professionalita del team e la trasparenza sui costi ci hanno convinto. La casa e stata montata in un giorno, e dopo un anno il comfort e eccezionale: temperatura costante e bollette ridotte del 70%.',
  },
  {
    id: 2,
    name: 'Arch. Paolo Mancini',
    project: 'Progetto Glamping, 8 unita',
    location: 'Sila, Cosenza',
    rating: 5,
    quote:
      'Come architetto, ero scettico sulla prefabbricazione. Il sistema X-Frame ha cambiato la mia prospettiva: precisione costruttiva superiore al tradizionale e tempi di cantiere ridotti drasticamente. I miei clienti sono entusiasti.',
  },
  {
    id: 3,
    name: 'Famiglia De Luca',
    project: 'Casa Passiva, 150 mq',
    location: 'Reggio Calabria',
    rating: 5,
    quote:
      'Volevamo una casa efficiente senza rinunciare al design. Ecolive ha superato ogni aspettativa. In inverno la temperatura resta costante senza quasi accendere il riscaldamento. Un investimento che si ripaga nel tempo.',
  },
]

const stats = [
  { value: 98, suffix: '%', label: 'Clienti Soddisfatti' },
  { value: 40, suffix: '+', label: 'Case Realizzate' },
  { value: 4.9, suffix: '/5', label: 'Rating Medio', isDecimal: true },
]

function StatCounter({
  value,
  suffix,
  isDecimal,
}: {
  value: number
  suffix: string
  isDecimal?: boolean
}) {
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

  const display = isDecimal
    ? value.toFixed(1) + suffix
    : value.toString() + suffix
  return <span ref={ref}>{display}</span>
}

export default function TestimonialSection() {
  return (
    <section className="py-24 lg:py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1D1D1F]">
              Storie di Chi Ha Scelto Ecolive
            </h2>
            <p className="text-[#86868B] text-lg max-w-2xl mx-auto mt-5 leading-relaxed">
              Le esperienze reali dei nostri clienti, dalla consulenza alla consegna
            </p>
            {/* Google Reviews badge */}
            <div className="flex items-center justify-center gap-2 mt-5">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[#FBBC04] text-[#FBBC04]"
                  />
                ))}
              </div>
              <span className="text-[#86868B] text-sm font-medium">
                4.9/5 su Google Reviews
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Testimonial cards - all visible */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <ScrollReveal key={testimonial.id} delay={i * 0.12}>
              <div className="bg-[#F5F5F7] rounded-2xl p-8 h-full flex flex-col">
                {/* Quote icon */}
                <Quote className="w-10 h-10 text-[#A0845C]/20 mb-5 flex-shrink-0" />

                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className={`w-4 h-4 ${
                        j < testimonial.rating
                          ? 'fill-[#A0845C] text-[#A0845C]'
                          : 'text-[#D2D2D7]'
                      }`}
                    />
                  ))}
                </div>

                {/* Quote text */}
                <blockquote className="text-[#1D1D1F] text-base leading-relaxed mb-6 flex-1">
                  &quot;{testimonial.quote}&quot;
                </blockquote>

                {/* Author */}
                <div className="border-t border-[#D2D2D7]/60 pt-5 mt-auto">
                  <div className="font-semibold text-[#1D1D1F]">
                    {testimonial.name}
                  </div>
                  <div className="text-[#86868B] text-sm mt-0.5">
                    {testimonial.project} &middot; {testimonial.location}
                  </div>
                  {/* Verified badge */}
                  <div className="flex items-center gap-1.5 mt-3">
                    <CheckCircle className="w-3.5 h-3.5 text-[#6B8F71]" />
                    <span className="text-[#6B8F71] text-xs font-medium">
                      Progetto verificato
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Stats */}
        <ScrollReveal delay={0.3}>
          <div className="grid grid-cols-3 gap-8 mt-16 pt-10 border-t border-[#D2D2D7]">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#A0845C]">
                  <StatCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    isDecimal={stat.isDecimal}
                  />
                </div>
                <div className="text-[#86868B] text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
