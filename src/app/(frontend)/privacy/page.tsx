'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Shield, Mail, MapPin, Phone, ArrowLeft } from 'lucide-react'

export default function PrivacyPage() {
  const sections = [
    {
      title: 'Titolare del Trattamento',
      content: (
        <>
          <p className="text-gray-600 mb-4">
            Il Titolare del trattamento dei dati personali e:
          </p>
          <div className="bg-[#1D1D1F]/5 rounded-xl p-6 space-y-3">
            <p className="font-semibold text-[#1D1D1F]">Ecolive S.r.l.</p>
            <p className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4 text-[#A0845C]" />
              Via Conte Ruggiero 128, 89822 Spadola (VV)
            </p>
            <p className="flex items-center gap-2 text-gray-600">
              <Mail className="w-4 h-4 text-[#A0845C]" />
              <a href="mailto:info@ecolive.srl" className="hover:text-[#A0845C] transition-colors">
                info@ecolive.srl
              </a>
            </p>
            <p className="flex items-center gap-2 text-gray-600">
              <Phone className="w-4 h-4 text-[#A0845C]" />
              <a href="tel:+3909631951395" className="hover:text-[#A0845C] transition-colors">
                +39 0963 1951395
              </a>
            </p>
          </div>
        </>
      ),
    },
    {
      title: 'Tipologie di Dati Raccolti',
      content: (
        <>
          <p className="text-gray-600 mb-4">
            I dati personali raccolti da questo sito, in modo autonomo o tramite terze parti, includono:
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A0845C] mt-2 flex-shrink-0" />
              <span><strong className="text-[#1D1D1F]">Dati di contatto:</strong> nome, cognome, email, numero di telefono</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A0845C] mt-2 flex-shrink-0" />
              <span><strong className="text-[#1D1D1F]">Dati di navigazione:</strong> cookie tecnici e di analytics</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A0845C] mt-2 flex-shrink-0" />
              <span><strong className="text-[#1D1D1F]">Dati del progetto:</strong> informazioni fornite per richieste di preventivo</span>
            </li>
          </ul>
        </>
      ),
    },
    {
      title: 'Finalita del Trattamento',
      content: (
        <>
          <p className="text-gray-600 mb-4">
            I dati personali sono trattati per le seguenti finalita:
          </p>
          <div className="grid gap-3">
            {[
              { title: 'Rispondere alle richieste', desc: 'Gestione dei contatti e delle richieste di preventivo' },
              { title: 'Migliorare il servizio', desc: 'Analisi statistiche anonime per ottimizzare il sito' },
              { title: 'Obblighi di legge', desc: 'Adempimenti fiscali, contabili e normativi' },
              { title: 'Marketing (con consenso)', desc: 'Invio di comunicazioni promozionali' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 bg-[#A0845C] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">{i + 1}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-[#1D1D1F]">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ),
    },
    {
      title: 'Base Giuridica del Trattamento',
      content: (
        <p className="text-gray-600">
          Il trattamento dei dati personali si basa su: <strong className="text-[#1D1D1F]">consenso dell&apos;interessato</strong> per
          l&apos;invio di comunicazioni commerciali; <strong className="text-[#1D1D1F]">esecuzione di un contratto</strong> per la gestione
          delle richieste di preventivo; <strong className="text-[#1D1D1F]">legittimo interesse</strong> del Titolare per finalita
          statistiche e di miglioramento del servizio; <strong className="text-[#1D1D1F]">obbligo legale</strong> per adempimenti normativi.
        </p>
      ),
    },
    {
      title: 'Conservazione dei Dati',
      content: (
        <p className="text-gray-600">
          I dati personali sono conservati per il tempo strettamente necessario a conseguire le finalita per cui
          sono stati raccolti. In particolare: i dati di contatto sono conservati per <strong className="text-[#1D1D1F]">24 mesi</strong> dalla
          richiesta; i dati contrattuali per <strong className="text-[#1D1D1F]">10 anni</strong> come previsto dalla normativa fiscale;
          i dati di navigazione per un massimo di <strong className="text-[#1D1D1F]">13 mesi</strong>.
        </p>
      ),
    },
    {
      title: 'Diritti dell&apos;Interessato',
      content: (
        <>
          <p className="text-gray-600 mb-4">
            In conformita al GDPR (Regolamento UE 2016/679), l&apos;interessato puo esercitare i seguenti diritti:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              'Diritto di accesso',
              'Diritto di rettifica',
              'Diritto alla cancellazione',
              'Diritto alla portabilita',
              'Diritto di opposizione',
              'Diritto di limitazione',
            ].map((right, i) => (
              <div key={i} className="flex items-center gap-2 p-3 bg-[#1D1D1F]/5 rounded-lg">
                <Shield className="w-4 h-4 text-[#A0845C]" />
                <span className="text-[#1D1D1F] font-medium">{right}</span>
              </div>
            ))}
          </div>
          <p className="text-gray-600 mt-4">
            Per esercitare i tuoi diritti, contattaci all&apos;indirizzo{' '}
            <a href="mailto:info@ecolive.srl" className="text-[#A0845C] hover:underline">
              info@ecolive.srl
            </a>
          </p>
        </>
      ),
    },
    {
      title: 'Cookie',
      content: (
        <p className="text-gray-600">
          Questo sito utilizza cookie tecnici necessari al funzionamento e cookie di terze parti per finalita
          statistiche. Per maggiori informazioni, consulta la nostra{' '}
          <Link href="/cookie" className="text-[#A0845C] hover:underline">
            Cookie Policy
          </Link>.
        </p>
      ),
    },
    {
      title: 'Modifiche alla Privacy Policy',
      content: (
        <p className="text-gray-600">
          Il Titolare si riserva il diritto di apportare modifiche alla presente Privacy Policy in qualunque
          momento. Le modifiche saranno pubblicate su questa pagina. Si consiglia di consultare periodicamente
          questa pagina per essere sempre aggiornati.
        </p>
      ),
    },
  ]

  return (
    <main className="min-h-screen bg-[#F5F5F7]">
      {/* Hero */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-[#1D1D1F] to-[#48484A] overflow-hidden">
        {/* Pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
        />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#A0845C]/20 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
          >
            <Shield className="w-4 h-4 text-[#A0845C]" />
            <span className="text-white/90 text-sm font-medium">Protezione Dati</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Privacy <span className="text-[#A0845C]">Policy</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/70 max-w-2xl mx-auto"
          >
            Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR)
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
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-[#A0845C] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Torna alla Home
            </Link>
          </motion.div>

          {/* Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100"
              >
                <h2 className="text-xl md:text-2xl font-bold text-[#1D1D1F] mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-[#A0845C]/10 rounded-lg flex items-center justify-center text-[#A0845C] font-bold text-sm">
                    {index + 1}
                  </span>
                  {section.title}
                </h2>
                {section.content}
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 p-8 bg-[#1D1D1F] rounded-2xl text-center"
          >
            <h3 className="text-xl font-bold text-white mb-2">Hai domande sulla privacy?</h3>
            <p className="text-white/70 mb-6">
              Contattaci per qualsiasi chiarimento sul trattamento dei tuoi dati personali.
            </p>
            <Link
              href="/contatti"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#A0845C] hover:bg-[#856B45] text-white font-semibold rounded-xl transition-colors"
            >
              <Mail className="w-5 h-5" />
              Contattaci
            </Link>
          </motion.div>
        </div>
      
          {/* Sviluppo e Gestione Tecnica */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 pt-8 border-t border-gray-200"
          >
            <h2 className="text-xl font-bold text-[#1D1D1F] mb-3">Sviluppo e Gestione Tecnica del Sito</h2>
            <p className="text-gray-600">Questo sito web è stato realizzato e viene gestito da:</p>
            <p className="text-gray-600 mt-2">
              <strong className="text-[#1D1D1F]">FODI S.r.l. – Startup Innovativa</strong><br/>
              Via Santicelli 18/A, 88068 Soverato (CZ)<br/>
              P.IVA: 03856160793<br/>
              Email: <a href="mailto:info@fodisrl.it" className="text-[#A0845C] hover:underline">info@fodisrl.it</a><br/>
              Tel: +39 0963 576433<br/>
              Web: <a href="https://www.fodisrl.it" target="_blank" rel="noopener noreferrer" className="text-[#A0845C] hover:underline">www.fodisrl.it</a>
            </p>
          </motion.div>
        </section>
    </main>
  )
}
