# Phase 3: Hero Section - Research

**Researched:** 2026-01-31
**Domain:** Landing page hero with animations, form capture, gradient backgrounds
**Confidence:** HIGH

## Summary

This phase implements the hero section with staggered text animations, an animated gradient mesh background, inline email capture with micro-validation, trust microcopy, and metric cards with hover lift effects.

The project already has Motion v12.29.2 installed with `MotionConfig reducedMotion="user"` in the Providers component, establishing patterns for accessible animations. The existing `lib/animation-variants.ts` provides a pattern for organizing animation configurations, and the MagneticButton shows Motion usage with spring transitions.

**Primary recommendation:** Use Motion's variant system with `staggerChildren` for text fade-ins, pure CSS for gradient mesh animation (performance-friendly with GPU-accelerated properties), and combine shadcn Input component with native validation for the email capture.

## Standard Stack

### Core (Already Installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| motion | 12.29.2 | Animation library | Already installed, project uses `motion/react` imports |
| tailwindcss | ^4 | Styling | Already configured with OKLCH colors |
| shadcn/ui | - | UI components | Button, Sheet already installed |

### Required Additions
| Library | Version | Purpose | When to Add |
|---------|---------|---------|-------------|
| shadcn/ui Input | - | Email input field | Required for email capture form |

### Not Needed
| Component | Why Not |
|-----------|---------|
| react-hook-form | Overkill for single email field; native form + validation sufficient |
| zod | Same as above - simple regex validation is adequate |
| WebGL gradient libraries | CSS animation sufficient for slow drift effect, better performance |

**Installation:**
```bash
npx shadcn@latest add input
```

## Architecture Patterns

### Recommended Project Structure
```
components/
  hero/
    hero-section.tsx      # Main hero container with gradient background
    hero-content.tsx      # Headline, subhead, email form (client component)
    email-capture.tsx     # Inline email form with validation (client component)
    metric-cards.tsx      # Trust/metric cards with hover effects (client component)
  ui/
    input.tsx             # shadcn Input (add via CLI)
lib/
  animation-variants.ts   # Extend with hero animation variants
```

### Pattern 1: Staggered Text Animation with Variants

**What:** Headline and subhead fade in sequentially using Motion's variant propagation
**When to use:** When child elements need coordinated entrance animations
**Example:**
```typescript
// Source: https://motion.dev/docs/stagger, https://motion.dev/tutorials/react-variants
import { motion, stagger } from 'motion/react'

// In lib/animation-variants.ts
export const heroContainerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

export const heroTextVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

// In component
<motion.div
  variants={heroContainerVariants}
  initial="hidden"
  animate="visible"
>
  <motion.h1 variants={heroTextVariants}>Headline</motion.h1>
  <motion.p variants={heroTextVariants}>Subhead</motion.p>
  <motion.div variants={heroTextVariants}>
    {/* Email form */}
  </motion.div>
</motion.div>
```

### Pattern 2: CSS Gradient Mesh with Slow Drift

**What:** Animated gradient background using pure CSS keyframes
**When to use:** Background effects that need to run continuously without React overhead
**Example:**
```css
/* In globals.css or as Tailwind @layer */
.gradient-mesh {
  background: linear-gradient(
    -45deg,
    oklch(0.85 0.15 280),  /* Purple tint */
    oklch(0.90 0.10 240),  /* Blue tint */
    oklch(0.92 0.08 260),  /* Light purple */
    oklch(0.88 0.12 220)   /* Blue-purple */
  );
  background-size: 400% 400%;
  animation: gradient-drift 30s ease infinite;
}

@keyframes gradient-drift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```
**Note:** 30s duration creates "slow drift" effect. 400% background-size enables smooth looping.

### Pattern 3: Inline Email Validation with Micro-feedback

**What:** Real-time validation on blur/change with animated feedback
**When to use:** Single-field forms where immediate feedback improves UX
**Example:**
```typescript
// Simple pattern without react-hook-form
const [email, setEmail] = useState('')
const [touched, setTouched] = useState(false)
const [isValid, setIsValid] = useState(false)

const validateEmail = (value: string) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return pattern.test(value)
}

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value
  setEmail(value)
  if (touched) {
    setIsValid(validateEmail(value))
  }
}

const handleBlur = () => {
  setTouched(true)
  setIsValid(validateEmail(email))
}
```

### Pattern 4: Hover Lift Effect for Metric Cards

