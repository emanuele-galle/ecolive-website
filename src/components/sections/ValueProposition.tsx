'use client'

import { motion, useInView, useSpring, useMotionValue } from 'framer-motion'
import { useRef, useEffect } from 'react'

const stats = [
  { value: 25, suffix: '+', label: 'Anni di Esperienza', description: 'Nel settore bioedilizia' },
  { value: 40, suffix: '+', label: 'Case Realizzate', description: 'In tutta Italia' },
  { value: 30, suffix: '', label: 'Anni di Garanzia', description: 'Sulla struttura portante' },
  { value: 70, suffix: '%', label: 'Risparmio Energetico', description: 'Classe energetica A4' },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(value)
  const springValue = useSpring(motionValue, { duration: 2000 })
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true
      motionValue.set(0)
      // Small delay then animate to real value
      requestAnimationFrame(() => motionValue.set(value))
    }
  }, [isInView, value, motionValue])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toString() + suffix
      }
    })
    return unsubscribe
  }, [springValue, suffix])

  // Show real value immediately as fallback - animation overwrites it
  return <span ref={ref}>{value}{suffix}</span>
}

export default function ValueProposition() {
  return (
    <section className="py-24 lg:py-32 bg-[#FAF7F2]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1E3D30]">
            Perche Scegliere <span className="text-[#C4704B]">Ecolive</span>
          </h2>
          <p className="text-[#6B6560] text-lg max-w-2xl mx-auto mt-4">
            Oltre 25 anni di esperienza nella bioedilizia per case che durano nel tempo
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="text-5xl md:text-6xl font-bold text-[#C4704B] mb-2">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-lg font-semibold text-[#1E3D30] mb-1">{stat.label}</div>
              <div className="text-sm text-[#6B6560]">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
