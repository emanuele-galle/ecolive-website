/**
 * Script per completare i contenuti dei progetti con descrizioni e gallery
 * Scarica immagini da ecolive.srl e le importa in Payload
 *
 * Run with: npx tsx src/scripts/complete-projects-content.ts
 */

import { getPayload } from 'payload'
import config from '../payload.config'
import * as fs from 'fs'
import * as path from 'path'
import * as https from 'https'

const TEMP_DIR = '/tmp/ecolive-gallery'

// Progetti con slug CMS reali, descrizioni complete e URL immagini
const projectsData = [
  {
    slug: 'villa-polistena',
    description: `Villa elegante che unisce stile contemporaneo e sostenibilità mediante il sistema costruttivo X-Frame di Ecolive. Residenza progettata per famiglie moderne che cercano comfort e design innovativo.

La superficie totale di 355 mq si sviluppa su due livelli: 225 mq al piano terra con open space cucina-soggiorno-pranzo, e 130 mq al primo piano dedicato alle camere da letto con accesso a terrazze panoramiche.

Il porticato in legno crea un elegante collegamento tra gli spazi interni e il giardino, mentre le ampie vetrate garantiscono un'illuminazione naturale ottimale. Costruzione eco-friendly con isolamento termico e acustico di qualità superiore.`,
    galleryUrls: [
      'https://www.ecolive.srl/wp-content/uploads/2024/03/Casa-in-Legno-Polistena-1.png',
      'https://www.ecolive.srl/wp-content/uploads/2024/03/Casa-in-Legno-Polistena-3.png',
      'https://www.ecolive.srl/wp-content/uploads/2024/03/Casa-in-Legno-Polistena-5.png',
      'https://www.ecolive.srl/wp-content/uploads/2024/03/Casa-in-Legno-Polistena-6.png',
      'https://www.ecolive.srl/wp-content/uploads/2024/03/Casa-in-Legno-Polistena-7.png',
      'https://www.ecolive.srl/wp-content/uploads/2024/03/Casa-in-Legno-Polistena-8.png',
    ],
  },
  {
    slug: 'bifamiliare-girifalco',
    description: `Soluzione abitativa bifamiliare innovativa realizzata con il sistema X-Frame di Ecolive. Offre due unità abitative completamente indipendenti, ideali per famiglie allargate o come investimento immobiliare.

Ogni unità dispone di 130 mq al piano terra con zona giorno open space (soggiorno, sala da pranzo, cucina) e 60 mq al primo piano con camere da letto spaziose e luminose. La configurazione flessibile permette di adattare gli spazi alle esigenze specifiche di ogni famiglia.

Realizzata nel novembre 2020, questa bifamiliare rappresenta l'eccellenza del sistema costruttivo X-Frame classe A4, garantendo efficienza energetica, comfort abitativo e design contemporaneo.`,
    galleryUrls: [
      'https://www.ecolive.srl/wp-content/uploads/2024/03/Casa-in-Legno-Girifalco-1-scaled.jpg',
      'https://www.ecolive.srl/wp-content/uploads/2024/03/Casa-in-Legno-Girifalco-2-scaled.jpg',
      'https://www.ecolive.srl/wp-content/uploads/2024/03/Casa-in-Legno-Girifalco-3-scaled.jpg',
      'https://www.ecolive.srl/wp-content/uploads/2024/03/Casa-in-Legno-Girifalco-4-scaled.jpg',
      'https://www.ecolive.srl/wp-content/uploads/2024/03/Casa-in-Legno-Girifalco-5-scaled.jpg',
      'https://www.ecolive.srl/wp-content/uploads/2024/03/Casa-in-Legno-Girifalco-6-scaled.jpg',
    ],
  },
  {
    slug: 'casa-limbadi',
    description: `Casa in legno moderna realizzata con il sistema X-Frame innovativo di Ecolive. Abitazione monopiano caratterizzata da design contemporaneo e sostenibile che unisce funzionalità e rispetto ambientale.

La superficie di 100 mq si sviluppa su un unico livello con zona giorno open space (cucina integrata, soggiorno e sala da pranzo), 3 camere da letto spaziose e 2 bagni moderni. Il porticato di 40 mq estende lo spazio abitativo verso l'esterno.

Le ampie vetrate panoramiche inondano gli ambienti di luce naturale, mentre la struttura in legno garantisce isolamento termico e acustico superiore. Sistema costruttivo X-Frame classe A4.`,
    galleryUrls: [
      'https://www.ecolive.srl/wp-content/uploads/2024/03/elaborati_Pagina_1-scaled.jpg',
      'https://www.ecolive.srl/wp-content/uploads/2024/03/elaborati_Pagina_2-scaled.jpg',
      'https://www.ecolive.srl/wp-content/uploads/2024/03/elaborati_Pagina_5-scaled.jpg',
      'https://www.ecolive.srl/wp-content/uploads/2024/03/elaborati_Pagina_6-scaled.jpg',
      'https://www.ecolive.srl/wp-content/uploads/2024/03/cantiere5-scaled.jpg',
      'https://www.ecolive.srl/wp-content/uploads/2024/03/cantiere3.jpg',
    ],
  },
  {
    slug: 'villa-squillace',
    description: `Residenza che rappresenta l'eccellenza della bioedilizia moderna, grazie al suo innovativo sistema costruttivo X-Frame. Il progetto combina design contemporaneo con sostenibilità ambientale.

La superficie di 230 mq si sviluppa su due piani con architettura caratterizzata da tetto spiovente elegante. Gli spazi abitativi sono luminosi e aperti, con terrazze e portico in legno che creano una perfetta integrazione tra interno ed esterno.

Realizzata nel novembre 2020, questa villa unifamiliare offre isolamento termico e acustico eccezionale, garantendo comfort in ogni stagione e rispetto per l'ambiente.`,
    galleryUrls: [
      'https://www.ecolive.srl/wp-content/uploads/2024/03/esterno2-scaled.jpg',
      'https://www.ecolive.srl/wp-content/uploads/2024/03/esterno1-scaled.jpg',
      'https://www.ecolive.srl/wp-content/uploads/2024/03/elaborati_Pagina_10-scaled.jpg',
      'https://www.ecolive.srl/wp-content/uploads/2024/03/elaborati_Pagina_11-scaled.jpg',
      'https://www.ecolive.srl/wp-content/uploads/2024/03/elaborati_Pagina_12-scaled.jpg',
      'https://www.ecolive.srl/wp-content/uploads/2024/03/screenshot_27-scaled.jpg',
    ],
  },
  {
    slug: 'casa-lamezia',
    description: `Connubio perfetto tra design moderno e sostenibilità, caratterizzato da un elegante tetto spiovente. Residenza contemporanea che coniuga eleganza architettonica con funzionalità pratica.

La superficie totale di 279 mq comprende 207 mq abitabili più garage di 72 mq. Il piano terra ospita cucina, sala da pranzo e soggiorno con porte scorrevoli che aprono verso l'esterno. Il piano superiore è dedicato alle camere da letto.

Le finestre generose massimizzano l'illuminazione naturale, mentre il sistema costruttivo X-Frame garantisce isolamento termico e acustico eccezionale. Realizzata mediante il sistema costruttivo innovativo X-Frame classe A4.`,
    galleryUrls: [
      'https://www.ecolive.srl/wp-content/uploads/2024/03/Casa-in-Legno-Lamezia-1-scaled.jpg',
      'https://www.ecolive.srl/wp-content/uploads/2024/03/Casa-in-Legno-Lamezia-2-scaled.jpg',
      'https://www.ecolive.srl/wp-content/uploads/2024/03/Casa-in-Legno-Lamezia-3-scaled.jpg',
      'https://www.ecolive.srl/wp-content/uploads/2024/03/Casa-in-Legno-Lamezia-4-scaled.jpg',
      'https://www.ecolive.srl/wp-content/uploads/2024/03/Casa-in-Legno-Lamezia-5-scaled.jpg',
      'https://www.ecolive.srl/wp-content/uploads/2024/03/Casa-in-Legno-Lamezia-6-scaled.jpg',
    ],
  },
]

