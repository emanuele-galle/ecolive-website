'use client'

import Image from 'next/image'
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
  Camera,
  Users,
  Shield,
  Euro,
} from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import YouTubeEmbed from '@/components/ui/YouTubeEmbed'
import BlurText from '@/components/ui/BlurText'
import SectionTransition from '@/components/ui/SectionTransition'
import CountUp from '@/components/ui/CountUp'
import { motion } from 'framer-motion'

/* ─── Step data ─── */

interface ProcessStep {
  id: string
  number: number
  title: string
  icon: typeof MessageCircle
  subtitle: string
  description: string
  details: string[]
  highlight?: string
  image?: string
}

const steps: ProcessStep[] = [
  {
    id: 'primo-contatto',
    number: 1,
    title: 'Primo Contatto',
    icon: MessageCircle,
    subtitle: 'Il punto di partenza',
    description:
      'Il cliente che vuole costruire casa inizia a informarsi e documentarsi. Dopo il primo contatto, viene invitato a visitare i nostri uffici a Spadola per un incontro conoscitivo senza impegno.',
    details: [
      'Bozza dell\'idea progettuale: dimensioni indicative e volumi desiderati',
      'Posizione esatta del lotto e orientamento',
      'Documentazione catastale del terreno (visura, mappa)',
      'Nessun costo e nessun impegno per il primo incontro',
    ],
    highlight: 'Da portare al primo incontro: bozza idea, posizione lotto, documenti catastali.',
  },
  {
    id: 'visita-sede',
    number: 2,
    title: 'Visita in Sede',
    icon: Building,
    subtitle: 'Toccare con mano',
    description:
      'Il cliente visita la sede EcoLive e vede dal vivo l\'organizzazione, le presentazioni dei lavori realizzati, il centro di calcolo e il sistema informativo. Soprattutto, osserva gli spaccati delle pareti X-Frame dal vivo.',
    details: [
      'Spaccati reali delle pareti X-Frame: materiali, strati, dettagli costruttivi',
      '2-3 strutture tipo (piccola, media, grande) per mostrare il livello progettuale',
      'Rendering e simulazioni avanzate per visualizzare la futura casa',
      'Obiettivo della visita: firma del mandato di progettazione architettonica',
      'Costo progettazione diviso in 3 fasce (piccola/media/grande) - detratto dal prezzo finale',
      'Nessun pagamento richiesto al primo incontro',
    ],
    highlight: 'La visita mostra concretamente cosa significa costruire con il sistema X-Frame.',
  },
  {
    id: 'progettazione',
    number: 3,
    title: 'Progettazione',
    icon: Pencil,
    subtitle: 'La casa prende forma',
    description:
      'Mandato firmato, si parte con la progettazione completa su Revit e la modellazione 3D. Il sopralluogo sul sito include rilievo topografico, video mapping e scansione 3D dell\'area circostante.',
    details: [
      'Progettazione BIM completa su Revit con modellazione 3D',
      'Sopralluogo sul sito: rilievo topografico, video mapping, scansione 3D',
      'Rendering e animazioni fotorealistiche inserite nell\'ambiente reale',
      'Il cliente vede la sua casa nel contesto reale prima di costruirla',
      'Pagamento: 50% alla consegna della prima versione, 50% alla versione definitiva',
      'L\'intero costo di progettazione viene detratto dal prezzo della casa',
    ],
    highlight: 'Il costo della progettazione viene interamente scalato dal prezzo finale della casa.',
  },
  {
    id: 'contratto',
    number: 4,
    title: 'Contratto',
    icon: FileSignature,
    subtitle: 'Tutto nero su bianco',
    description:
      'Contratto di appalto formale e dettagliato, con date precise come termini essenziali. Ogni comunicazione avviene in modo formale e tracciabile: PEC, email certificata, raccomandate.',
    details: [
      'Contratto di appalto con tutte le specifiche costruttive e tempistiche',
      'Date precise definite come termini essenziali del contratto',
      'Comunicazioni formali e tracciabili: PEC, email, raccomandate',
      'EcoLive informa la produzione della nuova commessa',
      'Pre-ordine materiali, ordine definitivo 60 giorni prima della costruzione',
    ],
    highlight: 'Trasparenza totale: date, costi, specifiche e comunicazioni sempre tracciabili.',
  },
  {
    id: 'preparazione-cantiere',
    number: 5,
    title: 'Preparazione Cantiere',
    icon: HardHat,
    subtitle: 'A cura del cliente',
    image: '/images/processo/consegna-cantiere.webp',
    description:
      'Questa fase e a carico del cliente: scavi, magrone, fondazioni e platea devono essere completati prima del montaggio. L\'area cantiere deve essere pronta con accessi adeguati per i mezzi pesanti.',
    details: [
      'Scavi, magrone, fondazioni e platea a carico del cliente',
      'Barre filettate e tirafondi posizionati e livellati con precisione',
      'Area cantiere pronta con accessi adeguati per autogru e bilici',
      'EcoLive verifica la conformita della platea prima del montaggio',
      'Il cliente carica documentazione fotografica e video nel sistema informativo',
    ],
    highlight: 'EcoLive verifica personalmente la platea prima di dare il via al montaggio.',
  },
  {
    id: 'produzione',
    number: 6,
    title: 'Produzione in Laboratorio',
    icon: Factory,
    subtitle: 'Precisione industriale',
    image: '/images/fabbrica/linea-cnc.webp',
    description:
      'La produzione avviene in ambiente completamente controllato: temperatura, umidita e tempi di asciugatura sono monitorati costantemente. Ogni elemento segue procedure standard e replicabili.',
    details: [
      'Ambiente controllato: temperatura, umidita, tempi di asciugatura monitorati',
      '4-6 operatori specializzati per turno (di piu creerebbe solo confusione)',
      'Procedure standard e replicabili per ogni elemento costruttivo',
      'Distinta di taglio e dettagli costruttivi per ogni singolo componente',
      'Elementi finiti stoccabili all\'aperto: i monoblocchi sono completamente protetti',
    ],
    highlight: 'Come McDonald\'s: procedure standard, risultato garantito, qualita replicabile.',
  },
  {
    id: 'montaggio',
    number: 7,
    title: 'Montaggio',
    icon: Wrench,
    subtitle: 'Lo spettacolo in una settimana',
    image: '/images/processo/gru-solleva-pannello.webp',
    description:
      'Come il pit stop in Formula 1: dove un gommista tradizionale impiega mezz\'ora, il team F1 finisce in 10 secondi. Per una struttura fino a 150 mq su un livello: la mattina non c\'e nulla, la sera la casa e completa.',
    details: [
      '8-12 operatori, 1 autogru (30+ m di sbraccio), 3 squadre specializzate',
      'Coordinatore generale come un direttore d\'orchestra',
      'Mattina: piastre e pilastri (~30 min), poi pareti perimetrali (~2 ore)',
      'Pomeriggio: monoblocchi di copertura',
      'Giorno dopo: fissaggio definitivo (gru gia rimossa)',
      'Carico bilici ottimizzato: sotto i monoblocchi tetto, sopra pareti, travi e pilastri',
      'Sicurezza: DPI obbligatori, badge, POS, documentazione completa',
      'Cantiere come evento: riprese drone, foto professionali, timelapse, banner',
    ],
    highlight: 'Per una casa da 150 mq: la mattina non c\'e nulla, la sera la struttura e completa.',
  },
]

