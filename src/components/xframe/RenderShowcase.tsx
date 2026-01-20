'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Image from 'next/image'
import { ZoomIn, X, ChevronLeft, ChevronRight, Layers, Camera, Eye } from 'lucide-react'

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
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Filter images by category
  const filteredImages = images.filter(img => img.category === activeCategory)
  const selectedImage = filteredImages[selectedIndex] || filteredImages[0]

  // Reset selection when category changes
  useEffect(() => {
    setSelectedIndex(0)
  }, [activeCategory])

  // Lightbox functions
  const openLightbox = () => {
    const globalIndex = images.findIndex(img => img.src === selectedImage.src)
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextLightboxImage()
      if (e.key === 'ArrowLeft') prevLightboxImage()
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
        <div className="absolute top-1/3 -left-20 w-96 h-96 bg-[#C4704B]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-[#4a9eff]/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9 }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#C4704B]/10 rounded-full border border-[#C4704B]/20 mb-6">
              <Camera className="w-4 h-4 text-[#C4704B]" />
              <span className="text-[#C4704B] text-sm font-medium tracking-wider uppercase">
                Visualizzazione Dettagliata
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Render <span className="text-[#C4704B]">Architettonici</span>
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
                        ? 'bg-[#C4704B] text-white shadow-lg shadow-[#C4704B]/30'
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

          {/* Main Showcase Area */}
          <motion.div
            className="grid lg:grid-cols-[1fr_280px] gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            {/* Main Image */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage?.src}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5 }}
                  className="relative aspect-[16/10] overflow-hidden cursor-pointer group"
                  onClick={openLightbox}
                >
                  {selectedImage && (
                    <>
                      <Image
                        src={selectedImage.srcFull}
                        alt={selectedImage.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 70vw"
                        priority
                      />
                      {/* Gradient overlay with info */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Info overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                        <div className="flex items-end justify-between gap-4">
                          <div>
                            <h3 className="text-white font-semibold text-xl lg:text-2xl mb-2">
                              {selectedImage.title}
                            </h3>
                            <p className="text-white/70 text-sm lg:text-base leading-relaxed max-w-xl">
                              {selectedImage.description}
                            </p>
                          </div>
                          <motion.div
                            className="flex-shrink-0 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                            whileHover={{ scale: 1.1 }}
                          >
                            <ZoomIn className="w-5 h-5 text-white" />
                          </motion.div>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Thumbnails Sidebar */}
            <div className="lg:max-h-[600px] lg:overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              <div className="grid grid-cols-3 lg:grid-cols-1 gap-2">
                <AnimatePresence mode="popLayout">
                  {filteredImages.map((img, index) => (
                    <motion.button
                      key={img.src}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.35, delay: index * 0.05 }}
                      onClick={() => setSelectedIndex(index)}
                      className={`
                        relative aspect-video lg:aspect-[16/10] overflow-hidden
                        transition-all duration-300
                        ${selectedIndex === index
                          ? 'opacity-100 scale-100'
                          : 'opacity-40 hover:opacity-70 scale-95'}
                      `}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 33vw, 280px"
                      />
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation - Previous */}
            <button
              onClick={(e) => { e.stopPropagation(); prevLightboxImage(); }}
              className="absolute left-4 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            {/* Navigation - Next */}
            <button
              onClick={(e) => { e.stopPropagation(); nextLightboxImage(); }}
              className="absolute right-4 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35 }}
              className="relative max-w-[90vw] max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[lightboxIndex].srcFull}
                alt={images[lightboxIndex].alt}
                width={2000}
                height={1500}
                className="max-w-full max-h-[85vh] object-contain"
                priority
              />
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white font-semibold text-lg">{images[lightboxIndex].title}</h3>
                <p className="text-white/80 text-sm">{images[lightboxIndex].description}</p>
              </div>
            </motion.div>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {lightboxIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
