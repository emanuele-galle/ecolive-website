'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import LayerDetailModal, { LayerData } from './LayerDetailModal'

// Dati completi degli strati - BROCHURE 2025
const layersData: LayerData[] = [
  {
    code: 'O',
    name: 'Finitura esterna',
    thickness: 3,
    material: 'Rasante Mapetherm acril-silossanico',
    description: 'Finitura esterna traspirante ad alta durabilita. Protegge la parete dagli agenti atmosferici garantendo traspirabilita e resistenza ai raggi UV.',
    properties: { fireClass: 'A2', certification: 'Certificato VOC Free' },
    color: '#e8e4dc',
    pattern: 'finish'
  },
  {
    code: 'E',
    name: 'Sughero alta densita',
    thickness: 40,
    material: 'Sughero naturale espanso',
    description: 'Isolamento termico esterno 100% naturale ed ecologico. Il sughero garantisce traspirabilita, fonoassorbenza e regolazione igrometrica naturale.',
    properties: { density: '120 kg/m³', conductivity: '0.040 W/mK', certification: 'PEFC Certified' },
    color: '#8b6914',
    pattern: 'insulation'
  },
  {
    code: 'I',
    name: 'Pannello OSB3',
    thickness: 18,
    material: 'OSB Classe 3 strutturale',
    description: 'Pannello per controventatura strutturale. Garantisce rigidita alla parete e resistenza alle sollecitazioni sismiche e al vento.',
    properties: { density: '600 kg/m³', fireClass: 'D-s2', certification: 'EN 300 OSB/3' },
    color: '#b8956c',
    pattern: 'panel'
  },
  {
    code: 'D',
    name: 'Lana minerale',
    thickness: 100,
    material: 'Lana di roccia doppia densita',
    description: 'Isolamento termo-acustico ad alte prestazioni. La doppia densita ottimizza sia l\'isolamento termico che quello acustico.',
    properties: { density: '70/140 kg/m³', conductivity: '0.035 W/mK', fireClass: 'A1', certification: 'Euroclass A1' },
    color: '#6b8e9f',
    pattern: 'insulation'
  },
  {
    code: 'B',
    name: 'Telaio bilam 6x24',
    thickness: 60,
    material: 'Legno lamellare GL24h',
    description: 'Struttura secondaria in legno lamellare certificato. Garantisce stabilita dimensionale e distribuzione uniforme dei carichi.',
    properties: { density: '420 kg/m³', fireClass: 'D-s2', certification: 'CE EN 14080' },
    color: '#c9a86c',
    pattern: 'wood'
  },
  {
    code: 'A',
    name: 'Struttura 16x32',
    thickness: 160,
    material: 'Legno lamellare GL28h',
    description: 'Struttura portante principale in legno lamellare ad alta resistenza. Elemento chiave del sistema X-Frame per resistenza sismica e carichi verticali.',
    properties: { density: '450 kg/m³', fireClass: 'REI 60', certification: 'CE EN 14080 - GL28h' },
    color: '#a07840',
    pattern: 'wood'
  },
  {
    code: 'C',
    name: 'μXlam 3 strati',
    thickness: 30,
    material: 'Pannello CLT 3 strati',
    description: 'Pannello lamellare a 3 strati incrociati per irrigidimento strutturale. Aumenta la resistenza sismica e la stabilita complessiva della parete.',
    properties: { density: '470 kg/m³', fireClass: 'REI 30', certification: 'ETA CLT' },
    color: '#b8956c',
    pattern: 'panel'
  },
  {
    code: 'F',
    name: 'Freno vapore',
    thickness: 1,
    material: 'Membrana igrovariabile',
    description: 'Membrana traspirante intelligente per controllo umidita. Regola il passaggio del vapore in base alle condizioni ambientali, prevenendo condense e muffe.',
    properties: { certification: 'sd variabile 0.3-10m' },
    color: '#2a4a6a',
    pattern: 'membrane'
  },
  {
    code: 'M',
    name: 'Intercapedine',
    thickness: 50,
    material: 'Spazio tecnico impianti',
    description: 'Intercapedine per passaggio impianti elettrici, idraulici, VMC e domotica. Permette manutenzione e upgrade senza interventi strutturali.',
    properties: {},
    color: '#3a5a7a',
    pattern: 'membrane'
  },
  {
    code: 'H',
    name: 'Tecno-gesso HD',
    thickness: 25,
    material: 'Lastra in gesso alta densita',
    description: 'Finitura interna ad alta densita con eccellenti proprieta acustiche e di resistenza al fuoco. Superficie pronta per qualsiasi finitura.',
    properties: { density: '1100 kg/m³', fireClass: 'A2', certification: 'EN 520 Type DFH2IR' },
    color: '#e8e4dc',
    pattern: 'finish'
  },
]

// Calcola altezza proporzionale in pixel (scala: 1mm = 1.5px)
const getLayerHeight = (thickness: number) => Math.max(thickness * 1.5, 12)

