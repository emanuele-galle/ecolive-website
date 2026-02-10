'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { NewsCardPremium } from '@/components/NewsCardPremium'
import type { News } from '@/payload-types'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import BlurText from '@/components/ui/BlurText'

interface NewsPageClientProps {
  articles: News[]
  selectedTag?: string
  currentPage: number
  totalPages: number
  tagLabels: Record<string, string>
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function NewsPageClient({
  articles,
  selectedTag,
  currentPage,
  totalPages,
  tagLabels,
}: NewsPageClientProps) {
  const featuredArticle = articles[0]
  const regularArticles = articles.slice(1)

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#1E3D30] py-24 lg:py-32 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.span
            className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-[#C4704B] bg-white/10 rounded-full border border-[#C4704B]/30"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Blog & Approfondimenti
          </motion.span>

          <BlurText
            text="News & Novita"
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            delay={100}
            animateBy="words"
            direction="bottom"
          />

          <motion.p
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Scopri le ultime novita dal mondo della bioedilizia
          </motion.p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-0 z-20 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              href="/news"
              className={`px-4 py-2 rounded-full font-medium text-sm transition-colors duration-200 ${
                !selectedTag
                  ? 'bg-[#1E3D30] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tutti
            </Link>
            {Object.entries(tagLabels).map(([value, label]) => (
              <Link
                key={value}
                href={`/news?tag=${value}`}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-colors duration-200 ${
                  selectedTag === value
                    ? 'bg-[#1E3D30] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-16 lg:py-20 px-4 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto">
          {articles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">
                Nessun articolo trovato per questa categoria.
              </p>
            </div>
          ) : (
            <>
              {/* Featured Article */}
              {featuredArticle && currentPage === 1 && (
                <motion.div
                  className="mb-12"
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <NewsCardPremium article={featuredArticle} featured />
                </motion.div>
              )}

              {/* Regular Articles Grid */}
              {regularArticles.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {regularArticles.map((article) => (
                    <motion.div
                      key={article.id}
                      variants={fadeIn}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <NewsCardPremium article={article} />
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Only featured on page 1 */}
              {currentPage === 1 && regularArticles.length === 0 && articles.length === 1 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">Altri articoli in arrivo...</p>
                </div>
              )}
            </>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              {currentPage > 1 && (
                <Link
                  href={`/news?${selectedTag ? `tag=${selectedTag}&` : ''}page=${currentPage - 1}`}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl bg-white text-[#1E3D30] font-medium hover:bg-gray-100 transition-colors duration-200"
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
                    className={`w-10 h-10 flex items-center justify-center rounded-xl font-medium transition-colors duration-200 ${
                      page === currentPage
                        ? 'bg-[#1E3D30] text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </Link>
                ))}
              </div>

              {currentPage < totalPages && (
                <Link
                  href={`/news?${selectedTag ? `tag=${selectedTag}&` : ''}page=${currentPage + 1}`}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl bg-white text-[#1E3D30] font-medium hover:bg-gray-100 transition-colors duration-200"
                >
                  Successivo
                  <ChevronRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
