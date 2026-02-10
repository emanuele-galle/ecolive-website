'use client'

import { motion, useInView, useSpring, useMotionValue } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { Zap, Clock } from 'lucide-react'

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
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
      if (ref.current) ref.current.textContent = Math.round(latest).toString() + suffix
    })
    return unsubscribe
  }, [springValue, suffix])

  return <span ref={ref}>{value}{suffix}</span>
}

export default function AssemblyShowcase() {
  return (
    <section className="py-24 lg:py-32 bg-[#1E3D30]">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">
            Montaggio <span className="text-[#C4704B]">Spettacolare</span>
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto mt-4">
            Precisione, velocita e sicurezza in ogni fase
          </p>
        </motion.div>

        {/* Comparison cards */}
        <div className="grid sm:grid-cols-2 gap-6">
          {/* Ecolive */}
          <motion.div
            className="bg-gradient-to-br from-[#C4704B] to-[#A85A3A] rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-white/80 text-sm uppercase tracking-wider font-medium">Ecolive X-Frame</span>
            </div>
            <div className="text-5xl md:text-6xl font-bold text-white mb-2">
              <AnimatedNumber value={1} /> Giorno
            </div>
            <p className="text-white/70 text-sm mb-6">
              Dalla prima parete al tetto finito, tutto in una giornata
            </p>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white rounded-full"
                initial={{ width: '0%' }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 1.2 }}
              />
            </div>
          </motion.div>

          {/* Tradizionale */}
          <motion.div
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                <Clock className="w-6 h-6 text-white/40" />
              </div>
              <span className="text-white/50 text-sm uppercase tracking-wider font-medium">Costruzione Tradizionale</span>
            </div>
            <div className="text-5xl md:text-6xl font-bold text-white/60 mb-2">
              <AnimatedNumber value={90} suffix="+" /> Giorni
            </div>
            <p className="text-white/40 text-sm mb-6">
              Mesi di cantiere, intemperie, ritardi e imprevisti
            </p>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white/20 rounded-full"
                initial={{ width: '0%' }}
                whileInView={{ width: '1.5%' }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 1 }}
              />
            </div>
          </motion.div>
        </div>

        <motion.p
          className="text-center text-white/40 text-sm mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          100x piu veloce della costruzione tradizionale &middot; Zero sprechi &middot; Cantiere pulito
        </motion.p>
      </div>
    </section>
  )
}
