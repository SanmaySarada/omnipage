# Phase 7: How It Works (Scroll Section) - Research

**Researched:** 2026-02-02
**Domain:** Scroll-linked animation, SVG path animation, reduced motion accessibility
**Confidence:** HIGH

## Summary

Phase 7 builds a scroll-driven "How It Works" section that visualizes the payment flow: card swipe, particles along an SVG path, split to ACH (school) and rewards (user). The section spans 150-200vh with progress-linked animation, clickable progress dots for step navigation, and a static fallback for users with prefers-reduced-motion enabled.

The standard approach uses Motion's `useScroll` hook with a tall container (150-200vh) containing a sticky viewport (100vh) where animations play as the user scrolls. The `useTransform` hook maps scroll progress (0-1) to animation values. SVG path animations use `pathLength` for drawing effects, while particles can use either CSS `offset-path`/`offset-distance` or Three.js `CatmullRomCurve3` with `useFrame` for 3D effects.

The existing infrastructure is well-suited: `motion@12.29.2` with `MotionConfig reducedMotion="user"` handles accessibility automatically for transform animations. The `Scene3D` component with `View.Port` pattern enables embedding 3D particle effects if desired. The `ScrollReveal` component provides reveal animations for supporting content.

**Primary recommendation:** Use a sticky container pattern with `useScroll` tracking the tall outer container, map progress to animation phases with `useTransform`, implement SVG path drawing with `pathLength`, and provide static step cards for reduced motion users.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| motion | 12.29.2 | Scroll animation engine | Already installed; useScroll, useTransform, motion.path |
| motion/react | (bundled) | React hooks/components | whileInView, useScroll, useTransform |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @react-three/fiber | 9.5.0 | 3D particle effects | If implementing 3D particles along path (optional) |
| @react-three/drei | 10.7.7 | R3F helpers | View component for 3D viewport placement |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| useScroll + useTransform | GSAP ScrollTrigger | Extra dependency; GSAP has timeline features but Motion already installed |
| SVG pathLength animation | CSS offset-path/offset-distance | CSS approach newer but less browser support; Motion approach more consistent |
| CSS particles | R3F 3D particles | 3D more impressive but heavier; CSS/SVG particles simpler and performant |

**Installation:** No new dependencies required. All needed libraries already installed.

## Architecture Patterns

### Recommended Project Structure
```
components/
├── sections/
│   └── how-it-works/
│       ├── how-it-works-section.tsx    # Main section wrapper (150-200vh container)
│       ├── scroll-viewport.tsx         # Sticky 100vh viewport
│       ├── payment-flow-animation.tsx  # SVG-based animation content
│       ├── payment-flow-static.tsx     # Static fallback for reduced motion
│       ├── progress-dots.tsx           # Clickable navigation dots
│       └── step-content.tsx            # Text content for each step
lib/
├── animation-variants.ts               # Extend with scroll animation presets
└── payment-flow-path.ts               # SVG path definitions (optional)
```

### Pattern 1: Tall Container with Sticky Viewport

**What:** A tall outer container (150-200vh) with a 100vh sticky child that pins while scrolling. Animations progress as user scrolls through the outer container.

**When to use:** For scroll-linked animations that need extended scroll distance for smooth progression.

**Example:**
```typescript
// components/sections/how-it-works/how-it-works-section.tsx
'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useReducedMotion } from 'motion/react'

export function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // If reduced motion, render static version
  if (prefersReducedMotion) {
    return <HowItWorksStatic />
  }

  return (
    <section
      ref={containerRef}
      className="relative h-[175vh]" // 175vh scroll distance
    >
      {/* Sticky viewport that pins during scroll */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <PaymentFlowAnimation progress={scrollYProgress} />
        <ProgressDots progress={scrollYProgress} containerRef={containerRef} />
      </div>
    </section>
  )
}
```

### Pattern 2: useTransform for Multi-Phase Animation

**What:** Map scroll progress ranges to different animation phases using useTransform with input/output arrays.

**When to use:** When animation has distinct phases (card swipe 0-0.3, particles 0.3-0.7, split 0.7-1.0).

