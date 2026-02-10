"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface SavingsStep {
  year: number
  label: string
  value: string
}

interface InteractiveMaterialCardProps {
  icon: LucideIcon
  title: string
  comparison: string
  benefitImmediate: string
  savingsTimeline: SavingsStep[]
  className?: string
}

export function InteractiveMaterialCard({
  icon: Icon,
  title,
  comparison,
  benefitImmediate,
  savingsTimeline,
  className,
}: InteractiveMaterialCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["7.5deg", "-7.5deg"]
  )
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-7.5deg", "7.5deg"]
  )

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      className={cn(
        "relative h-full rounded-2xl overflow-hidden",
        "bg-white/5 backdrop-blur-md border border-white/10",
        "cursor-pointer group",
        className
      )}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02, y: -8 }}
      transition={{ duration: 0.3 }}
    >
      {/* Default Content */}
      <motion.div
        className="relative z-10 p-6 md:p-8 h-full flex flex-col"
        style={{ transform: "translateZ(50px)" }}
        initial={{ opacity: 1 }}
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Icon */}
        <motion.div
          className="w-14 h-14 rounded-xl bg-[#A0845C]/20 flex items-center justify-center mb-4"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Icon className="w-7 h-7 text-[#A0845C]" />
        </motion.div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
          {title}
        </h3>

        {/* Benefit */}
        <p className="text-[#7da0b2] text-sm md:text-base leading-relaxed mb-4">
          {benefitImmediate}
        </p>

        {/* Comparison badge */}
        <div className="mt-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/80">
            {comparison}
          </span>
        </div>
      </motion.div>

      {/* ROI Timeline Overlay (shown on hover) */}
      <motion.div
        className="absolute inset-0 z-20 p-6 md:p-8 flex flex-col bg-gradient-to-br from-[#A0845C]/90 to-[#1D1D1F]/90 backdrop-blur-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: isHovered ? "auto" : "none" }}
      >
        <h4 className="text-lg md:text-xl font-bold text-white mb-4">
          Guadagni negli Anni
        </h4>

        {/* Timeline steps */}
        <div className="flex flex-col gap-4 flex-1 justify-center">
          {savingsTimeline.map((step, index) => (
            <motion.div
              key={step.year}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -20 }}
              transition={{ delay: 0.1 + index * 0.08, duration: 0.3 }}
              className="flex items-start gap-3"
            >
              {/* Year badge */}
              <div className="shrink-0 w-16 h-16 rounded-lg bg-white/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-white font-bold text-lg leading-tight">
                    {step.year === 0 ? "Ora" : `${step.year}a`}
                  </div>
                  <div className="text-white/70 text-xs">{step.label}</div>
                </div>
              </div>

              {/* Value */}
              <div className="flex-1">
                <p className="text-white text-sm md:text-base font-medium leading-relaxed">
                  {step.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Arrow indicator */}
        <div className="mt-4 text-center">
          <span className="text-white/60 text-xs">
            Hover per tornare
          </span>
        </div>
      </motion.div>

      {/* Glassmorphism border glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-[#A0845C]/50 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}
