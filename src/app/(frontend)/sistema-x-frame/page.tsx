'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Phone } from 'lucide-react'
import BlurText from '@/components/ui/BlurText'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SpotlightCard from '@/components/ui/SpotlightCard'
import GlassCard from '@/components/ui/GlassCard'
import CountUp from '@/components/ui/CountUp'
import InfiniteMarquee from '@/components/ui/InfiniteMarquee'
import SectionTransition from '@/components/ui/SectionTransition'

// --- Static Data ---

const heroStats = [
  { value: 29, label: 'Spessore parete', suffix: ' cm', display: null },
  { value: null, label: 'Classe energetica', suffix: '', display: 'A4' },
  { value: 50, label: 'Garanzia struttura', suffix: ' anni', display: null },
]

const threePillars = [
  {
    title: 'Struttura',
    description: 'Telaio portante in legno lamellare di abete, con giunzioni ingegnerizzate per la massima resistenza sismica.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008V7.5Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
      </svg>
    ),
  },
  {
    title: 'Isolamento',
    description: 'Fibra di legno ad alta densita integrata nel pannello per un isolamento termoacustico senza ponti termici.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
      </svg>
    ),
  },
  {
    title: 'Finitura',
    description: 'Pannello pronto per la posa di rivestimenti interni ed esterni, senza necessità di sottofondi aggiuntivi.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
]

const wallLayers = [
  { letter: 'A', name: 'Struttura portante lamellare (16x32)', color: '#8B7355' },
  { letter: 'B', name: 'Telaio strutturale bilam 6x24 \u2013 6x16', color: '#A0937D' },
  { letter: 'C', name: 'Lamellare 3 strati \u03BCXlam', color: '#C4A47B' },
  { letter: 'D', name: 'Lana minerale doppia densit\u00E0', color: '#D4B896' },
  { letter: 'E', name: '\u03BCSughero (alta densit\u00E0)', color: '#B8956E' },
  { letter: 'F', name: 'Telo freno vapore / traspirante diffusore', color: '#B8C4D0' },
  { letter: 'H', name: 'Pannelli tecno-gesso HD s=25 mm', color: '#F0E8DC' },
  { letter: 'I', name: 'Pannelli OSB3', color: '#C4A47B' },
  { letter: 'L', name: '4\u00B0 lato in Purenit HD', color: '#9B8B7A' },
  { letter: 'M', name: 'Intercapedine d\'aria per canalizzazioni', color: '#E8D5B7' },
  { letter: 'N', name: 'Portapilastri zincati e barre filettate f16', color: '#A8A8A8' },
  { letter: 'O', name: 'Rasante mapetherm + acril silossanico', color: '#D4C8B0' },
  { letter: 'P', name: 'Cordolo perimetrale in C.A. armato', color: '#888888' },
  { letter: 'Q', name: 'Manto finale di copertura', color: '#6B5B4E' },
]

const wallSpecs = {
  spessore: '29 cm',
  trasmittanza: '0.159 W/m\u00B2K',
  sfasamento: '16.8 ore',
}

const roofSpecs = {
  spessore: '40 cm',
  trasmittanza: '0.137 W/m\u00B2K',
  sfasamento: '14.5 ore',
}

const technicalSpecs = [
  {
    value: 0.159,
    unit: 'W/m\u00B2K',
    label: 'Trasmittanza parete',
    context: 'Il limite di legge \u00E8 0.26: superiamo lo standard del 39%',
    isDecimal: true,
  },
  {
    value: 16.8,
    unit: 'ore',
    label: 'Sfasamento termico',
    context: 'Il calore estivo impiega quasi 17 ore per attraversare la parete',
    isDecimal: true,
  },
  {
    value: 58,
    unit: 'dB',
    label: 'Abbattimento acustico',
    context: 'Silenzio assoluto: supera ampiamente i 40 dB richiesti dalla norma',
    isDecimal: false,
  },
  {
    value: null,
    unit: '',
    label: 'Resistenza sismica',
    context: 'Certificata per le zone a massima sismicit\u00E0 del territorio italiano',
    displayValue: 'Zona 1',
    isDecimal: false,
  },
]

const comparison = [
  {
    feature: 'Tempo montaggio struttura',
    xframe: '1 giorno',
    traditional: '2-3 mesi',
    xlam: '3-5 giorni',
  },
  {
    feature: 'Classe energetica',
    xframe: 'A4',
    traditional: 'B / C',
    xlam: 'A3 / A4',
  },
  {
    feature: 'Ponti termici',
    xframe: 'Eliminati',
    traditional: 'Presenti',
    xlam: 'Ridotti',
  },
  {
    feature: 'Flessibilita progettuale',
    xframe: 'Massima',
    traditional: 'Alta',
    xlam: 'Limitata',
  },
  {
    feature: 'Garanzia struttura',
    xframe: '50 anni',
    traditional: '10 anni',
    xlam: '20 anni',
  },
  {
    feature: 'Costo al mq (grezzo)',
    xframe: 'Competitivo',
    traditional: 'Medio-alto',
    xlam: 'Alto',
  },
]

