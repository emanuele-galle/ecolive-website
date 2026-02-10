"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Check, X, AlertTriangle } from "lucide-react"
import type { TimelineMilestone } from "@/data/materialsEducationData"
import { useRef } from "react"

interface DegradationTimelineProps {
  timeline: TimelineMilestone[]
  title?: string
}

export default function DegradationTimeline({
  timeline,
  title = "Evoluzione Qualità 25 Anni"
}: DegradationTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Scroll-driven animation for central progress line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <div className="w-full" ref={containerRef}>
      {/* Title */}
      <div className="mb-10 text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{title}</h3>
        <p className="text-white/60 text-sm md:text-base">
          Cosa succede davvero nel tempo: confronto reale
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative" style={{ perspective: '2000px' }}>
        {/* Static Background Line */}
        <div className="absolute top-0 left-4 md:left-1/2 h-full w-1 bg-white/10 md:-translate-x-1/2" />

        {/* Animated Progress Line (scroll-synced) */}
        <motion.div
          className="absolute top-0 left-4 md:left-1/2 w-1 md:-translate-x-1/2 origin-top"
          style={{
            height: lineHeight,
            background: 'linear-gradient(180deg, #A0845C 0%, #6B8F71 100%)'
          }}
        />

        {/* Milestones */}
        <div className="space-y-12 md:space-y-16 relative z-10">
          {timeline.map((milestone, index) => {
            const isEven = index % 2 === 0
            const isLast = index === timeline.length - 1
            const severity = index / (timeline.length - 1) // 0 to 1

            return (
              <motion.div
                key={milestone.anno}
                className="relative"
                initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                {/* Anno Badge (on central line) with pulsing effect */}
                <div className="absolute left-0 md:left-1/2 top-0 md:-translate-x-1/2 z-20">
                  <motion.div
                    className="relative flex items-center gap-4"
                    whileInView={{ scale: [0.9, 1.05, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {/* Pulsing ring */}
                    <motion.div
                      className="absolute w-10 h-10 rounded-full border-2 border-[#A0845C]"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                    />

                    <div className="w-10 h-10 rounded-full bg-[#A0845C] border-4 border-[#152822] flex items-center justify-center shadow-lg shadow-[#A0845C]/30">
                      <span className="text-white font-bold text-xs">
                        {milestone.anno}
                      </span>
                    </div>

                    <div className="md:hidden bg-[#A0845C]/20 px-4 py-1 rounded-full backdrop-blur-sm">
                      <span className="text-[#A0845C] font-bold text-sm">
                        Anno {milestone.anno}
                      </span>
                    </div>

                    {/* Particle glow effect */}
                    <div className="absolute inset-0 w-10 h-10 rounded-full bg-[#A0845C]/20 blur-xl animate-pulse" />
                  </motion.div>
                </div>

                {/* Content Grid with 3D transforms */}
                <div className="grid md:grid-cols-2 gap-4 md:gap-8 pl-16 md:pl-0">
                  {/* Standard Card - Degrades (rotates more as time passes) */}
                  <div className={`${!isEven ? 'md:order-1' : 'md:order-2'} md:pr-8`}>
                    <motion.div
                      className={`p-5 md:p-6 rounded-xl bg-red-500/10 border border-red-500/30 backdrop-blur-sm ${
                        !isEven ? 'md:text-right' : ''
                      }`}
                      initial={{ opacity: 0, rotateY: isEven ? -15 : 15, z: -50 }}
                      whileInView={{ opacity: 1, rotateY: 0, z: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                      whileHover={{
                        scale: 1.03,
                        rotateY: isEven ? -5 : 5,
                        rotateX: -2,
                        z: 20,
                        borderColor: "rgba(239, 68, 68, 0.5)",
                        transition: { duration: 0.3 }
                      }}
                      style={{
                        transformStyle: 'preserve-3d',
                        // Shake effect for problematic years
                        ...(milestone.anno > 0 && {
                          animation: `shake 3s ease-in-out ${index * 0.5}s infinite`
                        })
                      }}
                    >
                      <div className="flex items-center gap-2 mb-3 justify-start">
                        <div className="flex items-center gap-2 px-3 py-1 bg-red-500/20 rounded-full">
                          <X className="w-3.5 h-3.5 text-red-400" strokeWidth={2.5} />
                          <span className="text-red-400 text-xs font-semibold uppercase tracking-wide">
                            Standard
                          </span>
                        </div>
                      </div>

                      <p className="text-white/90 text-sm md:text-base leading-relaxed">
                        {milestone.standard}
                      </p>

                      {milestone.anno > 0 && (
                        <div className="mt-3 flex items-center gap-2 text-red-400/70">
                          <AlertTriangle className="w-4 h-4" />
                          <span className="text-xs">Problemi evidenti</span>
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* Ecolive Card - Stays perfect (minimal rotation) */}
                  <div className={`${!isEven ? 'md:order-2' : 'md:order-1'} md:pl-8`}>
                    <motion.div
                      className={`p-5 md:p-6 rounded-xl bg-green-500/10 border border-green-500/30 backdrop-blur-sm ${
                        isEven ? 'md:text-right' : ''
                      }`}
                      initial={{ opacity: 0, rotateY: isEven ? 15 : -15, z: -50 }}
                      whileInView={{ opacity: 1, rotateY: 0, z: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                      whileHover={{
                        scale: 1.03,
                        rotateY: isEven ? 5 : -5,
                        rotateX: 2,
                        z: 20,
                        borderColor: "rgba(34, 197, 94, 0.5)",
                        boxShadow: "0 20px 40px rgba(64, 145, 108, 0.2)",
                        transition: { duration: 0.3 }
                      }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <div className={`flex items-center gap-2 mb-3 ${
                        isEven ? 'md:justify-end' : 'md:justify-start'
                      }`}>
                        <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full">
                          <Check className="w-3.5 h-3.5 text-green-400" strokeWidth={2.5} />
                          <span className="text-green-400 text-xs font-semibold uppercase tracking-wide">
                            Ecolive
                          </span>
                        </div>
                      </div>

                      <p className="text-white/90 text-sm md:text-base leading-relaxed">
                        {milestone.ecolive}
                      </p>

                      <div className="mt-3 flex items-center gap-2 text-green-400/70">
                        <Check className="w-4 h-4" />
                        <span className="text-xs">Zero problemi</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Summary Footer */}
      <motion.div
        className="mt-12 p-6 bg-gradient-to-br from-[#A0845C]/10 to-[#6B8F71]/10 backdrop-blur-sm rounded-xl border border-[#A0845C]/20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/30 flex items-center justify-center">
              <X className="w-5 h-5 text-red-400" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-white font-semibold mb-1">Standard: Degrado Progressivo</div>
              <p className="text-white/60 text-sm leading-relaxed">
                Problemi evidenti dopo pochi anni. Necessari interventi costosi per mantenere la qualità iniziale.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/30 flex items-center justify-center">
              <Check className="w-5 h-5 text-green-400" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-white font-semibold mb-1">Ecolive: Qualità Costante</div>
              <p className="text-white/60 text-sm leading-relaxed">
                Prestazioni invariate per decenni. Zero manutenzione straordinaria, zero stress.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px) rotate(-0.5deg); }
          75% { transform: translateX(2px) rotate(0.5deg); }
        }
      `}</style>
    </div>
  )
}
