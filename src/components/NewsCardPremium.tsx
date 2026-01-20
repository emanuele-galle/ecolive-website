'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Clock, ArrowRight } from 'lucide-react'
import type { News, Media } from '@/payload-types'
import { calculateReadingTime } from '@/lib/reading-time'

interface NewsCardPremiumProps {
  article: News
  featured?: boolean
  index?: number
}

const tagLabels: Record<string, string> = {
  bioedilizia: 'Bioedilizia',
  sostenibilita: 'Sostenibilita',
  innovazione: 'Innovazione',
  progetti: 'Progetti',
  eventi: 'Eventi',
  normative: 'Normative',
}

const tagColors: Record<string, string> = {
  bioedilizia: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  sostenibilita: 'bg-green-500/20 text-green-300 border-green-500/30',
  innovazione: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  progetti: 'bg-[#C4704B]/20 text-[#E8956B] border-[#C4704B]/30',
  eventi: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  normative: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// Card animation variants
const cardVariants = {
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

export function NewsCardPremium({ article, featured = false, index = 0 }: NewsCardPremiumProps) {
  const image = article.featuredImage as Media | null | undefined
  const imageUrl = image?.sizes?.card?.url || image?.url || '/placeholder-news.jpg'
  const readingTime = calculateReadingTime(article.content as any)

  if (featured) {
    return (
      <motion.div
        variants={cardVariants}
        className="group relative"
      >
        <Link
          href={`/news/${article.slug}`}
          className="block overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E3D30] to-[#2D5A47] shadow-xl"
        >
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[400px] overflow-hidden">
              <Image
                src={imageUrl}
                alt={image?.alt || article.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E3D30]/80 via-transparent to-transparent lg:bg-gradient-to-r" />

              {/* Featured badge */}
              <motion.div
                className="absolute top-4 left-4 px-4 py-2 bg-[#C4704B] text-white text-sm font-semibold rounded-full shadow-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                In Evidenza
              </motion.div>

              {/* Reading time badge */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-black/40 backdrop-blur-sm text-white text-sm rounded-full">
                <Clock className="w-4 h-4" />
                {readingTime} min
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <time className="text-[#C4704B] text-sm font-medium mb-3">
                {formatDate(article.publishedDate)}
              </time>

              <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-[#E8956B] transition-colors duration-300">
                {article.title}
              </h2>

              {article.excerpt && (
                <p className="text-white/70 mb-6 line-clamp-3 text-base lg:text-lg leading-relaxed">
                  {article.excerpt}
                </p>
              )}

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${tagColors[tag] || 'bg-white/10 text-white/70 border-white/20'}`}
                    >
                      {tagLabels[tag] || tag}
                    </span>
                  ))}
                </div>
              )}

              {/* CTA */}
              <div className="flex items-center gap-2 text-[#C4704B] font-semibold group-hover:gap-4 transition-all duration-300">
                Leggi articolo
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    )
  }

  // Regular card
  return (
    <motion.div
      variants={cardVariants}
      className="group relative"
    >
      <Link
        href={`/news/${article.slug}`}
        className="block h-full"
      >
        <motion.div
          className="relative h-full overflow-hidden rounded-2xl bg-white shadow-md border border-gray-100"
          whileHover={{
            y: -8,
            boxShadow: '0 25px 50px -12px rgba(196, 112, 75, 0.15)',
            transition: { duration: 0.5 }
          }}
        >
          {/* Image container */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={imageUrl}
              alt={image?.alt || article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Hover gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-[#1E3D30]/80 via-[#1E3D30]/20 to-transparent"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />

            {/* Reading time badge */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/50 backdrop-blur-sm text-white text-xs rounded-full">
              <Clock className="w-3.5 h-3.5" />
              {readingTime} min
            </div>

            {/* Hover content */}
            <motion.div
              className="absolute bottom-3 left-3 right-3"
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 text-white text-sm font-medium">
                Leggi articolo
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-5">
            <time className="text-[#C4704B] text-xs font-medium mb-2 block">
              {formatDate(article.publishedDate)}
            </time>

            <h3 className="text-lg font-bold text-[#2C2825] mb-2 line-clamp-2 group-hover:text-[#C4704B] transition-colors duration-300">
              {article.title}
            </h3>

            {article.excerpt && (
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                {article.excerpt}
              </p>
            )}

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {article.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
                  >
                    {tagLabels[tag] || tag}
                  </span>
                ))}
                {article.tags.length > 2 && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                    +{article.tags.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Bottom accent border */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#C4704B] to-[#E8956B]"
            initial={{ width: 0 }}
            whileHover={{ width: '100%' }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      </Link>
    </motion.div>
  )
}
