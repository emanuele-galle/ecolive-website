import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { News } from '@/payload-types'
import ArticleClient from './ArticleClient'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config })
    const articles = await payload.find({
      collection: 'news',
      where: {
        status: {
          equals: 'published',
        },
      },
      limit: 1000,
    })
    return articles.docs.map((article) => ({
      slug: article.slug,
    }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'news',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const article = result.docs[0]

  if (!article) {
    return {
      title: 'Articolo non trovato',
    }
  }

  return {
    title: article.seo?.metaTitle || article.title,
    description: article.seo?.metaDescription || article.excerpt || undefined,
    openGraph: {
      title: article.seo?.metaTitle || article.title,
      description: article.seo?.metaDescription || article.excerpt || undefined,
      type: 'article',
      publishedTime: article.publishedDate,
      images: article.featuredImage && typeof article.featuredImage !== 'number'
        ? [
            {
              url: article.featuredImage.url || '',
              width: article.featuredImage.width || undefined,
              height: article.featuredImage.height || undefined,
              alt: article.featuredImage.alt || article.title,
            },
          ]
        : [],
    },
  }
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'news',
    where: {
      slug: {
        equals: slug,
      },
      status: {
        equals: 'published',
      },
    },
    limit: 1,
  })

  const article = result.docs[0]

  if (!article) {
    notFound()
  }

  // Fetch related articles (same tags or recent)
  const relatedArticles = await payload.find({
    collection: 'news',
    where: {
      and: [
        {
          status: {
            equals: 'published',
          },
        },
        {
          id: {
            not_equals: article.id,
          },
        },
        ...(article.tags && article.tags.length > 0
          ? [
              {
                tags: {
                  in: article.tags,
                },
              },
            ]
          : []),
      ],
    },
    limit: 3,
    sort: '-publishedDate',
  })

  return (
    <ArticleClient
      article={article as News}
      relatedArticles={relatedArticles.docs as News[]}
    />
  )
}
