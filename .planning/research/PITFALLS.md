# Domain Pitfalls

**Domain:** Premium Fintech Landing Page with 3D and Animations
**Researched:** 2026-01-31
**Confidence:** HIGH (based on official documentation + multiple verified sources)

---

## Critical Pitfalls

Mistakes that cause rewrites, major performance issues, or accessibility failures.

---

### Pitfall 1: React State in R3F Animation Loops

**What goes wrong:** Using `useState` inside `useFrame` or fast event handlers triggers React re-renders 60 times per second, defeating Three.js's independent render loop and causing severe frame drops.

**Why it happens:** React developers instinctively reach for state management. R3F abstracts Three.js with JSX, making it feel "React-like" when it fundamentally isn't for animations.

**Consequences:**
- Frame rate drops from 60fps to 10-15fps
- UI becomes unresponsive
- Mobile devices become unusable

**Prevention:**
```javascript
// BAD: setState in useFrame
const [x, setX] = useState(0)
useFrame(() => setX((x) => x + 0.1))
return <mesh position-x={x} />

// GOOD: Direct mutation with refs
const meshRef = useRef()
useFrame((state, delta) => (meshRef.current.position.x += delta))
return <mesh ref={meshRef} />
```

**Detection:** Use r3f-perf or Chrome DevTools Performance panel. Look for React re-render spikes during animation.

**Phase:** Foundation (Phase 1) - Establish correct patterns from the start.

