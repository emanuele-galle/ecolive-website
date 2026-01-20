'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Shield, Leaf, Award, Zap, Quote } from 'lucide-react'

export default function TrustSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })

  const certifications = [
    { icon: Shield, abbr: 'PH', name: 'Passive House', color: 'from-blue-500 to-blue-600' },
    { icon: Leaf, abbr: 'CC', name: 'Casa Clima', color: 'from-green-500 to-green-600' },
    { icon: Award, abbr: 'ARCA', name: 'ARCA Certified', color: 'from-amber-500 to-amber-600' },
    { icon: Zap, abbr: 'A4', name: 'Classe Energetica', color: 'from-[#e85d04] to-[#f48c06]' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  }

  return (
    <section ref={ref} className="py-24 lg:py-32 px-4 bg-[#faf8f5] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <h2 className="font-inter text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a2540] mb-4">
            Certificazioni di <span className="text-[#e85d04]">Eccellenza</span>
          </h2>
          <p className="text-[#5c677d] text-lg max-w-2xl mx-auto">
            Qualita garantita dai massimi standard internazionali
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.abbr}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.5 } }}
              className="group"
            >
              <div className="relative p-6 lg:p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-500 text-center overflow-hidden h-full">
                {/* Background glow on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                <motion.div
                  className={`w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 lg:mb-6 rounded-2xl bg-gradient-to-br ${cert.color} flex items-center justify-center shadow-lg`}
                  whileHover={{ rotate: [0, -5, 5, 0], transition: { duration: 0.8 } }}
                >
                  <cert.icon className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                </motion.div>

                <div className="text-2xl lg:text-3xl font-bold text-[#0a2540] mb-2">{cert.abbr}</div>
                <div className="text-[#5c677d] text-sm">{cert.name}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonial */}
        <motion.div
          className="mt-16 lg:mt-20 relative"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <div className="max-w-3xl mx-auto text-center p-8 lg:p-10 bg-white rounded-3xl shadow-xl relative">
            <Quote className="w-12 h-12 text-[#e85d04]/20 absolute top-6 left-6" />
            <p className="text-lg lg:text-xl text-[#0a2540] font-medium italic mb-6 relative z-10 leading-relaxed">
              &quot;La qualita costruttiva e l&apos;attenzione ai dettagli di Ecolive hanno superato
              ogni nostra aspettativa. Casa pronta in 28 giorni!&quot;
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#0a2540] flex items-center justify-center text-white font-bold">
                MR
              </div>
              <div className="text-left">
                <div className="font-semibold text-[#0a2540]">Marco Rossi</div>
                <div className="text-sm text-[#5c677d]">Villa Moderna, Catanzaro</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
