'use client'

import { useMemo } from 'react'
import {
  getModulePreset,
  GRID_CELL_SIZE,
  MODULE_HEIGHT,
  FLOOR_THICKNESS,
  MODULE_INSET,
} from '@/lib/configuratore/constants'

interface GhostPreviewProps {
  presetId: string
  gridX: number
  gridZ: number
  isValid: boolean
  offsetX: number
  offsetZ: number
}

export default function GhostPreview({
  presetId,
  gridX,
  gridZ,
  isValid,
  offsetX,
  offsetZ,
}: GhostPreviewProps) {
  const preset = getModulePreset(presetId)

  const position = useMemo(() => {
    if (!preset) return [0, 0, 0] as [number, number, number]

    const worldX = offsetX + gridX * GRID_CELL_SIZE + (preset.cellsX * GRID_CELL_SIZE) / 2
    const worldZ = offsetZ + gridZ * GRID_CELL_SIZE + (preset.cellsZ * GRID_CELL_SIZE) / 2
    const worldY = MODULE_HEIGHT / 2 + FLOOR_THICKNESS

    return [worldX, worldY, worldZ] as [number, number, number]
  }, [preset, gridX, gridZ, offsetX, offsetZ])

  const dimensions = useMemo(() => {
    if (!preset) return [1, 1, 1] as [number, number, number]

    const width = preset.cellsX * GRID_CELL_SIZE - MODULE_INSET * 2
    const depth = preset.cellsZ * GRID_CELL_SIZE - MODULE_INSET * 2

    return [width, MODULE_HEIGHT, depth] as [number, number, number]
  }, [preset])

  if (!preset) return null

  return (
    <group>
      {/* Preview box */}
      <mesh position={position}>
        <boxGeometry args={dimensions} />
        <meshStandardMaterial
          color={isValid ? '#2D5A47' : '#C4704B'}
          transparent
          opacity={isValid ? 0.5 : 0.3}
          depthWrite={false}
        />
      </mesh>

      {/* Wireframe outline */}
      <mesh position={position}>
        <boxGeometry args={dimensions} />
        <meshBasicMaterial
          color={isValid ? '#2D5A47' : '#C4704B'}
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Pulse animation ring at base */}
      <mesh
        position={[position[0], FLOOR_THICKNESS + 0.02, position[2]]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[0.3, 0.5, 32]} />
        <meshBasicMaterial
          color={isValid ? '#2D5A47' : '#C4704B'}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  )
}
