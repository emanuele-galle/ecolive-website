'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Image from 'next/image'
import { ZoomIn, X, ChevronLeft, ChevronRight, Layers, Camera, Eye, Download } from 'lucide-react'
import { ImageZoom } from '@/components/ui/ZoomableImage'

interface RenderImage {
  src: string
  srcFull: string
  title: string
  description: string
  alt: string
  featured: boolean
  category: 'struttura' | 'tetto' | 'viste'
}

interface RenderShowcaseProps {
  images: RenderImage[]
}

const categoryConfig = {
  struttura: { label: 'Struttura', icon: Layers },
  tetto: { label: 'Copertura', icon: Camera },
  viste: { label: 'Viste Aeree', icon: Eye },
}

export default function RenderShowcase({ images }: RenderShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: '-100px' })

  const [activeCategory, setActiveCategory] = useState<'struttura' | 'tetto' | 'viste'>('struttura')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Filter images by category
  const filteredImages = images.filter(img => img.category === activeCategory)

  // Lightbox functions
  const openLightbox = (index: number) => {
    // Find global index of clicked image
    const clickedImage = filteredImages[index]
    const globalIndex = images.findIndex(img => img.src === clickedImage.src)
    setLightboxIndex(globalIndex)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = 'unset'
  }

  const nextLightboxImage = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length)
  }

  const prevLightboxImage = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const downloadImage = () => {
    const link = document.createElement('a')
    link.href = images[lightboxIndex].srcFull
    link.download = `xframe-render-${lightboxIndex + 1}.webp`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextLightboxImage()
      if (e.key === 'ArrowLeft') prevLightboxImage()
      if (e.key === ' ') {
        e.preventDefault()
        nextLightboxImage()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen])

  return (
    <>
      <section ref={containerRef} className="relative py-16 lg:py-24 bg-[#0a1628] overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="showcase-grid-small" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a3a5c" strokeWidth="0.5"/>
              </pattern>
              <pattern id="showcase-grid-large" width="100" height="100" patternUnits="userSpaceOnUse">
                <rect width="100" height="100" fill="url(#showcase-grid-small)"/>
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#1a3a5c" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#showcase-grid-large)"/>
          </svg>
        </div>

        {/* Glow effects */}
        <div className="absolute top-1/3 -left-20 w-96 h-96 bg-[#A0845C]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-[#4a9eff]/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9 }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#A0845C]/10 rounded-full border border-[#A0845C]/20 mb-6">
              <Camera className="w-4 h-4 text-[#A0845C]" />
              <span className="text-[#A0845C] text-sm font-medium tracking-wider uppercase">
                Visualizzazione Dettagliata
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Render <span className="text-[#A0845C]">Architettonici</span>
            </h2>

            <p className="text-[#6b8e9f] text-lg max-w-2xl mx-auto">
              Esplora ogni dettaglio del sistema X-Frame con i nostri render ad alta risoluzione.
            </p>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            className="flex justify-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex bg-[#0f2040]/80 rounded-2xl p-2 gap-2 backdrop-blur-sm border border-[#1a3a5c]">
              {(Object.keys(categoryConfig) as Array<keyof typeof categoryConfig>).map((cat) => {
                const Icon = categoryConfig[cat].icon
                const count = images.filter(img => img.category === cat).length
                return (
                  <motion.button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`
                      px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300
                      flex items-center gap-2
                      ${activeCategory === cat
                        ? 'bg-[#A0845C] text-white shadow-lg shadow-[#A0845C]/30'
                        : 'text-[#6b8e9f] hover:text-white hover:bg-[#1a3a5c]/50'}
                    `}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-4 h-4" />
                    {categoryConfig[cat].label}
                    <span className={`text-xs ${activeCategory === cat ? 'text-white/70' : 'text-[#6b8e9f]/60'}`}>
                      ({count})
                    </span>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>

          {/* Bento Grid Layout */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[minmax(200px,auto)]"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((img, index) => {
                // Featured image spans 2x2 grid on desktop
                const isFeatured = index === 0
                const gridClass = isFeatured
                  ? 'md:col-span-2 md:row-span-2'
                  : 'md:col-span-1 md:row-span-1'

                return (
                  <motion.div
                    key={img.src}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className={`relative overflow-hidden rounded-2xl cursor-pointer group ${gridClass}`}
                    onClick={() => openLightbox(index)}
                  >
                    {/* Glow effect on hover */}
                    <div className="absolute -inset-2 bg-[#A0845C]/0 group-hover:bg-[#A0845C]/20 rounded-3xl blur-2xl transition-all duration-500 -z-10" />

                    <div className="relative w-full h-full bg-[#0f2040]/50 border border-white/10 group-hover:border-[#A0845C]/40 transition-all duration-300 overflow-hidden">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes={isFeatured
                          ? "(max-width: 768px) 100vw, (max-width: 1024px) 66vw, 50vw"
                          : "(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                        }
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                      {/* Info overlay */}
                      <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                        <motion.h3
                          className={`text-white font-semibold mb-1 ${isFeatured ? 'text-xl md:text-2xl' : 'text-base md:text-lg'}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + index * 0.05 }}
                        >
                          {img.title}
                        </motion.h3>

                        {isFeatured && (
                          <motion.p
                            className="text-white/70 text-sm leading-relaxed mb-3 line-clamp-2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + index * 0.05 }}
                          >
                            {img.description}
                          </motion.p>
                        )}

                        {/* Zoom icon */}
                        <motion.div
                          className="flex items-center justify-between"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 + index * 0.05 }}
                        >
                          <span className="text-[#A0845C] text-xs font-medium tracking-wide uppercase">
                            Clicca per espandere
                          </span>
                          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <ZoomIn className="w-4 h-4 text-white" />
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Lightbox Modal with Zoom */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Toolbar Top */}
            <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent z-20">
              <div className="flex items-center gap-4">
                {/* Counter */}
                <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                  <span className="text-white text-sm font-medium">
                    {lightboxIndex + 1} / {images.length}
                  </span>
                </div>
                {/* Category badge */}
                <div className="px-4 py-2 bg-[#A0845C]/20 backdrop-blur-md rounded-full border border-[#A0845C]/30">
                  <span className="text-[#A0845C] text-sm font-medium">
                    {images[lightboxIndex].category}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Download button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    downloadImage()
                  }}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors backdrop-blur-md border border-white/20"
                  title="Scarica immagine"
                >
                  <Download className="w-5 h-5 text-white" />
                </button>

                {/* Close button */}
                <button
                  onClick={closeLightbox}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors backdrop-blur-md border border-white/20"
                  title="Chiudi (Esc)"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Navigation - Previous */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                prevLightboxImage()
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md border border-white/20 hover:scale-110"
              title="Precedente (←)"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            {/* Navigation - Next */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                nextLightboxImage()
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md border border-white/20 hover:scale-110"
              title="Successivo (→)"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Image with Zoom */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35 }}
              className="relative max-w-[85vw] max-h-[75vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <ImageZoom
                src={images[lightboxIndex].srcFull}
                alt={images[lightboxIndex].alt}
                width={2000}
                height={1500}
                className="max-w-full max-h-[75vh] object-contain rounded-lg"
              />
            </motion.div>

            {/* Caption bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10">
              <div className="max-w-4xl mx-auto text-center">
                <h3 className="text-white font-semibold text-lg md:text-xl mb-2">
                  {images[lightboxIndex].title}
                </h3>
                <p className="text-white/70 text-sm md:text-base leading-relaxed">
                  {images[lightboxIndex].description}
                </p>
                <p className="text-white/40 text-xs mt-3 tracking-wide uppercase">
                  Usa la rotella del mouse per zoomare • Frecce per navigare • Esc per chiudere
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
