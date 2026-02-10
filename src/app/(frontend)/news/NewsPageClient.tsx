'use client'

import Link from 'next/link'
import { NewsCardPremium } from '@/components/NewsCardPremium'
import type { News } from '@/payload-types'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import BlurText from '@/components/ui/BlurText'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionTransition from '@/components/ui/SectionTransition'
import InfiniteMarquee from '@/components/ui/InfiniteMarquee'

interface NewsPageClientProps {
  articles: News[]
  selectedTag?: string
  currentPage: number
  totalPages: number
  tagLabels: Record<string, string>
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

  const categoryNames = Object.values(tagLabels)

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#1E3D30] py-28 lg:py-36 px-4">
        {/* Subtle decorative elements */}
        <div className="absolute top-16 right-20 w-2 h-2 rounded-full bg-[#C4704B]/25" />
        <div className="absolute bottom-20 left-16 w-1.5 h-1.5 rounded-full bg-white/10" />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <ScrollReveal>
            <span className="inline-block px-4 py-2 mb-8 text-sm font-semibold text-[#C4704B] bg-white/10 rounded-full border border-[#C4704B]/30">
              Blog & Approfondimenti
            </span>
          </ScrollReveal>

          <BlurText
            text="News & Novita"
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8"
            delay={100}
            animateBy="words"
            direction="bottom"
          />

          <ScrollReveal delay={0.2}>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Scopri le ultime novita dal mondo della bioedilizia
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* MARQUEE CATEGORIES */}
      {categoryNames.length > 0 && (
        <div className="bg-white py-4 border-b border-[#DDD5C9]/50">
          <InfiniteMarquee
            items={categoryNames}
            speed={20}
            className="text-[#1E3D30]/50"
          />
        </div>
      )}

      {/* Filter Bar */}
      <section className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-[#DDD5C9]/50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              href="/news"
              className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                !selectedTag
                  ? 'bg-[#1E3D30] text-white shadow-md'
                  : 'bg-[#FAF7F2] text-[#6B6560] hover:bg-[#1E3D30]/10 border border-[#DDD5C9]'
              }`}
            >
              Tutti
            </Link>
            {Object.entries(tagLabels).map(([value, label]) => (
              <Link
                key={value}
                href={`/news?tag=${value}`}
                className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                  selectedTag === value
                    ? 'bg-[#1E3D30] text-white shadow-md'
                    : 'bg-[#FAF7F2] text-[#6B6560] hover:bg-[#1E3D30]/10 border border-[#DDD5C9]'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SectionTransition from="#FFFFFF" to="#FAF7F2" variant="wave" height={60} />

      {/* Articles Section */}
      <section className="py-20 lg:py-28 px-4 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto">
          {articles.length === 0 ? (
            <ScrollReveal>
              <div className="text-center py-20">
                <p className="text-xl text-[#6B6560]">
                  Nessun articolo trovato per questa categoria.
                </p>
              </div>
            </ScrollReveal>
          ) : (
            <>
              {/* Featured Article */}
              {featuredArticle && currentPage === 1 && (
                <ScrollReveal className="mb-14">
                  <NewsCardPremium article={featuredArticle} featured />
                </ScrollReveal>
              )}

              {/* Regular Articles Grid */}
              {regularArticles.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {regularArticles.map((article, index) => (
                    <ScrollReveal
                      key={article.id}
                      delay={index * 0.08}
                      direction="up"
                    >
                      <NewsCardPremium article={article} />
                    </ScrollReveal>
                  ))}
                </div>
              )}

              {/* Only featured on page 1 */}
              {currentPage === 1 && regularArticles.length === 0 && articles.length === 1 && (
                <ScrollReveal>
                  <div className="text-center py-12">
                    <p className="text-[#6B6560]">Altri articoli in arrivo...</p>
                  </div>
                </ScrollReveal>
              )}
            </>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <ScrollReveal>
              <div className="flex justify-center items-center gap-2 mt-16">
                {currentPage > 1 && (
                  <Link
                    href={`/news?${selectedTag ? `tag=${selectedTag}&` : ''}page=${currentPage - 1}`}
                    className="flex items-center gap-1 px-5 py-2.5 rounded-xl bg-white text-[#1E3D30] font-medium hover:bg-[#1E3D30] hover:text-white transition-all duration-300 border border-[#DDD5C9] shadow-sm"
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
                          ? 'bg-[#1E3D30] text-white shadow-md'
                          : 'bg-white text-[#6B6560] hover:bg-[#1E3D30]/10 border border-[#DDD5C9]'
                      }`}
                    >
                      {page}
                    </Link>
                  ))}
                </div>

                {currentPage < totalPages && (
                  <Link
                    href={`/news?${selectedTag ? `tag=${selectedTag}&` : ''}page=${currentPage + 1}`}
                    className="flex items-center gap-1 px-5 py-2.5 rounded-xl bg-white text-[#1E3D30] font-medium hover:bg-[#1E3D30] hover:text-white transition-all duration-300 border border-[#DDD5C9] shadow-sm"
                  >
                    Successivo
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>
    </main>
  )
}
