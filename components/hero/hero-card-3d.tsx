'use client'

import { View } from '@react-three/drei'
import { Suspense } from 'react'
import { LoadingFallback } from '@/components/three/loading-fallback'

// Placeholder mesh - will be replaced with actual card model in Phase 6
function CardPlaceholder() {
  return (
    <mesh rotation={[0, 0.2, 0]}>
      {/* Credit card aspect ratio: 85.6mm x 53.98mm = ~1.586:1 */}
      <boxGeometry args={[3.375, 2.125, 0.05]} />
      <meshStandardMaterial
        color="#8b5cf6"
        metalness={0.5}
        roughness={0.3}
      />
    </mesh>
  )
}

export function HeroCard3D() {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-[4/3]">
      <LoadingFallback />
      <View className="absolute inset-0 pointer-events-auto">
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <CardPlaceholder />
        </Suspense>
      </View>
    </div>
  )
}
