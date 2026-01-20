'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, MapPin, Leaf } from 'lucide-react'
import type { Project, Media } from '@/payload-types'

interface Props {
  projects: Project[]
}

export default function ProjectsShowcase({ projects }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8 }
    }
  }

  // Bento grid layout classes
  const gridClasses = [
    'md:col-span-2 md:row-span-2', // Large featured
    'md:col-span-1 md:row-span-1', // Small
    'md:col-span-1 md:row-span-1', // Small
  ]

  return (
    <section ref={ref} className="py-24 lg:py-32 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <div>
            <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-[#e85d04] bg-[#e85d04]/10 rounded-full">
              Portfolio
            </span>
            <h2 className="font-inter text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a2540]">
              Le Nostre <span className="text-[#e85d04]">Realizzazioni</span>
            </h2>
          </div>
          <Link
            href="/progetti"
            className="hidden md:inline-flex items-center gap-2 text-[#0a2540] font-semibold mt-4 md:mt-0 group"
          >
            Tutti i progetti
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-4 lg:gap-6 auto-rows-[200px] md:auto-rows-[220px]"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.slice(0, 3).map((project, index) => {
            const featuredImage = project.featuredImage as Media
            const imageUrl = featuredImage?.url || '/placeholder.jpg'

            return (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className={`${gridClasses[index]} group`}
              >
                <Link
                  href={`/progetti/${project.slug}`}
                  className="relative block w-full h-full rounded-3xl overflow-hidden"
                >
                  {/* Image with hover zoom */}
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.9 }}
                  >
                    {imageUrl !== '/placeholder.jpg' ? (
                      <img
                        src={imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#f8f9fa] to-[#e0e1dd] flex items-center justify-center">
                        <Leaf className="w-16 h-16 text-[#5c677d]/20" />
                      </div>
                    )}
                  </motion.div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#051923]/90 via-[#051923]/40 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                    {project.location && (
                      <motion.div
                        className="flex items-center gap-2 text-white/70 text-sm mb-2"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <MapPin className="w-4 h-4" />
                        {project.location}
                      </motion.div>
                    )}
                    <h3 className={`font-inter font-bold text-white ${index === 0 ? 'text-xl lg:text-2xl' : 'text-lg lg:text-xl'}`}>
                      {project.title}
                    </h3>

                    {/* Hover CTA */}
                    <motion.div
                      className="mt-3 flex items-center gap-2 text-[#e85d04] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <span className="font-medium text-sm">Scopri</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
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
          transition={{ delay: 0.6 }}
        >
          <Link
            href="/progetti"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0a2540] text-white rounded-full font-semibold"
          >
            Tutti i progetti
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
