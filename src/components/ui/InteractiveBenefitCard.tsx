'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InteractiveBenefitCardProps {
  icon: LucideIcon
  title: string
  collapsedText: string
  expandedContent: React.ReactNode
  isActive: boolean
  onClick: () => void
}

export default function InteractiveBenefitCard({
  icon: Icon,
  title,
  collapsedText,
  expandedContent,
  isActive,
  onClick,
}: InteractiveBenefitCardProps) {
  return (
    <motion.div
      onClick={onClick}
      className={cn(
        'relative p-8 rounded-2xl cursor-pointer transition-all duration-300',
        'bg-white border-2',
        isActive
          ? 'border-[#C4704B] shadow-2xl shadow-[#C4704B]/20'
          : 'border-[#DDD5C9] hover:border-[#C4704B]/50'
      )}
      whileHover={{ y: -8 }}
      animate={{ height: 'auto' }}
      layout
    >
      <div className="flex items-center gap-4 mb-4">
        <div className={cn(
          'w-12 h-12 rounded-xl flex items-center justify-center transition-colors',
          isActive ? 'bg-[#C4704B]' : 'bg-[#C4704B]/10'
        )}>
          <Icon className={cn(
            'w-6 h-6 transition-colors',
            isActive ? 'text-white' : 'text-[#C4704B]'
          )} />
        </div>
        <h3 className="text-xl font-bold text-[#1E3D30]">{title}</h3>
      </div>

      <p className="text-gray-600 mb-2">{collapsedText}</p>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-6 pt-6 border-t border-[#DDD5C9]">
              {expandedContent}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click indicator */}
      <div className="absolute bottom-4 right-4">
        <motion.div
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-[#C4704B]"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  )
}
