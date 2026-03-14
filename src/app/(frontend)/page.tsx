import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Media } from '@/payload-types'

import HeroFullscreen from '@/components/sections/HeroFullscreen'
import ValueProposition from '@/components/sections/ValueProposition'
import LifestyleVision from '@/components/sections/LifestyleVision'
import ProcessJourney from '@/components/sections/ProcessJourney'
import AssemblyShowcase from '@/components/sections/AssemblyShowcase'
import TestimonialSection from '@/components/sections/TestimonialSection'
import ContactCTA from '@/components/sections/ContactCTA'
import JsonLd from '@/components/JsonLd'

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  name: 'Ecolive S.r.l.',
  description: 'Case prefabbricate in legno con sistema costruttivo X-Frame. Bioedilizia certificata, Classe A4, garanzia 50 anni. Dal 1999 in Calabria.',
  url: 'https://www.ecolive.srl',
  logo: 'https://www.ecolive.srl/images/logo-ecolive.png',
  image: 'https://www.ecolive.srl/images/logo-ecolive.png',
  telephone: '+3909631951395',
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

  return (
    <div className="min-h-screen">
      <JsonLd data={organizationJsonLd} />
      <HeroFullscreen
        heroType={siteSettings?.heroType as 'image' | 'video' | undefined}
        heroImage={heroImageProp}
        heroVideo={heroVideoProp}
        heroVideoPoster={heroVideoPosterProp}
        heroTitle={siteSettings?.heroTitle || undefined}
        heroSubtitle={siteSettings?.heroSubtitle || undefined}
      />
      <ValueProposition />
      <LifestyleVision />
      <ProcessJourney />
      <AssemblyShowcase />
      <TestimonialSection />
      <ContactCTA />
    </div>
  )
}
