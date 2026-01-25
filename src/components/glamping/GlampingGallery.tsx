'use client'

import { motion, useMotionValue, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react'

interface GalleryImage {
  src: string
  alt: string
  caption?: string
}

interface GlampingGalleryProps {
  color: string
}

// Gallery images for glamping
const galleryImages: GalleryImage[] = [
  {
    src: '/images/tipologie/glamping-new.jpg',
    alt: 'Glamping Ecolive - Vista esterna',
    caption: 'Design iconico integrato nel paesaggio'
  },
  {
    src: '/images/tipologie/glamping.webp',
    alt: 'Glamping Ecolive - Struttura classica',
    caption: 'Struttura classica con materiali naturali'
  },
  {
    src: '/images/casa-value.jpg',
    alt: 'Interni luminosi',
    caption: 'Interni spaziosi e luminosi'
  },
  {
    src: '/images/tipologie/luxury.webp',
    alt: 'Glamping Premium',
    caption: 'Versione premium con finiture di lusso'
  },
  {
    src: '/images/tipologie/residenziali.webp',
    alt: 'Ambiente naturale',
    caption: 'Perfetta integrazione ambientale'
  },
]

export default function GlampingGallery({ color }: GlampingGalleryProps) {
  const [imgIndex, setImgIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const dragX = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const onDragEnd = () => {
    const x = dragX.get()
    if (x <= -50 && imgIndex < galleryImages.length - 1) {
      setImgIndex((prev) => prev + 1)
    } else if (x >= 50 && imgIndex > 0) {
      setImgIndex((prev) => prev - 1)
    }
  }

  const goNext = () => {
    if (imgIndex < galleryImages.length - 1) {
      setImgIndex((prev) => prev + 1)
    }
  }

  const goPrev = () => {
    if (imgIndex > 0) {
      setImgIndex((prev) => prev - 1)
    }
  }

  return (
    <>
      <section className="py-20 lg:py-28 px-4 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-50px' }}
            className="text-center mb-12"
          >
            <span
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color }}
            >
              Gallery
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1E3D30] mt-2 mb-4">
              Scopri le nostre <span style={{ color }}>strutture</span>
            </h2>
            <p className="text-[#6B6560] max-w-xl mx-auto">
              Scorri per esplorare le nostre realizzazioni glamping
            </p>
          </motion.div>

          {/* Gallery Container */}
          <div
            ref={containerRef}
            className="relative group overflow-hidden rounded-3xl bg-[#1E3D30]/5"
          >
            {/* Navigation Arrows */}
            {imgIndex > 0 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={goPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#1E3D30] opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 shadow-lg"
                aria-label="Immagine precedente"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
            )}

            {imgIndex < galleryImages.length - 1 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={goNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#1E3D30] opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 shadow-lg"
                aria-label="Immagine successiva"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            )}

            {/* Fullscreen Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setIsFullscreen(true)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#1E3D30] opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 shadow-lg"
              aria-label="Schermo intero"
            >
              <Maximize2 className="w-5 h-5" />
            </motion.button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm text-white text-sm font-medium">
                <span>{imgIndex + 1}</span>
                <span className="text-white/50">/</span>
                <span className="text-white/70">{galleryImages.length}</span>
              </div>
            </div>

            {/* Swiper */}
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              dragMomentum={false}
              style={{ x: dragX }}
              animate={{ translateX: `-${imgIndex * 100}%` }}
              onDragEnd={onDragEnd}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className="flex cursor-grab active:cursor-grabbing"
            >
              {galleryImages.map((image, i) => (
                <motion.div
                  key={i}
                  className="relative w-full shrink-0 aspect-[16/10]"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover pointer-events-none"
                    draggable={false}
                    quality={85}
                  />

                  {/* Caption overlay */}
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                      <p className="text-white font-medium">{image.caption}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setImgIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === imgIndex
                    ? 'w-8'
                    : 'bg-[#1E3D30]/20 hover:bg-[#1E3D30]/40'
                }`}
                style={{
                  backgroundColor: i === imgIndex ? color : undefined
                }}
                aria-label={`Vai all'immagine ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setIsFullscreen(false)}
          >
            {/* Close button */}
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Chiudi"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation */}
            {imgIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goPrev()
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Precedente"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {imgIndex < galleryImages.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goNext()
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Successiva"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full h-full max-w-6xl max-h-[80vh] m-8"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[imgIndex].src}
                alt={galleryImages[imgIndex].alt}
                fill
                className="object-contain"
                quality={95}
              />

              {/* Caption */}
              {galleryImages[imgIndex].caption && (
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                  <p className="text-white text-lg">{galleryImages[imgIndex].caption}</p>
                </div>
              )}
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70">
              {imgIndex + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
