'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'
import {
  Clock,
  Calendar,
  ChevronLeft,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
  Check,
  ChevronUp,
  MessageCircle
} from 'lucide-react'
import type { News, Media } from '@/payload-types'
import { calculateReadingTime, extractHeadings, type ExtractedHeading } from '@/lib/reading-time'
import { NewsCardPremium } from '@/components/NewsCardPremium'

interface ArticleClientProps {
  article: News
  relatedArticles: News[]
}

const tagLabels: Record<string, string> = {
  bioedilizia: 'Bioedilizia',
  sostenibilita: 'Sostenibilita',
  innovazione: 'Innovazione',
  progetti: 'Progetti',
  eventi: 'Eventi',
  normative: 'Normative',
}

function formatDateItalian(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
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
  hidden: { opacity: 0, y: 20 },
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

export default function ArticleClient({ article, relatedArticles }: ArticleClientProps) {
  const [copied, setCopied] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)

  const heroRef = useRef<HTMLDivElement>(null)
  const articleRef = useRef<HTMLElement>(null)
  const relatedRef = useRef<HTMLDivElement>(null)

  const relatedInView = useInView(relatedRef, { once: false, margin: "-100px" })

  // Parallax for hero
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  const heroY = useTransform(heroScrollProgress, [0, 1], [0, 150])
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.5], [1, 0.3])

  // Progress bar for article reading
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ["start start", "end end"]
  })

  // Show back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const featuredImage = typeof article.featuredImage !== 'number' ? article.featuredImage : null
  const readingTime = calculateReadingTime(article.content as any)
  const headings = extractHeadings(article.content as any)
  const articleUrl = typeof window !== 'undefined' ? window.location.href : ''

  // Share handlers
  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`, '_blank')
  }

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(article.title)}`, '_blank')
  }

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`, '_blank')
  }

  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(article.title + ' ' + articleUrl)}`, '_blank')
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen bg-[#FFFFFF]">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#A0845C] to-[#E8956B] z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero Image with Parallax */}
      {featuredImage && featuredImage.url && (
        <div ref={heroRef} className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
          <motion.div
            className="absolute -inset-x-0 -top-[75px] -bottom-[75px]"
            style={{ y: heroY }}
          >
            <Image
              src={featuredImage.url}
              alt={featuredImage.alt || article.title}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </motion.div>

          {/* Gradient overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-[#1D1D1F] via-[#1D1D1F]/50 to-transparent"
            style={{ opacity: heroOpacity }}
          />

          {/* Hero content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
              {/* Back link */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  href="/news"
                  className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-4 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Torna alle news
                </Link>
              </motion.div>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <motion.div
                  className="flex flex-wrap gap-2 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[#A0845C] text-white text-sm font-medium rounded-full"
                    >
                      {tagLabels[tag] || tag}
                    </span>
                  ))}
                </motion.div>
              )}

              {/* Title */}
              <motion.h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {article.title}
              </motion.h1>

              {/* Meta */}
              <motion.div
                className="flex flex-wrap items-center gap-4 text-white/70"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={article.publishedDate}>
                    {formatDateItalian(article.publishedDate)}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{readingTime} min di lettura</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}

      {/* Article Content with TOC */}
      <article ref={articleRef} className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-[1fr_280px] gap-12">
          {/* Main Content */}
          <div>
            {/* Excerpt */}
            {article.excerpt && (
              <motion.div
                className="text-xl text-gray-700 mb-8 pb-8 border-b border-gray-200 leading-relaxed font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {article.excerpt}
              </motion.div>
            )}

            {/* Rich Text Content */}
            <motion.div
              className="prose prose-lg max-w-none prose-headings:text-[#1D1D1F] prose-a:text-[#A0845C] prose-strong:text-[#2C2825]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <RichText data={article.content} />
            </motion.div>

            {/* Share Section */}
            <motion.div
              className="mt-12 pt-8 border-t border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Share2 className="w-5 h-5 text-gray-500" />
                <h3 className="font-semibold text-gray-700">Condividi questo articolo</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={shareOnFacebook}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#1877f2] text-white rounded-xl hover:bg-[#166fe5] transition-all hover:scale-105 text-sm font-medium"
                >
                  <Facebook className="w-4 h-4" />
                  Facebook
                </button>
                <button
                  onClick={shareOnTwitter}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#1da1f2] text-white rounded-xl hover:bg-[#1a94da] transition-all hover:scale-105 text-sm font-medium"
                >
                  <Twitter className="w-4 h-4" />
                  Twitter
                </button>
                <button
                  onClick={shareOnLinkedIn}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#0a66c2] text-white rounded-xl hover:bg-[#095196] transition-all hover:scale-105 text-sm font-medium"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </button>
                <button
                  onClick={shareOnWhatsApp}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#25d366] text-white rounded-xl hover:bg-[#20bd5a] transition-all hover:scale-105 text-sm font-medium"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </button>
                <button
                  onClick={copyLink}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all hover:scale-105 text-sm font-medium ${
                    copied
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
                  {copied ? 'Copiato!' : 'Copia link'}
                </button>
              </div>
            </motion.div>

            {/* Author Bio Premium */}
            <motion.div
              className="mt-12 bg-gradient-to-br from-[#1D1D1F] to-[#48484A] rounded-2xl p-6 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-[#A0845C] rounded-full flex items-center justify-center flex-shrink-0 ring-4 ring-[#A0845C]/30">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-1">
                    Redazione Ecolive
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Team di esperti in bioedilizia e case prefabbricate in legno.
                    Condividiamo notizie, progetti e innovazioni nel settore della
                    sostenibilita edilizia.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar with TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-20">
              {headings.length > 0 && (
                <motion.div
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h4 className="font-bold text-[#1D1D1F] mb-4 text-sm uppercase tracking-wider">
                    In questo articolo
                  </h4>
                  <nav className="space-y-2">
                    {headings.map((heading, index) => (
                      <a
                        key={index}
                        href={`#${heading.id}`}
                        className={`
                          block text-sm transition-colors hover:text-[#A0845C]
                          ${heading.level === 3 ? 'pl-4 text-gray-500' : 'text-gray-700 font-medium'}
                        `}
                        onClick={(e) => {
                          e.preventDefault()
                          const element = document.getElementById(heading.id)
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                          }
                        }}
                      >
                        {heading.text}
                      </a>
                    ))}
                  </nav>
                </motion.div>
              )}

              {/* Quick share */}
              <motion.div
                className="mt-6 bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h4 className="font-bold text-[#1D1D1F] mb-4 text-sm uppercase tracking-wider">
                  Condividi
                </h4>
                <div className="flex gap-2">
                  <button
                    onClick={shareOnFacebook}
                    className="w-10 h-10 flex items-center justify-center bg-[#1877f2] text-white rounded-xl hover:scale-110 transition-transform"
                  >
                    <Facebook className="w-5 h-5" />
                  </button>
                  <button
                    onClick={shareOnTwitter}
                    className="w-10 h-10 flex items-center justify-center bg-[#1da1f2] text-white rounded-xl hover:scale-110 transition-transform"
                  >
                    <Twitter className="w-5 h-5" />
                  </button>
                  <button
                    onClick={shareOnLinkedIn}
                    className="w-10 h-10 flex items-center justify-center bg-[#0a66c2] text-white rounded-xl hover:scale-110 transition-transform"
                  >
                    <Linkedin className="w-5 h-5" />
                  </button>
                  <button
                    onClick={copyLink}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl hover:scale-110 transition-transform ${
                      copied ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {copied ? <Check className="w-5 h-5" /> : <Link2 className="w-5 h-5" />}
                  </button>
                </div>
              </motion.div>
            </div>
          </aside>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section ref={relatedRef} className="py-16 lg:py-20 bg-[#F5F5F7]">
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2
              className="text-3xl font-bold text-[#1D1D1F] mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={relatedInView ? { opacity: 1, y: 0 } : {}}
            >
              Articoli correlati
            </motion.h2>
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              variants={containerVariants}
              initial="hidden"
              animate={relatedInView ? "visible" : "hidden"}
            >
              {relatedArticles.map((relatedArticle, index) => (
                <NewsCardPremium
                  key={relatedArticle.id}
                  article={relatedArticle}
                  index={index}
                />
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-[#A0845C] text-white rounded-full shadow-lg flex items-center justify-center z-40 ${
          showBackToTop ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: showBackToTop ? 1 : 0,
          scale: showBackToTop ? 1 : 0.8
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronUp className="w-6 h-6" />
      </motion.button>
    </main>
  )
}
