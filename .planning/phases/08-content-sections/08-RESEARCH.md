# Phase 8: Content Sections - Research

**Researched:** 2026-02-03
**Domain:** Bento grids, animated tabs, accessible focusable cards, content transitions
**Confidence:** HIGH

## Summary

Phase 8 implements three major content sections: Audience Tabs (Students/Parents vs Partner Merchants), Feature Grid (bento layout with 6 cards), and Discovery Preview (phone mockup with map UI). The codebase already has strong foundations in Framer Motion animations, OKLCH color system, and component patterns.

Key finding: The project already uses `motion` (v12.29.2, the rebranded Framer Motion), Radix UI primitives via shadcn, and has established animation variants in `/lib/animation-variants.ts`. The existing `MetricCards` component demonstrates the hover lift pattern needed for feature cards.

**Primary recommendation:** Use Radix UI Tabs (via shadcn) for accessibility, layer Framer Motion `layoutId` for animated underline indicator, and `AnimatePresence` with `mode="wait"` for content crossfade. Build focusable feature cards as interactive elements with proper focus states.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Radix UI Tabs | 1.1.x | Accessible tab infrastructure | WAI-ARIA compliant, keyboard navigation built-in |
| motion | 12.29.2 | Animations (already installed) | Renamed from Framer Motion, already in use |
| Tailwind CSS | 4.x | Styling (already installed) | Utility-first, bento grids well-supported |
| lucide-react | 0.563.0 | Icons (already installed) | Already used across codebase |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @radix-ui/react-tabs | latest | Tab primitives | For audience tabs - install via shadcn |
| class-variance-authority | 0.7.1 | Component variants (installed) | Feature card variants |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Radix Tabs | Headless UI Tabs | Radix already in stack, better shadcn integration |
| CSS Grid bento | react-grid-layout | Draggable not needed, CSS Grid simpler |
| Pure CSS phone mockup | react-device-frameset | Dependencies, pure CSS suffices |

**Installation:**
```bash
npx shadcn@latest add tabs
```

## Architecture Patterns

### Recommended Project Structure
```
components/
├── content-sections/
│   ├── audience-tabs/
│   │   ├── audience-tabs.tsx      # Main tab container
│   │   ├── tab-indicator.tsx      # Animated underline
│   │   ├── students-content.tsx   # Students/Parents tab content
│   │   └── merchants-content.tsx  # Partner Merchants tab content
│   ├── feature-grid/
│   │   ├── feature-grid.tsx       # Bento grid container
│   │   └── feature-card.tsx       # Individual feature card
│   ├── discovery-preview/
│   │   ├── discovery-preview.tsx  # Section wrapper
│   │   ├── phone-mockup.tsx       # Phone frame component
│   │   └── map-preview.tsx        # Map UI inside phone
│   └── content-sections.tsx       # Main section orchestrator
└── ui/
    └── tabs.tsx                   # shadcn tabs (after installation)
```

### Pattern 1: Animated Tab Indicator with layoutId

**What:** Use Framer Motion's `layoutId` prop to create smooth underline animation between tabs without manual position calculations.

**When to use:** Tab switching where visual indicator animates between triggers.

**Example:**
```typescript
// Source: BuildUI Animated Tabs pattern
// https://buildui.com/recipes/animated-tabs

'use client'

import { motion } from 'motion/react'
import { useState } from 'react'

const tabs = [
  { id: 'students', label: 'Students & Parents' },
  { id: 'merchants', label: 'Partner Merchants' },
]

export function AudienceTabs() {
  const [activeTab, setActiveTab] = useState(tabs[0].id)

  return (
    <div className="relative">
      <div className="flex gap-1" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            className={`relative px-4 py-2 text-sm font-medium transition-colors
              ${activeTab === tab.id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
```

### Pattern 2: Content Crossfade with AnimatePresence

**What:** Smooth content transitions when switching tabs using `AnimatePresence` with `mode="wait"`.

**When to use:** Tab content that should fade/slide in sequence (exit completes before enter).

**Example:**
```typescript
// Source: Motion.dev AnimatePresence documentation

import { AnimatePresence, motion } from 'motion/react'

export function TabContent({ activeTab }: { activeTab: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
      >
        {activeTab === 'students' ? <StudentsContent /> : <MerchantsContent />}
      </motion.div>
    </AnimatePresence>
  )
}
```

### Pattern 3: Bento Grid with CSS Grid

**What:** CSS Grid layout with span utilities for asymmetric card sizes.

**When to use:** Feature grid with cards of varying importance/size.

**Example:**
```typescript
// Bento grid using Tailwind CSS Grid
// 6 feature cards in responsive layout

export function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {features.map((feature, i) => (
        <FeatureCard
          key={feature.id}
          {...feature}
          // First card spans 2 columns on large screens
          className={i === 0 ? 'lg:col-span-2' : ''}
        />
      ))}
    </div>
  )
}
```

### Pattern 4: Focusable Card with Keyboard Support

**What:** Cards that are focusable, have visible focus states, and respond to keyboard.

**When to use:** Interactive cards that need accessibility (FEAT-04 requirement).

**Example:**
```typescript
// Source: Existing MetricCards pattern in codebase + WCAG requirements

