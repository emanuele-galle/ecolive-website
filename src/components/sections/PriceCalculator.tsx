'use client'

import { motion, useInView, useSpring, useMotionValue, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Home, Hammer, Key } from 'lucide-react'

const PRICING = {
  grezzoBase: 900,
  grezzoAvanzato: 1200,
  chiaviInMano: 1700,
}

const MIN_MQ = 50
const MAX_MQ = 300
const DEFAULT_MQ = 120

function AnimatedPrice({ value, duration = 0.5 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { stiffness: 100, damping: 30 })

  useEffect(() => {
    motionValue.set(value)
  }, [value, motionValue])

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString('it-IT')
      }
    })
    return unsubscribe
  }, [springValue])

  return <span ref={ref}>0</span>
}

export default function PriceCalculator() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })
  const [squareMeters, setSquareMeters] = useState(DEFAULT_MQ)

  const prices = {
    grezzoBase: squareMeters * PRICING.grezzoBase,
    grezzoAvanzato: squareMeters * PRICING.grezzoAvanzato,
    chiaviInMano: squareMeters * PRICING.chiaviInMano,
  }

  const tiers = [
    {
      name: 'Grezzo Base',
      price: prices.grezzoBase,
      pricePerMq: PRICING.grezzoBase,
      icon: Hammer,
      description: 'Struttura e copertura',
      color: 'from-slate-500 to-slate-600',
      features: ['Struttura X-Frame', 'Copertura', 'Tamponamenti esterni'],
    },
    {
      name: 'Grezzo Avanzato',
      price: prices.grezzoAvanzato,
      pricePerMq: PRICING.grezzoAvanzato,
      icon: Home,
      description: 'Pronto per finiture',
      color: 'from-[#1b4965] to-[#0a2540]',
      highlight: true,
      features: ['Tutto il Grezzo Base', 'Impianti predisposti', 'Serramenti installati', 'Cappotto termico'],
    },
    {
      name: 'Chiavi in Mano',
      price: prices.chiaviInMano,
      pricePerMq: PRICING.chiaviInMano,
      icon: Key,
      description: 'Casa completa',
      color: 'from-[#e85d04] to-[#f48c06]',
      features: ['Tutto il Grezzo Avanzato', 'Finiture interne', 'Impianti completi', 'Pronta da abitare'],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  }

  return (
    <section ref={containerRef} className="py-24 lg:py-32 px-4 bg-gradient-to-b from-[#faf8f5] to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#e85d04]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1b4965]/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-[#e85d04] bg-[#e85d04]/10 rounded-full">
            Calcola il tuo investimento
          </span>
          <h2 className="font-inter text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a2540] mb-4">
            Quanto Costa la Tua <span className="text-[#e85d04]">Casa?</span>
          </h2>
          <p className="text-[#5c677d] text-lg max-w-2xl mx-auto">
            Usa lo slider per calcolare il prezzo in base ai metri quadri
          </p>
        </motion.div>

        {/* Slider Section */}
        <motion.div
          className="max-w-xl mx-auto mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.9 }}
        >
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <div className="text-center mb-6">
              <div className="text-6xl lg:text-7xl font-bold text-[#0a2540] font-inter">
                {squareMeters}
              </div>
              <div className="text-[#5c677d] text-lg mt-1">metri quadri</div>
            </div>

            {/* Custom Slider */}
            <div className="relative py-4">
              <input
                type="range"
                min={MIN_MQ}
                max={MAX_MQ}
                step={10}
                value={squareMeters}
                onChange={(e) => setSquareMeters(Number(e.target.value))}
                className="w-full h-3 rounded-full appearance-none cursor-pointer bg-gray-200
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-8
                  [&::-webkit-slider-thumb]:h-8
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-gradient-to-r
                  [&::-webkit-slider-thumb]:from-[#e85d04]
                  [&::-webkit-slider-thumb]:to-[#f48c06]
                  [&::-webkit-slider-thumb]:shadow-lg
                  [&::-webkit-slider-thumb]:shadow-[#e85d04]/30
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:transition-transform
                  [&::-webkit-slider-thumb]:hover:scale-110
                  [&::-moz-range-thumb]:w-8
                  [&::-moz-range-thumb]:h-8
                  [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:bg-gradient-to-r
                  [&::-moz-range-thumb]:from-[#e85d04]
                  [&::-moz-range-thumb]:to-[#f48c06]
                  [&::-moz-range-thumb]:border-0
                  [&::-moz-range-thumb]:shadow-lg
                  [&::-moz-range-thumb]:cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #e85d04 0%, #f48c06 ${((squareMeters - MIN_MQ) / (MAX_MQ - MIN_MQ)) * 100}%, #e5e7eb ${((squareMeters - MIN_MQ) / (MAX_MQ - MIN_MQ)) * 100}%, #e5e7eb 100%)`
                }}
              />
              <div className="flex justify-between text-sm text-[#5c677d] mt-2">
                <span>{MIN_MQ} mq</span>
                <span>{MAX_MQ} mq</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Price Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              variants={itemVariants}
              className={`relative ${tier.highlight ? 'md:-mt-4 md:mb-4' : ''}`}
            >
              <div className={`relative h-full p-6 lg:p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-500 border ${tier.highlight ? 'border-[#e85d04]/30' : 'border-gray-100'} overflow-hidden group`}>
                {/* Highlight badge */}
                {tier.highlight && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-[#e85d04] to-[#f48c06] text-white text-xs font-bold px-4 py-1.5 rounded-bl-2xl">
                    Consigliato
                  </div>
                )}

                {/* Icon */}
                <div className={`w-14 h-14 mb-6 rounded-2xl bg-gradient-to-br ${tier.color} flex items-center justify-center shadow-lg`}>
                  <tier.icon className="w-7 h-7 text-white" />
                </div>

                {/* Tier name & description */}
                <h3 className="text-xl font-bold text-[#0a2540] mb-1">{tier.name}</h3>
                <p className="text-[#5c677d] text-sm mb-6">{tier.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl lg:text-5xl font-bold text-[#0a2540] font-inter">
                      <AnimatedPrice value={tier.price} />
                    </span>
                    <span className="text-[#5c677d]">EUR</span>
                  </div>
                  <div className="text-sm text-[#e85d04] font-medium mt-1">
                    {tier.pricePerMq.toLocaleString('it-IT')} EUR/mq
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-[#5c677d]">
                      <svg className="w-4 h-4 text-[#e85d04] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12 lg:mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.9 }}
        >
          <p className="text-[#5c677d] mb-6">
            I prezzi sono indicativi e possono variare in base alle specifiche del progetto
          </p>
          <Link href="/contatti">
            <motion.span
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#e85d04] to-[#f48c06] text-white font-bold rounded-2xl shadow-xl shadow-[#e85d04]/20"
              whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(232, 93, 4, 0.4)" }}
              whileTap={{ scale: 0.98 }}
            >
              Richiedi Preventivo Personalizzato
              <ArrowRight className="w-5 h-5" />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
