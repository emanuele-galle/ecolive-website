'use client'

import Link from 'next/link'
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
} from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SpotlightCard from '@/components/ui/SpotlightCard'
import GlassCard from '@/components/ui/GlassCard'
import SectionTransition from '@/components/ui/SectionTransition'
import BlurText from '@/components/ui/BlurText'

// --- Static Data ---

const wallLayers = [
  {
    letter: 'B',
    name: 'Telaio strutturale Bilam',
    spec: '6\u00D724 / 6\u00D716',
    description: 'Montanti portanti in abete lamellare bilaminare. Garantiscono resistenza strutturale e antisismica.',
    color: '#A0937D',
  },
  {
    letter: 'C',
    name: 'Pannelli lamellari 3 strati \u03BCXlam',
    spec: '~20 mm (x2)',
    description: 'Controventatura su entrambi i lati del telaio. Rigidezza e stabilit\u00E0 dimensionale.',
    color: '#C4A47B',
  },
  {
    letter: 'D',
    name: 'Lana minerale doppia densit\u00E0',
    spec: '160 mm',
    description: 'Isolamento termoacustico ad alte prestazioni inserito nel telaio. Incombustibile, classe A1.',
    color: '#D4B896',
  },
  {
    letter: 'E',
    name: '\u03BCSughero alta densit\u00E0',
    spec: '30 mm',
    description: 'Cappotto esterno naturale. XPS ad alta densit\u00E0 nelle zone soggette a umidit\u00E0.',
    color: '#B8956E',
  },
  {
    letter: 'H',
    name: 'Pannelli tecno-gesso HD',
    spec: '25 mm',
    description: 'Rivestimento interno ad alta densit\u00E0. Superficie pronta per la finitura.',
    color: '#F0E8DC',
  },
  {
    letter: 'F',
    name: 'Telo freno vapore / traspirante',
    spec: '\u2014',
    description: 'Gestione igrotermale: blocca il vapore dall\u2019interno, lascia traspirare verso l\u2019esterno.',
    color: '#B8C4D0',
  },
  {
    letter: 'O',
    name: 'Rasante Mapetherm + acril silossanico',
    spec: '\u2014',
    description: 'Finitura esterna a due mani. L\u2019unico strato ancora da applicare in cantiere.',
    color: '#D4C8B0',
  },
]

const performanceStats = [
  { icon: Layers, label: 'Spessore totale', value: '29 cm' },
  { icon: Thermometer, label: 'Trasmittanza', value: '0,159 W/m\u00B2K' },
  { icon: Clock, label: 'Sfasamento', value: '18,8 ore' },
  { icon: Zap, label: 'Classe energetica', value: 'A1 (A4 con optional)' },
]

// --- Component ---