**Example:**
```typescript
// components/sections/how-it-works/payment-flow-animation.tsx
'use client'

import { motion, useTransform, MotionValue } from 'motion/react'

interface Props {
  progress: MotionValue<number>
}

export function PaymentFlowAnimation({ progress }: Props) {
  // Phase 1: Card swipe (0% - 33% scroll)
  const cardX = useTransform(progress, [0, 0.33], [100, 0])
  const cardOpacity = useTransform(progress, [0, 0.1], [0, 1])

  // Phase 2: Particles along path (33% - 67% scroll)
  const pathLength = useTransform(progress, [0.33, 0.67], [0, 1])

  // Phase 3: Split animation (67% - 100% scroll)
  const achY = useTransform(progress, [0.67, 1], [0, -50])
  const rewardsY = useTransform(progress, [0.67, 1], [0, 50])

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Card swipe */}
      <motion.div
        style={{ x: cardX, opacity: cardOpacity }}
        className="absolute"
      >
        <CreditCardVisual />
      </motion.div>

      {/* SVG path with particles */}
      <motion.svg viewBox="0 0 400 200" className="absolute w-full max-w-lg">
        <motion.path
          d="M50,100 C100,50 150,150 200,100 C250,50 300,150 350,100"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ pathLength }}
        />
      </motion.svg>

      {/* Split destinations */}
      <motion.div style={{ y: achY }} className="absolute top-0">
        ACH Transfer
      </motion.div>
      <motion.div style={{ y: rewardsY }} className="absolute bottom-0">
        Rewards
      </motion.div>
    </div>
  )
}
```

### Pattern 3: SVG Path Drawing with pathLength

**What:** Animate SVG path drawing using Motion's `pathLength` style property.

**When to use:** For visualizing flow paths, progress indicators, connection lines.

**Example:**
```typescript
// SVG path animation with scroll-linked progress
import { motion, useTransform, MotionValue } from 'motion/react'

interface FlowPathProps {
  progress: MotionValue<number>
  pathData: string
}

export function FlowPath({ progress, pathData }: FlowPathProps) {
  // Map scroll progress to path drawing
  const pathLength = useTransform(progress, [0.2, 0.8], [0, 1])

  return (
    <motion.svg
      viewBox="0 0 400 200"
      className="w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Background path (faint) */}
      <path
        d={pathData}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.1"
      />

      {/* Animated path */}
      <motion.path
        d={pathData}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        style={{ pathLength }}
        strokeLinecap="round"
      />
    </motion.svg>
  )
}
```

### Pattern 4: Clickable Progress Dots with scrollTo

**What:** Navigation dots showing current scroll progress, clickable to jump to steps.

**When to use:** For long scroll sections where users may want to jump to specific steps.

**Example:**
```typescript
// components/sections/how-it-works/progress-dots.tsx
'use client'

import { motion, useTransform, MotionValue } from 'motion/react'

interface Props {
  progress: MotionValue<number>
  containerRef: React.RefObject<HTMLElement>
}

const steps = [
  { label: 'Swipe Card', position: 0 },
  { label: 'Process Payment', position: 0.33 },
  { label: 'Split Funds', position: 0.67 },
  { label: 'Complete', position: 1 },
]

export function ProgressDots({ progress, containerRef }: Props) {
  const handleStepClick = (stepProgress: number) => {
    if (!containerRef.current) return

    const container = containerRef.current
    const containerRect = container.getBoundingClientRect()
    const scrollableHeight = container.scrollHeight - window.innerHeight

    // Calculate scroll position for this progress
    const targetScroll = container.offsetTop + (scrollableHeight * stepProgress)

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    })
  }

  return (
    <nav className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3">
      {steps.map((step, i) => (
        <ProgressDot
          key={step.label}
          step={step}
          progress={progress}
          onClick={() => handleStepClick(step.position)}
        />
      ))}
    </nav>
  )
}

function ProgressDot({
  step,
  progress,
  onClick
}: {
  step: typeof steps[0]
  progress: MotionValue<number>
  onClick: () => void
}) {
  // Determine if this step is active
  const opacity = useTransform(
    progress,
    [step.position - 0.1, step.position, step.position + 0.1],
    [0.3, 1, 0.3]
  )
  const scale = useTransform(
    progress,
    [step.position - 0.1, step.position, step.position + 0.1],
    [1, 1.5, 1]
  )

  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-2"
      aria-label={`Go to ${step.label}`}
    >
      <motion.div
        style={{ opacity, scale }}
        className="w-3 h-3 rounded-full bg-primary"
      />
      <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity">
        {step.label}
      </span>
    </button>
  )
}
```

### Pattern 5: Static Fallback for Reduced Motion

**What:** Replace scroll-linked animation with static step cards for accessibility.

**When to use:** When `prefers-reduced-motion: reduce` is detected.

