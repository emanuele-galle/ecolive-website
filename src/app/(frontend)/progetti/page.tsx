import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Project } from '@/payload-types'
import ProjectsPageClient from './ProjectsPageClient'

const categoryLabels = {
  residenziale: 'Residenziale',
  bungalow: 'Bungalow',
  commerciale: 'Commerciale',
  ristrutturazione: 'Ristrutturazione',
} as const

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const params = await searchParams
  const selectedCategory = params.category

  const payload = await getPayload({ config })

  const whereClause = {
    _status: { equals: 'published' },
    ...(selectedCategory && { category: { equals: selectedCategory } }),
  }

  const { docs: projects } = await payload.find({
    collection: 'projects',
    where: whereClause,
    sort: '-createdAt',
    depth: 2,
  })

  // Get total count for stats
  const { totalDocs: totalProjects } = await payload.count({
    collection: 'projects',
    where: { _status: { equals: 'published' } },
  })

  return (
    <ProjectsPageClient
      projects={projects as Project[]}
      totalProjects={totalProjects}
      selectedCategory={selectedCategory}
      categoryLabels={categoryLabels}
    />
  )
}
