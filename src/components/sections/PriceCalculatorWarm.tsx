'use client'

import { motion, useInView, useSpring, useMotionValue, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ArrowRight, Hammer, Home, Key, Ruler, Building2, Castle, Warehouse, Bed, Bath, ChefHat, Minus, Plus, Link2, Unlink2 } from 'lucide-react'

const PRICING = {
  grezzoBase: 900,
  grezzoAvanzato: 1200,
  chiaviInMano: 1700,
}

const MIN_MQ = 50
const MAX_MQ = 300
const DEFAULT_MQ = 120

// Dimensioni stanze basate su DM 5 luglio 1975 + comfort
const ROOM_SIZES = {
  masterBedroom: 18,    // Camera matrimoniale (comfort)
  bedroom: 12,          // Camera singola (comfort)
  bathroomMain: 6,      // Bagno principale (comfort)
  bathroomSecondary: 4, // Bagno secondario (comfort)
  living: 25,           // Soggiorno (comfort)
  kitchenSeparate: 12,  // Cucina separata (comfort)
  kitchenOpen: 5,       // Angolo cottura (comfort)
  corridorFactor: 1.18, // +18% per corridoi, disimpegni, ingresso
}

// Configurazione minima per evitare case impossibili
const MIN_CONFIG = {
  bedrooms: 1,
  bathrooms: 1,
}

type KitchenType = 'open' | 'separate'

interface RoomConfig {
  bedrooms: number
  bathrooms: number
  kitchenType: KitchenType
}

// Calcola mq totali dalla configurazione stanze
const calculateMqFromRooms = (config: RoomConfig): number => {
  const { bedrooms, bathrooms, kitchenType } = config

  // Prima camera = matrimoniale, le altre singole
  const bedroomMq = ROOM_SIZES.masterBedroom + (bedrooms - 1) * ROOM_SIZES.bedroom

  // Primo bagno = principale, gli altri secondari
  const bathroomMq = ROOM_SIZES.bathroomMain + (bathrooms - 1) * ROOM_SIZES.bathroomSecondary

  // Soggiorno sempre presente
  const livingMq = ROOM_SIZES.living

  // Cucina in base al tipo
  const kitchenMq = kitchenType === 'separate' ? ROOM_SIZES.kitchenSeparate : ROOM_SIZES.kitchenOpen

  // Totale con fattore corridoi
  const totalMq = (bedroomMq + bathroomMq + livingMq + kitchenMq) * ROOM_SIZES.corridorFactor

  return Math.round(totalMq / 10) * 10 // Arrotonda a decine
}

// Calcola configurazione stanze possibile dai mq
const calculateRoomsFromMq = (mq: number): RoomConfig => {
  const availableMq = mq / ROOM_SIZES.corridorFactor

  // Base fissa: soggiorno + cucina aperta
  const baseMq = ROOM_SIZES.living + ROOM_SIZES.kitchenOpen
  let remainingMq = availableMq - baseMq

  // Calcola quante camere ci stanno (partendo da 1)
  let bedrooms = 1
  remainingMq -= ROOM_SIZES.masterBedroom + ROOM_SIZES.bathroomMain // Prima camera + primo bagno

  while (remainingMq >= ROOM_SIZES.bedroom && bedrooms < 5) {
    remainingMq -= ROOM_SIZES.bedroom
    bedrooms++
  }

  // Bagni basati sul numero di camere (regola comfort)
  // 1 camera → 1 bagno, 2 camere → 2 bagni, 3 camere → 2 bagni, 4+ camere → 3 bagni
  let bathrooms: number
  if (bedrooms <= 1) {
    bathrooms = 1
  } else if (bedrooms <= 3) {
    bathrooms = 2
  } else {
    bathrooms = 3
  }

  // Verifica che i bagni extra ci stiano effettivamente
  const extraBathrooms = bathrooms - 1
  const extraBathroomsMq = extraBathrooms * ROOM_SIZES.bathroomSecondary

  // Se non c'è spazio per i bagni extra, riduci una camera
  if (remainingMq < extraBathroomsMq && bedrooms > 1) {
    bedrooms--
    remainingMq += ROOM_SIZES.bedroom
    // Ricalcola bagni con nuove camere
    if (bedrooms <= 1) {
      bathrooms = 1
    } else if (bedrooms <= 3) {
      bathrooms = 2
    } else {
      bathrooms = 3
    }
  }

  // Sottrai i bagni extra dallo spazio
  remainingMq -= (bathrooms - 1) * ROOM_SIZES.bathroomSecondary

  // Upgrade a cucina separata se c'è spazio
  const kitchenDiff = ROOM_SIZES.kitchenSeparate - ROOM_SIZES.kitchenOpen
  let kitchenType: KitchenType = 'open'
  if (remainingMq >= kitchenDiff) {
    kitchenType = 'separate'
  }

  return { bedrooms, bathrooms, kitchenType }
}

