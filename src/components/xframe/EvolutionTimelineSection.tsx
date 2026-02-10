"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Layers, Shield, Columns3, Zap } from "lucide-react"

const technologies = [
  {
    id: 1,
    name: "Platform Frame",
    subtitle: "Sistema a telaio veloce",
    icon: Layers,
    benefits: [
      "Velocità di montaggio",
      "Leggerezza strutturale",
      "Costi ottimizzati"
    ],
    color: "#4a9eff"
  },
  {
    id: 2,
    name: "X-Lam (CLT)",
    subtitle: "Pannelli ad alta resistenza",
    icon: Shield,
    benefits: [
      "Resistenza sismica",
      "Solidità strutturale",
      "Durabilità nel tempo"
    ],
    color: "#A0845C"
  },
  {
    id: 3,
    name: "Post & Beam",
    subtitle: "Tradizione e grandi luci",
    icon: Columns3,
    benefits: [
      "Libertà progettuale",
      "Estetica tradizionale",
      "Grandi campate"
    ],
    color: "#48484A"
  }
]

export default function EvolutionTimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" })

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 px-4 bg-gradient-to-b from-[#1D1D1F] via-[#1a3329] to-[#152822] overflow-hidden"
    >
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Animated Glow Orbs */}
      <motion.div
        className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-[#A0845C]/20 rounded-full blur-[150px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-[#4a9eff]/15 rounded-full blur-[120px]"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 bg-white/5 backdrop-blur-md rounded-full border border-white/10"
          >
            <span className="w-2 h-2 bg-[#A0845C] rounded-full animate-pulse" />
            <span className="text-white/80 text-sm font-medium tracking-wide">
              L'Evoluzione dei Sistemi in Legno
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Come Nasce{" "}
            <span className="relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A0845C] via-[#e08860] to-[#A0845C]">
                X-Frame
              </span>
              <motion.span
                className="absolute -inset-2 bg-[#A0845C]/20 blur-2xl rounded-full -z-10"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed"
          >
            Tre tecnologie diverse, ognuna con i propri punti di forza.
            X-Frame le unisce in un sistema brevettato che ne esalta i vantaggi.
          </motion.p>
        </div>

        {/* Timeline: 3 Technologies Horizontal */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {technologies.map((tech, index) => {
            const IconComponent = tech.icon
            return (
              <motion.div
                key={tech.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.15, duration: 0.8 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                {/* Glow effect */}
                <div
                  className="absolute -inset-2 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"
                  style={{ background: `${tech.color}20` }}
                />

                <div className="relative bg-white/[0.04] backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 group-hover:border-white/20 transition-all duration-300 h-full flex flex-col">
                  {/* Number badge */}
                  <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{tech.id}</span>
                  </div>

                  {/* Icon */}
                  <div className="mb-6">
                    <motion.div
                      className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${tech.color}, ${tech.color}aa)`,
                        boxShadow: `0 8px 32px ${tech.color}30`
                      }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <IconComponent className="w-7 h-7 text-white" />
                    </motion.div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {tech.name}
                  </h3>
                  <p className="text-white/50 text-sm mb-6">{tech.subtitle}</p>

                  {/* Benefits */}
                  <div className="space-y-3 mt-auto">
                    {tech.benefits.map((benefit, i) => (
                      <motion.div
                        key={benefit}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.5 + index * 0.15 + i * 0.08 }}
                        className="flex items-center gap-3"
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: tech.color }}
                        />
                        <span className="text-white/70 text-sm">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Arrow down (mobile/tablet only) */}
                  <motion.div
                    className="md:hidden flex justify-center mt-6"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ChevronDown className="w-6 h-6 text-[#A0845C]/50" />
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Convergence Arrow (desktop only) */}
        <motion.div
          className="hidden md:flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <div className="flex gap-2 mb-2">
              <motion.div
                className="w-20 h-0.5 bg-gradient-to-r from-[#4a9eff] to-[#A0845C]"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ delay: 1, duration: 0.8 }}
              />
              <motion.div
                className="w-20 h-0.5 bg-gradient-to-r from-[#A0845C] to-[#48484A]"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ delay: 1.2, duration: 0.8 }}
              />
            </div>
            <svg className="w-12 h-12 text-[#A0845C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <span className="text-white/40 text-xs mt-2 tracking-wider uppercase">Convergono in</span>
          </motion.div>
        </motion.div>

        {/* Central X-Frame 3in1 Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="relative"
        >
          {/* Outer glow */}
          <div className="absolute -inset-4 bg-gradient-to-br from-[#A0845C]/30 via-[#A0845C]/20 to-transparent rounded-3xl blur-3xl" />

          <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.04] backdrop-blur-md rounded-3xl p-8 md:p-12 border-2 border-[#A0845C]/40 shadow-2xl">
            {/* Badge top */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#A0845C]/20 rounded-full border border-[#A0845C]/40">
                <Zap className="w-5 h-5 text-[#A0845C]" />
                <span className="text-white font-semibold tracking-wide">
                  Sistema Brevettato
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A0845C] via-[#e08860] to-[#A0845C]">
                X-FRAME 3IN1
              </span>
            </h3>

            <p className="text-center text-white/70 text-lg mb-10 max-w-2xl mx-auto">
              La sintesi perfetta: unisce velocità, resistenza e libertà progettuale
              in un unico sistema costruttivo brevettato.
            </p>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {[
                { icon: Layers, text: "Velocità del Platform Frame", color: "#4a9eff" },
                { icon: Shield, text: "Solidità dell'X-Lam", color: "#A0845C" },
                { icon: Columns3, text: "Flessibilità del Post & Beam", color: "#48484A" },
                { icon: Zap, text: "+ Brevetto Ecolive", color: "#A0845C" },
              ].map((benefit, index) => {
                const BenefitIcon = benefit.icon
                return (
                  <motion.div
                    key={benefit.text}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 1.4 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${benefit.color}20` }}
                    >
                      <BenefitIcon className="w-5 h-5" style={{ color: benefit.color }} />
                    </div>
                    <span className="text-white text-sm md:text-base font-medium">
                      {benefit.text}
                    </span>
                  </motion.div>
                )
              })}
            </div>

            {/* Bottom stats bar */}
            <div className="flex flex-wrap justify-center gap-6 pt-8 border-t border-white/10">
              {[
                { value: "3", label: "Tecnologie Unite" },
                { value: "1", label: "Sistema Brevettato" },
                { value: "0", label: "Compromessi" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.6 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-[#A0845C] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Missing import
function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}
