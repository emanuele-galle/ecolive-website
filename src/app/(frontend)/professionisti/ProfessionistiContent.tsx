'use client'

import Link from 'next/link'
import {
  Compass,
  FileText,
  Presentation,
  Layers,
  Ruler,
  ArrowRight,
  CheckCircle,
  Phone,
  Mail,
  Clock,
  Award,
  TrendingUp,
  MapPin,
  Building2,
  Eye,
} from 'lucide-react'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionTransition from '@/components/ui/SectionTransition'

/* ─── Data ─── */

const whyCards = [
  {
    icon: Compass,
    title: 'Differenziazione sul mercato',
    description:
      'In Calabria e al Sud le case in legno rappresentano solo l\'1% del costruito, contro il 15% al Nord e il 70% nel Nord Europa. Proporre X-Frame significa distinguersi con un vantaggio competitivo concreto.',
  },
  {
    icon: Presentation,
    title: 'Materiale professionale',
    description:
      'Rendering fotorealistici, animazioni 3D, spaccati costruttivi. Tutto il materiale di presentazione per convincere i tuoi committenti con immagini, non solo parole.',
  },
  {
    icon: FileText,
    title: 'Supporto tecnico diretto',
    description:
      'Assistenza continua dal Direttore Tecnico Arch. Pasquale Zaffino. Calcoli strutturali, dettagli esecutivi, documentazione tecnica completa per ogni progetto.',
  },
  {
    icon: Eye,
    title: 'Cantiere dimostrativo',
    description:
      'Porta i tuoi clienti in cantiere per vedere il sistema X-Frame dal vivo. La casa dimostrativa diventa il tuo miglior strumento di vendita.',
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
  { label: 'Trasmittanza parete', value: 'U = 0,159 W/m\u00b2K' },
  { label: 'Sfasamento parete', value: '18,8 ore' },
  { label: 'Spessore parete totale', value: '29 cm' },
  { label: 'Normativa strutturale', value: 'Eurocodice 5' },
]

const certifications = [
  { name: 'Classe A4 CliMAX', desc: 'Massima classe energetica italiana' },
  { name: 'Passive House / PHIUS', desc: 'Standard casa passiva internazionale' },
  { name: 'ARCA', desc: 'Certificazione edilizia residenziale in legno' },
  { name: 'LEED for Homes', desc: 'Rating system sostenibilita edilizia' },
]

const timelineSteps = [
  { time: '7 giorni', label: 'Struttura portante montata' },
  { time: '7 giorni', label: 'Grezzo avanzato completato' },
  { time: '30 giorni', label: 'Chiavi in mano' },
]

const opportunities = [
  {
    icon: Building2,
    title: 'Proponi un\'alternativa innovativa',
    description:
      'I tuoi clienti cercano casa? Offri loro un\'alternativa superiore alla muratura tradizionale: piu veloce, piu performante, piu sostenibile.',
  },
  {
    icon: MapPin,
    title: 'Sviluppa progetti immobiliari',
    description:
      'Hai clienti con terreni edificabili? Lottizza e sviluppa interi quartieri con il sistema X-Frame. Dal singolo lotto al complesso residenziale.',
  },
  {
    icon: TrendingUp,
    title: 'Casa dimostrativa come volano',
    description:
      'Una sola casa X-Frame realizzata diventa lo strumento di vendita per altri lotti. I clienti vedono, toccano, capiscono. E comprano.',
  },
]

const bimFeatures = [
  'Progettazione su Autodesk Revit con modelli parametrici',
  'Librerie BIM con tutti i componenti X-Frame (in sviluppo)',
  'Stratigrafie complete codificate A-Q (pareti, solai, coperture)',
  'Passaggio diretto da modello BIM a disegni di produzione',
  'Processo standardizzato dal progetto alla fabbrica',
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
            <span className="inline-block px-5 py-2 mb-8 text-sm font-medium text-[#A0845C] bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              Per Architetti, Ingegneri e Geometri
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1]">
              Integra X-Frame
              <span className="block text-[#A0845C]">nei Tuoi Progetti</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-8 text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Sei spesso il primo interlocutore del cliente. Se conosci il sistema
              X-Frame, puoi proporlo come alternativa concreta alla muratura tradizionale.
              Dati tecnici, certificazioni e supporto progettuale completo.
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
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {whyCards.map((card, i) => {
              const Icon = card.icon
              return (
                <ScrollReveal key={card.title} delay={i * 0.1} direction="up">
                  <motion.div
                    className="bg-white rounded-2xl p-8 border border-[#D2D2D7] h-full"
                    whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-14 h-14 bg-[#A0845C]/10 rounded-xl flex items-center justify-center mb-5">
                      <Icon className="w-7 h-7 text-[#A0845C]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1D1D1F] mb-3">{card.title}</h3>
                    <p className="text-[#86868B] text-base leading-relaxed">{card.description}</p>
                  </motion.div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      <SectionTransition from="#F5F5F7" to="#FFFFFF" height={80} />

      {/* ── DATI TECNICI ── */}
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
              <p className="mt-6 text-[#86868B] text-lg md:text-xl max-w-2xl mx-auto">
                Progettazione su Autodesk Revit, Eurocodice 5, stratigrafie complete con codici A-Q
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
                    Stratigrafia Parete Tipo
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

            {/* Valori + Certificazioni */}
            <div className="space-y-6">
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

              <ScrollReveal delay={0.3} direction="right">
                <div className="bg-[#F5F5F7] rounded-2xl p-8 border border-[#D2D2D7]">
                  <div className="flex items-center gap-3 mb-5">
                    <Award className="w-6 h-6 text-[#A0845C]" />
                    <h3 className="text-xl font-bold text-[#1D1D1F]">Certificazioni</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {certifications.map((cert) => (
                      <div key={cert.name} className="bg-white rounded-lg p-3 border border-[#D2D2D7]/50">
                        <p className="text-[#1D1D1F] font-semibold text-sm">{cert.name}</p>
                        <p className="text-[#86868B] text-xs mt-0.5">{cert.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <SectionTransition from="#FFFFFF" to="#1D1D1F" height={80} />

      {/* ── TEMPI CERTI (dark) ── */}
      <section className="relative py-24 lg:py-32 px-6 bg-[#1D1D1F]">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03]" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">
                Tempi Certi
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3">
                Dal progetto alla consegna
              </h2>
              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
                <div className="w-2 h-2 rounded-full bg-[#A0845C]" />
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
              </div>
              <p className="mt-6 text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
                Tempistiche reali, non promesse. Dati che puoi comunicare ai tuoi clienti.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {timelineSteps.map((step, i) => (
              <ScrollReveal key={step.time} delay={i * 0.12} direction="up">
                <motion.div
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center"
                  whileHover={{ y: -4, borderColor: 'rgba(160,132,92,0.4)' }}
                  transition={{ duration: 0.3 }}
                >
                  <Clock className="w-8 h-8 text-[#A0845C] mx-auto mb-4" />
                  <p className="text-3xl md:text-4xl font-bold text-white mb-2">{step.time}</p>
                  <p className="text-white/60 text-sm">{step.label}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* BIM Features */}
          <ScrollReveal delay={0.3}>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6 text-center">Workflow BIM integrato</h3>
              <ul className="space-y-4">
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

      {/* ── OPPORTUNITA COMMERCIALE ── */}
      <section className="py-24 lg:py-32 px-6 bg-[#F5F5F7]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">
                Per il Tuo Business
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mt-3">
                Opportunita commerciale
              </h2>
              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
                <div className="w-2 h-2 rounded-full bg-[#A0845C]" />
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
              </div>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {opportunities.map((opp, i) => {
              const Icon = opp.icon
              return (
                <ScrollReveal key={opp.title} delay={i * 0.1} direction="up">
                  <motion.div
                    className="bg-white rounded-2xl p-8 border border-[#D2D2D7] h-full text-center"
                    whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-14 h-14 bg-[#A0845C]/10 rounded-xl flex items-center justify-center mx-auto mb-5">
                      <Icon className="w-7 h-7 text-[#A0845C]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#1D1D1F] mb-3">{opp.title}</h3>
                    <p className="text-[#86868B] leading-relaxed text-base">{opp.description}</p>
                  </motion.div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      <SectionTransition from="#F5F5F7" to="#1D1D1F" height={80} />

      {/* ── CTA + CONTATTI ── */}
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
            <p className="text-white/70 text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
              Entra nella rete dei professionisti EcoLive. Supporto dedicato, materiale
              tecnico e nuove opportunita progettuali.
            </p>

            <Link
              href="/contatti?oggetto=professionista"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#A0845C] text-white font-semibold rounded-full hover:bg-[#856B45] transition-all duration-300 hover:shadow-lg hover:shadow-[#A0845C]/20"
            >
              Diventa Partner Tecnico
              <ArrowRight className="w-5 h-5" />
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mt-14 pt-8 border-t border-white/10">
              <p className="text-white/50 text-sm mb-6 uppercase tracking-wide">Contatto diretto</p>

              <div className="grid sm:grid-cols-2 gap-6">
                {/* Direttore Tecnico */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <p className="text-white font-semibold text-lg">Arch. Pasquale Zaffino</p>
                  <p className="text-white/50 text-sm mb-4">Direttore Tecnico</p>
                  <a
                    href="tel:+393409013774"
                    className="inline-flex items-center gap-2 text-[#A0845C] hover:text-white transition-colors text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    340.9013774
                  </a>
                </div>

                {/* Responsabile Commerciale */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <p className="text-white font-semibold text-lg">Ing. Luisa Baffa</p>
                  <p className="text-white/50 text-sm mb-4">Resp. Commerciale</p>
                  <div className="flex flex-col gap-2">
                    <a
                      href="tel:+393287107639"
                      className="inline-flex items-center gap-2 text-[#A0845C] hover:text-white transition-colors text-sm"
                    >
                      <Phone className="w-4 h-4" />
                      328.7107639
                    </a>
                    <a
                      href="mailto:info@ecolive.srl"
                      className="inline-flex items-center gap-2 text-[#A0845C] hover:text-white transition-colors text-sm"
                    >
                      <Mail className="w-4 h-4" />
                      info@ecolive.srl
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  )
}
