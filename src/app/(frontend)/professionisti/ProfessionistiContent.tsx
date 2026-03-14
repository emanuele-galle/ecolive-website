'use client'

import Link from 'next/link'
import {
  Compass,
  FileText,
  Presentation,
  Layers,
  Box,
  ArrowRight,
  CheckCircle,
  Phone,
  Mail,
  Ruler,
} from 'lucide-react'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionTransition from '@/components/ui/SectionTransition'

/* ─── Data ─── */

const whyCards = [
  {
    icon: Compass,
    title: 'Differenziati sul Mercato',
    description:
      'Offri ai tuoi clienti un sistema costruttivo rivoluzionario. Distinguiti dalla concorrenza che propone solo muratura tradizionale. Il sistema X-Frame e un vantaggio competitivo concreto.',
  },
  {
    icon: FileText,
    title: 'Supporto Tecnico Completo',
    description:
      'Calcoli strutturali Eurocode 5 (NTC 2018), dettagli stratigrafici completi, documentazione tecnica e assistenza continua durante tutto il progetto.',
  },
  {
    icon: Presentation,
    title: 'Materiale di Presentazione',
    description:
      'Rendering fotorealistici con Blender/Twinmotion, animazioni 3D nel contesto reale, documentazione tecnica professionale da presentare ai committenti.',
  },
]

const wallLayers = [
  { code: 'A', name: 'Pannello interno in cartongesso', thickness: '12.5 mm' },
  { code: 'B', name: 'Freno vapore e tenuta aria', thickness: '-' },
  { code: 'C', name: 'Installazione impiantistica', thickness: '50 mm' },
  { code: 'D', name: 'Pannello OSB strutturale', thickness: '15 mm' },
  { code: 'E', name: 'Montante in legno + fibra di legno', thickness: '120 mm' },
  { code: 'F', name: 'Pannello OSB di controvento', thickness: '15 mm' },
  { code: 'G', name: 'Isolamento fibra di legno', thickness: '60 mm' },
  { code: 'Q', name: 'Intonaco su rete / rivestimento', thickness: '8 mm' },
]

const techSpecs = [
  { label: 'Trasmittanza parete', value: 'U = 0.159 W/m\u00b2K' },
  { label: 'Sfasamento parete', value: '18.8 ore' },
  { label: 'Spessore parete totale', value: '29 cm' },
  { label: 'Trasmittanza copertura', value: 'U = 0.137 W/m\u00b2K' },
  { label: 'Sfasamento copertura', value: '14.5 ore' },
  { label: 'Spessore copertura', value: '40 cm' },
  { label: 'Griglia strutturale', value: '4\u20134.5 m \u00d7 7 m' },
  { label: 'Normativa', value: 'Eurocode 5 (NTC 2018)' },
]

const collaborationSteps = [
  {
    number: '01',
    title: 'Contatto Iniziale',
    description: 'Contatta EcoLive con il progetto del tuo cliente. Analizziamo insieme fattibilita, tempistiche e costi. Valutazione tecnica preliminare gratuita.',
  },
  {
    number: '02',
    title: 'Valutazione Tecnica Congiunta',
    description: 'Studio congiunto del progetto: adattamento al sistema X-Frame, verifica strutturale, ottimizzazione energetica. BIM coordinato in Revit.',
  },
  {
    number: '03',
    title: 'Produzione e Montaggio',
    description: 'EcoLive gestisce produzione in stabilimento, trasporto e montaggio della struttura in cantiere. Il professionista mantiene il controllo del progetto.',
  },
  {
    number: '04',
    title: 'Direzione Lavori',
    description: 'Il professionista gestisce pratiche autorizzative, direzione lavori e coordinamento delle altre maestranze. EcoLive fornisce supporto tecnico continuo.',
  },
]

