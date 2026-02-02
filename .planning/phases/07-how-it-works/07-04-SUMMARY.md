---
phase: 07-how-it-works
plan: 04
subsystem: ui
tags: [motion, scroll-animation, css-offset-path, svg, particles]

# Dependency graph
requires:
  - phase: 07-how-it-works
    provides: PaymentFlowAnimation component with SVG path drawing
provides:
  - 5 animated particles following SVG path during scroll
  - CSS offset-path scroll animation pattern
  - Staggered particle timing with opacity/scale polish
affects: []

# Tech tracking
tech-stack:
  added: []
  patterns:
    - CSS offset-path with scroll-linked offset-distance
    - Staggered motion transforms for trail effect

key-files:
  created: []
  modified:
    - components/how-it-works/payment-flow-animation.tsx

key-decisions:
  - "SVG circle elements with CSS offset-path (not DOM divs)"
  - "First path segment only for particles (before split)"
  - "3 primary + 2 amber particles to foreshadow split"

patterns-established:
  - "Particle animation: useTransform with staggered ranges + offset-path CSS"

# Metrics
duration: 2min
completed: 2026-02-02
---

# Phase 7 Plan 4: Path Particles Summary

**5 scroll-linked SVG particles animate along payment flow path with staggered timing and fade/scale polish**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-02T22:59:27Z
- **Completed:** 2026-02-02T23:01:01Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments
- Added 5 motion.circle particles that animate along the SVG path using CSS offset-path
- Each particle is staggered by 0.03 progress offset creating a trail effect
- Smooth fade in/out over 5% of each particle's range prevents pop-in
- Subtle scale pulse effect (0.5 -> 1 -> 0.5) adds visual interest
- GPU-only animations (opacity, transform, offset-distance) maintain 60fps

## Task Commits

Each task was committed atomically:

1. **Task 1: Add path particles to PaymentFlowAnimation** - `0c75a8f` (feat)
2. **Task 2: Fine-tune particle visibility and polish** - `8b90f86` (feat)

## Files Created/Modified
- `components/how-it-works/payment-flow-animation.tsx` - Added 5 particles with scroll-linked offset-distance, opacity, and scale transforms

## Decisions Made
- Used SVG circle elements with CSS offset-path rather than DOM divs - cleaner integration with existing SVG
- Particles follow only the first path segment (straight flow before split) to avoid complexity at branch point
- 3 primary colored + 2 amber colored particles foreshadow the ACH/rewards split

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Gap in HIW-02 (particles) is now closed
- All 4 plans in Phase 7 complete
- Ready for Phase 8 or verification re-run

---
*Phase: 07-how-it-works*
*Completed: 2026-02-02*
