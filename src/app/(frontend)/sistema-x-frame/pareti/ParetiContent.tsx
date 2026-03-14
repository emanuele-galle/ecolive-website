'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Layers,
  Shield,
  Thermometer,
  Clock,
  Zap,
  ChevronRight,
  Frame,
  Droplets,
  CheckCircle2,
  TreePine,
  Wrench,
  ShieldCheck,
} from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SpotlightCard from '@/components/ui/SpotlightCard'
import GlassCard from '@/components/ui/GlassCard'
import SectionTransition from '@/components/ui/SectionTransition'
import BlurText from '@/components/ui/BlurText'
import CountUp from '@/components/ui/CountUp'

// --- Static Data ---

const grainOverlay = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`

const wallLayers = [
  {
    letter: 'B',
    name: 'Telaio strutturale in lamellare Bilam',
    spec: '6\u00D724 / 6\u00D716',
    description:
      'Montanti portanti in abete lamellare bilaminare, caratterizzato da elevata stabilit\u00E0 dimensionale. A differenza del legno massello che pu\u00F2 deformarsi nel tempo con l\u2019umidit\u00E0, il Bilam \u00E8 gi\u00E0 essiccato e incollato a strati incrociati: nessun ritiro, nessuna torsione, prestazioni garantite per decenni.',
    color: '#A0937D',
  },
  {
    letter: 'C',
    name: 'Pannelli lamellari 3 strati \u03BCXlam',
    spec: '~20 mm (x2)',
    description:
      'Due pannelli micro X-Lam a tre strati incrociati applicati su entrambi i lati del telaio. Garantiscono controventatura strutturale, rigidezza di piano e tenuta all\u2019aria, unendo i vantaggi del Platform Frame e dell\u2019X-Lam in un unico sistema.',
    color: '#C4A47B',
  },
  {
    letter: 'D',
    name: 'Isolamento in lana di roccia',
    spec: '160 mm',
    description:
      'Pannello isolante in lana di roccia a doppia densit\u00E0 inserito tra i montanti del telaio. 16 cm di isolamento termoacustico ad alte prestazioni, incombustibile (classe A1), con ottima traspirabilit\u00E0 al vapore acqueo.',
    color: '#D4B896',
  },
  {
    letter: 'E',
    name: 'Cappotto esterno in sughero ad alta densit\u00E0',
    spec: '30 mm',
    description:
      'Cappotto naturale da 3 cm in sughero espanso ad alta densit\u00E0. Nelle zone pi\u00F9 esposte all\u2019umidit\u00E0 (parte inferiore e bordi della parete), il sughero viene sostituito con XPS ad alta densit\u00E0 per evitare qualsiasi rischio di umidit\u00E0 di risalita.',
    color: '#B8956E',
  },
  {
    letter: 'F',
    name: 'Telo freno vapore / traspirante',
    spec: '\u2014',
    description:
      'Membrana igrovariabile per la gestione igrotermale: blocca il vapore dall\u2019interno impedendo la condensa interstiziale, lascia traspirare verso l\u2019esterno permettendo alla parete di \u201Crespirare\u201D.',
    color: '#B8C4D0',
  },
  {
    letter: 'H',
    name: 'Pannelli tecno-gesso HD',
    spec: '25 mm',
    description:
      'Rivestimento interno in tecno-gesso ad alta densit\u00E0. Massa areica elevata per migliore isolamento acustico, resistenza al fuoco REI, superficie pronta per la finitura senza ulteriori lavorazioni.',
    color: '#F0E8DC',
  },
  {
    letter: 'O',
    name: 'Rasatura con rete in fibra di vetro',
    spec: '\u2014',
    description:
      'Ciclo di finitura esterna: rasatura armata con rete in fibra di vetro e doppia mano di rasante. L\u2019unico strato mancante all\u2019arrivo in cantiere \u00E8 il tonachino acril-silossanico finale.',
    color: '#D4C8B0',
  },
]

const performanceStats = [
  { icon: Layers, label: 'Spessore totale', value: 29, suffix: ' cm', decimals: 0 },
  { icon: Thermometer, label: 'Trasmittanza', value: 0.159, suffix: ' W/m\u00B2K', decimals: 3 },
  { icon: Clock, label: 'Sfasamento', value: 18.8, suffix: ' ore', decimals: 1 },
  { icon: Zap, label: 'Classe energetica', displayValue: 'A1 \u2192 A4' },
]

const monobloccoFeatures = [
  { icon: Shield, title: 'Mazzette laterali complete', description: 'Paraspigoli e finitura gi\u00E0 integrati nel monoblocco. L\u2019infisso si inserisce senza adattamenti, con precisione millimetrica garantita dalla lavorazione in laboratorio.' },
  { icon: Droplets, title: '4\u00B0 lato in Purenit HD', description: 'Il lato inferiore del monoblocco utilizza Purenit, un materiale strutturale e impermeabile che crea una vera e propria \u201Cvasca protettiva\u201D per l\u2019infisso. Nessuna infiltrazione, nessun ponte termico nel nodo critico serramento-parete.' },
  { icon: Zap, title: 'Posa rapida e precisa', description: 'Nessun adattamento in cantiere: il serramento si inserisce nel monoblocco gi\u00E0 predisposto. Perfetta tenuta aria/acqua, zero ponti termici, tempi di posa ridotti al minimo.' },
  { icon: CheckCircle2, title: 'Zero ponti termici', description: 'La continuit\u00E0 dell\u2019isolamento \u00E8 garantita su tutti e 4 i lati. Il Purenit sul lato inferiore e il sughero/XPS sui laterali eliminano completamente i ponti termici nel punto pi\u00F9 critico della facciata.' },
]

const xpsAdvantages = [
  { icon: Thermometer, title: 'Zero ponti termici alla base', description: 'L\u2019XPS elimina completamente il ponte termico alla base della parete, punto critico nelle costruzioni tradizionali dove il cordolo in cemento crea una discontinuit\u00E0 nell\u2019isolamento.' },
  { icon: Droplets, title: 'Protezione umidit\u00E0 di risalita', description: 'L\u2019XPS \u00E8 impermeabile per natura: blocca qualsiasi umidit\u00E0 ascendente dalla platea di fondazione, proteggendo la struttura in legno nel lungo periodo.' },
  { icon: Shield, title: 'Fondazione semplificata', description: 'Basta una piattaforma semplice, senza il cordolo perimetrale di precisione in cemento armato. L\u2019impresa del committente risparmia tempo e costi significativi sulla fondazione.' },
  { icon: Layers, title: 'Resistenza strutturale 700 kPa', description: 'XPS ad altissima densit\u00E0 con 700 kPa di resistenza a compressione. Supporta qualsiasi peso in pressione senza deformazioni nel tempo, sostituendo strutturalmente il cordolo in cemento.' },
]

// --- Component ---

export default function ParetiContent() {
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* ===== 1. HEADER ===== */}
      <section className="relative bg-gradient-to-br from-[var(--color-secondary-dark)] via-[var(--color-secondary)] to-[var(--color-secondary-dark)] py-28 lg:py-40 overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: grainOverlay }} />
        <div className="relative max-w-5xl mx-auto px-6">
          <ScrollReveal direction="left">
            <Link
              href="/sistema-x-frame"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-2 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Sistema X-Frame</span>
            </Link>
            <nav className="flex items-center gap-1.5 text-sm text-white/40 mb-10">
              <Link href="/sistema-x-frame" className="hover:text-white/70 transition-colors">
                Sistema X-Frame
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white/80">Pareti</span>
            </nav>
          </ScrollReveal>

          <BlurText
            text="Pareti X-Frame"
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8"
            delay={80}
            animateBy="words"
          />

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-white/70 max-w-2xl leading-relaxed">
              7 strati ingegnerizzati in 29 cm di spessore. La parete arriva in cantiere gi&agrave;
              completa di struttura, isolamento, cappotto e controtelai finestra.
              Manca solo la mano finale di tonachino acril-silossanico.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.35}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14">
              {performanceStats.map((stat, i) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className="text-center">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-6 h-6 text-[#A0845C]" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-white">
                      {'displayValue' in stat ? (
                        stat.displayValue
                      ) : (
                        <CountUp
                          to={stat.value}
                          duration={2.5}
                          delay={0.5 + i * 0.15}
                          suffix={stat.suffix}
                          decimals={stat.decimals}
                        />
                      )}
                    </div>
                    <div className="text-sm text-white/40 mt-1">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#1D1D1F" to="#F5F5F7" height={80} />

      {/* ===== 2. ANATOMIA DELLA PARETE ===== */}
      <section className="py-28 lg:py-36 bg-[var(--color-surface)]">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-8 h-px bg-[#A0845C]" />
                <span className="text-[#A0845C] text-xs tracking-[0.2em] uppercase font-medium">
                  Dall&apos;interno all&apos;esterno
                </span>
                <div className="w-8 h-px bg-[#A0845C]" />
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-secondary-dark)]">
                Anatomia della <span className="text-[var(--color-primary)]">Parete</span>
              </h2>
              <p className="text-[var(--color-muted)] text-lg max-w-2xl mx-auto mt-4">
                7 strati ingegnerizzati per prestazioni ai massimi livelli normativi.
                Ogni componente ha una funzione precisa, nessun materiale &egrave; superfluo.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="bg-[#A0845C]/5 border border-[#A0845C]/20 rounded-2xl p-5 mb-12 max-w-3xl mx-auto">
              <div className="flex items-start gap-3">
                <TreePine className="w-5 h-5 text-[#A0845C] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[var(--color-secondary-dark)] leading-relaxed">
                  <strong>Perch&eacute; il lamellare Bilam e non il legno massello?</strong> Il Bilam &egrave; gi&agrave; essiccato e incollato a strati incrociati.
                  Il legno massello pu&ograve; deformarsi nel tempo per variazioni di umidit&agrave;: ritiri, torsioni, fessurazioni.
                  Con il Bilam queste problematiche sono eliminate alla radice.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {wallLayers.map((layer, i) => (
              <ScrollReveal key={layer.letter} delay={i * 0.06}>
                <motion.div
                  className={`flex items-start gap-5 p-5 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${
                    i % 2 === 0
                      ? 'bg-white border-[#EDE6DB]'
                      : 'bg-[var(--color-surface)] border-[var(--color-secondary-dark)]/10'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex-shrink-0 shadow-sm flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: layer.color }}
                  >
                    {layer.letter}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="text-[var(--color-secondary-dark)] font-semibold">
                        {layer.name}
                      </h3>
                      {layer.spec !== '\u2014' && (
                        <span className="text-xs font-medium text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2 py-0.5 rounded-full">
                          {layer.spec}
                        </span>
                      )}
                    </div>
                    <p className="text-[var(--color-muted)] text-sm mt-1 leading-relaxed">
                      {layer.description}
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionTransition from="#F5F5F7" to="#FFFFFF" height={80} />

      {/* ===== 3. MONOBLOCCO FINESTRA ===== */}
      <section className="py-28 lg:py-36 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-8 h-px bg-[#A0845C]" />
                <span className="text-[#A0845C] text-xs tracking-[0.2em] uppercase font-medium">
                  Prefabbricato in laboratorio
                </span>
                <div className="w-8 h-px bg-[#A0845C]" />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-secondary-dark)]">
                Monoblocco <span className="text-[var(--color-primary)]">Finestra</span>
              </h2>
              <p className="text-[var(--color-muted)] text-lg max-w-2xl mx-auto mt-4">
                Il controtelaio finestra &egrave; pre-assemblato in stabilimento come parte integrante
                del pannello parete. Mazzette, paraspigoli, finitura e impermeabilizzazione:
                tutto gi&agrave; integrato, nessun adattamento in cantiere.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {monobloccoFeatures.map((feat, i) => {
              const Icon = feat.icon
              return (
                <ScrollReveal key={feat.title} delay={i * 0.1}>
                  <motion.div
                    className="group p-7 bg-[var(--color-surface)] rounded-2xl border border-[#EDE6DB] h-full hover:border-[#A0845C]/30 hover:shadow-lg transition-all duration-300"
                    whileHover={{ y: -2 }}
                  >
                    <div className="w-12 h-12 bg-[var(--color-primary)]/10 rounded-xl flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-[var(--color-primary)]" />
                    </div>
                    <h3 className="font-bold text-[var(--color-secondary-dark)] text-lg mb-2 group-hover:text-[#A0845C] transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-[var(--color-muted)] text-sm leading-relaxed">
                      {feat.description}
                    </p>
                  </motion.div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      <SectionTransition from="#FFFFFF" to="#1D1D1F" height={80} />

      {/* ===== 4. BASE XPS (EVOLUZIONE 2025-26) ===== */}
      <section className="relative py-28 lg:py-36 bg-[#1D1D1F] overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: grainOverlay }} />
        <div className="relative max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-8 h-px bg-[#A0845C]/50" />
                <span className="text-[#A0845C] text-xs tracking-[0.2em] uppercase font-medium">
                  Evoluzione 2025-26
                </span>
                <div className="w-8 h-px bg-[#A0845C]/50" />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                Base <span className="text-[#A0845C]">XPS</span> al posto del cordolo
              </h2>
              <p className="text-white/50 text-lg max-w-3xl mx-auto mt-4">
                XPS ad altissima densit&agrave; (700&nbsp;kPa) nella parte inferiore della parete
                sostituisce il tradizionale cordolo perimetrale in cemento armato.
                Una rivoluzione che semplifica radicalmente la fondazione.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-6 mt-12">
            {xpsAdvantages.map((item, i) => {
              const Icon = item.icon
              return (
                <ScrollReveal key={item.title} delay={i * 0.1}>
                  <GlassCard intensity="medium" className="p-7 h-full">
                    <div className="w-10 h-10 bg-[#A0845C]/20 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-[#A0845C]" />
                    </div>
                    <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{item.description}</p>
                  </GlassCard>
                </ScrollReveal>
              )
            })}
          </div>

          <ScrollReveal delay={0.4}>
            <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 border-l-4 border-l-[#A0845C] max-w-3xl mx-auto">
              <div className="flex items-start gap-3">
                <Wrench className="w-5 h-5 text-[#A0845C] flex-shrink-0 mt-0.5" />
                <p className="text-white/60 text-sm leading-relaxed">
                  <strong className="text-white/80">Per il committente significa:</strong> l&apos;impresa edile deve realizzare solo una piattaforma semplice e piana,
                  senza il cordolo perimetrale di precisione in cemento armato. Meno complessit&agrave; in fondazione,
                  meno costi, meno tempo.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#1D1D1F" to="#F5F5F7" height={80} />

      {/* ===== 5. PARETE GIA FINITA ===== */}
      <section className="py-28 lg:py-36 bg-[var(--color-surface)]">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-[#A0845C]" />
              <span className="text-[#A0845C] text-xs tracking-[0.2em] uppercase font-medium">Prefabbricazione al 95%</span>
              <div className="w-8 h-px bg-[#A0845C]" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-secondary-dark)] mb-12">
              Arriva in cantiere <span className="text-[var(--color-primary)]">gi&agrave; finita</span>
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <ScrollReveal direction="left">
              <div className="space-y-4">
                {['Struttura portante assemblata', 'Isolamento in lana di roccia inserito', 'Pannelli \u03BCXlam applicati', 'Cappotto in sughero/XPS posato', 'Rasatura con rete in fibra di vetro', 'Monoblocchi finestra integrati', 'Base XPS gi\u00E0 montata', 'Freno vapore e telo traspirante applicati'].map((item, i) => (
                  <motion.div key={item} className="flex items-center gap-3" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.3 }}>
                    <CheckCircle2 className="w-5 h-5 text-[#A0845C] flex-shrink-0" />
                    <span className="text-[var(--color-secondary-dark)] font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.15}>
              <SpotlightCard className="bg-white border border-[#EDE6DB]">
                <div className="p-8">
                  <ShieldCheck className="w-7 h-7 text-[#A0845C] mb-4" />
                  <h3 className="font-serif text-2xl font-bold text-[var(--color-secondary-dark)] mb-3">Cosa manca in cantiere?</h3>
                  <p className="text-[var(--color-muted)] leading-relaxed mb-3">
                    Solo il <strong>tonachino acril-silossanico finale</strong>. Tutto il resto &mdash; struttura,
                    isolamento, cappotto, controtelai, impermeabilizzazione &mdash; arriva gi&agrave; assemblato
                    dal laboratorio di Spadola, a temperatura e umidit&agrave; controllate.
                  </p>
                  <p className="text-[var(--color-muted)] text-sm leading-relaxed">
                    Qualit&agrave; costante, precisione millimetrica e tempi certi di realizzazione.
                  </p>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionTransition from="#F5F5F7" to="#A0845C" height={80} />

      {/* ===== 6. CALLOUT ===== */}
      <section className="py-20 lg:py-28 bg-[var(--color-primary)]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ScrollReveal>
            <p className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-snug">
              &ldquo;La parete arriva in cantiere gi&agrave; finita.
              <br className="hidden md:block" />
              Manca solo la mano finale di tonachino acril-silossanico.&rdquo;
            </p>
            <div className="mt-8 flex items-center justify-center gap-8 text-white/70 text-sm">
              <span>29 cm di spessore</span>
              <span className="w-1 h-1 bg-white/40 rounded-full" />
              <span>0,159 W/m&sup2;K</span>
              <span className="w-1 h-1 bg-white/40 rounded-full" />
              <span>18,8 ore di sfasamento</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#A0845C" to="#F5F5F7" height={80} />

      {/* ===== 7. NAVIGAZIONE ===== */}
      <section className="py-20 lg:py-28 bg-[var(--color-surface)]">
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/sistema-x-frame"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[var(--color-secondary-dark)] font-semibold rounded-xl border border-[#EDE6DB] hover:border-[var(--color-primary)]/30 hover:shadow-lg transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                Sistema X-Frame
              </Link>
              <Link
                href="/sistema-x-frame/solai"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-secondary-dark)] text-white font-semibold rounded-xl hover:bg-[var(--color-secondary)] transition-colors"
              >
                Solai
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
