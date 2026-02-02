'use client'

import { View, Environment } from '@react-three/drei'
import { Suspense } from 'react'
import { LoadingFallback } from '@/components/three/loading-fallback'
import { CardInteractive } from '@/components/three/card/card-interactive'
import { useDeviceOrientation } from '@/components/three/card/use-device-orientation'

export function HeroCard3D() {
  const { orientation, permission, requestPermission, isSupported } = useDeviceOrientation()
  const gyroscopeEnabled = permission === 'granted'

  return (
    <div className="relative w-full max-w-md mx-auto aspect-[4/3]">
      {/* Mobile gyroscope permission button */}
      {isSupported && permission === 'prompt' && (
        <button
          onClick={requestPermission}
          className="absolute top-2 right-2 z-10 px-2 py-1 text-xs rounded-md bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
        >
          Enable tilt
        </button>
      )}
      <LoadingFallback />
      <View className="absolute inset-0 pointer-events-auto">
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <Environment preset="city" />
          <CardInteractive
            gyroscopeEnabled={gyroscopeEnabled}
            gyroscopeData={orientation}
          />
        </Suspense>
      </View>
    </div>
  )
}
