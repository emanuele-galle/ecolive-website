'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { ArrowRight, MapPin, Ruler, Calendar } from 'lucide-react'

interface FeaturedProjectProps {
  project?: {
    title: string
    slug: string
    location?: string
    surface?: string
    year?: string
    imageUrl: string
    description?: string
  }
}

const defaultProject = {
  title: 'Villa Residenziale',
  slug: 'villa-residenziale',
  location: 'Calabria',
  surface: '150 m²',
  year: '2025',
  imageUrl: '/images/tipologie/residenziali.webp',
  description: 'Casa unifamiliare realizzata con sistema X-Frame. Struttura montata in 1 giornata, grezzo avanzato completato in 7 giorni.',
}

export default function FeaturedProject({ project }: FeaturedProjectProps) {
  const p = project || defaultProject
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.15, 1])

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-40 bg-white overflow-hidden">
      {/* Section label */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="h-px flex-1 max-w-[60px] bg-[#A0845C]" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A0845C]">
            Progetti Realizzati
          </span>
        </motion.div>
      </div>

      {/* Cinematic project showcase */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="relative rounded-3xl overflow-hidden group cursor-pointer"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          <Link href={`/progetti/${p.slug}`} className="block">
            {/* Parallax image container */}
            <div className="relative aspect-[16/7] md:aspect-[21/8] overflow-hidden">
              <motion.div
                className="absolute inset-0"
                style={{ y: imageY, scale: imageScale }}
              >
                <Image
                  src={p.imageUrl}
                  alt={p.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </motion.div>

              {/* Cinematic overlay layers */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

              {/* Grain texture */}
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
                style={{ backgroundImage: 'url(/images/noise.png)', backgroundSize: '200px' }} />
            </div>

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14 lg:p-16">
              {/* Meta badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                {p.location && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white/80 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
                    <MapPin className="w-3 h-3" /> {p.location}
                  </span>
                )}
                {p.surface && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white/80 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
                    <Ruler className="w-3 h-3" /> {p.surface}
                  </span>
                )}
                {p.year && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white/80 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
                    <Calendar className="w-3 h-3" /> {p.year}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight">
                {p.title}
              </h3>
              {p.description && (
                <p className="text-white/60 max-w-2xl text-lg leading-relaxed mb-8">{p.description}</p>
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
          </Link>
        </motion.div>
      </div>

      {/* View all projects */}
      <motion.div
        className="max-w-7xl mx-auto px-6 mt-10 flex justify-end"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Link
          href="/progetti"
          className="inline-flex items-center gap-2 text-sm text-[#86868B] hover:text-[#A0845C] font-medium uppercase tracking-wider transition-colors duration-300 group"
        >
          Tutti i progetti
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </motion.div>
    </section>
  )
}