**Example:**
```typescript
// components/sections/how-it-works/how-it-works-static.tsx
'use client'

import { motion } from 'motion/react'

const steps = [
  {
    number: 1,
    title: 'Swipe Your Card',
    description: 'Use your Omni card for any purchase',
    icon: CreditCardIcon
  },
  {
    number: 2,
    title: 'Payment Processes',
    description: 'Transaction flows through secure network',
    icon: ArrowPathIcon
  },
  {
    number: 3,
    title: 'Funds Split Automatically',
    description: 'ACH to school, rewards to you',
    icon: ArrowsPointingOutIcon
  },
]

export function HowItWorksStatic() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          How It Works
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-card border"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <step.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">
                Step {step.number}
              </span>
              <h3 className="text-xl font-semibold mt-1">
                {step.title}
              </h3>
              <p className="text-muted-foreground mt-2">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### Pattern 6: Particles Along Path (CSS Approach)

**What:** Animate particles using CSS `offset-path` and `offset-distance` properties.

**When to use:** For lightweight particle effects without 3D overhead.

**Example:**
```typescript
// CSS-based particle animation along SVG path
'use client'

import { motion, useTransform, MotionValue } from 'motion/react'

interface ParticleProps {
  progress: MotionValue<number>
  pathData: string
  count?: number
}

export function PathParticles({ progress, pathData, count = 5 }: ParticleProps) {
  return (
    <div className="relative w-full h-full">
      {Array.from({ length: count }).map((_, i) => (
        <Particle
          key={i}
          progress={progress}
          pathData={pathData}
          delay={i * 0.1} // Stagger particles
        />
      ))}
    </div>
  )
}

function Particle({
  progress,
  pathData,
  delay
}: {
  progress: MotionValue<number>
  pathData: string
  delay: number
}) {
  // Map scroll progress to path distance (0% - 100%)
  const offsetDistance = useTransform(
    progress,
    [0.33 + delay, 0.67 + delay],
    ['0%', '100%']
  )

  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full bg-primary"
      style={{
        offsetPath: `path('${pathData}')`,
        offsetDistance,
        offsetRotate: 'auto',
      }}
    />
  )
}
```

### Anti-Patterns to Avoid

- **Animating during reduced motion:** Never ignore `prefers-reduced-motion`. Use `useReducedMotion()` hook to conditionally render static content.
- **Using scroll event listeners:** Use `useScroll` hook instead; it uses native `scrollProgress` motion value off main thread.
- **Multiple tall containers on one page:** Can confuse users; limit to one scroll-locked section per page.
- **Not providing scroll distance feedback:** Without progress dots, users may not know scroll affects animation.
- **Abrupt phase transitions:** Use overlapping useTransform ranges for smooth blending between phases.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll progress tracking | Custom scroll listeners | `useScroll` hook | Off-main-thread, motion value integration |
| Progress-to-value mapping | Manual calculations | `useTransform` hook | Handles ranges, interpolation, memoization |
| SVG path drawing | Custom strokeDasharray | `pathLength` style | Motion handles SVG animation natively |
| Reduced motion detection | `matchMedia` listener | `useReducedMotion` hook | React-friendly, auto-cleanup |
| Smooth scroll-to | Custom easing functions | `window.scrollTo({ behavior: 'smooth' })` | Native, respects user preferences |

**Key insight:** Motion's scroll hooks use the ScrollTimeline API where available, providing hardware-accelerated animations without JavaScript calculations on each frame.

## Common Pitfalls

### Pitfall 1: Scroll Jank on Mobile

**What goes wrong:** Animation stutters on iOS Safari or Android Chrome
**Why it happens:** Too many animated elements, non-GPU properties, or expensive transforms
**How to avoid:**
- Animate only `transform` and `opacity`
- Limit simultaneous animated elements to 10-15
- Use `will-change: transform` sparingly (motion handles this)
- Test on real mobile devices
**Warning signs:** DevTools Performance shows long paint times; visible stutter

### Pitfall 2: Reduced Motion Ignored

**What goes wrong:** Users with vestibular disorders experience discomfort
**Why it happens:** Forgot to implement fallback or used only CSS animations
**How to avoid:**
- Always call `useReducedMotion()` at component level
- Render completely different component for reduced motion (static cards)
- Don't just slow down animations; provide truly static alternative
**Warning signs:** Animation plays with "Reduce motion" enabled in OS settings

### Pitfall 3: Progress Dots Not Clickable on Mobile

**What goes wrong:** Dots work on desktop but not on touch devices
**Why it happens:** Dots too small, no touch padding, or interfering with scroll gestures
**How to avoid:**
- Minimum 44x44px touch target (use padding around visual dot)
- Add `touch-action: manipulation` to prevent double-tap zoom delay
- Test click handlers on real touch devices
**Warning signs:** Touch events don't fire, or require multiple taps

### Pitfall 4: Scroll Position Drift After scrollTo

**What goes wrong:** After clicking a progress dot, position drifts or animation doesn't match expected state
**Why it happens:** Scroll position calculation doesn't account for sticky element height or container offset
**How to avoid:**
- Calculate scroll position relative to container's offsetTop
- Account for sticky element being 100vh
- Use `offsetTop` + `scrollHeight - viewportHeight` for range
**Warning signs:** Clicking dots lands at wrong animation phase

### Pitfall 5: Animation Doesn't Complete at Bottom

**What goes wrong:** User scrolls to bottom but animation shows 95% progress
**Why it happens:** Offset configuration wrong; "end end" means end of target meets end of viewport
**How to avoid:**
```typescript
// Correct offset for full progress
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start start", "end end"] // start-start to end-end
})
```
**Warning signs:** Animation never reaches final state even at scroll bottom

### Pitfall 6: Content Inaccessible Without Scroll

**What goes wrong:** Screen reader users or keyboard-only users can't access step information
**Why it happens:** All content hidden until scroll reveals it
**How to avoid:**
- Ensure step text is in the DOM (use opacity, not conditional rendering)
- Add ARIA live regions for step changes
- Make progress dots keyboard-focusable with clear labels
**Warning signs:** Screen readers announce nothing, Tab key skips section

## Code Examples

Verified patterns from official sources:

### Complete useScroll Setup for Tall Container
```typescript
// Source: motion.dev/docs/react-use-scroll
import { useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

function ScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // "start start" = target's start meets viewport's start
    // "end end" = target's end meets viewport's end
    offset: ["start start", "end end"]
  })

  // scrollYProgress is 0 at container top, 1 at container bottom
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])

  return (
    <section ref={containerRef} style={{ height: '175vh' }}>
      {/* content */}
    </section>
  )
}
```

### Multi-Phase Animation with useTransform
```typescript
// Source: motion.dev/docs/react-use-transform
import { useTransform, MotionValue } from 'motion/react'

