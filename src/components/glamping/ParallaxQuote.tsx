'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

interface ParallaxQuoteProps {
  color: string
}

export default function ParallaxQuote({ color }: ParallaxQuoteProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1])
  const textY = useTransform(scrollYProgress, [0.2, 0.8], ['30px', '-30px'])
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0])
  const lineScale = useTransform(scrollYProgress, [0.2, 0.5], [0, 1])

  return (
    <section
      ref={containerRef}
      className="relative h-[70vh] md:h-[80vh] overflow-hidden"
    >
      {/* Parallax Background Image */}
      <motion.div
        className="absolute inset-0"
        style={{ y: imageY, scale: imageScale }}
      >
        <Image
          src="/images/glamping/glamping-single-moody.webp"
          alt="Glamping A-frame al tramonto"
          fill
          className="object-cover"
          quality={85}
          sizes="100vw"
        />
      </motion.div>

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/50" />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.4) 100%)'
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center"
        style={{ y: textY, opacity: textOpacity }}
      >
        {/* Decorative line above */}
        <motion.div
          className="w-16 h-[2px] rounded-full mb-8"
          style={{
            backgroundColor: '#C4704B',
            scaleX: lineScale,
          }}
        />

        {/* Quote */}
        <blockquote className="max-w-3xl mx-auto">
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white leading-snug md:leading-tight tracking-tight">
            &ldquo;Il lusso non è avere di più,{' '}
            <span className="font-medium" style={{ color: '#C4704B' }}>
              è vivere meglio
            </span>
            &mdash;a contatto con la natura.&rdquo;
          </p>
        </blockquote>

        {/* Decorative line below */}
        <motion.div
          className="w-16 h-[2px] rounded-full mt-8"
          style={{
            backgroundColor: '#C4704B',
            scaleX: lineScale,
          }}
        />

        {/* Attribution */}
        <motion.p
          className="mt-6 text-white/40 text-sm uppercase tracking-[0.2em]"
        >
          Filosofia Ecolive
        </motion.p>
      </motion.div>
    </section>
  )
}
