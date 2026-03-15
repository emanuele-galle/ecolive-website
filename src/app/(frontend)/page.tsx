export const dynamic = 'force-dynamic'

import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Media } from '@/payload-types'

import HeroFullscreen from '@/components/sections/HeroFullscreen'
import ValueProposition from '@/components/sections/ValueProposition'
import SystemPreview from '@/components/sections/SystemPreview'
import TipologiePreview from '@/components/sections/TipologiePreview'
import FeaturedProject from '@/components/sections/FeaturedProject'
import ProcessJourney from '@/components/sections/ProcessJourney'
import QuickComparison from '@/components/sections/QuickComparison'
import ContactCTA from '@/components/sections/ContactCTA'
import JsonLd from '@/components/JsonLd'

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  name: 'EcoLive S.r.l.',
  description: 'EcoLive progetta, produce e costruisce case prefabbricate in legno con il sistema costruttivo ibrido X-Frame. Bioedilizia certificata Classe A4, garanzia 30 anni. Sede a Spadola (VV), Calabria.',
  url: 'https://www.ecolive.srl',
  logo: 'https://www.ecolive.srl/images/logo-ecolive.png',
  image: 'https://www.ecolive.srl/images/logo-ecolive.png',
  telephone: '+390963530945',
  email: 'info@ecolive.srl',
  foundingDate: '1999',
  priceRange: '\u20AC\u20AC\u20AC',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Via Conte Ruggero 128',
    addressLocality: 'Spadola',
    addressRegion: 'Calabria',
    postalCode: '89822',
    addressCountry: 'IT',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 38.6667,
    longitude: 16.5333,
  },
  sameAs: [
    'https://www.facebook.com/ecolivesrl',
    'https://www.instagram.com/ecolive.srl',
    'https://www.linkedin.com/company/ecolivesrl',
    'https://www.youtube.com/@Ecolive-xframe',
  ],
}

export default async function HomePage() {
  const payload = await getPayload({ config })

  let siteSettings = null
  try {
    siteSettings = await payload.findGlobal({ slug: 'site-settings' })
  } catch {
    console.log('SiteSettings not found, using defaults')
  }

  const heroImage = siteSettings?.heroImage as Media | null
  const heroVideo = siteSettings?.heroVideo as Media | null
  const heroVideoPoster = siteSettings?.heroVideoPoster as Media | null

  const heroImageProp = heroImage ? { url: heroImage.url || undefined, alt: heroImage.alt } : null
  const heroVideoProp = heroVideo ? { url: heroVideo.url || undefined, alt: heroVideo.alt } : null
  const heroVideoPosterProp = heroVideoPoster ? { url: heroVideoPoster.url || undefined, alt: heroVideoPoster.alt } : null

  // Fetch featured project from CMS
  let featuredProject = null
  try {
    const projects = await payload.find({
      collection: 'projects',
      limit: 1,
      sort: '-createdAt',
    })
    if (projects.docs.length > 0) {
      const p = projects.docs[0]
      const featuredImage = p.featuredImage as Media | null
      featuredProject = {
        title: p.title,
        slug: p.slug,
        location: p.location || undefined,
        surface: p.area ? `${p.area} m²` : undefined,
        year: p.year ? String(p.year) : undefined,
        imageUrl: featuredImage?.url || '/images/tipologie/residenziali.webp',
      }
    }
  } catch {
    // No projects yet, FeaturedProject will use defaults
  }

  return (
    <div className="min-h-screen">
      <JsonLd data={organizationJsonLd} />

      {/* 1. Hero — Impatto emotivo + promessa */}
      <HeroFullscreen
        heroType={siteSettings?.heroType as 'image' | 'video' | undefined}
        heroImage={heroImageProp}
        heroVideo={heroVideoProp}
        heroVideoPoster={heroVideoPosterProp}
        heroTitle={siteSettings?.heroTitle || undefined}
        heroSubtitle={siteSettings?.heroSubtitle || undefined}
      />

      {/* 2. I Numeri che Contano — 4 pilastri */}
      <ValueProposition />

      {/* 3. Il Sistema in 30 Secondi — Preview X-Frame */}
      <SystemPreview />

      {/* 4. Le Nostre Soluzioni — 4 tipologie */}
      <TipologiePreview />

      {/* 5. Progetto in Evidenza */}
      <FeaturedProject project={featuredProject || undefined} />

      {/* 6. Il Processo — Timeline 7 step */}
      <ProcessJourney />

      {/* 7. Confronto Rapido — X-Frame vs Muratura */}
      <QuickComparison />

      {/* 8. CTA Finale — 3 percorsi */}
      <ContactCTA />
    </div>
  )
}
