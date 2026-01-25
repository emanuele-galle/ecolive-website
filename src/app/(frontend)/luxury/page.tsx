'use client'

import { motion, useInView, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Home, Clock, Shield, Sparkles, ChevronDown, Phone, ArrowLeft, ArrowRight,
  Gem, Cpu, Waves, Compass, Award, Lock, Sun, Users, TrendingUp, X,
  MessageCircle, ClipboardCheck, Factory, Wrench, KeyRound, Check, Star,
  Quote, ChevronLeft, ChevronRight, Play, Diamond,
  type LucideIcon
} from 'lucide-react'
import { getTipologiaById } from '@/data/tipologie'
import SectionDivider from '@/components/ui/SectionDivider'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import ParticleField from '@/components/ui/backgrounds/ParticleField'
import { BentoGrid, BentoFeatureCard } from '@/components/ui/BentoGrid'
import GlowEffect, { ShimmerButton } from '@/components/ui/GlowEffect'

// Luxury color palette
const luxuryPalette = {
  primary: '#C4704B',
  gold: '#D4AF37',
  goldLight: '#F5E6C8',
  deepGreen: '#1E3D30',
  cream: '#FFFCF7',
}

// Hero images for slideshow
const heroImages = [
  '/images/luxury/hero-1.jpg',
  '/images/luxury/hero-2.jpg',
  '/images/luxury/hero-3.jpg',
]

// Floating villa images for parallax effect
const floatingVillaImages: { src: string; position: { top?: string; left?: string; right?: string; bottom?: string }; size: string }[] = [
  { src: '/images/luxury/gallery-1.jpg', position: { top: '15%', left: '5%' }, size: 'w-24 h-32 md:w-32 md:h-44' },
  { src: '/images/luxury/gallery-3.jpg', position: { top: '20%', right: '8%' }, size: 'w-28 h-36 md:w-36 md:h-48' },
  { src: '/images/luxury/gallery-5.jpg', position: { bottom: '25%', left: '8%' }, size: 'w-20 h-28 md:w-28 md:h-36' },
  { src: '/images/luxury/gallery-7.jpg', position: { bottom: '20%', right: '5%' }, size: 'w-24 h-32 md:w-32 md:h-40' },
]

// Gallery images
const galleryImages = [
  { src: '/images/luxury/gallery-1.jpg', title: 'Villa Rubi', location: 'Barcellona' },
  { src: '/images/luxury/gallery-2.jpg', title: 'Villa Figueres', location: 'Girona' },
  { src: '/images/luxury/gallery-3.jpg', title: 'Villa Santa Barbara', location: 'Alicante' },
  { src: '/images/luxury/gallery-4.jpg', title: 'Villa Zamora', location: 'Castiglia' },
  { src: '/images/luxury/gallery-5.jpg', title: 'Villa Barcelona', location: 'Catalunya' },
  { src: '/images/luxury/gallery-6.jpg', title: 'Villa Denia', location: 'Valencia' },
  { src: '/images/luxury/gallery-7.jpg', title: 'Villa Tiana', location: 'Maresme' },
  { src: '/images/luxury/gallery-8.jpg', title: 'Villa Tarifa', location: 'Cadice' },
  { src: '/images/luxury/gallery-9.jpg', title: 'Villa Paterna', location: 'Valencia' },
  { src: '/images/luxury/gallery-10.jpg', title: 'Villa Masias', location: 'Emporda' },
  { src: '/images/luxury/gallery-11.jpg', title: 'Villa Sotogrande', location: 'Andalusia' },
  { src: '/images/luxury/gallery-12.jpg', title: 'Villa Premium', location: 'Costa Brava' },
]

// Marquee images for infinite scroll
const marqueeImages = [
  '/images/luxury/gallery-1.jpg',
  '/images/luxury/gallery-2.jpg',
  '/images/luxury/gallery-3.jpg',
  '/images/luxury/gallery-4.jpg',
  '/images/luxury/gallery-5.jpg',
  '/images/luxury/gallery-6.jpg',
]

// Process timeline steps
const processSteps = [
  { icon: MessageCircle, title: 'Consulenza', description: 'Incontro esclusivo per definire la tua visione' },
  { icon: ClipboardCheck, title: 'Progetto', description: 'Architettura su misura con render 3D' },
  { icon: Factory, title: 'Produzione', description: 'Realizzazione in stabilimento hi-tech' },
  { icon: Wrench, title: 'Montaggio', description: 'Installazione in soli 3-5 giorni' },
  { icon: KeyRound, title: 'Consegna', description: 'La tua villa pronta da vivere' },
]

// Testimonials
const testimonials = [
  {
    name: 'Marco R.',
    role: 'CEO',
    quote: 'Un\'esperienza oltre ogni aspettativa. Dalla consulenza iniziale alla consegna, ogni dettaglio e stato curato con maestria. La nostra villa e diventata un\'opera d\'arte abitabile.',
    rating: 5,
    image: '/images/luxury/gallery-2.jpg'
  },
  {
    name: 'Giulia S.',
    role: 'Imprenditrice',
    quote: 'Design e qualita senza compromessi. Ho cercato per anni la soluzione perfetta e l\'ho trovata qui. Il team ha trasformato i miei sogni in realta con una professionalita impeccabile.',
    rating: 5,
    image: '/images/luxury/gallery-4.jpg'
  },
  {
    name: 'Alessandro M.',
    role: 'Architetto',
    quote: 'Tecnologia e artigianalita perfettamente fuse. Come professionista del settore, apprezzo la cura maniacale per ogni dettaglio costruttivo. Qualita che raramente si trova.',
    rating: 5,
    image: '/images/luxury/gallery-6.jpg'
  },
]

// Materials comparison
const materialsComparison = {
  standard: [
    'Legno base',
    'Isolamento standard',
    'Finestre basic',
    'Finiture economiche',
    'Impianti standard',
  ],
  luxury: [
    'Legno certificato premium',
    'Isolamento triplo strato',
    'Finestre antirumore triplo vetro',
    'Finiture artigianali di pregio',
    'Impianti domotici integrati',
  ],
}

// ============================================
// COMPONENTI INLINE
// ============================================

// Split text animation - letter by letter with blur
function SplitText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })

  return (
    <span ref={ref} className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{
            duration: 0.4,
            delay: delay + i * 0.03,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

// Text stagger animation for hero title with enhanced effects
function StaggerText({ text, className }: { text: string; className?: string }) {
  const letters = text.split('')

  return (
    <span className={className}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 50, filter: 'blur(10px)', rotateX: -90 }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)', rotateX: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.5 + i * 0.08,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="inline-block"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </span>
  )
}

