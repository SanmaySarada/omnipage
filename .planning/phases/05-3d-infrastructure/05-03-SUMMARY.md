---
phase: 05-3d-infrastructure
plan: 03
subsystem: 3d-rendering
tags: [react-three-fiber, drei, view, loading, placeholder]
dependency-graph:
  requires: ["05-02"]
  provides: ["loading-fallback", "hero-card-3d", "hero-3d-integration"]
  affects: ["06-card-model"]
tech-stack:
  added: []
  patterns: ["View viewport pattern", "useProgress loading state", "Suspense for 3D"]
key-files:
  created:
    - components/three/loading-fallback.tsx
    - components/hero/hero-card-3d.tsx
  modified:
    - components/hero/hero-section.tsx
decisions:
  - id: loading-fallback-conditional
    choice: "Return null when not loading"
    rationale: "Avoids layout shift after 3D loads"
  - id: credit-card-proportions
    choice: "3.375:2.125 box geometry"
    rationale: "Standard credit card aspect ratio (85.6mm x 53.98mm)"
  - id: mobile-card-first
    choice: "order-first lg:order-last"
    rationale: "3D card above text on mobile for visual impact"
metrics:
  duration: 2min
  tasks: 3/3
  completed: 2026-01-31
---

# Phase 5 Plan 3: Placeholder Components & Hero Integration Summary

**One-liner:** Loading skeleton with drei useProgress, 3D card placeholder via View component, responsive hero grid layout

## What Was Built

### LoadingFallback Component
- Progress bar using drei `useProgress` hook
- Tracks THREE.DefaultLoadingManager loading state
- Returns null when not active to prevent layout impact
- Tailwind styling with muted/primary theme colors

### HeroCard3D Component
- View-based 3D viewport for shared Canvas rendering
- CardPlaceholder mesh with credit card proportions
- Suspense boundary for async loading
- Ambient and directional lighting setup
- LoadingFallback integration for loading state

### Hero Section Integration
- 2-column responsive grid layout
- Text content left, 3D card right on desktop (>1024px)
- Card appears first on mobile for visual prominence
- gap-12 spacing between columns

## Technical Details

**View Pattern:**
The View component from drei creates a viewport that renders into the single shared Canvas via View.Port. This allows multiple 3D viewports on the page without multiple Canvas elements.

**Loading State:**
useProgress hooks into THREE.DefaultLoadingManager to track asset loading progress. The LoadingFallback shows a progress bar during initial load.

**Card Geometry:**
Credit card standard dimensions are 85.6mm x 53.98mm, giving an aspect ratio of approximately 1.586:1. The box geometry uses 3.375 x 2.125 units to match this ratio.

## Commits

| Hash | Type | Description |
|------|------|-------------|
| bf12468 | feat | Create loading fallback skeleton for 3D content |
| 050970a | feat | Create 3D card placeholder with View component |
| f6133e5 | feat | Integrate 3D placeholder into hero section |

## Files Changed

**Created:**
- `components/three/loading-fallback.tsx` - Loading progress bar component
- `components/hero/hero-card-3d.tsx` - 3D card viewport with placeholder mesh

**Modified:**
- `components/hero/hero-section.tsx` - Added HeroCard3D to 2-column grid

## Deviations from Plan

None - plan executed exactly as written.

## Verification Results

- Build succeeds without errors
- Dev server starts and responds
- HeroCard3D imported in hero-section.tsx
- View component imported from drei in hero-card-3d.tsx
- LoadingFallback imported and rendered in hero-card-3d.tsx

## Phase 5 Completion

With this plan complete, Phase 5 (3D Infrastructure) is fully implemented:

1. **05-01:** R3F dependencies installed and configured
2. **05-02:** Scene3D Canvas with View.Port, dynamic import, iOS handling
3. **05-03:** Loading fallback, 3D placeholder, hero integration

**All Phase 5 success criteria met:**
- Canvas with View.Port for multiple viewports
- Async loading without blocking above-fold content
- Placeholder 3D content visible in hero
- iOS WebGL handling with conservative settings

## Next Phase Readiness

Phase 6 (3D Card Implementation) can begin:
- View pattern established and working
- Loading state infrastructure in place
- Hero integration point defined
- CardPlaceholder ready to be replaced with actual model
