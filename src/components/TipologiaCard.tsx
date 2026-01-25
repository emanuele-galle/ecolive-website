'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Tipologia } from '@/data/tipologie'

interface TipologiaCardProps {
  tipologia: Tipologia
  index: number
}

export default function TipologiaCard({ tipologia, index }: TipologiaCardProps) {
  const Icon = tipologia.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link href={tipologia.href} className="block group">
        <div className="relative bg-white rounded-3xl overflow-hidden border border-[#E8E0D5] shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
          {/* Image Container */}
          <div className="relative h-64 overflow-hidden">
            <Image
              src={tipologia.imageUrl}
              alt={tipologia.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span
                className="px-3 py-1.5 text-xs font-semibold tracking-wider text-white rounded-full"
                style={{ backgroundColor: tipologia.color }}
              >
                {tipologia.category}
              </span>
            </div>

            {/* Icon Badge */}
            <div
              className="absolute top-4 right-4 w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-sm"
              style={{ backgroundColor: `${tipologia.color}40` }}
            >
              <Icon className="w-6 h-6 text-white" />
            </div>

            {/* Surface Range on Image */}
            <div className="absolute bottom-4 left-4">
              <span className="text-white/90 text-sm font-medium">
                {tipologia.surfaceRange}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-2xl font-bold text-[#1E3D30] mb-2 group-hover:text-[var(--color-primary)] transition-colors">
              {tipologia.title}
            </h3>
            <p className="text-[#6B6560] text-sm leading-relaxed mb-4">
              {tipologia.description}
            </p>

            {/* Features Preview */}
            <div className="flex flex-wrap gap-2 mb-4">
              {tipologia.features.slice(0, 3).map((feature, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-xs rounded-lg bg-[#FAF7F2] text-[#6B6560]"
                >
                  {feature}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div
              className="flex items-center gap-2 font-semibold transition-all group-hover:gap-3"
              style={{ color: tipologia.color }}
            >
              <span>Scopri di piu</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
