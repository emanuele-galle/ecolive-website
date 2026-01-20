import Link from 'next/link'
import Image from 'next/image'
import type { News, Media } from '@/payload-types'

interface NewsCardProps {
  article: News
  featured?: boolean
}

const tagLabels: Record<string, string> = {
  bioedilizia: 'Bioedilizia',
  sostenibilita: 'Sostenibilità',
  innovazione: 'Innovazione',
  progetti: 'Progetti',
  eventi: 'Eventi',
  normative: 'Normative',
}

const tagColors: Record<string, string> = {
  bioedilizia: 'bg-[var(--color-eco-green)]/10 text-[var(--color-eco-green)]',
  sostenibilita: 'bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]',
  innovazione: 'bg-purple-100 text-purple-800',
  progetti: 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]',
  eventi: 'bg-[var(--color-accent-gold)]/10 text-[var(--color-wood)]',
  normative: 'bg-gray-100 text-gray-800',
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function NewsCard({ article, featured = false }: NewsCardProps) {
  const image = article.featuredImage as Media | null | undefined
  const imageUrl = image?.sizes?.card?.url || image?.url || '/placeholder-news.jpg'

  if (featured) {
    return (
      <Link
        href={`/news/${article.slug}`}
        className="group block overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative aspect-[16/9] md:aspect-auto overflow-hidden">
            <Image
              src={imageUrl}
              alt={image?.alt || article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-8 flex flex-col justify-center">
            <time className="text-sm text-[var(--color-muted)] mb-2">
              {formatDate(article.publishedDate)}
            </time>
            <h2 className="text-3xl font-bold text-[var(--color-secondary-dark)] mb-4 group-hover:text-[var(--color-primary)] transition-colors">
              {article.title}
            </h2>
            {article.excerpt && (
              <p className="text-[var(--color-muted)] mb-4 line-clamp-3">{article.excerpt}</p>
            )}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${tagColors[tag] || 'bg-gray-100 text-gray-800'}`}
                  >
                    {tagLabels[tag] || tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/news/${article.slug}`}
      className="group block overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={imageUrl}
          alt={image?.alt || article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <time className="text-sm text-[var(--color-muted)] mb-2 block">
          {formatDate(article.publishedDate)}
        </time>
        <h3 className="text-xl font-bold text-[var(--color-secondary-dark)] mb-3 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="text-[var(--color-muted)] mb-4 line-clamp-2">{article.excerpt}</p>
        )}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {article.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 rounded-full text-xs font-medium ${tagColors[tag] || 'bg-gray-100 text-gray-800'}`}
              >
                {tagLabels[tag] || tag}
              </span>
            ))}
            {article.tags.length > 2 && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                +{article.tags.length - 2}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}
