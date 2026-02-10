'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { tipologie } from '@/data/tipologie'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

const stats = [
  { label: 'Linee', value: '4' },
  { label: 'Superficie', value: 'Da 15 a 400 m²' },
  { label: 'Consegna', value: '30-120 giorni' },
  { label: 'Garanzia', value: '30 anni' },
]

export default function TipologiePage() {
  return (
    <main>
      {/* Hero Compatto */}
      <section className="bg-[#1E3D30] text-white py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <motion.p
            {...fadeIn}
            className="text-sm tracking-[0.2em] uppercase text-white/60 mb-4"
          >
            Soluzioni in bioedilizia
          </motion.p>
          <motion.h1
            {...fadeIn}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6"
          >
            Le nostre Tipologie
          </motion.h1>
          <motion.p
            {...fadeIn}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mb-12"
          >
            Soluzioni abitative per ogni esigenza, dal glamping alla villa di lusso
          </motion.p>
          <motion.div
            {...fadeIn}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="border-t border-white/20 pt-4">
                <p className="text-2xl md:text-3xl font-semibold">{stat.value}</p>
                <p className="text-sm text-white/50 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Griglia Tipologie */}
      <section className="bg-[#FAF7F2] py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {tipologie.map((tipologia, index) => (
              <motion.div
                key={tipologia.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={tipologia.href} className="group block">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                    <Image
                      src={tipologia.heroImage}
                      alt={tipologia.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Overlay gradient con colore tipologia */}
                    <div
                      className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-80"
                      style={{
                        background: `linear-gradient(to top, ${tipologia.color}E6 0%, ${tipologia.color}80 40%, transparent 100%)`,
                      }}
                    />
                    {/* Contenuto card */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                      <span className="inline-block w-fit px-3 py-1 mb-3 text-[11px] font-semibold tracking-[0.15em] uppercase bg-white/15 backdrop-blur-sm rounded-full text-white/90 border border-white/20">
                        {tipologia.category}
                      </span>
                      <h2 className="font-serif text-3xl md:text-4xl text-white mb-1">
                        {tipologia.title}
                      </h2>
                      <p className="text-white/70 text-sm mb-4">
                        {tipologia.surfaceRange}
                      </p>
                      <span className="inline-flex items-center gap-2 text-white text-sm font-medium">
                        Scopri di più
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Finale */}
      <section className="bg-[#1E3D30] text-white py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.h2
            {...fadeIn}
            className="font-serif text-3xl md:text-4xl lg:text-5xl mb-6"
          >
            Non sai quale tipologia fa per te?
          </motion.h2>
          <motion.p
            {...fadeIn}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white/60 text-lg mb-10"
          >
            Ti aiutiamo a trovare la soluzione perfetta per le tue esigenze
          </motion.p>
          <motion.div {...fadeIn} transition={{ duration: 0.6, delay: 0.2 }}>
            <Link
              href="/contatti"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#C4704B] hover:bg-[#b56140] text-white font-semibold rounded-full transition-colors duration-300"
            >
              Contattaci per una consulenza gratuita
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
