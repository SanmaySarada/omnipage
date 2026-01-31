# Architecture Patterns

**Project:** Omni Card Premium Landing Page
**Domain:** Fintech marketing landing page with 3D graphics and complex animations
**Researched:** 2026-01-31
**Confidence:** HIGH (verified with official documentation)

---

## Recommended Architecture

### High-Level System Diagram

```
src/
├── app/                          # Next.js App Router (Server Components by default)
│   ├── layout.tsx               # Root layout with providers, fonts, metadata
│   ├── page.tsx                 # Landing page composition (Server Component)
│   ├── loading.tsx              # Suspense fallback
│   └── globals.css              # Tailwind + CSS variables (design tokens)
│
├── components/
│   ├── ui/                      # shadcn/ui primitives (Buttons, Tabs, Accordions)
│   ├── sections/                # Page sections (Hero, Features, Calculator, etc.)
│   ├── three/                   # R3F components (3D Card, Scene, Materials)
│   ├── animations/              # Framer Motion wrappers (ScrollReveal, etc.)
│   └── layout/                  # Header, Footer, Navigation
│
├── lib/
│   ├── utils.ts                 # cn() helper, formatters
│   └── constants.ts             # Calculator defaults, animation configs
│
├── hooks/
│   ├── use-calculator.ts        # Calculator state logic (useReducer)
│   ├── use-scroll-progress.ts   # Scroll tracking wrapper
│   └── use-media-query.ts       # Responsive breakpoints
│
└── providers/
    └── client-providers.tsx     # Theme, R3F context (Client Component boundary)
```

### Architecture Principles

1. **Server Components by Default** - All section containers are Server Components
2. **Client Islands** - Interactive components marked with `'use client'` only where needed
3. **Single Canvas Pattern** - One R3F Canvas with Drei `<View>` for multiple 3D scenes
4. **Centralized Animation Config** - Shared animation variants in constants
5. **Design Token Foundation** - CSS variables for theming, consumed by Tailwind and R3F

---

## Component Boundaries

### Server vs Client Component Split

| Component | Type | Rationale |
|-----------|------|-----------|
| `app/page.tsx` | Server | Composition only, no interactivity |
| `app/layout.tsx` | Server | Providers wrap children pattern |
| `sections/Hero.tsx` | Server | Container, passes props to 3D |
| `sections/Calculator.tsx` | **Client** | State, sliders, real-time updates |
| `sections/Features.tsx` | Server | Static content with client islands |
| `ui/Button.tsx` | **Client** | onClick handlers, magnetic hover |
| `ui/Tabs.tsx` | **Client** | shadcn/ui requires client hooks |
| `three/Scene.tsx` | **Client** | R3F Canvas requires browser APIs |
| `three/Card3D.tsx` | **Client** | useFrame, cursor tracking |
| `animations/ScrollReveal.tsx` | **Client** | useInView, motion components |

**Key Pattern:** Server Component contains Client Components as children/props:

```tsx
// app/page.tsx (Server Component)
import { HeroSection } from '@/components/sections/hero'
import { Scene3D } from '@/components/three/scene'

export default function Page() {
  return (
    <main>
      <HeroSection>
        <Scene3D /> {/* Client island */}
      </HeroSection>
    </main>
  )
}
```

### Component Communication Map

```
┌─────────────────────────────────────────────────────────────┐
│ app/layout.tsx (Server)                                     │
│   └─ providers/client-providers.tsx (Client)                │
│       ├─ ThemeProvider                                      │
│       └─ children (page content)                            │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────▼───────────────────────────────┐
│ app/page.tsx (Server) - Composition Root                    │
│   ├─ sections/Hero         ← contains → three/Scene3D       │
│   ├─ sections/ScrollSection ← contains → animations/Particle │
│   ├─ sections/Calculator   ← self-contained state           │
│   ├─ sections/Features     ← contains → ui/Tabs, ui/Cards   │
│   └─ Canvas (single)       ← renders → View.Port (all 3D)   │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Flow

### Calculator State Flow

The interactive calculator is the most stateful component. Use `useReducer` for predictable state transitions:

```tsx
// hooks/use-calculator.ts
type CalculatorState = {
  monthlySpend: number
  cashbackRate: number
  results: {
    monthlyCashback: number
    yearlyCashback: number
    lifetimeSavings: number
  }
}

type Action =
  | { type: 'SET_SPEND'; payload: number }
  | { type: 'SET_RATE'; payload: number }
  | { type: 'CALCULATE' }

