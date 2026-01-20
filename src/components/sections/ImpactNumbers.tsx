'use client'

import { motion, useInView, useSpring, useMotionValue } from 'framer-motion'
import { useRef, useEffect } from 'react'

function AnimatedCounter({
  value,
  suffix = '',
  duration = 2
}: {
  value: number
  suffix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: duration * 1000 })
  const isInView = useInView(ref, { once: false, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, value, motionValue])

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toString() + suffix
      }
    })
    return unsubscribe
  }, [springValue, suffix])

  return <span ref={ref}>0{suffix}</span>
}

export default function ImpactNumbers() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })

  const stats = [
    { value: 25, suffix: '+', label: 'Anni di esperienza', description: 'Leader dal 1999' },
    { value: 30, suffix: '', label: 'Giorni', description: 'Casa pronta in un mese' },
    { value: 4, suffix: '', label: 'Classe A', description: 'Massima efficienza energetica' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.9 }
    }
  }

  return (
    <section className="py-24 lg:py-32 px-4 bg-[#051923] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Glow effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#e85d04]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1b4965]/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10" ref={containerRef}>
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <h2 className="font-inter text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            I Numeri che <span className="text-[#e85d04]">Contano</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Oltre 25 anni di esperienza nel costruire case ecosostenibili
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className={`relative group ${index === 1 ? 'md:-mt-8' : ''}`}
            >
              <div className="relative p-8 lg:p-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden">
                {/* Glow effect on hover */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#e85d04]/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="font-inter text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-4">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xl font-semibold text-[#e85d04] mb-2">
                    {stat.label}
                  </div>
                  <div className="text-white/50">
                    {stat.description}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
