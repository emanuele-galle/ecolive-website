/**
 * Seed script to populate Payload CMS with projects and news
 * Run with: npx tsx src/scripts/seed-content.ts
 */

import { getPayload } from 'payload'
import config from '../payload.config'

const projects = [
  {
    title: 'Casa in Legno Polistena',
    slug: 'casa-polistena',
    category: 'residenziale',
    location: 'Polistena (RC)',
    year: 2020,
    area: 355,
    floors: 2,
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Una villa moderna realizzata con il sistema X-Frame, che offre 225 mq al piano terra e 130 mq al primo piano. Design contemporaneo con ampie vetrate, portico in legno con accesso al giardino, camere spaziose con terrazze e vista panoramica.',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'La casa è stata progettata per massimizzare la luce naturale e offrire un comfort abitativo superiore grazie all\'eccellente isolamento termico e acustico del sistema X-Frame.',
              },
            ],
          },
        ],
      },
    },
    features: [
      { feature: 'Open-plan living con cucina moderna' },
      { feature: 'Zone living e dining luminose' },
      { feature: 'Portico in legno con accesso giardino' },
      { feature: 'Camere spaziose con terrazze' },
      { feature: 'Vista panoramica' },
    ],
    certifications: ['classe-a-plus'],
    _status: 'published',
  },
  {
    title: 'Bifamiliare Girifalco',
    slug: 'bifamiliare-girifalco',
    category: 'residenziale',
    location: 'Girifalco (CZ)',
    year: 2020,
    area: 380,
    floors: 2,
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Abitazione bifamiliare con due unità residenziali indipendenti. Design moderno contemporaneo con equilibrio tra spazi aperti e privacy. Ogni unità dispone di 130 mq al piano terra e 60 mq al primo piano.',
              },
            ],
          },
        ],
      },
    },
    features: [
      { feature: 'Due unità indipendenti' },
      { feature: 'Design contemporaneo' },
      { feature: 'Spazi aperti con privacy' },
      { feature: 'Piano superiore flessibile' },
    ],
    certifications: ['classe-a-plus'],
    _status: 'published',
  },
  {
    title: 'Casa Residenziale Limbadi',
    slug: 'casa-limbadi',
    category: 'residenziale',
    location: 'Limbadi (VV)',
    year: 2020,
    area: 140,
    floors: 1,
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Casa monopiano dal design contemporaneo con 100 mq abitabili più 40 mq di portico. Tre camere da letto, due bagni, open-concept living con grandi vetrate panoramiche che si affacciano sul paesaggio calabrese.',
              },
            ],
          },
        ],
      },
    },
    features: [
      { feature: '3 camere da letto' },
      { feature: '2 bagni' },
      { feature: 'Portico 40 mq' },
      { feature: 'Open-concept living' },
      { feature: 'Grandi vetrate panoramiche' },
    ],
    certifications: ['classe-a-plus'],
    _status: 'published',
  },
  {
    title: 'Villa Squillace',
    slug: 'villa-squillace',
    category: 'residenziale',
    location: 'Squillace (CZ)',
    year: 2020,
    area: 230,
    floors: 2,
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Villa moderna a due piani con tetto a falde. Design contemporaneo con terrazze e portico in legno. Ampi spazi living luminosi con eccellente isolamento termico e acustico.',
              },
            ],
          },
        ],
      },
    },
    features: [
      { feature: 'Tetto a falde moderno' },
      { feature: 'Terrazze e portico in legno' },
      { feature: 'Spazi living luminosi' },
      { feature: 'Isolamento termico superiore' },
      { feature: 'Isolamento acustico' },
    ],
    certifications: ['classe-a-plus'],
    _status: 'published',
  },
  {
    title: 'Residenza Lamezia',
    slug: 'residenza-lamezia',
    category: 'residenziale',
    location: 'Lamezia Terme (CZ)',
    year: 2020,
    area: 279,
    floors: 2,
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Residenza moderna con 207 mq abitabili più garage di 72 mq. Piano terra con cucina, pranzo e soggiorno con porte scorrevoli. Piano superiore dedicato alle camere. Grandi finestre per massima illuminazione naturale.',
              },
            ],
          },
        ],
      },
    },
    features: [
      { feature: 'Garage 72 mq' },
      { feature: 'Cucina-pranzo-soggiorno open' },
      { feature: 'Porte scorrevoli' },
      { feature: 'Camere al piano superiore' },
      { feature: 'Grandi finestre' },
    ],
    certifications: ['classe-a-plus'],
    _status: 'published',
  },
]