const renderImages = [
  {
    src: '/images/xframe-render/optimized/spaccato-copertina.webp',
    alt: 'Spaccato costruttivo sistema X-Frame Ecolive',
    caption: 'Spaccato Sistema X-Frame',
  },
  {
    src: '/images/xframe-render/optimized/render-avanzato.webp',
    alt: 'Render configurazione avanzata X-Frame',
    caption: 'Configurazione Avanzata',
  },
  {
    src: '/images/xframe-render/optimized/render-base.webp',
    alt: 'Render configurazione base X-Frame',
    caption: 'Configurazione Base',
  },
  {
    src: '/images/xframe-render/optimized/tetto-3-strati.webp',
    alt: 'Stratigrafia tetto 3 strati Ecolive',
    caption: 'Tetto a 3 Strati',
  },
  {
    src: '/images/xframe-render/optimized/vista-sopra.webp',
    alt: 'Vista dall\'alto struttura X-Frame',
    caption: 'Vista dall\'Alto',
  },
  {
    src: '/images/xframe-render/optimized/tetto-principale.webp',
    alt: 'Sistema tetto principale X-Frame',
    caption: 'Sistema Tetto Principale',
  },
]

const marqueeItems = [
  'Brevettato',
  'Classe A4',
  'Antisismica Zona 1',
  '29 cm di Parete',
  'Zero Ponti Termici',
  '50 Anni Garanzia',
  'Made in Italy',
  'PEFC Certified',
]

// --- Page Component ---

