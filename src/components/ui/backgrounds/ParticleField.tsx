'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  baseX: number
  baseY: number
}

interface ParticleFieldProps {
  // Number of particles (max 50 for performance)
  particleCount?: number
  // Particle color
  color?: string
  // Max particle radius
  maxRadius?: number
  // Mouse interaction radius
  mouseRadius?: number
  // Connection line opacity
  lineOpacity?: number
  // Max distance for particle connections
  connectionDistance?: number
  // Z-index
  zIndex?: number
  // Additional class name
  className?: string
}

/**
 * ParticleField
 *
 * Canvas-based particle system that reacts to mouse movement.
 * Particles float gently and connect with lines when close.
 */
export default function ParticleField({
  particleCount = 40,
  color = 'rgba(196, 112, 75, 0.6)',
  maxRadius = 3,
  mouseRadius = 150,
  lineOpacity = 0.15,
  connectionDistance = 120,
  zIndex = 0,
  className = '',
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0, active: false })
  const animationRef = useRef<number | undefined>(undefined)
  const animateFnRef = useRef<((ctx: CanvasRenderingContext2D, width: number, height: number) => void) | null>(null)
  const [isEnabled, setIsEnabled] = useState(false)

  // Check for capability
  useEffect(() => {
    const checkCapability = () => {
      const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      setIsEnabled(hasHover && !prefersReduced)
    }

    checkCapability()

    const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    hoverQuery.addEventListener('change', checkCapability)
    motionQuery.addEventListener('change', checkCapability)

    return () => {
      hoverQuery.removeEventListener('change', checkCapability)
      motionQuery.removeEventListener('change', checkCapability)
    }
  }, [])

  // Initialize particles
  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = []
    const count = Math.min(particleCount, 50) // Cap at 50 for performance

    for (let i = 0; i < count; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * maxRadius + 1,
        opacity: Math.random() * 0.5 + 0.3,
        baseX: x,
        baseY: y,
      })
    }

    particlesRef.current = particles
  }, [particleCount, maxRadius])

  // Animation loop
  const animate = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height)

    const particles = particlesRef.current
    const mouse = mouseRef.current

    // Update and draw particles
    particles.forEach((p, i) => {
      // Move particle
      p.x += p.vx
      p.y += p.vy

      // Bounce off edges with some padding
      if (p.x < 0 || p.x > width) p.vx *= -1
      if (p.y < 0 || p.y > height) p.vy *= -1

      // Keep in bounds
      p.x = Math.max(0, Math.min(width, p.x))
      p.y = Math.max(0, Math.min(height, p.y))

      // Mouse interaction - push particles away
      if (mouse.active) {
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < mouseRadius) {
          const force = (mouseRadius - dist) / mouseRadius
          const angle = Math.atan2(dy, dx)
          p.x += Math.cos(angle) * force * 3
          p.y += Math.sin(angle) * force * 3
        }
      }

      // Draw particle
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      ctx.fillStyle = color.replace(/[\d.]+\)$/, `${p.opacity})`)
      ctx.fill()

      // Draw connections to nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j]
        const dx = p.x - p2.x
        const dy = p.y - p2.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < connectionDistance) {
          const opacity = (1 - dist / connectionDistance) * lineOpacity
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.strokeStyle = color.replace(/[\d.]+\)$/, `${opacity})`)
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
    })

    animationRef.current = requestAnimationFrame(() => animateFnRef.current?.(ctx, width, height))
  }, [color, mouseRadius, connectionDistance, lineOpacity])

  // Keep animateFnRef in sync
  useEffect(() => {
    animateFnRef.current = animate
  }, [animate])

  // Set up canvas and animation
  useEffect(() => {
    if (!isEnabled || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (!parent) return

      const rect = parent.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`

      ctx.scale(dpr, dpr)

      initParticles(rect.width, rect.height)
    }

    resizeCanvas()
    animate(ctx, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1))

    const resizeObserver = new ResizeObserver(resizeCanvas)
    resizeObserver.observe(canvas.parentElement!)

    return () => {
      resizeObserver.disconnect()
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isEnabled, initParticles, animate])

  // Mouse tracking
  useEffect(() => {
    if (!isEnabled || !canvasRef.current) return

    const canvas = canvasRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    canvas.addEventListener('mousemove', handleMouseMove, { passive: true })
    canvas.addEventListener('mouseleave', handleMouseLeave, { passive: true })

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isEnabled])

  if (!isEnabled) return null

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ zIndex }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-auto"
      />
    </div>
  )
}
