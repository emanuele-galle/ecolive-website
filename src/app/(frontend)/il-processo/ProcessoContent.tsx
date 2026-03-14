'use client'

import Link from 'next/link'
import {
  Check,
  ArrowRight,
  Clock,
  MessageCircle,
  Building,
  Pencil,
  FileSignature,
  HardHat,
  Factory,
  Wrench,
} from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import BlurText from '@/components/ui/BlurText'
import SectionTransition from '@/components/ui/SectionTransition'
import CountUp from '@/components/ui/CountUp'
import {
  pagamentiGrezzoAvanzato,
  pagamentiChiaviInMano,
  notaPagamentiChiaviInMano,
  inclusoGrezzoAvanzato,
  inclusoChiaviInMano,
  type Tranche,
  type InclusoItem,
} from '@/data/processo'
import { motion } from 'framer-motion'

/* ─── Inline rich process steps ─── */

const richSteps = [
  {
    id: 'primo-contatto',
    number: 1,
    title: 'Primo Contatto',
    icon: MessageCircle,
    description: 'Il cliente scopre EcoLive e ci contatta. Viene invitato a visitare la sede operativa a Spadola portando la documentazione necessaria.',
    details: [
      'Bozza con dimensioni del progetto desiderato',
      'Rilievo del terreno e particella catastale',
      'Posizionamento e orientamento del lotto',
      'Obiettivo: capire le esigenze e mostrare le capacita EcoLive',
    ],
    quote: 'Il cliente deve venire con bozza dimensioni, rilievo, particella catastale.',
  },
  {
    id: 'visita-sede',
    number: 2,
    title: 'Visita in Sede',
    icon: Building,
    description: 'Il cliente visita lo stabilimento e vede dal vivo il sistema X-Frame. La nostra organizzazione, i lavori, il centro di calcolo.',
    details: [
      'Sezioni trasversali, campioni materiali, dettagli costruttivi',
      'Postazioni Revit per la progettazione BIM',
      'Strutture tipo: piccola, media e grande dimensione',
      'Firma del mandato di progettazione',
      'Prima visita senza costi',
    ],
    quote: 'Vede la nostra organizzazione, le presentazioni, i nostri lavori, il centro di calcolo.',
  },
  {
    id: 'progettazione',
    number: 3,
    title: 'Progettazione',
    icon: Pencil,
    description: 'Mandato firmato, sopralluogo drone, modellazione Revit, rendering fotorealistici ambientati nel contesto reale.',
    details: [
      'Sopralluogo con drone: video-mappatura e rilievo 3D',
      'Modellazione BIM in Revit su misura del cliente',
      'Rendering fotorealistici con Blender/Twinmotion',
      'Pagamento: 50% alla prima versione, 50% alla definitiva',
      'Importo interamente detratto dal prezzo della casa',
    ],
    quote: 'Il cliente vedra la sua casa in maniera realistica, senza possibilita di sbagliare.',
  },
  {
    id: 'contratto',
    number: 4,
    title: 'Contratto',
    icon: FileSignature,
    description: 'Stipula del contratto formale con tutte le specifiche costruttive, i termini essenziali e le date importanti.',
    details: [
      'Termini essenziali e termini vessatori chiariti',
      'Definizione fase: grezzo avanzato e/o chiavi in mano',
      'Pagamenti strutturati in tranches (listino 2025)',
      'Conseguenze chiare per ritardi lato cliente',
    ],
    quote: 'Il cliente vuole la casa prima possibile ma i tempi tecnici non sono mai quelli previsti.',
  },
  {
    id: 'preparazione-cantiere',
    number: 5,
    title: 'Preparazione Cantiere',
    icon: HardHat,
    description: 'Fase a carico del cliente: scavo, magrone, fondazioni e platea. EcoLive verifica la conformita prima di attivare la produzione.',
    details: [
      'Platea con barre filettate di fissaggio predisposte',
      'Documentazione fotografica e video di ogni fase',
      'Verifica tecnica della platea da parte di EcoLive',
      '60 giorni prima: versamento della tranche programmata',
    ],
    quote: 'Barre filettate di fissaggio. Verifica tecnica della platea.',
  },
  {
    id: 'produzione',
    number: 6,
    title: 'Produzione in Laboratorio',
    icon: Factory,
    description: 'EcoLive produce pareti, solai, coperture e struttura portante in ambiente controllato. Tutto e pronto per il montaggio.',
    details: [
      'Temperatura, umidita e tempi monitorati costantemente',
      'Carico ottimizzato sui camion (1-2 viaggi)',
      'Trasporto in orizzontale (vantaggio esclusivo EcoLive)',
      '60 giorni prima della data: il cliente versa la quota',
    ],
    quote: 'EcoLive produce pareti, solai, coperture. 60 giorni prima: il cliente versa la quota.',
  },
  {
    id: 'montaggio',
    number: 7,
    title: 'Montaggio',
    icon: Wrench,
    description: 'Come il cambio gomme in Formula 1. 8-12 operatori, una giornata, la casa prende forma.',
    details: [
      'Mezz\'ora per i pilastri, due ore per le pareti',
      'Pausa pranzo, pomeriggio il tetto',
      '1 autogru (braccio 30+ m), 3 squadre specializzate',
      'Documentazione: time-lapse, drone, reportage fotografico',
      'Dopo il montaggio: solo finitura esterna acril-silossanica',
    ],
    quote: 'Come il cambio gomme in Formula 1. Mezz\'ora i pilastri, due ore le pareti.',
  },
]