export default function SistemaXFramePage() {
  return (
    <div className="min-h-screen">

      {/* ========== 1. HERO ========== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--color-secondary-dark)]">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/xframe-render/optimized/render-avanzato.webp"
            alt="Sistema X-Frame render"
            fill
            priority
            className="object-cover object-center opacity-30"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-secondary-dark)]/60 via-[var(--color-secondary-dark)]/40 to-[var(--color-secondary-dark)]/80" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <ScrollReveal>
            <span className="inline-block px-4 py-2 mb-8 text-sm font-semibold text-[var(--color-primary)] bg-white/10 backdrop-blur-sm rounded-full border border-[var(--color-primary)]/30">
              Tecnologia Brevettata
            </span>
          </ScrollReveal>

          <BlurText
            text="Sistema X-Frame 2.0"
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 justify-center"
            delay={80}
            animateBy="words"
          />

          <ScrollReveal delay={0.2}>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-14">
              La tecnologia costruttiva che ridefinisce il concetto di casa in legno.
              Struttura, isolamento e finitura in un unico pannello.
            </p>
          </ScrollReveal>

          {/* 3 hero stats */}
          <ScrollReveal delay={0.3}>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 pt-8 border-t border-white/10">
              {heroStats.map((stat, i) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-[var(--color-primary)]">
                    {stat.value !== null ? (
                      <CountUp to={stat.value} duration={2} delay={0.3 + i * 0.15} suffix={stat.suffix} />
                    ) : (
                      stat.display
                    )}
                  </div>
                  <div className="text-sm text-white/50 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Marquee */}
      <div className="py-5 bg-[var(--color-surface)] border-y border-[#EDE6DB]">
        <InfiniteMarquee
          items={marqueeItems}
          speed={25}
          className="text-[var(--color-secondary-dark)]/60"
        />
      </div>

      {/* ========== 2. CHE COS'E X-FRAME ========== */}
      <section className="py-28 lg:py-36 bg-[var(--color-surface)]">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-secondary-dark)]">
                Tre Sistemi, <span className="text-[var(--color-primary)]">Un Pannello</span>
              </h2>
              <p className="text-[var(--color-muted)] text-lg max-w-2xl mx-auto mt-4">
                X-Frame unisce il meglio del Platform Frame, dell&apos;X-Lam e del Post &amp; Beam
                in un unico sistema costruttivo brevettato.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-20">
            {threePillars.map((pillar, i) => (
              <ScrollReveal key={pillar.title} delay={i * 0.12}>
                <SpotlightCard className="bg-white border border-[#EDE6DB] h-full">
                  <div className="p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--color-secondary-dark)]/5 text-[var(--color-secondary-dark)] mb-5">
                      {pillar.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-[var(--color-secondary-dark)] mb-3">{pillar.title}</h3>
                    <p className="text-[var(--color-muted)] leading-relaxed">{pillar.description}</p>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>

          {/* Large image */}
          <ScrollReveal>
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-premium-xl">
              <Image
                src="/images/xframe-render/optimized/spaccato-copertina.webp"
                alt="Spaccato costruttivo del pannello X-Frame"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1200px"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#F5F5F7" to="#FFFFFF" height={80} />

      {/* ========== 3. STRATIGRAFIA ========== */}
      <section className="py-28 lg:py-36 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-secondary-dark)]">
                Stratigrafia del <span className="text-[var(--color-primary)]">Sistema</span>
              </h2>
              <p className="text-[var(--color-muted)] text-lg max-w-2xl mx-auto mt-4">
                14 componenti ingegnerizzati per prestazioni ai massimi livelli
              </p>
            </div>
          </ScrollReveal>

          {/* Wall & Roof specs comparison */}
          <ScrollReveal delay={0.1}>
            <div className="grid md:grid-cols-2 gap-6 mb-16">
              <SpotlightCard className="bg-[var(--color-surface)] border border-[#EDE6DB]">
                <div className="p-8 text-center">
                  <h3 className="text-xl font-bold text-[var(--color-secondary-dark)] mb-6">Parete</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-[var(--color-primary)]">{wallSpecs.spessore}</div>
                      <div className="text-[var(--color-muted)] text-xs mt-1">Spessore</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[var(--color-primary)]">{wallSpecs.trasmittanza.replace(' W/m\u00B2K', '')}</div>
                      <div className="text-[var(--color-muted)] text-xs mt-1">W/m&sup2;K</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[var(--color-primary)]">{wallSpecs.sfasamento}</div>
                      <div className="text-[var(--color-muted)] text-xs mt-1">Sfasamento</div>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
              <SpotlightCard className="bg-[var(--color-surface)] border border-[#EDE6DB]">
                <div className="p-8 text-center">
                  <h3 className="text-xl font-bold text-[var(--color-secondary-dark)] mb-6">Copertura</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-[var(--color-primary)]">{roofSpecs.spessore}</div>
                      <div className="text-[var(--color-muted)] text-xs mt-1">Spessore</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[var(--color-primary)]">{roofSpecs.trasmittanza.replace(' W/m\u00B2K', '')}</div>
                      <div className="text-[var(--color-muted)] text-xs mt-1">W/m&sup2;K</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[var(--color-primary)]">{roofSpecs.sfasamento}</div>
                      <div className="text-[var(--color-muted)] text-xs mt-1">Sfasamento</div>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <ScrollReveal direction="left">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-premium-lg">
                <Image
                  src="/images/xframe-render/optimized/render-base.webp"
                  alt="Stratigrafia parete X-Frame"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
              </div>
            </ScrollReveal>

            {/* Layers list */}
            <div className="space-y-0">
              {wallLayers.map((layer, i) => (
                <ScrollReveal key={layer.letter} delay={i * 0.04} direction="right">
                  <div className="flex items-center gap-4 py-3 border-b border-[var(--color-secondary-dark)]/10 last:border-b-0">
                    <div
                      className="w-8 h-8 rounded-lg flex-shrink-0 shadow-sm flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: layer.color }}
                    >
                      {layer.letter}
                    </div>
                    <div className="flex-1">
                      <span className="text-[var(--color-secondary-dark)] font-medium text-sm">{layer.name}</span>
                    </div>
                  </div>
                </ScrollReveal>
              ))}

              {/* Summary */}
              <ScrollReveal delay={0.6} direction="right">
                <div className="flex items-center gap-4 pt-6 mt-2 border-t-2 border-[var(--color-secondary-dark)]">
                  <div className="w-8 h-8 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="text-[var(--color-secondary-dark)] font-bold text-lg">Spessore parete totale</span>
                  </div>
                  <span className="text-[var(--color-primary)] font-bold text-xl">{wallSpecs.spessore}</span>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <SectionTransition from="#FFFFFF" to="#1D1D1F" height={80} />

      {/* ========== 4. PRESTAZIONI TECNICHE ========== */}
      <section className="py-28 lg:py-36 bg-[var(--color-secondary-dark)]">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">
                Prestazioni <span className="text-[var(--color-primary)]">Certificate</span>
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto mt-4">
                Valori che superano ampiamente gli standard normativi italiani
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {technicalSpecs.map((spec, i) => (
              <ScrollReveal key={spec.label} delay={i * 0.1}>
                <GlassCard intensity="medium" className="p-8 text-center h-full">
                  <div className="text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-1">
                    {spec.value !== null ? (
                      spec.isDecimal ? spec.value : <CountUp to={spec.value} duration={2} delay={0.2 + i * 0.1} />
                    ) : (
                      spec.displayValue
                    )}
                  </div>
                  {spec.unit && (
                    <div className="text-white/40 text-sm mb-4">{spec.unit}</div>
                  )}
                  {!spec.unit && <div className="mb-4" />}
                  <div className="text-white font-semibold text-lg mb-3">{spec.label}</div>
                  <p className="text-white/50 text-sm leading-relaxed">{spec.context}</p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionTransition from="#1D1D1F" to="#F5F5F7" height={80} />

      {/* ========== 5. CONFRONTO ========== */}
      <section className="py-28 lg:py-36 bg-[var(--color-surface)]">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-secondary-dark)]">
                Perché <span className="text-[var(--color-primary)]">X-Frame</span>
              </h2>
              <p className="text-[var(--color-muted)] text-lg max-w-2xl mx-auto mt-4">
                Un confronto diretto con i sistemi costruttivi tradizionali
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="overflow-x-auto bg-white rounded-2xl shadow-premium border border-[#EDE6DB] p-2">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b-2 border-[var(--color-secondary-dark)]">
                    <th className="text-left py-4 pr-4 pl-4 text-[var(--color-muted)] font-medium text-sm uppercase tracking-wider">
                      Caratteristica
                    </th>
                    <th className="py-4 px-4 text-center">
                      <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[var(--color-secondary-dark)] text-white rounded-full text-sm font-semibold">
                        X-Frame
                      </span>
                    </th>
                    <th className="py-4 px-4 text-center text-[var(--color-muted)] font-medium text-sm">
                      Tradizionale
                    </th>
                    <th className="py-4 pl-4 pr-4 text-center text-[var(--color-muted)] font-medium text-sm">
                      X-Lam
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr key={row.feature} className={`border-b border-[var(--color-secondary-dark)]/10 ${i % 2 === 0 ? 'bg-[var(--color-surface)]/50' : ''}`}>
                      <td className="py-4 pr-4 pl-4 text-[var(--color-secondary-dark)] font-medium">{row.feature}</td>
                      <td className="py-4 px-4 text-center text-[var(--color-primary)] font-semibold">{row.xframe}</td>
                      <td className="py-4 px-4 text-center text-[var(--color-muted)]">{row.traditional}</td>
                      <td className="py-4 pl-4 pr-4 text-center text-[var(--color-muted)]">{row.xlam}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#F5F5F7" to="#FFFFFF" height={80} />

      {/* VIDEO X-FRAME */}
      <section className="py-24 lg:py-32 bg-white px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] mb-4">
                X-Frame in Azione
              </h2>
              <p className="text-[#86868B] text-lg max-w-2xl mx-auto">
                Guarda come il sistema costruttivo X-Frame rivoluziona la realizzazione di case prefabbricate in legno
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="relative rounded-2xl overflow-hidden aspect-video shadow-premium-xl">
              <iframe
                src="https://www.youtube-nocookie.com/embed/R98zK3zp75g"
                title="Scopri X-Frame 2.0 — Ecolive"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                loading="lazy"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== 6. RENDER SHOWCASE ========== */}
      <section className="py-28 lg:py-36 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-secondary-dark)]">
                Dettagli <span className="text-[var(--color-primary)]">Costruttivi</span>
              </h2>
              <p className="text-[var(--color-muted)] text-lg max-w-2xl mx-auto mt-4">
                Render tecnici della struttura e della copertura X-Frame
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {renderImages.map((img, i) => (
              <ScrollReveal
                key={img.src}
                delay={i * 0.08}
              >
                <div
                  className={`group relative overflow-hidden rounded-2xl shadow-premium hover:shadow-premium-lg transition-shadow duration-500 ${
                    i === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes={i === 0 ? '(max-width: 768px) 100vw, 1200px' : '(max-width: 768px) 100vw, 600px'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-white font-semibold text-lg">{img.caption}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionTransition from="#FFFFFF" to="#1D1D1F" height={80} />

      {/* ========== 7. CTA ========== */}
      <section className="py-28 lg:py-36 bg-[var(--color-secondary-dark)]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
              Scopri come X-Frame può trasformare il tuo <span className="text-[var(--color-primary)]">progetto</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-12">
              Prenota una consulenza gratuita con i nostri tecnici per scoprire
              la soluzione costruttiva ideale per la tua casa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contatti"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-lg rounded-xl transition-colors duration-300"
              >
                Richiedi Consulenza Gratuita
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+3909631951395"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-transparent text-white font-semibold text-lg rounded-xl border border-white/20 hover:bg-white/5 transition-colors duration-300"
              >
                <Phone className="w-5 h-5" />
                Chiama Ora
              </a>
            </div>
            <p className="text-white/30 text-sm mt-8">
              Consulenza gratuita &middot; Risposta entro 24 ore
            </p>
          </ScrollReveal>
        </div>
      </section>

    </div>
  )
}
