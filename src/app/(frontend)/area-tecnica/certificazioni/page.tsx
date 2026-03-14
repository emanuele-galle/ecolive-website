'use client'

import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  CheckCircle, Shield, FileText, Download, ExternalLink, ArrowLeft,
  Scale, Zap, Flame, Volume2, BadgeCheck, Building2, Home, Leaf,
  Phone, Mail, Award, Globe
} from 'lucide-react'
import Button from '@/components/ui/Button'
import BlurText from '@/components/ui/BlurText'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SpotlightCard from '@/components/ui/SpotlightCard'
import GlassCard from '@/components/ui/GlassCard'
import CountUp from '@/components/ui/CountUp'
import InfiniteMarquee from '@/components/ui/InfiniteMarquee'
import SectionTransition from '@/components/ui/SectionTransition'

const certifications = [
  {
    id: 'passive',
    name: 'Passive House',
    logo: '/api/media/file/passive-house.png',
    mainStat: '15 kWh/m\u00b2',
    statLabel: 'Consumo max annuo',
    description: 'Lo standard internazionale più rigoroso per edifici ad altissima efficienza energetica.',
    details: [
      'Consumo energetico max 15 kWh/m\u00b2/anno',
      'Trasmittanza termica U < 0.15 W/m\u00b2K',
      'Tenuta all\'aria n50 < 0.6/h',
      'Assenza di ponti termici',
      'Ventilazione meccanica con recupero calore > 75%',
    ],
    link: 'https://passivehouse.com/',
    accent: '#A0845C',
    icon: Home,
    accentColorStyle: { color: '#A0845C' } as const,
    accentBgStyle: { backgroundColor: '#A0845C15' } as const,
  },
  {
    id: 'casaclima',
    name: 'Casa Clima',
    logo: '/api/media/file/casa-clima.png',
    mainStat: 'Gold',
    statLabel: 'Classe certificazione',
    description: 'La certificazione italiana per edifici sostenibili, salubri e ad alta efficienza.',
    details: [
      'Classi da Gold ad A (migliori prestazioni)',
      'Valutazione dell\'intero ciclo di vita',
      'Comfort abitativo certificato',
      'Riduzione emissioni CO2',
      'Qualità dell\'aria interna garantita',
    ],
    link: 'https://www.agenziacasaclima.it/',
    accent: '#6B8F71',
    icon: Leaf,
    accentColorStyle: { color: '#6B8F71' } as const,
    accentBgStyle: { backgroundColor: '#6B8F7115' } as const,
  },
  {
    id: 'arca',
    name: 'ARCA',
    logo: '/api/media/file/arca.png',
    mainStat: '100%',
    statLabel: 'Tracciabilità materiali',
    description: 'Architettura Comfort Ambiente - Lo standard italiano specifico per le costruzioni in legno.',
    details: [
      'Controllo qualità in produzione',
      'Tracciabilità dei materiali',
      'Prestazioni strutturali certificate',
      'Durabilità garantita',
      'Sostenibilità ambientale verificata',
    ],
    link: 'https://www.arcacert.com/',
    accent: '#48484A',
    icon: Shield,
    accentColorStyle: { color: '#48484A' } as const,
    accentBgStyle: { backgroundColor: '#48484A15' } as const,
  },
  {
    id: 'a4',
    name: 'Classe A4',
    logo: null,
    mainStat: 'NZEB',
    statLabel: 'Nearly Zero Energy',
    description: 'La massima classe energetica prevista dalla normativa italiana (NZEB - Nearly Zero Energy Building).',
    details: [
      'Consumo quasi zero',
      'Produzione energia da fonti rinnovabili',
      'Isolamento termico superiore',
      'Impianti ad alta efficienza',
      'Comfort termico tutto l\'anno',
    ],
    link: null,
    accent: '#C9A86C',
    icon: Zap,
    accentColorStyle: { color: '#C9A86C' } as const,
    accentBgStyle: { backgroundColor: '#C9A86C15' } as const,
  },
  {
    id: 'leed',
    name: 'LEED for Homes',
    logo: null,
    mainStat: 'Platinum',
    statLabel: 'Livello certificazione',
    description: 'Il sistema di certificazione internazionale per la sostenibilit\u00E0 degli edifici residenziali, sviluppato dal U.S. Green Building Council.',
    details: [
      'Efficienza energetica certificata',
      'Qualit\u00E0 ambientale interna',
      'Materiali sostenibili e riciclabili',
      'Gestione idrica avanzata',
      'Innovazione nel design',
    ],
    link: 'https://www.usgbc.org/leed',
    accent: '#4CAF50',
    icon: Award,
    accentColorStyle: { color: '#4CAF50' } as const,
    accentBgStyle: { backgroundColor: '#4CAF5015' } as const,
  },
  {
    id: 'phius',
    name: 'PHIUS',
    logo: null,
    mainStat: 'Passive',
    statLabel: 'Building Standard',
    description: 'Standard americano per edifici passivi ad altissima efficienza energetica, basato sui principi del Passive House Institute tedesco.',
    details: [
      'Performance-based certification',
      'Comfort metrics garantiti',
      'Cost-effective energy targets',
      'Tenuta all\'aria superiore',
      'Recupero energetico avanzato',
    ],
    link: 'https://www.phius.org/',
    accent: '#1565C0',
    icon: Globe,
    accentColorStyle: { color: '#1565C0' } as const,
    accentBgStyle: { backgroundColor: '#1565C015' } as const,
  },
]

