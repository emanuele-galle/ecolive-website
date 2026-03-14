'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'

const willChangeTransformStyle = { willChange: 'transform' } as const

interface InfiniteMarqueeProps {
  items: string[]
  speed?: number
  direction?: 'left' | 'right'
  pauseOnHover?: boolean
  separator?: string
  className?: string
}

export default function InfiniteMarquee({
  items,
  speed = 30,
  direction = 'left',
  pauseOnHover = true,
  separator = '\u00A0\u2022\u00A0',
  className = '',
}: InfiniteMarqueeProps) {
  const content = items.join(` ${separator} `) + ` ${separator} `
  // Duplicate for seamless loop
  const doubled = content + content

  const duration = (items.length * 8 * 30) / speed

  const marqueeAnimate = useMemo(() => ({
    x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
  }), [direction])

  const marqueeTransition = useMemo(() => ({
    x: {
      repeat: Infinity,
      repeatType: 'loop' as const,
      duration,
      ease: 'linear' as const,
    },
  }), [duration])

  return (
    <div
      className={`overflow-hidden whitespace-nowrap ${pauseOnHover ? '[&:hover_>_div]:animation-play-state-paused' : ''} ${className}`}
      aria-label={items.join(', ')}
    >
      <motion.div
        className="inline-block uppercase tracking-[0.25em] text-sm font-medium"
        animate={marqueeAnimate}
        transition={marqueeTransition}
        {...(pauseOnHover && {
          whileHover: { animationPlayState: 'paused' } as never,
        })}
        style={pauseOnHover ? willChangeTransformStyle : undefined}
      >
        {doubled}
      </motion.div>
    </div>
  )
}
