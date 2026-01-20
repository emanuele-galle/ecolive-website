import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Media } from '@/payload-types'

// Import Warm Natural section components
import HeroFullscreen from '@/components/sections/HeroFullscreen'
import TrustBar from '@/components/sections/TrustBar'
import ValueProposition from '@/components/sections/ValueProposition'
import PriceCalculatorWarm from '@/components/sections/PriceCalculatorWarm'
import ProjectsGrid from '@/components/sections/ProjectsGrid'
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
  const { docs: projects } = await payload.find({
    collection: 'projects',
    where: { _status: { equals: 'published' } },
    limit: 4,
    sort: '-createdAt',
  })

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

      {/* Transition: Hero dark to TrustBar light */}
      <SectionDivider from="#2C2825" to="#F5F0E8" height="200px" />

      {/* 2. Trust Bar - Certifications */}
      <TrustBar />

      {/* 3. Value Proposition - 3 Cards */}
      <ValueProposition />

      {/* 4. Price Calculator - Redesigned */}
      <PriceCalculatorWarm />

      {/* 5. Projects Grid - 2x2 */}
      <ProjectsGrid projects={projects} />

      {/* Transition: Light to Dark */}
      <SectionDivider from="#FAF7F2" to="#1E3D30" height="200px" />

      {/* 6. Process Journey - Interactive */}
      <ProcessJourney />

      {/* 7. Assembly Showcase - Montaggio Spettacolare */}
      <AssemblyShowcase />

      {/* 8. Testimonial */}
      <TestimonialSection />

      {/* Transition: Testimonial dark to CTA */}
      <SectionDivider from="#1E3D30" to="#2C2825" height="150px" />

      {/* 8. Contact CTA */}
      <ContactCTA />
    </main>
  )
}