function useAnimationPhases(progress: MotionValue<number>) {
  // Phase 1: 0% - 33%
  const phase1Progress = useTransform(progress, [0, 0.33], [0, 1])
  const phase1X = useTransform(phase1Progress, [0, 1], [100, 0])
  const phase1Opacity = useTransform(phase1Progress, [0, 0.3, 1], [0, 1, 1])

  // Phase 2: 33% - 67%
  const phase2Progress = useTransform(progress, [0.33, 0.67], [0, 1])
  const pathLength = useTransform(phase2Progress, [0, 1], [0, 1])

  // Phase 3: 67% - 100%
  const phase3Progress = useTransform(progress, [0.67, 1], [0, 1])
  const splitY = useTransform(phase3Progress, [0, 1], [0, 80])

  return {
    phase1: { x: phase1X, opacity: phase1Opacity },
    phase2: { pathLength },
    phase3: { splitY },
  }
}
```

### SVG Path Animation
```typescript
// Source: motion.dev/docs/react-svg-animation, dev.to/heres scroll SVG path tutorial
import { motion, useTransform, MotionValue } from 'motion/react'

interface PaymentFlowPathProps {
  progress: MotionValue<number>
}

export function PaymentFlowPath({ progress }: PaymentFlowPathProps) {
  const pathLength = useTransform(progress, [0.25, 0.75], [0, 1])

  // Payment flow path: card -> split to ACH and rewards
  const flowPath = `
    M 50 100
    C 100 100, 150 100, 200 100
    L 200 100
    C 250 100, 300 60, 350 40
    M 200 100
    C 250 100, 300 140, 350 160
  `

  return (
    <motion.svg
      viewBox="0 0 400 200"
      className="w-full max-w-lg"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Background trace */}
      <path
        d={flowPath}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.1"
      />

      {/* Animated path */}
      <motion.path
        d={flowPath}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        style={{ pathLength }}
        strokeLinecap="round"
      />
    </motion.svg>
  )
}
```

### useReducedMotion with Fallback
```typescript
// Source: motion.dev/docs/react-use-reduced-motion
import { useReducedMotion } from 'motion/react'