// Calcola posizione Y cumulativa
const getLayerY = (index: number) => {
  let y = 0
  for (let i = 0; i < index; i++) {
    y += getLayerHeight(layersData[i].thickness)
  }
  return y
}

// Altezza totale della parete
const totalHeight = layersData.reduce((sum, layer) => sum + getLayerHeight(layer.thickness), 0)

export default function StratigraphyBlueprint() {
  const [selectedLayer, setSelectedLayer] = useState<LayerData | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const gridOpacity = useTransform(scrollYProgress, [0, 0.3], [0.3, 0.6])

  return (
    <>
      <div ref={containerRef} className="relative min-h-screen bg-[#0a1628] overflow-hidden py-16 lg:py-20">
        {/* Grid Background SVG */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: gridOpacity }}
        >
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="blueprint-grid-small" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a3a5c" strokeWidth="0.5"/>
              </pattern>
              <pattern id="blueprint-grid-large" width="100" height="100" patternUnits="userSpaceOnUse">
                <rect width="100" height="100" fill="url(#blueprint-grid-small)"/>
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#1a3a5c" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blueprint-grid-large)"/>
          </svg>
        </motion.div>

        {/* Glow effects */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#4a9eff]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#A0845C]/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9 }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#4a9eff]/10 rounded-full border border-[#4a9eff]/20 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#4a9eff] animate-pulse" />
              <span className="text-[#4a9eff] text-sm font-medium tracking-wider uppercase">
                Disegno Tecnico
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Stratigrafia Parete <span className="text-[#A0845C]">290 mm</span>
            </h2>

            <p className="text-[#6b8e9f] text-lg max-w-2xl mx-auto">
              Clicca su ogni strato per visualizzare le specifiche tecniche complete
            </p>
          </motion.div>

          {/* Blueprint Main Container */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Wall Section - Left */}
            <motion.div
              className="flex-1 w-full"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              <div className="relative bg-[#0f2040]/50 rounded-2xl border border-[#1a3a5c] p-6 md:p-8 backdrop-blur-sm">
                {/* Title bar */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1a3a5c]">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#4a9eff]" />
                    <span className="text-[#4a9eff] font-mono text-sm">SEZIONE TIPO A-A</span>
                  </div>
                  <span className="text-[#6b8e9f] font-mono text-xs">SCALA 1:5</span>
                </div>

                {/* Layers Stack */}
                <div className="relative" style={{ height: `${totalHeight + 40}px` }}>
                  {/* External label */}
                  <div className="absolute -left-2 top-0 text-[#4a9eff] text-xs font-mono transform -rotate-90 origin-left translate-y-8">
                    ESTERNO
                  </div>

                  {/* Layers */}
                  {layersData.map((layer, index) => {
                    const height = getLayerHeight(layer.thickness)
                    const y = getLayerY(index)
                    const isHovered = hoveredIndex === index

                    return (
                      <motion.div
                        key={layer.code}
                        className="absolute left-8 right-0 cursor-pointer group"
                        style={{ top: y, height }}
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.9, delay: 0.3 + index * 0.05 }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={() => setSelectedLayer(layer)}
                      >
                        {/* Layer bar */}
                        <motion.div
                          className="absolute inset-0 rounded-sm overflow-hidden"
                          style={{ backgroundColor: layer.color }}
                          animate={{
                            boxShadow: isHovered
                              ? '0 0 20px rgba(74, 158, 255, 0.5), inset 0 0 20px rgba(255,255,255,0.1)'
                              : '0 0 0px rgba(74, 158, 255, 0)',
                            scale: isHovered ? 1.02 : 1,
                          }}
                          transition={{ duration: 0.35 }}
                        >
                          {/* Pattern overlay */}
                          <div
                            className="absolute inset-0 opacity-30"
                            style={{
                              backgroundImage: layer.pattern === 'wood'
                                ? 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)'
                                : layer.pattern === 'insulation'
                                ? 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 1px, transparent 1px)'
                                : 'none',
                              backgroundSize: layer.pattern === 'insulation' ? '6px 6px' : '8px 100%'
                            }}
                          />

                          {/* Hover glow border */}
                          <motion.div
                            className="absolute inset-0 border-2 border-[#4a9eff] rounded-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovered ? 1 : 0 }}
                            transition={{ duration: 0.35 }}
                          />
                        </motion.div>

                        {/* Dimension line */}
                        <motion.div
                          className="absolute -right-4 top-0 bottom-0 flex items-center"
                          animate={{ opacity: isHovered ? 1 : 0.4 }}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-px bg-[#4a9eff]" />
                            <div className={`h-full w-px ${isHovered ? 'bg-[#4a9eff]' : 'bg-[#1a3a5c]'}`} />
                          </div>
                        </motion.div>

                        {/* Code badge (visible on hover or always for larger layers) */}
                        {(isHovered || height > 30) && (
                          <motion.div
                            className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <span className={`
                              font-mono font-bold text-xs px-1.5 py-0.5 rounded
                              ${isHovered ? 'bg-[#4a9eff] text-white' : 'bg-black/30 text-white/80'}
                            `}>
                              {layer.code}
                            </span>
                            {height > 40 && (
                              <span className="text-white/70 text-xs font-medium hidden sm:inline">
                                {layer.name}
                              </span>
                            )}
                          </motion.div>
                        )}
                      </motion.div>
                    )
                  })}

                  {/* Internal label */}
                  <div
                    className="absolute -left-2 text-[#4a9eff] text-xs font-mono transform -rotate-90 origin-left"
                    style={{ top: totalHeight + 20 }}
                  >
                    INTERNO
                  </div>

                  {/* Total dimension */}
                  <div
                    className="absolute -right-16 top-0 flex flex-col items-center"
                    style={{ height: totalHeight }}
                  >
                    <div className="w-px h-full bg-[#A0845C]" />
                    <div className="absolute top-1/2 -translate-y-1/2 -right-2 bg-[#0a1628] px-2">
                      <span className="text-[#A0845C] font-mono font-bold text-sm whitespace-nowrap transform -rotate-90 block">
                        290 mm
                      </span>
                    </div>
                  </div>
                </div>

                {/* Scale bar */}
                <div className="mt-8 pt-4 border-t border-[#1a3a5c]">
                  <div className="flex items-center gap-4">
                    <span className="text-[#6b8e9f] text-xs font-mono">SCALA</span>
                    <div className="flex items-center">
                      <div className="w-[75px] h-2 bg-white/80" />
                      <div className="w-[75px] h-2 bg-[#1a3a5c]" />
                    </div>
                    <span className="text-white font-mono text-xs">100 mm</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Annotations - Right */}
            <motion.div
              className="w-full lg:w-80 space-y-3"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.4 }}
            >
              <div className="text-[#4a9eff] font-mono text-xs mb-4 uppercase tracking-wider">
                Legenda Strati
              </div>

              {layersData.map((layer, index) => {
                const isHovered = hoveredIndex === index

                return (
                  <motion.div
                    key={layer.code}
                    className={`
                      flex items-center gap-3 p-3 rounded-lg cursor-pointer
                      border transition-all duration-200
                      ${isHovered
                        ? 'bg-[#4a9eff]/10 border-[#4a9eff]/50'
                        : 'bg-[#0f2040]/30 border-[#1a3a5c]/50 hover:border-[#1a3a5c]'}
                    `}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => setSelectedLayer(layer)}
                    whileHover={{ x: 4 }}
                  >
                    {/* Color swatch */}
                    <div
                      className="w-8 h-8 rounded flex-shrink-0 border border-white/10"
                      style={{ backgroundColor: layer.color }}
                    />

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`
                          font-mono font-bold text-xs
                          ${isHovered ? 'text-[#4a9eff]' : 'text-white/60'}
                        `}>
                          {layer.code}
                        </span>
                        <span className="text-white text-sm font-medium truncate">
                          {layer.name}
                        </span>
                      </div>
                      <span className="text-[#6b8e9f] text-xs">
                        {layer.thickness} mm
                      </span>
                    </div>

                    {/* Arrow */}
                    <motion.svg
                      className="w-4 h-4 text-[#4a9eff] flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      animate={{ x: isHovered ? 4 : 0, opacity: isHovered ? 1 : 0.3 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </motion.svg>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

          {/* Performance Badges */}
          <motion.div
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.6 }}
          >
            {[
              { label: 'Trasmittanza', value: '0.169', unit: 'W/m²K', icon: '◈' },
              { label: 'Sfasamento', value: '10.8', unit: 'ore', icon: '◷' },
              { label: 'Classe Fuoco', value: 'REI 60', unit: '', icon: '⬡' },
              { label: 'Classe Energetica', value: 'A4', unit: 'NZEB', icon: '⚡' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-[#0f2040]/50 rounded-xl p-5 border border-[#1a3a5c] backdrop-blur-sm text-center"
                whileHover={{ scale: 1.02, borderColor: '#4a9eff' }}
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-[#A0845C] font-bold text-2xl md:text-3xl">
                  {stat.value}
                  {stat.unit && <span className="text-sm font-normal text-[#6b8e9f] ml-1">{stat.unit}</span>}
                </div>
                <div className="text-[#6b8e9f] text-xs uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Innovation Note */}
          <motion.div
            className="mt-8 p-5 bg-gradient-to-r from-[#A0845C]/10 to-transparent rounded-xl border border-[#A0845C]/20"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.8 }}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#A0845C]/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[#A0845C] font-bold text-lg">L</span>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Innovazione Fondamenta</h4>
                <p className="text-[#6b8e9f] text-sm leading-relaxed">
                  4° lato in Purenit HD (700 kPa) elimina ponti termici e umidita di risalita,
                  garantendo isolamento continuo dal terreno.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      <LayerDetailModal
        layer={selectedLayer}
        isOpen={!!selectedLayer}
        onClose={() => setSelectedLayer(null)}
      />
    </>
  )
}
