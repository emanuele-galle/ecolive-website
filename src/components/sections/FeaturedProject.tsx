'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { ArrowRight, MapPin, Ruler, Calendar, Building2 } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import CountUp from '@/components/ui/CountUp'

interface FeaturedProjectProps {
  project?: {
    title: string
    slug?: string
    location?: string
    surface?: string
    year?: string
    type?: string
    imageUrl: string
    description?: string
  }
}

const realProjects = [
  {
    title: 'Villa Bifamiliare Girifalco',
    location: 'Girifalco (CZ), Calabria',
    surface: '180 m²',
    year: '2024',
    type: 'Residenziale',
    imageUrl: '/images/luxury/gallery-1.webp',
    description:
      'Bifamiliare su due livelli con sistema X-Frame. Design contemporaneo e finiture premium.',
  },
  {
    title: 'Casa Lamezia',
    location: 'Lamezia Terme (CZ), Calabria',
    surface: '120 m²',
    year: '2024',
    type: 'Residenziale',
    imageUrl: '/images/luxury/gallery-5.webp',
    description:
      'Abitazione unifamiliare con ampi spazi living e giardino. Classe energetica A4.',
  },
  {
    title: 'Villa Polistena',
    location: 'Polistena (RC), Calabria',
    surface: '220 m²',
    year: '2023',
    type: 'Luxury',
    imageUrl: '/images/luxury/gallery-10.webp',
    description:
      'Villa di pregio con piscina e area wellness. Finiture artigianali e domotica integrata.',
  },
  {
    title: 'Villa Squillace',
    location: 'Squillace (CZ), Calabria',
    surface: '160 m²',
    year: '2024',
    type: 'Residenziale',
    imageUrl: '/images/luxury/gallery-15.webp',
    description:
      'Casa con vista mare su terreno collinare. Orientamento ottimizzato per il solare.',
  },
  {
    title: 'Casa Limbadi',
    location: 'Limbadi (VV), Calabria',
    surface: '95 m²',
    year: '2023',
    type: 'Residenziale',
    imageUrl: '/images/luxury/gallery-20.webp',
    description:
      'Abitazione compatta ed efficiente. Rapporto qualità-prezzo ottimale.',
  },
]

const stats = [
  { value: 5, suffix: '+', label: 'Progetti Completati' },
  { value: 1500, suffix: '+', label: 'm² Costruiti', separator: '.' },
  { value: 100, suffix: '%', label: 'In Calabria' },
  { value: 7, suffix: '', label: 'Giorni per la Struttura' },
]

// Extracted style/config constants to avoid react-perf inline object warnings
const grainStyle = {
  backgroundImage: 'url(/images/noise.png)',
  backgroundSize: '200px',
} as const

