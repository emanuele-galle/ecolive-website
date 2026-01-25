'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { PerformanceTrendPoint } from '@/data/materialsEducationData'

interface ROIComparisonChartProps {
  data: PerformanceTrendPoint[]
  height?: number
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#152822] border border-[#C4704B]/20 rounded-lg px-4 py-2 shadow-xl">
        <p className="text-white font-semibold">Anno {label}</p>
        <p className="text-[#40916c]">Ecolive: {payload[0].value}%</p>
        <p className="text-[#DC2626]">Standard: {payload[1].value}%</p>
      </div>
    )
  }
  return null
}

/**
 * Dual-line chart comparing Standard vs Ecolive performance over time
 */
export default function ROIComparisonChart({
  data,
  height = 300
}: ROIComparisonChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
          label={{ value: '%', angle: -90, position: 'insideLeft', fill: '#8A857F' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ paddingTop: '20px' }}
          iconType="line"
          formatter={(value) => (
            <span className="text-white">{value === 'ecolive' ? 'Ecolive Premium' : 'Casa Standard'}</span>
          )}
        />
        <Line
          type="monotone"
          dataKey="ecolive"
          stroke="#40916c"
          strokeWidth={3}
          dot={{ fill: '#40916c', r: 4 }}
          activeDot={{ r: 6 }}
          animationDuration={2000}
        />
        <Line
          type="monotone"
          dataKey="standard"
          stroke="#DC2626"
          strokeWidth={3}
          dot={{ fill: '#DC2626', r: 4 }}
          activeDot={{ r: 6 }}
          animationDuration={2000}
          animationBegin={200}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
