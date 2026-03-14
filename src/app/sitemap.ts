import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

const BASE_URL = 'https://www.ecolive.srl'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    // Sistema X-Frame
    { url: `${BASE_URL}/sistema-x-frame`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/sistema-x-frame/pareti`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/sistema-x-frame/solai`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/sistema-x-frame/coperture`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/sistema-x-frame/trasporto-montaggio`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/sistema-x-frame/confronto`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    // Tipologie
    { url: `${BASE_URL}/tipologie`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/tipologie/glamping`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/tipologie/smartsuite`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/tipologie/residenziali`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/tipologie/luxury`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    // Configuratore
    { url: `${BASE_URL}/configuratore`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    // Progetti
    { url: `${BASE_URL}/progetti`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    // Azienda
    { url: `${BASE_URL}/chi-siamo`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/il-processo`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/professionisti`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/franchising`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    // Content
    { url: `${BASE_URL}/news`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/contatti`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    // Legal
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/cookie`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/termini`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  let newsRoutes: MetadataRoute.Sitemap = []
  let projectRoutes: MetadataRoute.Sitemap = []

  try {
    const payload = await getPayload({ config })

    const newsArticles = await payload.find({
      collection: 'news',
      where: { status: { equals: 'published' } },
      limit: 1000,
      depth: 0,
    })

    newsRoutes = newsArticles.docs.map((article) => ({
      url: `${BASE_URL}/news/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    const projects = await payload.find({
      collection: 'projects',
      where: { _status: { equals: 'published' } },
      limit: 1000,
      depth: 0,
    })

    projectRoutes = projects.docs.map((project) => ({
      url: `${BASE_URL}/progetti/${project.slug}`,
      lastModified: new Date(project.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  } catch (error) {
    console.error('Error generating dynamic sitemap routes:', error)
  }

  return [...staticRoutes, ...newsRoutes, ...projectRoutes]
}
