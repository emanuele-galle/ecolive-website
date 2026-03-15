'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Layers,
  LayoutGrid,
  Home,
  Truck,
  BarChart3,
  ShieldCheck,
  ChevronDown,
  Plus,
  Timer,
  Thermometer,
  Shield,
  Leaf,
  Wrench,
  PiggyBank,
} from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import CountUp from '@/components/ui/CountUp'
import SectionTransition from '@/components/ui/SectionTransition'
import YouTubeEmbed from '@/components/ui/YouTubeEmbed'

// --- Static Data ---

const threeSystems = [
  {
    name: 'Platform Frame',
    contribution: 'Velocità e leggerezza',
    description:
      'Telaio in legno lamellare Bilam a montanti verticali. Struttura portante modulare che permette la prefabbricazione totale in laboratorio.',
    image: '/images/xframe-render/optimized/render-base.webp',
  },
  {
    name: 'X-Lam',
    contribution: 'Rigidezza e massa',
    description:
      'Pannelli micro X-Lam a tre strati incrociati (\u03BCXlam) applicati su entrambi i lati. Controventatura strutturale e tenuta all\u2019aria superiore.',
    image: '/images/xframe-render/optimized/render-avanzato.webp',
  },
  {
    name: 'Post & Beam',
    contribution: 'Luci libere e flessibilità',
    description:
      'Pilastri e travi lamellari di grande sezione per ampie campate senza pilastri intermedi. Luci fino a 13 metri per spazi aperti e design contemporaneo.',
    image: '/images/xframe-render/optimized/vista-sopra.webp',
  },
]

const keyStats = [
  { to: 0.159, decimals: 3, suffix: ' W/m\u00B2K', label: 'Trasmittanza pareti' },
  { to: 18.8, decimals: 1, suffix: ' ore', label: 'Sfasamento termico' },
  { to: 29, decimals: 0, suffix: ' cm', label: 'Spessore pareti' },
  { to: 95, decimals: 0, suffix: '%', label: 'Prefabbricazione' },
  { to: 7, decimals: 0, suffix: ' giorni', label: 'Montaggio struttura' },
  { to: 30, decimals: 0, suffix: ' anni', label: 'Garanzia struttura' },
]

const vantaggi = [
  {
    icon: Timer,
    title: 'Tempi certi',
    description:
      'Dalla firma del contratto alla consegna chiavi in mano in 30 giorni. Nessuna sorpresa, nessun ritardo.',
  },
  {
    icon: Thermometer,
    title: 'Efficienza energetica',
    description:
      'Classe A1 di serie, A4 (casa passiva) come opzione. Bollette ridotte fino al 70% rispetto alla muratura.',
  },
  {
    icon: Shield,
    title: 'Antisismicità superiore',
    description:
      'Il legno è il materiale antisismico per eccellenza. Struttura leggera e flessibile che assorbe le sollecitazioni.',
  },
  {
    icon: Leaf,
    title: '100% sostenibile',
    description:
      'Legno certificato PEFC da foreste gestite responsabilmente. Impronta di carbonio negativa.',
  },
  {
    icon: Wrench,
    title: 'Qualità controllata',
    description:
      'Produzione in laboratorio a temperatura e umidità controllate. Precisione millimetrica impossibile in cantiere.',
  },
  {
    icon: PiggyBank,
    title: 'Investimento intelligente',
    description:
      'Fino al 20% di risparmio sui costi complessivi rispetto alla muratura tradizionale.',
  },
]

