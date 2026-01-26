'use client'

import { motion } from 'framer-motion'
import ROIComparisonChart from '@/components/charts/ROIComparisonChart'
import { materialsEducationData } from '@/data/materialsEducationData'

export default function PerformanceEvolutionSection() {
  const telaioData = materialsEducationData.telaio

  return (
    <motion.section
      className="py-20 px-4"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
          Cosa Succede alla{' '}
          <span className="text-[#DC2626]">Casa Standard</span>?
        </h2>
        <p className="text-white/70 text-center mb-12 max-w-2xl mx-auto">
          Visualizza il degrado nel tempo: Ecolive resta perfetta, Standard crolla.
        </p>

        {/* Main Chart */}
        <div className="mb-8 bg-white/[0.03] backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <ROIComparisonChart
            data={telaioData.performanceTrend}
            height={400}
          />
        </div>

        {/* Impact Message */}
        <motion.div
          className="text-center p-6 bg-gradient-to-r from-[#40916c]/10 to-[#DC2626]/10 rounded-xl border border-white/10"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-white text-xl leading-relaxed">
            <strong className="text-[#40916c]">Casa Ecolive:</strong> ZERO sorprese in 30 anni.<br/>
            <strong className="text-[#DC2626]">Casa Standard:</strong> crisi ogni 7-10 anni.
          </p>
        </motion.div>
      </div>
    </motion.section>
  )
}
