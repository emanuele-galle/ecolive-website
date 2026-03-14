'use client'

import { motion, type Easing } from 'framer-motion'
import { useEffect, useRef, useState, useMemo, useCallback } from 'react'

const blurTextSpanStyle = { display: 'inline-block', willChange: 'transform, filter, opacity' } as const

interface BlurTextSpanProps {
  segment: string
  index: number
  fromSnapshot: Record<string, string | number>
  toSnapshots: Array<Record<string, string | number>>
  inView: boolean
  totalDuration: number
  times: number[]
  delay: number
  easing: Easing | Easing[]
  isLast: boolean
  addSpace: boolean
  onAnimationComplete?: () => void
  buildKeyframes: (
    from: Record<string, string | number>,
    steps: Array<Record<string, string | number>>,
  ) => Record<string, Array<string | number>>
}

function BlurTextSpan({
  segment,
  index,
  fromSnapshot,
  toSnapshots,
  inView,
  totalDuration,
  times,
  delay,
  easing,
  isLast,
  addSpace,
  onAnimationComplete,
  buildKeyframes,
}: BlurTextSpanProps) {
  const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots)
  const transition = useMemo(
    () => ({
      duration: totalDuration,
      times,
      delay: (index * delay) / 1000,
      ease: easing,
    }),
    [totalDuration, times, index, delay, easing],
  )

  return (
    <motion.span
      key={index}
      initial={fromSnapshot}
      animate={inView ? animateKeyframes : fromSnapshot}
      transition={transition}
      onAnimationComplete={isLast ? onAnimationComplete : undefined}
      style={blurTextSpanStyle}
    >
      {segment === ' ' ? '\u00A0' : segment}
      {addSpace && '\u00A0'}
    </motion.span>
  )
}

type BlurTextProps = {
  text?: string
  delay?: number
  className?: string
  animateBy?: 'words' | 'letters'
  direction?: 'top' | 'bottom'
  threshold?: number
  rootMargin?: string
  easing?: Easing | Easing[]
  onAnimationComplete?: () => void
  stepDuration?: number
}

const BlurText: React.FC<BlurTextProps> = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  easing = (t: number) => t,
  onAnimationComplete,
  stepDuration = 0.35,
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('')
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(ref.current as Element)
        }
      },
      { threshold, rootMargin },
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  const defaultFrom = useMemo(
    () =>
      direction === 'top'
        ? { filter: 'blur(10px)', opacity: 0, y: -30 }
        : { filter: 'blur(10px)', opacity: 0, y: 30 },
    [direction],
  )

  const defaultTo = useMemo(
    () => [{ filter: 'blur(0px)', opacity: 1, y: 0 }],
    [],
  )

  const fromSnapshot = defaultFrom
  const toSnapshots = defaultTo

  const stepCount = toSnapshots.length + 1
  const totalDuration = stepDuration * (stepCount - 1)
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1),
  )

  const buildKeyframes = useCallback((
    from: Record<string, string | number>,
    steps: Array<Record<string, string | number>>,
  ): Record<string, Array<string | number>> => {
    const keys = new Set<string>([
      ...Object.keys(from),
      ...steps.flatMap((s) => Object.keys(s)),
    ])
    const keyframes: Record<string, Array<string | number>> = {}
    keys.forEach((k) => {
      keyframes[k] = [from[k], ...steps.map((s) => s[k])]
    })
    return keyframes
  }, [])

  return (
    <p ref={ref} className={`flex flex-wrap justify-center ${className}`}>
      {elements.map((segment, index) => (
        <BlurTextSpan
          key={index}
          segment={segment}
          index={index}
          fromSnapshot={fromSnapshot}
          toSnapshots={toSnapshots}
          inView={inView}
          totalDuration={totalDuration}
          times={times}
          delay={delay}
          easing={easing}
          isLast={index === elements.length - 1}
          addSpace={animateBy === 'words' && index < elements.length - 1}
          onAnimationComplete={onAnimationComplete}
          buildKeyframes={buildKeyframes}
        />
      ))}
    </p>
  )
}

export default BlurText
