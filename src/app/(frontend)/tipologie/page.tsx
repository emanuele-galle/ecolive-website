'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { tipologie } from '@/data/tipologie'
import BlurText from '@/components/ui/BlurText'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SpotlightCard from '@/components/ui/SpotlightCard'
import SectionTransition from '@/components/ui/SectionTransition'
import InfiniteMarquee from '@/components/ui/InfiniteMarquee'

const stats = [
  { label: 'Linee', value: '4' },
  { label: 'Superficie', value: 'Da 15 a 400 m²' },
  { label: 'Consegna', value: '30-120 giorni' },
  { label: 'Garanzia', value: '30 anni' },
]

const marqueeItems = [
  'Glamping',
  'SmartSuite',
  'Residenziali',
  'Luxury',
  'Personalizzabili',
  'Sistema X-Frame',
  'Bioedilizia',
  'Classe A4',
]

export default function TipologiePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-[#1E3D30] text-white py-28 lg:py-40 overflow-hidden">
        {/* Decorative orbs */}
        <div className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-[#C4704B]/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#2D5A47]/30 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <ScrollReveal direction="up" delay={0}>
            <p className="text-sm tracking-[0.2em] uppercase text-white/60 mb-6">
              Soluzioni in bioedilizia
            </p>
          </ScrollReveal>

          <BlurText
            text="Le nostre Tipologie"
            className="font-serif text-4xl md:text-5xl lg:text-7xl mb-8 !justify-start"
            delay={100}
            animateBy="words"
            direction="bottom"
          />

          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mb-16 leading-relaxed">
              Soluzioni abitative per ogni esigenza, dal glamping alla villa di lusso
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {stats.map((stat) => (
                <div key={stat.label} className="border-t border-white/20 pt-5">
                  <p className="text-2xl md:text-3xl font-semibold">{stat.value}</p>
                  <p className="text-sm text-white/50 mt-1.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-[#1E3D30] pb-1">
        <div className="bg-[#C4704B]/10 border-y border-[#C4704B]/20 py-4">
          <InfiniteMarquee
            items={marqueeItems}
            speed={25}
            className="text-white/80"
          />
        </div>
      </div>

      <SectionTransition from="#1E3D30" to="#FAF7F2" variant="wave" height={80} />

      {/* Griglia Tipologie */}
      <section className="bg-[#FAF7F2] py-28 lg:py-36">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal direction="up" className="text-center mb-16">
            <span className="text-[#C4704B] text-sm font-semibold tracking-widest uppercase">
              Esplora
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E3D30] mt-3">
              Trova la tua soluzione ideale
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {tipologie.map((tipologia, index) => (
              <ScrollReveal
                key={tipologia.id}
                direction="up"
                delay={index * 0.12}
              >
                <SpotlightCard
                  className="bg-white shadow-premium"
                  spotlightColor={`${tipologia.color}25`}
                >
                  <Link href={tipologia.href} className="group block">
                    <div className="relative aspect-[4/3] rounded-t-2xl overflow-hidden">
                      <Image
                        src={tipologia.heroImage}
                        alt={tipologia.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      {/* Overlay gradient */}
                      <div
                        className="absolute inset-0 transition-opacity duration-500 opacity-70 group-hover:opacity-90"
                        style={{
                          background: `linear-gradient(to top, ${tipologia.color}E6 0%, ${tipologia.color}80 35%, transparent 100%)`,
                        }}
                      />
                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-9">
                        <span className="inline-block w-fit px-3 py-1 mb-3 text-[11px] font-semibold tracking-[0.15em] uppercase bg-white/15 backdrop-blur-sm rounded-full text-white/90 border border-white/20">
                          {tipologia.category}
                        </span>
                        <h2 className="font-serif text-3xl md:text-4xl text-white mb-1">
                          {tipologia.title}
                        </h2>
                        <p className="text-white/70 text-sm mb-5">
                          {tipologia.surfaceRange}
                        </p>
                        <span className="inline-flex items-center gap-2 text-white text-sm font-medium group-hover:gap-3 transition-all duration-300">
                          Scopri di più
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionTransition from="#FAF7F2" to="#1E3D30" variant="angle" height={80} />

      {/* CTA Finale */}
      <section className="relative bg-[#1E3D30] text-white py-28 lg:py-36 overflow-hidden">
        {/* Decorative orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C4704B]/5 blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <ScrollReveal direction="up">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-8 leading-tight">
              Non sai quale tipologia fa per te?
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <p className="text-white/60 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
              Ti aiutiamo a trovare la soluzione perfetta per le tue esigenze
            </p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <Link
              href="/contatti"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#C4704B] hover:bg-[#b56140] text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#C4704B]/20"
            >
              Contattaci per una consulenza gratuita
              <ArrowRight className="w-5 h-5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
