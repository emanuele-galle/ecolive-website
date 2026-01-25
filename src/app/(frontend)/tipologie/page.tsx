'use client'

import { useRef, useCallback } from 'react'
import { tipologie } from '@/data/tipologie'
import FullscreenTipologiaSection from '@/components/tipologie/FullscreenTipologiaSection'

export default function TipologiePage() {
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollToSection = useCallback((index: number) => {
    const section = document.getElementById(`section-${tipologie[index].id}`)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <main
      ref={containerRef}
      className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth"
      style={{ scrollSnapType: 'y mandatory' }}
    >
      {tipologie.map((tipologia, index) => (
        <FullscreenTipologiaSection
          key={tipologia.id}
          tipologia={tipologia}
          index={index}
          total={tipologie.length}
          onDotClick={scrollToSection}
        />
      ))}
    </main>
  )
}