export function HowItWorksSection() {
  const prefersReducedMotion = useReducedMotion()

  // Render completely different component for reduced motion
  if (prefersReducedMotion) {
    return <HowItWorksStatic />
  }

  return <HowItWorksAnimated />
}
```

### Scroll-To with Position Calculation
```typescript
// Source: Native scrollTo API with calculated position
function scrollToStep(
  containerRef: React.RefObject<HTMLElement>,
  stepProgress: number
) {
  if (!containerRef.current) return

  const container = containerRef.current
  const scrollableDistance = container.scrollHeight - window.innerHeight
  const targetScrollTop = container.offsetTop + (scrollableDistance * stepProgress)

  window.scrollTo({
    top: targetScrollTop,
    behavior: 'smooth'
  })
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Scroll event + requestAnimationFrame | useScroll hook + motion values | Motion v5+ | Off-main-thread scroll tracking |
| framer-motion package | motion package | 2024 | Same API, new package name |
| Manual Intersection Observer | whileInView prop | Motion v10+ | Simpler API for triggered animations |
| GSAP ScrollTrigger for React | Motion useScroll + sticky | 2024-2025 | Native React, no extra dependency |
| CSS scroll-snap | Tall container + sticky | 2024 | More control over animation progress |

**Deprecated/outdated:**
- `framer-motion` package name: Now just `motion` (already using correct package)
- Manual scroll listeners: Use `useScroll` instead
- CSS `scroll-behavior: smooth` for programmatic scrolling: Still works but `window.scrollTo({ behavior: 'smooth' })` is more controllable

## Open Questions

Things that couldn't be fully resolved:

1. **Optimal container height for smooth animation**
   - What we know: 150-200vh recommended; longer = slower animation, shorter = faster
   - What's unclear: Best height for this specific 3-phase animation
   - Recommendation: Start with 175vh, test user experience, adjust if phases feel too fast/slow

2. **2D SVG particles vs 3D R3F particles**
   - What we know: Project has R3F infrastructure; CSS offset-path works for 2D
   - What's unclear: Which approach looks better for payment flow visualization
   - Recommendation: Start with 2D SVG/CSS particles; upgrade to 3D only if visual impact insufficient

3. **Progress dots visibility on mobile**
   - What we know: Common pattern is fixed right-side navigation
   - What's unclear: Whether dots should be visible or hidden by default on mobile
   - Recommendation: Hide dots on mobile (show on md:), rely on scroll for progress

## Sources

### Primary (HIGH confidence)
- [Motion useScroll Documentation](https://motion.dev/docs/react-use-scroll) - Hook API, offset syntax, container tracking
- [Motion Scroll Animations Guide](https://motion.dev/docs/react-scroll-animations) - Scroll-linked vs triggered, best practices
- [Motion SVG Animation](https://motion.dev/docs/react-svg-animation) - pathLength, line drawing, motion.path

### Secondary (MEDIUM confidence)
- [DEV.to - Scroll SVG Path with Framer Motion](https://dev.to/heres/scroll-svg-path-with-framer-motion-54el) - Complete SVG path scroll animation example
- [DEV.to - Beautiful Scroll Animations](https://dev.to/shivamkatare/create-beautiful-scroll-animations-using-framer-motion-1a7b) - useScroll + useTransform patterns
- [Codrops - Infinite Marquee Along SVG Path](https://tympanus.net/codrops/2025/06/17/building-an-infinite-marquee-along-an-svg-path-with-react-motion/) - CSS offset-path technique
- [Pope Tech - Accessible Animation](https://blog.pope.tech/2025/12/08/design-accessible-animation-and-movement/) - Reduced motion fallback patterns

### Tertiary (Project-specific)
- Existing `motion@12.29.2` installation in package.json
- Existing `MotionConfig reducedMotion="user"` in components/providers.tsx
- Existing `ScrollReveal` component and animation-variants.ts
- Existing R3F infrastructure with View.Port pattern

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Motion already installed, patterns well-documented
- Architecture (sticky container): HIGH - Established pattern, official documentation
- Architecture (SVG path): HIGH - Official motion.dev examples
- Architecture (particles): MEDIUM - Multiple approaches, CSS vs 3D trade-offs
- Pitfalls: HIGH - Well-documented in accessibility guides
- Reduced motion fallback: HIGH - Clear guidance from official sources

**Research date:** 2026-02-02
**Valid until:** 2026-04-02 (60 days - stable library, established patterns)
