'use client'

import { LineChart, Line, ResponsiveContainer } from 'recharts'
import { PerformanceTrendPoint } from '@/data/materialsEducationData'

interface PerformanceSparklineProps {
  data: PerformanceTrendPoint[]
  color: string
  height?: number
}

/**
 * Mini sparkline chart showing performance trend over time
 * Used in material selector cards
 */
export default function PerformanceSparkline({
  data,
  color,
  height = 40
}: PerformanceSparklineProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Line
          type="monotone"
          dataKey="ecolive"
          stroke={color}
          strokeWidth={2}
          dot={false}
          animationDuration={1500}
          fill={`url(#gradient-${color})`}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