async function downloadFile(url: string, destPath: string): Promise<boolean> {
  return new Promise((resolve) => {
    const file = fs.createWriteStream(destPath)
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    }, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file)
        file.on('finish', () => {
          file.close()
          resolve(true)
        })
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        // Follow redirect
        const redirectUrl = response.headers.location
        if (redirectUrl) {
          file.close()
          fs.unlinkSync(destPath)
          downloadFile(redirectUrl, destPath).then(resolve)
        } else {
          resolve(false)
        }
      } else {
        file.close()
        fs.unlinkSync(destPath)
        resolve(false)
      }
    }).on('error', () => {
      file.close()
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath)
      resolve(false)
    })
  })
}

function createRichTextDescription(text: string) {
  const paragraphs = text.split('\n\n').filter(p => p.trim())
  return {
    root: {
      type: 'root',
      children: paragraphs.map(p => ({
        type: 'paragraph',
        children: [{ type: 'text', text: p.trim() }],
      })),
    },
  }
}

async function downloadAndUploadImages(
  payload: Awaited<ReturnType<typeof getPayload>>,
  projectTitle: string,
  slug: string,
  galleryUrls: string[],
): Promise<number[]> {
  const galleryIds: number[] = []

  for (let i = 0; i < galleryUrls.length; i++) {
    const url = galleryUrls[i]
    const filename = `${slug}-gallery-${i + 1}${path.extname(url).split('?')[0] || '.jpg'}`
    const localPath = path.join(TEMP_DIR, filename)

    console.log(`  📥 Downloading: ${filename}`)
    const success = await downloadFile(url, localPath)

    if (!success) {
      console.log(`    ⚠️ Failed to download, skipping`)
      continue
    }

    const stats = fs.statSync(localPath)
    if (stats.size < 1000) {
      console.log(`    ⚠️ File too small (${stats.size} bytes), skipping`)
      fs.unlinkSync(localPath)
      continue
    }

    try {
      const fileBuffer = fs.readFileSync(localPath)
      const mimeType = filename.endsWith('.png') ? 'image/png' : 'image/jpeg'

      const media = await payload.create({
        collection: 'media',
        data: { alt: `${projectTitle} - Immagine ${i + 1}` },
        file: {
          data: fileBuffer,
          mimetype: mimeType,
          name: filename,
          size: fileBuffer.length,
        },
      })

      console.log(`    ✅ Uploaded as Media ID: ${media.id}`)
      galleryIds.push(media.id)
    } catch (error: unknown) {
      console.log(`    ❌ Upload failed: ${error instanceof Error ? error.message : String(error)}`)
    }

    if (fs.existsSync(localPath)) fs.unlinkSync(localPath)
  }

  return galleryIds
}

