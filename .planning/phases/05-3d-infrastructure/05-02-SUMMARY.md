---
phase: "05"
plan: "02"
subsystem: "3d-rendering"
tags: ["react-three-fiber", "canvas", "webgl", "view-port"]

dependencies:
  requires: ["05-01"]
  provides: ["scene3d-canvas", "view-port-pattern"]
  affects: ["05-03", "06-hero-card"]

tech_stack:
  added: []
  patterns: ["view-port-pattern", "dynamic-import-ssr-false"]

key_files:
  created:
    - "components/three/scene.tsx"
  modified:
    - "components/providers.tsx"

decisions:
  - id: "canvas-ios-safe"
    choice: "Conservative gl settings for iOS Safari"
    rationale: "powerPreference: 'default', antialias: false prevents GPU throttling and memory crashes"
  - id: "dynamic-ssr-false"
    choice: "Dynamic import with ssr: false"
    rationale: "WebGL APIs are browser-only, prevents hydration mismatch errors"
  - id: "ref-non-null-assertion"
    choice: "useRef with null! assertion"
    rationale: "Required for R3F eventSource type compatibility"

metrics:
  duration: "2min"
  completed: "2026-01-31"
---

# Phase 05 Plan 02: Scene3D Canvas Infrastructure Summary

Single Canvas with View.Port pattern at app root using iOS-safe WebGL settings and dynamic import to prevent hydration errors.

## What Was Built

### Scene3D Component (`components/three/scene.tsx`)

Created a wrapper component that provides a single persistent Canvas for the entire app:

```typescript
export function Scene3D({ children }: Scene3DProps) {
  const containerRef = useRef<HTMLDivElement>(null!)

  return (
    <div ref={containerRef} className="relative">
      {children}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 10 }}>
        <Canvas
          eventSource={containerRef}
          eventPrefix="client"
          gl={{
            powerPreference: 'default',
            antialias: false,
          }}
          dpr={[1, 2]}
          fallback={<div className="sr-only">WebGL not supported</div>}
        >
          <View.Port />
          <Preload all />
        </Canvas>
      </div>
    </div>
  )
}
```

Key design decisions:
- **Fixed overlay Canvas**: Positioned fixed with pointer-events-none so it overlays entire app
- **iOS Safari gl settings**: Conservative settings prevent GPU throttling and memory crashes
- **View.Port pattern**: Single render target for all View components in the tree
- **Preload all**: Assets preloaded for smoother 3D experience

### Updated Providers (`components/providers.tsx`)

Integrated Scene3D with dynamic import:

```typescript
const Scene3D = dynamic(
  () => import('@/components/three/scene').then(mod => mod.Scene3D),
  { ssr: false }
)

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <Scene3D>
        {children}
      </Scene3D>
    </MotionConfig>
  )
}
```

Dynamic import with `ssr: false` prevents hydration errors since WebGL APIs are browser-only.

## Task Completion

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create Scene3D canvas container | c203b91 | components/three/scene.tsx |
| 2 | Update Providers with dynamic Scene3D | b2e8c75 | components/three/scene.tsx, components/providers.tsx |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed ref type for eventSource compatibility**
- **Found during:** Task 2 verification (build)
- **Issue:** TypeScript error - `RefObject<HTMLDivElement | null>` not assignable to eventSource prop
- **Fix:** Changed to `useRef<HTMLDivElement>(null!)` with non-null assertion
- **Files modified:** components/three/scene.tsx
- **Commit:** b2e8c75

## Verification Results

- Build succeeds without TypeScript errors
- Dev server starts without console errors
- No hydration errors on page load
- Scene3D chunk loads in browser
- Canvas with View.Port is mounted and ready

## Next Phase Readiness

Ready for 05-03 (View Components and Card Placeholder):
- Canvas infrastructure is mounted at app root
- View.Port is ready to receive View component renders
- iOS Safari compatibility settings are in place
- No blockers identified
