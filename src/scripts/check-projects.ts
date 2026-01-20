import { getPayload } from 'payload'
import config from '../payload.config'

async function main() {
  const payload = await getPayload({ config })
  const projects = await payload.find({ collection: 'projects', limit: 10, depth: 1 })

  console.log('\n=== PROJECTS STATUS ===\n')

  for (const p of projects.docs) {
    const galleryCount = p.gallery ? p.gallery.length : 0
    const hasDesc = p.description ? 'YES' : 'NO'
    const hasFeatured = p.featuredImage ? 'YES' : 'NO'
    console.log(`${p.title}`)
    console.log(`  - slug: ${p.slug}`)
    console.log(`  - featuredImage: ${hasFeatured}`)
    console.log(`  - gallery: ${galleryCount} images`)
    console.log(`  - description: ${hasDesc}`)
    console.log('')
  }

  process.exit(0)
}

main().catch(console.error)
