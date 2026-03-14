'use client'

import Link from 'next/link'
import {
  Factory,
  GraduationCap,
  Wrench,
  Users,
  Phone,
  ArrowRight,
  TrendingUp,
  Shield,
  Banknote,
  Building2,
  Home,
  Tent,
  Landmark,
  AlertTriangle,
  MapPin,
} from 'lucide-react'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionTransition from '@/components/ui/SectionTransition'
import CountUp from '@/components/ui/CountUp'

/* ─── Data ─── */

const provisions = [
  {
    icon: Factory,
    title: 'Know-how completo',
    description:
      'Accesso integrale al sistema X-Frame: brevetti, processi industriali, software gestionale e controllo qualita. Produzione industrializzata come nel settore automotive, con optional personalizzabili.',
  },
  {
    icon: Wrench,
    title: 'Macchinari e attrezzature',
    description:
      'Setup completo del laboratorio produttivo con macchinari specifici per il sistema X-Frame. Niente macchine CNC costose: investimento contenuto, circa 100.000 euro.',
  },
  {
    icon: GraduationCap,
    title: 'Formazione operatori',
    description:
      'Training completo del personale con procedure standard e replicabili. Come McDonald\'s: ogni passaggio e studiato per essere eseguito in modo identico, ovunque.',
  },
  {
    icon: Users,
    title: 'Flusso clienti garantito',
    description:
      'Il cliente che EcoLive non riesce a seguire viene indirizzato all\'affiliato. Nessun altro franchising edile puo garantire questo. Il flusso e generato direttamente dal sistema.',
  },
]

const investmentStats = [
  { value: 100, suffix: 'k', label: 'Investimento iniziale', prefix: '~' },
  { value: 6, suffix: '', label: 'Operatori per turno' },
  { value: 1, suffix: '', label: 'Giorno per la struttura' },
]

const scalabilityItems = [
  {
    icon: Home,
    title: 'Abitazioni residenziali',
    description: 'Ville unifamiliari, bifamiliari, schiera. Dalla singola commessa alle lottizzazioni e villaggi residenziali completi.',
  },
  {
    icon: Tent,
    title: 'Moduli glamping e turismo',
    description: 'Strutture turistiche, moduli glamping, resort ecologici. Il legno strutturale si integra perfettamente nel paesaggio.',
  },
  {
    icon: Building2,
    title: 'Edifici multipiano',
    description: 'Il legno strutturale oggi permette edifici di grandi dimensioni. Condomini, uffici, strutture commerciali multipiano.',
  },
  {
    icon: Landmark,
    title: 'Strutture sportive e speciali',
    description: 'Persino palazzetti dello sport. Il sistema X-Frame non ha limiti tipologici, solo quelli dell\'immaginazione.',
  },
]

