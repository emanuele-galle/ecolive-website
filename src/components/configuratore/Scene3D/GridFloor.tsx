'use client'

import { useMemo, useState, useCallback, useRef, useEffect } from 'react'
import { useConfigurator } from '../hooks/useConfigurator'
import { GRID_CELL_SIZE, FLOOR_THICKNESS, COLORS, getModulePreset } from '@/lib/configuratore/constants'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import GhostPreview from './GhostPreview'

interface GridFloorProps {
  cellsX: number
  cellsZ: number
  offsetX: number
  offsetZ: number
  onCellClick?: (cellX: number, cellZ: number) => void
}

// Colori pre-calcolati come THREE.Color per performance
const CELL_COLORS = {
  default: new THREE.Color(COLORS.grid),
  occupied: new THREE.Color('#D4CFC9'),
  hovered: new THREE.Color('#C8C4BE'),
  validPreview: new THREE.Color('#4A8B6E'),
  invalidPreview: new THREE.Color('#D4856B'),
  validHover: new THREE.Color('rgba(45, 90, 71, 0.7)').convertSRGBToLinear(),
  invalidHover: new THREE.Color('rgba(196, 112, 75, 0.7)').convertSRGBToLinear(),
} as const

export default function GridFloor({
  cellsX,
  cellsZ,
  offsetX,
  offsetZ,
  onCellClick,
}: GridFloorProps) {
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null)
  const [hoveredCell, setHoveredCell] = useState<{ x: number; z: number } | null>(null)

  const setHoveredCellGlobal = useConfigurator((state) => state.setHoveredCell)
  const placedModules = useConfigurator((state) => state.placedModules)
  const canPlaceModule = useConfigurator((state) => state.canPlaceModule)
  const addModule = useConfigurator((state) => state.addModule)

  // Nuovo sistema di interazione
  const interaction = useConfigurator((state) => state.interaction)
  const setSelectedPreset = useConfigurator((state) => state.setSelectedPreset)
  const updatePreviewPosition = useConfigurator((state) => state.updatePreviewPosition)
  const clearPreview = useConfigurator((state) => state.clearPreview)

  const totalCells = cellsX * cellsZ

  // Compute occupied cells as Set for O(1) lookup
  const occupiedCellsSet = useMemo(() => {
    const set = new Set<string>()
    placedModules.forEach((module) => {
      const preset = getModulePreset(module.presetId)
      if (!preset) return
      const isRotated = module.rotation === 90 || module.rotation === 270
      const effectiveCellsX = isRotated ? preset.cellsZ : preset.cellsX
      const effectiveCellsZ = isRotated ? preset.cellsX : preset.cellsZ
      for (let dx = 0; dx < effectiveCellsX; dx++) {
        for (let dz = 0; dz < effectiveCellsZ; dz++) {
          set.add(`${module.gridX + dx},${module.gridZ + dz}`)
        }
      }
    })
    return set
  }, [placedModules])

  // Calcola celle coperte dal modulo in preview
  const previewCells = useMemo(() => {
    if (!interaction.selectedPresetId || !interaction.previewPosition) {
      return new Set<string>()
    }
    const preset = getModulePreset(interaction.selectedPresetId)
    if (!preset) return new Set<string>()

    const cells = new Set<string>()
    for (let dx = 0; dx < preset.cellsX; dx++) {
      for (let dz = 0; dz < preset.cellsZ; dz++) {
        cells.add(`${interaction.previewPosition.x + dx},${interaction.previewPosition.z + dz}`)
      }
    }
    return cells
  }, [interaction.selectedPresetId, interaction.previewPosition])

  // Geometria condivisa per tutte le celle
  const cellGeometry = useMemo(() => {
    return new THREE.BoxGeometry(
      GRID_CELL_SIZE - 0.05,
      FLOOR_THICKNESS,
      GRID_CELL_SIZE - 0.05
    )
  }, [])

  // Materiale condiviso
  const cellMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      roughness: 0.8,
      metalness: 0.1,
      vertexColors: true,
    })
  }, [])

  // Inizializza le posizioni delle istanze
  useEffect(() => {
    if (!instancedMeshRef.current) return

    const mesh = instancedMeshRef.current
    const matrix = new THREE.Matrix4()
    const position = new THREE.Vector3()

    for (let i = 0; i < totalCells; i++) {
      const x = i % cellsX
      const z = Math.floor(i / cellsX)

      const worldX = offsetX + x * GRID_CELL_SIZE + GRID_CELL_SIZE / 2
      const worldZ = offsetZ + z * GRID_CELL_SIZE + GRID_CELL_SIZE / 2

      position.set(worldX, FLOOR_THICKNESS / 2, worldZ)
      matrix.setPosition(position)
      mesh.setMatrixAt(i, matrix)
    }

    mesh.instanceMatrix.needsUpdate = true
  }, [cellsX, cellsZ, totalCells, offsetX, offsetZ])

  // Determine color for a cell based on its state
  const getCellColor = useCallback((
    isOccupied: boolean,
    isPreviewCell: boolean,
    isHovered: boolean,
    hasSelectedPreset: boolean,
    isValidPosition: boolean,
  ): THREE.Color => {
    if (isOccupied && !isPreviewCell) return CELL_COLORS.occupied
    if (isPreviewCell && isValidPosition) return CELL_COLORS.validPreview
    if (isPreviewCell) return CELL_COLORS.invalidPreview
    if (isHovered && hasSelectedPreset) return isValidPosition ? CELL_COLORS.validHover : CELL_COLORS.invalidHover
    if (isHovered) return CELL_COLORS.hovered
    return CELL_COLORS.default
  }, [])

  // Aggiorna i colori delle celle ad ogni frame
  useFrame(() => {
    if (!instancedMeshRef.current) return

    const mesh = instancedMeshRef.current
    const color = new THREE.Color()
    const hasSelectedPreset = !!interaction.selectedPresetId

    for (let i = 0; i < totalCells; i++) {
      const x = i % cellsX
      const z = Math.floor(i / cellsX)
      const cellKey = `${x},${z}`

      const cellColor = getCellColor(
        occupiedCellsSet.has(cellKey),
        previewCells.has(cellKey),
        hoveredCell?.x === x && hoveredCell?.z === z,
        hasSelectedPreset,
        interaction.isValidPosition,
      )
      color.copy(cellColor)
      mesh.setColorAt(i, color)
    }

    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true
    }
  })

  // Raycaster per interazione - ThreeEvent type from @react-three/fiber
  const handlePointerMove = useCallback((event: { point: THREE.Vector3 }) => {
    const point = event.point

    // Converti coordinate mondo in coordinate griglia
    const gridX = Math.floor((point.x - offsetX) / GRID_CELL_SIZE)
    const gridZ = Math.floor((point.z - offsetZ) / GRID_CELL_SIZE)

    // Verifica che sia dentro la griglia
    if (gridX >= 0 && gridX < cellsX && gridZ >= 0 && gridZ < cellsZ) {
      setHoveredCell({ x: gridX, z: gridZ })
      setHoveredCellGlobal({ x: gridX, z: gridZ })

      // Se c'è un preset selezionato, mostra preview
      if (interaction.selectedPresetId) {
        const isValid = canPlaceModule(interaction.selectedPresetId, gridX, gridZ)
        updatePreviewPosition(gridX, gridZ, isValid)
      }
    }
  }, [offsetX, offsetZ, cellsX, cellsZ, setHoveredCellGlobal, interaction.selectedPresetId, canPlaceModule, updatePreviewPosition])

  const handlePointerLeave = useCallback(() => {
    setHoveredCell(null)
    setHoveredCellGlobal(null)
    clearPreview()
  }, [setHoveredCellGlobal, clearPreview])

  const handleClick = useCallback((event: { point: THREE.Vector3; stopPropagation?: () => void }) => {
    event.stopPropagation?.()
    const point = event.point

    const gridX = Math.floor((point.x - offsetX) / GRID_CELL_SIZE)
    const gridZ = Math.floor((point.z - offsetZ) / GRID_CELL_SIZE)

    if (gridX >= 0 && gridX < cellsX && gridZ >= 0 && gridZ < cellsZ) {
      // Se c'è un preset selezionato e la posizione è valida, piazza il modulo
      if (interaction.selectedPresetId && interaction.isValidPosition) {
        addModule(interaction.selectedPresetId, gridX, gridZ)
        setSelectedPreset(null)
        clearPreview()
        return
      }
      onCellClick?.(gridX, gridZ)
    }
  }, [offsetX, offsetZ, cellsX, cellsZ, interaction, addModule, setSelectedPreset, clearPreview, onCellClick])

  return (
    <group>
      {/* Base platform */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <boxGeometry
          args={[
            cellsX * GRID_CELL_SIZE + 2,
            0.2,
            cellsZ * GRID_CELL_SIZE + 2,
          ]}
        />
        <meshStandardMaterial color="#D4CFC9" roughness={0.9} />
      </mesh>

      {/* Grid cells - InstancedMesh per performance */}
      <instancedMesh
        ref={instancedMeshRef}
        args={[cellGeometry, cellMaterial, totalCells]}
        receiveShadow
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
      />

      {/* Grid lines overlay */}
      <GridLines
        cellsX={cellsX}
        cellsZ={cellsZ}
        offsetX={offsetX}
        offsetZ={offsetZ}
      />

      {/* Ghost Preview quando c'è preset selezionato */}
      {interaction.selectedPresetId && interaction.previewPosition && (
        <GhostPreview
          presetId={interaction.selectedPresetId}
          gridX={interaction.previewPosition.x}
          gridZ={interaction.previewPosition.z}
          isValid={interaction.isValidPosition}
          offsetX={offsetX}
          offsetZ={offsetZ}
        />
      )}

      {/* Dimension labels */}
      <group position={[0, 0.05, offsetZ - 0.5]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[cellsX * GRID_CELL_SIZE, 0.02, 0.02]} />
          <meshBasicMaterial color="#86868B" />
        </mesh>
      </group>
    </group>
  )
}

