'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import type { Project, Media } from '@/payload-types'

interface Props {
  projects: Project[]
}

export default function ProjectsGrid({ projects }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 lg:py-28 px-4 bg-[#FAF7F2] relative overflow-hidden">
      {/* Decorative blurs - solo ultrawide */}
      <div className="hidden 3xl:block absolute top-20 -left-40 w-[500px] h-[500px] bg-[#C4704B]/6 rounded-full blur-3xl" />
      <div className="hidden 3xl:block absolute bottom-20 -right-40 w-[450px] h-[450px] bg-[#2D5A47]/6 rounded-full blur-3xl" />

      <div className="max-w-6xl 3xl:max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:justify-between md:items-end mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div>
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-[#2D5A47] bg-[#2D5A47]/10 rounded-full">
              Portfolio
            </span>
            <h2 className="font-inter text-3xl sm:text-4xl font-bold text-[#2C2825]">
              Le Nostre <span className="text-[#C4704B]">Realizzazioni</span>
            </h2>
          </div>
          <Link
            href="/tipologie"
            className="hidden md:inline-flex items-center gap-2 text-[#2C2825] font-semibold mt-4 md:mt-0 group hover:text-[#C4704B] transition-colors"
          >
            Tutte le Tipologie
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Grid 2x2 */}
        <motion.div
          className="grid md:grid-cols-2 3xl:grid-cols-3 gap-6 lg:gap-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {projects.slice(0, 6).map((project, index) => {
            const featuredImage = project.featuredImage as Media
            const imageUrl = featuredImage?.url || ''

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * index, duration: 0.8 }}
              >
                <Link
                  href={`/progetti/${project.slug}`}
                  className="group block relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#E8E0D5]"
                >
                  {/* Image */}
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[#8B7355]/30 text-6xl font-inter">E</span>
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C2825]/80 via-[#2C2825]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    {project.location && (
                      <div className="flex items-center gap-1.5 text-white/70 text-sm mb-2">
                        <MapPin className="w-4 h-4" />
                        {project.location}
                      </div>
                    )}
                    <h3 className="text-xl lg:text-2xl font-bold text-white font-inter group-hover:text-[#D4896A] transition-colors">
                      {project.title}
                    </h3>
                    <div className="mt-3 flex items-center gap-2 text-[#C4704B] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-sm font-medium">Scopri il progetto</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Category badge */}
                  {project.category && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-[#C4704B] text-white text-xs font-semibold rounded-full">
                      {project.category}
                    </div>
                  )}
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Mobile CTA */}
        <motion.div
          className="text-center mt-10 md:hidden"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Link
            href="/tipologie"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#2C2825] text-white rounded-xl font-semibold"
          >
            Tutte le Tipologie
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
