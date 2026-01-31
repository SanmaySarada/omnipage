# Project Research Summary

**Project:** Omni Card - Premium Fintech Landing Page
**Domain:** Pre-launch waitlist landing page for tuition payments + rewards platform
**Researched:** 2026-01-31
**Confidence:** HIGH

## Executive Summary

Omni Card is a premium fintech landing page that combines 3D interactive elements with conversion-focused design patterns. The research confirms this is achievable with the proposed stack (Next.js 15.5, React 19, Tailwind v4, Motion v12, React Three Fiber v9), but success depends on executing three things correctly: (1) proper R3F architecture with a single Canvas and dynamic imports to avoid hydration errors and bundle bloat, (2) trust signals above the fold before any fancy animations since fintech users decide within 50ms whether to stay, and (3) mandatory accessibility support including prefers-reduced-motion handling from day one.

The recommended approach is an 8-phase build starting with design tokens and static components, layering in animation infrastructure, then 3D graphics, and finally interactive features like the calculator. This order respects the dependency graph discovered in architecture research: design tokens feed into Tailwind config which enables shadcn/ui which enables section components. The 3D card requires animation infrastructure to be in place, and the scroll-driven "How It Works" section needs both.

Key risks are iOS Safari WebGL context loss (requires explicit recovery handling), mobile performance degradation (requires progressive enhancement and device detection), and bundle size creep from Three.js + Motion (requires aggressive code splitting). All three are well-documented with clear mitigation patterns.

## Key Findings

### Recommended Stack

The stack is modern but battle-tested. All major packages have stable releases verified via npm and official documentation. The only uncertainty is @react-three/a11y (last updated 4 years ago, React 18 peer dep) which may need compatibility testing or an alternative approach for 3D accessibility.

**Core technologies:**
- **Next.js 15.5 + React 19:** App Router provides server components by default, reducing JS shipped to client. Turbopack for fast dev builds.
- **Tailwind CSS v4.1:** CSS-first config eliminates tailwind.config.js complexity. 5x faster builds. P3 color palette with OKLCH.
- **shadcn/ui:** Copy-paste components with full ownership. Tailwind v4 compatible. Radix primitives for built-in accessibility.
- **Motion v12:** Renamed from framer-motion. useScroll/useTransform for scroll-linked animations. Tree-shakeable to ~18KB.
- **React Three Fiber v9 + Drei v10:** React paradigm for Three.js. v9 pairs with React 19. Drei provides battle-tested helpers (View, Float, Environment).
- **Three.js r171+:** Zero-config WebGPU with WebGL2 fallback. r171+ eliminates bundler config requirements.

**What NOT to use:**
- `framer-motion` (old package name) -- use `motion/react`
- `tailwindcss-animate` -- incompatible with Tailwind v4, use tw-animate-css or Motion
- Multiple `<Canvas>` elements -- browser limits WebGL contexts to 8-10
- `@react-three/fiber` v8 -- that's for React 18, use v9

### Expected Features

**Must have (table stakes):**
- Sticky navigation with single CTA
- Clear hero with value proposition + email capture (single field)
- Trust bar with metrics/social proof
- Mobile-first responsive design (59-70% of traffic is mobile)
- Security/compliance messaging (30%+ consumers doubt financial institutions)
- FAQ accordion (reduces bounce)
- Footer with legal/compliance links
- Fast page load under 3 seconds

**Should have (differentiators):**
- 3D card animation in hero (visual differentiation, fintech trend)
- Scroll-triggered "How It Works" (narrative engagement)
- Interactive savings calculator (personalized value demonstration)
- Audience-specific tabs ("Who It's For")
- Bento grid feature section (modern visual hierarchy)

**Defer to v2+:**
- Referral/viral waitlist mechanics (add once waitlist grows)
- Video testimonials (need content first)
- Real-time social proof notifications (can feel gimmicky)

**Anti-features (deliberately avoid):**
- Multi-field signup forms (each field reduces conversion)
- Fake countdown timers (destroys trust)
- Exit-intent popups (feels desperate)
- Multiple competing CTAs (single CTA converts 22% better)
- Autoplay video with sound (immediate bounce trigger)

### Architecture Approach

Server Components by default, Client islands only where needed. Single R3F Canvas with Drei `<View>` for multiple 3D viewports. Centralized animation variants in constants file. Design tokens in CSS variables consumed by both Tailwind and R3F materials.

