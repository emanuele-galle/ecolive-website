"use client"

import { motion, useInView } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { TrendingDown, Euro } from "lucide-react"

export default function LifetimeCostCalculator() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })

  const [years, setYears] = useState(25)
  const [animatedValue, setAnimatedValue] = useState(0)

  // Calcolo risparmio basato sugli anni
  // Standard: costa meno inizialmente ma ha costi di manutenzione/sostituzione
  // Premium: costa di più inizialmente ma zero manutenzione
  const calculateCosts = (years: number) => {
    const standardInitial = 100000 // costo iniziale standard
    const premiumInitial = 150000 // costo iniziale premium (+50%)

    // Costi di manutenzione/sostituzione standard nel tempo
    const standardMaintenance = years * 800 // €800/anno manutenzione
    const standardReplacement = years > 10 ? (Math.floor((years - 10) / 10) * 15000) : 0 // sostituzione ogni 10 anni dopo i primi 10

    const totalStandard = standardInitial + standardMaintenance + standardReplacement
    const totalPremium = premiumInitial // nessun costo aggiuntivo

    const savings = totalStandard - totalPremium
    const savingsPercent = ((savings / totalStandard) * 100).toFixed(0)

    return {
      standard: totalStandard,
      premium: totalPremium,
      savings: Math.max(0, savings),
      savingsPercent: Math.max(0, parseInt(savingsPercent))
    }
  }

  const costs = calculateCosts(years)

  // Anima il valore del risparmio
  useEffect(() => {
    if (isInView) {
      const duration = 1000 // ms
      const steps = 60
      const stepValue = costs.savings / steps
      let current = 0

      const interval = setInterval(() => {
        current += stepValue
        if (current >= costs.savings) {
          setAnimatedValue(costs.savings)
          clearInterval(interval)
        } else {
          setAnimatedValue(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(interval)
    }
  }, [costs.savings, isInView])

  return (
    <section ref={containerRef} className="relative py-16 lg:py-20 px-4 bg-gradient-to-br from-[#F8F6F3] to-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #1E3D30 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
          className="w-full h-full"
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-[#C4704B]/10 rounded-full">
            <Euro className="w-4 h-4 text-[#C4704B]" />
            <span className="text-[#C4704B] text-sm font-semibold uppercase tracking-wider">
              Calcolatore Risparmio
            </span>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-[#1E3D30] mb-3">
            Quanto <span className="text-[#C4704B]">Risparmi</span> Realmente?
          </h3>
          <p className="text-[#6B6560] text-lg max-w-2xl mx-auto">
            Scopri il risparmio effettivo dei materiali premium Ecolive nel tempo
          </p>
        </motion.div>

        {/* Calculator Card */}
        <motion.div
          className="bg-white rounded-2xl border border-[#E5E0D8] shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="p-6 sm:p-8">
            {/* Slider */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-[#1E3D30]">
                  Periodo di valutazione
                </label>
                <div className="text-right">
                  <span className="text-3xl font-bold text-[#C4704B]">{years}</span>
                  <span className="text-[#6B6560] text-lg ml-2">anni</span>
                </div>
              </div>

              {/* Custom slider */}
              <div className="relative">
                <input
                  type="range"
                  min={5}
                  max={50}
                  step={5}
                  value={years}
                  onChange={(e) => setYears(parseInt(e.target.value))}
                  className="w-full h-3 bg-[#E5E0D8] rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #C4704B 0%, #C4704B ${((years - 5) / 45) * 100}%, #E5E0D8 ${((years - 5) / 45) * 100}%, #E5E0D8 100%)`
                  }}
                />
                <style jsx>{`
                  input[type='range']::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 24px;
                    height: 24px;
                    background: white;
                    border: 3px solid #C4704B;
                    border-radius: 50%;
                    cursor: pointer;
                    box-shadow: 0 2px 8px rgba(196, 112, 75, 0.3);
                  }
                  input[type='range']::-moz-range-thumb {
                    width: 24px;
                    height: 24px;
                    background: white;
                    border: 3px solid #C4704B;
                    border-radius: 50%;
                    cursor: pointer;
                    box-shadow: 0 2px 8px rgba(196, 112, 75, 0.3);
                  }
                `}</style>

                {/* Markers */}
                <div className="flex justify-between mt-2 text-xs text-[#8A857F]">
                  <span>5 anni</span>
                  <span>25 anni</span>
                  <span>50 anni</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
              {/* Standard Cost */}
              <motion.div
                className="bg-[#F8F6F3] rounded-xl p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
              >
                <div className="text-xs uppercase tracking-wide text-[#8A857F] mb-2">
                  Costo Totale Standard
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-[#6B6560]">
                  €{costs.standard.toLocaleString()}
                </div>
                <div className="text-xs text-[#8A857F] mt-2">
                  Include manutenzione e sostituzioni
                </div>
              </motion.div>

              {/* Premium Cost */}
              <motion.div
                className="bg-gradient-to-br from-[#1E3D30]/10 to-[#2D5A47]/5 rounded-xl p-5 border border-[#1E3D30]/20"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
              >
                <div className="text-xs uppercase tracking-wide text-[#1E3D30] mb-2">
                  Costo Totale Ecolive
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-[#1E3D30]">
                  €{costs.premium.toLocaleString()}
                </div>
                <div className="text-xs text-[#2D5A47] mt-2">
                  Zero manutenzione, garanzia 30 anni
                </div>
              </motion.div>

              {/* Savings */}
              <motion.div
                className="bg-gradient-to-br from-[#C4704B] to-[#A85A3A] rounded-xl p-5 text-white relative overflow-hidden"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 0.5, type: "spring" }}
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="w-4 h-4" />
                    <div className="text-xs uppercase tracking-wide">
                      Risparmio Totale
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold">
                    €{animatedValue.toLocaleString()}
                  </div>
                  <div className="text-xs mt-2 opacity-90">
                    Risparmi {costs.savingsPercent}% scegliendo Ecolive
                  </div>
                </div>

                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              </motion.div>
            </div>

            {/* Timeline visualization */}
            <motion.div
              className="mt-8 pt-8 border-t border-[#E5E0D8]"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              <div className="text-sm font-medium text-[#1E3D30] mb-4">
                Evoluzione costi nel tempo
              </div>

              <div className="relative h-24">
                {/* Standard cost line (crescente) */}
                <div className="absolute inset-0">
                  <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                    <motion.path
                      d={`M 0,80 Q 100,70 200,50 T 400,20`}
                      fill="none"
                      stroke="#8A857F"
                      strokeWidth="3"
                      strokeDasharray="6 4"
                      initial={{ pathLength: 0 }}
                      animate={isInView ? { pathLength: 1 } : {}}
                      transition={{ delay: 0.7, duration: 1.5, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute top-0 right-0 text-xs text-[#8A857F] bg-white px-2 py-1 rounded">
                    Standard
                  </div>
                </div>

                {/* Premium cost line (piatta) */}
                <div className="absolute inset-0">
                  <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                    <motion.path
                      d={`M 0,60 L 400,60`}
                      fill="none"
                      stroke="#C4704B"
                      strokeWidth="4"
                      initial={{ pathLength: 0 }}
                      animate={isInView ? { pathLength: 1 } : {}}
                      transition={{ delay: 0.7, duration: 1.5, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute bottom-0 right-0 text-xs text-[#C4704B] bg-white px-2 py-1 rounded font-semibold">
                    Ecolive
                  </div>
                </div>
              </div>

              <div className="flex justify-between text-xs text-[#8A857F] mt-2">
                <span>Anno 0</span>
                <span>Anno {Math.floor(years / 2)}</span>
                <span>Anno {years}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
