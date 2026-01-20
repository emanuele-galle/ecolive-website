import { getPayload } from 'payload'
import config from '@/payload.config'
import NewsPageClient from './NewsPageClient'
import type { News } from '@/payload-types'

const tagLabels: Record<string, string> = {
  bioedilizia: 'Bioedilizia',
  sostenibilita: 'Sostenibilita',
  innovazione: 'Innovazione',
  progetti: 'Progetti',
  eventi: 'Eventi',
  normative: 'Normative',
}

interface PageProps {
  searchParams: Promise<{ tag?: string; page?: string }>
}

export const metadata = {
  title: 'News & Blog | Ecolive',
  description: 'Ultime notizie, approfondimenti e aggiornamenti dal mondo della bioedilizia e delle case prefabbricate in legno.',
}

export default async function NewsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const selectedTag = params.tag
  const currentPage = parseInt(params.page || '1', 10)
  const articlesPerPage = 9

  const payload = await getPayload({ config })

  const { docs: allArticles, totalDocs } = await payload.find({
    collection: 'news',
    where: {
      status: {
        equals: 'published',
      },
      ...(selectedTag && {
        tags: {
          contains: selectedTag,
        },
      }),
    },
    sort: '-publishedDate',
    limit: articlesPerPage,
    page: currentPage,
  })

  const totalPages = Math.ceil(totalDocs / articlesPerPage)

  return (
    <NewsPageClient
      articles={allArticles as News[]}
      selectedTag={selectedTag}
      currentPage={currentPage}
      totalPages={totalPages}
      tagLabels={tagLabels}
    />
  )
}
