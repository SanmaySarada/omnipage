# Technology Stack

**Project:** Omni Card - Premium Fintech Landing Page
**Researched:** 2026-01-31
**Overall Confidence:** HIGH (versions verified via official sources and npm)

---

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Next.js | 15.5.x | React framework with App Router | Turbopack for fast builds, static export capability, React 19 support. 15.5 is latest stable in the v15 line (16.x released Oct 2025 but 15.5 is battle-tested for landing pages). | HIGH |
| React | 19.2.x | UI library | Latest stable (19.2.3 as of Dec 2025). Required for R3F v9 and Motion v12. Brings useActionState, Activity API. | HIGH |
| TypeScript | 5.x | Type safety | Industry standard, excellent Next.js integration, typed routes in 15.5. | HIGH |

### Styling

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Tailwind CSS | 4.1.x | Utility-first CSS | CSS-first config (no tailwind.config.js needed), 5x faster builds, P3 color palette, container queries. Released Jan 2025, mature by now. | HIGH |
| shadcn/ui | latest | Component primitives | Copy-paste components, Tailwind v4 compatible, Radix primitives for accessibility. Not a versioned dependency - components are owned in your codebase. | HIGH |
| clsx | 2.x | Conditional classes | Standard for conditional className logic. | HIGH |
| tailwind-merge | 2.x | Class conflict resolution | Resolves Tailwind class conflicts (e.g., px-2 vs px-4). Use with clsx in cn() utility. | HIGH |

### Animation

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Motion (framer-motion) | 12.x | UI animations | Renamed from framer-motion. useScroll, useTransform for scroll-linked animations. 14M+ weekly downloads. No breaking changes from v11. | HIGH |

### 3D Graphics

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Three.js | 0.171+ (r171+) | 3D engine | r171+ has zero-config WebGPU with WebGL2 fallback. r182 is latest. | HIGH |
| @react-three/fiber | 9.x | React Three.js renderer | v9 pairs with React 19. Improved Suspense handling, better TypeScript support. | HIGH |
| @react-three/drei | 10.x | R3F helpers | Essential abstractions: Environment, useTexture, Float, MeshReflectorMaterial, etc. v10.7.7 latest. | HIGH |
| @react-three/postprocessing | 3.x | Post-processing effects | EffectComposer, Bloom for holographic shimmer effects. Optimized pass merging. | MEDIUM |

### Development Tools

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| leva | 0.9.x | 3D debug GUI | Real-time parameter tweaking for materials, lights, camera. Dev-only, tree-shakeable. | HIGH |
| ESLint | 9.x | Linting | Next.js 15.5 compatible. | HIGH |
| Prettier | 3.x | Formatting | Code consistency. | HIGH |

### Accessibility

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| @react-three/a11y | 3.0.0 | 3D accessibility | Screen reader support, keyboard navigation for 3D content. Note: Last updated 4 years ago - verify React 19 compatibility. | LOW |

---

## Package Versions Summary

```json
{
  "dependencies": {
    "next": "^15.5.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "three": "^0.171.0",
    "@react-three/fiber": "^9.0.0",
    "@react-three/drei": "^10.0.0",
    "@react-three/postprocessing": "^3.0.0",
    "motion": "^12.0.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "tailwindcss": "^4.1.0",
    "@tailwindcss/postcss": "^4.1.0",
    "@types/three": "^0.171.0",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "leva": "^0.9.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "^15.5.0",
    "prettier": "^3.0.0"
  }
}
```

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not Alternative |
|----------|-------------|-------------|---------------------|
| Framework | Next.js 15.5 | Astro, Remix | Next.js has best R3F ecosystem support, Turbopack performance, Vercel deployment story. Astro's islands architecture complicates R3F integration. |
| Animation | Motion v12 | GSAP, anime.js | Motion has native React integration, hooks API (useScroll/useTransform), smaller bundle when tree-shaken. GSAP licensing complexity for commercial. |
| 3D | React Three Fiber | vanilla Three.js, Babylon.js | R3F provides React paradigm (components, hooks, Suspense), better DX, pmndrs ecosystem (drei, postprocessing). |
| Styling | Tailwind v4 | CSS Modules, styled-components | Tailwind v4 is faster, CSS-first config, shadcn/ui compatibility. CSS-in-JS adds runtime overhead. |
| Components | shadcn/ui | Radix Themes, Chakra UI | shadcn gives full control (copy-paste), no version lock-in, Tailwind-native. Chakra adds significant bundle size. |
| 3D Helpers | @react-three/drei | Building from scratch | Drei provides battle-tested abstractions (Environment, Float, etc.). Don't reinvent the wheel. |

---

## What NOT to Use

| Technology | Why Avoid |
|------------|-----------|
| framer-motion (old package) | Renamed to "motion". Use `import { motion } from "motion/react"` instead of `import { motion } from "framer-motion"`. |
| Tailwind CSS v3.x | v4 is production-ready (stable since Jan 2025), 5x faster, CSS-first config eliminates tailwind.config.js complexity. |
| Next.js Pages Router | App Router is the standard for new projects. Server Components, better layouts, streaming. |
| tailwindcss-animate | Incompatible with Tailwind v4. Use tw-animate-css or Motion for animations. |
| react-spring | Motion has better scroll integration and larger community. react-spring is less maintained. |
| Create React App | Deprecated. Use Next.js or Vite. |
| @react-three/fiber v8 | v8 is for React 18. Use v9 for React 19. |
| Three.js < r171 | Older versions require bundler config for WebGPU. r171+ is zero-config. |

---

## Performance Considerations

