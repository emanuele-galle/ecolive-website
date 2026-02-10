'use client'

import Link from 'next/link'
import { type ComponentProps, ReactNode } from 'react'

type NextLinkProps = ComponentProps<typeof Link>

interface AnimatedLinkProps extends NextLinkProps {
  children: ReactNode
  underlineColor?: string
  className?: string
}

export default function AnimatedLink({
  children,
  underlineColor = 'currentColor',
  className = '',
  ...linkProps
}: AnimatedLinkProps) {
  return (
    <Link
      {...linkProps}
      className={`group relative inline-block ${className}`}
    >
      {children}
      <span
        className="absolute bottom-0 left-0 h-[1.5px] w-0 group-hover:w-full transition-all duration-300 ease-out"
        style={{ backgroundColor: underlineColor }}
        aria-hidden="true"
      />
    </Link>
  )
}
