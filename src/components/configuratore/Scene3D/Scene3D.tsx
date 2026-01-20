'use client'

import { Suspense, useRef, useCallback, useEffect, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import * as THREE from 'three'
import GridFloor from './GridFloor'
import PillarMarkers from './PillarMarkers'
import ModuleRenderer from './ModuleRenderer'
import { Scene3DErrorBoundary } from './ErrorBoundary'
import { useConfigurator } from '../hooks/useConfigurator'
import { GRID_CELL_SIZE } from '@/lib/configuratore/constants'

// Determina qualità shadow basata sul dispositivo
function useShadowQuality() {
  const [quality, setQuality] = useState<'high' | 'medium' | 'low'>('high')

  useEffect(() => {
    // Detect mobile/tablet
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const isLowEnd = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false

    if (isMobile || isLowEnd) {
      setQuality('low')
    } else if (window.innerWidth < 1200) {
      setQuality('medium')
    } else {
      setQuality('high')
    }
  }, [])

  return quality
}

const SHADOW_MAP_SIZES = {
  high: 2048,
  medium: 1024,
  low: 512,
}

function SceneContent() {
  const controlsRef = useRef<OrbitControlsImpl>(null)
  const { camera } = useThree()
  const shadowQuality = useShadowQuality()

  const gridCellsX = useConfigurator((state) => state.gridCellsX)
  const gridCellsZ = useConfigurator((state) => state.gridCellsZ)
  const selectModule = useConfigurator((state) => state.selectModule)
  const resetViewTrigger = useConfigurator((state) => state.resetViewTrigger)
  const interaction = useConfigurator((state) => state.interaction)
  const setSelectedPreset = useConfigurator((state) => state.setSelectedPreset)

  // Calculate grid dimensions in world units
  const gridWidth = gridCellsX * GRID_CELL_SIZE
  const gridDepth = gridCellsZ * GRID_CELL_SIZE

  // Center offset to center the grid at origin
  const offsetX = -gridWidth / 2
  const offsetZ = -gridDepth / 2

  // Disable orbit controls when dragging a module
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.enabled = !interaction.draggingInstanceId
    }
  }, [interaction.draggingInstanceId])

  // Reset camera when trigger changes
  useEffect(() => {
    if (resetViewTrigger > 0 && controlsRef.current) {
      camera.position.set(gridWidth * 0.8, gridWidth * 0.6, gridWidth * 0.8)
      camera.lookAt(0, 0, 0)
      controlsRef.current.target.set(0, 0, 0)
      controlsRef.current.update()
    }
  }, [resetViewTrigger, camera, gridWidth])

  const handleCellClick = useCallback(
    (cellX: number, cellZ: number) => {
      console.log('Cell clicked:', cellX, cellZ)
    },
    []
  )

  const handleBackgroundClick = useCallback(() => {
    selectModule(null)
    if (interaction.selectedPresetId) {
      setSelectedPreset(null)
    }
  }, [selectModule, interaction.selectedPresetId, setSelectedPreset])

  const shadowMapSize = SHADOW_MAP_SIZES[shadowQuality]

  return (
    <>
      {/* Camera */}
      <PerspectiveCamera
        makeDefault
        position={[gridWidth * 0.8, gridWidth * 0.6, gridWidth * 0.8]}
        fov={50}
      />

      {/* Lighting - Optimized based on device */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 15, 10]}
        intensity={1}
        castShadow={shadowQuality !== 'low'}
        shadow-mapSize={[shadowMapSize, shadowMapSize]}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-bias={-0.001}
      />
      <directionalLight position={[-5, 8, -5]} intensity={0.3} />

      {/* Background click plane */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.01, 0]}
        onClick={handleBackgroundClick}
      >
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial visible={false} />
      </mesh>

      {/* Grid Floor */}
      <GridFloor
        cellsX={gridCellsX}
        cellsZ={gridCellsZ}
        offsetX={offsetX}
        offsetZ={offsetZ}
        onCellClick={handleCellClick}
      />

      {/* Pillars at intersections */}
      <PillarMarkers
        cellsX={gridCellsX}
        cellsZ={gridCellsZ}
        offsetX={offsetX}
        offsetZ={offsetZ}
      />

      {/* Placed modules */}
      <ModuleRenderer offsetX={offsetX} offsetZ={offsetZ} />

      {/* Controls - Touch optimized */}
      <OrbitControls
        ref={controlsRef}
        makeDefault
        enablePan
        enableZoom
        enableRotate
        minDistance={5}
        maxDistance={50}
        maxPolarAngle={Math.PI / 2.1}
        target={[0, 0, 0]}
        // Touch settings
        touches={{
          ONE: THREE.TOUCH.ROTATE,
          TWO: THREE.TOUCH.DOLLY_PAN,
        }}
        // Damping for smoother feel
        enableDamping
        dampingFactor={0.1}
        // Rotate speed
        rotateSpeed={0.8}
        // Zoom speed
        zoomSpeed={1.2}
        // Pan speed
        panSpeed={0.8}
      />
    </>
  )
}

export default function Scene3D() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="w-full h-full">
      <Scene3DErrorBoundary>
        <Canvas
          shadows={!isMobile}
          gl={{
            antialias: !isMobile,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1,
            powerPreference: isMobile ? 'low-power' : 'high-performance',
          }}
          style={{ background: 'linear-gradient(180deg, #E8E4E0 0%, #F5F3F0 100%)' }}
          // Touch optimizations
          touch-action="none"
        >
          <Suspense fallback={null}>
            <SceneContent />
          </Suspense>
        </Canvas>
      </Scene3DErrorBoundary>
    </div>
  )
}
