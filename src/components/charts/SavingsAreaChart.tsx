'use client'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface SavingsDataPoint {
  anno: number
  savings: number
}

interface SavingsAreaChartProps {
  data: SavingsDataPoint[]
  height?: number
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#152822] border border-[#40916c]/20 rounded-lg px-4 py-2 shadow-xl">
        <p className="text-white font-semibold">Anno {label}</p>
        <p className="text-[#40916c]">
          Risparmio: €{payload[0].value.toLocaleString()}
        </p>
      </div>
    )
  }
  return null
}

/**
 * Area chart showing accumulated savings over 25 years
 */
export default function SavingsAreaChart({
  data,
  height = 300
}: SavingsAreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#40916c" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#40916c" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#8A857F" opacity={0.1} />
        <XAxis
          dataKey="anno"
          stroke="#8A857F"
          tick={{ fill: '#8A857F' }}
          label={{ value: 'Anni', position: 'insideBottom', offset: -5, fill: '#8A857F' }}
        />
        <YAxis
          stroke="#8A857F"
          tick={{ fill: '#8A857F' }}
          tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="savings"
          stroke="#40916c"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorSavings)"
          animationDuration={2000}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