function calculatorReducer(state: CalculatorState, action: Action): CalculatorState {
  switch (action.type) {
    case 'SET_SPEND':
      return { ...state, monthlySpend: action.payload }
    case 'SET_RATE':
      return { ...state, cashbackRate: action.payload }
    case 'CALCULATE':
      return {
        ...state,
        results: computeResults(state.monthlySpend, state.cashbackRate)
      }
    default:
      return state
  }
}
```

**Data Flow Direction:**

```
Slider Input → dispatch(SET_SPEND) → Reducer → New State → UI Re-render
                                                    ↓
                                           Odometer counters animate to new values
```

### 3D Scene Data Flow

Cursor position flows from DOM → R3F via ref or motion value:

```tsx
// Pattern: Pointer tracking for 3D card
const [pointer, setPointer] = useState({ x: 0, y: 0 })

// DOM event (client component)
<div onMouseMove={(e) => {
  const rect = e.currentTarget.getBoundingClientRect()
  setPointer({
    x: (e.clientX - rect.left) / rect.width * 2 - 1,
    y: -(e.clientY - rect.top) / rect.height * 2 + 1
  })
}}>
  <View>
    <Card3D pointer={pointer} />
  </View>
</div>

// R3F component
function Card3D({ pointer }: { pointer: { x: number; y: number } }) {
  const meshRef = useRef<Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        pointer.x * 0.3,
        0.1
      )
    }
  })

  return <mesh ref={meshRef}>...</mesh>
}
```

### Scroll Animation Data Flow

Framer Motion's `useScroll` provides motion values that drive animations:

```tsx
// Scroll-linked particle animation
function ScrollSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]  // track through full viewport
  })

  // Transform scroll (0-1) to animation progress
  const pathProgress = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section ref={containerRef}>
      <SVGPath />
      <motion.div style={{ offsetPath: 'path(...)', offsetDistance: pathProgress }} />
    </section>
  )
}
```

---

## React Three Fiber Architecture

### Single Canvas with View Pattern

**Critical:** Do NOT create multiple `<Canvas>` elements. The browser limits WebGL contexts to 8-10, and multiple canvases prevent resource sharing.

```tsx
// components/three/scene.tsx
'use client'

import { Canvas } from '@react-three/fiber'
import { View } from '@react-three/drei'

export function Scene3D({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Canvas
        className="!fixed inset-0 -z-10 pointer-events-none"
        eventSource={document.body}
        frameloop="demand"  // Only render when needed
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <View.Port />
      </Canvas>
    </>
  )
}
```

**Usage in sections:**

```tsx
// sections/hero.tsx (Server Component shell)
import { HeroContent } from './hero-content'
import { Card3DView } from '@/components/three/card-3d-view'

export function HeroSection() {
  return (
    <section className="relative min-h-screen">
      <HeroContent />
      <Card3DView />  {/* Uses <View> internally */}
    </section>
  )
}

// components/three/card-3d-view.tsx (Client Component)
'use client'

import { View } from '@react-three/drei'
import { Card3D } from './card-3d'

export function Card3DView() {
  return (
    <View className="absolute inset-0">
      <ambientLight intensity={0.5} />
      <Card3D />
    </View>
  )
}
```

### R3F Component Structure

```
components/three/
├── scene.tsx              # Canvas + View.Port wrapper
├── card-3d-view.tsx       # View container for hero card
├── card-3d.tsx            # The actual 3D card mesh + materials
├── materials/
│   ├── metallic.tsx       # PBR metallic material
│   └── holographic.tsx    # Custom holographic shader
├── environment.tsx        # Lighting, HDRI, shadows
└── effects.tsx            # Post-processing (bloom, etc.)
```

### Dynamic Import for R3F (Code Splitting)

R3F adds ~150KB+ to bundle. Lazy load entire 3D scenes:

```tsx
// components/three/scene.tsx
'use client'

import dynamic from 'next/dynamic'

const Canvas3D = dynamic(
  () => import('./canvas-impl').then(mod => mod.Canvas3DImpl),
  {
    ssr: false,  // R3F requires browser APIs
    loading: () => <div className="animate-pulse bg-muted h-full" />
  }
)

export function Scene3D(props: Props) {
  return <Canvas3D {...props} />
}
```

---

## Animation Architecture

### Centralized Animation Variants

Define reusable variants in constants:

```tsx
// lib/animation-variants.ts
import type { Variants } from 'framer-motion'

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

export const cardHover: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: 0.3 } }
}
```

### Reusable Animation Components

Create thin wrappers for common patterns:

```tsx
// components/animations/scroll-reveal.tsx
'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { fadeInUp } from '@/lib/animation-variants'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function ScrollReveal({ children, className, delay = 0 }: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

### Animation Component Map

| Animation Type | Component | Hook/API |
|---------------|-----------|----------|
| Entrance on scroll | `ScrollReveal` | `useInView` + variants |
| Scroll-linked progress | `ScrollProgress` | `useScroll` + `useTransform` |
| Hover interactions | Per-component | `whileHover` prop |
| Number counting | `OdometerValue` | `useSpring` or `animate` |
| Magnetic buttons | `MagneticButton` | `useMotionValue` + transforms |
| Page transitions | Layout wrapper | `AnimatePresence` |

