import { Metadata } from 'next'
import Link from 'next/link'
import { Users, TrendingUp, Wrench, Award, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Franchising e Affiliazione | Ecolive',
  description: 'Diventa partner Ecolive. Opportunità di franchising e affiliazione per imprenditori edili. Know-how, formazione e lead generation garantita.',
}

const benefits = [
  {
    icon: Wrench,
    title: 'Know-How Completo',
    description: 'Formazione su tecnologia X-Frame, processi produttivi, software gestionale e tecniche di vendita.',
  },
  {
    icon: TrendingUp,
    title: 'Lead Generation',
    description: 'Forniamo contatti qualificati dalla tua area geografica. Marketing centralizzato e campagne pubblicitarie.',
  },
  {
    icon: Users,
    title: 'Supporto Continuo',
    description: 'Assistenza tecnica e commerciale dedicata. Team di esperti sempre disponibile.',
  },
  {
    icon: Award,
    title: 'Brand Riconosciuto',
    description: 'Utilizzo del marchio Ecolive, certificazioni e referenze nazionali.',
  },
]

const requirements = [
  'Esperienza nel settore edile o imprenditoriale',
  'Capacità di investimento iniziale',
  'Struttura commerciale o rete di vendita',
  'Motivazione e visione a lungo termine',
  'Area geografica disponibile',
]

const partnershipTypes = [
  {
    title: 'Affiliato Commerciale',
    description: 'Vendi le case Ecolive nella tua zona. Noi produciamo e montiamo, tu gestisci il cliente.',
    features: ['No produzione', 'Vendita e assistenza', 'Commissioni su vendite', 'Formazione commerciale'],
  },
  {
    title: 'Partner Produttivo',
    description: 'Produci le componenti X-Frame nel tuo stabilimento. Licenza tecnologica esclusiva.',
    features: ['Licenza produzione', 'Formazione tecnica', 'Esclusiva territoriale', 'Investimento maggiore'],
  },
]

export default function FranchisingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-[#1D1D1F] to-[#48484A]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-[#A0845C] bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            Opportunità di Business
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Diventa Partner
            <span className="block text-[#A0845C]">Ecolive</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Unisciti alla rivoluzione della bioedilizia. Entra nel network Ecolive e costruisci il futuro dell&apos;abitare sostenibile.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1D1D1F] mb-12 text-center">Cosa Offriamo</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-[#A0845C]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-[#A0845C]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1D1D1F] mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1D1D1F] mb-12 text-center">Tipi di Partnership</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {partnershipTypes.map((type, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm">
                <h3 className="text-2xl font-bold text-[#1D1D1F] mb-4">{type.title}</h3>
                <p className="text-gray-600 mb-6">{type.description}</p>
                <ul className="space-y-3">
                  {type.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#A0845C]" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1D1D1F] mb-8 text-center">Requisiti</h2>
          <div className="bg-gray-50 rounded-2xl p-8">
            <ul className="space-y-4">
              {requirements.map((req, index) => (
                <li key={index} className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-[#A0845C] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <span className="text-gray-700 text-lg">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-[#A0845C]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Interessato a diventare partner?</h2>
          <p className="text-white/90 mb-10 text-lg">
            Compila il form e un nostro responsabile ti contatterà per discutere le opportunità nella tua area.
          </p>
          <Link href="/contatti" className="inline-flex px-8 py-4 bg-white text-[#A0845C] font-semibold text-lg rounded-xl hover:bg-gray-100 transition-colors">
            Richiedi Informazioni
          </Link>
        </div>
      </section>
    </main>
  )
}
