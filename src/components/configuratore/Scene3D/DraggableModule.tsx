'use client'

import { useRef, useState, useCallback, useEffect, useMemo } from 'react'
import { useThree, useFrame, ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import type { PlacedModule, ModulePreset } from '@/lib/configuratore/types'
import {
  GRID_CELL_SIZE,
  MODULE_HEIGHT,
  MODULE_INSET,
  FLOOR_THICKNESS,
  COLORS,
} from '@/lib/configuratore/constants'
import { useConfigurator } from '../hooks/useConfigurator'

interface DraggableModuleProps {
  module: PlacedModule
  preset: ModulePreset
  offsetX: number
  offsetZ: number
}

export default function DraggableModule({
  module,
  preset,
  offsetX,
  offsetZ,
}: DraggableModuleProps) {
  const meshRef = useRef<THREE.Group>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [dragPosition, setDragPosition] = useState<{ x: number; z: number } | null>(null)
  const [isValidDragPosition, setIsValidDragPosition] = useState(false)
  const originalPosition = useRef({ x: module.gridX, z: module.gridZ })

  const { gl, camera, scene } = useThree()
  const raycaster = useMemo(() => new THREE.Raycaster(), [])

  // Helper to set cursor style on canvas element
  const setCursor = useCallback((cursor: string) => {
    gl.domElement.style.setProperty('cursor', cursor)
  }, [gl])

  const selectedModuleId = useConfigurator((state) => state.selectedModuleId)
  const selectModule = useConfigurator((state) => state.selectModule)
  const removeModule = useConfigurator((state) => state.removeModule)
  const rotateModule = useConfigurator((state) => state.rotateModule)
  const moveModule = useConfigurator((state) => state.moveModule)
  const canPlaceModule = useConfigurator((state) => state.canPlaceModule)
  const startDraggingModule = useConfigurator((state) => state.startDraggingModule)
  const stopDraggingModule = useConfigurator((state) => state.stopDraggingModule)
  const gridCellsX = useConfigurator((state) => state.gridCellsX)
  const gridCellsZ = useConfigurator((state) => state.gridCellsZ)

  const isSelected = selectedModuleId === module.instanceId

  // Calculate effective dimensions based on rotation
  const isRotated = module.rotation === 90 || module.rotation === 270
  const effectiveCellsX = isRotated ? preset.cellsZ : preset.cellsX
  const effectiveCellsZ = isRotated ? preset.cellsX : preset.cellsZ

  // Calculate world position (using dragPosition if dragging)
  const currentGridX = dragPosition?.x ?? module.gridX
  const currentGridZ = dragPosition?.z ?? module.gridZ

  const worldX = useMemo(
    () => offsetX + currentGridX * GRID_CELL_SIZE + (effectiveCellsX * GRID_CELL_SIZE) / 2,
    [offsetX, currentGridX, effectiveCellsX]
  )
  const worldZ = useMemo(
    () => offsetZ + currentGridZ * GRID_CELL_SIZE + (effectiveCellsZ * GRID_CELL_SIZE) / 2,
    [offsetZ, currentGridZ, effectiveCellsZ]
  )

  // Module dimensions in world units
  const moduleWidth = effectiveCellsX * GRID_CELL_SIZE - MODULE_INSET * 2
  const moduleDepth = effectiveCellsZ * GRID_CELL_SIZE - MODULE_INSET * 2

  // Convert mouse event to grid cell
  const mouseToGridCell = useCallback((event: PointerEvent): { x: number; z: number } | null => {
    const rect = gl.domElement.getBoundingClientRect()
    const mouse = new THREE.Vector2(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1
    )

    raycaster.setFromCamera(mouse, camera)

    // Create an invisible plane at floor level for raycasting
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
    const intersection = new THREE.Vector3()

    if (raycaster.ray.intersectPlane(plane, intersection)) {
      // Convert world position to grid cell
      const cellX = Math.floor((intersection.x - offsetX) / GRID_CELL_SIZE)
      const cellZ = Math.floor((intersection.z - offsetZ) / GRID_CELL_SIZE)

      // Clamp to valid grid range
      const clampedX = Math.max(0, Math.min(gridCellsX - effectiveCellsX, cellX))
      const clampedZ = Math.max(0, Math.min(gridCellsZ - effectiveCellsZ, cellZ))

      return { x: clampedX, z: clampedZ }
    }
    return null
  }, [gl, camera, raycaster, offsetX, offsetZ, gridCellsX, gridCellsZ, effectiveCellsX, effectiveCellsZ])

  // Handle pointer down - start dragging
  /* eslint-disable react-hooks/preserve-manual-memoization -- Three.js event handler requires manual memoization */
  const handlePointerDown = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation()

      // First select the module
      selectModule(module.instanceId)

      // Store original position
      originalPosition.current = { x: module.gridX, z: module.gridZ }

      // Start dragging
      setIsDragging(true)
      setDragPosition({ x: module.gridX, z: module.gridZ })
      setIsValidDragPosition(true)
      startDraggingModule(module.instanceId)

      // Change cursor
      setCursor('grabbing')
    },
    [selectModule, module.instanceId, module.gridX, module.gridZ, startDraggingModule, gl]
  )
  /* eslint-enable react-hooks/preserve-manual-memoization */

  // Handle pointer move during drag
  useEffect(() => {
    if (!isDragging) return

    const handlePointerMove = (e: PointerEvent) => {
      const cell = mouseToGridCell(e)
      if (cell) {
        setDragPosition(cell)
        // Check if position is valid (exclude current module)
        const isValid = canPlaceModule(preset.id, cell.x, cell.z, module.instanceId)
        setIsValidDragPosition(isValid)
      }
    }

    const handlePointerUp = () => {
      setIsDragging(false)
      stopDraggingModule()
      setCursor('auto')

      if (dragPosition && isValidDragPosition &&
          (dragPosition.x !== originalPosition.current.x || dragPosition.z !== originalPosition.current.z)) {
        // Move module to new position
        moveModule(module.instanceId, dragPosition.x, dragPosition.z)
      }
      // Reset drag position
      setDragPosition(null)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [isDragging, dragPosition, isValidDragPosition, mouseToGridCell, canPlaceModule, preset.id, module.instanceId, moveModule, stopDraggingModule, gl])

  // Handle keyboard events for selected module
  useEffect(() => {
    if (!isSelected || isDragging) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault()
        removeModule(module.instanceId)
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault()
        rotateModule(module.instanceId)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSelected, isDragging, removeModule, rotateModule, module.instanceId])

  // Smooth animation for position
  const targetY = useRef(MODULE_HEIGHT / 2 + FLOOR_THICKNESS)
  const currentY = useRef(MODULE_HEIGHT / 2 + FLOOR_THICKNESS)

  useFrame(() => {
    if (meshRef.current) {
      // Animate Y position (lift when dragging)
      targetY.current = isDragging
        ? MODULE_HEIGHT / 2 + FLOOR_THICKNESS + 0.8
        : MODULE_HEIGHT / 2 + FLOOR_THICKNESS
      currentY.current = THREE.MathUtils.lerp(currentY.current, targetY.current, 0.2)
      meshRef.current.position.y = currentY.current
    }
  })

  // Color based on state
  const moduleColor = useMemo(() => {
    if (isDragging) {
      return isValidDragPosition ? preset.color : '#D4856B' // rosso se posizione invalida
    }
    return preset.color
  }, [isDragging, isValidDragPosition, preset.color])

  return (
    <group
      ref={meshRef}
      position={[worldX, MODULE_HEIGHT / 2 + FLOOR_THICKNESS, worldZ]}
      onPointerDown={handlePointerDown}
      onPointerOver={(e) => {
        if (!isDragging) {
          e.stopPropagation()
          setHovered(true)
          setCursor('grab')
        }
      }}
      onPointerOut={() => {
        if (!isDragging) {
          setHovered(false)
          setCursor('auto')
        }
      }}
    >
      {/* Module box */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[moduleWidth, MODULE_HEIGHT, moduleDepth]} />
        <meshStandardMaterial
          color={moduleColor}
          roughness={0.7}
          metalness={0.1}
          transparent
          opacity={isDragging ? 0.7 : 0.95}
        />
      </mesh>

      {/* Selection outline */}
      {(isSelected || hovered || isDragging) && (
        <mesh>
          <boxGeometry args={[moduleWidth + 0.1, MODULE_HEIGHT + 0.1, moduleDepth + 0.1]} />
          <meshBasicMaterial
            color={isDragging ? (isValidDragPosition ? '#4A8B6E' : '#D4856B') : isSelected ? COLORS.selected : '#ffffff'}
            wireframe
            transparent
            opacity={0.6}
          />
        </mesh>
      )}

      {/* Top label plane with color indicator */}
      <mesh position={[0, MODULE_HEIGHT / 2 + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[moduleWidth * 0.8, moduleDepth * 0.4]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
      </mesh>

      {/* Module name label (simplified - just a colored bar) */}
      <mesh position={[0, MODULE_HEIGHT / 2 + 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[moduleWidth * 0.6, moduleDepth * 0.15]} />
        <meshBasicMaterial color={preset.color} />
      </mesh>
    </group>
  )
}
