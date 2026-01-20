'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a2540]" />

      {/* Diagonal shape */}
      <svg
        className="absolute top-0 left-0 w-full h-32 text-[#faf8f5]"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,0 L1440,0 L1440,50 Q720,100 0,50 Z"
        />
      </svg>

      {/* Animated decorative circles */}
      <motion.div
        className="absolute top-20 right-10 w-64 h-64 rounded-full border border-white/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-10 left-10 w-48 h-48 rounded-full border border-[#e85d04]/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#e85d04]/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
        >
          <h2 className="font-inter text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
            Pronto a costruire la
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#e85d04] to-[#f48c06]">
              casa dei tuoi sogni?
            </span>
          </h2>

          <p className="text-lg lg:text-xl text-white/70 mb-10 lg:mb-12 max-w-2xl mx-auto leading-relaxed">
            Contattaci oggi per una consulenza gratuita.
            Il nostro team e pronto ad accompagnarti in ogni fase del progetto.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center">
            <Link href="/contatti">
              <motion.span
                className="inline-flex items-center justify-center gap-3 px-8 lg:px-10 py-4 lg:py-5 bg-gradient-to-r from-[#e85d04] to-[#f48c06] text-white font-bold text-base lg:text-lg rounded-2xl shadow-2xl shadow-[#e85d04]/30 w-full sm:w-auto"
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(232, 93, 4, 0.5)" }}
                whileTap={{ scale: 0.98 }}
              >
                Richiedi preventivo gratuito
                <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6" />
              </motion.span>
            </Link>

            <motion.a
              href="tel:+390963195139"
              className="inline-flex items-center justify-center gap-3 px-8 lg:px-10 py-4 lg:py-5 bg-white/10 backdrop-blur-sm text-white font-semibold text-base lg:text-lg rounded-2xl border border-white/20 w-full sm:w-auto"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone className="w-5 h-5" />
              Chiamaci ora
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
