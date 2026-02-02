---
phase: 06-3d-card
plan: 02
subsystem: ui
tags: [react-three-fiber, maath, dampE, gyroscope, device-orientation, ios-permission]

# Dependency graph
requires:
  - phase: 05-3d-infrastructure
    provides: R3F v9 + drei v10.7.7 setup with View.Port pattern
provides:
  - useDeviceOrientation hook with iOS permission handling
  - CardInteractive component with dampE rotation following
affects: [06-3d-card, hero-card-integration]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "dampE for frame-rate-independent animation"
    - "iOS 13+ permission request via user gesture"
    - "Direct ref mutation in useFrame (no useState)"

key-files:
  created:
    - components/three/card/use-device-orientation.ts
    - components/three/card/card-interactive.tsx
  modified: []

key-decisions:
  - "rotationFactor 0.25 for ~14 degrees max tilt"
  - "beta-45 offset for natural phone holding angle"
  - "0.2 smoothing time for responsive but smooth feel"

patterns-established:
  - "useFrame + dampE + delta: Frame-rate-independent animation pattern"
  - "Gyroscope permission hook: iOS requestPermission from user gesture"

# Metrics
duration: 2min
completed: 2026-02-02
---

# Phase 6 Plan 2: Interaction Hooks Summary

**useDeviceOrientation hook with iOS permission flow and CardInteractive wrapper using maath dampE for smooth cursor/gyroscope rotation**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-02T22:18:11Z
- **Completed:** 2026-02-02T22:20:35Z
- **Tasks:** 2
- **Files created:** 2

## Accomplishments
- useDeviceOrientation hook with full iOS 13+ permission handling
- CardInteractive component with dampE-based rotation following
- Frame-rate-independent animation (same speed on 60Hz and 120Hz displays)
- Dual input support: mouse cursor on desktop, device tilt on mobile

## Task Commits

Each task was committed atomically:

1. **Task 1: Create useDeviceOrientation hook** - `18da92b` (feat)
2. **Task 2: Create CardInteractive wrapper component** - `8569f6a` (feat)

## Files Created/Modified
- `components/three/card/use-device-orientation.ts` - Gyroscope hook with iOS permission handling
- `components/three/card/card-interactive.tsx` - Interactive rotation wrapper using dampE

## Decisions Made
- **rotationFactor 0.25:** Provides ~14 degrees max tilt, enough for visual feedback without excessive rotation
- **beta-45 offset:** Users hold phones at ~45 degree angle, offset makes flat card appear when holding naturally
- **0.2 smoothing time:** Lower values (faster) felt twitchy, higher values felt laggy - 0.2 is responsive yet smooth
- **No useState in useFrame:** Critical for 60fps performance, direct ref.current.rotation mutation instead

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - maath was already installed (from 06-01), CardModel file existed from parallel plan execution.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- CardInteractive ready to be used in hero section
- useDeviceOrientation hook provides permission UI building blocks
- Integration with CardModel (from 06-01) and Environment (06-03) will complete the 3D card

---
*Phase: 06-3d-card*
*Completed: 2026-02-02*