const bimFeatures = [
  'Progettazione in ambiente Revit con modelli parametrici',
  'Libreria BIM con componenti X-Frame (in sviluppo)',
  'Spessori, elementi strutturali e serramenti parametrici',
  'Passaggio diretto da modello BIM a disegni di produzione (AutoCAD)',
  'Processo standardizzato che riduce tempi di progettazione del 40%',
]

/* ─── Component ─── */

export default function ProfessionistiContent() {
  return (
    <div className="overflow-hidden">

      {/* ── HERO ── */}
      <section className="relative bg-[#1D1D1F] py-32 md:py-40 lg:py-48">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1D1D1F] via-[#1D1D1F] to-[#141414]" />
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03]" />
        <div className="absolute top-20 left-10 w-2 h-2 rounded-full bg-[#A0845C]/30" />
        <div className="absolute bottom-24 right-20 w-1.5 h-1.5 rounded-full bg-[#A0845C]/20" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <ScrollReveal>
            <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-[#A0845C] bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              Per Architetti, Ingegneri e Geometri
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1]">
              Per i Professionisti
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-8 text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Integra il sistema X-Frame nei tuoi progetti. BIM su Revit, calcoli strutturali
              Eurocode 5, rendering fotorealistici. Offri ai tuoi clienti una soluzione
              costruttiva superiore.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#1D1D1F" to="#F5F5F7" height={80} />

      {/* ── PERCHE COLLABORARE ── */}
      <section className="py-24 lg:py-32 px-6 bg-[#F5F5F7]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">
                Vantaggi
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mt-3">
                Perche collaborare con EcoLive
              </h2>
              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
                <div className="w-2 h-2 rounded-full bg-[#A0845C]" />
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
              </div>
              <p className="mt-6 text-[#86868B] text-lg max-w-2xl mx-auto">
                Vantaggi concreti per la tua attivita professionale
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {whyCards.map((card, i) => {
              const Icon = card.icon
              return (
                <ScrollReveal key={card.title} delay={i * 0.1} direction="up">
                  <motion.div
                    className="bg-white rounded-2xl p-8 border border-[#D2D2D7] h-full"
                    whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-14 h-14 bg-[#1D1D1F]/10 rounded-xl flex items-center justify-center mb-5">
                      <Icon className="w-7 h-7 text-[#1D1D1F]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1D1D1F] mb-3">{card.title}</h3>
                    <p className="text-[#86868B] leading-relaxed">{card.description}</p>
                  </motion.div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      <SectionTransition from="#F5F5F7" to="#FFFFFF" height={80} />

      {/* ── SPECIFICHE TECNICHE ── */}
      <section className="py-24 lg:py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">
                Dati Tecnici
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mt-3">
                Specifiche per professionisti
              </h2>
              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
                <div className="w-2 h-2 rounded-full bg-[#A0845C]" />
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
              </div>
              <p className="mt-6 text-[#86868B] text-lg max-w-2xl mx-auto">
                Dati di progetto del sistema costruttivo X-Frame
              </p>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Stratigrafia parete */}
            <ScrollReveal delay={0.1} direction="left">
              <div className="bg-[#F5F5F7] rounded-2xl p-8 border border-[#D2D2D7]">
                <div className="flex items-center gap-3 mb-6">
                  <Layers className="w-6 h-6 text-[#A0845C]" />
                  <h3 className="text-xl font-bold text-[#1D1D1F]">
                    Stratigrafia Parete
                  </h3>
                </div>
                <div className="space-y-3">
                  {wallLayers.map((layer) => (
                    <motion.div
                      key={layer.code}
                      className="flex items-center gap-3 text-sm"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="w-7 h-7 bg-[#1D1D1F] text-white rounded flex items-center justify-center font-bold text-xs flex-shrink-0">
                        {layer.code}
                      </span>
                      <span className="flex-1 text-[#1D1D1F]/80">{layer.name}</span>
                      <span className="text-[#86868B] font-mono text-xs">{layer.thickness}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Valori prestazionali */}
            <ScrollReveal delay={0.2} direction="right">
              <div className="bg-[#F5F5F7] rounded-2xl p-8 border border-[#D2D2D7]">
                <div className="flex items-center gap-3 mb-6">
                  <Ruler className="w-6 h-6 text-[#A0845C]" />
                  <h3 className="text-xl font-bold text-[#1D1D1F]">
                    Valori Prestazionali
                  </h3>
                </div>
                <div className="space-y-4">
                  {techSpecs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-center justify-between border-b border-[#D2D2D7]/50 pb-3 last:border-0"
                    >
                      <span className="text-[#1D1D1F]/80 text-sm">{spec.label}</span>
                      <span className="text-[#1D1D1F] font-bold text-sm">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionTransition from="#FFFFFF" to="#1D1D1F" height={80} />

      {/* ── INTEGRAZIONE BIM (dark + grain) ── */}
      <section className="relative py-24 lg:py-32 px-6 bg-[#1D1D1F]">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03]" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">
                Workflow Digitale
              </span>
              <div className="flex items-center justify-center gap-3 mt-3 mb-4">
                <Box className="w-7 h-7 text-[#A0845C]" />
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                  Integrazione BIM
                </h2>
              </div>
              <div className="mt-3 flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
                <div className="w-2 h-2 rounded-full bg-[#A0845C]" />
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
              </div>
              <p className="mt-6 text-white/60 text-lg max-w-2xl mx-auto">
                Dal modello Revit alla produzione: un processo digitale integrato
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/10">
              <ul className="space-y-5">
                {bimFeatures.map((feature, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <CheckCircle className="w-5 h-5 text-[#A0845C] mt-0.5 flex-shrink-0" />
                    <span className="text-white/80 text-lg">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#1D1D1F" to="#F5F5F7" height={80} />

      {/* ── COME FUNZIONA ── */}
      <section className="py-24 lg:py-32 px-6 bg-[#F5F5F7]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">
                Collaborazione
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mt-3">
                Il percorso in quattro fasi
              </h2>
              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
                <div className="w-2 h-2 rounded-full bg-[#A0845C]" />
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
              </div>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {collaborationSteps.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 0.1} direction="up">
                <motion.div
                  className="bg-white rounded-2xl p-8 border border-[#D2D2D7] h-full"
                  whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-4xl font-bold text-[#A0845C]/20">{step.number}</span>
                  <h3 className="text-xl font-bold text-[#1D1D1F] mt-2 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#86868B] leading-relaxed">{step.description}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionTransition from="#F5F5F7" to="#1D1D1F" height={80} />

      {/* ── CTA ── */}
      <section className="relative py-24 lg:py-32 px-6 bg-[#1D1D1F]">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03]" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">
              Partner Tecnico
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3 mb-6 leading-tight">
              Diventa Partner Tecnico
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Entra nella rete dei professionisti EcoLive. Supporto dedicato, materiale
              tecnico e nuove opportunita progettuali.
            </p>

            <Link
              href="/contatti?oggetto=professionista"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#A0845C] text-white font-semibold rounded-full hover:bg-[#856B45] transition-all duration-300 hover:shadow-lg hover:shadow-[#A0845C]/20"
            >
              Contattaci <ArrowRight className="w-5 h-5" />
            </Link>

            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-white/50 text-sm mb-3 uppercase tracking-wide">Contatto diretto</p>
              <p className="text-white font-semibold text-lg">Ing. Luisa Baffa</p>
              <p className="text-white/60 text-sm mb-4">Responsabile Commerciale</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:+393287107639"
                  className="inline-flex items-center gap-2 text-[#A0845C] hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  328.710.7639
                </a>
                <a
                  href="mailto:info@ecolive.srl"
                  className="inline-flex items-center gap-2 text-[#A0845C] hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  info@ecolive.srl
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  )
}
