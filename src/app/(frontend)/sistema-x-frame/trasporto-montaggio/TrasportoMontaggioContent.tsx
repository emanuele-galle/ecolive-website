'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Truck,
  Camera,
  Shield,
  Package,
  Ruler,
  Zap,
} from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import YouTubeEmbed from '@/components/ui/YouTubeEmbed'
import CountUp from '@/components/ui/CountUp'
import GlassCard from '@/components/ui/GlassCard'

const grainOverlay = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`

const transportAdvantages = [
  {
    icon: Package,
    title: 'Quantit\u00E0 doppia, met\u00E0 camion',
    description:
      '"Dimezziamo i carichi": dove altri costruttori usano 4 bilici per una casa, EcoLive ne usa 2. Il trasporto orizzontale raddoppia la quantit\u00E0 di elementi per ogni viaggio, abbattendo costi logistici e impatto ambientale.',
  },
  {
    icon: Shield,
    title: 'Stabilit\u00E0 e sicurezza superiori',
    description:
      'Pareti e solai viaggiano in orizzontale, non in verticale come la concorrenza. Baricentro basso, nessun rischio di oscillazione, integrit\u00E0 perfetta degli elementi anche su percorsi lunghi e strade tortuose.',
  },
  {
    icon: Ruler,
    title: 'Ottimizzazione geniale del carico',
    description:
      'Sotto: i monoblocchi tetto e solaio interpiano. Sopra: pareti, travi e pilastri impilati. Le travi portanti viaggiano all\'interno dei monoblocchi solaio: ogni centimetro cubo del camion viene sfruttato al massimo.',
  },
  {
    icon: Zap,
    title: 'Meno costi, meno prezzo finale',
    description:
      'Dimezzando i trasporti si abbattono i costi logistici. Questo risparmio si riflette direttamente sul prezzo finale della casa. Il trasporto orizzontale non \u00E8 un dettaglio: \u00E8 un vantaggio competitivo strutturale.',
  },
]

const timelineSteps = [
  {
    time: '07:00',
    label: 'Piastre di base e pilastri',
    duration: '~30 min',
    description:
      'Posizionamento delle piastre di ancoraggio sulla platea e innesto dei pilastri portanti. Operazione completata in circa 30 minuti. La struttura verticale prende forma.',
    phase: 'mattina' as const,
  },
  {
    time: '08:00',
    label: 'Pareti perimetrali',
    duration: '~2 ore',
    description:
      'Tutte le pareti esterne vengono sollevate dall\'autogru e posizionate una ad una. Entro le 10:00 l\'intero perimetro \u00E8 chiuso. La casa ha gi\u00E0 la sua forma definitiva.',
    phase: 'mattina' as const,
  },
  {
    time: '13:00',
    label: 'Monoblocchi di copertura',
    duration: 'pomeriggio',
    description:
      'Dopo la pausa pranzo si posano i monoblocchi tetto prefabbricati con primo fissaggio. La struttura viene chiusa e protetta dalle intemperie. Le tegole possono essere posate immediatamente.',
    phase: 'pomeriggio' as const,
  },
  {
    time: 'Giorno +1',
    label: 'Fissaggio definitivo',
    duration: 'gru rimossa',
    description:
      'Connessioni strutturali definitive, verifica degli allineamenti, collaudo dei collegamenti antisismici. La gru viene rimossa: la struttura \u00E8 autonoma e pronta per la fase di finitura.',
    phase: 'completamento' as const,
  },
]

const phaseColors: Record<string, string> = {
  mattina: 'bg-amber-500',
  pomeriggio: 'bg-orange-500',
  completamento: 'bg-emerald-500',
}

const crewDetails = [
  {
    value: '8-12',
    label: 'Operatori specializzati',
    description: 'Squadre formate internamente, con esperienza diretta sul sistema X-Frame. Ogni operatore conosce il sistema nel dettaglio.',
  },
  {
    value: '1',
    label: 'Autogru (30m+ sbraccio)',
    description: 'Braccio sufficiente per raggiungere qualsiasi punto della struttura anche nelle configurazioni pi\u00F9 ampie.',
  },
  {
    value: '3',
    label: 'Squadre coordinate',
    description: 'Fondazioni, pareti e coperture in parallelo sotto un unico coordinatore che dirige le operazioni come un direttore d\'orchestra.',
  },
]

const buildTimings = [
  {
    level: 'Grezzo di base',
    days: '3',
    unit: 'giorni',
    description: 'Struttura portante, pareti perimetrali e copertura posata. La casa \u00E8 strutturalmente completa.',
    price: null,
  },
  {
    level: 'Grezzo avanzato',
    days: '7',
    unit: 'giorni',
    description:
      'Struttura completa, serramenti, cappotto, finiture esterne. L\'esterno manca solo del tonachino acril-silossanico finale.',
    price: '1.250 \u20AC/mq',
  },
  {
    level: 'Chiavi in mano',
    days: '30',
    unit: 'giorni',
    description:
      'Casa completa con impianti, finiture interne, certificazioni, pronta da abitare. Tempi certi, costi certi.',
    price: '+430 \u20AC/mq',
  },
]

export default function TrasportoMontaggioContent() {
  return (
    <div className="min-h-screen">

      {/* ===== HERO ===== */}
      <section className="relative bg-[#1D1D1F] pt-32 pb-24 lg:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: grainOverlay }} />
        <div className="relative max-w-6xl mx-auto">
          <ScrollReveal>
            <nav className="flex items-center gap-2 text-sm text-white/40 mb-10">
              <Link href="/sistema-x-frame" className="hover:text-white/70 transition-colors">Sistema X-Frame</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#A0845C]">Trasporto e Montaggio</span>
            </nav>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-[#A0845C]" />
              <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">Lo spettacolo</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Trasporto e <span className="text-[#A0845C]">Montaggio</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-xl md:text-2xl text-white/50 max-w-3xl leading-relaxed mb-6">
              Al mattino non c&apos;&egrave; nulla. La sera avete una struttura completa.
              Il montaggio X-Frame &egrave; uno spettacolo senza paragoni in Italia e in Europa:
              come un pit stop di Formula 1, ogni movimento &egrave; pianificato, ogni minuto conta.
            </p>
            <p className="text-base text-white/35 max-w-2xl leading-relaxed mb-14">
              L&apos;intera struttura viene montata in 7 giorni lavorativi da 8-12 operatori specializzati.
              L&apos;esterno manca solo del tonachino acril-silossanico finale.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { value: 2, label: 'Camion (vs 4)', suffix: '' },
                { value: 7, label: 'Giorni montaggio', suffix: '' },
                { value: 30, label: 'Giorni chiavi in mano', suffix: '' },
                { value: 30, label: 'Anni garanzia', suffix: '' },
              ].map((stat, i) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-[#A0845C]">
                    <CountUp to={stat.value} duration={2.5} delay={0.4 + i * 0.15} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-white/40 mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="mt-14 relative aspect-[21/9] rounded-2xl overflow-hidden">
              <Image
                src="/images/processo/gru-solleva-pannello.webp"
                alt="Gru solleva pannello prefabbricato X-Frame in cantiere"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1F] via-transparent to-transparent" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== TRASPORTO ORIZZONTALE ===== */}
      <section className="py-24 lg:py-32 px-6 bg-[#F5F5F7]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-[#A0845C]" />
              <span className="text-[#A0845C] text-xs tracking-[0.2em] uppercase font-medium">Esclusivo X-Frame</span>
              <div className="w-8 h-px bg-[#A0845C]" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mb-4">
              Trasporto <span className="text-[#A0845C]">Orizzontale</span>
            </h2>
            <p className="text-[#86868B] text-lg md:text-xl max-w-3xl mb-6">
              Mentre la concorrenza trasporta i pannelli in verticale, EcoLive li carica in orizzontale.
              Sembra un dettaglio, ma cambia tutto: stabilit&agrave;, sicurezza, quantit&agrave; per viaggio, costo finale.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="bg-white rounded-2xl border border-[#EDE6DB] p-6 mb-12 max-w-3xl">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-[#A0845C] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#1D1D1F] font-semibold mb-1">La travatura viaggia dentro i monoblocchi solaio interpiano</p>
                  <p className="text-[#86868B] text-sm leading-relaxed">
                    Alla base del carico i monoblocchi tetto e solaio, sopra pareti, travi e pilastri.
                    Le travi portanti si inseriscono all&apos;interno dei monoblocchi solaio: zero spazio sprecato.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {transportAdvantages.map((item, i) => {
              const Icon = item.icon
              return (
                <ScrollReveal key={item.title} delay={i * 0.1}>
                  <motion.div
                    className="group p-8 bg-white rounded-2xl border-t-2 border-t-transparent border border-[#EDE6DB] h-full hover:border-t-[#A0845C] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    whileHover={{ scale: 1.005 }}
                  >
                    <div className="w-10 h-10 bg-[#A0845C]/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-[#A0845C]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1D1D1F] mb-3 group-hover:text-[#A0845C] transition-colors">{item.title}</h3>
                    <p className="text-[#86868B] text-base leading-relaxed">{item.description}</p>
                  </motion.div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== TIMELINE MONTAGGIO ===== */}
      <section className="py-24 lg:py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-8 h-px bg-[#A0845C]" />
                <span className="text-[#A0845C] text-xs tracking-[0.2em] uppercase font-medium">Strutture fino a 150 m&sup2;, 1 livello</span>
                <div className="w-8 h-px bg-[#A0845C]" />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mb-4">
                Una Giornata, una Casa
              </h2>
              <p className="text-[#86868B] text-lg md:text-xl max-w-2xl mx-auto">
                Come un pit stop di Formula 1: velocit&agrave; coordinata, precisione millimetrica,
                ogni operatore sa esattamente cosa fare e quando.
              </p>
            </div>
          </ScrollReveal>

          <div className="relative pl-8 md:pl-12 border-l-2 border-[#A0845C]/30 space-y-10">
            {timelineSteps.map((step, i) => (
              <ScrollReveal key={step.time} direction="left" delay={i * 0.12} distance={20}>
                <div className="relative">
                  <div className={`absolute -left-[calc(2rem+7px)] md:-left-[calc(3rem+7px)] top-1.5 w-3.5 h-3.5 rounded-full ${phaseColors[step.phase]} ring-4 ring-white shadow-md`} />
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-2">
                    <span className="text-[#A0845C] font-bold text-xl whitespace-nowrap">{step.time}</span>
                    <h3 className="font-bold text-[#1D1D1F] text-xl">{step.label}</h3>
                    <span className="text-xs font-medium text-[#A0845C] bg-[#A0845C]/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-[#86868B] leading-relaxed text-lg">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.4}>
            <div className="mt-16 p-8 bg-[#F5F5F7] rounded-2xl border-l-4 border-l-[#A0845C]">
              <p className="text-[#1D1D1F] text-lg leading-relaxed italic">
                &ldquo;Al mattino non c&apos;&egrave; nulla, la sera avete una struttura presente.
                Non c&apos;&egrave; paragone con nessun&apos;altra realt&agrave; in Italia e in Europa.&rdquo;
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-12 grid md:grid-cols-3 gap-4">
            {[
              { src: '/images/processo/montaggio-colonne.webp', alt: 'Montaggio colonne legno nei connettori X-Frame' },
              { src: '/images/processo/consegna-cantiere.webp', alt: 'Consegna componenti prefabbricati in cantiere' },
              { src: '/images/xframe-dettaglio/connettore-fondazione.webp', alt: 'Connettore brevettato X-Frame su fondazione' },
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <p className="absolute bottom-3 left-4 right-4 text-white text-sm font-medium drop-shadow-lg">
                    {img.alt}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ORGANIZZAZIONE CANTIERE ===== */}
      <section className="relative py-24 lg:py-32 px-6 bg-[#1D1D1F] overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: grainOverlay }} />
        <div className="relative max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-8 h-px bg-[#A0845C]/50" />
                <span className="text-[#A0845C] text-xs tracking-[0.2em] uppercase font-medium">Precisione militare</span>
                <div className="w-8 h-px bg-[#A0845C]/50" />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Organizzazione del Cantiere
              </h2>
              <p className="text-white/50 text-lg md:text-xl max-w-3xl mx-auto">
                Un coordinatore generale come direttore d&apos;orchestra. Tre squadre specializzate in parallelo.
                Ogni movimento &egrave; pianificato, ogni minuto conta.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {crewDetails.map((item, i) => (
              <ScrollReveal key={item.label} delay={i * 0.12}>
                <GlassCard intensity="medium" className="p-8 text-center h-full">
                  <div className="text-4xl md:text-5xl font-bold text-[#A0845C] mb-3">{item.value}</div>
                  <div className="text-white font-semibold mb-2">{item.label}</div>
                  <p className="text-white/40 text-base leading-relaxed">{item.description}</p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.15}>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 max-w-4xl mx-auto mb-8">
              <div className="flex items-start gap-3">
                <Ruler className="w-5 h-5 text-[#A0845C] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold mb-1">Struttura modulare: griglia 4-4,5m x 7m</p>
                  <p className="text-white/40 text-sm leading-relaxed">
                    Il sistema X-Frame si basa su una griglia modulare flessibile. Configurazioni da 4x4 fino a 20x8 metri,
                    combinabili liberamente per qualsiasi pianta architettonica.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-5 h-5 text-[#A0845C]" />
                  <h3 className="text-white font-bold">Sicurezza totale</h3>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">
                  DPI completi per ogni operatore, documentazione di sicurezza in cantiere,
                  coordinatore dedicato, ponteggi e sistemi anticaduta professionali.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <Camera className="w-5 h-5 text-[#A0845C]" />
                  <h3 className="text-white font-bold">Il cantiere come evento</h3>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">
                  Droni, foto e video professionali, timelapse, banner e striscioni.
                  Invitiamo gli spettatori: potenziali clienti vengono a vedere, professionisti
                  imparano il sistema. Il montaggio &egrave; il miglior biglietto da visita.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="mt-8 p-6 rounded-2xl bg-[#A0845C]/10 border border-[#A0845C]/20 text-center max-w-3xl mx-auto">
              <p className="text-white/80 text-lg font-medium">
                Al mattino nulla, alla sera casa completa strutturalmente.
                <br />
                <span className="text-white/50 text-base">L&apos;esterno manca solo del tonachino acril-silossanico finale.</span>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== TEMPI DI COSTRUZIONE ===== */}
      <section className="py-24 lg:py-32 px-6 bg-[#F5F5F7]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-8 h-px bg-[#A0845C]" />
                <span className="text-[#A0845C] text-xs tracking-[0.2em] uppercase font-medium">Tempi certi, costi certi</span>
                <div className="w-8 h-px bg-[#A0845C]" />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F]">
                Tempi di Costruzione
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-5">
            {buildTimings.map((item, i) => (
              <ScrollReveal key={item.level} delay={i * 0.1}>
                <motion.div
                  className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-8 p-6 md:p-8 bg-white rounded-2xl border border-[#EDE6DB] hover:border-[#A0845C]/30 hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <div className="flex items-center gap-5 flex-1">
                    <div className="text-center min-w-[4rem]">
                      <div className="text-3xl md:text-4xl font-bold text-[#A0845C]">{item.days}</div>
                      <div className="text-xs text-[#86868B]">{item.unit}</div>
                    </div>
                    <div className="border-l border-[#EDE6DB] pl-5">
                      <h3 className="font-bold text-[#1D1D1F] text-lg">{item.level}</h3>
                      <p className="text-[#86868B] text-base leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                  {item.price && (
                    <div className="md:text-right">
                      <span className="text-lg font-bold text-[#A0845C]">{item.price}</span>
                    </div>
                  )}
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VIDEO ===== */}
      <section className="py-16 lg:py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-8">
              <span className="text-[#A0845C] text-xs tracking-[0.2em] uppercase font-medium">Video</span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1D1D1F] mt-2">
                Il montaggio dal vivo
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <YouTubeEmbed
              videoId="nptTzlZwGOg"
              title="Costruzione di una Casa in Legno Ecolive"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative py-20 lg:py-24 px-6 bg-[#1D1D1F] overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: grainOverlay }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              Configura la tua <span className="text-[#A0845C]">Casa X-Frame</span>
            </h2>
            <p className="text-white/50 text-lg mb-8">
              Scegli metratura, tipologia e livello di finitura. Preventivo personalizzato in pochi minuti.
            </p>
            <Link
              href="/configuratore"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#A0845C] text-white font-semibold rounded-full hover:bg-[#8B7049] transition-colors"
            >
              Vai al Configuratore
              <ArrowRight className="w-5 h-5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== NAVIGATION ===== */}
      <section className="py-12 px-6 bg-[#F5F5F7] border-t border-[#EDE6DB]">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/sistema-x-frame/coperture" className="group inline-flex items-center gap-2 text-[#86868B] hover:text-[#1D1D1F] transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Coperture</span>
          </Link>
          <Link href="/sistema-x-frame/confronto" className="group inline-flex items-center gap-2 text-[#A0845C] hover:text-[#8B7049] transition-colors font-medium">
            <span>Confronto</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  )
}
