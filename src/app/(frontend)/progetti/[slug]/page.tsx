import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Project, Media } from '@/payload-types'
import ProjectDetailClient from './ProjectDetailClient'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getProject(slug: string) {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'projects',
    where: {
      slug: { equals: slug },
      _status: { equals: 'published' },
    },
    limit: 1,
    depth: 2,
  })

  if (result.docs.length === 0) {
    return null
  }

  return result.docs[0]
}

async function getRelatedProjects(category: string, currentId: number) {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'projects',
    where: {
      category: { equals: category },
      _status: { equals: 'published' },
      id: { not_equals: currentId },
    },
    limit: 3,
    depth: 1,
  })

  return result.docs
}

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config })
    const projects = await payload.find({
      collection: 'projects',
      where: {
        _status: { equals: 'published' },
      },
      limit: 1000,
      depth: 0,
    })
    return projects.docs.map((project) => ({
      slug: project.slug,
    }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    return {
      title: 'Progetto non trovato',
    }
  }

  const featuredImage = project.featuredImage as Media | undefined
  const seoTitle = project.seo?.metaTitle || `${project.title} | Progetti Ecolive`
  const seoDescription = project.seo?.metaDescription || `Progetto ${project.title} - Casa prefabbricata in legno ${project.category}`

  return {
    title: seoTitle,
    description: seoDescription,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      images: featuredImage?.url ? [{ url: featuredImage.url }] : [],
      type: 'article',
    },
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  const relatedProjects = await getRelatedProjects(project.category, project.id)

  return (
    <ProjectDetailClient
      project={project as Project}
      relatedProjects={relatedProjects as Project[]}
    />
  )
}
