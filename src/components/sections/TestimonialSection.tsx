'use client'

import { motion, useInView, AnimatePresence, useSpring, useMotionValue } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
  {
    id: 1,
    name: 'Marco Rossi',
    initials: 'MR',
    project: 'Villa Moderna',
    location: 'Catanzaro',
    rating: 5,
    quote: 'La qualita costruttiva e l\'attenzione ai dettagli di Ecolive hanno superato ogni nostra aspettativa. Casa pronta in 28 giorni, esattamente come promesso. Il team e stato sempre disponibile e professionale.',
  },
  {
    id: 2,
    name: 'Famiglia Greco',
    initials: 'FG',
    project: 'Casa Bifamiliare',
    location: 'Cosenza',
    rating: 5,
    quote: 'Processo trasparente dall\'inizio alla fine, nessuna sorpresa sui costi. La casa e efficientissima, in inverno spendiamo pochissimo di riscaldamento. Consigliatissimi a chi cerca qualita vera.',
  },
  {
    id: 3,
    name: 'Elena Martino',
    initials: 'EM',
    project: 'Casa Passiva',
    location: 'Reggio Calabria',
    rating: 5,
    quote: 'Bollette ridotte del 90% rispetto alla nostra vecchia casa! Il comfort abitativo e incredibile: temperatura costante tutto l\'anno senza quasi usare riscaldamento o aria condizionata.',
  },
]

const stats = [
  { value: 98, suffix: '%', label: 'Clienti Soddisfatti' },
  { value: 40, suffix: '+', label: 'Case Realizzate' },
  { value: 4.9, suffix: '/5', label: 'Rating Medio', isDecimal: true },
]

function AnimatedCounter({
  value,
  suffix = '',
  isDecimal = false,
}: {
  value: number
  suffix?: string
  isDecimal?: boolean
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: 2000 })
  const isInView = useInView(ref, { once: false, margin: "-50px" })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, value, motionValue])

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = isDecimal
          ? latest.toFixed(1) + suffix
          : Math.floor(latest).toString() + suffix
      }
    })
    return unsubscribe
  }, [springValue, suffix, isDecimal])

  return <span ref={ref}>0{suffix}</span>
}

export default function TestimonialSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Auto-play carousel
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isPaused])

  const goTo = (index: number) => setCurrentIndex(index)
  const goNext = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section
      ref={containerRef}
      className="py-24 lg:py-32 px-4 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative blurs - solo ultrawide */}
      <div className="hidden 3xl:block absolute top-20 -left-32 w-[500px] h-[500px] bg-[#2D5A47]/10 rounded-full blur-3xl z-10" />
      <div className="hidden 3xl:block absolute bottom-20 -right-32 w-[450px] h-[450px] bg-[#C4704B]/10 rounded-full blur-3xl z-10" />

      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/casa-value.jpg"
          alt="Casa Ecolive"
          fill
          className="object-cover"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1E3D30]/95 via-[#1E3D30]/90 to-[#2D5A47]/85" />

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Decorative blurs */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#C4704B]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#C4704B]/10 rounded-full blur-3xl" />

      <div className="max-w-5xl 3xl:max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <span className="text-[#C4704B] font-semibold text-sm uppercase tracking-wider">
            Testimonianze
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            Cosa Dicono i <span className="text-[#C4704B]">Nostri Clienti</span>
          </h2>
        </motion.div>

        {/* Testimonial Card */}
        <div className="relative">
          {/* Navigation Arrows - Desktop */}
          <button
            onClick={goPrev}
            className="hidden lg:flex absolute -left-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all z-10"
            aria-label="Testimonianza precedente"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goNext}
            className="hidden lg:flex absolute -right-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all z-10"
            aria-label="Testimonianza successiva"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.9 }}
              className="relative p-8 md:p-12 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-12 h-12 text-[#C4704B]/30" />

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Star
                      className={`w-5 h-5 ${
                        i < currentTestimonial.rating
                          ? 'fill-[#C4704B] text-[#C4704B]'
                          : 'text-white/20'
                      }`}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Quote Text */}
              <blockquote className="text-xl md:text-2xl lg:text-3xl text-white leading-relaxed mb-8 italic font-light">
                &quot;{currentTestimonial.quote}&quot;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C4704B] to-[#A85A3A] flex items-center justify-center text-white font-bold text-xl border-2 border-white/20">
                  {currentTestimonial.initials}
                </div>

                <div>
                  <div className="text-lg font-semibold text-white">
                    {currentTestimonial.name}
                  </div>
                  <div className="text-white/60">
                    {currentTestimonial.project} • {currentTestimonial.location}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-[#C4704B] w-8'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Vai alla testimonianza ${index + 1}`}
            />
          ))}
        </div>

        {/* Stats Bar */}
        <motion.div
          className="grid grid-cols-3 gap-4 md:gap-8 mt-16 pt-8 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.9 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-[#C4704B]">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  isDecimal={stat.isDecimal}
                />
              </div>
              <div className="text-white/60 text-sm mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
