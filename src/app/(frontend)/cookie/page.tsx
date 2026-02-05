'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Cookie, ArrowLeft, Settings, BarChart3, Share2, CheckCircle } from 'lucide-react'

export default function CookiePage() {
  const cookieTypes = [
    {
      icon: Settings,
      title: 'Cookie Tecnici',
      description: 'Essenziali per il funzionamento del sito',
      required: true,
      examples: ['Sessione utente', 'Preferenze di navigazione', 'Sicurezza'],
      duration: 'Sessione o 12 mesi',
    },
    {
      icon: BarChart3,
      title: 'Cookie Analitici',
      description: 'Per analisi statistiche anonime',
      required: false,
      examples: ['Google Analytics', 'Statistiche visite', 'Pagine visualizzate'],
      duration: '24 mesi',
    },
    {
      icon: Share2,
      title: 'Cookie di Marketing',
      description: 'Per pubblicita personalizzata',
      required: false,
      examples: ['Facebook Pixel', 'Google Ads', 'Remarketing'],
      duration: '12 mesi',
    },
  ]

  const sections = [
    {
      title: 'Cosa sono i Cookie',
      content: (
        <p className="text-gray-600">
          I cookie sono piccoli file di testo che i siti web salvano sul tuo dispositivo durante la navigazione.
          Servono a migliorare l&apos;esperienza utente, ricordare le preferenze e raccogliere informazioni
          statistiche anonime. Non contengono virus e non accedono ai dati personali sul tuo dispositivo.
        </p>
      ),
    },
    {
      title: 'Cookie Utilizzati',
      content: (
        <div className="space-y-4">
          {cookieTypes.map((cookie, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  cookie.required ? 'bg-[#1E3D30]' : 'bg-[#C4704B]/10'
                }`}>
                  <cookie.icon className={`w-6 h-6 ${cookie.required ? 'text-white' : 'text-[#C4704B]'}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-[#1E3D30]">{cookie.title}</h4>
                    {cookie.required && (
                      <span className="text-xs px-2 py-0.5 bg-[#1E3D30]/10 text-[#1E3D30] rounded-full font-medium">
                        Necessari
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{cookie.description}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {cookie.examples.map((ex, j) => (
                      <span key={j} className="text-xs px-2 py-1 bg-white rounded-lg text-gray-500 border border-gray-200">
                        {ex}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400">Durata: {cookie.duration}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Cookie di Terze Parti',
      content: (
        <>
          <p className="text-gray-600 mb-4">
            Questo sito puo utilizzare servizi di terze parti che installano cookie propri:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { name: 'Google Analytics', purpose: 'Statistiche di traffico', link: 'https://policies.google.com/privacy' },
              { name: 'Google Maps', purpose: 'Mappe interattive', link: 'https://policies.google.com/privacy' },
              { name: 'YouTube', purpose: 'Video incorporati', link: 'https://policies.google.com/privacy' },
              { name: 'Facebook', purpose: 'Widget social', link: 'https://www.facebook.com/privacy/policy' },
            ].map((service, i) => (
              <div key={i} className="p-4 bg-[#1E3D30]/5 rounded-xl">
                <h4 className="font-semibold text-[#1E3D30]">{service.name}</h4>
                <p className="text-sm text-gray-600">{service.purpose}</p>
                <a
                  href={service.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#C4704B] hover:underline"
                >
                  Privacy Policy →
                </a>
              </div>
            ))}
          </div>
        </>
      ),
    },
    {
      title: 'Come Gestire i Cookie',
      content: (
        <>
          <p className="text-gray-600 mb-4">
            Puoi gestire le preferenze sui cookie in diversi modi:
          </p>
          <div className="space-y-3">
            {[
              { title: 'Banner Cookie', desc: 'Usa il banner che appare alla prima visita per accettare o rifiutare i cookie non essenziali' },
              { title: 'Impostazioni Browser', desc: 'Configura il tuo browser per bloccare o eliminare i cookie' },
              { title: 'Opt-out Analytics', desc: 'Installa il componente aggiuntivo per disattivare Google Analytics' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#C4704B] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-[#1E3D30]">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ),
    },
    {
      title: 'Disabilitazione Cookie per Browser',
      content: (
        <>
          <p className="text-gray-600 mb-4">
            Ecco come disabilitare i cookie nei principali browser:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { browser: 'Chrome', link: 'https://support.google.com/chrome/answer/95647' },
              { browser: 'Firefox', link: 'https://support.mozilla.org/it/kb/protezione-antitracciamento-avanzata-firefox-desktop' },
              { browser: 'Safari', link: 'https://support.apple.com/it-it/guide/safari/sfri11471/mac' },
              { browser: 'Edge', link: 'https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge' },
            ].map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
              >
                <div className="w-10 h-10 bg-[#C4704B]/10 rounded-lg flex items-center justify-center group-hover:bg-[#C4704B]/20 transition-colors">
                  <Settings className="w-5 h-5 text-[#C4704B]" />
                </div>
                <span className="font-medium text-[#1E3D30]">{item.browser}</span>
              </a>
            ))}
          </div>
        </>
      ),
    },
    {
      title: 'Aggiornamenti',
      content: (
        <p className="text-gray-600">
          Questa Cookie Policy puo essere aggiornata periodicamente. Ti invitiamo a consultare
          questa pagina regolarmente per essere informato su eventuali modifiche. La data dell&apos;ultimo
          aggiornamento e indicata in cima alla pagina.
        </p>
      ),
    },
  ]

  return (
    <main className="min-h-screen bg-[#FAF7F2]">
      {/* Hero */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-[#1E3D30] to-[#2D5A47] overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
        />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C4704B]/20 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
          >
            <Cookie className="w-4 h-4 text-[#C4704B]" />
            <span className="text-white/90 text-sm font-medium">Informativa Cookie</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Cookie <span className="text-[#C4704B]">Policy</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/70 max-w-2xl mx-auto"
          >
            Informativa sull&apos;utilizzo dei cookie su questo sito web
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/50 mt-6 text-sm"
          >
            Ultimo aggiornamento: Gennaio 2025
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-[#C4704B] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Torna alla Home
            </Link>
          </motion.div>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100"
              >
                <h2 className="text-xl md:text-2xl font-bold text-[#1E3D30] mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-[#C4704B]/10 rounded-lg flex items-center justify-center text-[#C4704B] font-bold text-sm">
                    {index + 1}
                  </span>
                  {section.title}
                </h2>
                {section.content}
              </motion.div>
            ))}
          </div>

          {/* Related Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 p-8 bg-[#1E3D30] rounded-2xl"
          >
            <h3 className="text-xl font-bold text-white mb-4 text-center">Documenti Correlati</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/privacy"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl border border-white/20 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/termini"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#C4704B] hover:bg-[#A85A3A] text-white font-medium rounded-xl transition-colors"
              >
                Termini di Servizio
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    
          {/* Sviluppo e Gestione Tecnica */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">Sviluppo e Gestione Tecnica del Sito</h2>
            <p className="text-white/70">Questo sito web è stato realizzato e viene gestito da:</p>
            <p className="text-white/70 mt-2">
              <strong className="text-white">FODI S.r.l. – Startup Innovativa</strong><br/>
              Via Santicelli 18/A, 88068 Soverato (CZ)<br/>
              P.IVA: 03856160793<br/>
              Email: <a href="mailto:info@fodisrl.it" className="text-[var(--color-primary)] hover:underline">info@fodisrl.it</a><br/>
              Tel: +39 0963 576433<br/>
              Web: <a href="https://www.fodisrl.it" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] hover:underline">www.fodisrl.it</a>
            </p>
          </div>
    </main>
  )
}
