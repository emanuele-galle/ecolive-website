'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Shield, Leaf, Award, Zap } from 'lucide-react'

export default function TrustBar() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false })

  const certifications = [
    { icon: Shield, label: 'Passive House', abbr: 'PH' },
    { icon: Leaf, label: 'Casa Clima', abbr: 'CC' },
    { icon: Award, label: 'ARCA Certified', abbr: 'ARCA' },
    { icon: Zap, label: 'Classe A4', abbr: 'A4' },
  ]

  return (
    <section ref={ref} className="py-6 bg-[#F5F0E8] border-y border-[#D2D2D7]">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="flex flex-wrap justify-center items-center gap-8 md:gap-16"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.abbr}
              className="flex items-center gap-3 group cursor-default"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 rounded-lg bg-[#48484A]/10 flex items-center justify-center group-hover:bg-[#48484A]/20 transition-colors">
                <cert.icon className="w-5 h-5 text-[#48484A]" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#2C2825]">{cert.abbr}</div>
                <div className="text-xs text-[#86868B]">{cert.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
