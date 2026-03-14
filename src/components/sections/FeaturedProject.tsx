'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
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

const fadeInUp = { opacity: 0, y: 30 }
const visible = { opacity: 1, y: 0 }

export default function FeaturedProject({ project }: FeaturedProjectProps) {
  const p = project || defaultProject

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={fadeInUp}
          whileInView={visible}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold text-[#A0845C] uppercase tracking-[0.15em] mb-4">PROGETTI</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] tracking-tight">
            Le nostre realizzazioni
          </h2>
        </motion.div>

        <motion.div
          className="relative rounded-2xl overflow-hidden group"
          initial={fadeInUp}
          whileInView={visible}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative aspect-[21/9] md:aspect-[21/8]">
            <Image
              src={p.imageUrl}
              alt={p.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="flex flex-wrap gap-4 mb-4">
              {p.location && (
                <span className="inline-flex items-center gap-1.5 text-sm text-white/70">
                  <MapPin className="w-4 h-4" /> {p.location}
                </span>
              )}
              {p.surface && (
                <span className="inline-flex items-center gap-1.5 text-sm text-white/70">
                  <Ruler className="w-4 h-4" /> {p.surface}
                </span>
              )}
              {p.year && (
                <span className="inline-flex items-center gap-1.5 text-sm text-white/70">
                  <Calendar className="w-4 h-4" /> {p.year}
                </span>
              )}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{p.title}</h3>
            {p.description && (
              <p className="text-white/70 max-w-xl mb-6">{p.description}</p>
            )}
          </div>
        </motion.div>

        <motion.div
          className="text-center mt-10"
          initial={fadeInUp}
          whileInView={visible}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            href="/progetti"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#D2D2D7] text-[#1D1D1F] hover:bg-[#F5F5F7] rounded-xl font-medium transition-all duration-300 group"
          >
            Vedi tutti i Progetti
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