**Major components:**
1. **app/layout.tsx** (Server) -- Root layout with providers wrapper
2. **app/page.tsx** (Server) -- Composition root, imports sections
3. **components/sections/** (Server containers) -- Hero, Features, Calculator, FAQ
4. **components/three/** (Client) -- Scene canvas, Card3D, materials, effects
5. **components/animations/** (Client) -- ScrollReveal, scroll progress wrappers
6. **hooks/** -- use-calculator (useReducer), use-scroll-progress, use-media-query
7. **lib/** -- cn() utility, animation variants, calculator logic

**Critical pattern:** Single Canvas with View.Port at bottom of page, View components placed inside sections that need 3D. Canvas has `position: fixed` and `pointer-events: none`.

### Critical Pitfalls

1. **React state in R3F animation loops** -- Never use useState in useFrame. Use refs and direct mutation. setState triggers React re-renders 60x/second, causing 10-15fps.

2. **iOS Safari WebGL context loss** -- Safari 16.7+ loses WebGL context when backgrounded. Must add webglcontextlost/restored event handlers and show recovery UI.

3. **R3F Canvas hydration errors** -- Always use `dynamic(() => import(), { ssr: false })` for R3F components. Server has no WebGL APIs.

4. **Missing prefers-reduced-motion support** -- 35%+ of adults have motion sensitivity. Build from day one with useReducedMotion hook and CSS media query fallbacks.

5. **Trust signals below the fold** -- Fintech users decide in 50ms. Security badges, social proof, and clear value prop MUST be visible before scroll.

6. **Mobile 3D performance** -- Same scene on iPhone SE and M3 MacBook causes 5-10fps on mobile. Progressive enhancement: detect device capability, serve simplified 3D or static image fallback.

7. **Bundle size from Three.js + Motion** -- ~200KB combined. Lazy load Canvas component, use LazyMotion with domAnimation feature, tree-shake Drei imports.

## Implications for Roadmap

Based on research, suggested 8-phase structure:

### Phase 1: Foundation
**Rationale:** Design tokens must exist before any styling. Tailwind config extends tokens. shadcn/ui requires both.
**Delivers:** Project setup, design system foundation, base layout
**Addresses:** Project infrastructure, consistent theming
**Avoids:** Pitfall 10 (client component overuse), Pitfall 7 (bundle bloat from day 1)

### Phase 2: Static UI Components
**Rationale:** Components needed before sections can be built. Typography, buttons, cards are reused everywhere.
**Delivers:** shadcn/ui components, section containers, typography system
**Addresses:** Table stakes (nav, buttons, cards)
**Avoids:** Inconsistent design, redundant component creation

### Phase 3: Hero Section
**Rationale:** First thing users see. Trust signals must be above fold before any fancy effects.
**Delivers:** Hero with value prop, email capture, trust bar, sticky nav
**Addresses:** Table stakes (email capture, trust signals, mobile responsive)
**Avoids:** Pitfall 5 (missing trust signals), Pitfall 12 (loading spinner above fold)

### Phase 4: Animation Infrastructure
**Rationale:** Animation variants and wrappers needed before 3D and scroll sections.
**Delivers:** ScrollReveal component, animation variants, Motion setup with LazyMotion
**Addresses:** Accessibility (reduced-motion), performance (bundle size)
**Avoids:** Pitfall 4 (no reduced-motion), Pitfall 7 (Motion bundle bloat)

### Phase 5: 3D Infrastructure
**Rationale:** Canvas setup, dynamic imports, and fallback handling before building the actual card.
**Delivers:** Single Canvas with View.Port, dynamic import wrapper, context loss recovery
**Addresses:** R3F architecture, iOS Safari handling
**Avoids:** Pitfall 2 (iOS context loss), Pitfall 3 (hydration errors)

### Phase 6: 3D Card (Hero Enhancement)
**Rationale:** Now that infrastructure exists, build the actual 3D card with materials and interactivity.
**Delivers:** 3D card geometry, metallic/holographic materials, cursor tracking
**Addresses:** Differentiator (3D card animation)
**Avoids:** Pitfall 1 (React state in useFrame), Pitfall 6 (object creation in loop), Pitfall 11 (no progressive enhancement)

### Phase 7: Scroll Section ("How It Works")
**Rationale:** Requires both animation infrastructure and 3D to be working.
**Delivers:** Sticky scroll container, SVG path, scroll-linked progress, step reveals
**Addresses:** Differentiator (scroll-triggered How It Works)
**Avoids:** Pitfall 8 (scroll jank in Safari), Pitfall 15 (frame-dependent timing)

### Phase 8: Interactive Features + Polish
**Rationale:** Calculator and FAQ are independent features. Polish comes last.
**Delivers:** Calculator with sliders/odometer, FAQ accordion, magnetic buttons, final performance audit
**Addresses:** Differentiator (interactive calculator), table stakes (FAQ)
**Avoids:** Pitfall 9 (calculator error handling), Pitfall 14 (gated results)

### Phase Ordering Rationale

- **Foundation before components:** Design tokens feed Tailwind which feeds shadcn/ui
- **Hero before 3D:** Users need to see trust signals immediately; 3D enhances but can't replace content
- **Animation infrastructure before 3D:** ScrollReveal and variants used by both 3D and scroll sections
- **3D infrastructure before card:** Canvas, dynamic imports, context recovery must exist before building card content
- **Scroll section after 3D:** Uses both animation variants and potentially 3D elements
- **Calculator last:** Self-contained feature, complex state, benefits from all infrastructure being stable

### Research Flags

**Phases likely needing deeper research during planning:**
- **Phase 6 (3D Card):** Custom holographic shader material may need phase-specific research. Drei MeshReflectorMaterial patterns vary.
- **Phase 7 (Scroll Section):** CSS scroll-driven animations vs Motion scroll() -- need to decide based on browser support targets.

**Phases with standard patterns (skip research-phase):**
- **Phase 1-3:** Standard Next.js + shadcn/ui setup, well-documented
- **Phase 4:** Motion documentation is excellent, patterns are clear
- **Phase 8 (Calculator):** Standard React state management with useReducer

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All versions verified via npm, official docs, GitHub releases |
| Features | MEDIUM-HIGH | Multiple sources corroborate patterns; some fintech-specific extrapolation |
| Architecture | HIGH | Verified with R3F docs, Next.js docs, community patterns |
| Pitfalls | HIGH | Official documentation + multiple confirmed bug reports |

**Overall confidence:** HIGH

### Gaps to Address

- **@react-three/a11y + React 19:** Package last updated 4 years ago with React 18 peer dep. Test compatibility early in Phase 5 or find alternative approach (aria-labels on container div).

- **WebGPU vs WebGL decision:** Three.js r171+ supports WebGPU. For landing page with broad compatibility, explicitly use WebGLRenderer. Needs confirmation in Phase 5.

- **Tailwind v4 animation approach:** tw-animate-css vs Motion for micro-interactions. Research suggests Motion for scroll-linked, CSS for hover states. Validate in Phase 4.

- **Calculator reward rates:** Need actual business logic (reward percentages, tuition ranges) before Phase 8. Flag for requirements phase.

## Sources

### Primary (HIGH confidence)
- [Next.js 15.5 Release Notes](https://nextjs.org/blog/next-15-5)
- [React Three Fiber v9 Migration Guide](https://r3f.docs.pmnd.rs/tutorials/v9-migration-guide)
- [R3F Performance Pitfalls](https://r3f.docs.pmnd.rs/advanced/pitfalls)
- [Motion Documentation](https://motion.dev/)
- [Tailwind CSS v4 Installation](https://tailwindcss.com/docs/installation)
- [shadcn/ui Tailwind v4 Guide](https://ui.shadcn.com/docs/tailwind-v4)
- [Drei View Component](https://drei.docs.pmnd.rs/portals/view)

### Secondary (MEDIUM confidence)
- [Hostinger Landing Page Statistics 2025](https://www.hostinger.com/tutorials/landing-page-statistics)
- [Flow Ninja: Fintech Trust Issues](https://www.flow.ninja/blog/fintech-websites-trust-issues)
- [Eleken: Fintech UX Best Practices](https://www.eleken.co/blog-posts/fintech-ux-best-practices)
- [NNGroup: Calculator Design](https://www.nngroup.com/articles/recommendations-calculator/)
- [W3C WCAG 2.3.3 Animation](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html)

### Tertiary (LOW confidence)
- [@react-three/a11y GitHub](https://github.com/pmndrs/react-three-a11y) -- needs React 19 compatibility testing
- [WebKit Bug 261331](https://bugs.webkit.org/show_bug.cgi?id=261331) -- iOS Safari WebGL context loss, may be fixed in future Safari versions

---
*Research completed: 2026-01-31*
*Ready for roadmap: yes*
