'use client'

import Link from 'next/link'
import {
  ArrowLeft, ArrowRight, Truck, Clock, Users, Shield,
  HardHat, ChevronRight, Package, Layers
} from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import BlurText from '@/components/ui/BlurText'
import SectionTransition from '@/components/ui/SectionTransition'
import Button from '@/components/ui/Button'
import SpotlightCard from '@/components/ui/SpotlightCard'
import CountUp from '@/components/ui/CountUp'

const transportBenefits = [
  {
    icon: Package,
    title: 'Trasporto orizzontale',
    description: 'Pareti e solai viaggiano in orizzontale, non in verticale come la concorrenza. Maggiore stabilit\u00e0 e sicurezza durante il trasporto.',
  },
  {
    icon: Truck,
    title: 'Carichi dimezzati',
    description: 'Dove altri usano 4 camion, noi ne usiamo 2. Costi di trasporto dimezzati grazie all\u2019ottimizzazione del carico orizzontale.',
  },
  {
    icon: Layers,
    title: 'Carico ottimizzato',
    description: 'Moduli di copertura alla base, pareti, travi e pilastri in alto. Le travi viaggiano all\u2019interno dei moduli solaio interpiano.',
  },
  {
    icon: Shield,
    title: 'Integrit\u00e0 garantita',
    description: 'Il trasporto orizzontale preserva la perfezione degli elementi prodotti in laboratorio. Nessun danno, nessuna deformazione.',
  },
]

const timelineSteps = [
  { time: '07:00', label: 'Piastre di base + pilastri', description: 'Posizionamento degli ancoraggi e dei pilastri portanti sulla platea di fondazione. Circa 30 minuti.', phase: 'mattina' },
  { time: '08:00 - 12:00', label: 'Pareti perimetrali', description: 'Tutte le pareti esterne vengono posizionate e fissate provvisoriamente prima della pausa pranzo.', phase: 'mattina' },
  { time: '13:00 - 18:00', label: 'Moduli di copertura', description: 'Posa dei moduli tetto prefabbricati. La struttura \u00e8 chiusa e protetta dalle intemperie entro sera.', phase: 'pomeriggio' },
  { time: 'Giorno +1', label: 'Fissaggio definitivo', description: 'Connessioni strutturali definitive, verifica allineamenti e collaudo dei collegamenti antisismici.', phase: 'completamento' },
]

const constructionTimes = [
  { level: 'Grezzo di base', days: '3 giorni', description: 'Struttura portante, pareti, copertura' },
  { level: 'Grezzo avanzato', days: '7 giorni', description: 'Struttura completa, serramenti, cappotto, finiture esterne' },
  { level: 'Chiavi in mano', days: '30 giorni', description: 'Casa completa con impianti, finiture interne e certificazioni' },
]

const organizationDetails = [
  { icon: Users, label: '8-12 operatori specializzati' },
  { icon: HardHat, label: '3 squadre coordinate in parallelo' },
  { icon: Shield, label: 'Coordinatore generale e responsabile sicurezza' },
]

const heroStats = [
  { value: 2, label: 'Camion (vs 4)', suffix: '' },
  { value: 1, label: 'Giornata montaggio', suffix: '' },
  { value: 30, label: 'Giorni chiavi in mano', suffix: '' },
  { value: 50, label: 'Anni garanzia', suffix: '' },
]

