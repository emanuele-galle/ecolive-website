'use client'

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

interface GalleryImage {
  src: string
  alt: string
  caption: string
  span: 'landscape' | 'portrait' | 'wide'
}

interface GlampingGalleryProps {
  color: string
}

const TERRACOTTA = '#C4704B'

const galleryImages: GalleryImage[] = [
  {
    src: '/images/glamping/glamping-aframe-balcony.webp',
    alt: 'A-frame Ecolive con terrazza panoramica, vista aerea',
    caption: 'Design A-Frame con terrazza panoramica',
    span: 'landscape'
  },
  {
    src: '/images/glamping/glamping-triple-path.webp',
    alt: 'Triplo A-frame con sentiero fiorito immerso nella natura',
    caption: 'Villaggio glamping immerso nella natura',
    span: 'wide'
  },
  {
    src: '/images/glamping/glamping-triple-frontal.webp',
    alt: 'Tre strutture A-frame in vista frontale',
    caption: 'Configurazione tripla per resort',
    span: 'portrait'
  },
  {
    src: '/images/glamping/glamping-single-forest.webp',
    alt: 'Singolo A-frame nella foresta con luce naturale',
    caption: 'Integrazione perfetta con il paesaggio',
    span: 'landscape'
  },
  {
    src: '/images/glamping/glamping-duo-garden.webp',
    alt: 'Due A-frame con giardino fiorito e sentiero',
    caption: 'Duo A-Frame con giardino privato',
    span: 'portrait'
  },
  {
    src: '/images/glamping/glamping-duo-symmetric.webp',
    alt: 'Due A-frame simmetrici con design contemporaneo',
    caption: 'Simmetria e armonia nel design',
    span: 'landscape'
  },
  {
    src: '/images/glamping/glamping-duo-nature.webp',
    alt: 'Due A-frame con sentiero naturale tra il verde',
    caption: 'Sentieri naturali tra le strutture',
    span: 'wide'
  },
  {
    src: '/images/glamping/glamping-duo-flowers.webp',
    alt: 'Due A-frame circondati da fiori selvatici',
    caption: 'Glamping tra i fiori selvatici',
    span: 'portrait'
  },
  {
    src: '/images/glamping/glamping-single-moody.webp',
    alt: 'A-frame singolo con atmosfera soffusa al tramonto',
    caption: 'Atmosfera intima al tramonto',
    span: 'landscape'
  },
]

/* ============================
   3D Tilt Card with Glare
   ============================ */
function TiltCard({
  children,
  className = '',
  onClick,
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 })
  const glareX = useTransform(mouseX, [0, 1], ['-100%', '200%'])
  const brightness = useTransform(mouseY, [0, 0.5, 1], [1.15, 1, 1.05])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }

  const handleMouseLeave = () => {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        perspective: 800,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        filter: useTransform(brightness, v => `brightness(${v})`),
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
      {/* Glare overlay */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none z-20"
        style={{
          background: useTransform(
            glareX,
            v => `linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)`
          ),
          backgroundPosition: useTransform(glareX, v => `${v} 0`),
          backgroundSize: '200% 100%',
          backgroundRepeat: 'no-repeat',
        }}
      />
    </motion.div>
  )
}

/* ============================
   Masonry Item
   ============================ */