### Bundle Size Impact

| Package | Approximate Size (gzipped) | Mitigation |
|---------|---------------------------|------------|
| Three.js | ~150KB | Lazy load Canvas component, code-split 3D scene |
| @react-three/fiber | ~45KB | Included with Three.js chunk |
| @react-three/drei | ~varies by import | Import only what you use (tree-shakeable) |
| @react-three/postprocessing | ~30KB | Only load if effects needed |
| Motion | ~18KB (tree-shaken) | Only import used hooks/components |
| Tailwind CSS | ~10KB (purged) | Automatic purging removes unused classes |
| shadcn/ui | ~0KB overhead | Components are in your bundle, not a dep |

### Critical Performance Patterns

**Lazy Loading R3F (CRITICAL for LCP):**
```tsx
// page.tsx - Landing page
import dynamic from 'next/dynamic'

const Card3D = dynamic(() => import('@/components/Card3D'), {
  ssr: false,
  loading: () => <CardPlaceholder />
})
```

**R3F Performance Settings:**
```tsx
<Canvas
  frameloop="demand"  // Only render when needed
  dpr={[1, 1.5]}      // Cap device pixel ratio
  gl={{ antialias: true, alpha: true }}
  performance={{ min: 0.5 }}  // Adaptive performance
>
```

**Motion Tree-Shaking:**
```tsx
// Good - tree-shakeable
import { motion, useScroll, useTransform } from "motion/react"

// Bad - imports everything
import * as Motion from "motion/react"
```

---

## Installation Commands

```bash
# Create Next.js project with TypeScript and Tailwind
npx create-next-app@latest omni-card --typescript --tailwind --eslint --app

# Core dependencies
npm install three @react-three/fiber @react-three/drei motion clsx tailwind-merge

# Optional: Post-processing for bloom/glow effects
npm install @react-three/postprocessing postprocessing

# Dev dependencies
npm install -D @types/three leva

# shadcn/ui initialization
npx shadcn@latest init
npx shadcn@latest add button card tabs accordion slider
```

---

## Configuration Files

### postcss.config.mjs (Tailwind v4)
```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  }
}
```

### globals.css (Tailwind v4)
```css
@import "tailwindcss";

/* Custom theme tokens */
@theme {
  --color-brand: oklch(0.7 0.15 250);
  --font-display: "Inter", sans-serif;
}
```

### next.config.ts
```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['three'], // Required for Next.js < 13.1

  // For static export (optional - if deploying to static host)
  // output: 'export',

  // Enable Turbopack for dev (default in 15.5)
  // turbopack: true,
}

export default nextConfig
```

### lib/utils.ts (cn utility)
```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## Folder Structure Recommendation

```
omni-card/
├── app/
│   ├── layout.tsx          # Root layout with fonts, metadata
│   ├── page.tsx            # Landing page (server component)
│   └── globals.css         # Tailwind imports + theme
├── components/
│   ├── ui/                 # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── 3d/                 # React Three Fiber components
│   │   ├── Card3D.tsx      # Main 3D card component
│   │   ├── Scene.tsx       # Canvas wrapper
│   │   └── materials/      # Custom materials
│   ├── sections/           # Page sections
│   │   ├── Hero.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Calculator.tsx
│   │   └── FAQ.tsx
│   └── ...
├── lib/
│   └── utils.ts            # cn() and other utilities
├── public/
│   ├── textures/           # Card textures, environment maps
│   └── ...
└── ...
```

---

## Sources

### Official Documentation (HIGH confidence)
- [Next.js 15.5 Release](https://nextjs.org/blog/next-15-5)
- [Tailwind CSS v4 Installation](https://tailwindcss.com/docs/installation/using-vite)
- [React Three Fiber Installation](https://r3f.docs.pmnd.rs/getting-started/installation)
- [shadcn/ui Next.js Installation](https://ui.shadcn.com/docs/installation/next)
- [Motion Scroll Animations](https://www.framer.com/motion/scroll-animations/)
- [Motion useTransform](https://www.framer.com/motion/use-transform/)

### GitHub/NPM (HIGH confidence)
- [Next.js Releases](https://github.com/vercel/next.js/releases)
- [React Three Fiber v9 Migration](https://r3f.docs.pmnd.rs/tutorials/v9-migration-guide)
- [Motion Changelog](https://motion.dev/changelog)
- [Three.js Releases](https://github.com/mrdoob/three.js/releases)
- [shadcn/ui Tailwind v4](https://ui.shadcn.com/docs/tailwind-v4)

### Performance & Patterns (MEDIUM confidence)
- [R3F Scaling Performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
- [R3F Performance Pitfalls](https://r3f.docs.pmnd.rs/advanced/pitfalls)
- [React Postprocessing Bloom](https://react-postprocessing.docs.pmnd.rs/effects/bloom)

### Accessibility (LOW confidence - verify before implementing)
- [@react-three/a11y GitHub](https://github.com/pmndrs/react-three-a11y) - Note: Package last updated 4 years ago, may need compatibility testing with React 19

---

## Open Questions for Phase-Specific Research

1. **@react-three/a11y + React 19:** Version 3.0.0 lists React 18 as peer dep. Test compatibility or find alternative accessibility approach for 3D content.

2. **WebGPU vs WebGL:** Three.js r171+ supports WebGPU with WebGL2 fallback. For a landing page, WebGL2 is sufficient and more compatible. Consider explicit WebGLRenderer for predictability.

3. **Tailwind v4 Animation:** tw-animate-css vs Motion for micro-interactions. Motion recommended for scroll-linked, tw-animate-css for simple hover states.