// Typing effect for subtitles
function TypingText({ text, className }: { text: string; className?: string }) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 50)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, isInView])

  return (
    <span ref={ref} className={className}>
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="inline-block w-[2px] h-[1em] bg-current ml-1 align-middle"
      />
    </span>
  )
}

// Gold gradient badge with pulsing glow
function GoldBadge({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="relative inline-flex"
    >
      {/* Pulsing glow */}
      <motion.div
        className="absolute -inset-2 rounded-full opacity-50"
        style={{
          background: `radial-gradient(circle, ${luxuryPalette.gold}40 0%, transparent 70%)`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      <motion.div
        className="absolute -inset-[2px] rounded-full opacity-80"
        style={{
          background: `linear-gradient(90deg, ${luxuryPalette.primary}, ${luxuryPalette.gold}, ${luxuryPalette.primary})`,
          backgroundSize: '200% 100%'
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      <div className="relative px-5 py-2.5 rounded-full bg-black/70 backdrop-blur-sm">
        {children}
      </div>
    </motion.div>
  )
}

// Floating image with mouse parallax
function FloatingImage({
  src,
  position,
  size,
  mouseX,
  mouseY,
  intensity = 30
}: {
  src: string
  position: { top?: string; left?: string; right?: string; bottom?: string }
  size: string
  mouseX: any
  mouseY: any
  intensity?: number
}) {
  const x = useTransform(mouseX, [-1, 1], [-intensity, intensity])
  const y = useTransform(mouseY, [-1, 1], [-intensity, intensity])

  return (
    <motion.div
      className={`absolute ${size} rounded-2xl overflow-hidden shadow-2xl hidden lg:block`}
      style={{ ...position, x, y }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.9, scale: 1 }}
      transition={{ delay: 1.5, duration: 1 }}
    >
      <Image src={src} alt="Villa" fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
    </motion.div>
  )
}

// Animated scroll indicator with gold color
function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
    >
      <span className="text-[#D4AF37]/60 text-sm tracking-[0.3em] uppercase">Scopri</span>
      <motion.div
        className="w-6 h-10 rounded-full border-2 border-[#D4AF37]/40 flex justify-center pt-2"
      >
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"
          animate={{ y: [0, 16, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  )
}

// Infinite Marquee component
function InfiniteMarquee({ images, direction = 'left', speed = 30 }: { images: string[]; direction?: 'left' | 'right'; speed?: number }) {
  const duplicatedImages = [...images, ...images, ...images]

  return (
    <div className="relative overflow-hidden">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#1E3D30] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#1E3D30] to-transparent z-10" />

      <motion.div
        className="flex gap-4"
        animate={{
          x: direction === 'left' ? [0, -100 * images.length + '%'] : [-100 * images.length + '%', 0]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear'
          }
        }}
      >
        {duplicatedImages.map((src, i) => (
          <motion.div
            key={i}
            className="relative flex-shrink-0 w-64 h-40 md:w-80 md:h-52 rounded-2xl overflow-hidden group"
            whileHover={{ scale: 1.05, zIndex: 20 }}
          >
            <Image
              src={src}
              alt={`Luxury Villa ${i + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

// 3D Tilt Card for gallery
function TiltCard({
  children,
  className,
  onClick
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateXValue = ((y - centerY) / centerY) * -10
    const rotateYValue = ((x - centerX) / centerX) * 10
    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      animate={{
        rotateX,
        rotateY
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

// Spotlight card with cursor follow effect
function SpotlightCard({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Spotlight effect */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${luxuryPalette.gold}20 0%, transparent 70%)`,
          left: position.x - 200,
          top: position.y - 200,
        }}
        animate={{
          opacity: isHovered ? 1 : 0
        }}
        transition={{ duration: 0.2 }}
      />
      {children}
    </div>
  )
}

// Stat card with gold accents and particles
function StatCard({
  value,
  suffix,
  label,
  delay,
  icon: Icon
}: {
  value: number
  suffix?: string
  label: string
  delay: number
  icon: LucideIcon
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative p-8 bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden"
      style={{
        border: `1px solid ${luxuryPalette.goldLight}`,
        boxShadow: '0 4px 30px rgba(212, 175, 55, 0.08)'
      }}
    >
      {/* Animated particles on hover */}
      <AnimatePresence>
        {isHovered && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{ backgroundColor: luxuryPalette.gold }}
                initial={{
                  opacity: 0,
                  x: '50%',
                  y: '50%',
                  scale: 0
                }}
                animate={{
                  opacity: [0, 1, 0],
                  x: `${50 + (Math.random() - 0.5) * 100}%`,
                  y: `${50 - Math.random() * 100}%`,
                  scale: [0, 1, 0]
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 0.5
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${luxuryPalette.gold}15 0%, transparent 70%)`
        }}
      />

      {/* Pulsing gold border on hover */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100"
        style={{
          border: `2px solid ${luxuryPalette.gold}40`
        }}
        animate={isHovered ? {
          boxShadow: [
            `0 0 0 0 ${luxuryPalette.gold}00`,
            `0 0 20px 5px ${luxuryPalette.gold}30`,
            `0 0 0 0 ${luxuryPalette.gold}00`
          ]
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: `${luxuryPalette.gold}20` }}
            animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            <Icon className="w-6 h-6" style={{ color: luxuryPalette.gold }} />
          </motion.div>
        </div>

        <div className="flex items-baseline gap-1">
          <AnimatedCounter
            value={value}
            suffix={suffix || ''}
            className="text-5xl md:text-6xl font-bold"
            style={{ color: luxuryPalette.primary }}
          />
        </div>

        <p className="text-[#6B6560] mt-2 font-medium">{label}</p>
      </div>
    </motion.div>
  )
}

// Process step card
function ProcessStepCard({
  step,
  index,
  isActive,
  totalSteps
}: {
  step: typeof processSteps[0]
  index: number
  isActive: boolean
  totalSteps: number
}) {
  const Icon = step.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="relative flex flex-col items-center"
    >
      {/* Connecting line */}
      {index < totalSteps - 1 && (
        <motion.div
          className="absolute top-10 left-[calc(50%+40px)] w-[calc(100%-80px)] h-[2px] hidden md:block"
          style={{ backgroundColor: `${luxuryPalette.gold}30` }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false }}
          transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
        />
      )}

      {/* Step number */}
      <motion.div
        className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center mb-6"
        style={{
          background: `linear-gradient(135deg, ${luxuryPalette.gold}20, ${luxuryPalette.primary}20)`,
          border: `2px solid ${luxuryPalette.gold}40`
        }}
        whileHover={{
          scale: 1.1,
          boxShadow: `0 0 30px ${luxuryPalette.gold}40`
        }}
      >
        <motion.div
          animate={{
            rotate: [0, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(from 0deg, ${luxuryPalette.gold}40, transparent, ${luxuryPalette.gold}40)`,
            opacity: 0.5
          }}
        />
        <Icon className="w-8 h-8 relative z-10" style={{ color: luxuryPalette.gold }} />
      </motion.div>

      <motion.span
        className="text-sm font-medium mb-2"
        style={{ color: luxuryPalette.gold }}
      >
        Step {index + 1}
      </motion.span>

      <h3 className="text-xl font-bold text-[#1E3D30] mb-2 text-center">{step.title}</h3>
      <p className="text-[#6B6560] text-center text-sm max-w-[200px]">{step.description}</p>
    </motion.div>
  )
}

// Testimonial card
function TestimonialCard({
  testimonial,
  isActive
}: {
  testimonial: typeof testimonials[0]
  isActive: boolean
}) {
  return (
    <motion.div
      className="relative p-8 md:p-10 rounded-3xl"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${luxuryPalette.gold}30`
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isActive ? 1 : 0.5, scale: isActive ? 1 : 0.9 }}
      transition={{ duration: 0.5 }}
    >
      {/* Quote icon with glow */}
      <motion.div
        className="absolute -top-4 -left-4 w-12 h-12 rounded-full flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${luxuryPalette.gold}, ${luxuryPalette.primary})`,
          boxShadow: `0 0 30px ${luxuryPalette.gold}50`
        }}
        animate={{
          boxShadow: [
            `0 0 20px ${luxuryPalette.gold}30`,
            `0 0 40px ${luxuryPalette.gold}50`,
            `0 0 20px ${luxuryPalette.gold}30`
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Quote className="w-5 h-5 text-white" />
      </motion.div>

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Star className="w-5 h-5 fill-current" style={{ color: luxuryPalette.gold }} />
          </motion.div>
        ))}
      </div>

      {/* Quote text */}
      <p className="text-white/80 text-lg leading-relaxed mb-6 italic">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="relative w-14 h-14 rounded-full overflow-hidden border-2" style={{ borderColor: luxuryPalette.gold }}>
          <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" />
        </div>
        <div>
          <h4 className="text-white font-bold">{testimonial.name}</h4>
          <p className="text-white/60 text-sm">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  )
}

// Comparison list item
function ComparisonItem({ text, isLuxury, delay }: { text: string; isLuxury: boolean; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isLuxury ? 20 : -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false }}
      transition={{ delay, duration: 0.4 }}
      className="flex items-center gap-3 py-3"
    >
      <motion.div
        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
        style={{
          backgroundColor: isLuxury ? `${luxuryPalette.gold}20` : '#E5E5E5',
          border: `2px solid ${isLuxury ? luxuryPalette.gold : '#CCCCCC'}`
        }}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: false }}
        transition={{ delay: delay + 0.2, type: 'spring' }}
      >
        <Check className="w-3.5 h-3.5" style={{ color: isLuxury ? luxuryPalette.gold : '#888888' }} />
      </motion.div>
      <span className={isLuxury ? 'text-[#1E3D30] font-medium' : 'text-[#888888]'}>{text}</span>
    </motion.div>
  )
}

