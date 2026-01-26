import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Media } from '@/payload-types'

// Import Warm Natural section components
import HeroFullscreen from '@/components/sections/HeroFullscreen'
import ValueProposition from '@/components/sections/ValueProposition'
import LifestyleVision from '@/components/sections/LifestyleVision'
import PriceCalculatorWarm from '@/components/sections/PriceCalculatorWarm'
import LuxuryGallery from '@/components/sections/LuxuryGallery'
// import ProjectsGrid from '@/components/sections/ProjectsGrid' // Replaced with LuxuryGallery
import ProcessJourney from '@/components/sections/ProcessJourney'
import AssemblyShowcase from '@/components/sections/AssemblyShowcase'
import TestimonialSection from '@/components/sections/TestimonialSection'
import ContactCTA from '@/components/sections/ContactCTA'
import SectionDivider from '@/components/ui/SectionDivider'

export default async function HomePage() {
  const payload = await getPayload({ config })

  // Fetch site settings for hero (gracefully handle missing table)
  let siteSettings = null
  try {
    siteSettings = await payload.findGlobal({
      slug: 'site-settings',
    })
  } catch {
    // Table may not exist yet, use defaults
    console.log('SiteSettings not found, using defaults')
  }

  // Fetch latest projects for showcase
  // const { docs: projects } = await payload.find({
  //   collection: 'projects',
  //   where: { _status: { equals: 'published' } },
  //   limit: 4,
  //   sort: '-createdAt',
  // })
  // ↑ Disabled: LuxuryGallery uses static images

  // Extract hero settings
  const heroImage = siteSettings?.heroImage as Media | null
  const heroVideo = siteSettings?.heroVideo as Media | null
  const heroVideoPoster = siteSettings?.heroVideoPoster as Media | null

  return (
    <main className="min-h-screen bg-[#FFFCF7]">
      {/* 1. Hero Fullscreen - Immersive */}
      <HeroFullscreen
        heroType={siteSettings?.heroType as 'image' | 'video' | undefined}
        heroImage={heroImage ? { url: heroImage.url || undefined, alt: heroImage.alt } : null}
        heroVideo={heroVideo ? { url: heroVideo.url || undefined, alt: heroVideo.alt } : null}
        heroVideoPoster={heroVideoPoster ? { url: heroVideoPoster.url || undefined, alt: heroVideoPoster.alt } : null}
        heroTitle={siteSettings?.heroTitle || undefined}
        heroSubtitle={siteSettings?.heroSubtitle || undefined}
      />

      {/* 2. Value Proposition - Interactive */}
      <ValueProposition />

      {/* 3. Lifestyle Vision - Fa Sognare */}
      <LifestyleVision />

      {/* 4. Luxury Gallery - 52 progetti luxury */}
      <LuxuryGallery />

      {/* Transition: Light to Dark */}
      <SectionDivider from="#FAF7F2" to="#1E3D30" height="200px" />

      {/* 6. Process Journey - Interactive */}
      <ProcessJourney />

      {/* 7. Assembly Showcase - Montaggio Spettacolare */}
      <AssemblyShowcase />

      {/* 8. Testimonial */}
      <TestimonialSection />

      {/* Transition: Dark to Light for Price Calculator */}
      <SectionDivider from="#1E3D30" to="#FFFFFF" height="150px" />

      {/* 9. Price Calculator - Spostato alla fine */}
      <PriceCalculatorWarm />

      {/* Transition: Light to Dark for Final CTA */}
      <SectionDivider from="#FFFFFF" to="#2C2825" height="150px" />

      {/* 10. Contact CTA */}
      <ContactCTA />
    </main>
  )
}
