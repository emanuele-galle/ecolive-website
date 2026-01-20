/**
 * List all projects in the CMS
 * Run with: npx tsx src/scripts/list-projects.ts
 */

import { getPayload } from 'payload'
import config from '../payload.config'

async function main() {
  const payload = await getPayload({ config })
  const projects = await payload.find({ collection: 'projects', limit: 50 })

  console.log('\n=== PROJECTS IN CMS ===')
  console.log('Total:', projects.docs.length)
  console.log('')

  for (const p of projects.docs) {
    const hasImage = p.featuredImage !== null && p.featuredImage !== undefined
    console.log(`- ${p.slug} | ${p.title} | image: ${hasImage ? 'YES' : 'NO'}`)
  }

  process.exit(0)
}

main().catch(console.error)
