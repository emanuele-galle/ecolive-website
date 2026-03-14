'use client'

import Link from 'next/link'
import {
  Factory,
  GraduationCap,
  Wrench,
  Users,
  CheckCircle,
  Phone,
  ArrowRight,
  TrendingUp,
  Shield,
  Banknote,
} from 'lucide-react'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionTransition from '@/components/ui/SectionTransition'
import CountUp from '@/components/ui/CountUp'

/* ─── Data ─── */

const provisions = [
  {
    icon: Factory,
    title: 'Know-how produttivo',
    description:
      'Accesso completo alla tecnologia X-Frame: brevetti, processi industriali, software gestionale e controllo qualita. Produzione studiata all\'estremo, replicabile.',
  },
  {
    icon: GraduationCap,
    title: 'Formazione continua',
    description:
      'Training iniziale e aggiornamenti periodici per il tuo team: produzione, vendita, gestione cantiere. Ti affianchiamo fino alla piena autonomia.',
  },
  {
    icon: Wrench,
    title: 'Attrezzature',
    description:
      'Setup completo del laboratorio produttivo con macchinari dedicati. Niente macchine CNC costose. L\'investimento non supera quasi mai i 100.000 euro.',
  },
  {
    icon: Users,
    title: 'Flusso clienti garantito',
    description:
      'Il cliente che non e riuscito a costruire con noi se lo prende l\'affiliato. Ne Tecnocasa ne Gabetti danno questo. Loro ti danno il marchio, noi ti diamo il cliente.',
  },
]

const investmentStats = [
  { value: 100, suffix: 'k', label: 'Investimento massimo' },
  { value: 6, suffix: '', label: 'Operatori per turno' },
  { value: 10, suffix: '+', label: 'Case/anno per affiliato' },
]

const scalabilitySteps = [
  {
    num: '01',
    title: 'Singolo laboratorio',
    desc: 'Inizi con un laboratorio nella tua zona, servendo il mercato locale con il supporto completo di EcoLive.',
  },
  {
    num: '02',
    title: 'Espansione regionale',
    desc: 'Cresci con nuove commesse, ampli la capacita produttiva. Doppi turni di lavoro quando la domanda aumenta.',
  },
  {
    num: '03',
    title: 'Rete nazionale',
    desc: 'Diventi parte di una rete di produzione decentralizzata su tutto il territorio. Dal 2027: espansione massiva.',
  },
]

const businessModelItems = [
  'Fee di ingresso per accesso al know-how e setup iniziale',
  'Royalties sulla produzione: modello trasparente e sostenibile',
  'Contratto di affiliazione con esclusiva territoriale',
  'Supporto marketing centralizzato e materiale promozionale',
  'Assistenza tecnica continua e aggiornamenti di processo',
]

/* ─── Component ─── */

