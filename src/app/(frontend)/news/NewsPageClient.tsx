'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { NewsCardPremium } from '@/components/NewsCardPremium'
import type { News } from '@/payload-types'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface NewsPageClientProps {
  articles: News[]
  selectedTag?: string
  currentPage: number
  totalPages: number
  tagLabels: Record<string, string>
}

// Animation variants
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15
    }
  }
}

export default function NewsPageClient({
  articles,
  selectedTag,
  currentPage,
  totalPages,
  tagLabels
}: NewsPageClientProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: false })
  const gridInView = useInView(gridRef, { once: false, margin: "-100px" })

  const featuredArticle = articles[0]
  const regularArticles = articles.slice(1)

  return (
    <main className="min-h-screen">
      {/* Hero Section Premium */}
      <section
        ref={heroRef}
        className="relative py-24 lg:py-32 px-4 overflow-hidden"
      >
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'linear-gradient(135deg, #1E3D30 0%, #2D5A47 50%, #1E3D30 100%)',
              'linear-gradient(135deg, #2D5A47 0%, #1E3D30 50%, #2D5A47 100%)',
              'linear-gradient(135deg, #1E3D30 0%, #2D5A47 50%, #1E3D30 100%)',
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating shapes */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-[#C4704B]/10 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-96 h-96 bg-[#C4704B]/8 rounded-full blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
        />

        {/* Content */}
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.span
            className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-[#C4704B] bg-white/10 backdrop-blur-sm rounded-full border border-[#C4704B]/30"
            initial={{ opacity: 0, y: -20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9 }}
          >
            Blog & Approfondimenti
          </motion.span>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            News & <span className="text-[#C4704B]">Novita</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            Scopri le ultime novita, approfondimenti tecnici e storie dal mondo della bioedilizia
          </motion.p>
        </div>
      </section>

      {/* Filter Section Premium */}
      <section className="sticky top-0 z-20 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <motion.div
            className="flex flex-wrap gap-2 justify-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <Link
              href="/news"
              className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                !selectedTag
                  ? 'bg-[#1E3D30] text-white shadow-lg shadow-[#1E3D30]/20'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
              }`}
            >
              Tutti
            </Link>
            {Object.entries(tagLabels).map(([value, label]) => (
              <Link
                key={value}
                href={`/news?tag=${value}`}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                  selectedTag === value
                    ? 'bg-[#1E3D30] text-white shadow-lg shadow-[#1E3D30]/20'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                }`}
              >
                {label}
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-16 lg:py-20 px-4 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto" ref={gridRef}>
          {articles.length === 0 ? (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-xl text-gray-500">
                Nessun articolo trovato per questa categoria.
              </p>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={gridInView ? "visible" : "hidden"}
            >
              {/* Featured Article */}
              {featuredArticle && currentPage === 1 && (
                <motion.div className="mb-12" variants={itemVariants}>
                  <NewsCardPremium article={featuredArticle} featured />
                </motion.div>
              )}

              {/* Regular Articles Grid */}
              {regularArticles.length > 0 && (
                <motion.div
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                  variants={containerVariants}
                >
                  {regularArticles.map((article, index) => (
                    <NewsCardPremium
                      key={article.id}
                      article={article}
                      index={index}
                    />
                  ))}
                </motion.div>
              )}

              {/* If only featured article on page 1 */}
              {currentPage === 1 && regularArticles.length === 0 && articles.length === 1 && (
                <motion.div
                  className="text-center py-12"
                  variants={itemVariants}
                >
                  <p className="text-gray-500">Altri articoli in arrivo...</p>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Pagination Premium */}
          {totalPages > 1 && (
            <motion.div
              className="flex justify-center items-center gap-2 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              {currentPage > 1 && (
                <Link
                  href={`/news?${selectedTag ? `tag=${selectedTag}&` : ''}page=${currentPage - 1}`}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl bg-white text-[#1E3D30] font-medium hover:bg-gray-100 hover:shadow-md transition-all duration-300"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Precedente
                </Link>
              )}

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Link
                    key={page}
                    href={`/news?${selectedTag ? `tag=${selectedTag}&` : ''}page=${page}`}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl font-medium transition-all duration-300 ${
                      page === currentPage
                        ? 'bg-gradient-to-br from-[#C4704B] to-[#a85a3a] text-white shadow-lg shadow-[#C4704B]/30'
                        : 'bg-white text-gray-700 hover:bg-gray-100 hover:shadow-md'
                    }`}
                  >
                    {page}
                  </Link>
                ))}
              </div>

              {currentPage < totalPages && (
                <Link
                  href={`/news?${selectedTag ? `tag=${selectedTag}&` : ''}page=${currentPage + 1}`}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl bg-white text-[#1E3D30] font-medium hover:bg-gray-100 hover:shadow-md transition-all duration-300"
                >
                  Successivo
                  <ChevronRight className="w-4 h-4" />
                </Link>
              )}
            </motion.div>
          )}
        </div>
      </section>
    </main>
  )
}