const navigationCards = [
  {
    title: 'Pareti',
    href: '/sistema-x-frame/pareti',
    icon: Layers,
    description:
      '14 componenti ingegnerizzati per isolamento termoacustico superiore e zero ponti termici.',
    image: '/images/xframe-render/optimized/spaccato-copertina.webp',
  },
  {
    title: 'Solai',
    href: '/sistema-x-frame/solai',
    icon: LayoutGrid,
    description:
      'Moduli prefabbricati con struttura portante in legno lamellare e isolamento integrato.',
    image: '/images/xframe-render/optimized/tetto-principale.webp',
  },
  {
    title: 'Coperture',
    href: '/sistema-x-frame/coperture',
    icon: Home,
    description:
      'Tetto piano, a falde e combinato. Trasmittanza fino a 0,137 W/m\u00B2K con ventilazione naturale.',
    image: '/images/xframe-render/optimized/tetto-vista-sopra.webp',
  },
  {
    title: 'Trasporto e Montaggio',
    href: '/sistema-x-frame/trasporto-montaggio',
    icon: Truck,
    description:
      'Struttura portante montata in 7 giorni grazie alla prefabbricazione totale in stabilimento.',
    image: '/images/xframe-render/optimized/render-avanzato.webp',
  },
  {
    title: 'Confronto',
    href: '/sistema-x-frame/confronto',
    icon: BarChart3,
    description:
      'Tabelle comparative tra X-Frame, costruzione tradizionale, X-Lam e Platform Frame.',
    image: '/images/xframe-render/optimized/render-cpu.webp',
  },
]

const galleryImages = [
  { src: '/images/processo/gru-solleva-pannello.webp', alt: 'Gru solleva pannello prefabbricato X-Frame in cantiere' },
  { src: '/images/xframe-dettaglio/connettore-fondazione.webp', alt: 'Connettore acciaio brevettato X-Frame su fondazione' },
  { src: '/images/processo/montaggio-colonne.webp', alt: 'Montaggio colonne legno lamellare nei connettori X-Frame' },
  { src: '/images/fabbrica/linea-cnc.webp', alt: 'Linea CNC automatizzata nello stabilimento EcoLive' },
  { src: '/images/processo/panoramica-interni.webp', alt: 'Interno casa X-Frame con soffitto travi legno' },
  { src: '/images/fabbrica/sezionatrice.webp', alt: 'Operaio X-Frame alla sezionatrice verticale' },
]

const certifications = [
  { name: 'A4 CliMAX', label: 'Classe Energetica' },
  { name: 'Passive House / PHIUS', label: 'Standard Passivo' },
  { name: 'ARCA', label: 'Architettura Comfort Ambiente' },
  { name: 'LEED for Homes', label: 'Green Building' },
  { name: 'Woodworks', label: 'Residential Construction' },
]

// --- Animation Variants ---

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

// --- Component ---

