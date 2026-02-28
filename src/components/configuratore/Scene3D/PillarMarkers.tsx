'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { GRID_CELL_SIZE, PILLAR_RADIUS, PILLAR_HEIGHT, COLORS, FLOOR_THICKNESS } from '@/lib/configuratore/constants'

interface PillarMarkersProps {
  cellsX: number
  cellsZ: number
  offsetX: number
  offsetZ: number
}

export default function PillarMarkers({
  cellsX,
  cellsZ,
  offsetX,
  offsetZ,
}: PillarMarkersProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null)

  // Calculate pillar positions (at grid intersections)
  const pillarPositions = useMemo(() => {
    const positions: THREE.Vector3[] = []

    // Pillars at each corner of cells (including outer edges)
    for (let x = 0; x <= cellsX; x++) {
      for (let z = 0; z <= cellsZ; z++) {
        const worldX = offsetX + x * GRID_CELL_SIZE
        const worldZ = offsetZ + z * GRID_CELL_SIZE
        positions.push(new THREE.Vector3(worldX, PILLAR_HEIGHT / 2 + FLOOR_THICKNESS, worldZ))
      }
    }

    return positions
  }, [cellsX, cellsZ, offsetX, offsetZ])

  // Set up instanced mesh matrices
  useEffect(() => {
    if (!meshRef.current) return

    const tempMatrix = new THREE.Matrix4()

    pillarPositions.forEach((position, index) => {
      tempMatrix.setPosition(position)
      meshRef.current!.setMatrixAt(index, tempMatrix)
    })

    meshRef.current.instanceMatrix.needsUpdate = true
  }, [pillarPositions])

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, pillarPositions.length]}
      castShadow
      receiveShadow
    >
      <cylinderGeometry args={[PILLAR_RADIUS, PILLAR_RADIUS, PILLAR_HEIGHT, 8]} />
      <meshStandardMaterial
        color={COLORS.pillar}
        roughness={0.6}
        metalness={0.2}
      />
    </instancedMesh>
  )
}