export default function TrasportoMontaggioContent() {
  return (
    <div className="min-h-screen bg-[var(--color-background)]">

      {/* ===== HERO ===== */}
      <section className="relative bg-gradient-to-br from-[var(--color-secondary-dark)] via-[var(--color-secondary)] to-[var(--color-secondary-dark)] py-28 lg:py-40">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03]" />
        <div className="relative max-w-6xl mx-auto px-4">
          <ScrollReveal direction="left">
            <nav className="flex items-center gap-2 text-white/60 text-sm mb-8">
              <Link href="/sistema-x-frame" className="hover:text-white transition-colors">Sistema X-Frame</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white">Trasporto e Montaggio</span>
            </nav>
          </ScrollReveal>

          <BlurText
            text="Trasporto e Montaggio"
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8"
            delay={80}
            animateBy="words"
          />

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-white/70 max-w-2xl mb-14">
              Dove altri usano 4 camion, noi ne usiamo 2. Montaggio della struttura in una singola giornata lavorativa.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-wrap gap-8 md:gap-12">
              {heroStats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white">
                    <CountUp to={stat.value} duration={2} delay={0.3 + i * 0.15} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-white/60 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#1D1D1F" to="#F5F5F7" height={80} />

      {/* ===== TRASPORTO ORIZZONTALE ===== */}
      <section className="py-28 lg:py-36 px-4 bg-[var(--color-surface)]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-6">
              <span className="text-[var(--color-primary)] text-sm tracking-[0.2em] uppercase font-medium">
                Differenza chiave
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-secondary-dark)] mt-3">
                Trasporto Orizzontale
              </h2>
              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-[var(--color-primary)]/40" />
                <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
                <div className="w-8 h-0.5 bg-[var(--color-primary)]/40" />
              </div>
              <p className="text-[var(--color-muted)] text-lg max-w-2xl mx-auto mt-6">
                Il nostro sistema esclusivo di trasporto orizzontale dimezza i carichi e garantisce l&apos;integrit&agrave; di ogni elemento prefabbricato.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {transportBenefits.map((benefit, i) => {
              const Icon = benefit.icon
              return (
                <ScrollReveal key={benefit.title} delay={i * 0.1}>
                  <SpotlightCard className="bg-white p-7 border border-[#EDE6DB] h-full">
                    <div className="w-14 h-14 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center mb-5">
                      <Icon className="w-7 h-7 text-[var(--color-primary)]" />
                    </div>
                    <h3 className="text-lg font-bold text-[var(--color-secondary-dark)] mb-2">{benefit.title}</h3>
                    <p className="text-[var(--color-muted)] text-sm leading-relaxed">{benefit.description}</p>
                  </SpotlightCard>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      <SectionTransition from="#F5F5F7" to="#FFFFFF" height={80} />

      {/* ===== TIMELINE MONTAGGIO ===== */}
      <section className="py-28 lg:py-36 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-[var(--color-primary)] text-sm tracking-[0.2em] uppercase font-medium">
                Strutture fino a 150 m&sup2; &middot; 1 livello
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-secondary-dark)] mt-3">
                Timeline di Montaggio
              </h2>
              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-[var(--color-primary)]/40" />
                <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
                <div className="w-8 h-0.5 bg-[var(--color-primary)]/40" />
              </div>
            </div>
          </ScrollReveal>

          <div className="relative pl-8 border-l-2 border-[var(--color-primary)]/30 space-y-10">
            {timelineSteps.map((step, i) => (
              <ScrollReveal key={step.time} direction="left" delay={i * 0.12} distance={20}>
                <div className="relative">
                  <div className="absolute -left-[calc(2rem+7px)] top-1 w-3 h-3 rounded-full bg-[var(--color-primary)] ring-4 ring-white" />
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                    <span className="text-[var(--color-primary)] font-bold text-lg whitespace-nowrap">{step.time}</span>
                    <h3 className="font-bold text-[var(--color-secondary-dark)] text-lg">{step.label}</h3>
                  </div>
                  <p className="text-[var(--color-muted)] mt-1 leading-relaxed">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionTransition from="#FFFFFF" to="#1D1D1F" height={80} />

      {/* ===== ORGANIZZAZIONE CANTIERE ===== */}
      <section className="py-28 lg:py-36 px-4 bg-[var(--color-secondary-dark)]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Organizzazione Cantiere</h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                1 autogru (portata 30 m+), documentazione di sicurezza in cantiere, DPI completi per ogni operatore.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {organizationDetails.map((detail, i) => {
              const Icon = detail.icon
              return (
                <ScrollReveal key={detail.label} delay={i * 0.1}>
                  <div className="flex items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="w-12 h-12 bg-[var(--color-primary)]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-[var(--color-primary)]" />
                    </div>
                    <span className="text-white font-medium">{detail.label}</span>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>

          <ScrollReveal delay={0.2}>
            <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-white/60 text-sm mb-1">Attrezzatura professionale</p>
                <p className="text-white font-medium">Ponteggi, piattaforme di lavoro, sistemi anticaduta</p>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-white/60 text-sm mb-1">Sicurezza</p>
                <p className="text-white font-medium">DPI completi, documentazione sicurezza, coordinatore dedicato</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#1D1D1F" to="#F5F5F7" height={80} />

      {/* ===== TEMPI DI COSTRUZIONE ===== */}
      <section className="py-28 lg:py-36 px-4 bg-[var(--color-surface)]">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-[var(--color-primary)] text-sm tracking-[0.2em] uppercase font-medium">
                Listino 2025 &middot; Struttura ~100 m&sup2;
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-secondary-dark)] mt-3">
                Tempi di Costruzione
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-5">
            {constructionTimes.map((item, i) => (
              <ScrollReveal key={item.level} delay={i * 0.1}>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-6 bg-white rounded-2xl border border-[#EDE6DB] hover:border-[var(--color-primary)]/30 hover:shadow-premium-lg transition-all">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-[var(--color-primary)]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-[var(--color-primary)]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[var(--color-secondary-dark)]">{item.level}</h3>
                      <p className="text-[var(--color-muted)] text-sm">{item.description}</p>
                    </div>
                  </div>
                  <div className="sm:text-right">
                    <span className="text-2xl font-bold text-[var(--color-primary)]">{item.days}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionTransition from="#F5F5F7" to="#A0845C" height={80} />

      {/* ===== NAVIGATION ===== */}
      <section className="py-20 px-4 bg-[var(--color-primary)]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <Link
            href="/sistema-x-frame/coperture"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Coperture
          </Link>
          <Button href="/sistema-x-frame/confronto" variant="secondary" size="lg">
            Confronto
          </Button>
        </div>
      </section>

    </div>
  )
}
