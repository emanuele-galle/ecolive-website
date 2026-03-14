'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  Building2, Phone, ArrowLeft, Palette, Key, Wallet, Zap, Sofa, TrendingUp,
  CheckCircle, Package, Home, Sun, Wrench, Sparkles, Shield
} from 'lucide-react'
import { getTipologiaById } from '@/data/tipologie'
import JsonLd from '@/components/JsonLd'
import BlurText from '@/components/ui/BlurText'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SpotlightCard from '@/components/ui/SpotlightCard'
import SectionTransition from '@/components/ui/SectionTransition'
import InfiniteMarquee from '@/components/ui/InfiniteMarquee'
import GlassCard from '@/components/ui/GlassCard'

const floatingOrbAnimate = { y: [0, 20, 0] }
const floatingOrbTransition = { duration: 8, repeat: Infinity, ease: 'easeInOut' as const }
const ctaOrbAnimate = { scale: [1, 1.2, 1] }
const ctaOrbTransition = { duration: 8, repeat: Infinity, ease: 'easeInOut' as const }

const featureIcons = [Palette, Key, Wallet, Zap, Sofa, TrendingUp]

const featureDescriptions: Record<string, string> = {
  'Personalizzazione completa': 'Scegli layout, materiali e finiture. Ogni dettaglio della tua casa progettato insieme a te.',
  'Consegna chiavi in mano': 'Dalla fondazione agli arredi, ci occupiamo di tutto noi.',
  'Mutuo agevolato': 'Condizioni vantaggiose grazie ai nostri partner finanziari.',
  'Efficienza energetica massima': 'Classe A4 garantita, bollette ridotte fino all\'80%.',
  'Comfort abitativo superiore': 'Isolamento termoacustico superiore per vivere in tranquillità.',
  'Valore immobiliare garantito': 'Un investimento che cresce nel tempo grazie a certificazioni e prestazioni energetiche.',
}

const processSteps = [
  { step: '01', title: 'Consulenza', desc: 'Analizziamo insieme le esigenze della tua famiglia e il budget' },
  { step: '02', title: 'Progetto', desc: 'Design personalizzato con rendering 3D e scelta materiali' },
  { step: '03', title: 'Produzione', desc: 'Prefabbricazione in stabilimento con controllo qualità certificato' },
  { step: '04', title: 'Montaggio', desc: 'Costruzione rapida in cantiere con minimo impatto ambientale' },
  { step: '05', title: 'Consegna', desc: 'Casa pronta da vivere, chiavi in mano con garanzia 50 anni' },
]

const residenzialiMarqueeItems = [
  'Chiavi in Mano',
  'Classe A4',
  'Personalizzabile',
  'Mutuo Agevolato',
  'Garanzia 50 Anni',
  'Comfort Premium',
  'Efficienza Energetica',
  'Bioedilizia Certificata',
]

const grezzoAvanzatoItems = [
  { icon: Home, text: 'Infissi PVC 76mm (Libra Horizon SPI), 3 guarnizioni, vetri 48mm, Ug=0.7' },
  { icon: Shield, text: 'Portone blindato RC3 antieffrazione (UNI-EN 1627)' },
  { icon: Sun, text: 'Frangisole orientabili motorizzate in alluminio estruso' },
  { icon: Zap, text: 'VMC puntuale con recupero entalpico' },
  { icon: Sparkles, text: 'Climatizzatori HVAC multisplit LG dual inverter ionizzatori (A+++)' },
  { icon: Sun, text: 'Pannelli solari termici 300 lt con accumulo' },
  { icon: Wrench, text: 'Domotica integrata Alexa / Apple HomeKit' },
]

const chiaviInManoItems = [
  'Rasatura e tinteggiatura interni',
  'Rivestimenti servizi',
  'Pavimentazione parquet SPC / Gres',
  'Porte interne',
  'Finitura esterna acril-silossanica',
]

const classeA4Options = [
  {
    label: 'Piccole / Medie',
    price: '+\u20AC10.000',
    specs: '8kW pompa di calore + 6kW fotovoltaico',
  },
  {
    label: 'Medie / Grandi',
    price: '+\u20AC18.000',
    specs: '16kW pompa di calore + 12kW fotovoltaico',
  },
]

const residenzialiJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Residenziali - Case prefabbricate in legno',
  description: 'La soluzione perfetta per chi desidera una casa moderna, efficiente e sostenibile. Dal monolocale alla villa, progettiamo abitazioni su misura per ogni esigenza familiare, con un rapporto qualità-prezzo imbattibile e tempi di consegna certi.',
  brand: {
    '@type': 'Brand',
    name: 'Ecolive',
  },
  category: 'Case residenziali prefabbricate in legno',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
    lowPrice: '1100',
    highPrice: '1680',
    priceValidUntil: '2026-12-31',
    url: 'https://www.ecolive.srl/residenziali',
  },
  additionalProperty: [
    { '@type': 'PropertyValue', name: 'Superficie', value: '60-250 m\u00B2' },
    { '@type': 'PropertyValue', name: 'Tempi realizzazione', value: '45-90 giorni' },
    { '@type': 'PropertyValue', name: 'Garanzia struttura', value: '50 anni' },
  ],
}

export default function ResidenzialiPage() {
  const tipologia = getTipologiaById('residenziali')!
  const featureIconBgStyle = useMemo(() => ({ backgroundColor: `${tipologia.color}15` }), [tipologia.color])
  const featureIconColorStyle = useMemo(() => ({ color: tipologia.color }), [tipologia.color])

  return (
    <div className="min-h-screen">
      <JsonLd data={residenzialiJsonLd} />

      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={tipologia.heroImage}
            alt={tipologia.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-[#1D1D1F]/90" />
        </div>

        {/* Floating orbs */}
        <motion.div
          className="absolute top-1/3 -left-20 w-72 h-72 rounded-full bg-[#48484A]/20 blur-[100px] pointer-events-none"
          animate={floatingOrbAnimate}
          transition={floatingOrbTransition}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-32">
          <ScrollReveal direction="up">
            <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium tracking-wider mb-8">
              {tipologia.category}
            </span>
          </ScrollReveal>

          <BlurText
            text={tipologia.title}
            className="font-serif text-5xl md:text-7xl text-white mb-8"
            delay={120}
            animateBy="words"
            direction="bottom"
          />

          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed">
              {tipologia.description}
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <div className="flex flex-wrap justify-center gap-10 mb-12">
              {tipologia.specs.map((spec) => (
                <div key={spec.label} className="text-center">
                  <p className="text-2xl font-bold text-white">{spec.value}</p>
                  <p className="text-white/50 text-sm mt-1">{spec.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contatti"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#48484A] text-white font-semibold rounded-full hover:bg-[#245040] transition-all duration-300 hover:shadow-lg hover:shadow-[#48484A]/20"
              >
                Consulenza Gratuita
              </Link>
              <Link
                href="/tipologie"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Torna alle Tipologie
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#1D1D1F" to="#F5F5F7" height={80} />

      {/* CARATTERISTICHE */}
      <section className="py-28 lg:py-36 px-4 bg-[#F5F5F7]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="up" className="text-center mb-20">
            <span className="text-[#A0845C] text-sm font-semibold tracking-widest uppercase">
              Tutto incluso
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#1D1D1F] mt-3 mb-4">
              Tutto Incluso
            </h2>
            <p className="text-[#86868B] text-lg max-w-2xl mx-auto">
              Dal progetto alle chiavi in mano, ogni dettaglio pensato per la tua famiglia
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tipologia.features.map((feature, i) => {
              const Icon = featureIcons[i] || Building2
              return (
                <ScrollReveal
                  key={feature}
                  direction="up"
                  delay={i * 0.08}
                >
                  <SpotlightCard
                    className="p-7 bg-white border border-[#EDE6DB] hover:border-[#A0845C]/30 transition-all duration-300 h-full"
                    spotlightColor={`${tipologia.color}20`}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                      style={featureIconBgStyle}
                    >
                      <Icon className="w-6 h-6" style={featureIconColorStyle} />
                    </div>
                    <h3 className="text-lg font-semibold text-[#1D1D1F] mb-2">{feature}</h3>
                    <p className="text-[#86868B] text-sm leading-relaxed">
                      {featureDescriptions[feature] || ''}
                    </p>
                  </SpotlightCard>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-[#F5F5F7] pb-1">
        <div className="bg-[#A0845C]/10 border-y border-[#A0845C]/20 py-4">
          <InfiniteMarquee
            items={residenzialiMarqueeItems}
            speed={25}
            className="text-[#1D1D1F]/70"
          />
        </div>
      </div>

      <SectionTransition from="#F5F5F7" to="#FFFFFF" height={80} />

      {/* COSA INCLUDE - CHIAVI IN MANO */}
      <section className="py-28 lg:py-36 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="up" className="text-center mb-20">
            <span className="text-[#A0845C] text-sm font-semibold tracking-widest uppercase">
              Chiavi in Mano
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#1D1D1F] mt-3 mb-4">
              Cosa Include
            </h2>
            <p className="text-[#86868B] text-lg max-w-2xl mx-auto">
              Dalla struttura alle finiture, ogni dettaglio pensato per consegnarti una casa pronta da vivere
            </p>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Grezzo Avanzato */}
            <ScrollReveal direction="left" delay={0.1}>
              <SpotlightCard className="bg-[#F5F5F7] border border-[#EDE6DB] h-full">
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#A0845C]/10 flex items-center justify-center">
                      <Package className="w-6 h-6 text-[#A0845C]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#1D1D1F]">Grezzo Avanzato</h3>
                      <p className="text-[#86868B] text-sm">Dotazioni di serie</p>
                    </div>
                  </div>
                  <ul className="space-y-4">
                    {grezzoAvanzatoItems.map((item, i) => {
                      const Icon = item.icon
                      return (
                        <ScrollReveal key={i} delay={0.15 + i * 0.05} direction="left">
                          <li className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/80 transition-colors">
                            <div className="w-8 h-8 rounded-lg bg-[#A0845C]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Icon className="w-4 h-4 text-[#A0845C]" />
                            </div>
                            <span className="text-[#4A4540] text-sm leading-relaxed">{item.text}</span>
                          </li>
                        </ScrollReveal>
                      )
                    })}
                  </ul>
                </div>
              </SpotlightCard>
            </ScrollReveal>

            {/* Chiavi in Mano */}
            <ScrollReveal direction="right" delay={0.15}>
              <SpotlightCard className="bg-[#1D1D1F] border border-[#333] h-full">
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#A0845C]/20 flex items-center justify-center">
                      <Key className="w-6 h-6 text-[#A0845C]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Chiavi in Mano</h3>
                      <p className="text-white/50 text-sm">Tutto il Grezzo Avanzato + finiture complete</p>
                    </div>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {chiaviInManoItems.map((item, i) => (
                      <ScrollReveal key={i} delay={0.2 + i * 0.05} direction="right">
                        <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                          <CheckCircle className="w-5 h-5 text-[#A0845C] flex-shrink-0" />
                          <span className="text-white/80 text-sm">{item}</span>
                        </li>
                      </ScrollReveal>
                    ))}
                  </ul>

                  {/* Upgrade A4 */}
                  <div className="border-t border-white/10 pt-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Zap className="w-5 h-5 text-[#A0845C]" />
                      <h4 className="text-white font-semibold">Opzionale: Classe A4</h4>
                    </div>
                    <p className="text-white/50 text-sm mb-4">
                      Pompa di calore LG Therma V R290 (A+++) + Pannelli fotovoltaici bi-facciali 700W
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {classeA4Options.map((opt, i) => (
                        <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/10">
                          <div className="text-[#A0845C] font-bold text-lg">{opt.price}</div>
                          <div className="text-white font-medium text-sm mt-1">{opt.label}</div>
                          <div className="text-white/40 text-xs mt-1">{opt.specs}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionTransition from="#FFFFFF" to="#1D1D1F" height={80} />

      {/* PROCESSO */}
      <section className="relative py-28 lg:py-36 px-4 bg-[#1D1D1F] overflow-hidden">
        {/* Decorative orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#A0845C]/5 blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <ScrollReveal direction="up" className="text-center mb-20">
            <span className="text-[#A0845C] text-sm font-semibold tracking-widest uppercase">
              Come lavoriamo
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-white mt-3 mb-4">
              Il Processo
            </h2>
            <p className="text-white/60 text-lg">La tua casa in 5 semplici step</p>
          </ScrollReveal>

          <div className="space-y-6">
            {processSteps.map((item, i) => (
              <ScrollReveal
                key={item.step}
                direction="left"
                delay={i * 0.1}
              >
                <GlassCard intensity="light" className="flex gap-6 items-start !p-6">
                  <span className="text-3xl font-bold text-[#A0845C] shrink-0 w-12">
                    {item.step}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-white/50 leading-relaxed">{item.desc}</p>
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionTransition from="#1D1D1F" to="#A0845C" height={80} />

      {/* CTA */}
      <section className="relative py-28 lg:py-36 px-4 bg-[#A0845C] overflow-hidden">
        {/* Animated orb */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/5 blur-[150px] pointer-events-none"
          animate={ctaOrbAnimate}
          transition={ctaOrbTransition}
        />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <ScrollReveal direction="up">
            <h2 className="font-serif text-3xl md:text-5xl text-white mb-8">
              Inizia a costruire il tuo futuro
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <p className="text-white/80 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
              Contattaci per una consulenza gratuita e scopri come realizzare la casa perfetta per la tua famiglia.
            </p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contatti"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#1D1D1F] font-semibold rounded-full hover:bg-white/90 transition-all duration-300 hover:shadow-lg"
              >
                Consulenza Gratuita
              </Link>
              <a
                href="tel:+3909631951395"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Chiama Ora
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  )
}