'use client'

import { motion } from 'motion/react'
import { cardHoverVariants, cardTransition } from '@/lib/animation-variants'

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  className?: string
}

export function FeatureCard({ title, description, icon, className = '' }: FeatureCardProps) {
  return (
    <motion.article
      variants={cardHoverVariants}
      initial="rest"
      whileHover="hover"
      whileFocus="hover" // Same animation on focus
      transition={cardTransition}
      tabIndex={0}
      role="article"
      aria-labelledby={`feature-${title}`}
      className={`
        bg-card rounded-xl p-8 shadow-md border border-border/50
        cursor-default
        outline-none
        focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
        ${className}
      `}
      style={{ willChange: 'transform' }}
    >
      <div className="mb-4 text-primary">{icon}</div>
      <h3 id={`feature-${title}`} className="font-display text-lg font-semibold mb-2">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </motion.article>
  )
}
```

### Pattern 5: Pure CSS Phone Mockup

**What:** CSS-only phone frame with notch/dynamic island for app preview.

**When to use:** Displaying app UI mockups without library dependencies.

**Example:**
```typescript
// Pure CSS phone mockup - no dependencies needed

export function PhoneMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-[280px]">
      {/* Phone frame */}
      <div className="relative rounded-[40px] border-[8px] border-foreground/90 bg-background overflow-hidden shadow-xl">
        {/* Dynamic Island */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-foreground/90 rounded-full z-10" />

        {/* Screen content */}
        <div className="aspect-[9/19.5] overflow-hidden pt-8">
          {children}
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-foreground/30 rounded-full" />
      </div>
    </div>
  )
}
```

### Anti-Patterns to Avoid

- **Using div for tabs:** Always use `button` elements with proper `role="tab"` for triggers
- **Missing key on AnimatePresence children:** Required for proper exit animations
- **Fixed pixel widths on bento grids:** Use `grid-cols-*` with responsive breakpoints
- **Hover-only states:** Always pair `whileHover` with `whileFocus` for keyboard users
- **Manual position calculations for underline:** Use `layoutId` instead - it handles position automatically

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Tab accessibility | Custom keyboard handling | Radix UI Tabs | ARIA roles, focus management, arrow keys built-in |
| Underline position | getBoundingClientRect() | Framer Motion layoutId | Handles resizes, transitions automatically |
| Exit animations | Conditional rendering | AnimatePresence | React removes elements instantly; AnimatePresence waits |
| Focus ring styling | Custom :focus | Tailwind focus-visible | Already set up in globals.css |
| Content transitions | CSS transitions | AnimatePresence mode="wait" | Coordinates enter/exit timing |

**Key insight:** The codebase already has extensive animation infrastructure in `/lib/animation-variants.ts`. Extend these patterns rather than creating new ones.

## Common Pitfalls

### Pitfall 1: AnimatePresence with React Fragments

**What goes wrong:** Exit animations fail silently when children wrapped in fragments.
**Why it happens:** AnimatePresence needs direct children with keys to track mount/unmount.
**How to avoid:** Never wrap AnimatePresence children in `<>...</>`. Use parent div with key.
**Warning signs:** Elements disappear instantly instead of animating out.

### Pitfall 2: layoutId Not Animating

**What goes wrong:** Underline jumps instead of sliding between tabs.
**Why it happens:** `layoutId` must be the same string across renders; component must be conditionally rendered (not hidden).
**How to avoid:** Ensure the motion element with `layoutId` is truly added/removed based on state, not just styled differently.
**Warning signs:** Element appears/disappears but doesn't transition position.

### Pitfall 3: Tabs Not Keyboard Accessible

**What goes wrong:** Arrow keys don't navigate tabs, Tab key skips triggers.
**Why it happens:** Custom tab implementations missing keyboard event handlers.
**How to avoid:** Use Radix UI Tabs which implements WAI-ARIA tab pattern completely.
**Warning signs:** Can't navigate tabs without mouse; focus doesn't move predictably.

### Pitfall 4: Bento Grid Breaking on Mobile

**What goes wrong:** Cards overflow or become too narrow on small screens.
**Why it happens:** Using `grid-cols-3` without responsive breakpoints.
**How to avoid:** Always start mobile-first: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`.
**Warning signs:** Horizontal scroll appears; card text gets truncated oddly.

### Pitfall 5: Focus States Not Visible

**What goes wrong:** Users can't see which card has keyboard focus.
**Why it happens:** Missing `focus-visible` styles or using `:focus` (shows on click too).
**How to avoid:** Use `focus-visible:ring-*` classes (already in button.tsx pattern).
**Warning signs:** No visual change when tabbing to cards; accessibility audit fails.

