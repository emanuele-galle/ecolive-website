'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { CostBreakdownItem } from '@/data/materialsEducationData'

interface InvestmentDonutChartProps {
  data: CostBreakdownItem[]
  width?: number
  height?: number
}

const COLORS = ['#40916c', '#2a9d8f', '#e76f51', '#C4704B', '#8A857F']

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#152822] border border-[#C4704B]/20 rounded-lg px-4 py-2 shadow-xl">
        <p className="text-white font-semibold">{payload[0].name}</p>
        <p className="text-[#C4704B]">
          €{payload[0].value.toLocaleString()} ({payload[0].payload.percentuale}%)
        </p>
      </div>
    )
  }
  return null
}

/**
 * Donut chart showing investment breakdown by cost category
 */
export default function InvestmentDonutChart({
  data,
  width = 300,
  height = 300
}: InvestmentDonutChartProps) {
  return (
    <ResponsiveContainer width={width} height={height}>
      <PieChart>
        <Pie
          data={data}
          dataKey="costo"
          nameKey="nome"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          animationBegin={0}
          animationDuration={1500}
          paddingAngle={2}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  )
}