function MasonryItem({
  image,
  index,
  onClick,
  color
}: {
  image: GalleryImage
  index: number
  onClick: () => void
  color: string
}) {
  const aspectClass =
    image.span === 'portrait'
      ? 'aspect-[4/5]'
      : image.span === 'wide'
        ? 'aspect-[2/1]'
        : 'aspect-[16/10]'

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="break-inside-avoid mb-4 md:mb-5"
    >
      <TiltCard
        className="group cursor-pointer"
        onClick={onClick}
      >
        <div className={`relative ${aspectClass} rounded-2xl overflow-hidden`}>
          {/* Animated border glow */}
          <motion.div
            className="absolute -inset-[1px] rounded-2xl z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: `linear-gradient(135deg, ${color}80, transparent 40%, ${color}60, transparent 70%, ${color}40)`,
            }}
          />

          <div className="absolute inset-[1px] rounded-2xl overflow-hidden z-10">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-all duration-700 ease-out group-hover:scale-[1.06]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={80}
            />

            {/* Multi-layer hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />

            {/* Animated shine sweep */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.08) 40%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 60%, transparent 80%)',
                backgroundSize: '200% 100%',
                animation: 'shineSweep 1.5s ease-in-out'
              }}
            />

            {/* Colored glow on bottom */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background: `radial-gradient(ellipse at 50% 100%, ${color}30 0%, transparent 70%)`
              }}
            />

            {/* Caption slide-up */}
            <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-20">
              <motion.div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-[1px]" style={{ backgroundColor: color }} />
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium" style={{ color }}>
                  {image.span === 'portrait' ? 'Verticale' : image.span === 'wide' ? 'Panoramica' : 'Landscape'}
                </span>
              </motion.div>
              <p className="text-white font-medium text-sm md:text-base leading-snug">{image.caption}</p>
            </div>

            {/* Corner expand icon */}
            <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100 scale-75 group-hover:scale-100">
              <div className="relative">
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ border: `1px solid ${color}` }}
                  animate={{ scale: [1, 1.6, 1.6], opacity: [0.6, 0, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <div className="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md bg-white/15 border border-white/20">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-white">
                    <path d="M1 13L13 1M13 1H5M13 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  )
}

/* ============================
   Hero Image (first image)
   ============================ */
function HeroGalleryImage({
  image,
  onClick,
  color
}: {
  image: GalleryImage
  onClick: () => void
  color: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="mb-6 group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-[21/9] rounded-2xl overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          sizes="100vw"
          quality={85}
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="absolute top-5 left-5 z-10"
        >
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border border-white/20"
            style={{ backgroundColor: `${TERRACOTTA}cc`, color: 'white' }}
          >
            Progetto in Evidenza
          </span>
        </motion.div>

        {/* Caption overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-[2px] rounded-full" style={{ backgroundColor: TERRACOTTA }} />
            <span className="text-[11px] uppercase tracking-[0.2em] font-medium" style={{ color: TERRACOTTA }}>
              Panoramica
            </span>
          </div>
          <p className="text-white font-semibold text-lg md:text-xl">{image.caption}</p>
        </div>

        {/* Expand icon */}
        <div className="absolute top-5 right-5 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md bg-white/15 border border-white/20">
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none" className="text-white">
              <path d="M1 13L13 1M13 1H5M13 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ============================
   Featured Pair (images 2-3)
   ============================ */
function FeaturedPair({
  images,
  startIndex,
  onClick,
  color
}: {
  images: GalleryImage[]
  startIndex: number
  onClick: (index: number) => void
  color: string
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-6">
      {images.map((image, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="group cursor-pointer"
          onClick={() => onClick(startIndex + i)}
        >
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={80}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
              <p className="text-white font-medium text-sm md:text-base">{image.caption}</p>
            </div>

            {/* Expand icon */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
              <div className="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md bg-white/15 border border-white/20">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-white">
                  <path d="M1 13L13 1M13 1H5M13 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

/* ============================
   Lightbox
   ============================ */
function Lightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
  color
}: {
  images: GalleryImage[]
  currentIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
  color: string
}) {
  const [touchStart, setTouchStart] = useState<number | null>(null)

  const goNext = useCallback(() => {
    onNavigate((currentIndex + 1) % images.length)
  }, [currentIndex, images.length, onNavigate])

  const goPrev = useCallback(() => {
    onNavigate((currentIndex - 1 + images.length) % images.length)
  }, [currentIndex, images.length, onNavigate])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose, goNext, goPrev])

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX)
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return
    const diff = touchStart - e.changedTouches[0].clientX
    if (Math.abs(diff) > 60) { diff > 0 ? goNext() : goPrev() }
    setTouchStart(null)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Ambient color glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            `radial-gradient(ellipse at 50% 50%, ${color}15 0%, transparent 60%)`,
            `radial-gradient(ellipse at 40% 60%, ${color}20 0%, transparent 55%)`,
            `radial-gradient(ellipse at 60% 40%, ${color}15 0%, transparent 60%)`,
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Close */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onClick={onClose}
        className="absolute top-5 right-5 z-50 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors backdrop-blur-md border border-white/10"
        aria-label="Chiudi"
      >
        <X className="w-5 h-5" />
      </motion.button>

      {/* Nav buttons */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        onClick={(e) => { e.stopPropagation(); goPrev() }}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all backdrop-blur-md border border-white/10"
        aria-label="Precedente"
      >
        <ChevronLeft className="w-5 h-5" />
      </motion.button>
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        onClick={(e) => { e.stopPropagation(); goNext() }}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all backdrop-blur-md border border-white/10"
        aria-label="Successiva"
      >
        <ChevronRight className="w-5 h-5" />
      </motion.button>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ scale: 0.88, opacity: 0, rotateY: -5 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          exit={{ scale: 0.88, opacity: 0, rotateY: 5 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full max-w-6xl max-h-[80vh] m-6 md:m-10"
          onClick={(e) => e.stopPropagation()}
          style={{ perspective: 1000 }}
        >
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            fill
            className="object-contain"
            quality={95}
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Caption + Counter */}
      <div className="absolute bottom-6 left-0 right-0 z-40">
        <motion.p
          key={`caption-${currentIndex}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-white font-medium text-base text-center mb-3"
        >
          {images[currentIndex].caption}
        </motion.p>
        <div className="flex items-center justify-center gap-2 mb-3">
          {images.map((_, i) => (
            <motion.button
              key={i}
              onClick={(e) => { e.stopPropagation(); onNavigate(i) }}
              className="h-[3px] rounded-full transition-all duration-300"
              style={{
                width: i === currentIndex ? 32 : 12,
                backgroundColor: i === currentIndex ? color : 'rgba(255,255,255,0.2)',
              }}
              whileHover={{ scale: 1.5 }}
              aria-label={`Vai all'immagine ${i + 1}`}
            />
          ))}
        </div>
        <p className="text-white/30 text-xs font-mono text-center">
          {currentIndex + 1} / {images.length}
        </p>
      </div>
    </motion.div>
  )
}

/* ============================
   Main Gallery Component
   ============================ */
export default function GlampingGallery({ color }: GlampingGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Split images: hero (1), featured pair (2), masonry (rest)
  const heroImage = galleryImages[0]
  const featuredImages = galleryImages.slice(1, 3)
  const masonryImages = galleryImages.slice(3)

  return (
    <>
      <section className="py-20 lg:py-28 px-4 bg-[#1E3D30] relative overflow-hidden">
        {/* Animated aurora background */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: [
              `radial-gradient(ellipse at 20% 30%, ${color}20 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(255,255,255,0.04) 0%, transparent 50%)`,
              `radial-gradient(ellipse at 40% 60%, ${color}25 0%, transparent 45%), radial-gradient(ellipse at 60% 20%, rgba(255,255,255,0.06) 0%, transparent 50%)`,
              `radial-gradient(ellipse at 70% 40%, ${color}18 0%, transparent 55%), radial-gradient(ellipse at 30% 80%, rgba(255,255,255,0.04) 0%, transparent 50%)`,
              `radial-gradient(ellipse at 20% 30%, ${color}20 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(255,255,255,0.04) 0%, transparent 50%)`,
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Floating orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${color}20 0%, transparent 60%)`,
            filter: 'blur(100px)'
          }}
          animate={{
            x: [0, 60, -30, 0],
            y: [0, -40, 30, 0],
            scale: [1, 1.3, 0.8, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-14"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.6, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
              className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 border border-white/10 backdrop-blur-sm"
              style={{ color, backgroundColor: `${color}20` }}
            >
              Portfolio
            </motion.span>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                La nostra{' '}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 }}
                className="relative"
                style={{ color }}
              >
                gallery
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full"
                  style={{ backgroundColor: color }}
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.span>
            </h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-white/40 max-w-xl mx-auto"
            >
              Ogni struttura racconta una storia di design, comfort e rispetto per l&apos;ambiente
            </motion.p>
          </motion.div>

          {/* Hero Image - Full width ultra-wide */}
          <HeroGalleryImage
            image={heroImage}
            onClick={() => setLightboxIndex(0)}
            color={color}
          />

          {/* Featured Pair */}
          <FeaturedPair
            images={featuredImages}
            startIndex={1}
            onClick={setLightboxIndex}
            color={color}
          />

          {/* Masonry Grid - Remaining images */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-5">
            {masonryImages.map((image, i) => (
              <MasonryItem
                key={i}
                image={image}
                index={i}
                onClick={() => setLightboxIndex(i + 3)}
                color={color}
              />
            ))}
          </div>

          {/* Bottom counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="flex justify-center mt-10"
          >
            <motion.div
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 backdrop-blur-md bg-white/5"
              whileHover={{ scale: 1.05, borderColor: `${color}40` }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <motion.div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: color }}
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-white/60 text-sm font-medium">{galleryImages.length} realizzazioni</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={galleryImages}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
            color={color}
          />
        )}
      </AnimatePresence>
    </>
  )
}
