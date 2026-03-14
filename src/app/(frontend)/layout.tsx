import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#A0845C] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold"
      >
        Salta al contenuto principale
      </a>
      <Header />
      <main id="main-content">
        {children}
      </main>
      <Footer />
    </>
  )
}