const constructionTimes = [
  { label: 'Grezzo di base', value: 3, suffix: ' gg', note: 'Struttura portante + pareti + copertura' },
  { label: 'Grezzo avanzato', value: 7, suffix: ' gg', note: 'Cappotto, intonaco, finiture grezzo' },
  { label: 'Chiavi in mano', value: 30, suffix: ' gg', note: 'Impianti, infissi, finiture complete' },
]

/* ─── Sub-components ─── */

function PaymentCard({
  title,
  tranches,
  note,
}: {
  title: string
  tranches: Tranche[]
  note?: string
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#D2D2D7] p-6 md:p-8 h-full">
      <h3 className="text-xl font-bold text-[#1D1D1F] mb-6">{title}</h3>
      <div className="space-y-4">
        {tranches.map((t) => {
          const pctNum = parseInt(t.percentuale, 10)
          return (
            <div key={t.numero}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-[#86868B]">{t.descrizione}</span>
                <span className="text-lg font-bold text-[#A0845C] ml-4 shrink-0">
                  {t.percentuale}
                </span>
              </div>
              <div className="h-2 rounded-full bg-[#F5F5F7] overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#A0845C] to-[#C4A97D]"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pctNum}%` }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8, delay: t.numero * 0.15, ease: 'easeOut' }}
                />
              </div>
            </div>
          )
        })}
      </div>
      {note && (
        <p className="mt-6 text-xs text-[#86868B] italic border-t border-[#D2D2D7]/50 pt-4">
          {note}
        </p>
      )}
    </div>
  )
}

function InclusoSection({ title, items }: { title: string; items: InclusoItem[] }) {
  return (
    <div className="bg-white rounded-2xl border border-[#D2D2D7] p-6 md:p-8">
      <h3 className="text-xl font-bold text-[#1D1D1F] mb-6">{title}</h3>
      <div className="space-y-6">
        {items.map((cat) => (
          <div key={cat.categoria}>
            <h4 className="text-sm font-semibold text-[#A0845C] uppercase tracking-wider mb-3">
              {cat.categoria}
            </h4>
            <ul className="space-y-2">
              {cat.voci.map((voce) => (
                <li key={voce} className="flex items-start gap-2.5 text-sm text-[#1D1D1F]/80">
                  <Check className="w-4 h-4 text-[#A0845C] shrink-0 mt-0.5" />
                  <span>{voce}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Main ─── */

export default function ProcessoContent() {
  return (
    <div className="overflow-hidden">

      {/* ── HERO ── */}
      <section className="relative bg-[#1D1D1F] py-32 md:py-40 lg:py-48">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1D1D1F] via-[#1D1D1F] to-[#141414]" />
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03]" />
        <div className="absolute top-20 left-10 w-2 h-2 rounded-full bg-[#A0845C]/30" />
        <div className="absolute top-32 right-20 w-1.5 h-1.5 rounded-full bg-[#A0845C]/20" />
        <div className="absolute bottom-24 left-1/4 w-1 h-1 rounded-full bg-white/10" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <BlurText
            text="Il Processo EcoLive"
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1]"
            delay={100}
            animateBy="words"
            direction="bottom"
          />
          <motion.p
            className="mt-8 text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Dalla prima visita alla casa finita: un percorso chiaro, trasparente e
            spettacolare. Ogni step e pensato per garantire precisione assoluta.
          </motion.p>
        </div>
      </section>

      <SectionTransition from="#1D1D1F" to="#F5F5F7" height={80} />

      {/* ── 7 STEP TIMELINE ── */}
      <section className="py-24 lg:py-32 px-6 bg-[#F5F5F7]">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">
                Il Percorso
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mt-3">
                7 Step verso la tua casa
              </h2>
              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
                <div className="w-2 h-2 rounded-full bg-[#A0845C]" />
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
              </div>
            </div>
          </ScrollReveal>

          <div className="relative">
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-[#A0845C]/20" />
            <div className="space-y-10">
              {richSteps.map((step, i) => {
                const Icon = step.icon
                return (
                  <ScrollReveal key={step.id} delay={i * 0.08} direction="up" distance={30}>
                    <div className="relative pl-16 md:pl-20">
                      <div className="absolute left-0 top-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#A0845C] flex items-center justify-center shadow-lg shadow-[#A0845C]/20 z-10">
                        <span className="text-white text-lg md:text-xl font-bold">
                          {step.number}
                        </span>
                      </div>

                      <motion.div
                        className="bg-white rounded-2xl border border-[#D2D2D7] p-6 md:p-8"
                        whileHover={{ boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <Icon className="w-5 h-5 text-[#A0845C]" />
                          <h3 className="text-xl md:text-2xl font-bold text-[#1D1D1F]">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-[#86868B] leading-relaxed mb-4">
                          {step.description}
                        </p>
                        <ul className="space-y-2 mb-4">
                          {step.details.map((d) => (
                            <li key={d} className="flex items-start gap-2.5 text-sm text-[#1D1D1F]/80">
                              <Check className="w-4 h-4 text-[#A0845C] shrink-0 mt-0.5" />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 pt-4 border-t border-[#D2D2D7]/50">
                          <p className="text-sm italic text-[#A0845C]">
                            &ldquo;{step.quote}&rdquo;
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <SectionTransition from="#F5F5F7" to="#1D1D1F" height={80} />

      {/* ── TEMPI DI COSTRUZIONE (dark) ── */}
      <section className="relative py-24 lg:py-32 px-6 bg-[#1D1D1F]">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03]" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">
                Tempi Certi
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3">
                Tempi di costruzione
              </h2>
              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
                <div className="w-2 h-2 rounded-full bg-[#A0845C]" />
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
              </div>
              <p className="mt-6 text-white/60 max-w-xl mx-auto">
                Per una struttura di circa 100 mq
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {constructionTimes.map((item, i) => (
              <ScrollReveal key={item.label} delay={i * 0.12} direction="up">
                <motion.div
                  className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 text-center h-full"
                  whileHover={{ y: -4, borderColor: 'rgba(160,132,92,0.3)' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-14 h-14 rounded-full bg-[#A0845C]/20 flex items-center justify-center mx-auto mb-5">
                    <Clock className="w-7 h-7 text-[#A0845C]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.label}</h3>
                  <div className="text-4xl md:text-5xl font-bold text-[#A0845C] mb-3">
                    <CountUp to={item.value} duration={2} delay={0.3 + i * 0.2} suffix={item.suffix} />
                  </div>
                  <p className="text-sm text-white/50">{item.note}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionTransition from="#1D1D1F" to="#F5F5F7" height={80} />

      {/* ── PIANO PAGAMENTI ── */}
      <section className="py-24 lg:py-32 px-6 bg-[#F5F5F7]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">
                Pagamenti
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mt-3">
                Piano pagamenti trasparente
              </h2>
              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
                <div className="w-2 h-2 rounded-full bg-[#A0845C]" />
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
              </div>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-6">
            <ScrollReveal delay={0.1} direction="left">
              <PaymentCard
                title="Grezzo Avanzato (GA)"
                tranches={pagamentiGrezzoAvanzato}
              />
            </ScrollReveal>
            <ScrollReveal delay={0.2} direction="right">
              <PaymentCard
                title="Chiavi in Mano (CiM)"
                tranches={pagamentiChiaviInMano}
                note={notaPagamentiChiaviInMano}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionTransition from="#F5F5F7" to="#FFFFFF" height={80} />

      {/* ── COSA INCLUDE ── */}
      <section className="py-24 lg:py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">
                Dettagli
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mt-3">
                Cosa include ogni fase
              </h2>
              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
                <div className="w-2 h-2 rounded-full bg-[#A0845C]" />
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
              </div>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-6">
            <ScrollReveal delay={0.1} direction="left">
              <InclusoSection title="Grezzo Avanzato" items={inclusoGrezzoAvanzato} />
            </ScrollReveal>
            <ScrollReveal delay={0.2} direction="right">
              <InclusoSection title="Chiavi in Mano" items={inclusoChiaviInMano} />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionTransition from="#FFFFFF" to="#1D1D1F" height={80} />

      {/* ── CTA ── */}
      <section className="relative py-24 lg:py-32 px-6 bg-[#1D1D1F]">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03]" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Pronto a iniziare il tuo percorso?
            </h2>
            <p className="mt-6 text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
              Configura la tua casa ideale e scopri prezzi, tempi e specifiche tecniche
              del sistema X-Frame.
            </p>
            <div className="mt-12">
              <Link
                href="/configuratore"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#A0845C] text-white font-semibold rounded-full hover:bg-[#856B45] transition-all duration-300 hover:shadow-lg hover:shadow-[#A0845C]/20"
              >
                Configura la tua Casa
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  )
}
