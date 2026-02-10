'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FileText, ArrowLeft, Mail, MapPin, Phone, AlertTriangle, CheckCircle } from 'lucide-react'

export default function TerminiPage() {
  const sections = [
    {
      title: 'Accettazione dei Termini',
      content: (
        <p className="text-gray-600">
          L&apos;accesso e l&apos;utilizzo di questo sito web implica l&apos;accettazione dei presenti Termini di Servizio.
          Se non accetti questi termini, ti preghiamo di non utilizzare il sito. Ecolive S.r.l. si riserva
          il diritto di modificare questi termini in qualsiasi momento, pubblicando la versione aggiornata
          su questa pagina.
        </p>
      ),
    },
    {
      title: 'Titolare del Sito',
      content: (
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
          <p className="text-gray-600">P.IVA: 03012345678</p>
        </div>
      ),
    },
    {
      title: 'Servizi Offerti',
      content: (
        <>
          <p className="text-gray-600 mb-4">
            Questo sito web fornisce informazioni sui servizi di Ecolive S.r.l., tra cui:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              'Progettazione case in legno',
              'Sistema costruttivo X-Frame',
              'Preventivi personalizzati',
              'Consulenza tecnica',
              'Assistenza post-vendita',
              'Documentazione tecnica',
            ].map((service, i) => (
              <div key={i} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <CheckCircle className="w-4 h-4 text-[#A0845C]" />
                <span className="text-gray-700">{service}</span>
              </div>
            ))}
          </div>
        </>
      ),
    },
    {
      title: 'Proprieta Intellettuale',
      content: (
        <>
          <p className="text-gray-600 mb-4">
            Tutti i contenuti presenti su questo sito sono protetti da diritto d&apos;autore:
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A0845C] mt-2 flex-shrink-0" />
              <span><strong className="text-[#1D1D1F]">Testi e contenuti:</strong> articoli, descrizioni, FAQ</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A0845C] mt-2 flex-shrink-0" />
              <span><strong className="text-[#1D1D1F]">Immagini e fotografie:</strong> render, foto progetti, team</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A0845C] mt-2 flex-shrink-0" />
              <span><strong className="text-[#1D1D1F]">Marchi e loghi:</strong> Ecolive, X-Frame</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A0845C] mt-2 flex-shrink-0" />
              <span><strong className="text-[#1D1D1F]">Design e grafica:</strong> layout, elementi visivi</span>
            </li>
          </ul>
          <p className="text-gray-600 mt-4">
            E vietata la riproduzione, distribuzione o modifica dei contenuti senza autorizzazione scritta.
          </p>
        </>
      ),
    },
    {
      title: 'Uso del Sito',
      content: (
        <>
          <p className="text-gray-600 mb-4">L&apos;utente si impegna a:</p>
          <div className="space-y-3">
            {[
              { do: true, text: 'Utilizzare il sito per scopi leciti e conformi alla legge' },
              { do: true, text: 'Fornire informazioni veritiere nei moduli di contatto' },
              { do: true, text: 'Rispettare la proprieta intellettuale dei contenuti' },
              { do: false, text: 'Tentare di accedere a aree riservate senza autorizzazione' },
              { do: false, text: 'Utilizzare bot, scraper o strumenti automatizzati' },
              { do: false, text: 'Diffondere contenuti dannosi o illegali' },
            ].map((item, i) => (
              <div key={i} className={`flex items-start gap-3 p-3 rounded-lg ${item.do ? 'bg-green-50' : 'bg-red-50'}`}>
                {item.do ? (
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                )}
                <span className={item.do ? 'text-green-800' : 'text-red-800'}>{item.text}</span>
              </div>
            ))}
          </div>
        </>
      ),
    },
    {
      title: 'Preventivi e Contratti',
      content: (
        <>
          <p className="text-gray-600 mb-4">
            Le informazioni sui prezzi presenti sul sito hanno valore puramente indicativo:
          </p>
          <div className="bg-[#A0845C]/10 rounded-xl p-5 border-l-4 border-[#A0845C]">
            <p className="text-gray-700">
              <strong className="text-[#1D1D1F]">Importante:</strong> I preventivi definitivi vengono elaborati
              su richiesta specifica e tengono conto delle caratteristiche del progetto, del terreno e delle
              personalizzazioni richieste. Solo il preventivo firmato costituisce proposta contrattuale vincolante.
            </p>
          </div>
        </>
      ),
    },
    {
      title: 'Limitazione di Responsabilita',
      content: (
        <>
          <p className="text-gray-600 mb-4">
            Ecolive S.r.l. non e responsabile per:
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
              <span>Danni derivanti dall&apos;impossibilita di accedere al sito</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
              <span>Errori o inesattezze nei contenuti informativi</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
              <span>Contenuti di siti web di terze parti collegati</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
              <span>Decisioni prese sulla base delle informazioni del sito</span>
            </li>
          </ul>
        </>
      ),
    },
    {
      title: 'Link a Siti Esterni',
      content: (
        <p className="text-gray-600">
          Questo sito puo contenere link a siti web di terze parti. Ecolive S.r.l. non ha alcun controllo
          su tali siti e non e responsabile dei loro contenuti, politiche sulla privacy o pratiche.
          L&apos;inclusione di link non implica approvazione o affiliazione con i siti collegati.
        </p>
      ),
    },
    {
      title: 'Legge Applicabile e Foro Competente',
      content: (
        <p className="text-gray-600">
          I presenti Termini di Servizio sono regolati dalla legge italiana. Per qualsiasi controversia
          relativa all&apos;interpretazione o esecuzione dei presenti termini sara competente in via esclusiva
          il Foro di Vibo Valentia, salvo il caso in cui l&apos;utente sia qualificabile come consumatore ai
          sensi del D.Lgs. 206/2005, nel qual caso sara competente il foro del luogo di residenza o
          domicilio del consumatore.
        </p>
      ),
    },
    {
      title: 'Contatti',
      content: (
        <p className="text-gray-600">
          Per qualsiasi domanda relativa ai presenti Termini di Servizio, puoi contattarci all&apos;indirizzo{' '}
          <a href="mailto:info@ecolive.srl" className="text-[#A0845C] hover:underline">
            info@ecolive.srl
          </a>{' '}
          o tramite la nostra{' '}
          <Link href="/contatti" className="text-[#A0845C] hover:underline">
            pagina contatti
          </Link>.
        </p>
      ),
    },
  ]

  return (
    <main className="min-h-screen bg-[#F5F5F7]">
      {/* Hero */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-[#1D1D1F] to-[#48484A] overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
        />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#A0845C]/20 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
          >
            <FileText className="w-4 h-4 text-[#A0845C]" />
            <span className="text-white/90 text-sm font-medium">Condizioni d&apos;Uso</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Termini di <span className="text-[#A0845C]">Servizio</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/70 max-w-2xl mx-auto"
          >
            Condizioni generali di utilizzo del sito web Ecolive
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
              className="inline-flex items-center gap-2 text-gray-500 hover:text-[#A0845C] transition-colors"
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

          {/* Related Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 p-8 bg-[#1D1D1F] rounded-2xl"
          >
            <h3 className="text-xl font-bold text-white mb-4 text-center">Documenti Correlati</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/privacy"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#A0845C] hover:bg-[#856B45] text-white font-medium rounded-xl transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/cookie"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl border border-white/20 transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
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
