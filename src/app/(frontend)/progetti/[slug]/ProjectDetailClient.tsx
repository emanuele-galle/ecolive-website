'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import type { Project, Media } from '@/payload-types'
import RichTextRenderer from '@/components/RichTextRenderer'
import ImageGallery from '@/components/ImageGallery'
import {
  MapPin,
  Calendar,
  Maximize2,
  Layers,
  ChevronRight,
  Home,
  CheckCircle2,
  Award,
  ArrowRight,
  Play,
} from 'lucide-react'

interface ProjectDetailClientProps {
  project: Project
  relatedProjects: Project[]
}

const categoryLabels: Record<string, string> = {
  residenziale: 'Residenziale',
  bungalow: 'Bungalow',
  commerciale: 'Commerciale',
  ristrutturazione: 'Ristrutturazione',
}

const certificationLabels: Record<string, string> = {
  'passive-house': 'Passive House',
  'casa-clima': 'Casa Clima',
  'arca': 'ARCA',
  'classe-a-plus': 'Classe A+',
}

function extractYouTubeId(url: string): string | null {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  const match = url.match(regex)
  return match ? match[1] : null
}

export default function ProjectDetailClient({
  project,
  relatedProjects,
}: ProjectDetailClientProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const featuredImage = project.featuredImage as Media
  const youtubeId = project.videoUrl ? extractYouTubeId(project.videoUrl) : null

  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3])

  return (
    <main className="min-h-screen bg-[#FAF7F2]">
      {/* HERO IMMERSIVO CON PARALLAX */}
      <section ref={heroRef} className="relative h-[70vh] md:h-[85vh] overflow-hidden">
        {/* Background Image with Parallax */}
        {featuredImage?.url && (
          <motion.div
            style={{ y: heroY }}
            className="absolute inset-0 w-full h-[120%]"
          >
            <Image
              src={featuredImage.url}
              alt={featuredImage.alt || project.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        )}

        {/* Multi-layer gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E3D30]/40 to-transparent" />

        {/* Dot pattern overlay */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute inset-0 opacity-5"
          style-={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
        />

        {/* Category Badge - Top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="absolute top-8 left-8 z-10"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/95 backdrop-blur-sm rounded-full text-[#1E3D30] font-semibold shadow-lg">
            <Home className="w-4 h-4 text-[#C4704B]" />
            {categoryLabels[project.category]}
          </span>
        </motion.div>

        {/* Content Overlay - Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-7xl mx-auto">
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 max-w-4xl"
            >
              {project.title}
            </motion.h1>

            {/* Info Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              {project.location && (
                <div className="flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-sm rounded-xl text-white border border-white/20">
                  <MapPin className="w-5 h-5 text-[#C4704B]" />
                  <span className="font-medium">{project.location}</span>
                </div>
              )}
              {project.year && (
                <div className="flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-sm rounded-xl text-white border border-white/20">
                  <Calendar className="w-5 h-5 text-[#C4704B]" />
                  <span className="font-medium">{project.year}</span>
                </div>
              )}
              {project.area && (
                <div className="flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-sm rounded-xl text-white border border-white/20">
                  <Maximize2 className="w-5 h-5 text-[#C4704B]" />
                  <span className="font-medium">{project.area} mq</span>
                </div>
              )}
              {project.floors && (
                <div className="flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-sm rounded-xl text-white border border-white/20">
                  <Layers className="w-5 h-5 text-[#C4704B]" />
                  <span className="font-medium">{project.floors} {project.floors === 1 ? 'Piano' : 'Piani'}</span>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* BREADCRUMB DECORATIVO */}
      <section className="bg-white border-b border-[#1E3D30]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="text-[#1E3D30]/60 hover:text-[#C4704B] transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-[#1E3D30]/30" />
            <Link
              href="/progetti"
              className="text-[#1E3D30]/60 hover:text-[#C4704B] transition-colors"
            >
              Progetti
            </Link>
            <ChevronRight className="w-4 h-4 text-[#1E3D30]/30" />
            <span className="text-[#1E3D30] font-medium">{project.title}</span>
          </nav>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content - 2 cols */}
          <div className="lg:col-span-2 space-y-12">
            {/* INFO BOX PREMIUM */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {project.location && (
                <div className="p-5 bg-gradient-to-br from-white to-[#FAF7F2] rounded-2xl border border-[#1E3D30]/10 shadow-sm">
                  <MapPin className="w-8 h-8 text-[#C4704B] mb-3" />
                  <div className="text-sm text-[#1E3D30]/60 mb-1">Località</div>
                  <div className="text-lg font-bold text-[#1E3D30]">{project.location}</div>
                </div>
              )}
              {project.year && (
                <div className="p-5 bg-gradient-to-br from-white to-[#FAF7F2] rounded-2xl border border-[#1E3D30]/10 shadow-sm">
                  <Calendar className="w-8 h-8 text-[#C4704B] mb-3" />
                  <div className="text-sm text-[#1E3D30]/60 mb-1">Anno</div>
                  <div className="text-lg font-bold text-[#1E3D30]">{project.year}</div>
                </div>
              )}
              {project.area && (
                <div className="p-5 bg-gradient-to-br from-white to-[#FAF7F2] rounded-2xl border border-[#1E3D30]/10 shadow-sm">
                  <Maximize2 className="w-8 h-8 text-[#C4704B] mb-3" />
                  <div className="text-sm text-[#1E3D30]/60 mb-1">Superficie</div>
                  <div className="text-lg font-bold text-[#1E3D30]">{project.area} mq</div>
                </div>
              )}
              {project.floors && (
                <div className="p-5 bg-gradient-to-br from-white to-[#FAF7F2] rounded-2xl border border-[#1E3D30]/10 shadow-sm">
                  <Layers className="w-8 h-8 text-[#C4704B] mb-3" />
                  <div className="text-sm text-[#1E3D30]/60 mb-1">Piani</div>
                  <div className="text-lg font-bold text-[#1E3D30]">{project.floors}</div>
                </div>
              )}
            </motion.div>

            {/* DESCRIPTION */}
            {project.description && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-[#C4704B] to-[#1E3D30] rounded-full" />
                  <h2 className="text-2xl md:text-3xl font-bold text-[#1E3D30]">
                    Descrizione
                  </h2>
                </div>
                <div className="prose prose-lg max-w-none text-[#1E3D30]/80">
                  <RichTextRenderer data={project.description} />
                </div>
              </motion.div>
            )}

            {/* GALLERY */}
            {project.gallery && project.gallery.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-[#C4704B] to-[#1E3D30] rounded-full" />
                  <h2 className="text-2xl md:text-3xl font-bold text-[#1E3D30]">
                    Galleria
                  </h2>
                </div>
                <ImageGallery
                  images={project.gallery.map((item) => {
                    const img = item.image as Media
                    return {
                      url: img.url || '',
                      alt: img.alt || project.title,
                    }
                  })}
                />
              </motion.div>
            )}

            {/* VIDEO */}
            {youtubeId && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-[#C4704B] to-[#1E3D30] rounded-full" />
                  <h2 className="text-2xl md:text-3xl font-bold text-[#1E3D30]">
                    Video
                  </h2>
                </div>
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    title={`Video ${project.title}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* SIDEBAR PREMIUM */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8 space-y-6">
              {/* Features */}
              {project.features && project.features.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  className="p-6 bg-white rounded-2xl shadow-lg border border-[#1E3D30]/10"
                >
                  <h3 className="text-xl font-bold text-[#1E3D30] mb-5 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#C4704B]" />
                    Caratteristiche
                  </h3>
                  <ul className="space-y-3">
                    {project.features.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[#C4704B]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle2 className="w-4 h-4 text-[#C4704B]" />
                        </div>
                        <span className="text-[#1E3D30]/80">{item.feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Certifications */}
              {project.certifications && project.certifications.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.1 }}
                  className="p-6 bg-white rounded-2xl shadow-lg border border-[#1E3D30]/10"
                >
                  <h3 className="text-xl font-bold text-[#1E3D30] mb-5 flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#C4704B]" />
                    Certificazioni
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.certifications.map((cert, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-[#1E3D30] to-[#2D5A47] text-white text-sm font-medium rounded-full"
                      >
                        {certificationLabels[cert]}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* CTA Premium */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.2 }}
                className="relative p-6 rounded-2xl overflow-hidden"
              >
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1E3D30] to-[#0F1F18]" />

                {/* Dot pattern */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '20px 20px'
                  }}
                />

                {/* Glow */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#C4704B]/30 rounded-full blur-2xl" />

                <div className="relative">
                  <h3 className="text-xl font-bold text-white mb-3">
                    Ti piace questo progetto?
                  </h3>
                  <p className="text-white/70 mb-6 text-sm">
                    Contattaci per ricevere maggiori informazioni e un preventivo personalizzato per la tua nuova casa.
                  </p>
                  <Link
                    href="/contatti"
                    className="group flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-[#C4704B] to-[#D4805B] text-white font-bold rounded-xl shadow-lg shadow-[#C4704B]/30 hover:shadow-xl transition-all duration-300"
                  >
                    Richiedi informazioni
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED PROJECTS */}
      {relatedProjects.length > 0 && (
        <section className="relative py-20 overflow-hidden">
          {/* Dark background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1E3D30] to-[#0F1F18]" />

          {/* Dot pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }}
          />

          {/* Glow effects */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C4704B]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C4704B]/10 rounded-full blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm font-medium mb-4">
                Esplora altri progetti
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                Progetti <span className="text-[#C4704B]">Correlati</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedProjects.map((related, index) => {
                const relatedImage = related.featuredImage as Media
                return (
                  <motion.div
                    key={related.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={`/progetti/${related.slug}`}
                      className="group block bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-[#C4704B]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#C4704B]/10"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        {relatedImage?.url && (
                          <Image
                            src={relatedImage.url}
                            alt={relatedImage.alt || related.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-3 py-1 bg-[#C4704B]/20 text-[#C4704B] text-xs font-semibold rounded-full">
                            {categoryLabels[related.category]}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-white group-hover:text-[#C4704B] transition-colors mb-2">
                          {related.title}
                        </h3>
                        {related.location && (
                          <p className="text-white/60 text-sm flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            {related.location}
                          </p>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            {/* View all link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="text-center mt-12"
            >
              <Link
                href="/progetti"
                className="inline-flex items-center gap-2 text-white/80 hover:text-[#C4704B] font-medium transition-colors"
              >
                Vedi tutti i progetti
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>
      )}
    </main>
  )
}
