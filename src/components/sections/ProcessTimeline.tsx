'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { MessageCircle, PenTool, Hammer, Key } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: MessageCircle,
    title: 'Consulenza',
    description: 'Incontro gratuito per capire le tue esigenze, il terreno e il budget disponibile.',
    duration: 'Giorno 1',
  },
  {
    number: '02',
    icon: PenTool,
    title: 'Progettazione',
    description: 'Design personalizzato con rendering 3D fotorealistici e preventivo dettagliato.',
    duration: 'Giorni 2-7',
  },
  {
    number: '03',
    icon: Hammer,
    title: 'Costruzione',
    description: 'Realizzazione in stabilimento con sistema X-Frame e controllo qualita certificato.',
    duration: 'Giorni 8-25',
  },
  {
    number: '04',
    icon: Key,
    title: 'Consegna',
    description: 'Montaggio rapido in cantiere e consegna chiavi in mano della tua nuova casa.',
    duration: 'Giorno 30',
  },
]

export default function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const progressWidth = useTransform(scrollYProgress, [0.2, 0.6], [0, 100])

  return (
    <section
      ref={containerRef}
      className="py-24 lg:py-32 px-4 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1E3D30] via-[#2D5A47] to-[#1E3D30]" />

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Decorative blurs - espansi su ultrawide */}
      <div className="absolute top-0 left-1/4 3xl:left-10 w-96 3xl:w-[500px] h-96 3xl:h-[500px] bg-[#C4704B]/10 3xl:bg-[#C4704B]/15 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 3xl:right-10 w-80 3xl:w-[450px] h-80 3xl:h-[450px] bg-[#C4704B]/10 3xl:bg-[#C4704B]/15 rounded-full blur-3xl" />
      <div className="hidden 3xl:block absolute top-1/2 -left-20 w-[400px] h-[400px] bg-[#E8956B]/8 rounded-full blur-3xl" />
      <div className="hidden 3xl:block absolute top-1/3 -right-20 w-[350px] h-[350px] bg-[#C4704B]/8 rounded-full blur-3xl" />

      <div className="max-w-6xl 3xl:max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <span className="text-[#C4704B] font-semibold text-sm uppercase tracking-wider">
            Come Lavoriamo
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            Il Nostro <span className="text-[#C4704B]">Processo</span>
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto mt-4">
            Dalla prima consulenza alla consegna delle chiavi in soli 60 giorni
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block">
          {/* Progress Line */}
          <div className="relative mb-12">
            {/* Base line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10 rounded-full -translate-y-1/2" />

            {/* Animated fill */}
            <motion.div
              className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-[#C4704B] to-[#E8956B] rounded-full -translate-y-1/2"
              style={{ width: `${progressWidth.get()}%` }}
              initial={{ width: '0%' }}
              animate={isInView ? { width: '100%' } : { width: '0%' }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            />

            {/* Connection dots */}
            <div className="relative flex justify-between">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  className="relative"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.5 + index * 0.2, type: "spring", stiffness: 200 }}
                >
                  <div className="w-5 h-5 rounded-full bg-[#C4704B] border-4 border-[#1E3D30] shadow-lg shadow-[#C4704B]/30" />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[#C4704B]"
                    animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className="group"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.15, duration: 0.9 }}
              >
                <motion.div
                  className="relative h-full p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#C4704B]/50 transition-all duration-500 overflow-hidden"
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  {/* Glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C4704B]/0 to-[#C4704B]/0 group-hover:from-[#C4704B]/10 group-hover:to-transparent transition-all duration-500" />

                  {/* Number */}
                  <div className="relative">
                    <span className="text-5xl font-bold text-white/10 group-hover:text-[#C4704B]/20 transition-colors duration-500">
                      {step.number}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="relative w-14 h-14 -mt-4 mb-4 rounded-xl bg-[#C4704B] flex items-center justify-center shadow-lg shadow-[#C4704B]/20 group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-4">
                      {step.description}
                    </p>

                    {/* Duration badge */}
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs font-medium">
                      {step.duration}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Vertical line */}
            <motion.div
              className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#C4704B] via-[#C4704B] to-[#C4704B]/30"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              style={{ originY: 0 }}
            />

            <div className="space-y-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  className="relative pl-16"
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.15, duration: 0.8 }}
                >
                  {/* Dot */}
                  <motion.div
                    className="absolute left-4 top-6 w-5 h-5 rounded-full bg-[#C4704B] border-4 border-[#1E3D30] shadow-lg z-10"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.5 + index * 0.2, type: "spring" }}
                  />

                  {/* Card */}
                  <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-xl bg-[#C4704B] flex items-center justify-center flex-shrink-0">
                        <step.icon className="w-6 h-6 text-white" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[#C4704B] font-bold">{step.number}</span>
                          <span className="text-white/40">•</span>
                          <span className="text-white/50 text-xs">{step.duration}</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                        <p className="text-white/60 text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA hint */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
        >
          <p className="text-white/40 text-sm">
            Processo certificato ISO 9001 • Garanzia 30 anni sulla struttura
          </p>
        </motion.div>
      </div>
    </section>
  )
}