const featuredInitial = { opacity: 0, y: 40 }
const featuredAnimate = { opacity: 1, y: 0 }
const featuredViewport = { once: true, margin: '-100px' as const }
const featuredTransition = {
  duration: 1,
  ease: [0.25, 0.1, 0.25, 1] as const,
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof realProjects)[number]
  index: number
}) {
  return (
    <ScrollReveal delay={0.1 * index} className="group">
      <div className="relative overflow-hidden rounded-2xl bg-[#2A2A2C]">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
          {/* Grain */}
          <div
            className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
            style={grainStyle}
          />
          {/* Type badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#A0845C] bg-black/40 backdrop-blur-md rounded-full border border-[#A0845C]/20">
              <Building2 className="w-3 h-3" />
              {project.type}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h4 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-[#A0845C] transition-colors duration-300">
            {project.title}
          </h4>

          {/* Meta badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="inline-flex items-center gap-1 text-[11px] text-white/50 font-medium">
              <MapPin className="w-3 h-3 text-[#A0845C]/60" />
              {project.location}
            </span>
          </div>
          <div className="flex gap-3 mb-3">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] text-white/60 bg-white/5 rounded-md">
              <Ruler className="w-3 h-3 text-[#A0845C]/50" />
              {project.surface}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] text-white/60 bg-white/5 rounded-md">
              <Calendar className="w-3 h-3 text-[#A0845C]/50" />
              {project.year}
            </span>
          </div>

          <p className="text-sm text-white/40 leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Bottom gold accent on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#A0845C] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </ScrollReveal>
  )
}

export default function FeaturedProject({ project }: FeaturedProjectProps) {
  const featured = project || realProjects[0]
  const gridProjects = realProjects.slice(1)

  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.15, 1])

  return (
    <section
      ref={sectionRef}
      className="relative py-32 lg:py-40 bg-[#1D1D1F] overflow-hidden"
    >
      {/* Background grain */}
      <div
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
        style={grainStyle}
      />

      {/* ── Header ── */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 max-w-[60px] bg-[#A0845C]/60" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A0845C]">
              Portfolio
            </span>
          </div>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <ScrollReveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              Progetti{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A0845C] to-[#C9A96E]">
                Realizzati
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="lg:max-w-md">
            <p className="text-white/50 text-lg leading-relaxed">
              Ogni progetto racconta una storia di innovazione e qualità. Case
              costruite in Calabria con il sistema X-Frame, dalla progettazione
              alla consegna chiavi in mano.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* ── Featured (large) Project ── */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <motion.div
          className="relative rounded-3xl overflow-hidden group cursor-pointer"
          initial={featuredInitial}
          whileInView={featuredAnimate}
          viewport={featuredViewport}
          transition={featuredTransition}
        >
          <div className="block">
            {/* Parallax image container */}
            <div className="relative aspect-[16/7] md:aspect-[21/8] overflow-hidden">
              <motion.div
                className="absolute inset-0"
                style={{ y: imageY, scale: imageScale }}
              >
                <Image
                  src={featured.imageUrl}
                  alt={featured.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
              </motion.div>

              {/* Cinematic overlay layers */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

              {/* Grain texture */}
              <div
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
                style={grainStyle}
              />
            </div>

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14 lg:p-16">
              {/* "Progetto in evidenza" label */}
              <div className="mb-5">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#A0845C] bg-[#A0845C]/10 backdrop-blur-sm rounded-full border border-[#A0845C]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A0845C] animate-pulse" />
                  Progetto in evidenza
                </span>
              </div>

              {/* Meta badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                {featured.location && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white/80 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
                    <MapPin className="w-3 h-3" /> {featured.location}
                  </span>
                )}
                {featured.surface && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white/80 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
                    <Ruler className="w-3 h-3" /> {featured.surface}
                  </span>
                )}
                {featured.year && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white/80 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
                    <Calendar className="w-3 h-3" /> {featured.year}
                  </span>
                )}
                {'type' in featured && featured.type && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#A0845C]/90 bg-[#A0845C]/10 backdrop-blur-sm rounded-full border border-[#A0845C]/20">
                    <Building2 className="w-3 h-3" /> {featured.type}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight">
                {featured.title}
              </h3>
              {featured.description && (
                <p className="text-white/60 max-w-2xl text-lg leading-relaxed mb-8">
                  {featured.description}
                </p>
              )}

              {/* Animated discover line */}
              <span className="inline-flex items-center gap-3 text-[#A0845C] font-medium text-sm uppercase tracking-wider group-hover:gap-4 transition-all duration-500">
                Scopri il progetto
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
                <span className="h-px w-12 bg-[#A0845C]/50 group-hover:w-20 transition-all duration-500" />
              </span>
            </div>

            {/* Gold accent line on left */}
            <div className="absolute top-12 bottom-12 left-0 w-[3px] bg-gradient-to-b from-transparent via-[#A0845C] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
        </motion.div>
      </div>

      {/* ── Grid of 4 smaller projects ── */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {gridProjects.map((proj, i) => (
            <ProjectCard key={proj.title} project={proj} index={i} />
          ))}
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <ScrollReveal>
          <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden">
            {/* Subtle gold gradient accent at top */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#A0845C]/40 to-transparent" />

            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/[0.06]">
              {stats.map((stat, i) => (
                <ScrollReveal
                  key={stat.label}
                  delay={0.15 * i}
                  className="p-8 lg:p-10 text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    <CountUp
                      to={stat.value}
                      suffix={stat.suffix}
                      separator={stat.separator || ''}
                      duration={2.5}
                      delay={0.3 + 0.1 * i}
                    />
                  </div>
                  <p className="text-sm text-white/40 font-medium uppercase tracking-wider">
                    {stat.label}
                  </p>
                </ScrollReveal>
              ))}
            </div>

            {/* Bottom accent */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#A0845C]/20 to-transparent" />
          </div>
        </ScrollReveal>
      </div>

      {/* ── CTA ── */}
      <ScrollReveal className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-white/30 text-sm">
            Ogni progetto è personalizzabile. Scegli la tipologia e rendiamo
            reale la tua visione.
          </p>
          <Link
            href="/tipologie"
            className="inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-[#1D1D1F] bg-gradient-to-r from-[#A0845C] to-[#C9A96E] rounded-full hover:shadow-lg hover:shadow-[#A0845C]/20 transition-all duration-500 group"
          >
            Scopri tutte le tipologie
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
          </Link>
        </div>
      </ScrollReveal>
    </section>
  )
}
