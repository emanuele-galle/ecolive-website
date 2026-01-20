'use client'

import dynamic from 'next/dynamic'
import type { SubmitQuoteResult } from '@/lib/configuratore-v2/types'

interface ConfiguratoreWrapperProps {
  onSubmit: (formData: FormData) => Promise<SubmitQuoteResult>
}

// Dynamic import con ssr: false per evitare errori di hydration
const ConfiguratoreClient = dynamic(() => import('./ConfiguratoreClient'), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-screen bg-[#FAF7F2] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#2D5A47] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Caricamento configuratore...</p>
      </div>
    </div>
  ),
})

export default function ConfiguratoreWrapper({ onSubmit }: ConfiguratoreWrapperProps) {
  return <ConfiguratoreClient onSubmit={onSubmit} />
}