## Code Examples

Verified patterns from codebase and official sources:

### Existing Hover Animation Pattern
```typescript
// Source: /Users/sanmaysarada/omni-card/components/hero/metric-cards.tsx

import { motion } from 'motion/react'
import { cardHoverVariants, cardTransition } from '@/lib/animation-variants'

<motion.div
  variants={cardHoverVariants}
  initial="rest"
  whileHover="hover"
  transition={cardTransition}
  className="bg-card rounded-xl p-8 shadow-md border border-border/50 cursor-default"
  style={{ willChange: 'transform' }}
>
  {/* content */}
</motion.div>
```

### Existing Animation Variants
```typescript
// Source: /Users/sanmaysarada/omni-card/lib/animation-variants.ts

// Reuse for feature cards
export const cardHoverVariants = {
  rest: { y: 0 },
  hover: { y: -5 },
}

export const cardTransition = {
  duration: 0.2,
  ease: 'easeOut' as const,
}

// Reuse for tab content reveal
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}
```

### Notification Toast Pattern (Reusable)
```typescript
// Source: /Users/sanmaysarada/omni-card/components/how-you-earn/discover-rewards/notification-toast.tsx
// Already implements proximity notification - can reuse in discovery preview

<NotificationToast
  merchantName="Campus Coffee"
  multiplier={5}
  Icon={Coffee}
  progress={animationProgress}
  appearRange={[0.75, 0.85]}
/>
```

### Isometric Map Pattern (Reusable)
```typescript
// Source: /Users/sanmaysarada/omni-card/components/how-you-earn/discover-rewards/isometric-map.tsx
// Already implements map with merchant pins - reuse for discovery preview

<IsometricMap progress={animationProgress} appearRange={[0.1, 0.25]}>
  <MerchantPin {...merchant} />
</IsometricMap>
```

### Color System
```typescript
// Source: /Users/sanmaysarada/omni-card/components/how-you-earn/shared/constants.ts

export const ISO_COLORS = {
  primary: 'oklch(0.45 0.16 270)',
  success: 'oklch(0.55 0.14 160)',
  amber: 'oklch(0.72 0.12 75)',
  // ... use for consistent theming
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| framer-motion | motion | 2024 | Same API, rebranded. Use `motion/react` import |
| CSS :focus | :focus-visible | 2023 | Shows focus only on keyboard nav, not clicks |
| Media queries for grids | Container queries | 2024 | More flexible responsive layouts |
| Manual tab ARIA | Radix UI Tabs | 2022+ | Fully accessible out of box |

**Deprecated/outdated:**
- `framer-motion` package name: Use `motion` (already correct in codebase)
- `:focus` for focus rings: Use `:focus-visible` (already correct in button.tsx)

## Open Questions

Things that couldn't be fully resolved:

1. **Exact bento grid layout for 6 cards**
   - What we know: Standard is CSS Grid with span utilities
   - What's unclear: Exact visual hierarchy - which cards larger?
   - Recommendation: Default to `2+4` layout (first 2 span full width on tablet, all 6 equal on desktop). Adjust based on content importance.

2. **Phone mockup style (iPhone vs generic)**
   - What we know: Pure CSS achievable, no library needed
   - What's unclear: Specific device to emulate
   - Recommendation: Generic modern phone with dynamic island. Avoids brand concerns, simpler CSS.

3. **Tab content animation direction**
   - What we know: `AnimatePresence mode="wait"` for sequential transitions
   - What's unclear: Should content slide left/right or fade?
   - Recommendation: Start with opacity fade (simpler), add directional slide if designer requests.

## Sources

### Primary (HIGH confidence)
- Codebase analysis: `/components/hero/metric-cards.tsx` - existing hover pattern
- Codebase analysis: `/lib/animation-variants.ts` - established animation system
- Codebase analysis: `/components/how-you-earn/` - existing map/notification components
- [Radix UI Tabs Documentation](https://www.radix-ui.com/primitives/docs/components/tabs) - API and accessibility
- [shadcn/ui Tabs](https://ui.shadcn.com/docs/components/tabs) - installation and usage

### Secondary (MEDIUM confidence)
- [BuildUI Animated Tabs](https://buildui.com/recipes/animated-tabs) - layoutId pattern verified with official docs
- [Motion.dev AnimatePresence](https://motion.dev/docs/react-animate-presence) - mode="wait" for content transitions

### Tertiary (LOW confidence)
- Web search results on bento grid best practices (2025) - patterns align with Tailwind docs
- Phone mockup CSS patterns - multiple implementations exist, pure CSS is well documented

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries already in use or are shadcn components
- Architecture: HIGH - Patterns derived from existing codebase + official docs
- Pitfalls: HIGH - Known Framer Motion/React patterns, well-documented issues

**Research date:** 2026-02-03
**Valid until:** 30 days (stable stack, established patterns)
