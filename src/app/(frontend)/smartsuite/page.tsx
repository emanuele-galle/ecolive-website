'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  Briefcase, Phone, ArrowLeft, LayoutGrid, Cable, Volume2,
  Thermometer, Puzzle, Award
} from 'lucide-react'
import { getTipologiaById } from '@/data/tipologie'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
}

const featureIcons = [LayoutGrid, Cable, Volume2, Thermometer, Puzzle, Award]

const featureDescriptions: Record<string, string> = {
  'Layout flessibile': 'Configura gli spazi secondo le tue esigenze: pareti divisorie mobili, aree open space, sale riunioni dedicate.',
  'Cablaggio integrato': 'Predisposizione completa per fibra ottica, rete dati strutturata e sistemi AV.',
  'Acustica ottimizzata': 'Pannelli fonoassorbenti e pareti isolate per un ambiente di lavoro silenzioso.',
  'Climatizzazione efficiente': 'Sistema HVAC ad alta efficienza per comfort tutto l\'anno a costi ridotti.',
  'Espandibile modulare': 'Aggiungi moduli in qualsiasi momento senza interruzioni per il business.',
  'Immagine professionale': 'Design contemporaneo che comunica innovazione e attenzione all\'ambiente.',
}

const processSteps = [
  { step: '01', title: 'Consulenza', desc: 'Sopralluogo e analisi delle esigenze del tuo business' },
  { step: '02', title: 'Progetto', desc: 'Layout personalizzato con rendering 3D e specifiche tecniche' },
  { step: '03', title: 'Produzione', desc: 'Prefabbricazione in stabilimento con controllo qualità' },
  { step: '04', title: 'Montaggio', desc: 'Installazione rapida con minimo impatto sulle attività' },
  { step: '05', title: 'Consegna', desc: 'Spazio pronto all\'uso, chiavi in mano con garanzia 30 anni' },
]

export default function SmartSuitePage() {
  const tipologia = getTipologiaById('smartsuite')!

  return (
    <main className="min-h-screen">

      {/* HERO */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={tipologia.heroImage}
            alt={tipologia.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-[#1E3D30]/90" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-32">
          <motion.span
            {...fadeUp}
            className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium tracking-wider mb-6"
          >
            {tipologia.category}
          </motion.span>

          <motion.h1
            {...fadeUp}
            transition={{ delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl text-white mb-6"
          >
            {tipologia.title}
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10"
          >
            {tipologia.description}
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 mb-10"
          >
            {tipologia.specs.map((spec) => (
              <div key={spec.label} className="text-center">
                <p className="text-2xl font-bold text-white">{spec.value}</p>
                <p className="text-white/50 text-sm">{spec.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/contatti"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#C4704B] text-white font-semibold rounded-xl hover:bg-[#b5623f] transition-colors"
            >
              Richiedi Preventivo
            </Link>
            <Link
              href="/tipologie"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Torna alle Tipologie
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CARATTERISTICHE */}
      <section className="py-20 lg:py-28 px-4 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-5xl text-[#1E3D30] mb-4">
              Spazi Pensati per il Business
            </h2>
            <p className="text-[#6B6560] text-lg max-w-2xl mx-auto">
              Ogni dettaglio progettato per la produttività e il comfort lavorativo
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tipologia.features.map((feature, i) => {
              const Icon = featureIcons[i] || Briefcase
              return (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-6 bg-white rounded-2xl border border-[#E8E0D5] hover:shadow-lg transition-shadow"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${tipologia.color}15` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: tipologia.color }} />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1E3D30] mb-2">{feature}</h3>
                  <p className="text-[#6B6560] text-sm leading-relaxed">
                    {featureDescriptions[feature] || ''}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* PROCESSO */}
      <section className="py-20 lg:py-28 px-4 bg-[#1E3D30]">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-5xl text-white mb-4">
              Il Processo
            </h2>
            <p className="text-white/60 text-lg">Il tuo spazio di lavoro in 5 step</p>
          </motion.div>

          <div className="space-y-6">
            {processSteps.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 items-start"
              >
                <span className="text-3xl font-bold text-[#C4704B] shrink-0 w-12">
                  {item.step}
                </span>
                <div className="pb-6 border-b border-white/10 flex-1">
                  <h3 className="text-xl font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-white/50">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 px-4 bg-[#C4704B]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-serif text-3xl md:text-5xl text-white mb-6">
              Fai crescere il tuo business
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
              Contattaci per un sopralluogo gratuito e scopri come SmartSuite può trasformare il tuo modo di lavorare.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contatti"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#1E3D30] font-semibold rounded-xl hover:bg-white/90 transition-colors"
              >
                Sopralluogo Gratuito
              </Link>
              <a
                href="tel:+3909631951395"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Chiama Ora
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