const seismicFeatures = [
  {
    icon: Scale,
    title: 'Calcoli strutturali',
    description: 'Progettazione sismica avanzata secondo NTC 2018',
  },
  {
    icon: BadgeCheck,
    title: 'Materiali certificati',
    description: 'Legno lamellare con marcatura CE e certificazione di prodotto',
  },
  {
    icon: Building2,
    title: 'Collegamenti antisismici',
    description: 'Connessioni metalliche certificate per dissipazione energia',
  },
  {
    icon: Shield,
    title: 'Collaudo statico',
    description: 'Verifica e certificazione da parte di strutturista abilitato',
  },
]

const documents = [
  {
    title: 'Brochure Ecolive 2025',
    description: 'Catalogo completo prodotti e servizi',
    url: 'https://storage.fodivps2.cloud/ecolive-media/documenti/Brochure-2025.pdf',
    size: '8.4 MB',
    type: 'PDF',
  },
]

const normativeCategories = [
  {
    id: 'strutturale',
    icon: Scale,
    title: 'Normativa Strutturale',
    items: [
      'NTC 2018 - Norme Tecniche per le Costruzioni',
      'Circolare n. 7/2019 - Istruzioni applicative',
      'Eurocodice 5 - Progettazione strutture in legno',
      'Eurocodice 8 - Progettazione antisismica',
    ],
  },
  {
    id: 'energetica',
    icon: Zap,
    title: 'Normativa Energetica',
    items: [
      'D.Lgs. 192/2005 e s.m.i. - Efficienza energetica',
      'DM 26/06/2015 - Requisiti minimi',
      'UNI EN ISO 13790 - Calcolo fabbisogno energetico',
      'UNI TS 11300 - Prestazioni energetiche edifici',
    ],
  },
  {
    id: 'antincendio',
    icon: Flame,
    title: 'Normativa Antincendio',
    items: [
      'DM 03/08/2015 - Codice di prevenzione incendi',
      'DM 14/01/2008 - Reazione al fuoco materiali',
      'EN 13501-1 - Classificazione al fuoco',
      'EN 1995-1-2 - Eurocodice 5 (fuoco)',
    ],
  },
  {
    id: 'acustica',
    icon: Volume2,
    title: 'Normativa Acustica',
    items: [
      'DPCM 05/12/1997 - Requisiti acustici passivi',
      'UNI 11367 - Classificazione acustica',
      'EN ISO 140 - Misurazione isolamento',
      'EN ISO 717 - Valutazione isolamento',
    ],
  },
]

const marqueeItems = [
  'Passive House',
  'Casa Clima Gold',
  'ARCA',
  'Classe A4 NZEB',
  'LEED for Homes',
  'PHIUS Certified',
  'Zona Sismica 1',
  'REI 60',
  'NTC 2018',
  'PEFC Certified',
]