const businessModelItems = [
  { label: 'Fee d\'ingresso', desc: 'Accesso al know-how, setup iniziale e formazione completa del team' },
  { label: 'Royalty sulla produzione', desc: 'Modello trasparente e sostenibile, percentuali chiare sul prodotto' },
  { label: 'Contratto di affiliazione', desc: 'Termini commerciali definiti, con supporto tecnico e progettuale continuo' },
  { label: 'Flusso clienti diretto', desc: 'I clienti che EcoLive non riesce a servire vengono indirizzati a te' },
  { label: 'Marketing centralizzato', desc: 'Materiale promozionale professionale e visibilita nel network EcoLive' },
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
              Affiliazione Produttiva
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1]">
              Produci Case X-Frame
              <span className="block text-[#A0845C]">nel Tuo Territorio</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-8 text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Imprese nel settore costruzioni &mdash; bioedilizia o tradizionale &mdash; possono
              adottare il sistema X-Frame e creare stabilimenti produttivi locali.
              EcoLive fornisce macchinari, formazione e, soprattutto, il cliente.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#1D1D1F" to="#F5F5F7" height={80} />

      {/* ── VISIONE: DECENTRALIZZAZIONE PRODUTTIVA ── */}
      <section className="py-24 lg:py-32 px-6 bg-[#F5F5F7]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">
                La Visione
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mt-3 leading-tight">
                Decentralizzazione produttiva
              </h2>
              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
                <div className="w-2 h-2 rounded-full bg-[#A0845C]" />
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
              </div>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal delay={0.1} direction="left">
              <div className="bg-white rounded-2xl p-8 border border-[#D2D2D7] h-full">
                <h3 className="text-xl font-bold text-[#1D1D1F] mb-4">Il contesto</h3>
                <p className="text-[#86868B] leading-relaxed mb-4">
                  Se dal 2027 gli ordinativi cresceranno come previsto, sara necessario
                  un secondo stabilimento produttivo. Due le strade possibili: centralizzare
                  con un&apos;espansione locale a Serra San Bruno, oppure decentralizzare
                  con una rete di affiliati sul territorio.
                </p>
                <p className="text-[#86868B] leading-relaxed">
                  EcoLive ha scelto la seconda via. Continuera a essere la realta
                  produttiva principale, ma gli affiliati permetteranno di coprire
                  la domanda crescente con produzione locale: meno trasporto, piu
                  velocita, piu valore per il territorio.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2} direction="right">
              <div className="bg-white rounded-2xl p-8 border border-[#D2D2D7] h-full">
                <h3 className="text-xl font-bold text-[#1D1D1F] mb-4">Il modello</h3>
                <p className="text-[#86868B] leading-relaxed mb-4">
                  Produzione industrializzata come nel settore automotive: processi
                  standardizzati, optional personalizzabili, qualita costante.
                  Come McDonald&apos;s: ogni passaggio e studiato all&apos;estremo per
                  essere replicabile ovunque.
                </p>
                <p className="text-[#86868B] leading-relaxed">
                  Le imprese nel settore costruzioni &mdash; sia bioedilizia che
                  tradizionale &mdash; possono adottare il sistema X-Frame e creare
                  stabilimenti produttivi locali con il supporto completo di EcoLive.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionTransition from="#F5F5F7" to="#1D1D1F" height={80} />

      {/* ── IL VANTAGGIO UNICO ── */}
      <section className="relative py-24 lg:py-32 px-6 bg-[#1D1D1F]">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03]" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">
                USP Unica
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
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
              <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto mb-6 text-center">
                Questo e il vantaggio piu importante, e lo garantiamo per iscritto.
                Quando EcoLive riceve una richiesta che non puo gestire per tempistiche
                o logistica, il cliente viene affidato all&apos;affiliato piu vicino.
              </p>
              <p className="text-lg text-white/70 leading-relaxed max-w-3xl mx-auto mb-8 text-center">
                Nel franchising classico ti danno il brand ma il cliente devi trovarlo
                da solo. Qui il flusso clienti e generato direttamente dal sistema.
              </p>
              <div className="flex justify-center">
                <motion.div
                  className="inline-flex items-center gap-3 px-6 py-4 bg-[#A0845C]/20 rounded-xl border border-[#A0845C]/30"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Shield className="w-6 h-6 text-[#A0845C]" />
                  <span className="text-white font-semibold text-lg">
                    Garantito contrattualmente
                  </span>
                </motion.div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#1D1D1F" to="#FFFFFF" height={80} />

      {/* ── COSA INCLUDE L'AFFILIAZIONE ── */}
      <section className="py-24 lg:py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">
                Il Pacchetto
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mt-3">
                Cosa include l&apos;affiliazione
              </h2>
              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
                <div className="w-2 h-2 rounded-full bg-[#A0845C]" />
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
              </div>
              <p className="mt-6 text-[#86868B] text-lg max-w-2xl mx-auto">
                Tutto cio che serve per avviare la tua produzione X-Frame
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
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

          {/* Vincolo importante */}
          <ScrollReveal delay={0.4}>
            <div className="bg-[#1D1D1F] rounded-2xl p-6 md:p-8 flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-[#A0845C] flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-white font-semibold mb-2">Vincolo di produzione</h4>
                <p className="text-white/70 leading-relaxed">
                  L&apos;affiliato puo produrre autonomamente <strong className="text-white">solo la struttura portante</strong>.
                  Le pareti e i monoblocchi solaio/copertura devono essere prodotti da EcoLive
                  o sotto la sua diretta supervisione. Questo garantisce la qualita e le
                  prestazioni certificate del sistema X-Frame.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#FFFFFF" to="#F5F5F7" height={80} />

      {/* ── INVESTIMENTO ── */}
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
                    {stat.prefix && <span className="text-2xl text-[#86868B]">{stat.prefix}</span>}
                    <CountUp to={stat.value} duration={2.5} delay={0.3 + i * 0.2} suffix={stat.suffix} />
                    {stat.label === 'Investimento iniziale' && (
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

          {/* Modello di business */}
          <ScrollReveal delay={0.3}>
            <div className="bg-white rounded-2xl p-8 md:p-10 border border-[#D2D2D7]">
              <h3 className="text-xl font-bold text-[#1D1D1F] mb-6 text-center">Modello contrattuale</h3>
              <div className="space-y-5">
                {businessModelItems.map((item, i) => (
                  <motion.div
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
                    <div>
                      <span className="text-[#1D1D1F] font-semibold">{item.label}</span>
                      <p className="text-[#86868B] text-sm mt-1">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#F5F5F7" to="#FFFFFF" height={80} />

      {/* ── SCALABILITA ── */}
      <section className="py-24 lg:py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">
                Cosa Puoi Realizzare
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mt-3">
                Scalabilita senza limiti
              </h2>
              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
                <div className="w-2 h-2 rounded-full bg-[#A0845C]" />
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
              </div>
              <p className="mt-6 text-[#86868B] text-lg max-w-2xl mx-auto">
                Con il sistema X-Frame non ci sono limiti tipologici.
                Dalla singola casa alla lottizzazione, dal glamping al multipiano.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {scalabilityItems.map((item, i) => {
              const Icon = item.icon
              return (
                <ScrollReveal key={item.title} delay={i * 0.1} direction="up">
                  <motion.div
                    className="bg-[#F5F5F7] rounded-2xl p-8 border border-[#D2D2D7] h-full flex items-start gap-5"
                    whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-12 h-12 bg-[#A0845C]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-[#A0845C]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#1D1D1F] mb-2">{item.title}</h3>
                      <p className="text-[#86868B] leading-relaxed text-sm">{item.description}</p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              )
            })}
          </div>

          <ScrollReveal delay={0.4}>
            <div className="mt-10 bg-[#A0845C]/10 rounded-2xl p-6 md:p-8 text-center border border-[#A0845C]/20">
              <TrendingUp className="w-8 h-8 text-[#A0845C] mx-auto mb-3" />
              <p className="text-[#1D1D1F] font-semibold text-lg mb-2">
                Lottizzazioni e complessi residenziali
              </p>
              <p className="text-[#86868B] max-w-2xl mx-auto">
                La vera opportunita e nella scala: villaggi residenziali, complessi
                turistici, quartieri interi. Il sistema X-Frame e pensato per
                la produzione in serie senza perdere qualita.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#FFFFFF" to="#1D1D1F" height={80} />

      {/* ── REFERENTE + CTA ── */}
      <section className="relative py-24 lg:py-32 px-6 bg-[#1D1D1F]">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03]" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Richiedi informazioni sull&apos;affiliazione
            </h2>
            <p className="text-white/70 mb-10 text-lg max-w-2xl mx-auto leading-relaxed">
              Contattaci per ricevere il dossier di affiliazione completo e fissare
              un incontro con il nostro team.
            </p>
            <Link
              href="/contatti?oggetto=affiliazione"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#A0845C] text-white font-semibold rounded-full hover:bg-[#856B45] transition-all duration-300 hover:shadow-lg hover:shadow-[#A0845C]/20"
            >
              Richiedi Informazioni sull&apos;Affiliazione
              <ArrowRight className="w-5 h-5" />
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mt-14 pt-8 border-t border-white/10">
              <div className="inline-flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-[#A0845C]" />
                <p className="text-white/50 text-sm uppercase tracking-wide">
                  Referente Affiliazioni
                </p>
              </div>
              <p className="text-white font-semibold text-xl mb-1">
                Dott.ssa Sara Santaguida
              </p>
              <p className="text-white/60 mb-5">Area Legale / Affiliazioni</p>
              <a
                href="tel:+393387774250"
                className="inline-flex items-center gap-2 text-[#A0845C] font-semibold text-lg hover:text-white transition-colors"
              >
                <Phone className="w-5 h-5" />
                338.7774250
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  )
}
