---
phase: 07-how-it-works
plan: 05
subsystem: ui
tags: [framer-motion, isometric, scroll-animation, odometer, react]

# Dependency graph
requires:
  - phase: 07-v1 (deprecated)
    provides: Original how-it-works section (now deleted)
provides:
  - how-you-earn directory structure with 4 subsection placeholders
  - Shared isometric projection utilities
  - Reusable Odometer animated counter component
  - ScrollSection scroll-animated wrapper
  - Constants for isometric colors, timing, and example data
affects:
  - 07-06-tuition-rewards
  - 07-07-unlock-rate
  - 07-08-discover-rewards
  - 07-09-rewards-loop

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Isometric 30-degree projection utilities
    - Scroll-linked animation with MotionValue
    - Odometer number animation with spring physics

key-files:
  created:
    - components/how-you-earn/index.ts
    - components/how-you-earn/how-you-earn-section.tsx
    - components/how-you-earn/shared/constants.ts
    - components/how-you-earn/shared/isometric-utils.ts
    - components/how-you-earn/shared/scroll-section.tsx
    - components/how-you-earn/shared/odometer.tsx
  modified:
    - app/page.tsx

key-decisions:
  - "Deleted old how-it-works completely for clean slate"
  - "ScrollSection uses render prop pattern for scroll progress"
  - "Odometer supports both mount-triggered and scroll-driven animation"
  - "Generic typing for useScrollTransform to support number[] or string[] outputs"

patterns-established:
  - "Isometric projection: 30-degree angle, toIsometric(x, y, z) for coordinate transform"
  - "ScrollSection pattern: children receive MotionValue<number> for coordinated animations"
  - "Reduced motion: useReducedMotion() with static fallback component"

# Metrics
duration: 3min
completed: 2026-02-02
---

# Phase 7 Plan 5: Delete Old Implementation & Create Infrastructure Summary

**Clean slate for How You Earn with shared isometric utilities, Odometer counter, and 4 placeholder sections**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-03T05:44:24Z
- **Completed:** 2026-02-03T05:47:30Z
- **Tasks:** 6
- **Files modified:** 10 (4 deleted, 6 created)

## Accomplishments

- Deleted entire old how-it-works directory (4 files, 418 lines)
- Created how-you-earn directory structure with 4 subsection directories
- Built shared utilities: isometric projection, scroll animation, constants
- Created reusable Odometer component with dollar, percent, and points variants
- Implemented HowYouEarnSection with 4 placeholders and reduced motion fallback
- Page updated and build passes

## Task Commits

Each task was committed atomically:

1. **Task 1: Delete old how-it-works components** - `0b5851f` (chore)
2. **Task 2: Create how-you-earn directory structure** - `2a8070f` (feat)
3. **Task 3: Create shared utilities** - `b755368` (feat)
4. **Task 4: Create Odometer component** - `61efea5` (feat)
5. **Task 5: Create main section wrapper with placeholders** - `213e0be` (feat)
6. **Task 6: Update page.tsx to use new component** - `c73360b` (feat)

## Files Created/Modified

**Deleted:**
- `components/how-it-works/how-it-works-section.tsx` - Old section wrapper
- `components/how-it-works/how-it-works-static.tsx` - Old static fallback
- `components/how-it-works/payment-flow-animation.tsx` - Old animation
- `components/how-it-works/progress-dots.tsx` - Old progress indicator

**Created:**
- `components/how-you-earn/index.ts` - Barrel export
- `components/how-you-earn/how-you-earn-section.tsx` - Main section with 4 placeholders
- `components/how-you-earn/shared/constants.ts` - ISO_COLORS, TIMING, EXAMPLE_DATA
- `components/how-you-earn/shared/isometric-utils.ts` - toIsometric, createIsometricBox, createIsometricGrid
- `components/how-you-earn/shared/scroll-section.tsx` - ScrollSection component
- `components/how-you-earn/shared/odometer.tsx` - Odometer, DollarOdometer, PercentOdometer, PointsOdometer

**Modified:**
- `app/page.tsx` - Import HowYouEarnSection instead of HowItWorksSection

## Decisions Made

- **Generic useScrollTransform type:** Added generic `<T extends number | string>` to fix TypeScript union type error with framer-motion's useTransform
- Followed plan as specified for all other decisions

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed TypeScript error in useScrollTransform**
- **Found during:** Task 3 (Create shared utilities)
- **Issue:** useTransform doesn't accept `number[] | string[]` union type for outputRange
- **Fix:** Added generic type parameter `<T extends number | string>` to properly constrain the function
- **Files modified:** components/how-you-earn/shared/scroll-section.tsx
- **Verification:** TypeScript compilation passes
- **Committed in:** b755368 (Task 3 commit)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Minor typing fix, necessary for TypeScript correctness. No scope creep.

## Issues Encountered

None - plan executed smoothly.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Directory structure ready for 07-06 (Tuition Rewards section)
- Shared utilities available: isometric-utils, scroll-section, odometer, constants
- All subdirectories created and empty, ready for section implementations
- Build passes, page renders with placeholder sections

---
*Phase: 07-how-it-works*
*Completed: 2026-02-02*
