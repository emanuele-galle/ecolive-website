'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const priceCards = [
  {
    tier: 'Grezzo Base',
    price: '1.200',
    description: 'Struttura portante e chiusura esterna',
    features: ['Struttura X-Frame', 'Pareti perimetrali', 'Copertura', 'Impermeabilizzazione'],
  },
  {
    tier: 'Avanzato',
    price: '1.600',
    description: 'Grezzo + impianti e finiture interne base',
    features: ['Tutto del Grezzo Base', 'Impianto elettrico', 'Impianto idraulico', 'Cappotto termico'],
    highlighted: true,
  },
  {
    tier: 'Chiavi in Mano',
    price: '2.100',
    description: 'Casa completa, pronta da abitare',
    features: ['Tutto dell\'Avanzato', 'Finiture premium', 'Pavimenti e rivestimenti', 'Cucina e bagni'],
  },
]

export default function ContactCTA() {
  return (
    <section className="py-24 lg:py-32 bg-[#1E3D30]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">
            Quanto Costa la Tua <span className="text-[#C4704B]">Casa</span>?
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto mt-4">
            Prezzi trasparenti, nessuna sorpresa. Scegli il livello di finitura che preferisci.
          </p>
        </motion.div>

        {/* Price cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {priceCards.map((card, i) => (
            <motion.div
              key={card.tier}
              className={`rounded-2xl p-8 ${
                card.highlighted
                  ? 'bg-[#C4704B] ring-2 ring-[#C4704B] ring-offset-2 ring-offset-[#1E3D30]'
                  : 'bg-white/5 border border-white/10'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className={`text-sm font-semibold uppercase tracking-wider mb-4 ${
                card.highlighted ? 'text-white/80' : 'text-white/50'
              }`}>
                {card.tier}
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className={`text-4xl font-bold ${card.highlighted ? 'text-white' : 'text-white'}`}>
                  &euro;{card.price}
                </span>
                <span className={`text-sm ${card.highlighted ? 'text-white/70' : 'text-white/40'}`}>/mq</span>
              </div>
              <p className={`text-sm mb-6 ${card.highlighted ? 'text-white/80' : 'text-white/50'}`}>
                {card.description}
              </p>
              <ul className="space-y-2.5">
                {card.features.map((feature) => (
                  <li key={feature} className={`flex items-start gap-2 text-sm ${
                    card.highlighted ? 'text-white/90' : 'text-white/60'
                  }`}>
                    <span className="text-[#C4704B] mt-0.5">{card.highlighted ? '&#10003;' : '&#10003;'}</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            href="/contatti"
            className="inline-flex items-center gap-2 px-10 py-5 bg-[#C4704B] hover:bg-[#A85A3A] text-white font-semibold text-lg rounded-xl transition-colors duration-300"
          >
            Richiedi Preventivo Gratuito
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-white/40 text-sm mt-4">
            Consulenza gratuita &middot; Risposta entro 24 ore
          </p>
        </motion.div>
      </div>
    </section>
  )
}