// Calcola limiti massimi per i mq correnti
const getMaxRooms = (mq: number) => {
  const config = calculateRoomsFromMq(mq)
  return {
    maxBedrooms: Math.min(5, config.bedrooms + 1),
    maxBathrooms: Math.min(3, config.bathrooms + 1),
  }
}

// Calcola dimensioni stanze scalabili
// Se hai più mq del necessario, le stanze diventano più grandi
// Se hai meno mq, le stanze si riducono proporzionalmente
const calculateScaledRoomSizes = (totalMq: number, config: RoomConfig) => {
  const baseMq = calculateMqFromRooms(config)

  // Calcola fattore di scala (può essere > 1 o < 1)
  const scaleFactor = totalMq / baseMq

  // Se fattore è circa 1 (±3%), usa dimensioni standard per evitare micro-variazioni
  if (scaleFactor >= 0.97 && scaleFactor <= 1.03) {
    return {
      living: ROOM_SIZES.living,
      masterBedroom: ROOM_SIZES.masterBedroom,
      bedroom: ROOM_SIZES.bedroom,
      bathroomMain: ROOM_SIZES.bathroomMain,
      bathroomSecondary: ROOM_SIZES.bathroomSecondary,
      kitchen: config.kitchenType === 'separate' ? ROOM_SIZES.kitchenSeparate : ROOM_SIZES.kitchenOpen,
      scaleFactor: 1,
    }
  }

  return {
    living: Math.round(ROOM_SIZES.living * scaleFactor),
    masterBedroom: Math.round(ROOM_SIZES.masterBedroom * scaleFactor),
    bedroom: Math.round(ROOM_SIZES.bedroom * scaleFactor),
    bathroomMain: Math.round(ROOM_SIZES.bathroomMain * scaleFactor),
    bathroomSecondary: Math.round(ROOM_SIZES.bathroomSecondary * scaleFactor),
    kitchen: Math.round((config.kitchenType === 'separate' ? ROOM_SIZES.kitchenSeparate : ROOM_SIZES.kitchenOpen) * scaleFactor),
    scaleFactor: Math.round(scaleFactor * 100) / 100,
  }
}

// Badge dinamico basato su mq
const getSizeInfo = (mq: number) => {
  if (mq <= 80) return { label: 'Appartamento', icon: Building2, color: 'from-blue-500 to-blue-600' }
  if (mq <= 150) return { label: 'Casa Unifamiliare', icon: Home, color: 'from-emerald-500 to-emerald-600' }
  if (mq <= 220) return { label: 'Villa', icon: Castle, color: 'from-amber-500 to-amber-600' }
  return { label: 'Grande Villa', icon: Warehouse, color: 'from-purple-500 to-purple-600' }
}

const STEP_MARKERS = [50, 100, 150, 200, 250, 300]

function AnimatedPrice({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { stiffness: 400, damping: 40 })

  useEffect(() => {
    motionValue.set(value)
  }, [value, motionValue])

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString('it-IT')
      }
    })
    return unsubscribe
  }, [springValue])

  return <span ref={ref}>0</span>
}

// Componente selettore numerico
function RoomSelector({
  label,
  icon: Icon,
  value,
  min,
  max,
  onChange,
  disabled = false
}: {
  label: string
  icon: React.ComponentType<{ className?: string }>
  value: number
  min: number
  max: number
  onChange: (v: number) => void
  disabled?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-[#A0845C]" />
        <span className="text-white/80 text-sm font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-1">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={disabled || value <= min}
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
            value <= min || disabled
              ? 'bg-white/5 text-white/20 cursor-not-allowed'
              : 'bg-white/10 text-white/70 hover:bg-white/20'
          }`}
        >
          <Minus className="w-4 h-4" />
        </motion.button>
        <motion.span
          key={value}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-8 text-center text-white font-bold text-lg"
        >
          {value}
        </motion.span>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={disabled || value >= max}
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
            value >= max || disabled
              ? 'bg-white/5 text-white/20 cursor-not-allowed'
              : 'bg-white/10 text-white/70 hover:bg-white/20'
          }`}
        >
          <Plus className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  )
}