**Source:** [R3F Performance Pitfalls Documentation](https://r3f.docs.pmnd.rs/advanced/pitfalls)

---

### Pitfall 2: WebGL Context Lost on iOS Safari

**What goes wrong:** Users background Safari, switch apps, or receive a call. When they return, the 3D canvas shows nothing or the page crashes with "WebGL: context lost" error.

**Why it happens:** iOS Safari (16.7+, 17.x) has a known WebKit bug where WebGL contexts are lost when the browser is backgrounded. This affects Three.js, BabylonJS, PixiJS, and all WebGL content.

**Consequences:**
- 3D content disappears completely
- Page may hard-crash
- Refreshing doesn't always fix it
- Users must clear browser cache or force-quit Safari

**Prevention:**
```javascript
// Listen for context loss and handle gracefully
const handleContextLost = (event) => {
  event.preventDefault();
  // Show fallback UI or reload prompt
  setShowFallback(true);
};

const handleContextRestored = () => {
  // Reinitialize scene
  setShowFallback(false);
};

// In Canvas or renderer setup
renderer.domElement.addEventListener('webglcontextlost', handleContextLost);
renderer.domElement.addEventListener('webglcontextrestored', handleContextRestored);
```

**Detection:** Test on real iOS devices (iPhone 11-15). Background Safari for 30+ seconds, return.

**Phase:** 3D Implementation (Phase 2) - Build context recovery from the start.

**Source:** [WebKit Bug 261331](https://bugs.webkit.org/show_bug.cgi?id=261331), [Three.js Forum Discussion](https://discourse.threejs.org/t/how-to-fix-context-lost-android-iphone-ios/56829)

---

### Pitfall 3: R3F Canvas Hydration Errors in Next.js

**What goes wrong:** Next.js SSR attempts to render the R3F Canvas on the server where WebGL APIs don't exist. This causes hydration mismatches and React errors.

**Why it happens:** R3F's Canvas component requires browser APIs (WebGL, window, requestAnimationFrame). Server-side rendering has none of these.

**Consequences:**
- Console errors about hydration mismatch
- Flash of incorrect content
- Potential complete render failure
- Poor Lighthouse scores

**Prevention:**
```javascript
// ALWAYS use dynamic import with ssr: false for R3F
import dynamic from 'next/dynamic'

const Scene3D = dynamic(() => import('../components/Scene3D'), {
  ssr: false,
  loading: () => <SceneSkeleton /> // Show skeleton while loading
})

export default function Page() {
  return <Scene3D />
}
```

**Detection:** Run `next build && next start`. Check browser console for hydration warnings.

**Phase:** Foundation (Phase 1) - Correct setup from project start.

**Source:** [Next.js Hydration Error Docs](https://nextjs.org/docs/messages/react-hydration-error), [R3F + Next.js Guide](https://medium.com/@divyanshsharma0631/unlocking-the-third-dimension-building-immersive-3d-experiences-with-react-three-fiber-in-next-js-153397f27802)

---

### Pitfall 4: Scroll Animations Without prefers-reduced-motion

**What goes wrong:** Parallax effects and scroll-linked animations trigger vestibular disorders (dizziness, nausea, migraines) in users with motion sensitivity.

**Why it happens:** Developers test on themselves and miss the 35%+ of adults who experience some form of motion sensitivity. WCAG 2.3.3 requires motion controls.

**Consequences:**
- Users physically harmed (nausea, migraines requiring bed rest)
- Accessibility lawsuit risk (especially in EU/UK post-2025)
- Users immediately leave site
- Negative brand perception

**Prevention:**
```css
/* CSS-first approach */
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

```javascript
// Framer Motion approach
import { useReducedMotion } from 'framer-motion'

function AnimatedComponent() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      animate={{
        x: prefersReducedMotion ? 0 : 100,
        opacity: 1 // Opacity is safe
      }}
    />
  )
}
```

**Detection:** Chrome DevTools > Rendering > Emulate CSS media feature prefers-reduced-motion: reduce. Test entire user journey.

**Phase:** Animation System (Phase 2) - Build into animation utilities from start.

**Source:** [W3C WCAG 2.3.3](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html), [Pope Tech Animation Accessibility Guide](https://blog.pope.tech/2025/12/08/design-accessible-animation-and-movement/)

---

### Pitfall 5: Missing Trust Signals on Fintech Landing Page

**What goes wrong:** Users form an opinion about your site in 50ms. Without immediate trust signals, fintech visitors assume "scam" and leave.

**Why it happens:** Developers focus on cool 3D effects and forget that fintech users are risk-averse and security-conscious. 89% of users would switch banks for better UX.

**Consequences:**
- Immediate bounce (within 5 seconds)
- Zero conversions despite traffic
- Brand perception as untrustworthy
- Wasted marketing spend

**Prevention:**
Above the fold MUST include:
- Security badges (SSL, regulatory compliance logos)
- Social proof (customer count, testimonials, logos)
- Clear value proposition (not jargon)
- Professional design (consistent colors, proper typography)

```jsx
// Trust signals above the fold
<header>
  <Logo />
  <nav>{/* ... */}</nav>
</header>
<Hero>
  <h1>Clear value proposition</h1>
  <p>Simple explanation without jargon</p>
  <TrustBadges>
    <SSLBadge />
    <FDICBadge />
    <SOC2Badge />
  </TrustBadges>
  <SocialProof>
    <span>Trusted by 50,000+ customers</span>
    <CustomerLogos />
  </SocialProof>
</Hero>
```

**Detection:** 5-second test with unfamiliar users. Ask: "Would you trust this with your money?"

**Phase:** Hero Section (Phase 1) - Trust signals before fancy animations.

**Source:** [Flow Ninja: Fintech Trust Issues](https://www.flow.ninja/blog/fintech-websites-trust-issues), [Eleken: Fintech UX Best Practices](https://www.eleken.co/blog-posts/fintech-ux-best-practices)

---

## Moderate Pitfalls

Mistakes that cause delays, technical debt, or degraded user experience.

---

### Pitfall 6: Object Creation Inside useFrame

**What goes wrong:** Creating new Vector3, Quaternion, or other Three.js objects inside the render loop allocates memory 60 times per second, triggering garbage collection pauses.

**Why it happens:** Looks cleaner in code. JavaScript's garbage collection is invisible until it causes frame drops.

**Prevention:**
```javascript
// BAD: New object every frame
useFrame(() => {
  ref.current.position.lerp(new THREE.Vector3(x, y, z), 0.1)
})

// GOOD: Reuse object
const vec = useMemo(() => new THREE.Vector3(), [])
useFrame(() => {
  ref.current.position.lerp(vec.set(x, y, z), 0.1)
})
```

**Detection:** Chrome DevTools Performance panel. Look for GC (garbage collection) spikes during animation.

**Phase:** 3D Implementation (Phase 2)

**Source:** [R3F Pitfalls](https://r3f.docs.pmnd.rs/advanced/pitfalls)

---

### Pitfall 7: Animation Library Bundle Bloat

**What goes wrong:** Full Framer Motion import adds 34KB+ to bundle. Combined with Three.js (140KB+), initial page load becomes unacceptably slow.

**Why it happens:** Convenient imports like `import { motion } from 'framer-motion'` include the entire library. R3F + Framer Motion + Three.js quickly exceeds 300KB.

**Consequences:**
- Slow initial load (especially mobile)
- Poor Core Web Vitals
- Lower SEO ranking
- Higher bounce rate

**Prevention:**
```javascript
// BAD: Full import (34KB+)
import { motion } from 'framer-motion'

// GOOD: LazyMotion + feature splitting (5KB base)
import { LazyMotion, domAnimation, m } from 'framer-motion'

function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <m.div animate={{ opacity: 1 }} />
    </LazyMotion>
  )
}