export default function SistemaXFrameContent() {
  return (
    <div className="min-h-screen">

      {/* ========== 1. HERO ========== */}
      <section className="relative min-h-[80vh] lg:min-h-[90vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/xframe-render/optimized/spaccato-copertina.webp"
            alt="Spaccato costruttivo sistema X-Frame Ecolive"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1F] via-[#1D1D1F]/60 to-[#1D1D1F]/10" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-20 lg:pb-28">
          <ScrollReveal>
            <p className="uppercase tracking-[0.25em] text-[#A0845C] text-xs sm:text-sm font-semibold mb-4">
              Brevettato &middot; Made in Italy
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.08] max-w-4xl">
              Sistema Costruttivo{' '}
              <span className="text-[#A0845C]">X-Frame</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl md:text-2xl text-white/70 max-w-2xl leading-relaxed mb-12">
              L&apos;ibrido brevettato che fonde tre sistemi costruttivi in legno
              in un&apos;unica soluzione dalle prestazioni insuperabili.
            </p>
          </ScrollReveal>

          {/* Scroll indicator */}
          <ScrollReveal delay={0.5}>
            <motion.div
              className="flex flex-col items-start gap-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            >
              <span className="text-white/40 text-xs uppercase tracking-widest">Scopri</span>
              <ChevronDown className="w-5 h-5 text-[#A0845C]" />
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#1D1D1F" to="#F5F5F7" />

      {/* ========== 2. COS'È X-FRAME — The 3 Systems ========== */}
      <section className="py-24 lg:py-32 bg-[#F5F5F7]">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-6">
              <p className="uppercase tracking-[0.25em] text-[#A0845C] text-xs sm:text-sm font-semibold mb-4">
                La tecnologia
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mb-4">
                Cos&apos;è <span className="text-[#A0845C]">X-Frame</span>
              </h2>
              <p className="text-[#86868B] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                Un sistema costruttivo ibrido brevettato che combina i vantaggi di tre
                tecnologie in legno, eliminandone i limiti individuali.
              </p>
            </div>
          </ScrollReveal>

          {/* Three systems cards */}
          <div className="mt-16 lg:mt-20">
            <motion.div
              className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {threeSystems.map((system, i) => (
                <motion.div key={system.name} custom={i} variants={fadeInUp} className="relative">
                  {/* "+" connector between cards (desktop only) */}
                  {i < 2 && (
                    <div className="hidden md:flex absolute -right-3 lg:-right-4 top-[30%] z-10 items-center justify-center w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-[#A0845C] text-white">
                      <Plus className="w-3 h-3 lg:w-4 lg:h-4" />
                    </div>
                  )}

                  <div className="group bg-white rounded-2xl overflow-hidden border border-[#E5E5E7] hover:shadow-xl hover:shadow-[#A0845C]/8 transition-all duration-500">
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={system.image}
                        alt={`Sistema ${system.name}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-6 lg:p-8">
                      <h3 className="text-[#A0845C] font-semibold text-lg lg:text-xl mb-1">
                        {system.name}
                      </h3>
                      <p className="text-[#1D1D1F] font-medium text-sm uppercase tracking-wider mb-4">
                        {system.contribution}
                      </p>
                      <p className="text-[#86868B] leading-relaxed text-base">
                        {system.description}
                      </p>
                    </div>
                  </div>

                  {/* Mobile "+" connector */}
                  {i < 2 && (
                    <div className="flex md:hidden items-center justify-center my-4">
                      <div className="w-8 h-8 rounded-full bg-[#A0845C] text-white flex items-center justify-center">
                        <Plus className="w-4 h-4" />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Result callout */}
            <ScrollReveal delay={0.3}>
              <div className="mt-12 lg:mt-16 text-center">
                <div className="inline-flex items-center gap-4 px-8 py-5 rounded-2xl bg-[#1D1D1F] border border-[#A0845C]/30">
                  <span className="text-[#A0845C] text-2xl lg:text-3xl font-bold">=</span>
                  <p className="text-white text-lg lg:text-xl font-medium">
                    <span className="text-[#A0845C]">X-Frame</span>: il meglio di tre mondi
                    in un unico sistema brevettato
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionTransition from="#F5F5F7" to="#FFFFFF" height={80} />

      {/* ========== 3. BLOCKQUOTE ========== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <blockquote className="relative pl-8 border-l-4 border-[#A0845C]">
              <p className="text-xl md:text-2xl lg:text-[1.7rem] text-[#1D1D1F]/90 leading-relaxed italic font-light">
                &ldquo;L&apos;innovativo X-Frame rappresenta un ibrido dei sistemi costruttivi
                Platform Frame, X-Lam e Post and Beam. Le performance strutturali
                complessive surclassano qualsivoglia altro sistema, così come la
                velocità operativa nel montaggio si è rivelata insuperabile.&rdquo;
              </p>
              <footer className="mt-6 text-[#86868B] text-sm tracking-wide">
                &mdash; Relazione tecnica sistema costruttivo X-Frame
              </footer>
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#FFFFFF" to="#1D1D1F" />

      {/* ========== 4. KEY STATS ========== */}
      <section className="py-20 lg:py-28 bg-[#1D1D1F]">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="uppercase tracking-[0.25em] text-[#A0845C] text-xs sm:text-sm font-semibold mb-4">
                I numeri
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                Prestazioni <span className="text-[#A0845C]">misurabili</span>
              </h2>
            </div>
          </ScrollReveal>

          <motion.div
            className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {keyStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                variants={fadeInUp}
                className="text-center py-8 lg:py-10 border border-white/[0.06] rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300"
              >
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#A0845C] mb-2 tabular-nums">
                  <CountUp
                    to={stat.to}
                    decimals={stat.decimals}
                    suffix={stat.suffix}
                    duration={2.5}
                    separator="."
                  />
                </div>
                <div className="text-white/50 text-xs sm:text-sm uppercase tracking-wider mt-3">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <SectionTransition from="#1D1D1F" to="#F5F5F7" />

      {/* ========== 5. VANTAGGI CHIAVE ========== */}
      <section className="py-24 lg:py-32 bg-[#F5F5F7]">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="uppercase tracking-[0.25em] text-[#A0845C] text-xs sm:text-sm font-semibold mb-4">
                Perché sceglierlo
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mb-4">
                Vantaggi <span className="text-[#A0845C]">chiave</span>
              </h2>
              <p className="text-[#86868B] text-lg md:text-xl max-w-2xl mx-auto">
                Ogni dettaglio di X-Frame è progettato per offrire il massimo in termini
                di qualità, comfort e sostenibilità.
              </p>
            </div>
          </ScrollReveal>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {vantaggi.map((v, i) => {
              const Icon = v.icon
              return (
                <motion.div
                  key={v.title}
                  custom={i}
                  variants={fadeInUp}
                  className="group relative p-8 rounded-2xl bg-white border border-[#E5E5E7] hover:shadow-lg hover:shadow-[#A0845C]/8 hover:border-[#A0845C]/30 transition-all duration-300"
                >
                  {/* Gold top accent */}
                  <div className="absolute top-0 inset-x-0 h-[3px] bg-[#A0845C] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-t-2xl" />

                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#A0845C]/10 text-[#A0845C] mb-5 group-hover:bg-[#A0845C]/15 transition-colors duration-300">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-lg font-semibold text-[#1D1D1F] mb-3">
                    {v.title}
                  </h3>

                  <p className="text-[#86868B] leading-relaxed text-base">
                    {v.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      <SectionTransition from="#F5F5F7" to="#1D1D1F" />

      {/* ========== 6. GALLERY ========== */}
      <section className="py-24 lg:py-32 bg-[#1D1D1F]">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="uppercase tracking-[0.25em] text-[#A0845C] text-xs sm:text-sm font-semibold mb-4">
                Realizzazioni
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Case <span className="text-[#A0845C]">X-Frame</span>
              </h2>
              <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto">
                Ville e residenze realizzate con il sistema costruttivo X-Frame
              </p>
            </div>
          </ScrollReveal>

          {/* Bento grid: 2 large + 4 small */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Large image 1 */}
            <motion.div
              custom={0}
              variants={fadeInUp}
              className="col-span-2 row-span-2 relative aspect-[4/3] lg:aspect-auto lg:h-full rounded-2xl overflow-hidden group"
            >
              <Image
                src={galleryImages[0].src}
                alt={galleryImages[0].alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {galleryImages[0].alt}
              </div>
            </motion.div>

            {/* Small images */}
            {galleryImages.slice(1, 5).map((img, i) => (
              <motion.div
                key={img.src}
                custom={i + 1}
                variants={fadeInUp}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden group"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-3 left-3 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {img.alt}
                </div>
              </motion.div>
            ))}

            {/* Large image 2 (last gallery image, full width on mobile, span 2 cols on desktop) */}
            <motion.div
              custom={5}
              variants={fadeInUp}
              className="col-span-2 relative aspect-[21/9] rounded-2xl overflow-hidden group"
            >
              <Image
                src={galleryImages[5].src}
                alt={galleryImages[5].alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {galleryImages[5].alt}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========== 6b. VIDEO ========== */}
      <section className="py-16 lg:py-20 bg-[#1D1D1F]">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-10">
              <p className="uppercase tracking-[0.25em] text-[#A0845C] text-xs sm:text-sm font-semibold mb-4">
                Video
              </p>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                Guarda <span className="text-[#A0845C]">X-Frame</span> in azione
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <ScrollReveal delay={0.1} direction="left">
              <YouTubeEmbed
                videoId="R98zK3zp75g"
                title="Scopri X-Frame 2.0: Il Futuro delle Costruzioni in Legno Prefabbricate"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.2} direction="right">
              <YouTubeEmbed
                videoId="FWhNUIVIBFM"
                title="Comparazione Sistemi Costruttivi per le Case in Legno"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionTransition from="#1D1D1F" to="#F5F5F7" />

      {/* ========== 7. NAVIGATION CARDS ========== */}
      <section className="py-24 lg:py-32 bg-[#F5F5F7]">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="uppercase tracking-[0.25em] text-[#A0845C] text-xs sm:text-sm font-semibold mb-4">
                Approfondimenti
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mb-4">
                Esplora il <span className="text-[#A0845C]">Sistema</span>
              </h2>
              <p className="text-[#86868B] text-lg md:text-xl max-w-2xl mx-auto">
                Approfondisci ogni aspetto della tecnologia costruttiva X-Frame
              </p>
            </div>
          </ScrollReveal>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {navigationCards.map((card, i) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={card.title}
                  custom={i}
                  variants={fadeInUp}
                  className={i === 4 ? 'md:col-span-2 lg:col-span-1' : ''}
                >
                  <Link href={card.href} className="group block h-full">
                    <div className="relative h-full rounded-2xl bg-white border border-[#E5E5E7] transition-all duration-300 hover:shadow-xl hover:shadow-[#A0845C]/8 hover:border-[#A0845C]/30 flex flex-col overflow-hidden">
                      {/* Gold top border on hover */}
                      <div className="absolute top-0 inset-x-0 h-[3px] bg-[#A0845C] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 z-10" />

                      {/* Card image */}
                      <div className="relative aspect-[3/2] overflow-hidden">
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        <div className="absolute bottom-3 left-3 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/90 backdrop-blur-sm text-[#A0845C]">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Card content */}
                      <div className="p-6 lg:p-8 flex flex-col flex-1">
                        <h3 className="text-xl font-semibold text-[#1D1D1F] mb-3">
                          {card.title}
                        </h3>

                        <p className="text-[#86868B] leading-relaxed text-base flex-1 mb-6">
                          {card.description}
                        </p>

                        <div className="flex items-center gap-2 text-[#A0845C] font-medium text-sm group-hover:gap-3 transition-all duration-300">
                          Scopri di più
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      <SectionTransition from="#F5F5F7" to="#1D1D1F" />

      {/* ========== 8. CTA ========== */}
      <section className="relative py-24 lg:py-32 bg-[#1D1D1F] overflow-hidden">
        {/* Subtle grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          }}
          aria-hidden="true"
        />

        {/* Gold radial glow */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: 'radial-gradient(ellipse at center, #A0845C 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <ScrollReveal>
            <p className="uppercase tracking-[0.25em] text-[#A0845C] text-xs sm:text-sm font-semibold mb-6">
              Il tuo progetto
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Pronto a costruire con{' '}
              <span className="text-[#A0845C]">X-Frame</span>?
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Configura la tua casa ideale online oppure parla con i nostri ingegneri
              per un progetto su misura.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/configuratore"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#A0845C] hover:bg-[#8A7250] text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#A0845C]/25 text-base"
              >
                Configura la tua Casa
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contatti"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 hover:border-[#A0845C]/50 text-white font-semibold rounded-xl transition-all duration-300 hover:bg-white/5 text-base"
              >
                Contattaci
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#1D1D1F" to="#FFFFFF" />

      {/* ========== 9. CERTIFICATIONS ========== */}
      <section className="relative py-20 lg:py-24 bg-white overflow-hidden">
        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #A0845C 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="uppercase tracking-[0.25em] text-[#A0845C] text-xs sm:text-sm font-semibold mb-4">
                Garanzia di qualità
              </p>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-[#1D1D1F] mb-3">
                Certificazioni e Standard
              </h2>
              <p className="text-[#86868B] text-base md:text-lg max-w-xl mx-auto">
                X-Frame soddisfa i più rigorosi standard internazionali di bioedilizia
              </p>
            </div>
          </ScrollReveal>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.name}
                custom={i}
                variants={fadeInUp}
                className="text-center p-6 rounded-2xl border border-[#E5E5E7] bg-[#F5F5F7] hover:border-[#A0845C]/30 hover:bg-white hover:shadow-md transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#A0845C]/10 text-[#A0845C] mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-[#1D1D1F] font-semibold text-sm mb-1">
                  {cert.name}
                </div>
                <div className="text-[#86868B] text-xs">{cert.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  )
}
