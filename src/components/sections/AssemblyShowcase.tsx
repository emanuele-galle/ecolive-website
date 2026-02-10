'use client'

import { motion, useInView, useSpring, useMotionValue } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { Check } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

function AnimatedNumber({
  value,
  suffix = '',
}: {
  value: number
  suffix?: string
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
      if (ref.current)
        ref.current.textContent = Math.round(latest).toString() + suffix
    })
    return unsubscribe
  }, [springValue, suffix])

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  )
}

const advantages = [
  {
    title: 'Montaggio struttura in 1 giorno',
    description:
      'Dalla prima parete al tetto finito, tutto in una singola giornata di lavoro.',
    hasProgressBar: true,
  },
  {
    title: 'Precisione millimetrica',
    description:
      'Pre-taglio CNC in stabilimento per incastri perfetti e zero errori in cantiere.',
    hasProgressBar: false,
  },
  {
    title: 'Zero sprechi di materiale',
    description:
      'Produzione controllata in fabbrica con ottimizzazione di ogni singolo componente.',
    hasProgressBar: false,
  },
  {
    title: 'Certificazione sismica',
    description:
      'Struttura testata e certificata per la massima resistenza alle sollecitazioni.',
    hasProgressBar: false,
  },
]

const stats = [
  { value: 1, suffix: '', label: 'Montaggio struttura completa', display: '1 Giorno' },
  { value: 90, suffix: 'x', label: 'Piu veloce del tradizionale', display: '90x' },
  { value: 100, suffix: '%', label: 'Materiali certificati PEFC', display: '100%' },
]

export default function AssemblyShowcase() {
  return (
    <section className="py-24 lg:py-32 bg-[#1D1D1F] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Tecnologia X-Frame
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mt-5 leading-relaxed">
              Il nostro sistema costruttivo brevettato che rivoluziona i tempi e la
              qualita dell&apos;edilizia in legno
            </p>
          </div>
        </ScrollReveal>

        {/* Split layout: video + advantages */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-20">
          {/* Left: Video placeholder */}
          <ScrollReveal direction="left">
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-[#48484A] flex items-center justify-center">
              <div className="text-center px-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white/60"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-white/40 text-sm font-medium">
                  Video montaggio - Coming soon
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Advantages list */}
          <div className="space-y-6">
            {advantages.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-[#A0845C]/20 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-[#A0845C]" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg mb-1">
                      {item.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {item.description}
                    </p>
                    {item.hasProgressBar && (
                      <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-[#A0845C] rounded-full"
                          initial={{ width: '0%' }}
                          whileInView={{ width: '100%' }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4, duration: 1.2, ease: 'easeOut' }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <ScrollReveal delay={0.2}>
          <div className="grid grid-cols-3 gap-6 lg:gap-10 pt-10 border-t border-white/10">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#A0845C]">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  {stat.value === 1 && (
                    <span className="text-2xl md:text-3xl ml-1">Giorno</span>
                  )}
                </div>
                <p className="text-white/60 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
