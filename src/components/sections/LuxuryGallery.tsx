'use client'

import { useState, useEffect } from 'react'
import { motion, useMotionValue, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X, MapPin } from 'lucide-react'
import { luxuryGalleryImages } from '@/lib/galleryData'

export default function LuxuryGallery() {
  const [imgIndex, setImgIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  return (
    <>
      {/* SECTION 1: Preview Grid */}
      <section className="py-20 lg:py-28 px-4 bg-[#FAF7F2]">
        <div className="max-w-6xl 3xl:max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-sm text-[#2D5A47] font-semibold uppercase tracking-wider">
              Portfolio
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E3D30] mt-2">
              La Nostra <span className="text-[#C4704B]">Galleria</span>
            </h2>
            <p className="text-[#6B6560] text-lg max-w-2xl mx-auto mt-4">
              52 progetti luxury che trasformano il modo di abitare
            </p>
          </motion.div>

          {/* Masonry Grid - 12 immagini preview */}
          <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
            {luxuryGalleryImages.slice(0, 12).map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => {
                  setImgIndex(i)
                  setIsFullscreen(true)
                }}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  quality={75}
                  priority={i < 4}
                />

                {/* Info overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-3 left-3 text-white">
                    {img.location && (
                      <div className="flex items-center gap-1 text-sm font-medium">
                        <MapPin className="w-3 h-3" />
                        {img.location}
                      </div>
                    )}
                    {img.area && (
                      <div className="text-xs text-white/70 mt-1">{img.area} mq</div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button - Apri gallery completa */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => {
                setImgIndex(0)
                setIsFullscreen(true)
              }}
              className="px-8 py-4 rounded-xl bg-[#C4704B] text-white font-semibold text-lg shadow-xl hover:shadow-2xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Esplora Tutte le Realizzazioni (52)
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <FullscreenGallery
            imgIndex={imgIndex}
            setImgIndex={setImgIndex}
            onClose={() => setIsFullscreen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

// Fullscreen Gallery Component
interface FullscreenGalleryProps {
  imgIndex: number
  setImgIndex: (index: number | ((prev: number) => number)) => void
  onClose: () => void
}

function FullscreenGallery({ imgIndex, setImgIndex, onClose }: FullscreenGalleryProps) {
  const dragX = useMotionValue(0)
  const images = luxuryGalleryImages

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [imgIndex])

  // Preload adjacent images
  useEffect(() => {
    const preloadImages = [imgIndex - 1, imgIndex + 1]
      .filter(i => i >= 0 && i < images.length)
      .map(i => images[i].src)

    preloadImages.forEach(src => {
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.href = src
      document.head.appendChild(link)
    })
  }, [imgIndex])

  // Drag gesture
  const onDragEnd = () => {
    const x = dragX.get()
    if (x <= -50 && imgIndex < images.length - 1) {
      setImgIndex(prev => prev + 1)
    } else if (x >= 50 && imgIndex > 0) {
      setImgIndex(prev => prev - 1)
    }
  }

  const goNext = () => {
    if (imgIndex < images.length - 1) {
      setImgIndex(prev => prev + 1)
    }
  }

  const goPrev = () => {
    if (imgIndex > 0) {
      setImgIndex(prev => prev - 1)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close Button (X) - top-right */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        aria-label="Chiudi"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navigation Arrows */}
      {imgIndex > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            goPrev()
          }}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          aria-label="Precedente"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      {imgIndex < images.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            goNext()
          }}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          aria-label="Successiva"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Image Carousel with Drag */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        dragMomentum={false}
        style={{ x: dragX }}
        animate={{ translateX: `-${imgIndex * 100}%` }}
        onDragEnd={onDragEnd}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className="flex h-full cursor-grab active:cursor-grabbing"
        onClick={(e) => e.stopPropagation()}
      >
        {images.map((img, i) => {
          // Render solo immagini vicine (performance)
          const shouldRender = Math.abs(i - imgIndex) <= 2
          if (!shouldRender) {
            return <div key={img.id} className="w-screen h-full shrink-0" />
          }

          return (
            <div
              key={img.id}
              className="relative w-screen h-full shrink-0 flex items-center justify-center px-4 md:px-8"
            >
              <div className="relative w-full h-full max-w-7xl max-h-[85vh]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="100vw"
                  className="object-contain pointer-events-none"
                  quality={90}
                  priority={Math.abs(i - imgIndex) <= 1}
                  draggable={false}
                />
              </div>
            </div>
          )
        })}
      </motion.div>

      {/* Info Overlay - location/area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-20 left-8 text-white z-40"
      >
        {images[imgIndex].location && (
          <div className="flex items-center gap-2 text-lg font-medium">
            <MapPin className="w-5 h-5" />
            {images[imgIndex].location}
          </div>
        )}
        {images[imgIndex].area && (
          <div className="text-white/70 text-sm mt-1">
            {images[imgIndex].area} mq
          </div>
        )}
      </motion.div>

      {/* Counter - bottom center */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 text-sm z-40">
        {imgIndex + 1} / {images.length}
      </div>
    </motion.div>
  )
}