/* ─── Payment data ─── */

interface PaymentTranche {
  label: string
  percent: number
}

const pagamentiGA: PaymentTranche[] = [
  { label: 'Alla firma del contratto', percent: 10 },
  { label: 'Sessanta giorni prima del montaggio', percent: 30 },
  { label: 'Al completamento del grezzo base', percent: 30 },
  { label: 'Al completamento del grezzo avanzato', percent: 30 },
]

const pagamentiCiM: PaymentTranche[] = [
  { label: 'Avvio impianti', percent: 30 },
  { label: 'Posa infissi', percent: 40 },
  { label: 'Posa pavimenti', percent: 20 },
  { label: 'Consegna chiavi', percent: 10 },
]

const tempi = [
  { label: 'Grezzo di base', value: 3, unit: 'giorni', note: 'Struttura portante, pareti e copertura montati' },
  { label: 'Grezzo avanzato', value: 7, unit: 'giorni', note: 'Cappotto, intonaco e finiture esterne' },
  { label: 'Chiavi in mano', value: 30, unit: 'giorni', note: 'Impianti, infissi, pavimenti e consegna' },
]

/* ─── Sub-components ─── */

function SectionHeader({
  tag,
  title,
  subtitle,
  dark = false,
}: {
  tag: string
  title: string
  subtitle?: string
  dark?: boolean
}) {
  return (
    <ScrollReveal>
      <div className="text-center mb-16">
        <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">{tag}</span>
        <h2
          className={`font-serif text-3xl md:text-4xl lg:text-5xl font-bold mt-3 ${dark ? 'text-white' : 'text-[#1D1D1F]'}`}
        >
          {title}
        </h2>
        <div className="mt-5 flex items-center justify-center gap-3">
          <div className="w-8 h-0.5 bg-[#A0845C]/40" />
          <div className="w-2 h-2 rounded-full bg-[#A0845C]" />
          <div className="w-8 h-0.5 bg-[#A0845C]/40" />
        </div>
        {subtitle && (
          <p className={`mt-6 max-w-xl mx-auto ${dark ? 'text-white/60' : 'text-[#86868B]'}`}>{subtitle}</p>
        )}
      </div>
    </ScrollReveal>
  )
}