---

## Design System Setup

### CSS Variables (Design Tokens)

shadcn/ui uses CSS variables for theming. Define in `globals.css`:

```css
@layer base {
  :root {
    /* Colors - OKLCH for better gradients */
    --background: oklch(0.99 0 0);
    --foreground: oklch(0.13 0 0);
    --primary: oklch(0.55 0.2 260);       /* Brand purple */
    --primary-foreground: oklch(0.99 0 0);

    /* Semantic colors */
    --success: oklch(0.72 0.19 142);
    --warning: oklch(0.84 0.16 84);
    --destructive: oklch(0.63 0.24 25);

    /* Surfaces */
    --card: oklch(0.99 0 0);
    --card-foreground: oklch(0.13 0 0);
    --muted: oklch(0.96 0 0);
    --muted-foreground: oklch(0.55 0 0);

    /* Spacing scale */
    --space-1: 0.25rem;
    --space-2: 0.5rem;
    --space-3: 0.75rem;
    --space-4: 1rem;
    --space-6: 1.5rem;
    --space-8: 2rem;
    --space-12: 3rem;
    --space-16: 4rem;

    /* Animation tokens */
    --duration-fast: 150ms;
    --duration-normal: 300ms;
    --duration-slow: 500ms;
    --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
    --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);

    /* 3D-specific */
    --card-metalness: 0.9;
    --card-roughness: 0.1;
    --hologram-color: oklch(0.7 0.15 200);
  }

  .dark {
    --background: oklch(0.13 0 0);
    --foreground: oklch(0.99 0 0);
    /* ... dark overrides */
  }
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  /* ... expose all as Tailwind utilities */
}
```

### Tailwind Config Integration

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        // ... all semantic colors
      },
      animation: {
        'fade-in': 'fade-in var(--duration-normal) var(--ease-out-expo)',
        'slide-up': 'slide-up var(--duration-normal) var(--ease-out-expo)',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' }
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        }
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
} satisfies Config
```

---

## Code Splitting Strategy

### Bundle Analysis by Component

| Component | Approx Size | Strategy |
|-----------|-------------|----------|
| React Three Fiber | ~150KB | Dynamic import, `ssr: false` |
| Drei helpers | ~50KB | Tree-shake, import specific |
| Framer Motion | ~40KB | Import from `motion/react` |
| shadcn/ui | ~5KB each | Copy components, tree-shakes |
| Calculator logic | ~2KB | Inline, no splitting needed |

### Dynamic Import Pattern

```tsx
// components/three/lazy-scene.tsx
'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Scene3D = dynamic(() => import('./scene'), { ssr: false })

export function LazyScene3D() {
  return (
    <Suspense fallback={<SceneSkeleton />}>
      <Scene3D />
    </Suspense>
  )
}

function SceneSkeleton() {
  return (
    <div className="w-full aspect-video bg-gradient-to-br from-muted to-muted/50 animate-pulse rounded-lg" />
  )
}
```

### Intersection Observer for Heavy Components

Load 3D/heavy components only when approaching viewport:

```tsx
'use client'

import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./heavy'), { ssr: false })

export function LazyOnScroll() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '200px' })
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    if (isInView) setShouldLoad(true)
  }, [isInView])

  return (
    <div ref={ref}>
      {shouldLoad ? <HeavyComponent /> : <Placeholder />}
    </div>
  )
}
```

---

## Suggested Build Order

Based on dependencies, build in this order:

### Phase 1: Foundation (No dependencies)
1. **Design tokens** (`globals.css`, CSS variables)
2. **Tailwind config** (theme extension)
3. **shadcn/ui setup** (`npx shadcn@latest init`)
4. **Base layout** (`app/layout.tsx`, fonts, metadata)

### Phase 2: Static UI Components
5. **Typography components** (headings, text styles)
6. **Button variants** (primary, secondary, ghost)
7. **Card components** (feature cards, pricing cards)
8. **Section containers** (with consistent spacing)

### Phase 3: Animation Layer
9. **ScrollReveal wrapper** (reusable entrance animations)
10. **Animation variants** (centralized in constants)
11. **Framer Motion integration** (test with static content)

### Phase 4: 3D Infrastructure
12. **Canvas setup** (single canvas, View.Port)
13. **Dynamic import wrapper** (ssr: false)
14. **Basic 3D primitive** (test cube with rotation)
15. **Environment/lighting** (HDRI, shadows)

### Phase 5: 3D Card (Hero)
16. **Card geometry** (rounded rectangle, credit card proportions)
17. **Metallic PBR material** (roughness, metalness)
18. **Cursor tracking** (DOM → R3F data flow)
19. **Holographic shader** (optional enhancement)

### Phase 6: Interactive Features
20. **Calculator state** (`useReducer` setup)
21. **Slider components** (shadcn/ui Slider)
22. **Odometer counters** (animated number display)
23. **Tab switcher** (shadcn/ui Tabs)
24. **Accordion FAQ** (shadcn/ui Accordion)

### Phase 7: Scroll Section
25. **Sticky container** (CSS position: sticky)
26. **SVG path** (particle trajectory)
27. **Scroll-linked progress** (`useScroll` + `useTransform`)
28. **Particle animation** (along path)

### Phase 8: Polish
29. **Magnetic hover buttons**
30. **Gradient mesh background**
31. **Loading states** (skeletons, suspense)
32. **Performance audit** (Lighthouse, bundle analysis)

---

## Dependency Graph

```
Design Tokens
     │
     ├─────────────────────────────────────┐
     ▼                                     ▼
