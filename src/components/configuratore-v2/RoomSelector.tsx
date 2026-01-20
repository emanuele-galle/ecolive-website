'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Home, Layers } from 'lucide-react'
import { useConfiguratorV2 } from './hooks/useConfiguratorV2'
import RoomOption from './RoomOption'
import { houseConfigurations, getRoomImage } from '@/lib/configuratore-v2/configurations'
import type { RoomCount } from '@/lib/configuratore-v2/types'

export default function RoomSelector() {
  const { selectedHouse, selectedRooms, selectRooms, goBack, setStep } = useConfiguratorV2()

  if (!selectedHouse) return null

  const houseConfig = houseConfigurations[selectedHouse]
  const Icon = selectedHouse === '1-piano' ? Home : Layers

  // Get current background image
  const backgroundImage = selectedRooms
    ? getRoomImage(selectedHouse, selectedRooms)
    : houseConfig.heroImage

  return (
    <motion.div
      className="min-h-[calc(100vh-80px)] w-full flex flex-col lg:flex-row relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 lg:relative lg:flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={backgroundImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={backgroundImage}
              alt={houseConfig.label}
              fill
              className="object-cover"
              priority
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1E3D30]/80 via-[#1E3D30]/40 to-transparent lg:bg-gradient-to-t lg:from-[#1E3D30]/60 lg:via-transparent lg:to-[#1E3D30]/30" />
          </motion.div>
        </AnimatePresence>

        {/* Back button (desktop only - in image area) - top-28 per evitare conflitto con Header */}
        <motion.button
          onClick={goBack}
          className="hidden lg:flex absolute top-28 left-8 items-center gap-2 px-5 py-2.5 bg-white text-[#1E3D30] rounded-full shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all z-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-semibold">Indietro</span>
        </motion.button>

        {/* House type badge (desktop only) */}
        <motion.div
          className="hidden lg:flex absolute bottom-8 left-8 items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white font-semibold">{houseConfig.label}</p>
            <p className="text-white/60 text-sm">Da {houseConfig.minSqm} mq</p>
          </div>
        </motion.div>
      </div>

      {/* Selection Panel */}
      <motion.div
        className="relative z-10 flex-1 lg:flex-none lg:w-[500px] xl:w-[550px] bg-white lg:rounded-l-[32px] shadow-2xl overflow-hidden flex flex-col"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Header */}
        <div className="p-6 lg:p-8 border-b border-gray-100">
          {/* Mobile back button */}
          <button
            onClick={goBack}
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 text-[#1E3D30] rounded-full hover:bg-gray-200 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-semibold">Indietro</span>
          </button>

          {/* Mobile house type */}
          <div className="lg:hidden flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#1E3D30]/10 flex items-center justify-center">
              <Icon className="w-5 h-5 text-[#1E3D30]" />
            </div>
            <div>
              <p className="font-semibold text-[#1E3D30]">{houseConfig.label}</p>
              <p className="text-gray-500 text-sm">Da {houseConfig.minSqm} mq</p>
            </div>
          </div>

          <h2 className="text-2xl lg:text-3xl font-bold text-[#1E3D30]">
            Quante camere da letto?
          </h2>
          <p className="text-gray-500 mt-2">
            Seleziona il numero di camere per vedere la configurazione
          </p>
        </div>

        {/* Room Options */}
        <div className="flex-1 overflow-auto p-6 lg:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {houseConfig.configurations.map((config, index) => (
              <RoomOption
                key={config.rooms}
                config={config}
                isSelected={selectedRooms === config.rooms}
                index={index}
                onSelect={() => selectRooms(config.rooms as RoomCount)}
              />
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-6 lg:p-8 border-t border-gray-100 bg-gray-50/50">
          <motion.button
            onClick={() => {
              if (selectedRooms) {
                setStep('form')
              }
            }}
            disabled={!selectedRooms}
            className={`
              w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300
              ${
                selectedRooms
                  ? 'bg-[#C4704B] text-white shadow-lg shadow-[#C4704B]/30 hover:bg-[#B35F3A]'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
            whileHover={selectedRooms ? { scale: 1.02 } : {}}
            whileTap={selectedRooms ? { scale: 0.98 } : {}}
          >
            <span>Richiedi Preventivo</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          {!selectedRooms && (
            <p className="text-center text-gray-400 text-sm mt-3">
              Seleziona il numero di camere per continuare
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