// BETTER: For simple animations, consider CSS
// or Motion One (4KB total)
```

**Detection:** `npx next build` shows bundle analysis. Use `@next/bundle-analyzer`.

**Phase:** Foundation (Phase 1) - Set up LazyMotion from the start.

**Source:** [Motion Bundle Size Docs](https://motion.dev/docs/react-reduce-bundle-size)

---

### Pitfall 8: Scroll Animation Jank in Safari

**What goes wrong:** Scroll-linked animations that read `scrollTop` update a frame late, causing visible jank especially in Safari and Firefox.

**Why it happens:** JavaScript scroll handlers run on the main thread. Safari's compositor works differently, causing scroll position to update before JavaScript catches up.

**Consequences:**
- Animations feel "laggy" or "sticky"
- Image elements become "jumpy" during scroll
- Professional impression damaged

**Prevention:**
```javascript
// BAD: Main-thread scroll reading
useScroll({ onChange: ({ scrollY }) => {
  element.style.transform = `translateY(${scrollY * 0.5}px)`
}})

// GOOD: Hardware-accelerated scroll timeline
// Use Motion's scroll() function for compositor-driven animation
import { scroll, animate } from 'motion'

scroll(
  animate(element, { y: [0, 100] }),
  { target: document }
)

// Or: Use CSS scroll-driven animations (2025+)
@keyframes parallax {
  from { transform: translateY(0); }
  to { transform: translateY(100px); }
}
.parallax {
  animation: parallax linear;
  animation-timeline: scroll();
}
```

**Detection:** Test in Safari specifically. Record Performance profile while scrolling.

**Phase:** Animation System (Phase 2)

**Source:** [Motion Performance Guide](https://motion.dev/docs/performance), [Motion Blog: Animation Performance](https://motion.dev/blog/web-animation-performance-tier-list)

---

### Pitfall 9: Calculator Input Errors Without Clear Feedback

**What goes wrong:** Users enter invalid data (negative loan amounts, 150% interest rates) and receive confusing error messages or broken calculations.

**Why it happens:** Developers validate data but don't communicate errors in user-friendly terms. Financial calculators have complex validation rules.

**Consequences:**
- Users lose trust in calculations
- Abandon calculator entirely
- May make financial decisions based on incorrect outputs
- Support tickets

**Prevention:**
```jsx
// Clear, contextual error messages
<input
  type="number"
  value={loanAmount}
  onChange={handleChange}
  aria-describedby="loan-error"
/>
{errors.loanAmount && (
  <p id="loan-error" role="alert" className="error">
    {/* Specific, actionable message */}
    Loan amount must be between $1,000 and $1,000,000
  </p>
)}

// Provide helpful defaults and ranges
<label>
  Interest Rate (typical: 5-15%)
  <input
    type="number"
    min="0"
    max="30"
    step="0.1"
    placeholder="e.g., 7.5"
  />
