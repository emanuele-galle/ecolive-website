'use client'

import { motion, useInView, useSpring, useMotionValue } from 'framer-motion'
import { useRef, useEffect, useMemo } from 'react'
import { Zap, Clock } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionTransition from '@/components/ui/SectionTransition'

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

/* Floating decorative shapes */
function FloatingShapes() {
  const shapes = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 40 + 20,
        duration: Math.random() * 10 + 15,
        delay: Math.random() * 5,
        rotate: Math.random() * 360,
      })),
    []
  )

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {shapes.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-lg border border-white/5"
          style={{
            width: s.size,
            height: s.size,
            left: `${s.x}%`,
            top: `${s.y}%`,
            rotate: s.rotate,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [s.rotate, s.rotate + 90, s.rotate],
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export default function AssemblyShowcase() {
  return (
    <>
      <SectionTransition from="#FAF7F2" to="#1E3D30" variant="wave" height={80} />
      <section className="py-28 lg:py-36 bg-[#1E3D30] relative overflow-hidden">
        <FloatingShapes />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                Montaggio <span className="text-[#C4704B]">Spettacolare</span>
              </h2>
              <p className="text-white/60 text-lg max-w-xl mx-auto mt-5 leading-relaxed">
                Precisione, velocita e sicurezza in ogni fase
              </p>
            </div>
          </ScrollReveal>

          {/* Comparison cards */}
          <div className="grid sm:grid-cols-[1fr,auto,1fr] gap-4 sm:gap-0 items-center">
            {/* Ecolive */}
            <ScrollReveal direction="left">
              <motion.div
                className="bg-gradient-to-br from-[#C4704B] to-[#A85A3A] rounded-2xl p-8 relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 3 }}
                  />
                </div>

                <div className="relative z-10">
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

                  {/* Enhanced progress bar with shimmer */}
                  <div className="h-3 bg-white/20 rounded-full overflow-hidden relative">
                    <motion.div
                      className="h-full bg-white rounded-full relative overflow-hidden"
                      initial={{ width: '0%' }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4, duration: 1.2 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
                      />
                    </motion.div>
                  </div>
                  <p className="text-white/50 text-xs mt-2 text-right">100% completato</p>
                </div>
              </motion.div>
            </ScrollReveal>

            {/* VS Badge */}
            <ScrollReveal delay={0.2}>
              <div className="flex items-center justify-center sm:px-4">
                <div className="w-14 h-14 rounded-full bg-[#C4704B]/20 border-2 border-[#C4704B]/40 flex items-center justify-center">
                  <span className="text-[#C4704B] font-bold text-sm">VS</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Tradizionale */}
            <ScrollReveal direction="right">
              <GlassCard intensity="light" className="p-8 h-full">
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
                <p className="text-white/30 text-xs mt-2 text-right">~1% completato</p>
              </GlassCard>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.5}>
            <p className="text-center text-white/40 text-sm mt-14">
              100x piu veloce della costruzione tradizionale &middot; Zero sprechi &middot; Cantiere pulito
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
