'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionTransition from '@/components/ui/SectionTransition'

const galleryImages = [
  { src: '/images/luxury/gallery-3.jpg', label: 'Villa Moderna', detail: '180 mq' },
  { src: '/images/luxury/gallery-7.jpg', label: 'Casa Bifamiliare', detail: '220 mq' },
  { src: '/images/luxury/gallery-12.jpg', label: 'Residenza Premium', detail: '250 mq' },
  { src: '/images/luxury/gallery-18.jpg', label: 'Villa Luxury', detail: '300 mq' },
  { src: '/images/luxury/gallery-24.jpg', label: 'Casa Passiva', detail: '160 mq' },
  { src: '/images/luxury/gallery-30.jpg', label: 'Design Contemporaneo', detail: '200 mq' },
]

export default function LifestyleVision() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const close = useCallback(() => setActiveIndex(null), [])
  const prev = useCallback(
    () => setActiveIndex((i) => (i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : null)),
    []
  )
  const next = useCallback(
    () => setActiveIndex((i) => (i !== null ? (i + 1) % galleryImages.length : null)),
    []
  )

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

  return (
    <>
      <SectionTransition from="#FAF7F2" to="#FFFCF7" variant="wave" height={80} />
      <section className="py-28 lg:py-36 bg-[#FFFCF7]">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E3D30]">
                Le Nostre <span className="text-[#C4704B]">Realizzazioni</span>
              </h2>
              <p className="text-[#6B6560] text-lg max-w-xl mx-auto mt-5 leading-relaxed">
                Ogni progetto e unico, pensato per il tuo stile di vita
              </p>
            </div>
          </ScrollReveal>

          {/* Bento grid - first image 2-col span */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {galleryImages.map((img, i) => (
              <ScrollReveal
                key={img.src}
                delay={i * 0.08}
                className={i === 0 ? 'md:col-span-2 md:row-span-1' : ''}
              >
                <button
                  onClick={() => setActiveIndex(i)}
                  className={`group relative w-full rounded-2xl overflow-hidden cursor-pointer ${
                    i === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.label}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes={
                      i === 0
                        ? '(max-width: 768px) 100vw, 66vw'
                        : '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                    }
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <div>
                      <p className="text-white font-semibold text-lg">{img.label}</p>
                      <p className="text-white/70 text-sm">{img.detail}</p>
                    </div>
                  </div>
                  {/* Subtle corner indicator */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>

          {/* "Vedi Tutti" link */}
          <ScrollReveal delay={0.5}>
            <div className="text-center mt-12">
              <Link
                href="/tipologie"
                className="inline-flex items-center gap-2 text-[#C4704B] hover:text-[#A85A3A] font-semibold text-lg transition-colors duration-300 group"
              >
                Vedi Tutti i Progetti
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Lightbox */}
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
            <button
              onClick={close}
              className="absolute top-4 right-4 z-10 p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Chiudi"
            >
              <X className="w-7 h-7" />
            </button>

            {galleryImages.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); prev() }}
                className="absolute left-4 z-10 p-2 text-white/70 hover:text-white transition-colors"
                aria-label="Precedente"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
            )}

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
                src={galleryImages[activeIndex].src}
                alt={galleryImages[activeIndex].label}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </motion.div>

            {galleryImages.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); next() }}
                className="absolute right-4 z-10 p-2 text-white/70 hover:text-white transition-colors"
                aria-label="Successiva"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            )}

            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium">
              {activeIndex + 1} / {galleryImages.length}
            </span>
            <span className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white text-base font-medium">
              {galleryImages[activeIndex].label} &middot; {galleryImages[activeIndex].detail}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