// ============================================
// FLOATING 3D GALLERY - Effetti Cinematografici
// ============================================

// Grid layout configuration for 3D floating gallery
const floatingGridItems = [
  { gridArea: '1 / 1 / 3 / 2', depth: 0, size: 'large', index: 0 },      // Large left
  { gridArea: '1 / 2 / 2 / 3', depth: -40, size: 'medium', index: 1 },   // Top middle
  { gridArea: '1 / 3 / 2 / 4', depth: -70, size: 'medium', index: 2 },   // Top right
  { gridArea: '2 / 2 / 3 / 3', depth: -25, size: 'medium', index: 3 },   // Middle
  { gridArea: '2 / 3 / 3 / 4', depth: -55, size: 'medium', index: 4 },   // Middle right
  { gridArea: '3 / 1 / 4 / 2', depth: -45, size: 'small', index: 5 },    // Bottom left
  { gridArea: '3 / 2 / 4 / 4', depth: -15, size: 'wide', index: 6 },     // Wide bottom
]

// Floating 3D Gallery with perspective and parallax
function FloatingGallery3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  // Scroll-linked rotation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const rotateX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [12, 0, 0, -8])
  const containerScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.95])

  // Mouse move handler
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }, [mouseX, mouseY])

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return
      if (e.key === 'ArrowRight') {
        setSelectedImage((prev) => prev !== null ? (prev + 1) % 7 : null)
      }
      if (e.key === 'ArrowLeft') {
        setSelectedImage((prev) => prev !== null ? (prev - 1 + 7) % 7 : null)
      }
      if (e.key === 'Escape') setSelectedImage(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage])

  // Random offset for scatter animation
  const getRandomOffset = (min: number, max: number) => {
    return Math.random() * (max - min) + min
  }

  // Memoized random values for consistent scatter
  const scatterValues = useMemo(() =>
    floatingGridItems.map(() => ({
      x: getRandomOffset(-150, 150),
      y: getRandomOffset(-150, 150),
      rotate: getRandomOffset(-25, 25),
    })), []
  )

  return (
    <>
      {/* 3D Perspective Container */}
      <motion.div
        ref={containerRef}
        className="relative"
        style={{
          perspective: '1500px',
          perspectiveOrigin: '50% 50%',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          mouseX.set(0)
          mouseY.set(0)
        }}
      >
        {/* Floating gold particles behind gallery */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: `${luxuryPalette.gold}60`,
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                x: useTransform(smoothMouseX, [-0.5, 0.5], [-(10 + i * 3), (10 + i * 3)]),
                y: useTransform(smoothMouseY, [-0.5, 0.5], [-(10 + i * 3), (10 + i * 3)]),
              }}
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* 3D Rotating Grid */}
        <motion.div
          className="grid grid-cols-3 grid-rows-3 gap-3 md:gap-4 h-[500px] md:h-[650px] lg:h-[700px]"
          style={{
            rotateX,
            scale: containerScale,
            transformStyle: 'preserve-3d',
          }}
        >
          {floatingGridItems.map((item, i) => {
            const image = galleryImages[i]
            const scatterVal = scatterValues[i]

            // Multi-layer parallax based on depth
            const depthFactor = Math.abs(item.depth) / 100
            const imageX = useTransform(
              smoothMouseX,
              [-0.5, 0.5],
              [-(15 + depthFactor * 25), (15 + depthFactor * 25)]
            )
            const imageY = useTransform(
              smoothMouseY,
              [-0.5, 0.5],
              [-(15 + depthFactor * 25), (15 + depthFactor * 25)]
            )

            return (
              <motion.div
                key={i}
                className="relative cursor-pointer group"
                style={{
                  gridArea: item.gridArea,
                  transformStyle: 'preserve-3d',
                  z: item.depth,
                }}
                // Scatter reveal animation
                initial={{
                  opacity: 0,
                  scale: 0.5,
                  x: scatterVal.x,
                  y: scatterVal.y,
                  rotateZ: scatterVal.rotate,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                  y: 0,
                  rotateZ: 0,
                }}
                viewport={{ once: false, margin: '-50px' }}
                transition={{
                  type: 'spring',
                  stiffness: 80,
                  damping: 15,
                  delay: i * 0.1,
                }}
                onClick={() => setSelectedImage(i)}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Card with 3D transform */}
                <motion.div
                  className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden"
                  style={{
                    x: imageX,
                    y: imageY,
                    boxShadow: hoveredIndex === i
                      ? `0 50px 100px rgba(212, 175, 55, 0.35), 0 20px 40px rgba(0,0,0,0.3)`
                      : `0 ${10 + Math.abs(item.depth) / 3}px ${30 + Math.abs(item.depth)}px rgba(0,0,0,0.2)`,
                  }}
                  whileHover={{
                    scale: 1.05,
                    z: 80,
                    transition: { duration: 0.4, ease: 'easeOut' },
                  }}
                >
                  {/* Gold glow border on hover */}
                  <motion.div
                    className="absolute -inset-[2px] rounded-2xl md:rounded-3xl z-10 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${luxuryPalette.gold}, ${luxuryPalette.primary}, ${luxuryPalette.gold})`,
                      backgroundSize: '200% 200%',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredIndex === i ? 1 : 0,
                      backgroundPosition: hoveredIndex === i ? ['0% 50%', '100% 50%', '0% 50%'] : '0% 50%',
                    }}
                    transition={{
                      opacity: { duration: 0.3 },
                      backgroundPosition: { duration: 3, repeat: Infinity, ease: 'linear' },
                    }}
                  />

                  {/* Inner container */}
                  <div className="absolute inset-[2px] rounded-2xl md:rounded-3xl overflow-hidden bg-black">
                    {/* Image with zoom effect */}
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        scale: hoveredIndex === i ? 1.15 : 1,
                      }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                    >
                      <Image
                        src={image.src}
                        alt={image.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>

                    {/* Gradient overlay */}
                    <div
                      className="absolute inset-0 transition-opacity duration-500"
                      style={{
                        background: hoveredIndex === i
                          ? 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 40%, transparent 70%)'
                          : 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
                      }}
                    />

                    {/* Shimmer effect on hover */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)`,
                        backgroundSize: '200% 100%',
                      }}
                      animate={{
                        backgroundPosition: hoveredIndex === i ? ['200% 0%', '-200% 0%'] : '200% 0%',
                      }}
                      transition={{
                        duration: 1.5,
                        ease: 'easeInOut',
                      }}
                    />

                    {/* Content overlay */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-4 md:p-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: hoveredIndex === i ? 1 : 0,
                        y: hoveredIndex === i ? 0 : 20,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="flex items-center gap-2 mb-2"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{
                          x: hoveredIndex === i ? 0 : -20,
                          opacity: hoveredIndex === i ? 1 : 0,
                        }}
                        transition={{ delay: 0.1 }}
                      >
                        <Diamond className="w-4 h-4" style={{ color: luxuryPalette.gold }} />
                        <span className="text-xs uppercase tracking-widest" style={{ color: luxuryPalette.gold }}>
                          Esclusiva
                        </span>
                      </motion.div>
                      <h3 className="text-white font-bold text-lg md:text-xl lg:text-2xl">{image.title}</h3>
                      <p className="text-white/70 text-sm">{image.location}</p>
                    </motion.div>

                    {/* Expand icon */}
                    <motion.div
                      className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: `${luxuryPalette.gold}30`,
                        backdropFilter: 'blur(10px)',
                        border: `1px solid ${luxuryPalette.gold}50`,
                      }}
                      initial={{ opacity: 0, scale: 0, rotate: -180 }}
                      animate={{
                        opacity: hoveredIndex === i ? 1 : 0,
                        scale: hoveredIndex === i ? 1 : 0,
                        rotate: hoveredIndex === i ? 0 : -180,
                      }}
                      transition={{ duration: 0.4, type: 'spring' }}
                    >
                      <Sparkles className="w-5 h-5" style={{ color: luxuryPalette.gold }} />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Connecting lines between cards (decorative) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 hidden lg:block">
          <motion.line
            x1="25%" y1="50%" x2="40%" y2="25%"
            stroke={luxuryPalette.gold}
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.5, duration: 1 }}
          />
          <motion.line
            x1="60%" y1="25%" x2="75%" y2="50%"
            stroke={luxuryPalette.gold}
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.7, duration: 1 }}
          />
        </svg>
      </motion.div>

      {/* Cinematic Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            {/* Backdrop with blur */}
            <motion.div
              className="absolute inset-0 bg-black/90"
              initial={{ backdropFilter: 'blur(0px)' }}
              animate={{ backdropFilter: 'blur(20px)' }}
              exit={{ backdropFilter: 'blur(0px)' }}
              transition={{ duration: 0.4 }}
            />

            {/* Gold particle effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    backgroundColor: luxuryPalette.gold,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                    y: [0, -150],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            {/* Close button */}
            <motion.button
              className="absolute top-6 right-6 w-14 h-14 rounded-full flex items-center justify-center z-20"
              style={{
                background: `linear-gradient(135deg, ${luxuryPalette.gold}30, ${luxuryPalette.primary}30)`,
                border: `1px solid ${luxuryPalette.gold}50`,
                backdropFilter: 'blur(10px)',
              }}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0, rotate: 180 }}
              transition={{ delay: 0.2, type: 'spring' }}
              onClick={() => setSelectedImage(null)}
              whileHover={{ scale: 1.1, boxShadow: `0 0 30px ${luxuryPalette.gold}50` }}
            >
              <X className="w-6 h-6" style={{ color: luxuryPalette.gold }} />
            </motion.button>

            {/* Navigation buttons */}
            <motion.button
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center z-20"
              style={{
                background: `linear-gradient(135deg, ${luxuryPalette.gold}20, ${luxuryPalette.primary}20)`,
                border: `1px solid ${luxuryPalette.gold}40`,
                backdropFilter: 'blur(10px)',
              }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ delay: 0.3 }}
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage((prev) => prev !== null ? (prev - 1 + 7) % 7 : null)
              }}
              whileHover={{ scale: 1.1, boxShadow: `0 0 20px ${luxuryPalette.gold}40` }}
            >
              <ArrowLeft className="w-6 h-6" style={{ color: luxuryPalette.gold }} />
            </motion.button>

            <motion.button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center z-20"
              style={{
                background: `linear-gradient(135deg, ${luxuryPalette.gold}20, ${luxuryPalette.primary}20)`,
                border: `1px solid ${luxuryPalette.gold}40`,
                backdropFilter: 'blur(10px)',
              }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ delay: 0.3 }}
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage((prev) => prev !== null ? (prev + 1) % 7 : null)
              }}
              whileHover={{ scale: 1.1, boxShadow: `0 0 20px ${luxuryPalette.gold}40` }}
            >
              <ArrowRight className="w-6 h-6" style={{ color: luxuryPalette.gold }} />
            </motion.button>

            {/* Main image with cinematic entrance */}
            <motion.div
              className="relative w-[90vw] h-[70vh] md:w-[80vw] md:h-[80vh] z-10"
              initial={{ scale: 0.5, opacity: 0, rotateY: -30 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotateY: 30 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gold frame */}
              <motion.div
                className="absolute -inset-[3px] rounded-3xl"
                style={{
                  background: `linear-gradient(135deg, ${luxuryPalette.gold}, ${luxuryPalette.primary}, ${luxuryPalette.gold})`,
                  backgroundSize: '200% 200%',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              />

              {/* Image container */}
              <div className="absolute inset-[3px] rounded-3xl overflow-hidden bg-black">
                <Image
                  src={galleryImages[selectedImage].src}
                  alt={galleryImages[selectedImage].title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Reflection effect at bottom */}
              <motion.div
                className="absolute -bottom-20 left-[10%] right-[10%] h-20 rounded-b-3xl overflow-hidden opacity-30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 0.5 }}
              >
                <Image
                  src={galleryImages[selectedImage].src}
                  alt=""
                  fill
                  className="object-cover scale-y-[-1] blur-sm"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
              </motion.div>
            </motion.div>

            {/* Info bar at bottom */}
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center z-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-4"
                style={{
                  background: `linear-gradient(135deg, ${luxuryPalette.gold}20, ${luxuryPalette.primary}20)`,
                  border: `1px solid ${luxuryPalette.gold}40`,
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Diamond className="w-4 h-4" style={{ color: luxuryPalette.gold }} />
                <h3 className="text-white font-bold text-lg md:text-xl">
                  {galleryImages[selectedImage].title}
                </h3>
                <span className="text-white/50">•</span>
                <p className="text-white/70">{galleryImages[selectedImage].location}</p>
              </motion.div>

              {/* Image counter */}
              <div className="flex items-center justify-center gap-2">
                {floatingGridItems.map((_, i) => (
                  <motion.button
                    key={i}
                    className="w-2 h-2 rounded-full transition-all"
                    style={{
                      backgroundColor: i === selectedImage ? luxuryPalette.gold : 'rgba(255,255,255,0.3)',
                    }}
                    animate={{
                      scale: i === selectedImage ? 1.5 : 1,
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedImage(i)
                    }}
                    whileHover={{ scale: 1.3 }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Word by word reveal animation
function WordReveal({ text, className }: { text: string; className?: string }) {
  const words = text.split(' ')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
          transition={{
            duration: 0.5,
            delay: i * 0.1,
            ease: 'easeOut'
          }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

// Feature icons mapping
const featureIcons: Record<string, LucideIcon> = {
  'Finiture premium personalizzate': Gem,
  'Domotica integrata': Cpu,
  'Piscina e spa opzionali': Waves,
  'Progettazione architettonica dedicata': Compass,
  'Materiali esclusivi': Sparkles,
  'Certificazioni top di gamma': Award
}

// Luxury features list
const luxuryFeatures = [
  'Finiture premium personalizzate',
  'Domotica integrata',
  'Piscina e spa opzionali',
  'Progettazione architettonica dedicata',
  'Materiali esclusivi',
  'Certificazioni top di gamma'
]

// Benefits for parallax section
const luxuryBenefits = [
  {
    icon: Lock,
    title: 'Privacy Totale',
    description: 'Progettazione architettonica che garantisce massima riservatezza in ogni ambiente.'
  },
  {
    icon: Sun,
    title: 'Autosufficienza Energetica',
    description: 'Impianto fotovoltaico, accumulo e pompa di calore per indipendenza dalla rete.'
  },
  {
    icon: Users,
    title: 'Consulenza Dedicata',
    description: 'Un team di architetti e designer al tuo esclusivo servizio per ogni dettaglio.'
  },
  {
    icon: TrendingUp,
    title: 'Valore Garantito',
    description: 'Investimento che mantiene e accresce il suo valore nel tempo.'
  }
]

// Scroll progress bar
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
      style={{
        scaleX,
        background: `linear-gradient(90deg, ${luxuryPalette.gold}, ${luxuryPalette.primary})`
      }}
    />
  )
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function LuxuryVillasPage() {
  const tipologia = getTipologiaById('luxury')!
  const heroRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  // Mouse position for parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 30 })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window
    mouseX.set((clientX / innerWidth - 0.5) * 2)
    mouseY.set((clientY / innerHeight - 0.5) * 2)
  }, [mouseX, mouseY])

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })

  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.3])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Auto-advance slideshow with Ken Burns
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Stats
  const stats = useMemo(() => [
    { value: 400, suffix: ' m²', label: 'Superficie massima', icon: Home },
    { value: 120, suffix: '', label: 'Giorni realizzazione', icon: Clock },
    { value: 30, suffix: ' anni', label: 'Garanzia struttura', icon: Shield },
    { value: 100, suffix: '%', label: 'Personalizzazione', icon: Sparkles }
  ], [])

  return (
    <main className="min-h-screen bg-[#FFFCF7] overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* ============================================ */}
      {/* 1. HERO CINEMATOGRAFICO */}
      {/* ============================================ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Slideshow with Ken Burns */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            style={{ scale: heroImageScale }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{
                scale: [1, 1.1],
                x: [0, currentSlide % 2 === 0 ? 20 : -20],
                y: [0, currentSlide % 2 === 0 ? -10 : 10]
              }}
              transition={{ duration: 6, ease: 'linear' }}
            >
              <Image
                src={heroImages[currentSlide]}
                alt="Luxury Villa"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Morphing gradient background */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              `linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(30,61,48,0.8) 100%)`,
              `linear-gradient(225deg, rgba(0,0,0,0.5) 0%, rgba(30,61,48,0.9) 100%)`,
              `linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(30,61,48,0.8) 100%)`
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Floating villa images with mouse parallax */}
        {floatingVillaImages.map((img, i) => (
          <FloatingImage
            key={i}
            src={img.src}
            position={img.position}
            size={img.size}
            mouseX={smoothMouseX}
            mouseY={smoothMouseY}
            intensity={20 + i * 10}
          />
        ))}

        {/* Gold particle field */}
        <ParticleField
          particleCount={40}
          color="rgba(212, 175, 55, 0.6)"
          maxRadius={3}
          connectionDistance={120}
          lineOpacity={0.15}
          className="opacity-70"
        />

        {/* Animated gradient orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full"
            style={{
              background: `radial-gradient(circle, ${luxuryPalette.primary}30 0%, transparent 70%)`,
              filter: 'blur(100px)'
            }}
            animate={{
              x: [0, 60, -40, 0],
              y: [0, -50, 40, 0],
              scale: [1, 1.2, 0.9, 1]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] rounded-full"
            style={{
              background: `radial-gradient(circle, ${luxuryPalette.gold}25 0%, transparent 70%)`,
              filter: 'blur(100px)'
            }}
            animate={{
              x: [0, -50, 60, 0],
              y: [0, 40, -50, 0],
              scale: [1, 0.9, 1.15, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 max-w-5xl mx-auto px-4 text-center"
          style={{ opacity: heroOpacity }}
        >
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-10"
          >
            <Link
              href="/tipologie"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
            >
              <motion.span className="inline-block" whileHover={{ x: -5 }}>
                <ArrowLeft className="w-4 h-4" />
              </motion.span>
              <span>Tutte le tipologie</span>
            </Link>
          </motion.div>

          {/* Gold Badge with pulsing glow */}
          <GoldBadge>
            <div className="flex items-center gap-2">
              <Diamond className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-white text-sm font-medium tracking-wider">RESIDENZIALE PREMIUM</span>
            </div>
          </GoldBadge>

          {/* Title with enhanced stagger */}
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold text-white mt-8 mb-6 leading-none">
            <StaggerText text="Luxury" />
          </h1>

          {/* Typing effect subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto leading-relaxed h-[2em]"
          >
            <TypingText text="Ville esclusive dove il lusso incontra la sostenibilita" />
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
          >
            <motion.a
              href="/contatti"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-2xl transition-all relative overflow-hidden group"
              style={{
                background: `linear-gradient(135deg, ${luxuryPalette.gold}, ${luxuryPalette.primary})`,
                color: 'white'
              }}
              whileHover={{ scale: 1.02, boxShadow: '0 10px 40px rgba(212, 175, 55, 0.4)' }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Ripple effect */}
              <motion.span
                className="absolute inset-0 bg-white/20"
                initial={{ scale: 0, opacity: 0.5 }}
                whileHover={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.6 }}
                style={{ borderRadius: '50%', transformOrigin: 'center' }}
              />
              <span className="relative z-10">Consulenza Privata</span>
            </motion.a>
            <motion.a
              href="tel:+390963195139"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white font-semibold rounded-2xl border-2 border-[#D4AF37]/40 hover:bg-[#D4AF37]/10 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone className="w-5 h-5" />
              Chiama Ora
            </motion.a>
          </motion.div>

          {/* Slide indicators with animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="flex gap-2 justify-center mt-12"
          >
            {heroImages.map((_, i) => (
              <button
                key={i}
                className="relative h-2 rounded-full transition-all duration-300 overflow-hidden"
                style={{
                  width: i === currentSlide ? 32 : 8,
                  backgroundColor: i === currentSlide ? luxuryPalette.gold : 'rgba(255,255,255,0.3)'
                }}
                onClick={() => setCurrentSlide(i)}
              >
                {i === currentSlide && (
                  <motion.div
                    className="absolute inset-0 bg-white/30"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 6, ease: 'linear' }}
                  />
                )}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <ScrollIndicator />
      </section>

      {/* Transition */}
      <SectionDivider from="#1E3D30" to="#FAF7F2" height="150px" />

      {/* ============================================ */}
      {/* 2. INTRO ESCLUSIVA */}
      {/* ============================================ */}
      <section className="py-20 lg:py-28 px-4 bg-[#FAF7F2] relative overflow-hidden">
        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-20 left-10 w-8 h-8 hidden lg:block"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Diamond className="w-full h-full" style={{ color: `${luxuryPalette.gold}40` }} />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-16 w-6 h-6 hidden lg:block"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -360]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        >
          <Sparkles className="w-full h-full" style={{ color: `${luxuryPalette.primary}40` }} />
        </motion.div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
          >
            {/* Decorative line that expands from center */}
            <motion.div
              className="w-24 h-1 mx-auto mb-8 rounded-full overflow-hidden"
              style={{ background: `linear-gradient(90deg, ${luxuryPalette.primary}, ${luxuryPalette.gold})` }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: 0.2 }}
            />

            <h2 className="text-3xl md:text-5xl font-bold text-[#1E3D30] mb-8">
              <SplitText text="Il lusso incontra la sostenibilita" />
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.5 }}
              className="text-lg md:text-xl text-[#6B6560] leading-relaxed max-w-3xl mx-auto mb-12"
            >
              {tipologia.extendedDescription || 'Le nostre Luxury Villas rappresentano l\'apice dell\'abitare contemporaneo: architettura d\'autore, materiali pregiati e tecnologie all\'avanguardia si fondono in dimore uniche, progettate su misura per chi non accetta compromessi.'}
            </motion.p>

            {/* Animated counter */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.7 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
              style={{
                background: `linear-gradient(135deg, ${luxuryPalette.gold}15, ${luxuryPalette.primary}10)`,
                border: `1px solid ${luxuryPalette.gold}30`
              }}
            >
              <Users className="w-5 h-5" style={{ color: luxuryPalette.gold }} />
              <span className="text-[#1E3D30] font-semibold">
                Oltre <AnimatedCounter value={500} className="font-bold" style={{ color: luxuryPalette.primary }} /> clienti soddisfatti
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 3. L'ARTE DEL LUSSO - MARQUEE */}
      {/* ============================================ */}
      <section className="py-16 lg:py-24 bg-[#1E3D30] relative overflow-hidden">
        {/* Title overlay with glassmorphism */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            className="px-8 py-6 rounded-2xl"
            style={{
              background: 'rgba(30, 61, 48, 0.8)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${luxuryPalette.gold}30`
            }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white text-center">
              L&apos;Arte del <span style={{ color: luxuryPalette.gold }}>Lusso</span>
            </h2>
          </motion.div>
        </div>

        {/* Double marquee - opposite directions */}
        <div className="space-y-4 opacity-70">
          <InfiniteMarquee images={marqueeImages} direction="left" speed={40} />
          <InfiniteMarquee images={[...marqueeImages].reverse()} direction="right" speed={45} />
        </div>
      </section>

      {/* Transition */}
      <SectionDivider from="#1E3D30" to="#FAF7F2" height="100px" />

      {/* ============================================ */}
      {/* 4. GALLERY PREMIUM */}
      {/* ============================================ */}
      <section className="py-16 lg:py-24 px-4 md:px-8 bg-[#FAF7F2]">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-center mb-12"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
              style={{
                background: `${luxuryPalette.gold}15`,
                color: luxuryPalette.primary
              }}
            >
              Portfolio Esclusivo
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1E3D30] mb-4">
              52 Ville Disponibili
            </h2>
            <p className="text-[#6B6560] text-lg">Esplora la nostra collezione di residenze d&apos;eccellenza</p>
          </motion.div>

          <FloatingGallery3D />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3 }}
            className="text-center text-[#6B6560] mt-8 flex items-center justify-center gap-2"
          >
            <Diamond className="w-4 h-4" style={{ color: luxuryPalette.gold }} />
            Esplora le nostre creazioni - muovi il mouse e clicca per ingrandire
            <Diamond className="w-4 h-4" style={{ color: luxuryPalette.gold }} />
          </motion.p>
        </div>
      </section>

      {/* Transition */}
      <SectionDivider from="#FAF7F2" to="#FFFFFF" height="100px" />

      {/* ============================================ */}
      {/* 5. PROCESSO TIMELINE */}
      {/* ============================================ */}
      <section className="py-20 lg:py-28 px-4 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-center mb-16"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
              style={{
                background: `${luxuryPalette.gold}15`,
                color: luxuryPalette.primary
              }}
            >
              Il Percorso
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1E3D30] mb-4">
              Da Sogno a Realta
            </h2>
            <p className="text-[#6B6560] text-lg">Un processo curato in ogni dettaglio</p>
          </motion.div>

          {/* Timeline */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {processSteps.map((step, i) => (
              <ProcessStepCard
                key={i}
                step={step}
                index={i}
                isActive={true}
                totalSteps={processSteps.length}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Transition */}
      <SectionDivider from="#FFFFFF" to="#FAF7F2" height="100px" />

      {/* ============================================ */}
      {/* 6. STATS LUXURY */}
      {/* ============================================ */}
      <section className="py-20 lg:py-28 px-4 bg-[#FAF7F2] relative overflow-hidden">
        {/* Animated noise texture overlay */}
        <motion.div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          }}
          animate={{
            x: [0, 10, 0],
            y: [0, -10, 0]
          }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#1E3D30] mb-4">
              Numeri che Parlano
            </h2>
            <p className="text-[#6B6560] text-lg">Standard di eccellenza senza compromessi</p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, i) => (
              <StatCard
                key={i}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                delay={i * 0.1}
                icon={stat.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Transition */}
      <SectionDivider from="#FAF7F2" to="#FFFFFF" height="100px" />

      {/* ============================================ */}
      {/* 7. COMPARAZIONE MATERIALI */}
      {/* ============================================ */}
      <section className="py-20 lg:py-28 px-4 bg-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-center mb-16"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
              style={{
                background: `${luxuryPalette.gold}15`,
                color: luxuryPalette.primary
              }}
            >
              Qualita Senza Compromessi
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1E3D30] mb-4">
              Standard vs <span style={{ color: luxuryPalette.gold }}>Luxury</span>
            </h2>
            <p className="text-[#6B6560] text-lg">Scopri la differenza nei materiali e nelle finiture</p>
          </motion.div>

          {/* Comparison cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Standard */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              className="p-8 rounded-3xl bg-gray-50 border border-gray-200"
            >
              <h3 className="text-2xl font-bold text-gray-400 mb-6">Standard</h3>
              <div className="space-y-1">
                {materialsComparison.standard.map((item, i) => (
                  <ComparisonItem key={i} text={item} isLuxury={false} delay={i * 0.1} />
                ))}
              </div>
            </motion.div>

            {/* Luxury */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              className="p-8 rounded-3xl relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${luxuryPalette.gold}10, ${luxuryPalette.primary}05)`,
                border: `2px solid ${luxuryPalette.gold}40`
              }}
            >
              {/* Glow effect */}
              <motion.div
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${luxuryPalette.gold}30 0%, transparent 70%)`
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              <div className="flex items-center gap-3 mb-6">
                <Diamond className="w-6 h-6" style={{ color: luxuryPalette.gold }} />
                <h3 className="text-2xl font-bold" style={{ color: luxuryPalette.primary }}>Luxury</h3>
              </div>
              <div className="space-y-1">
                {materialsComparison.luxury.map((item, i) => (
                  <ComparisonItem key={i} text={item} isLuxury={true} delay={i * 0.1} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Transition */}
      <SectionDivider from="#FFFFFF" to="#FAF7F2" height="100px" />

      {/* ============================================ */}
      {/* 8. FEATURES BENTO GRID */}
      {/* ============================================ */}
      <section className="py-20 lg:py-28 px-4 bg-[#FAF7F2] relative overflow-hidden">
        <SpotlightCard className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-center mb-16"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
              style={{
                background: `${luxuryPalette.gold}15`,
                color: luxuryPalette.primary
              }}
            >
              Caratteristiche
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1E3D30] mb-4">
              Eccellenza in Ogni Dettaglio
            </h2>
            <p className="text-[#6B6560] text-lg">Standard luxury per una vita senza compromessi</p>
          </motion.div>

          <BentoGrid>
            {luxuryFeatures.map((feature, i) => {
              const Icon = featureIcons[feature] || Sparkles
              const size = i === 0 || i === 5 ? 'large' : 'medium'
              const descriptions: Record<string, string> = {
                'Finiture premium personalizzate': 'Marmi pregiati, legni esotici e metalli nobili selezionati dai migliori artigiani europei per ogni superficie.',
                'Certificazioni top di gamma': 'Classe energetica A4, certificazione LEED Platinum e materiali a zero emissioni per il massimo comfort.'
              }

              return (
                <BentoFeatureCard
                  key={i}
                  icon={<Icon className="w-full h-full" />}
                  title={feature}
                  description={descriptions[feature]}
                  size={size}
                  color={luxuryPalette.primary}
                  delay={i * 0.1}
                  gradient={`linear-gradient(135deg, ${luxuryPalette.gold}08 0%, transparent 60%)`}
                />
              )
            })}
          </BentoGrid>
        </SpotlightCard>
      </section>

      {/* Transition */}
      <SectionDivider from="#FAF7F2" to="#1E3D30" height="150px" />

      {/* ============================================ */}
      {/* 9. TESTIMONIAL PREMIUM */}
      {/* ============================================ */}
      <section className="py-20 lg:py-28 px-4 bg-[#1E3D30] relative overflow-hidden">
        {/* Animated gradient mesh background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute w-[800px] h-[800px] rounded-full"
            style={{
              background: `radial-gradient(circle, ${luxuryPalette.gold}20 0%, transparent 60%)`,
              top: '-20%',
              left: '-10%'
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: `radial-gradient(circle, ${luxuryPalette.primary}15 0%, transparent 60%)`,
              bottom: '-10%',
              right: '-5%'
            }}
            animate={{
              x: [0, -80, 0],
              y: [0, -40, 0]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Cosa Dicono i <span style={{ color: luxuryPalette.gold }}>Nostri Clienti</span>
            </h2>
            <p className="text-white/60 text-lg">Esperienze di chi ha scelto l&apos;eccellenza</p>
          </motion.div>

          {/* Testimonial carousel */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <TestimonialCard
                  testimonial={testimonials[currentTestimonial]}
                  isActive={true}
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <motion.button
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: `${luxuryPalette.gold}20`,
                  border: `1px solid ${luxuryPalette.gold}40`
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              >
                <ChevronLeft className="w-5 h-5" style={{ color: luxuryPalette.gold }} />
              </motion.button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: i === currentTestimonial ? luxuryPalette.gold : 'rgba(255,255,255,0.3)',
                      transform: i === currentTestimonial ? 'scale(1.5)' : 'scale(1)'
                    }}
                    onClick={() => setCurrentTestimonial(i)}
                  />
                ))}
              </div>

              <motion.button
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: `${luxuryPalette.gold}20`,
                  border: `1px solid ${luxuryPalette.gold}40`
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
              >
                <ChevronRight className="w-5 h-5" style={{ color: luxuryPalette.gold }} />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Transition */}
      <SectionDivider from="#1E3D30" to="#FAF7F2" height="150px" />

      {/* ============================================ */}
      {/* 10. BENEFITS PARALLAX */}
      {/* ============================================ */}
      <section className="py-20 lg:py-28 px-4 bg-[#FAF7F2] relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#1E3D30] mb-4">
              L&apos;Esperienza{' '}
              <span style={{ color: luxuryPalette.gold }}>Luxury</span>
            </h2>
            <p className="text-[#6B6560] text-lg">Vantaggi esclusivi per chi sceglie l&apos;eccellenza</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {luxuryBenefits.map((benefit, i) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="group relative"
                >
                  {/* Connecting line decoration */}
                  {i < luxuryBenefits.length - 1 && i % 2 === 0 && (
                    <motion.div
                      className="absolute -bottom-3 left-1/2 w-[2px] h-6 hidden md:block"
                      style={{ backgroundColor: `${luxuryPalette.gold}30` }}
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: false }}
                      transition={{ delay: i * 0.15 + 0.3 }}
                    />
                  )}

                  <motion.div
                    className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${luxuryPalette.gold}40, transparent 50%, ${luxuryPalette.gold}20)`,
                    }}
                  />

                  <div className="relative p-8 md:p-10 bg-white rounded-3xl border border-[#E5E5E5] group-hover:border-transparent transition-all duration-500 shadow-sm group-hover:shadow-xl">
                    <motion.div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                      style={{ backgroundColor: `${luxuryPalette.gold}15` }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      >
                        <Icon className="w-8 h-8" style={{ color: luxuryPalette.gold }} />
                      </motion.div>
                    </motion.div>

                    <h3 className="text-2xl font-bold text-[#1E3D30] mb-4">{benefit.title}</h3>
                    <p className="text-[#6B6560] leading-relaxed text-lg">{benefit.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Transition */}
      <SectionDivider from="#FAF7F2" to="#FFFCF7" height="100px" />

      {/* ============================================ */}
      {/* 12. CTA FINALE */}
      {/* ============================================ */}
      <section className="py-20 lg:py-32 px-4 bg-[#FFFCF7] relative overflow-hidden">
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                backgroundColor: luxuryPalette.gold,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3
              }}
            />
          ))}
        </div>

        <GlowEffect
          color={luxuryPalette.primary}
          secondaryColor={luxuryPalette.gold}
          intensity="high"
          className="max-w-4xl mx-auto"
        >
          <div className="text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
            >
              {/* Urgency indicator with animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
                style={{
                  background: `${luxuryPalette.gold}20`,
                  color: luxuryPalette.gold,
                  border: `1px solid ${luxuryPalette.gold}40`
                }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: luxuryPalette.gold }}
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                Solo 12 progetti all&apos;anno
              </motion.div>

              {/* Title with animated gradient */}
              <h2 className="text-4xl md:text-6xl font-bold text-[#1E3D30] mb-6 leading-tight">
                La tua villa dei sogni<br />
                <motion.span
                  style={{
                    background: `linear-gradient(135deg, ${luxuryPalette.primary}, ${luxuryPalette.gold}, ${luxuryPalette.primary})`,
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                >
                  ti aspetta
                </motion.span>
              </h2>

              <p className="text-[#6B6560] text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
                Prenota una consulenza privata con i nostri architetti. Ogni progetto e un&apos;opera unica, realizzata su misura per te.
              </p>

              {/* CTA Buttons with ripple effect */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div className="relative">
                  <ShimmerButton href="/contatti" variant="primary">
                    <span
                      className="relative z-10 flex items-center gap-2"
                      style={{
                        background: `linear-gradient(135deg, ${luxuryPalette.gold}, ${luxuryPalette.primary})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      Consulenza Privata
                    </span>
                  </ShimmerButton>
                </motion.div>

                <motion.a
                  href="tel:+390963195139"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-2xl transition-all relative overflow-hidden group"
                  style={{
                    background: 'transparent',
                    color: luxuryPalette.primary,
                    border: `2px solid ${luxuryPalette.primary}`
                  }}
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: luxuryPalette.primary,
                    color: 'white'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone className="w-5 h-5" />
                  Chiama Ora
                </motion.a>
              </div>

              {/* Back to tipologie */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.4 }}
                className="mt-16"
              >
                <Link
                  href="/tipologie"
                  className="inline-flex items-center gap-2 text-[#6B6560] hover:text-[#1E3D30] transition-colors group"
                >
                  <motion.span className="inline-block" whileHover={{ x: -5 }}>
                    <ArrowLeft className="w-4 h-4" />
                  </motion.span>
                  <span>Vedi tutte le tipologie</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </GlowEffect>
      </section>

    </main>
  )
}