**What:** Card rises on hover with enhanced shadow using GPU-accelerated properties
**When to use:** Interactive cards that need to feel "liftable"
**Example:**
```typescript
// Using Tailwind + Motion for hover
<motion.div
  className="bg-card rounded-lg p-6 shadow-sm"
  whileHover={{
    y: -5,
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
  }}
  transition={{ duration: 0.2, ease: 'easeOut' }}
>
  <span className="text-3xl font-bold">$50B+</span>
  <p className="text-muted-foreground">Built for $X in tuition</p>
</motion.div>
```

### Anti-Patterns to Avoid
- **Don't use margin for lift animations:** Use `transform: translateY` or Motion's `y` prop - margin causes layout recalculations
- **Don't animate gradient colors directly:** Animate `background-position` instead (GPU-accelerated)
- **Don't show validation errors before interaction:** Use `touched` state to delay error display
- **Don't use heavy WebGL for simple gradients:** Pure CSS with `animation` is sufficient for slow drift

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Animation orchestration | Manual setTimeout chains | Motion variants with `staggerChildren` | Handles timing, reduced motion, cleanup |
| Email validation | Custom regex implementation | Simple pattern + native browser validation | `type="email"` gives free validation hints |
| Input component | Custom styled input | shadcn Input | Consistent styling, accessibility, focus states |
| Form state | useState for every field | Native FormData on submit | Single email field doesn't need form library |

**Key insight:** This is a waitlist capture form with ONE field. react-hook-form + zod would add ~15KB for validation of a single email input. Native validation + simple regex is appropriate.

## Common Pitfalls

### Pitfall 1: Gradient Animation Causes Jank
**What goes wrong:** Animating `background` property directly causes repaint on every frame
**Why it happens:** CSS `background` changes trigger paint operations
**How to avoid:** Animate `background-position` with oversized `background-size` (400%+)
**Warning signs:** Choppy animation, high CPU usage

### Pitfall 2: Text Animation Flashes on Mount
**What goes wrong:** Content briefly visible before animation starts
**Why it happens:** React hydration shows content before JavaScript runs
**How to avoid:** Set `initial={{ opacity: 0 }}` on parent container
**Warning signs:** Flash of unstyled/unanimated content on page load

### Pitfall 3: Reduced Motion Not Respected
**What goes wrong:** Users with `prefers-reduced-motion` still see animations
**Why it happens:** CSS animations don't auto-respect user preference
**How to avoid:** Already solved - project uses `MotionConfig reducedMotion="user"`. For CSS animations, add media query:
```css
@media (prefers-reduced-motion: reduce) {
  .gradient-mesh { animation: none; }
}
```
**Warning signs:** Accessibility complaints

### Pitfall 4: Email Form Submits Before Validation
**What goes wrong:** Invalid emails get submitted
**Why it happens:** No `onSubmit` prevention, missing `required` attribute
**How to avoid:** Use `required` attribute, validate on submit, prevent default
**Warning signs:** Console errors, empty submissions

### Pitfall 5: Metric Cards Box-Shadow Transition Stutters
**What goes wrong:** Shadow transition looks choppy
**Why it happens:** `box-shadow` is expensive to animate
**How to avoid:** Use `filter: drop-shadow()` or accept slightly less smooth shadow, or use Motion's spring
**Warning signs:** Visible stepping in shadow animation

## Code Examples

### Hero Text Fade-In (verified pattern from project's existing code + Motion docs)
```typescript
// Source: Motion docs, existing project patterns
'use client'

import { motion } from 'motion/react'

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

export function HeroContent() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="text-center"
    >
      <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold">
        Earn Rewards on Your Biggest Expense
      </motion.h1>
      <motion.p variants={itemVariants} className="text-xl text-muted-foreground mt-4">
        Pay tuition with any credit card. Keep your rewards.
      </motion.p>
      <motion.div variants={itemVariants}>
        {/* Email capture form */}
      </motion.div>
    </motion.div>
  )
}
```