</label>
```

**Detection:** Test with edge cases: 0, negative numbers, extremely large numbers, empty fields.

**Phase:** Calculator Feature (Phase 3)

**Source:** [NNGroup Calculator Design](https://www.nngroup.com/articles/recommendations-calculator/)

---

### Pitfall 10: Overusing Client Components in Next.js App Router

**What goes wrong:** Marking every component with `'use client'` because it feels familiar from Create React App. Browser must hydrate everything, bloating JS and slowing TTI.

**Why it happens:** Habit from client-side React. Fear of "use client" breaking things. Misunderstanding of Server Component boundaries.

**Consequences:**
- Larger JavaScript bundle sent to client
- Slower Time to Interactive
- Poor Core Web Vitals
- SEO penalty

**Prevention:**
```javascript
// BAD: Everything client-side
'use client'
export default function Page() {
  return (
    <main>
      <Hero /> {/* Could be server */}
      <Features /> {/* Could be server */}
      <Calculator /> {/* This one needs client */}
    </main>
  )
}

// GOOD: Server by default, client only when needed
// page.tsx (Server Component - no directive)
export default function Page() {
  return (
    <main>
      <Hero /> {/* Server - just HTML */}
      <Features /> {/* Server - static content */}
      <CalculatorWrapper /> {/* Thin client wrapper */}
    </main>
  )
}

// CalculatorWrapper.tsx
'use client'
export function CalculatorWrapper() {
  const [inputs, setInputs] = useState({})
  return <Calculator inputs={inputs} onChange={setInputs} />
}
```

**Detection:** Check bundle with `@next/bundle-analyzer`. Count `'use client'` directives.

**Phase:** Foundation (Phase 1)

**Source:** [Next.js App Router Mistakes](https://upsun.com/blog/avoid-common-mistakes-with-next-js-app-router/)

---

### Pitfall 11: Slow 3D Canvas on Mobile - No Progressive Enhancement

**What goes wrong:** Same high-poly 3D scene renders on iPhone SE and M3 MacBook Pro. Mobile users experience 5-10fps, hot devices, battery drain.

**Why it happens:** Developers test on powerful machines. Mobile GPU capabilities vary wildly. WebGL is demanding.

**Consequences:**
- Mobile frame rates under 20fps
- Device overheating
- Battery drain complaints
- Users leave before seeing content

**Prevention:**
```javascript
// Detect device capability
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
const isLowEnd = navigator.hardwareConcurrency <= 4

// Progressive enhancement
<Canvas
  dpr={isLowEnd ? 1 : [1, 2]} // Lower pixel ratio on mobile
  performance={{ min: 0.5 }}  // Allow quality reduction
>
  {isMobile ? (
    <SimplifiedCard /> // Lower poly, no reflections
  ) : (
    <PremiumCard /> // Full experience
  )}
</Canvas>

// Or: Replace 3D with high-quality image on low-end
{supports3D ? <Card3D /> : <CardImage />}
```

**Detection:** Test on real devices: iPhone SE, budget Android (Samsung A series). Use Chrome DevTools device emulation + CPU throttling.

**Phase:** 3D Implementation (Phase 2)

**Source:** [Three.js Mobile Performance](https://discourse.threejs.org/t/problems-with-performance-on-mobile-devices/23734), [R3F Scaling Performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance)

---

### Pitfall 12: Loading Spinner Above the Fold

**What goes wrong:** Users see a spinner while 3D content loads. They perceive the site as slow and may leave before seeing anything.

**Why it happens:** Spinners are the default loading pattern. 3D assets take time to load.

**Consequences:**
- Perceived performance 30% worse than alternatives
- Higher bounce rate
- Users associate your brand with "slow"

**Prevention:**
```jsx
// BAD: Spinner while 3D loads
{loading ? <Spinner /> : <Scene3D />}

// GOOD: Skeleton that matches final layout
const Scene3D = dynamic(() => import('./Scene3D'), {
  ssr: false,
  loading: () => (
    <div className="scene-skeleton">
      {/* Shape matches where 3D card will appear */}
      <div className="card-placeholder animate-pulse" />
    </div>
  )
})

