'use client'

import Link from 'next/link'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-surface)] px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-[var(--color-primary)] mb-4">Errore</h1>
        <p className="text-[var(--color-muted)] text-lg mb-8">
          Si è verificato un errore imprevisto. Riprova o torna alla homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-xl font-semibold hover:bg-[#856B45] transition-colors"
          >
            Riprova
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-[var(--color-border)] text-[var(--color-secondary-dark)] rounded-xl font-semibold hover:bg-[var(--color-surface)] transition-colors"
          >
            Torna alla Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