const tabFadeInitial = { opacity: 0, y: 10 }
const tabFadeAnimate = { opacity: 1, y: 0 }
const tabFadeExit = { opacity: 0, y: -10 }
const tabFadeTransition = { duration: 0.3 }

const heroStatWhiteStyle = { color: 'white' }
const heroStatAccentStyle = { color: '#A0845C' }

const heroStats = [
  { value: 6, label: 'Certificazioni', numValue: true, style: heroStatWhiteStyle },
  { value: 15, label: 'kWh/m\u00b2/anno', numValue: true, style: heroStatAccentStyle },
  { value: 1, label: 'Zona Sismica', numValue: true, style: heroStatWhiteStyle },
  { value: null, label: 'Classe NZEB', numValue: false, display: 'A4', style: heroStatWhiteStyle },
]

const seismicStats = [
  { value: 1, label: 'Zona Sismica' },
  { value: 2018, label: 'NTC Standard' },
  { value: 25, label: 'Anni Garanzia', suffix: '+' },
]

function CertTabButton({ cert, isActive, onClick }: {
  cert: typeof certifications[number]
  isActive: boolean
  onClick: (id: string) => void
}) {
  const Icon = cert.icon
  const handleClick = useCallback(() => onClick(cert.id), [onClick, cert.id])
  return (
    <button
      key={cert.id}
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${
        isActive
          ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/25'
          : 'text-[var(--color-muted)] hover:text-[var(--color-secondary-dark)] hover:bg-white'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="hidden sm:inline">{cert.name}</span>
    </button>
  )
}

function NormTabButton({ cat, isActive, onClick }: {
  cat: typeof normativeCategories[number]
  isActive: boolean
  onClick: (id: string) => void
}) {
  const Icon = cat.icon
  const handleClick = useCallback(() => onClick(cat.id), [onClick, cat.id])
  return (
    <button
      key={cat.id}
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${
        isActive
          ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/25'
          : 'text-white/60 hover:text-white hover:bg-white/10'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="hidden sm:inline">{cat.title.replace('Normativa ', '')}</span>
    </button>
  )
}

export default function CertificazioniPage() {
  const [activeCert, setActiveCert] = useState<string>('passive')
  const [activeNorm, setActiveNorm] = useState<string>('strutturale')

  const activeCertData = certifications.find(c => c.id === activeCert)!
  const activeNormData = normativeCategories.find(n => n.id === activeNorm)!

  return (
    <div className="min-h-screen bg-[var(--color-background)]">

      {/* ===== HERO ===== */}
      <section className="relative bg-gradient-to-br from-[var(--color-secondary-dark)] via-[var(--color-secondary)] to-[var(--color-secondary-dark)] py-28 lg:py-40">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03]" />
        <div className="relative max-w-6xl mx-auto px-4">
          <ScrollReveal direction="left">
            <Link
              href="/area-tecnica"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Area Tecnica</span>
            </Link>
          </ScrollReveal>

          <BlurText
            text="Le Nostre Certificazioni"
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8"
            delay={80}
            animateBy="words"
          />

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-white/70 max-w-2xl mb-14">
              Standard internazionali che garantiscono qualità, efficienza e sostenibilità delle nostre costruzioni.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-wrap gap-8 md:gap-12">
              {heroStats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold" style={stat.style}>
                    {stat.numValue && stat.value !== null ? (
                      <CountUp to={stat.value} duration={2} delay={0.3 + i * 0.15} />
                    ) : (
                      stat.display
                    )}
                  </div>
                  <div className="text-sm text-white/60 mt-1">{stat.label}</div>
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

      {/* ===== PANORAMICA CERTIFICAZIONI ===== */}
      <section className="py-28 lg:py-36 px-4 bg-[var(--color-surface)]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-secondary-dark)]">I Nostri Standard</h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
            {certifications.map((cert, i) => {
              const Icon = cert.icon
              return (
                <ScrollReveal key={cert.id} delay={i * 0.1}>
                  <SpotlightCard className="bg-white border border-[#EDE6DB] h-full">
                    <div className="p-6 text-center">
                      {cert.logo ? (
                        <div className="w-16 h-16 bg-white rounded-xl p-2 flex items-center justify-center shadow-sm border border-[#EDE6DB] mx-auto mb-4">
                          <Image src={cert.logo} alt={cert.name} width={48} height={48} className="object-contain" />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4" style={cert.accentBgStyle}>
                          <Icon className="w-8 h-8" style={cert.accentColorStyle} />
                        </div>
                      )}
                      <h3 className="font-bold text-[var(--color-secondary-dark)] mb-1">{cert.name}</h3>
                      <div className="text-2xl font-bold mt-3" style={cert.accentColorStyle}>{cert.mainStat}</div>
                      <div className="text-[var(--color-muted)] text-xs mt-1">{cert.statLabel}</div>
                    </div>
                  </SpotlightCard>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      <SectionTransition from="#F5F5F7" to="#FFFFFF" height={80} />

      {/* ===== DETTAGLIO CERTIFICAZIONI (Tabs) ===== */}
      <section className="py-28 lg:py-36 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-secondary-dark)]">Dettaglio Certificazioni</h2>
            </div>
          </ScrollReveal>

          {/* Tab Buttons */}
          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              <div className="inline-flex bg-[var(--color-surface)] rounded-2xl p-2 gap-2 border border-[#EDE6DB]">
                {certifications.map((cert) => (
                  <CertTabButton
                    key={cert.id}
                    cert={cert}
                    isActive={activeCert === cert.id}
                    onClick={setActiveCert}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCert}
              initial={tabFadeInitial}
              animate={tabFadeAnimate}
              exit={tabFadeExit}
              transition={tabFadeTransition}
              className="grid md:grid-cols-2 gap-8 items-start"
            >
              {/* Left - Info Card */}
              <SpotlightCard className="bg-[var(--color-surface)] border border-[#EDE6DB]">
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    {activeCertData.logo ? (
                      <div className="w-20 h-20 bg-white rounded-2xl p-3 flex items-center justify-center shadow-sm border border-[#EDE6DB]">
                        <Image src={activeCertData.logo} alt={activeCertData.name} width={56} height={56} className="object-contain" />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={activeCertData.accentBgStyle}>
                        <activeCertData.icon className="w-10 h-10" style={activeCertData.accentColorStyle} />
                      </div>
                    )}
                    <div>
                      <h3 className="text-2xl font-bold text-[var(--color-secondary-dark)]">{activeCertData.name}</h3>
                      {activeCertData.link && (
                        <a href={activeCertData.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-[var(--color-primary)] hover:underline mt-1">
                          <span>Sito ufficiale</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-[#EDE6DB] mb-6">
                    <span className="text-4xl font-bold" style={activeCertData.accentColorStyle}>{activeCertData.mainStat}</span>
                    <p className="text-[var(--color-muted)] mt-1">{activeCertData.statLabel}</p>
                  </div>

                  <p className="text-[var(--color-muted)] leading-relaxed">{activeCertData.description}</p>
                </div>
              </SpotlightCard>

              {/* Right - Details */}
              <SpotlightCard className="bg-white border border-[#EDE6DB]">
                <div className="p-8">
                  <h4 className="font-bold text-[var(--color-secondary-dark)] mb-6 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[var(--color-primary)]" />
                    Caratteristiche Principali
                  </h4>
                  <ul className="space-y-4">
                    {activeCertData.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-[var(--color-surface)] transition-colors">
                        <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={activeCertData.accentColorStyle} />
                        <span className="text-[#4A4540]">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <SectionTransition from="#FFFFFF" to="#1D1D1F" height={80} />

      {/* ===== SICUREZZA SISMICA ===== */}
      <section className="py-28 lg:py-36 px-4 bg-[var(--color-secondary-dark)]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="w-16 h-16 bg-[var(--color-primary)]/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-[var(--color-primary)]" />
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Sicurezza Sismica - Zona 1</h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Le strutture X-Frame sono certificate per la zona sismica più restrittiva d&apos;Italia.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16">
              {seismicStats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-[var(--color-primary)]">
                    <CountUp to={stat.value} duration={2} delay={0.2 + i * 0.15} suffix={stat.suffix || ''} />
                  </div>
                  <div className="text-white/60 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {seismicFeatures.map((feature, i) => {
              const Icon = feature.icon
              return (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <GlassCard intensity="medium" className="p-6 h-full">
                    <div className="w-12 h-12 bg-[var(--color-primary)]/20 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[var(--color-primary)]" />
                    </div>
                    <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-white/60 text-sm">{feature.description}</p>
                  </GlassCard>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      <SectionTransition from="#1D1D1F" to="#F5F5F7" height={80} />

      {/* ===== DOCUMENTAZIONE ===== */}
      <section className="py-28 lg:py-36 px-4 bg-[var(--color-surface)]">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="w-16 h-16 bg-[var(--color-primary)]/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-[var(--color-primary)]" />
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-secondary-dark)] mb-4">Documentazione</h2>
              <p className="text-[var(--color-muted)] text-lg">Scarica la documentazione tecnica e commerciale</p>
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {documents.map((doc, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-6 p-6 bg-white rounded-2xl border border-[#EDE6DB] hover:border-[var(--color-primary)]/30 hover:shadow-premium-lg transition-all"
                >
                  <div className="w-14 h-14 bg-[var(--color-primary)]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-primary)] transition-colors">
                    <Download className="w-7 h-7 text-[var(--color-primary)] group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-[var(--color-secondary-dark)] text-lg group-hover:text-[var(--color-primary)] transition-colors">{doc.title}</h3>
                      <span className="px-2 py-0.5 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-semibold rounded">{doc.type}</span>
                    </div>
                    <p className="text-[var(--color-muted)]">{doc.description}</p>
                  </div>
                  <span className="text-[var(--color-muted)] text-sm">{doc.size}</span>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionTransition from="#F5F5F7" to="#1D1D1F" height={80} />

      {/* ===== NORMATIVE ===== */}
      <section className="py-28 lg:py-36 px-4 bg-[var(--color-secondary-dark)]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">Normative di Riferimento</h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              <div className="inline-flex bg-white/5 rounded-2xl p-2 gap-2 border border-white/10">
                {normativeCategories.map((cat) => (
                  <NormTabButton
                    key={cat.id}
                    cat={cat}
                    isActive={activeNorm === cat.id}
                    onClick={setActiveNorm}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeNorm}
              initial={tabFadeInitial}
              animate={tabFadeAnimate}
              exit={tabFadeExit}
              transition={tabFadeTransition}
              className="max-w-2xl mx-auto"
            >
              <GlassCard intensity="medium" className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[var(--color-primary)]/20 rounded-xl flex items-center justify-center">
                    <activeNormData.icon className="w-6 h-6 text-[var(--color-primary)]" />
                  </div>
                  <h3 className="text-white font-bold text-xl">{activeNormData.title}</h3>
                </div>
                <ul className="space-y-3">
                  {activeNormData.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                      <CheckCircle className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <SectionTransition from="#1D1D1F" to="#A0845C" height={80} />

      {/* ===== CTA ===== */}
      <section className="py-28 lg:py-36 px-4 bg-[var(--color-primary)]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
                  Vuoi saperne di più?
                </h2>
                <p className="text-white/80 text-lg mb-10">
                  Il nostro team tecnico è a disposizione per fornirti tutte le informazioni
                  sulle certificazioni e le normative.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button href="/contatti" variant="secondary" size="lg">
                    Contatta il Team
                  </Button>
                  <Button href="/area-tecnica" variant="ghost" size="lg" className="!text-white hover:!bg-white/10">
                    Torna all&apos;Area Tecnica
                  </Button>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-6">Contatti Rapidi</h3>
                <div className="space-y-4">
                  <a href="tel:+3909631951395" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <span>+39 0963 1951395</span>
                  </a>
                  <a href="mailto:info@ecolive.srl" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span>info@ecolive.srl</span>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
