'use client'

import { motion, useInView, useSpring, useMotionValue } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Clock, Zap, Shield, CloudSun, Play } from 'lucide-react'

// AnimatedNumber component per counter
function AnimatedNumber({
  value,
  suffix = '',
  duration = 2,
}: {
  value: number
  suffix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: duration * 1000 })
  const isInView = useInView(ref, { once: false, margin: "-50px" })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, value, motionValue])

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest))
    })
    return unsubscribe
  }, [springValue])

  return (
    <span ref={ref}>
      {displayValue}{suffix}
    </span>
  )
}

// Timeline data
const timelineSteps = [
  {
    time: '07:00',
    label: 'Arrivo squadra',
    description: 'Il team arriva sul cantiere, tutto e pronto',
  },
  {
    time: '07:30',
    label: 'Struttura portante',
    description: 'I primi pannelli vengono posizionati',
  },
  {
    time: '12:00',
    label: 'Pareti complete',
    description: 'Tutte le pareti perimetrali sono montate',
  },
  {
    time: '15:00',
    label: 'Tetto posato',
    description: 'La copertura e installata e fissata',
  },
  {
    time: '18:00',
    label: 'Casa chiusa',
    description: 'Struttura completa, pronta per finiture',
  },
]

// Key features
const features = [
  {
    icon: Clock,
    title: '30 Minuti',
    subtitle: 'Struttura portante',
    description: 'I pannelli prefabbricati vengono posizionati con precisione millimetrica',
  },
  {
    icon: Zap,
    title: '1 Giorno',
    subtitle: 'Casa completa',
    description: 'Dalla prima parete al tetto finito, tutto in una giornata',
  },
  {
    icon: CloudSun,
    title: 'Ogni Stagione',
    subtitle: 'Montaggio garantito',
    description: 'Basta una giornata senza pioggia per completare il montaggio',
  },
  {
    icon: Shield,
    title: '100% Sicuro',
    subtitle: 'Fasi sincronizzate',
    description: 'Ogni fase e pianificata per massima sicurezza del cantiere',
  },
]

export default function AssemblyShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })
  const [activeStep, setActiveStep] = useState(0)

  // Auto-advance timeline
  useEffect(() => {
    if (!isInView) return
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % timelineSteps.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [isInView])

  return (
    <section
      ref={containerRef}
      className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-[#1E3D30] via-[#2D5A47] to-[#1E3D30]"
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        {/* Gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#C4704B]/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#C4704B]/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2D5A47]/30 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Play className="w-4 h-4 text-[#C4704B]" />
            <span className="text-white/90 text-xs sm:text-sm font-medium uppercase tracking-wider">
              Il Giorno del Montaggio
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
            Montaggio{' '}
            <span className="text-[#C4704B]">Spettacolare</span>
          </h2>

          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto mt-4">
            Quando la casa arriva sul cantiere, il montaggio diventa uno spettacolo.
            Precisione, velocita e sicurezza in ogni fase.
          </p>
        </motion.div>

        {/* Hero Numbers */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-white/10 text-center group hover:bg-white/10 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#C4704B] to-[#A85A3A] flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  {feature.title}
                </h3>
                <p className="text-[#C4704B] text-sm font-medium mb-2">{feature.subtitle}</p>
                <p className="text-white/50 text-xs sm:text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Timeline visual */}
        <motion.div
          className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-white/10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          {/* Timeline header */}
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Una Giornata Tipo
            </h3>
            <div className="hidden sm:flex items-center gap-2 text-white/50 text-sm">
              <Clock className="w-4 h-4" />
              <span>Timeline automatica</span>
            </div>
          </div>

          {/* Timeline steps */}
          <div className="relative">
            {/* Progress line */}
            <div className="absolute left-[22px] sm:left-[30px] top-0 bottom-0 w-0.5 bg-white/10">
              <motion.div
                className="w-full bg-gradient-to-b from-[#C4704B] to-[#E8956B]"
                initial={{ height: '0%' }}
                animate={{ height: `${((activeStep + 1) / timelineSteps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <div className="space-y-6">
              {timelineSteps.map((step, index) => (
                <motion.div
                  key={step.time}
                  className={`
                    relative flex items-start gap-4 sm:gap-6 pl-2 cursor-pointer
                    ${index <= activeStep ? 'opacity-100' : 'opacity-40'}
                  `}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: index <= activeStep ? 1 : 0.4, x: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  onClick={() => setActiveStep(index)}
                >
                  {/* Time dot */}
                  <div className={`
                    relative z-10 w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0
                    transition-all duration-300
                    ${index === activeStep
                      ? 'bg-gradient-to-br from-[#C4704B] to-[#A85A3A] shadow-lg shadow-[#C4704B]/30'
                      : index < activeStep
                      ? 'bg-[#2D5A47]'
                      : 'bg-white/10'
                    }
                  `}>
                    <span className={`
                      font-bold text-xs sm:text-sm
                      ${index <= activeStep ? 'text-white' : 'text-white/50'}
                    `}>
                      {step.time}
                    </span>
                    {index === activeStep && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-[#C4704B]"
                        animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1 sm:pt-2">
                    <h4 className={`
                      font-bold text-base sm:text-lg transition-colors
                      ${index === activeStep ? 'text-[#C4704B]' : 'text-white'}
                    `}>
                      {step.label}
                    </h4>
                    <p className="text-white/60 text-sm mt-1">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Timeline dots navigation (mobile) */}
          <div className="flex justify-center gap-2 mt-8 sm:hidden">
            {timelineSteps.map((_, index) => (
              <button
                key={index}
                className={`
                  w-2 h-2 rounded-full transition-all
                  ${index === activeStep ? 'bg-[#C4704B] w-6' : 'bg-white/20'}
                `}
                onClick={() => setActiveStep(index)}
              />
            ))}
          </div>
        </motion.div>

        {/* Comparison bar */}
        <motion.div
          className="mt-12 grid sm:grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          {/* Ecolive */}
          <div className="bg-gradient-to-r from-[#C4704B] to-[#D4896A] rounded-2xl p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white/80 text-xs uppercase tracking-wider font-medium">Ecolive X-Frame</span>
                <h4 className="text-3xl sm:text-4xl font-bold text-white mt-1">
                  <AnimatedNumber value={1} /> Giorno
                </h4>
              </div>
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white rounded-full"
                initial={{ width: '0%' }}
                animate={isInView ? { width: '100%' } : {}}
                transition={{ delay: 1, duration: 1 }}
              />
            </div>
          </div>

          {/* Tradizionale */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white/50 text-xs uppercase tracking-wider font-medium">Costruzione Tradizionale</span>
                <h4 className="text-3xl sm:text-4xl font-bold text-white/70 mt-1">
                  <AnimatedNumber value={90} />+ Giorni
                </h4>
              </div>
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                <Clock className="w-8 h-8 text-white/40" />
              </div>
            </div>
            <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white/30 rounded-full"
                initial={{ width: '0%' }}
                animate={isInView ? { width: '1.1%' } : {}}
                transition={{ delay: 1.5, duration: 1 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Bottom text */}
        <motion.p
          className="text-center text-white/40 text-sm mt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
        >
          100x piu veloce della costruzione tradizionale • Zero sprechi • Cantiere pulito
        </motion.p>
      </div>
    </section>
  )
}
