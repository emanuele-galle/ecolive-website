'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { Tipologia } from '@/data/tipologie'

interface Props {
  tipologia: Tipologia
  index: number
  total: number
  onDotClick?: (index: number) => void
}

export default function FullscreenTipologiaSection({ tipologia, index, total, onDotClick }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  // Effetti parallax
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1.15])

  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const
      }
    }
  }

  return (
    <section
      ref={sectionRef}
      id={`section-${tipologia.id}`}
      className="relative h-screen w-full overflow-hidden snap-start"
    >
      {/* Background Image con Parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y: imageY, scale: imageScale }}
      >
        <Image
          src={tipologia.heroImage}
          alt={tipologia.title}
          fill
          className="object-cover"
          priority={index === 0}
          sizes="100vw"
        />
      </motion.div>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, ${tipologia.color}E6 0%, ${tipologia.color}99 35%, ${tipologia.color}33 60%, transparent 100%)`
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-20 lg:pb-24 px-6 md:px-12 lg:px-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        {/* Badge */}
        <motion.span
          variants={itemVariants}
          className="inline-block w-fit px-4 py-1.5 mb-4 text-xs font-semibold tracking-[0.2em] uppercase bg-white/15 backdrop-blur-sm rounded-full text-white/90 border border-white/20"
        >
          {tipologia.category}
        </motion.span>

        {/* Title */}
        <motion.h2
          variants={itemVariants}
          className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-3 leading-[0.95]"
        >
          {tipologia.title}
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-white/80 max-w-xl mb-8 leading-relaxed"
        >
          {tipologia.description}
        </motion.p>

        {/* CTA */}
        <motion.div variants={itemVariants}>
          <Link href={tipologia.href}>
            <motion.button
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 font-semibold rounded-full overflow-hidden relative"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Scopri di più</span>
              <motion.span
                className="relative z-10"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
              >
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </motion.span>
              {/* Hover background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Progress Dots */}
      <div className="absolute right-6 md:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => onDotClick?.(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer hover:scale-125 ${
              i === index
                ? 'bg-white scale-125 shadow-lg'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Vai alla sezione ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator (solo se non ultima) */}
      {index < total - 1 && (
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8 text-white/50" />
        </motion.div>
      )}

      {/* Section number indicator */}
      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-20 text-white/30 font-bold text-lg z-10">
        <span className="text-white">{String(index + 1).padStart(2, '0')}</span>
        <span className="mx-2">/</span>
        <span>{String(total).padStart(2, '0')}</span>
      </div>
    </section>
  )
}
