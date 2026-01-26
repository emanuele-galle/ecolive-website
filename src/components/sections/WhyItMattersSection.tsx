"use client"

import { motion } from "framer-motion"
import { Home, Shield, Heart } from "lucide-react"
import Button from "@/components/ui/Button"

interface ValueCardProps {
  icon: typeof Home
  title: string
  description: string
  color: string
}

function ValueCard({ icon: Icon, title, description, color }: ValueCardProps) {
  return (
    <motion.div
      className="text-center p-8 bg-white/[0.03] rounded-2xl border border-white/10"
      whileHover={{ y: -8, scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon className="w-8 h-8" style={{ color }} />
      </div>

      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-white/70 leading-relaxed">{description}</p>
    </motion.div>
  )
}

export default function WhyItMattersSection() {
  const values = [
    {
      icon: Home,
      title: "Valore Immobile",
      description: "Una casa costruita bene vale di più. Punto.",
      color: "#C4704B"
    },
    {
      icon: Shield,
      title: "Zero Stress",
      description: "Nessun intervento, nessuna sorpresa, nessun pensiero.",
      color: "#40916c"
    },
    {
      icon: Heart,
      title: "Comfort Quotidiano",
      description: "Vivi meglio ogni giorno per decenni.",
      color: "#7da0b2"
    }
  ]

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
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Perché <span className="text-[#C4704B]">Ti Conviene</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Non parliamo solo di numeri. Parliamo di quello che conta davvero.
          </p>
        </motion.div>

        {/* Value Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <ValueCard {...value} />
            </motion.div>
          ))}
        </div>

        {/* Bottom Message */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p className="text-white/80 text-xl mb-8 leading-relaxed max-w-3xl mx-auto">
            Non parliamo solo di soldi. Parliamo di <strong className="text-white">tranquillità</strong>.
            Di svegliarti ogni mattina sapendo che la tua casa è solida, sicura, e costruita per durare.
          </p>

          <Button
            variant="primary"
            size="lg"
            icon={false}
            className="bg-[#C4704B] hover:bg-[#a85a3a]"
          >
            Parlane con Noi
          </Button>
        </motion.div>
      </div>
    </motion.section>
  )
}
