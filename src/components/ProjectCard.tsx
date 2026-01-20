'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Project, Media } from '@/payload-types'
import { MapPin, Maximize2, Calendar, ArrowRight } from 'lucide-react'
import { useMouseTilt } from '@/lib/hooks/useMouseParallax'

interface ProjectCardProps {
  project: Project
}

const categoryLabels = {
  residenziale: 'Residenziale',
  bungalow: 'Bungalow',
  commerciale: 'Commerciale',
  ristrutturazione: 'Ristrutturazione',
} as const

export default function ProjectCard({ project }: ProjectCardProps) {
  const featuredImage = project.featuredImage as Media
  const imageUrl = featuredImage?.sizes?.card?.url || featuredImage?.url || '/placeholder.jpg'
  const imageAlt = featuredImage?.alt || project.title

  // 3D tilt effect
  const { ref, rotateX, rotateY, scale, handlers } = useMouseTilt({
    maxRotation: 6,
    scale: 1.02
  })

  return (
    <Link
      href={`/progetti/${project.slug}`}
      className="group block"
    >
      <motion.div
        ref={ref}
        className="relative overflow-hidden rounded-2xl bg-white shadow-premium hover:shadow-premium-xl transition-shadow duration-500"
        style={{
          rotateX,
          rotateY,
          scale,
          transformPerspective: 1000,
          transformStyle: 'preserve-3d'
        }}
        {...handlers}
      >
        {/* Image Container with 3D depth */}
        <motion.div
          className="relative aspect-[4/3] overflow-hidden"
          style={{ translateZ: 10 }}
        >
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-secondary-darker)]/90 via-[var(--color-secondary-darker)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Category Badge - Premium Style with depth */}
          <motion.div
            className="absolute top-4 left-4 z-10"
            style={{ translateZ: 30 }}
          >
            <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-white/95 backdrop-blur-sm text-[var(--color-secondary-dark)] shadow-lg">
              {categoryLabels[project.category]}
            </span>
          </motion.div>

          {/* Info reveal on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
            <div className="flex flex-wrap gap-4 text-white text-sm">
              {project.location && (
                <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <MapPin className="w-3.5 h-3.5" />
                  {project.location}
                </span>
              )}
              {project.area && (
                <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Maximize2 className="w-3.5 h-3.5" />
                  {project.area} mq
                </span>
              )}
              {project.year && (
                <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Calendar className="w-3.5 h-3.5" />
                  {project.year}
                </span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Content with 3D depth */}
        <motion.div
          className="p-6"
          style={{ translateZ: 20 }}
        >
          <h3 className="font-inter text-xl font-bold text-[var(--color-secondary-dark)] mb-3 group-hover:text-[var(--color-primary)] transition-colors duration-300 line-clamp-2">
            {project.title}
          </h3>

          {/* Meta info - visible when not hovering image */}
          <div className="flex items-center gap-4 text-sm text-[var(--color-muted)] mb-4">
            {project.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[var(--color-muted)]/60" />
                {project.location}
              </span>
            )}
            {project.area && (
              <span className="flex items-center gap-1.5">
                <Maximize2 className="w-4 h-4 text-[var(--color-muted)]/60" />
                {project.area} mq
              </span>
            )}
          </div>

          {/* CTA with depth */}
          <motion.div
            className="pt-4 border-t border-[var(--color-border)]"
            style={{ translateZ: 30 }}
          >
            <span className="inline-flex items-center gap-2 text-[var(--color-primary)] font-medium text-sm group-hover:gap-3 transition-all duration-300">
              Scopri il progetto
              <ArrowRight className="w-4 h-4" />
            </span>
          </motion.div>
        </motion.div>

        {/* Subtle glare effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.02) 100%)',
          }}
        />
      </motion.div>
    </Link>
  )
}
