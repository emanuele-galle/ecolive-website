"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { GripVertical, TrendingUp, Check, X, Euro } from "lucide-react"

interface Material {
  id: string
  nome: string
  ecoliveOption: string
  standardOption: string
  costoExtra: string
  beneficioPrincipale: string
  risparmio25anni: string
  colorPrimary: string
  colorSecondary: string
}

const materials: Material[] = [
  {
    id: "telaio",
    nome: "Telaio Strutturale",
    ecoliveOption: "BiLam Lamellare",
    standardOption: "Legno Massello",
    costoExtra: "+€15.000",
    beneficioPrincipale: "Zero deformazioni, stabilità perfetta",
    risparmio25anni: "€3.500",
    colorPrimary: "#C4704B",
    colorSecondary: "#8B7355"
  },
  {
    id: "pannelli",
    nome: "Pannelli Parete",
    ecoliveOption: "3 Strati Lamellare",
    standardOption: "OSB Pressato",
    costoExtra: "+€8.000",
    beneficioPrincipale: "Nessuna sostituzione necessaria",
    risparmio25anni: "€5.000",
    colorPrimary: "#2D5A47",
    colorSecondary: "#8A857F"
  },
  {
    id: "isolamento",
    nome: "Isolamento Termico",
    ecoliveOption: "Sughero Naturale 30mm",
    standardOption: "Polistirolo (EPS)",
    costoExtra: "+€6.000",
    beneficioPrincipale: "Risparmio 30% bollette energia",
    risparmio25anni: "€12.000",
    colorPrimary: "#40916c",
    colorSecondary: "#666"
  },
  {
    id: "finiture",
    nome: "Rivestimenti Interni",
    ecoliveOption: "Gesso Fibra 25mm",
    standardOption: "Cartongesso 12mm",
    costoExtra: "+€4.000",
    beneficioPrincipale: "Zero ammaccature, durata doppia",
    risparmio25anni: "€2.500",
    colorPrimary: "#C9A86C",
    colorSecondary: "#8A857F"
  }
]