Tailwind Config                    shadcn/ui Components
     │                                     │
     └──────────────┬──────────────────────┘
                    ▼
              Base Layout
                    │
     ┌──────────────┼──────────────┐
     ▼              ▼              ▼
Static Sections  Animation     3D Canvas
     │           Variants      (R3F Setup)
     │              │              │
     └──────────────┴──────────────┘
                    │
     ┌──────────────┼──────────────┐
     ▼              ▼              ▼
Calculator      3D Card       Scroll Section
(useReducer)   (Materials)   (useScroll)
     │              │              │
     └──────────────┴──────────────┘
                    ▼
              Polish & Perf
```

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Multiple Canvas Elements
**What:** Creating a new `<Canvas>` for each 3D element
**Why bad:** Browser limits WebGL contexts to 8-10; causes memory leaks, breaks resource sharing
**Instead:** Use single Canvas with Drei `<View>` components

### Anti-Pattern 2: R3F in Server Components
**What:** Importing R3F components without `'use client'`
**Why bad:** Build fails - R3F requires browser APIs (WebGL, window)
**Instead:** Always use `'use client'` and `dynamic(() => ..., { ssr: false })`

### Anti-Pattern 3: Inline Animation Configs
**What:** Defining animation variants inside each component
**Why bad:** Inconsistent timing, hard to maintain, larger bundle
**Instead:** Centralize variants in `lib/animation-variants.ts`

### Anti-Pattern 4: Full-Page Client Components
**What:** Adding `'use client'` to page.tsx or layout.tsx
**Why bad:** Loses all SSR benefits, larger JS bundle
**Instead:** Keep pages as Server Components, client islands only where needed

### Anti-Pattern 5: Uncontrolled Re-renders in R3F
**What:** State changes in parent causing entire scene re-render
**Why bad:** 60fps becomes 10fps, dropped frames
**Instead:** Use refs, `useFrame` for animations, isolate state updates

### Anti-Pattern 6: Importing Entire Drei
**What:** `import * as drei from '@react-three/drei'`
**Why bad:** Imports all 100+ helpers (~200KB)
**Instead:** Named imports: `import { View, OrbitControls } from '@react-three/drei'`

---

## Performance Considerations

| Concern | At Launch | At Scale |
|---------|-----------|----------|
| Initial Load | Code-split R3F, defer below fold | CDN, preload critical |
| 3D Performance | frameloop="demand", single canvas | LOD models, instancing |
| Animation Jank | GPU-accelerated transforms only | Reduce simultaneous animations |
| Bundle Size | Tree-shake, analyze with `@next/bundle-analyzer` | Split by route |
| Mobile | Reduce particle count, simpler materials | Detect capability, fallback |

---

## Sources

**Official Documentation (HIGH confidence):**
- [Next.js Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [React Three Fiber Canvas API](https://r3f.docs.pmnd.rs/api/canvas)
- [Drei View Component](https://drei.docs.pmnd.rs/portals/view)
- [Motion (Framer Motion) Documentation](https://motion.dev/)

**Architecture Patterns (MEDIUM confidence):**
- [Next.js App Router Best Practices](https://medium.com/better-dev-nextjs-react/inside-the-app-router-best-practices-for-next-js-file-and-directory-structure-2025-edition-ed6bc14a8da3)
- [React Three Fiber Architecture Discussion](https://github.com/pmndrs/react-three-fiber/discussions/3221)
- [shadcn/ui Theming](https://ui.shadcn.com/docs/theming)

**Implementation Examples (MEDIUM confidence):**
- [Holographic Material for R3F](https://github.com/ektogamat/threejs-holographic-material)
- [Scroll Animations with Framer Motion](https://blog.logrocket.com/react-scroll-animations-framer-motion/)
- [Next.js Dynamic Import Patterns](https://nextjs.org/learn/seo/dynamic-import-components)
