'use client'

import { useInView, useMotionValue, useSpring } from 'framer-motion'
import { useCallback, useEffect, useRef } from 'react'

interface CountUpProps {
  to: number
  from?: number
  delay?: number
  duration?: number
  decimals?: number
  className?: string
  separator?: string
  suffix?: string
  onEnd?: () => void
}

export default function CountUp({
  to,
  from = 0,
  delay = 0,
  duration = 2,
  decimals = 0,
  className = '',
  separator = '',
  suffix = '',
  onEnd,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(from)
  const damping = 20 + 40 * (1 / duration)
  const stiffness = 100 * (1 / duration)
  const springValue = useSpring(motionValue, { damping, stiffness })
  const isInView = useInView(ref, { once: true, margin: '0px' })

  const formatValue = useCallback(
    (latest: number) => {
      const value = decimals > 0 ? parseFloat(latest.toFixed(decimals)) : Math.round(latest)
      const options: Intl.NumberFormatOptions = {
        useGrouping: !!separator,
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }
      const formatted = Intl.NumberFormat('it-IT', options).format(value)
      return (separator ? formatted.replace(/\./g, separator) : formatted) + suffix
    },
    [separator, suffix, decimals],
  )

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = formatValue(from)
    }
  }, [from, formatValue])

  useEffect(() => {
    if (isInView) {
      const timeoutId = setTimeout(() => {
        motionValue.set(to)
      }, delay * 1000)
      const durationTimeoutId = setTimeout(() => {
        onEnd?.()
      }, delay * 1000 + duration * 1000)
      return () => {
        clearTimeout(timeoutId)
        clearTimeout(durationTimeoutId)
      }
    }
  }, [isInView, motionValue, to, delay, onEnd, duration])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest: number) => {
      if (ref.current) {
        ref.current.textContent = formatValue(latest)
      }
    })
    return () => unsubscribe()
  }, [springValue, formatValue])

  return <span className={className} ref={ref} aria-label={`${to}${suffix}`} />
}