async function main() {
  console.log('🚀 Starting complete projects content import...\n')

  // Create temp directory
  if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true })
  }

  const payload = await getPayload({ config })

  for (const projectData of projectsData) {
    console.log(`\n📁 Processing: ${projectData.slug}`)

    // Find the project
    const projectResult = await payload.find({
      collection: 'projects',
      where: { slug: { equals: projectData.slug } },
      limit: 1,
    })

    if (projectResult.docs.length === 0) {
      console.log(`  ❌ Project not found: ${projectData.slug}`)
      continue
    }

    const project = projectResult.docs[0]
    console.log(`  ✅ Found project: ${project.title}`)

    // Download and import gallery images
    const galleryIds = await downloadAndUploadImages(
      payload,
      project.title,
      projectData.slug,
      projectData.galleryUrls,
    )

    // Update project with new description and gallery
    console.log(`  📝 Updating project with description and ${galleryIds.length} gallery images`)

    const updateData: Record<string, unknown> = {
      description: createRichTextDescription(projectData.description),
    }

    if (galleryIds.length > 0) {
      updateData.gallery = galleryIds.map(id => ({ image: id }))
    }

    await payload.update({
      collection: 'projects',
      id: project.id,
      data: updateData,
    })

    console.log(`  ✅ Project updated successfully!`)
  }

  // Cleanup temp directory
  fs.rmSync(TEMP_DIR, { recursive: true, force: true })

  console.log('\n✨ All projects content import complete!')
  process.exit(0)
}

main().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
