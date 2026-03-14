export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-surface)]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-3 border-[#A0845C] border-t-transparent rounded-full animate-spin" />
        <p className="text-[var(--color-muted)] text-sm">Caricamento...</p>
      </div>
    </div>
  )
}