### Email Capture with Micro-Validation
```typescript
// Source: React patterns, shadcn Input
'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function EmailCapture() {
  const [email, setEmail] = useState('')
  const [touched, setTouched] = useState(false)
  const [status, setStatus] = useState<'idle' | 'invalid' | 'valid'>('idle')

  const validate = (value: string) => {
    if (!value) return 'idle'
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    return isValid ? 'valid' : 'invalid'
  }

  const handleBlur = () => {
    setTouched(true)
    setStatus(validate(email))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    if (touched) {
      setStatus(validate(value))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate(email) === 'valid') {
      // Submit to API
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
      <div className="flex-1 relative">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          className={cn(
            status === 'invalid' && 'border-destructive focus-visible:ring-destructive',
            status === 'valid' && 'border-green-500 focus-visible:ring-green-500'
          )}
        />
        {status === 'invalid' && touched && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-destructive text-sm mt-1"
          >
            Please enter a valid email
          </motion.p>
        )}
      </div>
      <Button type="submit">Join Waitlist</Button>
    </form>
  )
}
```

### Gradient Mesh Background CSS
```css
/* Source: Researched patterns */
.hero-gradient {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(
    -45deg,
    oklch(0.95 0.03 280),
    oklch(0.97 0.02 240),
    oklch(0.98 0.015 260),
    oklch(0.96 0.025 220)
  );
  background-size: 400% 400%;
  animation: gradient-drift 30s ease infinite;
}

@keyframes gradient-drift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .hero-gradient {
    animation: none;
    background-size: 100% 100%;
  }
}
```

### Metric Card with Hover Lift
```typescript
// Source: Motion whileHover, CSS shadow best practices
'use client'

import { motion } from 'motion/react'

interface MetricCardProps {
  value: string
  label: string
}

export function MetricCard({ value, label }: MetricCardProps) {
  return (
    <motion.div
      className="bg-card rounded-xl p-6 shadow-sm border"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      style={{ willChange: 'transform' }}
    >
      <div className="text-3xl font-bold text-primary">{value}</div>
      <p className="text-muted-foreground text-sm mt-1">{label}</p>
    </motion.div>
  )
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| framer-motion import | motion/react import | 2024 (Motion v11) | Package renamed, same API |
| Separate reduced motion handling | MotionConfig reducedMotion="user" | Motion v10+ | Automatic OS preference respect |
| Complex form libs for simple forms | Native validation + useState | Always valid | Reduced bundle size |
| WebGL for gradients | CSS background-position animation | Performance focus | Lower CPU usage |

**Current (already applied in project):**
- Motion v12.29.2 with `motion/react` imports
- `MotionConfig reducedMotion="user"` in Providers
- OKLCH colors in Tailwind v4

## Open Questions

1. **Trust microcopy icons?**
   - What we know: "Bank-level security | No fees for schools | Rewards from day one" is the copy
   - What's unclear: Should we add icons (shield, check, star)?
   - Recommendation: Start without icons, add if design feels empty

2. **Metric card values?**
   - What we know: "Built for $X in tuition" / "Zero fees for schools" are examples
   - What's unclear: Final copy and number of cards (3-4)
   - Recommendation: Create with placeholder values, update copy later

3. **Email form submission endpoint?**
   - What we know: Form captures email
   - What's unclear: Where does it submit? API route? External service?
   - Recommendation: Build form with `onSubmit` handler stub, implement endpoint in later phase

## Sources

### Primary (HIGH confidence)
- Motion docs - stagger, variants, whileInView, whileHover
  - https://motion.dev/docs/stagger
  - https://motion.dev/docs/react-scroll-animations
  - https://motion.dev/tutorials/react-variants
- Project codebase - existing patterns in `components/providers.tsx`, `lib/animation-variants.ts`, `components/ui/magnetic-button.tsx`

### Secondary (MEDIUM confidence)
- CSS gradient animation patterns - multiple CodePen examples and tutorials
  - https://codepen.io/P1N2O/pen/pyBNzX
  - https://exclusiveaddons.com/css-gradient-animation/
- Email validation patterns - verified with multiple sources
  - https://www.geeksforgeeks.org/javascript/how-to-validate-email-address-using-regexp-in-javascript/
- shadcn/ui form patterns
  - https://ui.shadcn.com/docs/components/form

### Tertiary (LOW confidence)
- Fintech landing page best practices - general guidance, not project-specific
  - https://www.eleken.co/blog-posts/modern-fintech-design-guide

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - using already-installed libraries, only adding shadcn Input
- Architecture: HIGH - patterns verified against Motion docs and existing project code
- Pitfalls: MEDIUM - based on general React/animation knowledge, some project-specific validation needed

**Research date:** 2026-01-31
**Valid until:** 2026-03-01 (stable domain, 30 days)