// BETTER: Show static content immediately, 3D enhances
<Hero>
  <StaticContent /> {/* Visible immediately */}
  <Scene3DWrapper> {/* Loads and appears when ready */}
    <Scene3D />
  </Scene3DWrapper>
</Hero>
```

**Detection:** Throttle network to Slow 3G. First impression should be content, not spinner.

**Phase:** Hero Section (Phase 1)

**Source:** [LogRocket: Skeleton Loading Design](https://blog.logrocket.com/ux-design/skeleton-loading-screen-design/)

---

## Minor Pitfalls

Mistakes that cause annoyance but are relatively easy to fix.

---

### Pitfall 13: Removing All Motion for prefers-reduced-motion

**What goes wrong:** Setting `animation: none` globally when user prefers reduced motion. Some animations (opacity fades, color changes) are helpful and don't cause vestibular issues.

**Why it happens:** Developers go "nuclear" and remove everything instead of thoughtfully reducing.

**Prevention:**
```css
/* BAD: Remove everything */
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; }
}

/* GOOD: Reduce, don't remove */
@media (prefers-reduced-motion: reduce) {
  .parallax { transform: none; }
  .slide-in { animation: fade-in 0.2s; } /* Replace slide with fade */
}
```

**Detection:** Enable reduced motion in OS settings. Verify site still feels alive.

**Phase:** Animation System (Phase 2)

**Source:** [Tatiana Mac: No-Motion-First Approach](https://www.tatianamac.com/posts/prefers-reduced-motion)

---

### Pitfall 14: Calculator Forces Registration Before Results

**What goes wrong:** User completes calculator, clicks "See Results," gets registration form instead of results. They abandon.

**Why it happens:** Marketing wants leads. PM insists on email capture.

**Prevention:**
- Show results immediately
- Offer to "save results" via email (optional)
- Gate detailed PDF report, not basic results

**Detection:** User testing. Watch for rage clicks on results button.

**Phase:** Calculator Feature (Phase 3)

**Source:** [NNGroup: Calculator Expectations](https://www.nngroup.com/articles/calculator-expectations/)

---

### Pitfall 15: Hard-Coded Animation Timing (Frame-Dependent)

**What goes wrong:** Animation runs faster on 120Hz displays, slower on 30fps mobile. `position.x += 0.1` moves twice as fast at 60fps vs 30fps.

**Why it happens:** Forgetting that useFrame runs per frame, not per second.

**Prevention:**
```javascript
// BAD: Frame-rate dependent
useFrame(() => {
  mesh.current.position.x += 0.1 // 6x faster at 60fps than 10fps
})

// GOOD: Delta-time based
useFrame((state, delta) => {
  mesh.current.position.x += delta * 2 // Consistent speed regardless of framerate
})

// BETTER: Use lerp for smooth approach
useFrame((state, delta) => {
  mesh.current.position.x = THREE.MathUtils.lerp(
    mesh.current.position.x,
    targetX,
    1 - Math.pow(0.001, delta) // Framerate-independent lerp
  )
})
```

**Detection:** Test on 120Hz display and throttle to 30fps.

**Phase:** 3D Implementation (Phase 2)

**Source:** [R3F Pitfalls](https://r3f.docs.pmnd.rs/advanced/pitfalls)

---

### Pitfall 16: Mounting/Unmounting 3D Components

**What goes wrong:** Conditionally rendering 3D components (`{show && <Model />}`) forces expensive recompilation of shaders and reinitialization of buffers every toggle.

**Why it happens:** React conditional rendering is idiomatic. Three.js compilation is expensive.

**Prevention:**
```javascript
// BAD: Mount/unmount
{activeScene === 1 && <Scene1 />}
{activeScene === 2 && <Scene2 />}

// GOOD: Toggle visibility
<Scene1 visible={activeScene === 1} />
<Scene2 visible={activeScene === 2} />