function PaymentCard({ title, tranches, note }: { title: string; tranches: PaymentTranche[]; note?: string }) {
  return (
    <div className="bg-white rounded-2xl border border-[#D2D2D7] p-6 md:p-8 h-full">
      <div className="flex items-center gap-3 mb-6">
        <Euro className="w-5 h-5 text-[#A0845C]" />
        <h3 className="text-xl font-bold text-[#1D1D1F]">{title}</h3>
      </div>
      <div className="space-y-4">
        {tranches.map((t, i) => (
          <div key={t.label}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-[#86868B]">{t.label}</span>
              <span className="text-lg font-bold text-[#A0845C] ml-4 shrink-0">{t.percent}%</span>
            </div>
            <div className="h-2 rounded-full bg-[#F5F5F7] overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#A0845C] to-[#C4A97D]"
                initial={{ width: 0 }}
                whileInView={{ width: `${t.percent}%` }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: (i + 1) * 0.15, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}
      </div>
      {note && (
        <p className="mt-6 text-xs text-[#86868B] italic border-t border-[#D2D2D7]/50 pt-4">{note}</p>
      )}
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
            className="mt-8 text-xl md:text-2xl text-white/70 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Dal primo contatto alla casa finita: 7 step chiari, trasparenti e controllati.
            Ogni fase e pensata per garantire precisione, qualita e zero sorprese.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-white/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#A0845C]" />
              30 giorni chiavi in mano
            </span>
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#A0845C]" />
              Contratto con date essenziali
            </span>
            <span className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-[#A0845C]" />
              Tutto documentato
            </span>
          </motion.div>
        </div>
      </section>

      <SectionTransition from="#1D1D1F" to="#F5F5F7" height={80} />

      {/* ── 7 STEP TIMELINE ── */}
      <section className="py-24 lg:py-32 px-6 bg-[#F5F5F7]">
        <div className="max-w-5xl mx-auto">
          <SectionHeader tag="Il Percorso" title="7 Step verso la tua casa" />

          <div className="relative">
            {/* Timeline line - visible on all screens */}
            <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-[#A0845C]/20" />

            <div className="space-y-12">
              {steps.map((step, i) => {
                const Icon = step.icon
                const isLeft = i % 2 === 0
                return (
                  <ScrollReveal key={step.id} delay={i * 0.06} direction="up" distance={30}>
                    <div className="relative">
                      {/* Mobile layout: always left-aligned */}
                      <div className="md:hidden relative pl-16">
                        <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-[#A0845C] flex items-center justify-center shadow-lg shadow-[#A0845C]/20 z-10">
                          <span className="text-white text-lg font-bold">{step.number}</span>
                        </div>
                        <StepCard step={step} Icon={Icon} />
                      </div>

                      {/* Desktop layout: alternating left/right */}
                      <div className="hidden md:grid md:grid-cols-2 md:gap-8 items-start">
                        {isLeft ? (
                          <>
                            <div className="pr-8">
                              <StepCard step={step} Icon={Icon} />
                            </div>
                            <div />
                          </>
                        ) : (
                          <>
                            <div />
                            <div className="pl-8">
                              <StepCard step={step} Icon={Icon} />
                            </div>
                          </>
                        )}
                        {/* Center dot */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-4 w-12 h-12 rounded-full bg-[#A0845C] flex items-center justify-center shadow-lg shadow-[#A0845C]/20 z-10">
                          <span className="text-white text-lg font-bold">{step.number}</span>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <SectionTransition from="#F5F5F7" to="#1D1D1F" height={80} />

      {/* ── TEMPI DI COSTRUZIONE ── */}
      <section className="relative py-24 lg:py-32 px-6 bg-[#1D1D1F]">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03]" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <SectionHeader
            tag="Tempi Certi"
            title="Tempi di costruzione"
            subtitle="Riferimento per una struttura di circa 100 mq"
            dark
          />

          <div className="grid md:grid-cols-3 gap-6">
            {tempi.map((item, i) => (
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
                  <div className="text-4xl md:text-5xl font-bold text-[#A0845C] mb-1">
                    <CountUp to={item.value} duration={2} delay={0.3 + i * 0.2} suffix={` ${item.unit}`} />
                  </div>
                  <p className="text-sm text-white/50 mt-3">{item.note}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* Nota aggiuntiva montaggio */}
          <ScrollReveal delay={0.3}>
            <div className="mt-12 bg-white/5 rounded-2xl border border-[#A0845C]/20 p-6 md:p-8 text-center">
              <p className="text-white/70 text-sm md:text-base leading-relaxed">
                <span className="text-[#A0845C] font-semibold">Montaggio struttura in 7 giorni</span> &mdash; Per
                una casa fino a 150 mq su un livello, la mattina il cantiere e vuoto e la sera la struttura e
                completamente montata. Il fissaggio definitivo avviene il giorno successivo.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#1D1D1F" to="#FFFFFF" height={80} />

      {/* ── DALLA FABBRICA AL CANTIERE ── */}
      <section className="py-24 lg:py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <SectionHeader tag="Dietro le Quinte" title="Dalla fabbrica al cantiere" />
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { src: '/images/fabbrica/linea-cnc.webp', alt: 'Linea CNC automatizzata per assemblaggio pannelli parete' },
              { src: '/images/fabbrica/sezionatrice.webp', alt: 'Operaio X-Frame alla sezionatrice verticale' },
              { src: '/images/fabbrica/pressa-idraulica.webp', alt: 'Pressa idraulica per laminazione pannelli' },
              { src: '/images/processo/montaggio-colonne.webp', alt: 'Montaggio colonne legno nei connettori X-Frame' },
              { src: '/images/processo/gru-solleva-pannello.webp', alt: 'Gru solleva pannello prefabbricato in cantiere' },
              { src: '/images/processo/impianti-interni.webp', alt: 'Impianti idraulici ed elettrici interni' },
            ].map((img) => (
              <ScrollReveal key={img.src} direction="up">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden group">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <p className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg">
                    {img.alt}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionTransition from="#FFFFFF" to="#F5F5F7" height={80} />

      {/* ── PIANO PAGAMENTI ── */}
      <section className="py-24 lg:py-32 px-6 bg-[#F5F5F7]">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            tag="Pagamenti"
            title="Piano pagamenti trasparente"
            subtitle="Tranches chiare legate all'avanzamento reale dei lavori"
          />

          <div className="grid lg:grid-cols-2 gap-6">
            <ScrollReveal delay={0.1} direction="left">
              <PaymentCard title="Grezzo Avanzato" tranches={pagamentiGA} />
            </ScrollReveal>
            <ScrollReveal delay={0.2} direction="right">
              <PaymentCard
                title="Chiavi in Mano (aggiuntivo)"
                tranches={pagamentiCiM}
                note="I pagamenti Chiavi in Mano si sommano a quelli del Grezzo Avanzato e seguono l'avanzamento delle singole lavorazioni."
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionTransition from="#F5F5F7" to="#FFFFFF" height={80} />

      {/* ── IL MONTAGGIO COME EVENTO ── */}
      <section className="py-24 lg:py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            tag="I 7 Giorni del Montaggio"
            title="Un evento, non un cantiere"
            subtitle="Il montaggio EcoLive e uno spettacolo a cui assistono anche potenziali clienti"
          />

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: 'Team specializzato',
                items: [
                  '8-12 operatori coordinati',
                  '1 autogru con 30+ m di sbraccio',
                  '3 squadre specializzate',
                  'Coordinatore come direttore d\'orchestra',
                ],
              },
              {
                icon: Camera,
                title: 'Documentazione completa',
                items: [
                  'Riprese drone professionali',
                  'Fotografie di ogni fase',
                  'Timelapse dall\'inizio alla fine',
                  'Banner e materiale comunicativo',
                ],
              },
              {
                icon: Shield,
                title: 'Sicurezza e protocollo',
                items: [
                  'DPI obbligatori per tutti',
                  'Badge identificativo operatori',
                  'POS (Piano Operativo Sicurezza)',
                  'Documentazione tracciabile',
                ],
              },
            ].map((card, i) => {
              const CardIcon = card.icon
              return (
                <ScrollReveal key={card.title} delay={i * 0.1} direction="up">
                  <motion.div
                    className="bg-[#F5F5F7] rounded-2xl border border-[#D2D2D7] p-6 md:p-8 h-full"
                    whileHover={{ boxShadow: '0 12px 40px rgba(0,0,0,0.06)' }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-[#A0845C]/10 flex items-center justify-center mb-5">
                      <CardIcon className="w-6 h-6 text-[#A0845C]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#1D1D1F] mb-4">{card.title}</h3>
                    <ul className="space-y-2">
                      {card.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-[#1D1D1F]/70">
                          <Check className="w-4 h-4 text-[#A0845C] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </ScrollReveal>
              )
            })}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="mt-10 bg-[#F5F5F7] rounded-2xl border border-[#A0845C]/20 p-6 md:p-8">
              <p className="text-[#1D1D1F]/70 text-sm md:text-base leading-relaxed text-center">
                <span className="text-[#A0845C] font-semibold">Potenziali clienti invitati come spettatori</span>{' '}
                &mdash; Il montaggio e aperto a chi vuole vedere con i propri occhi cosa significa costruire con
                EcoLive. Nessuna brochure vale quanto vedere una casa prendere forma in 7 giorni.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="mt-10 max-w-3xl mx-auto">
              <YouTubeEmbed
                videoId="nptTzlZwGOg"
                title="Costruzione di una Casa in Legno Ecolive"
              />
            </div>
          </ScrollReveal>
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
            <p className="mt-6 text-lg md:text-xl text-white/70 max-w-xl mx-auto leading-relaxed">
              Configura la tua casa ideale e scopri prezzi, tempi e specifiche tecniche del sistema X-Frame.
              Il primo incontro e sempre senza impegno.
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

/* ─── Step Card (extracted to avoid duplication) ─── */

function StepCard({ step, Icon }: { step: ProcessStep; Icon: typeof MessageCircle }) {
  return (
    <motion.div
      className="bg-white rounded-2xl border border-[#D2D2D7] p-6 md:p-8"
      whileHover={{ boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}
      transition={{ duration: 0.3 }}
    >
      {step.image && (
        <div className="relative aspect-[16/9] -mx-6 md:-mx-8 -mt-6 md:-mt-8 mb-6 overflow-hidden rounded-t-2xl">
          <Image
            src={step.image}
            alt={step.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}
      <div className="flex items-center gap-3 mb-1">
        <Icon className="w-5 h-5 text-[#A0845C]" />
        <span className="text-xs text-[#A0845C] uppercase tracking-wider font-medium">{step.subtitle}</span>
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-[#1D1D1F] mb-3">{step.title}</h3>
      <p className="text-[#86868B] text-base leading-relaxed mb-5">{step.description}</p>
      <ul className="space-y-2.5 mb-5">
        {step.details.map((d) => (
          <li key={d} className="flex items-start gap-2.5 text-sm text-[#1D1D1F]/80">
            <Check className="w-4 h-4 text-[#A0845C] shrink-0 mt-0.5" />
            <span>{d}</span>
          </li>
        ))}
      </ul>
      {step.highlight && (
        <div className="pt-4 border-t border-[#D2D2D7]/50">
          <p className="text-sm italic text-[#A0845C]">&ldquo;{step.highlight}&rdquo;</p>
        </div>
      )}
    </motion.div>
  )
}
