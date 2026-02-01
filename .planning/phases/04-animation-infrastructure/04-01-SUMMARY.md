---
phase: 04-animation-infrastructure
plan: 01
subsystem: animation
tags: [motion, scroll-reveal, intersection-observer, accessibility]

dependency-graph:
  requires:
    - 02-01 (Motion setup, MotionConfig)
  provides:
    - ScrollReveal component for scroll-triggered animations
    - Centralized scroll reveal variants
    - Transition and viewport presets
  affects:
    - 05 (Social Proof - will use ScrollReveal)
    - 06 (How It Works - will use ScrollReveal)
    - 07 (Features - will use ScrollReveal)
    - 08 (FAQ - will use ScrollReveal)
    - 09 (Calculator - will use ScrollReveal)

tech-stack:
  added: []
  patterns:
    - ScrollReveal wrapper component pattern
    - Centralized animation variants
    - whileInView for Intersection Observer
    - GPU-accelerated properties only (transform, opacity)

key-files:
  created:
    - components/ui/scroll-reveal.tsx
  modified:
    - lib/animation-variants.ts
    - app/page.tsx

decisions:
  - id: 04-01-a
    decision: "Direction prop uses offset values (30px)"
    rationale: "Subtle but visible slide effect, consistent with hero animation"
  - id: 04-01-b
    decision: "'as' prop for semantic HTML"
    rationale: "Allow section, article, etc. instead of always div"
  - id: 04-01-c
    decision: "Demo section added to verify infrastructure"
    rationale: "Temporary verification - remove when content sections implemented"

metrics:
  duration: ~3min
  completed: 2026-02-01
---

# Phase 04 Plan 01: Scroll Animation Infrastructure Summary

**One-liner:** ScrollReveal wrapper component using Motion whileInView with centralized variants for consistent, accessible scroll animations

## What Was Built

### Animation Variants (lib/animation-variants.ts)

Added 12 new exports to the existing animation variants file:

**Scroll Reveal Variants (7):**
- `fadeInVariants` - Opacity only fade
- `slideUpVariants` - Slide from below (y: 30)
- `slideDownVariants` - Slide from above (y: -30)
- `slideLeftVariants` - Slide from right (x: 30)
- `slideRightVariants` - Slide from left (x: -30)
- `scaleInVariants` - Scale from 0.95
- `staggerContainerVariants` - Container for staggered children

**Transition Presets (3):**
- `defaultRevealTransition` - 0.5s easeOut
- `quickRevealTransition` - 0.3s easeOut
- `springRevealTransition` - Spring with stiffness 100, damping 15

**Viewport Presets (2):**
- `defaultViewport` - once: true, amount: 0.3
- `fullViewport` - once: true, amount: 'all'

### ScrollReveal Component (components/ui/scroll-reveal.tsx)

Reusable wrapper component with props:

| Prop | Type | Default | Purpose |
|------|------|---------|---------|
| direction | 'up' \| 'down' \| 'left' \| 'right' \| 'none' | 'up' | Animation direction |
| delay | number | 0 | Delay before animation starts |
| duration | number | 0.5 | Animation duration |
| once | boolean | true | Play animation only once |
| amount | 'some' \| 'all' \| number | 0.3 | Viewport visibility threshold |
| as | keyof JSX.IntrinsicElements | 'div' | Rendered element type |

**Usage:**
```tsx
<ScrollReveal direction="up" delay={0.1}>
  <Card />
</ScrollReveal>
```

### Demo Section (app/page.tsx)

Temporary demo section added below hero to verify infrastructure:
- 3 staggered cards with 0/0.1/0.2s delays
- 1 slide-left text element
- Marked for removal after Phase 4 verification

## Accessibility

Reduced motion support is handled automatically:
- `MotionConfig reducedMotion="user"` wraps the app (from Phase 02-01)
- Transform animations disabled when OS "Reduce motion" is enabled
- Opacity animations still play (safe for vestibular disorders)

## Performance

All animations use GPU-accelerated properties only:
- `transform` (x, y, scale via Motion)
- `opacity`

No layout properties animated (width, height, margin, padding).

## Verification

- TypeScript: Compiles without errors
- Build: Next.js production build succeeds
- Exports: All 12 new exports verified
- Props: All 6 ScrollReveal props implemented

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] JSX namespace import**
- **Found during:** Task 2
- **Issue:** `keyof JSX.IntrinsicElements` failed with TS2503 in React 19
- **Fix:** Added explicit `import type { JSX } from 'react'`
- **Files modified:** components/ui/scroll-reveal.tsx
- **Commit:** a47a065

## Next Phase Readiness

Ready for Phase 5+ content sections:
- ScrollReveal component available for all content sections
- Animation variants ready for direct use where needed
- Demo section can be removed when real content is implemented

## Notes

- Demo section should be removed when content sections (Phase 5-9) are implemented
- Consider smaller stagger (0.05-0.08) for lists > 6 items (per research)
- Viewport `amount: 0.3` may need per-section adjustment based on section height