export default function FranchisingContent() {
  return (
    <div className="overflow-hidden">

      {/* ── HERO ── */}
      <section className="relative bg-[#1D1D1F] py-32 md:py-40 lg:py-48">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1D1D1F] via-[#1D1D1F] to-[#141414]" />
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03]" />
        <div className="absolute top-20 left-10 w-2 h-2 rounded-full bg-[#A0845C]/30" />
        <div className="absolute top-32 right-20 w-1.5 h-1.5 rounded-full bg-[#A0845C]/20" />
        <div className="absolute bottom-24 left-1/4 w-1 h-1 rounded-full bg-white/10" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <ScrollReveal>
            <span className="inline-block px-5 py-2 mb-8 text-sm font-medium text-[#A0845C] bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              Opportunita di Business
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1]">
              Porta la Rivoluzione X-Frame
              <span className="block text-[#A0845C]">nel Tuo Territorio</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-8 text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Produci case X-Frame nella tua zona con il know-how EcoLive. Un modello di
              produzione decentralizzata &mdash; come McDonald&apos;s: produzione studiata
              all&apos;estremo, replicabile ovunque.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#1D1D1F" to="#F5F5F7" height={80} />

      {/* ── VISIONE: PRODUZIONE DECENTRALIZZATA ── */}
      <section className="py-24 lg:py-32 px-6 bg-[#F5F5F7]">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">
              La Visione
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mt-3 leading-tight">
              Produzione decentralizzata
            </h2>
            <div className="mt-5 flex items-center justify-center gap-3">
              <div className="w-8 h-0.5 bg-[#A0845C]/40" />
              <div className="w-2 h-2 rounded-full bg-[#A0845C]" />
              <div className="w-8 h-0.5 bg-[#A0845C]/40" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="mt-8 text-lg text-[#86868B] leading-relaxed max-w-3xl mx-auto">
              EcoLive ha sviluppato un sistema costruttivo brevettato che puo essere replicato
              ovunque. Gli affiliati producono localmente utilizzando il know-how, i processi e
              gli standard qualitativi EcoLive. Meno trasporto, piu velocita, piu valore per il
              territorio. Dal 2027 dovremo far fronte alla domanda: espansione in loco, doppi
              turni di lavoro.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#F5F5F7" to="#1D1D1F" height={80} />

      {/* ── IL VANTAGGIO UNICO (dark + grain + dramatic) ── */}
      <section className="relative py-24 lg:py-32 px-6 bg-[#1D1D1F]">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03]" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">
                Il Vantaggio Unico
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3 leading-tight">
                &ldquo;Noi ti diamo il cliente&rdquo;
              </h2>
              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
                <div className="w-2 h-2 rounded-full bg-[#A0845C]" />
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10 text-center">
              <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto mb-8">
                Quando EcoLive riceve una richiesta che non puo gestire per tempistiche
                o logistica, il cliente viene affidato all&apos;affiliato piu vicino.
                Il cliente che non e riuscito a costruire con noi, se lo prende l&apos;affiliato.
              </p>
              <motion.div
                className="inline-flex items-center gap-3 px-6 py-4 bg-[#A0845C]/20 rounded-xl border border-[#A0845C]/30"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Shield className="w-6 h-6 text-[#A0845C]" />
                <span className="text-white font-semibold text-lg">
                  Nessun altro franchising edile puo garantirti questo
                </span>
              </motion.div>
              <p className="mt-8 text-white/50 italic">
                &ldquo;Ne Tecnocasa ne Gabetti danno questo. Loro ti danno il marchio,
                noi ti diamo il cliente.&rdquo;
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#1D1D1F" to="#FFFFFF" height={80} />

      {/* ── COSA TI FORNIAMO ── */}
      <section className="py-24 lg:py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">
                Il Pacchetto
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mt-3">
                Cosa ti forniamo
              </h2>
              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
                <div className="w-2 h-2 rounded-full bg-[#A0845C]" />
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
              </div>
              <p className="mt-6 text-[#86868B] text-lg max-w-2xl mx-auto">
                Tutto cio che serve per avviare e gestire la tua produzione X-Frame
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {provisions.map((item, i) => {
              const Icon = item.icon
              return (
                <ScrollReveal key={item.title} delay={i * 0.1} direction="up">
                  <motion.div
                    className="bg-[#F5F5F7] rounded-2xl p-8 border border-[#D2D2D7] h-full"
                    whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-14 h-14 bg-[#A0845C]/10 rounded-xl flex items-center justify-center mb-5">
                      <Icon className="w-7 h-7 text-[#A0845C]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1D1D1F] mb-3">{item.title}</h3>
                    <p className="text-[#86868B] leading-relaxed">{item.description}</p>
                  </motion.div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      <SectionTransition from="#FFFFFF" to="#F5F5F7" height={80} />

      {/* ── INVESTIMENTO (Stats + CountUp) ── */}
      <section className="py-24 lg:py-32 px-6 bg-[#F5F5F7]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">
                L&apos;Investimento
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mt-3">
                Numeri chiari
              </h2>
              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
                <div className="w-2 h-2 rounded-full bg-[#A0845C]" />
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
              </div>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {investmentStats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.12} direction="up">
                <motion.div
                  className="bg-white rounded-2xl p-8 border border-[#D2D2D7] text-center"
                  whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-12 h-12 rounded-full bg-[#A0845C]/10 flex items-center justify-center mx-auto mb-4">
                    <Banknote className="w-6 h-6 text-[#A0845C]" />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-[#1D1D1F]">
                    <CountUp to={stat.value} duration={2.5} delay={0.3 + i * 0.2} suffix={stat.suffix} />
                    {stat.label === 'Investimento massimo' && (
                      <span className="text-2xl text-[#A0845C] ml-1">&euro;</span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-[#86868B] uppercase tracking-wide">
                    {stat.label}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#D2D2D7] text-center">
              <p className="text-[#86868B] leading-relaxed">
                <strong className="text-[#1D1D1F]">Niente macchine CNC costose.</strong>{' '}
                L&apos;investimento non supera quasi mai i 100.000 euro. Attualmente 4-6 operatori
                per turno, con possibilita di doppi turni per scalare la produzione.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#F5F5F7" to="#FFFFFF" height={80} />

      {/* ── MODELLO DI BUSINESS ── */}
      <section className="py-24 lg:py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">
                Business Model
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mt-3">
                Modello di business
              </h2>
              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
                <div className="w-2 h-2 rounded-full bg-[#A0845C]" />
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="bg-[#F5F5F7] rounded-2xl p-8 md:p-10 border border-[#D2D2D7]">
              <ul className="space-y-5">
                {businessModelItems.map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <div className="w-8 h-8 bg-[#A0845C] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white font-bold text-sm">{i + 1}</span>
                    </div>
                    <span className="text-[#1D1D1F] text-lg">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#FFFFFF" to="#F5F5F7" height={80} />

      {/* ── SCALABILITA ── */}
      <section className="py-24 lg:py-32 px-6 bg-[#F5F5F7]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">
                Crescita
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mt-3">
                Scalabilita
              </h2>
              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
                <div className="w-2 h-2 rounded-full bg-[#A0845C]" />
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
              </div>
              <p className="mt-6 text-[#86868B] text-lg max-w-2xl mx-auto">
                Da singolo laboratorio a rete produttiva nazionale
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {scalabilitySteps.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.12} direction="up">
                <motion.div
                  className="relative bg-white rounded-2xl p-8 border border-[#D2D2D7] text-center h-full"
                  whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-5xl font-bold text-[#A0845C]/20">{step.num}</span>
                  <h3 className="text-xl font-bold text-[#1D1D1F] mt-2 mb-3">{step.title}</h3>
                  <p className="text-[#86868B] leading-relaxed">{step.desc}</p>
                  {i < scalabilitySteps.length - 1 && (
                    <TrendingUp className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-[#A0845C]/40 z-10" />
                  )}
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionTransition from="#F5F5F7" to="#FFFFFF" height={80} />

      {/* ── REFERENTE AFFILIAZIONI ── */}
      <section className="py-20 lg:py-28 px-6 bg-white">
        <ScrollReveal>
          <div className="max-w-xl mx-auto bg-[#F5F5F7] rounded-2xl p-8 md:p-10 border border-[#D2D2D7] text-center">
            <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">
              Referente Affiliazioni
            </span>
            <p className="text-xl font-semibold text-[#1D1D1F] mt-3 mb-1">
              Dott.ssa Sara Santaguida
            </p>
            <p className="text-[#86868B] mb-6">
              Area Legale / Affiliazioni
            </p>
            <a
              href="tel:+393387774250"
              className="inline-flex items-center gap-2 text-[#A0845C] font-semibold text-lg hover:text-[#856B45] transition-colors"
            >
              <Phone className="w-5 h-5" />
              338.7774250
            </a>
          </div>
        </ScrollReveal>
      </section>

      <SectionTransition from="#FFFFFF" to="#1D1D1F" height={80} />

      {/* ── CTA ── */}
      <section className="relative py-24 lg:py-32 px-6 bg-[#1D1D1F]">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03]" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Pronto a portare X-Frame nel tuo territorio?
            </h2>
            <p className="text-white/70 mb-10 text-lg max-w-2xl mx-auto leading-relaxed">
              Contattaci per ricevere il dossier di affiliazione completo e fissare un
              incontro con il nostro team.
            </p>
            <Link
              href="/contatti?oggetto=affiliazione"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#A0845C] text-white font-semibold rounded-full hover:bg-[#856B45] transition-all duration-300 hover:shadow-lg hover:shadow-[#A0845C]/20"
            >
              Richiedi il Dossier
              <ArrowRight className="w-5 h-5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

    </div>
  )
}
