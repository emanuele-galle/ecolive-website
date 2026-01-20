/**
 * Script per importare immagini da MinIO a Payload Media collection
 * e collegare le immagini ai progetti
 *
 * Run with: npx tsx src/scripts/import-images-to-payload.ts
 */

import { getPayload } from 'payload'
import config from '../payload.config'
import * as fs from 'fs'
import * as path from 'path'
import * as https from 'https'
import * as http from 'http'

const MINIO_ENDPOINT = 'http://127.0.0.1:9000'
const BUCKET = 'ecolive-media'

// Mapping tra immagini MinIO e slug dei progetti
const imageToProject = [
  { minioPath: 'progetti/polistena.jpg', projectSlug: 'casa-polistena', alt: 'Casa in Legno Polistena - Vista esterna' },
  { minioPath: 'progetti/girifalco.jpg', projectSlug: 'bifamiliare-girifalco', alt: 'Bifamiliare Girifalco - Design moderno' },
  { minioPath: 'progetti/limbadi.jpg', projectSlug: 'casa-limbadi', alt: 'Casa Residenziale Limbadi - Esterno' },
  { minioPath: 'progetti/squillace.jpg', projectSlug: 'villa-squillace', alt: 'Villa Squillace - Vista principale' },
  { minioPath: 'progetti/lamezia.jpg', projectSlug: 'residenza-lamezia', alt: 'Residenza Lamezia - Facciata' },
]

async function downloadFile(url: string, destPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    const file = fs.createWriteStream(destPath)

    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file)
        file.on('finish', () => {
          file.close()
          resolve()
        })
      } else {
        file.close()
        fs.unlink(destPath, () => {})
        reject(new Error(`Failed to download: ${response.statusCode}`))
      }
    }).on('error', (err) => {
      file.close()
      fs.unlink(destPath, () => {})
      reject(err)
    })
  })
}

async function importImagesAndLinkToProjects() {
  console.log('Starting image import and project linking...')

  const payload = await getPayload({ config })

  // Create temp directory
  const tempDir = '/tmp/ecolive-payload-import'
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true })
  }

  for (const item of imageToProject) {
    const minioUrl = `${MINIO_ENDPOINT}/${BUCKET}/${item.minioPath}`
    const filename = path.basename(item.minioPath)
    const localPath = path.join(tempDir, filename)

    console.log(`\nProcessing: ${item.minioPath}`)

    try {
      // 1. Download image from MinIO
      console.log(`  Downloading from MinIO...`)
      await downloadFile(minioUrl, localPath)

      // 2. Check if media already exists
      const existingMedia = await payload.find({
        collection: 'media',
        where: {
          alt: { equals: item.alt },
        },
        limit: 1,
      })

      let mediaId: number

      if (existingMedia.docs.length > 0) {
        console.log(`  Media already exists, using existing ID: ${existingMedia.docs[0].id}`)
        mediaId = existingMedia.docs[0].id
      } else {
        // 3. Upload to Payload Media collection
        console.log(`  Uploading to Payload Media collection...`)
        const fileBuffer = fs.readFileSync(localPath)

        const media = await payload.create({
          collection: 'media',
          data: {
            alt: item.alt,
          },
          file: {
            data: fileBuffer,
            mimetype: 'image/jpeg',
            name: filename,
            size: fileBuffer.length,
          },
        })

        console.log(`  Media created with ID: ${media.id}`)
        mediaId = media.id
      }

      // 4. Find the project
      const project = await payload.find({
        collection: 'projects',
        where: {
          slug: { equals: item.projectSlug },
        },
        limit: 1,
      })

      if (project.docs.length === 0) {
        console.log(`  Project "${item.projectSlug}" not found, skipping link`)
        continue
      }

      // 5. Update project with featuredImage
      console.log(`  Linking to project: ${project.docs[0].title}`)
      await payload.update({
        collection: 'projects',
        id: project.docs[0].id,
        data: {
          featuredImage: mediaId,
        },
      })

      console.log(`  Successfully linked image to project!`)

    } catch (error) {
      console.error(`  Error processing ${item.minioPath}:`, error)
    }
  }

  // Cleanup temp directory
  fs.rmSync(tempDir, { recursive: true, force: true })

  console.log('\nImage import and linking complete!')
  process.exit(0)
}

importImagesAndLinkToProjects().catch(console.error)
