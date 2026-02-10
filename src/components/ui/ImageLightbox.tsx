'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface LightboxImage {
  src: string
  alt: string
  title?: string
}

interface ImageLightboxProps {
  images: LightboxImage[]
  columns?: 2 | 3 | 4
  className?: string
}

export default function ImageLightbox({
  images,
  columns = 3,
  className = '',
}: ImageLightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const close = useCallback(() => setActiveIndex(null), [])
  const prev = useCallback(() => {
    setActiveIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null))
  }, [images.length])
  const next = useCallback(() => {
    setActiveIndex((i) => (i !== null ? (i + 1) % images.length : null))
  }, [images.length])

  useEffect(() => {
    if (activeIndex === null) return

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [activeIndex, close, prev, next])

  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <>
      <div className={`grid ${gridCols[columns]} gap-4 ${className}`}>
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl cursor-pointer"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            {img.title && (
              <span className="absolute bottom-0 left-0 right-0 p-3 text-sm text-white font-medium bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {img.title}
              </span>
            )}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
          >
            {/* Close button */}
            <button
              onClick={close}
              className="absolute top-4 right-4 z-10 p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Chiudi"
            >
              <X className="w-7 h-7" />
            </button>

            {/* Navigation - prev */}
            {images.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); prev() }}
                className="absolute left-4 z-10 p-2 text-white/70 hover:text-white transition-colors"
                aria-label="Precedente"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
            )}

            {/* Image */}
            <motion.div
              key={activeIndex}
              className="relative max-w-[90vw] max-h-[85vh] w-full h-full flex items-center justify-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[activeIndex].src}
                alt={images[activeIndex].alt}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Navigation - next */}
            {images.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); next() }}
                className="absolute right-4 z-10 p-2 text-white/70 hover:text-white transition-colors"
                aria-label="Successiva"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            )}

            {/* Counter */}
            {images.length > 1 && (
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium">
                {activeIndex + 1} / {images.length}
              </span>
            )}

            {/* Title */}
            {images[activeIndex].title && (
              <span className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white text-base font-medium">
                {images[activeIndex].title}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
