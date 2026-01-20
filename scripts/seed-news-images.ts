/**
 * Seed News Images Script
 * Downloads images from MinIO and links them to news articles via Payload Local API
 */

import { getPayload } from 'payload'
import config from '@payload-config'
import * as fs from 'fs'
import * as path from 'path'
import * as https from 'https'
import * as http from 'http'

const newsImageMapping = [
  {
    slug: 'intervista-rai-3-casa-futuro',
    imageUrl: 'http://127.0.0.1:9000/ecolive-media/news/rai-interview.png',
    filename: 'rai-interview.png',
    alt: 'Intervista RAI 3 - Casa del Futuro Ecolive',
    mimeType: 'image/png'
  },
  {
    slug: 'evento-serra-san-bruno-bioedilizia',
    imageUrl: 'http://127.0.0.1:9000/ecolive-media/news/evento-serra.jpg',
    filename: 'evento-serra.jpg',
    alt: 'Evento Serra San Bruno - Bioedilizia Ecolive',
    mimeType: 'image/jpeg'
  },
  {
    slug: 'innovazione-produzione-case-legno-italia',
    imageUrl: 'http://127.0.0.1:9000/ecolive-media/news/innovazione.jpg',
    filename: 'innovazione.jpg',
    alt: 'Innovazione Produzione Case in Legno Italia',
    mimeType: 'image/jpeg'
  }
]

async function downloadFile(url: string, destPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    const file = fs.createWriteStream(destPath)

    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirect
        const redirectUrl = response.headers.location
        if (redirectUrl) {
          downloadFile(redirectUrl, destPath).then(resolve).catch(reject)
          return
        }
      }

      response.pipe(file)
      file.on('finish', () => {
        file.close()
        resolve()
      })
    }).on('error', (err) => {
      fs.unlink(destPath, () => {})
      reject(err)
    })
  })
}

async function seed() {
  console.log('=== SEED NEWS IMAGES ===\n')

  // Initialize Payload
  console.log('1. Initializing Payload...')
  const payload = await getPayload({ config })
  console.log('   Payload initialized\n')

  // Create temp directory
  const tempDir = '/tmp/news-images-seed'
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true })
  }

  console.log('2. Processing news images...\n')

  for (const mapping of newsImageMapping) {
    console.log(`   Processing: ${mapping.slug}`)

    try {
      // Download image
      const localPath = path.join(tempDir, mapping.filename)
      console.log(`   - Downloading ${mapping.filename}...`)
      await downloadFile(mapping.imageUrl, localPath)

      // Check if file exists and has content
      if (!fs.existsSync(localPath) || fs.statSync(localPath).size === 0) {
        console.log(`   - WARNING: Failed to download ${mapping.filename}`)
        continue
      }

      // Create media record
      console.log(`   - Creating media record...`)
      const fileBuffer = fs.readFileSync(localPath)

      const media = await payload.create({
        collection: 'media',
        data: {
          alt: mapping.alt,
        },
        file: {
          data: fileBuffer,
          name: mapping.filename,
          mimetype: mapping.mimeType,
          size: fileBuffer.length,
        },
      })

      console.log(`   - Media created with ID: ${media.id}`)

      // Find news article by slug
      const newsResult = await payload.find({
        collection: 'news',
        where: {
          slug: { equals: mapping.slug }
        },
        limit: 1
      })

      if (newsResult.docs.length === 0) {
        console.log(`   - WARNING: News article '${mapping.slug}' not found`)
        continue
      }

      const newsArticle = newsResult.docs[0]
      console.log(`   - Found news article ID: ${newsArticle.id}`)

      // Update news with image
      await payload.update({
        collection: 'news',
        id: newsArticle.id,
        data: {
          featuredImage: media.id
        }
      })

      console.log(`   - Updated news with image`)
      console.log(`   DONE: ${mapping.slug}\n`)

    } catch (error) {
      console.error(`   ERROR processing ${mapping.slug}:`, error)
    }
  }

  // Cleanup
  console.log('3. Cleanup...')
  fs.rmSync(tempDir, { recursive: true, force: true })

  console.log('\n=== COMPLETE ===')
  console.log('Visit http://72.61.184.133:3010/news to verify images')

  process.exit(0)
}

seed().catch((error) => {
  console.error('Seed failed:', error)
  process.exit(1)
})