export default function ParetiContent() {
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* ===== 1. HEADER ===== */}
      <section className="relative bg-gradient-to-br from-[var(--color-secondary-dark)] via-[var(--color-secondary)] to-[var(--color-secondary-dark)] py-28 lg:py-40">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03]" />
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
            <p className="text-xl text-white/70 max-w-2xl">
              La parete arriva in cantiere gi&agrave; completa di struttura, isolamento,
              cappotto e controtelai finestra. Manca solo la mano finale di tonachino.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#1D1D1F" to="#F5F5F7" height={80} />

      {/* ===== 2. ANATOMIA DELLA PARETE ===== */}
      <section className="py-28 lg:py-36 bg-[var(--color-surface)]">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-secondary-dark)]">
                Anatomia della <span className="text-[var(--color-primary)]">Parete</span>
              </h2>
              <p className="text-[var(--color-muted)] text-lg max-w-2xl mx-auto mt-4">
                7 strati ingegnerizzati per prestazioni ai massimi livelli normativi
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {wallLayers.map((layer, i) => (
              <ScrollReveal key={layer.letter} delay={i * 0.06}>
                <div
                  className={`flex items-start gap-5 p-5 rounded-2xl border transition-shadow hover:shadow-premium ${
                    i % 2 === 0
                      ? 'bg-white border-[#EDE6DB]'
                      : 'bg-[var(--color-surface)] border-[var(--color-secondary-dark)]/10'
                  }`}
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
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionTransition from="#F5F5F7" to="#1D1D1F" height={80} />

      {/* ===== 3. PRESTAZIONI ===== */}
      <section className="py-28 lg:py-36 bg-[var(--color-secondary-dark)]">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">
                Prestazioni <span className="text-[var(--color-primary)]">Certificate</span>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {performanceStats.map((stat) => {
                const Icon = stat.icon
                return (
                  <GlassCard key={stat.label} intensity="medium" className="p-8 text-center h-full">
                    <div className="w-12 h-12 bg-[var(--color-primary)]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-[var(--color-primary)]" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-white/50 text-sm">{stat.label}</div>
                  </GlassCard>
                )
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#1D1D1F" to="#FFFFFF" height={80} />

      {/* ===== 4. MONOBLOCCO FINESTRA ===== */}
      <section className="py-28 lg:py-36 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div>
                <div className="w-14 h-14 bg-[var(--color-primary)]/10 rounded-xl flex items-center justify-center mb-6">
                  <Frame className="w-7 h-7 text-[var(--color-primary)]" />
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-secondary-dark)] mb-6">
                  Monoblocco <span className="text-[var(--color-primary)]">Finestra</span>
                </h2>
                <p className="text-[var(--color-muted)] leading-relaxed mb-8">
                  Il controtelaio finestra &egrave; pre-assemblato in stabilimento come parte
                  integrante del pannello parete. Questo elimina le criticit&agrave;
                  del cantiere tradizionale e garantisce precisione millimetrica.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.15}>
              <SpotlightCard className="bg-[var(--color-surface)] border border-[#EDE6DB]">
                <ul className="divide-y divide-[var(--color-secondary-dark)]/10">
                  <li className="p-5 flex items-start gap-4">
                    <Shield className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[var(--color-secondary-dark)]">
                        Mazzette laterali complete
                      </span>
                      <p className="text-sm text-[var(--color-muted)] mt-1">
                        Paraspigoli e finitura gi&agrave; integrati nel monoblocco.
                      </p>
                    </div>
                  </li>
                  <li className="p-5 flex items-start gap-4">
                    <Droplets className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[var(--color-secondary-dark)]">
                        Purenit HD sul 4&deg; lato inferiore
                      </span>
                      <p className="text-sm text-[var(--color-muted)] mt-1">
                        Materiale impermeabile e strutturale che crea una &ldquo;vasca
                        protettiva&rdquo; per il telaio finestra.
                      </p>
                    </div>
                  </li>
                  <li className="p-5 flex items-start gap-4">
                    <Clock className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[var(--color-secondary-dark)]">
                        Posa rapida e precisa
                      </span>
                      <p className="text-sm text-[var(--color-muted)] mt-1">
                        Nessun adattamento in cantiere: il serramento si inserisce nel
                        monoblocco gi&agrave; predisposto.
                      </p>
                    </div>
                  </li>
                </ul>
              </SpotlightCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionTransition from="#FFFFFF" to="#F5F5F7" height={80} />

      {/* ===== 5. BASE XPS ===== */}
      <section className="py-28 lg:py-36 bg-[var(--color-surface)]">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-secondary-dark)]">
                L&apos;evoluzione: <span className="text-[var(--color-primary)]">base XPS</span> al posto del cordolo
              </h2>
              <p className="text-[var(--color-muted)] text-lg max-w-2xl mx-auto mt-4">
                XPS ad altissima densit&agrave; (700&nbsp;kPa) sostituisce il tradizionale
                cordolo in cemento armato, semplificando radicalmente la fondazione.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="grid sm:grid-cols-2 gap-6">
              <SpotlightCard className="bg-white border border-[#EDE6DB]">
                <div className="p-7">
                  <div className="w-10 h-10 bg-[var(--color-primary)]/10 rounded-lg flex items-center justify-center mb-4">
                    <Thermometer className="w-5 h-5 text-[var(--color-primary)]" />
                  </div>
                  <h3 className="font-semibold text-[var(--color-secondary-dark)] mb-2">
                    Zero ponti termici
                  </h3>
                  <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                    L&apos;XPS elimina completamente il ponte termico alla base della parete,
                    punto critico nelle costruzioni tradizionali.
                  </p>
                </div>
              </SpotlightCard>
              <SpotlightCard className="bg-white border border-[#EDE6DB]">
                <div className="p-7">
                  <div className="w-10 h-10 bg-[var(--color-primary)]/10 rounded-lg flex items-center justify-center mb-4">
                    <Droplets className="w-5 h-5 text-[var(--color-primary)]" />
                  </div>
                  <h3 className="font-semibold text-[var(--color-secondary-dark)] mb-2">
                    Protezione dall&apos;umidit&agrave; di risalita
                  </h3>
                  <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                    L&apos;XPS &egrave; impermeabile per natura: blocca qualsiasi umidit&agrave; ascendente
                    dalla platea di fondazione.
                  </p>
                </div>
              </SpotlightCard>
              <SpotlightCard className="bg-white border border-[#EDE6DB]">
                <div className="p-7">
                  <div className="w-10 h-10 bg-[var(--color-primary)]/10 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-5 h-5 text-[var(--color-primary)]" />
                  </div>
                  <h3 className="font-semibold text-[var(--color-secondary-dark)] mb-2">
                    Fondazione semplificata
                  </h3>
                  <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                    L&apos;impresa del committente deve realizzare solo una platea piana,
                    senza il cordolo perimetrale di precisione.
                  </p>
                </div>
              </SpotlightCard>
              <SpotlightCard className="bg-white border border-[#EDE6DB]">
                <div className="p-7">
                  <div className="w-10 h-10 bg-[var(--color-primary)]/10 rounded-lg flex items-center justify-center mb-4">
                    <Layers className="w-5 h-5 text-[var(--color-primary)]" />
                  </div>
                  <h3 className="font-semibold text-[var(--color-secondary-dark)] mb-2">
                    Resistenza strutturale
                  </h3>
                  <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                    700&nbsp;kPa di resistenza a compressione: l&apos;XPS regge il carico della
                    parete senza deformazioni nel tempo.
                  </p>
                </div>
              </SpotlightCard>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#F5F5F7" to="#A0845C" height={80} />

      {/* ===== 6. CALLOUT VANTAGGIO CHIAVE ===== */}
      <section className="py-20 lg:py-28 bg-[var(--color-primary)]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ScrollReveal>
            <p className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-snug">
              &ldquo;La parete arriva in cantiere gi&agrave; finita.
              <br className="hidden md:block" />
              Manca solo la mano finale di tonachino acril-silossanico.&rdquo;
            </p>
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
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[var(--color-secondary-dark)] font-semibold rounded-xl border border-[#EDE6DB] hover:border-[var(--color-primary)]/30 hover:shadow-premium transition-all"
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
