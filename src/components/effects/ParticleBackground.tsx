'use client'

import { useEffect, useMemo, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { type Container, type ISourceOptions } from "@tsparticles/engine"
import { loadSlim } from "@tsparticles/slim"

interface ParticleBackgroundProps {
  id?: string
  className?: string
  particleCount?: number
  color?: string
  opacity?: number
}

/**
 * Particle background component using tsparticles
 * Optimized for performance with slim version
 */
export default function ParticleBackground({
  id = "tsparticles",
  className = "",
  particleCount = 20,
  color = "#C4704B",
  opacity = 0.15
}: ParticleBackgroundProps) {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  const particlesLoaded = async (container?: Container): Promise<void> => {
    // Particle container loaded callback
  }

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: false,
          },
          onHover: {
            enable: true,
            mode: "grab",
          },
        },
        modes: {
          grab: {
            distance: 140,
            links: {
              opacity: 0.3,
            },
          },
        },
      },
      particles: {
        color: {
          value: color,
        },
        links: {
          color: color,
          distance: 150,
          enable: true,
          opacity: opacity * 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 0.5,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: particleCount,
        },
        opacity: {
          value: opacity,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    [color, opacity, particleCount]
  )

  if (!init) {
    return null
  }

  return (
    <Particles
      id={id}
      className={`absolute inset-0 -z-10 ${className}`}
      particlesLoaded={particlesLoaded}
      options={options}
    />
  )
}
