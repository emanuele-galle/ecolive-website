'use client'

import Link from 'next/link'
import { ChevronRight, Layers, ArrowLeft, ArrowRight, Ruler, Thermometer, Clock, Wrench, Box } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const roofStratigraphy = [
  { letter: 'A', name: 'Struttura portante lamellare (16×32)', color: '#8B7355' },
  { letter: 'C', name: 'Pannelli tre strati a vista (levigati e trattati)', color: '#C4A47B' },
  { letter: 'D', name: 'Lana di roccia 22cm', color: '#D4B896' },
  { letter: 'I', name: 'Pannelli OSB strutturali', color: '#B8956E' },
  { letter: 'F', name: 'Freno vapore (interno) + membrana traspirante (esterno)', color: '#B8C4D0' },
]

const performanceStats = [
  { icon: Ruler, value: '40 cm', label: 'Spessore totale' },
  { icon: Thermometer, value: '0,137', label: 'W/m²K trasmittanza' },
  { icon: Clock, value: '14,5 ore', label: 'Sfasamento termico' },
]

const interfloorFeatures = [
  { icon: Wrench, title: 'Spazi tecnici integrati', description: 'Vani predisposti per impianti elettrici, idraulici e di scarico, accessibili senza demolizioni.' },
  { icon: Layers, title: 'Passaggio trasversale', description: 'Attraversamento trasversale tramite le intercapedini delle tavole di abete, per distribuzione impiantistica.' },
  { icon: Box, title: 'Pavimentazione diretta', description: 'SPC posabile direttamente sul solaio, oppure massetto alleggerito 5-10cm per piastrelle e ceramiche.' },
  { icon: Layers, title: 'Lastra di irrigidimento', description: 'Il solaio interpiano funge anche da lastra strutturale di irrigidimento per la stabilità dell\'edificio.' },
]

const moduleSpecs = [
  { label: 'Larghezza modulo', value: '2,10 m' },
  { label: 'Lunghezza massima', value: 'fino a 13 m' },
  { label: 'Calpestabilità', value: 'Immediata' },
  { label: 'Stoccaggio', value: 'All\'aperto' },
]

export default function SolaiPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      {/* HEADER */}
      <section className="bg-[#1D1D1F] pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <nav className="flex items-center gap-2 text-sm text-white/50 mb-8">
              <Link href="/sistema-x-frame" className="hover:text-white transition-colors">Sistema X-Frame</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#A0845C]">Solai</span>
            </nav>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Solai <span className="text-[#A0845C]">X-Frame</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg text-white/60 max-w-2xl">
              Moduli prefabbricati per copertura e interpiano: prestazioni certificate, montaggio rapido, immediatamente calpestabili.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* SOLAIO DI COPERTURA */}
      <section className="py-24 lg:py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1D1D1F] mb-4">
              Solaio di <span className="text-[#A0845C]">Copertura</span>
            </h2>
            <p className="text-[#86868B] text-lg max-w-2xl mb-14">Stratigrafia ottimizzata per massimo isolamento e protezione dagli agenti atmosferici.</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-4 mb-16">
            {roofStratigraphy.map((layer, i) => (
              <ScrollReveal key={layer.letter} delay={i * 0.08}>
                <div className="flex items-center gap-4 p-5 bg-[#F5F5F7] rounded-2xl border border-[#EDE6DB]">
                  <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-white text-sm font-bold shadow-sm" style={{ backgroundColor: layer.color }}>
                    {layer.letter}
                  </div>
                  <span className="text-[#1D1D1F] font-medium">{layer.name}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={0.3}>
            <div className="grid grid-cols-3 gap-4 md:gap-8 p-6 md:p-10 bg-[#1D1D1F] rounded-2xl">
              {performanceStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="w-6 h-6 text-[#A0845C] mx-auto mb-3" />
                  <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs md:text-sm text-white/50 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SOLAIO INTERPIANO */}
      <section className="py-24 lg:py-32 px-6 bg-[#F5F5F7]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1D1D1F] mb-4">
              Solaio <span className="text-[#A0845C]">Interpiano</span>
            </h2>
            <p className="text-[#86868B] text-lg max-w-2xl mb-14">Progettato per integrare spazi tecnici impiantistici e garantire flessibilità nella scelta della pavimentazione.</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {interfloorFeatures.map((feat, i) => (
              <ScrollReveal key={feat.title} delay={i * 0.1}>
                <div className="p-6 bg-white rounded-2xl border border-[#EDE6DB] h-full">
                  <div className="w-12 h-12 rounded-xl bg-[#A0845C]/10 flex items-center justify-center mb-4">
                    <feat.icon className="w-6 h-6 text-[#A0845C]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1D1D1F] mb-2">{feat.title}</h3>
                  <p className="text-[#86868B] leading-relaxed text-sm">{feat.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIFICHE MODULO */}
      <section className="py-24 lg:py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1D1D1F] mb-4">Specifiche <span className="text-[#A0845C]">Modulo</span></h2>
            <p className="text-[#86868B] text-lg max-w-2xl mb-14">Moduli prefabbricati pronti alla posa, immediatamente calpestabili e stoccabili all&apos;aperto.</p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {moduleSpecs.map((spec) => (
                <div key={spec.label} className="p-6 bg-[#F5F5F7] rounded-2xl border border-[#EDE6DB] text-center">
                  <div className="text-xl md:text-2xl font-bold text-[#A0845C]">{spec.value}</div>
                  <div className="text-xs text-[#86868B] mt-2">{spec.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* NAVIGATION */}
      <section className="py-12 px-6 bg-[#F5F5F7] border-t border-[#EDE6DB]">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/sistema-x-frame" className="group inline-flex items-center gap-2 text-[#86868B] hover:text-[#1D1D1F] transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Pareti</span>
          </Link>
          <Link href="/sistema-x-frame/coperture" className="group inline-flex items-center gap-2 text-[#A0845C] hover:text-[#8B7049] transition-colors font-medium">
            <span>Coperture</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  )
}