const news = [
  {
    title: 'Innovazione e Produzione nelle Case in Legno: l\'Italia Terza Produttrice in Europa',
    slug: 'innovazione-produzione-case-legno-italia',
    publishedDate: '2025-02-02',
    excerpt: 'L\'Italia si conferma al terzo posto in Europa nella produzione di case in legno. Scopri come il sistema X-Frame rappresenta l\'avanguardia tecnologica nel settore della bioedilizia.',
    tags: ['innovazione', 'bioedilizia'],
    status: 'published',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'L\'Italia si conferma al terzo posto in Europa nella produzione di case prefabbricate in legno, dopo Germania e Regno Unito. Secondo i dati FederlegnoArredo, il settore della bioedilizia continua a crescere a ritmi sostenuti, trainato dalla domanda di abitazioni sostenibili e ad alta efficienza energetica.',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Ecolive, con il suo sistema costruttivo X-Frame, rappresenta l\'avanguardia tecnologica nel panorama italiano. Il sistema ibrido, che combina Platform Frame, X-Lam e Post & Beam, permette di realizzare abitazioni di alta qualità in tempi record, garantendo prestazioni energetiche in classe A4 e resistenza sismica certificata per zona 1.',
              },
            ],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [
              {
                type: 'text',
                text: 'Il Made in Italy della Bioedilizia',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'La qualità costruttiva Made in Italy si distingue per l\'attenzione ai dettagli, l\'uso di materiali certificati e la capacità di personalizzazione. Ecolive, con sede in Calabria, porta l\'eccellenza della bioedilizia anche nel Sud Italia, contribuendo alla diffusione di un modo di abitare più sostenibile e rispettoso dell\'ambiente.',
              },
            ],
          },
        ],
      },
    },
  },
  {
    title: 'Evento Case in Legno a Serra San Bruno: Un Successo per la Bioedilizia',
    slug: 'evento-serra-san-bruno-bioedilizia',
    publishedDate: '2024-05-21',
    excerpt: 'Grande successo per l\'evento del 17 maggio 2024 a Serra San Bruno, in collaborazione con Zephir Passivhaus Italia. Focus su sostenibilità e case passive.',
    tags: ['eventi', 'sostenibilita'],
    status: 'published',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Grande partecipazione all\'evento "Case in Legno e Sostenibilità" organizzato da Ecolive il 17 maggio 2024 a Serra San Bruno, in collaborazione con Zephir Passivhaus Italia.',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'L\'evento ha visto la partecipazione di numerosi esperti del settore, tra cui l\'On. Alfonso Grillo, il Sindaco Alfredo Barillari, l\'Ing. Romano Mazza, il Prof. Domenico Enrico Massimo e il Dr. Francesco Nesi di Zephir Passivhaus Italia.',
              },
            ],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [
              {
                type: 'text',
                text: 'I Temi Trattati',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Durante l\'evento sono stati approfonditi diversi temi: l\'uso sostenibile del legno, i benefici delle case passive, la presentazione del sistema X-Frame e le prospettive future dell\'edilizia in legno. Gli interventi degli ingegneri Maurizio Lepera, Pasquale Zaffino e Dominik Gallè hanno illustrato le potenzialità del sistema costruttivo Ecolive.',
              },
            ],
          },
        ],
      },
    },
  },
  {
    title: 'Intervista RAI 3: A Serra San Bruno Nasce la Casa del Futuro',
    slug: 'intervista-rai-3-casa-futuro',
    publishedDate: '2024-05-21',
    excerpt: 'RAI News Calabria intervista il team Ecolive sulle case in legno del futuro. Presentati i progetti di Messina, Cinquefrondi, Gallipoli e altri.',
    tags: ['eventi', 'innovazione'],
    status: 'published',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'RAI News Calabria ha dedicato un servizio speciale a Ecolive, raccontando come a Serra San Bruno stia nascendo la "casa del futuro". L\'intervista ha coinvolto diversi membri del team: Luisa Baffa Trasci (Responsabile Amministrativa), Dominik Gallè (CEO), Pasquale Zaffino (Architetto) e alcuni operai dello stabilimento.',
              },
            ],
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [
              {
                type: 'text',
                text: 'Progetti in Tutta Italia',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Durante l\'intervista sono stati presentati i progetti realizzati da Ecolive in diverse località: Messina, Cinquefrondi, Gallipoli, Rogliano, Briatico e il prossimo cantiere a Badolato. I costi, come spiegato dal CEO Dominik Gallè, variano tra €1.100 e €1.500 al metro quadro, rendendo le case in legno una soluzione accessibile e competitiva.',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Il servizio completo è disponibile sul sito RAI News Calabria.',
              },
            ],
          },
        ],
      },
    },
  },
]

async function seed() {
  console.log('🌱 Starting seed...')

  const payload = await getPayload({ config })

  // Seed projects
  console.log('📁 Creating projects...')
  for (const project of projects) {
    try {
      // Check if project already exists
      const existing = await payload.find({
        collection: 'projects',
        where: { slug: { equals: project.slug } },
      })

      if (existing.docs.length > 0) {
        console.log(`  ⏭️  Project "${project.title}" already exists, skipping`)
        continue
      }

      await payload.create({
        collection: 'projects',
        data: project as any,
      })
      console.log(`  ✅ Created project: ${project.title}`)
    } catch (error) {
      console.error(`  ❌ Error creating project "${project.title}":`, error)
    }
  }

  // Seed news
  console.log('📰 Creating news articles...')
  for (const article of news) {
    try {
      // Check if article already exists
      const existing = await payload.find({
        collection: 'news',
        where: { slug: { equals: article.slug } },
      })

      if (existing.docs.length > 0) {
        console.log(`  ⏭️  Article "${article.title}" already exists, skipping`)
        continue
      }

      await payload.create({
        collection: 'news',
        data: article as any,
      })
      console.log(`  ✅ Created article: ${article.title}`)
    } catch (error) {
      console.error(`  ❌ Error creating article "${article.title}":`, error)
    }
  }

  console.log('✨ Seed complete!')
  process.exit(0)
}

seed().catch(console.error)
