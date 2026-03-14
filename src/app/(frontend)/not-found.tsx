import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-surface)] px-4">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-bold text-[var(--color-primary)] mb-4">404</h1>
        <h2 className="text-2xl font-bold text-[var(--color-secondary-dark)] mb-4">
          Pagina non trovata
        </h2>
        <p className="text-[var(--color-muted)] text-lg mb-8">
          La pagina che stai cercando non esiste o è stata spostata.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-xl font-semibold hover:bg-[#856B45] transition-colors"
          >
            Torna alla Homepage
          </Link>
          <Link
            href="/contatti"
            className="px-6 py-3 border border-[var(--color-border)] text-[var(--color-secondary-dark)] rounded-xl font-semibold hover:bg-[var(--color-surface)] transition-colors"
          >
            Contattaci
          </Link>
        </div>
      </div>
    </div>
  )
}
