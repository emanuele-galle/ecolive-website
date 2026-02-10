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

  return (
    <main className="min-h-screen">
      <HeroFullscreen
        heroType={siteSettings?.heroType as 'image' | 'video' | undefined}
        heroImage={heroImage ? { url: heroImage.url || undefined, alt: heroImage.alt } : null}
        heroVideo={heroVideo ? { url: heroVideo.url || undefined, alt: heroVideo.alt } : null}
        heroVideoPoster={heroVideoPoster ? { url: heroVideoPoster.url || undefined, alt: heroVideoPoster.alt } : null}
        heroTitle={siteSettings?.heroTitle || undefined}
        heroSubtitle={siteSettings?.heroSubtitle || undefined}
      />
      <ValueProposition />
      <LifestyleVision />
      <ProcessJourney />
      <AssemblyShowcase />
      <TestimonialSection />
      <ContactCTA />
    </main>
  )
}