function Scene1({ visible }) {
  return (
    <group visible={visible}>
      {/* Content */}
    </group>
  )
}
```

**Detection:** Toggle component visibility. Watch for frame drops on each toggle.

**Phase:** 3D Implementation (Phase 2)

**Source:** [R3F Pitfalls](https://r3f.docs.pmnd.rs/advanced/pitfalls)

---

### Pitfall 17: Fintech Jargon in Hero Copy

**What goes wrong:** Headline says "Optimize your cashback accrual velocity" instead of "Earn more rewards on every purchase."

**Why it happens:** Internal team understands the jargon. Assumes users do too.

**Consequences:**
- Users don't understand value proposition
- Bounce within seconds
- Lower conversion

**Prevention:**
- 5th grade reading level for hero copy
- Test headlines with people outside fintech
- Focus on benefits, not features

**Detection:** Hemingway Editor for readability. User testing with non-experts.

**Phase:** Content (Phase 1)

**Source:** [Eleken: Fintech UX](https://www.eleken.co/blog-posts/fintech-ux-best-practices)

---

## Phase-Specific Warnings

| Phase | Likely Pitfall | Mitigation |
|-------|---------------|------------|
| **Phase 1: Foundation** | Hydration errors, client overuse, bundle bloat | Dynamic imports for R3F, LazyMotion, server-first components |
| **Phase 1: Hero** | Missing trust signals, slow perceived load | Trust badges above fold, skeleton loading, content-first |
| **Phase 2: 3D** | iOS context loss, mobile performance, GC jank | Context recovery, progressive enhancement, object pooling |
| **Phase 2: Animations** | Scroll jank, no reduced motion, vestibular harm | Hardware-accelerated scroll, prefers-reduced-motion from start |
| **Phase 3: Calculator** | Bad error messages, forced registration | Clear validation, immediate results |
| **All Phases** | Bundle size creep | Regular bundle analysis, consider alternatives to large deps |

---

## Summary: Top 5 Must-Avoid Mistakes

1. **React state in R3F animation loops** - Use refs and direct mutation
2. **No prefers-reduced-motion support** - Build accessibility from day one
3. **Missing trust signals above the fold** - Fintech users need immediate confidence
4. **Same 3D complexity on mobile** - Progressive enhancement is mandatory
5. **R3F without dynamic import** - Always use `ssr: false` in Next.js

---

## Sources

### Official Documentation
- [React Three Fiber Performance Pitfalls](https://r3f.docs.pmnd.rs/advanced/pitfalls)
- [React Three Fiber Scaling Performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
- [Motion Performance Guide](https://motion.dev/docs/performance)
- [Motion Bundle Size Reduction](https://motion.dev/docs/react-reduce-bundle-size)
- [Next.js Hydration Error Documentation](https://nextjs.org/docs/messages/react-hydration-error)
- [W3C WCAG 2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html)

### Community & Research
- [NNGroup: Calculator Design Recommendations](https://www.nngroup.com/articles/recommendations-calculator/)
- [Flow Ninja: Fintech Trust Issues](https://www.flow.ninja/blog/fintech-websites-trust-issues)
- [Eleken: Fintech UX Best Practices 2025](https://www.eleken.co/blog-posts/fintech-ux-best-practices)
- [Pope Tech: Accessible Animation Design](https://blog.pope.tech/2025/12/08/design-accessible-animation-and-movement/)
- [A List Apart: Accessibility for Vestibular Disorders](https://alistapart.com/article/accessibility-for-vestibular/)
- [LogRocket: Skeleton Loading Design](https://blog.logrocket.com/ux-design/skeleton-loading-screen-design/)
- [Motion Blog: Animation Performance Tier List](https://motion.dev/blog/web-animation-performance-tier-list)

### Bug Reports & Known Issues
- [WebKit Bug 261331: iOS Safari WebGL Context Lost](https://bugs.webkit.org/show_bug.cgi?id=261331)
- [Three.js Forum: Mobile Performance Issues](https://discourse.threejs.org/t/problems-with-performance-on-mobile-devices/23734)
- [Three.js Forum: WebGL Context Lost iOS](https://discourse.threejs.org/t/how-to-fix-context-lost-android-iphone-ios/56829)