// Componente separato per le linee della griglia - usa LineSegments per efficienza
function GridLines({
  cellsX,
  cellsZ,
  offsetX,
  offsetZ,
}: {
  cellsX: number
  cellsZ: number
  offsetX: number
  offsetZ: number
}) {
  const linesGeometry = useMemo(() => {
    const points: THREE.Vector3[] = []

    // Linee orizzontali (lungo X)
    for (let z = 0; z <= cellsZ; z++) {
      const worldZ = offsetZ + z * GRID_CELL_SIZE
      points.push(
        new THREE.Vector3(offsetX, FLOOR_THICKNESS + 0.01, worldZ),
        new THREE.Vector3(offsetX + cellsX * GRID_CELL_SIZE, FLOOR_THICKNESS + 0.01, worldZ)
      )
    }

    // Linee verticali (lungo Z)
    for (let x = 0; x <= cellsX; x++) {
      const worldX = offsetX + x * GRID_CELL_SIZE
      points.push(
        new THREE.Vector3(worldX, FLOOR_THICKNESS + 0.01, offsetZ),
        new THREE.Vector3(worldX, FLOOR_THICKNESS + 0.01, offsetZ + cellsZ * GRID_CELL_SIZE)
      )
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    return geometry
  }, [cellsX, cellsZ, offsetX, offsetZ])

  return (
    <lineSegments geometry={linesGeometry}>
      <lineBasicMaterial color={COLORS.gridLines} />
    </lineSegments>
  )
}