export default function PriceCalculatorWarm() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })
  const [squareMeters, setSquareMeters] = useState(DEFAULT_MQ)
  const [isDragging, setIsDragging] = useState(false)
  const [isUpdatingFromRooms, setIsUpdatingFromRooms] = useState(false)
  const [isUpdatingFromSlider, setIsUpdatingFromSlider] = useState(false)
  const [syncEnabled, setSyncEnabled] = useState(true)

  // Stato stanze - inizializzato dai mq di default
  const [roomConfig, setRoomConfig] = useState<RoomConfig>(() => calculateRoomsFromMq(DEFAULT_MQ))

  const sizeInfo = getSizeInfo(squareMeters)
  const SizeIcon = sizeInfo.icon

  // Calcola mq stimati dalla configurazione stanze
  const estimatedMqFromRooms = calculateMqFromRooms(roomConfig)

  // Calcola dimensioni scalate (quando sync disabilitato o mq > base)
  const scaledSizes = calculateScaledRoomSizes(squareMeters, roomConfig)

  // Limiti per i selettori
  const maxRooms = getMaxRooms(squareMeters)

  // Sincronizza: quando cambiano i mq dallo slider, aggiorna le stanze
  const handleSliderChange = useCallback((newMq: number) => {
    setSquareMeters(newMq)
    // Solo sincronizza se sync è abilitato
    if (syncEnabled && !isUpdatingFromRooms) {
      setIsUpdatingFromSlider(true)
      setRoomConfig(calculateRoomsFromMq(newMq))
      setTimeout(() => setIsUpdatingFromSlider(false), 100)
    }
  }, [isUpdatingFromRooms, syncEnabled])

  // Sincronizza: quando cambia la config stanze, aggiorna i mq
  const handleRoomChange = useCallback((newConfig: RoomConfig) => {
    const newMq = calculateMqFromRooms(newConfig)

    // Se sync disabilitato, permetti qualsiasi configurazione
    if (!syncEnabled) {
      setRoomConfig(newConfig)
      return
    }

    // Verifica che i mq siano nel range
    if (newMq < MIN_MQ || newMq > MAX_MQ) {
      return // Non permettere configurazioni fuori range
    }

    setIsUpdatingFromRooms(true)
    setRoomConfig(newConfig)
    setSquareMeters(newMq)
    setTimeout(() => setIsUpdatingFromRooms(false), 100)
  }, [syncEnabled])

  const updateBedrooms = (bedrooms: number) => {
    handleRoomChange({ ...roomConfig, bedrooms })
  }

  const updateBathrooms = (bathrooms: number) => {
    handleRoomChange({ ...roomConfig, bathrooms })
  }

  const updateKitchenType = (kitchenType: KitchenType) => {
    handleRoomChange({ ...roomConfig, kitchenType })
  }

  const prices = {
    grezzoBase: squareMeters * PRICING.grezzoBase,
    grezzoAvanzato: squareMeters * PRICING.grezzoAvanzato,
    chiaviInMano: squareMeters * PRICING.chiaviInMano,
  }

  const tiers = [
    {
      name: 'Grezzo Base',
      price: prices.grezzoBase,
      pricePerMq: PRICING.grezzoBase,
      icon: Hammer,
      description: 'Struttura e copertura',
      features: ['Struttura X-Frame', 'Copertura completa', 'Tamponamenti'],
    },
    {
      name: 'Grezzo Avanzato',
      price: prices.grezzoAvanzato,
      pricePerMq: PRICING.grezzoAvanzato,
      icon: Home,
      description: 'Pronto per finiture',
      highlight: true,
      features: ['Include Grezzo Base', 'Serramenti', 'Cappotto termico'],
    },
    {
      name: 'Chiavi in Mano',
      price: prices.chiaviInMano,
      pricePerMq: PRICING.chiaviInMano,
      icon: Key,
      description: 'Casa completa',
      features: ['Include Avanzato', 'Finiture complete', 'Impianti attivi', 'Pronta da abitare'],
    },
  ]

  const progressPercent = ((squareMeters - MIN_MQ) / (MAX_MQ - MIN_MQ)) * 100

  return (
    <section ref={containerRef} className="py-20 lg:py-28 px-4 bg-white relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B7355' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-inter text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2825] mb-4">
            Calcola il Tuo <span className="text-[#A0845C]">Investimento</span>
          </h2>
          <p className="text-[#86868B] text-lg max-w-xl mx-auto">
            Usa lo slider o seleziona le stanze per calcolare il preventivo
          </p>
        </motion.div>

        {/* CONFIGURATORE - Due colonne */}
        <motion.div
          className="max-w-4xl mx-auto mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1D1D1F] via-[#48484A] to-[#1D1D1F]" />

            {/* Dot pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '24px 24px'
              }}
            />

            {/* Glow effects */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#A0845C]/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#A0845C]/20 rounded-full blur-3xl" />

            {/* Content Grid */}
            <div className="relative z-10 p-6 md:p-10">
              {/* Header con Toggle Sync */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex-1" />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <Ruler className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white/80 font-medium">Dimensiona la tua casa</span>
                </div>
                <div className="flex-1 flex justify-end">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSyncEnabled(!syncEnabled)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      syncEnabled
                        ? 'bg-[#A0845C]/20 text-[#A0845C] border border-[#A0845C]/30'
                        : 'bg-white/10 text-white/60 border border-white/20'
                    }`}
                    title={syncEnabled ? 'Sincronizzazione attiva - clicca per scollegare' : 'Sincronizzazione disattivata - clicca per ricollegare'}
                  >
                    {syncEnabled ? (
                      <Link2 className="w-4 h-4" />
                    ) : (
                      <Unlink2 className="w-4 h-4" />
                    )}
                    <span className="hidden sm:inline">{syncEnabled ? 'Sincro ON' : 'Sincro OFF'}</span>
                  </motion.button>
                </div>
              </div>

              {/* Two Columns */}
              <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                {/* LEFT: Slider metri quadri */}
                <div>
                  <div className="text-center mb-2">
                    <span className="text-white/50 text-xs uppercase tracking-wider">Metri Quadri</span>
                  </div>

                  {/* Badge dinamico */}
                  <div className="text-center mb-4">
                    <motion.div
                      key={sizeInfo.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full"
                    >
                      <SizeIcon className="w-4 h-4 text-[#A0845C]" />
                      <span className="text-white/90 text-sm font-medium">{sizeInfo.label}</span>
                    </motion.div>
                  </div>

                  {/* Numero grande */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-24 h-24 bg-gradient-to-r ${sizeInfo.color} opacity-20 rounded-full blur-2xl transition-all duration-500`} />
                    </div>

                    <motion.div
                      className="relative flex items-baseline justify-center gap-2"
                      animate={{ scale: isDragging ? 1.05 : 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <span className="text-5xl md:text-6xl font-bold text-white font-inter tracking-tight">
                        {squareMeters}
                      </span>
                      <span className="text-xl text-white/60 font-medium">mq</span>
                    </motion.div>
                  </div>

                  {/* Slider Container - Redesign Professionale */}
                  <div className="relative pt-10 pb-2">
                    {/* Value Display sopra slider - sempre visibile */}
                    <motion.div
                      className="absolute top-0 z-20"
                      style={{ left: `calc(${progressPercent}% - 24px)` }}
                      animate={{
                        y: isDragging ? -4 : 0,
                        scale: isDragging ? 1.1 : 1
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      <div className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all duration-200 ${
                        isDragging
                          ? 'bg-white text-[#1D1D1F] shadow-lg'
                          : 'bg-white/15 text-white backdrop-blur-sm'
                      }`}>
                        {squareMeters} mq
                      </div>
                    </motion.div>

                    {/* Track Container con hitbox corretta */}
                    <div className="relative h-12 flex items-center">
                      {/* Track Background - visibile */}
                      <div
                        className="absolute inset-x-0 h-3 rounded-full bg-white/10 border border-white/5 overflow-hidden"
                        style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)' }}
                      >
                        {/* Filled Track con gradiente ricco */}
                        <motion.div
                          className="absolute inset-y-0 left-0 rounded-full"
                          style={{
                            background: 'linear-gradient(90deg, #A0845C 0%, #E8956B 50%, #F5C4A1 100%)',
                            width: `${progressPercent}%`
                          }}
                          animate={{ width: `${progressPercent}%` }}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />

                        {/* Highlight per profondita */}
                        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent rounded-t-full" />
                      </div>

                      {/* Range Input con hitbox generosa */}
                      <input
                        type="range"
                        min={MIN_MQ}
                        max={MAX_MQ}
                        step={10}
                        value={squareMeters}
                        onChange={(e) => handleSliderChange(Number(e.target.value))}
                        onMouseDown={() => setIsDragging(true)}
                        onMouseUp={() => setIsDragging(false)}
                        onTouchStart={() => setIsDragging(true)}
                        onTouchEnd={() => setIsDragging(false)}
                        className="absolute w-full opacity-0 cursor-pointer"
                        style={{
                          height: '44px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          zIndex: 20,
                          touchAction: 'none'
                        }}
                        aria-label="Seleziona metratura"
                        aria-valuenow={squareMeters}
                        aria-valuemin={MIN_MQ}
                        aria-valuemax={MAX_MQ}
                      />

                      {/* Premium Thumb - Stile Tesla */}
                      <motion.div
                        className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
                        style={{ left: `calc(${progressPercent}% - 16px)` }}
                      >
                        {/* Outer Glow - piu visibile */}
                        <motion.div
                          className="absolute -inset-4 rounded-full"
                          style={{
                            background: 'radial-gradient(circle, rgba(196,112,75,0.5) 0%, transparent 70%)',
                          }}
                          animate={{
                            scale: isDragging ? [1, 1.4, 1] : 1,
                            opacity: isDragging ? 1 : 0.5
                          }}
                          transition={{ duration: 1.2, repeat: isDragging ? Infinity : 0 }}
                        />

                        {/* Main Thumb - 32px */}
                        <motion.div
                          className="relative w-8 h-8 rounded-full bg-white"
                          style={{
                            boxShadow: isDragging
                              ? '0 0 0 4px rgba(196,112,75,0.4), 0 6px 24px rgba(0,0,0,0.35)'
                              : '0 2px 10px rgba(0,0,0,0.25), 0 0 0 3px rgba(196,112,75,0.25)'
                          }}
                          animate={{ scale: isDragging ? 1.15 : 1 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        >
                          {/* Border Ring */}
                          <div className="absolute inset-0 rounded-full border-[3px] border-[#A0845C]" />

                          {/* Inner Dot */}
                          <motion.div
                            className="absolute inset-[7px] rounded-full bg-gradient-to-br from-[#A0845C] to-[#E8956B]"
                            animate={{ scale: isDragging ? [1, 1.3, 1] : 1 }}
                            transition={{ duration: 1.0, repeat: isDragging ? Infinity : 0 }}
                          />
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Step Markers puliti */}
                    <div className="flex justify-between mt-2 px-1">
                      {STEP_MARKERS.map((step) => {
                        const isActive = squareMeters >= step
                        const isCurrent = Math.abs(squareMeters - step) < 5

                        return (
                          <div key={step} className="flex flex-col items-center">
                            {/* Tick */}
                            <div className={`w-0.5 h-2 rounded-full transition-colors duration-300 ${
                              isActive ? 'bg-[#A0845C]' : 'bg-white/20'
                            }`} />

                            {/* Label */}
                            <span className={`mt-1.5 text-xs font-medium transition-all duration-300 ${
                              isCurrent
                                ? 'text-[#E8956B] font-bold'
                                : isActive
                                  ? 'text-white/80'
                                  : 'text-white/40'
                            }`}>
                              {step}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Quick Select - Design pulito */}
                  <div className="flex justify-center gap-2 mt-6">
                    {[80, 120, 180, 250].map((preset) => (
                      <motion.button
                        key={preset}
                        onClick={() => handleSliderChange(preset)}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                          squareMeters === preset
                            ? 'bg-[#A0845C] text-white shadow-lg shadow-[#A0845C]/30'
                            : 'bg-white/10 text-white/70 hover:bg-white/15 hover:text-white'
                        }`}
                      >
                        {preset} mq
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* RIGHT: Selettore stanze */}
                <div>
                  <div className="text-center mb-6">
                    <span className="text-white/50 text-xs uppercase tracking-wider">Oppure Scegli le Stanze</span>
                  </div>

                  {/* Selettori */}
                  <div className="space-y-5 mb-6">
                    <RoomSelector
                      label="Camere da letto"
                      icon={Bed}
                      value={roomConfig.bedrooms}
                      min={MIN_CONFIG.bedrooms}
                      max={5}
                      onChange={updateBedrooms}
                    />

                    <RoomSelector
                      label="Bagni"
                      icon={Bath}
                      value={roomConfig.bathrooms}
                      min={MIN_CONFIG.bathrooms}
                      max={3}
                      onChange={updateBathrooms}
                    />

                    {/* Cucina toggle */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <ChefHat className="w-4 h-4 text-[#A0845C]" />
                        <span className="text-white/80 text-sm font-medium">Cucina</span>
                      </div>
                      <div className="flex gap-1 bg-white/5 rounded-lg p-1">
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => updateKitchenType('open')}
                          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                            roomConfig.kitchenType === 'open'
                              ? 'bg-[#A0845C] text-white'
                              : 'text-white/60 hover:text-white/80'
                          }`}
                        >
                          Aperta
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => updateKitchenType('separate')}
                          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                            roomConfig.kitchenType === 'separate'
                              ? 'bg-[#A0845C] text-white'
                              : 'text-white/60 hover:text-white/80'
                          }`}
                        >
                          Separata
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-white/10 my-5" />

                  {/* Summary */}
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white/60 text-sm">
                        {syncEnabled ? 'Configurazione' : 'Stanze nella tua casa'}
                      </span>
                      <div className="flex items-center gap-2">
                        {scaledSizes.scaleFactor !== 1 && (
                          <span className={`text-xs font-medium ${scaledSizes.scaleFactor < 1 ? 'text-amber-400' : 'text-[#A0845C]'}`}>
                            {scaledSizes.scaleFactor > 1 ? '+' : ''}{Math.round((scaledSizes.scaleFactor - 1) * 100)}% spazio
                          </span>
                        )}
                        <motion.span
                          key={syncEnabled ? estimatedMqFromRooms : squareMeters}
                          initial={{ scale: 1.1 }}
                          animate={{ scale: 1 }}
                          className="text-white font-bold"
                        >
                          {syncEnabled ? `~${estimatedMqFromRooms}` : squareMeters} mq
                        </motion.span>
                      </div>
                    </div>
                    <div className="text-white/50 text-xs space-y-1">
                      <div className="flex justify-between">
                        <span>Soggiorno</span>
                        <motion.span
                          key={scaledSizes.living}
                          initial={{ scale: 1.1 }}
                          animate={{ scale: 1 }}
                          className={scaledSizes.scaleFactor > 1 ? 'text-[#8BAF90]' : scaledSizes.scaleFactor < 1 ? 'text-amber-400' : ''}
                        >
                          {scaledSizes.living} mq
                        </motion.span>
                      </div>
                      <div className="flex justify-between">
                        <span>{roomConfig.bedrooms} {roomConfig.bedrooms === 1 ? 'camera' : 'camere'}</span>
                        <motion.span
                          key={scaledSizes.masterBedroom + scaledSizes.bedroom}
                          initial={{ scale: 1.1 }}
                          animate={{ scale: 1 }}
                          className={scaledSizes.scaleFactor > 1 ? 'text-[#8BAF90]' : scaledSizes.scaleFactor < 1 ? 'text-amber-400' : ''}
                        >
                          {scaledSizes.masterBedroom + (roomConfig.bedrooms - 1) * scaledSizes.bedroom} mq
                        </motion.span>
                      </div>
                      <div className="flex justify-between">
                        <span>{roomConfig.bathrooms} {roomConfig.bathrooms === 1 ? 'bagno' : 'bagni'}</span>
                        <motion.span
                          key={scaledSizes.bathroomMain + scaledSizes.bathroomSecondary}
                          initial={{ scale: 1.1 }}
                          animate={{ scale: 1 }}
                          className={scaledSizes.scaleFactor > 1 ? 'text-[#8BAF90]' : scaledSizes.scaleFactor < 1 ? 'text-amber-400' : ''}
                        >
                          {scaledSizes.bathroomMain + (roomConfig.bathrooms - 1) * scaledSizes.bathroomSecondary} mq
                        </motion.span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cucina {roomConfig.kitchenType === 'open' ? 'aperta' : 'separata'}</span>
                        <motion.span
                          key={scaledSizes.kitchen}
                          initial={{ scale: 1.1 }}
                          animate={{ scale: 1 }}
                          className={scaledSizes.scaleFactor > 1 ? 'text-[#8BAF90]' : scaledSizes.scaleFactor < 1 ? 'text-amber-400' : ''}
                        >
                          {scaledSizes.kitchen} mq
                        </motion.span>
                      </div>
                      <div className="flex justify-between text-white/40 pt-1 border-t border-white/10">
                        <span>+ corridoi e disimpegni</span>
                        <span>+18%</span>
                      </div>
                    </div>
                  </div>

                  {/* Warning se fuori range (solo quando sync attivo) */}
                  {syncEnabled && (estimatedMqFromRooms < MIN_MQ || estimatedMqFromRooms > MAX_MQ) && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 p-3 bg-amber-500/20 border border-amber-500/30 rounded-lg"
                    >
                      <p className="text-amber-200 text-xs">
                        {estimatedMqFromRooms > MAX_MQ
                          ? `Configurazione oltre ${MAX_MQ} mq. Riduci le stanze.`
                          : `Configurazione sotto ${MIN_MQ} mq. Aggiungi stanze.`
                        }
                      </p>
                    </motion.div>
                  )}

                  {/* Info quando sync disattivato */}
                  {!syncEnabled && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg"
                    >
                      <p className="text-blue-200 text-xs">
                        Sincronizzazione disattivata: puoi scegliere liberamente mq e stanze.
                        Le dimensioni delle stanze si adattano automaticamente.
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Price Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              whileHover={{ y: -5 }}
              className={`relative ${tier.highlight ? 'md:-mt-4 md:mb-4' : ''}`}
            >
              <div className={`h-full p-6 lg:p-8 rounded-2xl border transition-all duration-300 ${
                tier.highlight
                  ? 'bg-[#48484A] border-[#48484A] text-white'
                  : 'bg-white border-[#D2D2D7] hover:border-[#A0845C]/50'
              }`}>
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#A0845C] text-white text-xs font-semibold rounded-full">
                    Consigliato
                  </div>
                )}

                <div className={`w-12 h-12 mb-5 rounded-xl flex items-center justify-center ${
                  tier.highlight ? 'bg-white/20' : 'bg-[#F5F0E8]'
                }`}>
                  <tier.icon className={`w-6 h-6 ${tier.highlight ? 'text-white' : 'text-[#8B7355]'}`} />
                </div>

                <h3 className={`text-lg font-bold mb-1 ${tier.highlight ? 'text-white' : 'text-[#2C2825]'}`}>
                  {tier.name}
                </h3>
                <p className={`text-sm mb-5 ${tier.highlight ? 'text-white/70' : 'text-[#86868B]'}`}>
                  {tier.description}
                </p>

                <div className="mb-5">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-3xl lg:text-4xl font-bold font-inter ${tier.highlight ? 'text-white' : 'text-[#2C2825]'}`}>
                      <AnimatedPrice value={tier.price} />
                    </span>
                    <span className={`text-sm ${tier.highlight ? 'text-white/70' : 'text-[#86868B]'}`}>EUR</span>
                  </div>
                  <div className={`text-sm font-medium mt-1 ${tier.highlight ? 'text-[#B89B74]' : 'text-[#A0845C]'}`}>
                    {tier.pricePerMq.toLocaleString('it-IT')} EUR/mq
                  </div>
                </div>

                <ul className="space-y-2">
                  {tier.features.map((feature, i) => (
                    <li key={i} className={`flex items-center gap-2 text-sm ${tier.highlight ? 'text-white/80' : 'text-[#86868B]'}`}>
                      <svg className={`w-4 h-4 flex-shrink-0 ${tier.highlight ? 'text-[#8BAF90]' : 'text-[#48484A]'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <p className="text-[#86868B] text-sm mb-6">
            * Prezzi indicativi, possono variare in base alle specifiche del progetto
          </p>
          <Link href="/contatti">
            <motion.span
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#A0845C] hover:bg-[#856B45] text-white font-semibold rounded-xl shadow-lg shadow-[#A0845C]/20 transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Richiedi Preventivo Personalizzato
              <ArrowRight className="w-5 h-5" />
            </motion.span>
          </Link>
        </motion.div>
      </div>

    </section>
  )
}
