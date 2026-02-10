'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Tipologia } from '@/data/tipologie'

interface BouncyTipologiaCardProps {
  tipologia: Tipologia
  index: number
}

export default function BouncyTipologiaCard({ tipologia, index }: BouncyTipologiaCardProps) {
  // Alternate rotation direction based on index
  const rotateDir = index % 2 === 0 ? '-1deg' : '1deg'
  const hoverRotate = index % 2 === 0 ? '2deg' : '-2deg'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link href={tipologia.href}>
        <motion.div
          whileHover={{ scale: 0.97, rotate: rotateDir }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="group relative min-h-[380px] cursor-pointer overflow-hidden rounded-3xl bg-slate-100 p-6"
          style={{ backgroundColor: `${tipologia.color}15` }}
        >
          {/* Category Badge */}
          <span
            className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full mb-3"
            style={{
              backgroundColor: `${tipologia.color}20`,
              color: tipologia.color
            }}
          >
            {tipologia.category}
          </span>

          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-bold text-[#1D1D1F] mb-2">
            {tipologia.title}
          </h3>

          {/* Description */}
          <p className="text-[#86868B] text-sm leading-relaxed max-w-[90%]">
            {tipologia.description}
          </p>

          {/* Surface Range */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-[#86868B]">Superficie:</span>
            <span
              className="text-sm font-semibold"
              style={{ color: tipologia.color }}
            >
              {tipologia.surfaceRange}
            </span>
          </div>

          {/* Bouncy Image Container */}
          <motion.div
            className="absolute bottom-0 left-4 right-4 top-44 translate-y-8 rounded-t-2xl p-1 transition-transform duration-300 ease-out group-hover:translate-y-4"
            style={{
              background: `linear-gradient(135deg, ${tipologia.color}90, ${tipologia.color})`
            }}
            whileHover={{ rotate: hoverRotate }}
          >
            {/* Inner card with image */}
            <div className="relative h-full w-full overflow-hidden rounded-t-xl bg-white">
              <Image
                src={tipologia.imageUrl}
                alt={tipologia.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />

              {/* Overlay gradient */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(180deg, transparent 50%, ${tipologia.color} 100%)`
                }}
              />

              {/* Arrow indicator */}
              <div
                className="absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                style={{ backgroundColor: tipologia.color }}
              >
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
