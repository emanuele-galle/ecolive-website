declare module '@mkkellogg/gaussian-splats-3d' {
  export interface ViewerOptions {
    cameraUp?: [number, number, number]
    initialCameraPosition?: [number, number, number]
    initialCameraLookAt?: [number, number, number]
    rootElement?: HTMLElement
    sharedMemoryForWorkers?: boolean
    dynamicScene?: boolean
    antialiased?: boolean
    focalAdjustment?: number
    selfDrivenMode?: boolean
    useBuiltInControls?: boolean
    ignoreDevicePixelRatio?: boolean
    gpuAcceleratedSort?: boolean
    enableSIMDInSort?: boolean
    integerBasedSort?: boolean
    halfPrecisionCovariancesOnGPU?: boolean
    devicePixelRatio?: number
    threeScene?: unknown
    renderer?: unknown
    camera?: unknown
  }

  export interface SplatSceneOptions {
    showLoadingUI?: boolean
    progressiveLoad?: boolean
    onProgress?: (event: ProgressEvent) => void
    position?: [number, number, number]
    rotation?: [number, number, number, number]
    scale?: [number, number, number]
    splatAlphaRemovalThreshold?: number
  }

  export class Viewer {
    constructor(options?: ViewerOptions)
    addSplatScene(url: string, options?: SplatSceneOptions): Promise<void>
    start(): void
    stop(): void
    dispose(): void
    setSize(width: number, height: number): void
    render(): void
    update(): void
    getCamera(): unknown
    getRenderer(): unknown
    getScene(): unknown
  }

  export class DropInViewer extends Viewer {
    constructor(options?: ViewerOptions)
  }

  export default {
    Viewer,
    DropInViewer
  }
}