function BeforeAfterSlider({ material, index }: { material: Material; index: number }) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches[0]) handleMove(e.touches[0].clientX)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="relative"
    >
      {/* Material Name Header */}
      <div className="mb-4 text-center">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{material.nome}</h3>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full backdrop-blur-sm">
          <span className="text-white/70 text-sm">Trascina lo slider per confrontare</span>
        </div>
      </div>

      {/* Before/After Slider Container */}
      <div
        ref={containerRef}
        className="relative h-[400px] md:h-[480px] rounded-2xl overflow-hidden cursor-ew-resize select-none bg-white/5 border border-white/10"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
      >
        {/* STANDARD SIDE (left/bottom) - Cheap look */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900">
          {/* Pattern cheap */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(255,255,255,0.03) 10px,
                rgba(255,255,255,0.03) 20px
              )`
            }}
          />

          {/* Label */}
          <div className="absolute top-6 left-6 z-10">
            <div className="px-4 py-2 bg-gray-800/90 backdrop-blur-sm rounded-lg border border-gray-600">
              <div className="text-xs uppercase tracking-wider text-gray-400 mb-1">Standard</div>
              <div className="text-white font-bold text-lg">{material.standardOption}</div>
            </div>
          </div>

          {/* Issues badges */}
          <div className="absolute bottom-6 left-6 right-1/2 pr-6 space-y-2 z-10">
            <div className="flex items-center gap-2 px-3 py-2 bg-red-900/40 backdrop-blur-sm rounded-lg border border-red-700/40">
              <X className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span className="text-red-200 text-sm">Manutenzione frequente</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-red-900/40 backdrop-blur-sm rounded-lg border border-red-700/40">
              <X className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span className="text-red-200 text-sm">Degrado nel tempo</span>
            </div>
          </div>

          {/* Texture visualization */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="text-gray-500 text-9xl font-bold">?</div>
          </div>
        </div>

        {/* ECOLIVE SIDE (right/top) - Premium look */}
        <div
          className="absolute inset-0 bg-gradient-to-br transition-all duration-300"
          style={{
            background: `linear-gradient(135deg, ${material.colorPrimary} 0%, ${material.colorSecondary} 100%)`,
            clipPath: `inset(0 0 0 ${sliderPosition}%)`
          }}
        >
          {/* Pattern premium */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)`,
              backgroundSize: '24px 24px'
            }}
          />

          {/* Label */}
          <div className="absolute top-6 right-6 z-10">
            <div className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-lg border border-white/30">
              <div className="text-xs uppercase tracking-wider text-white/80 mb-1">Ecolive Premium</div>
              <div className="text-white font-bold text-lg">{material.ecoliveOption}</div>
            </div>
          </div>

          {/* Benefits badges */}
          <div className="absolute bottom-6 left-1/2 right-6 pl-6 space-y-2 z-10">
            <div className="flex items-center gap-2 px-3 py-2 bg-white/20 backdrop-blur-md rounded-lg border border-white/30">
              <Check className="w-4 h-4 text-white flex-shrink-0" />
              <span className="text-white text-sm font-medium">{material.beneficioPrincipale}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-green-500/30 backdrop-blur-md rounded-lg border border-green-400/40">
              <TrendingUp className="w-4 h-4 text-green-300 flex-shrink-0" />
              <span className="text-white text-sm font-semibold">Risparmio 25 anni: €{material.risparmio25anni}</span>
            </div>
          </div>

          {/* Quality indicator */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <svg className="w-40 h-40" viewBox="0 0 24 24" fill="none" stroke="white">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        </div>

        {/* SLIDER DIVIDER */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white/80 z-20 cursor-ew-resize"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-white/50">
            <GripVertical className="w-6 h-6 text-gray-700" />
          </div>

          {/* Glow effect */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-32 bg-white/20 blur-2xl" />
        </div>
      </div>

      {/* Cost Info Bar */}
      <div className="mt-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${material.colorPrimary}30` }}>
              <Euro className="w-5 h-5" style={{ color: material.colorPrimary }} />
            </div>
            <div>
              <div className="text-white/60 text-xs">Investimento Extra</div>
              <div className="text-white font-bold text-lg">{material.costoExtra}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-lg border border-green-400/30">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <div>
              <div className="text-green-300 text-xs">Risparmio Lifetime</div>
              <div className="text-white font-bold">€{material.risparmio25anni}</div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-white/60 text-xs mb-1">ROI</div>
            <div className="text-green-400 font-bold text-lg">
              {((parseFloat(material.risparmio25anni.replace(/\./g, '')) / parseFloat(material.costoExtra.replace(/[+€\.]/g, ''))) * 100).toFixed(0)}%
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function SimpleMaterialsComparison() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })

  // Calcolo totale investimento e risparmio
  const totaleInvestimento = materials.reduce((sum, m) =>
    sum + parseFloat(m.costoExtra.replace(/[+€\.]/g, '')), 0
  )
  const totaleRisparmio = materials.reduce((sum, m) =>
    sum + parseFloat(m.risparmio25anni.replace(/\./g, '')), 0
  )

  return (
    <section
      ref={containerRef}
      className="relative py-20 lg:py-28 px-4 bg-gradient-to-b from-[#152822] via-[#1E3D30] to-[#1a2c26] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
          className="w-full h-full"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Perché costa <span className="text-[#C4704B]">di più</span>
          </h2>
          <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Trascina gli slider per vedere visivamente la differenza tra materiali standard e premium Ecolive.
            <br />
            <span className="text-[#C4704B] font-semibold">La qualità si vede.</span>
          </p>
        </motion.div>

        {/* Before/After Sliders Grid */}
        <div className="space-y-12">
          {materials.map((material, index) => (
            <BeforeAfterSlider key={material.id} material={material} index={index} />
          ))}
        </div>

        {/* Summary Card */}
        <motion.div
          className="mt-16 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 md:p-10 border border-white/20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Il Conto è Semplice
            </h3>
            <p className="text-white/70">Investimento oggi vs Risparmio domani</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Investimento Extra */}
            <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
              <div className="text-white/60 text-sm uppercase tracking-wide mb-2">
                Investimento Extra Oggi
              </div>
              <div className="text-3xl md:text-4xl font-bold text-[#C4704B] mb-1">
                €{totaleInvestimento.toLocaleString()}
              </div>
              <div className="text-white/50 text-sm">una tantum</div>
            </div>

            {/* Freccia */}
            <div className="hidden md:flex items-center justify-center">
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg className="w-16 h-16 text-[#C4704B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.div>
            </div>

            {/* Risparmio 25 anni */}
            <div className="text-center p-6 bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-xl border border-green-400/30">
              <div className="text-green-300 text-sm uppercase tracking-wide mb-2">
                Risparmio 25 Anni
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                €{totaleRisparmio.toLocaleString()}
              </div>
              <div className="text-green-300 text-sm font-semibold">
                +{((totaleRisparmio / totaleInvestimento) * 100).toFixed(0)}% ROI
              </div>
            </div>
          </div>

          {/* Bottom message */}
          <div className="mt-8 text-center">
            <p className="text-white text-base md:text-lg leading-relaxed">
              Ogni euro investito oggi in materiali premium ti ripaga{" "}
              <span className="text-[#C4704B] font-bold">
                {((totaleRisparmio / totaleInvestimento)).toFixed(1)}x
              </span>{" "}
              nei prossimi 25 anni.
            </p>
            <p className="text-white/60 text-sm mt-3">
              + Valore immobile aumentato + Zero stress manutenzione
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
