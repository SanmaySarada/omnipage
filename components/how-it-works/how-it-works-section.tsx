'use client'

import { useRef } from 'react'
import { useScroll, useReducedMotion } from 'motion/react'
import { HowItWorksStatic } from './how-it-works-static'
import { ProgressDots } from './progress-dots'
import { PaymentFlowAnimation } from './payment-flow-animation'

export function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Render static fallback for users with reduced motion preference
  if (prefersReducedMotion) {
    return <HowItWorksStatic />
  }

  return (
    <section
      ref={containerRef}
      id="how-it-works"
      className="relative h-[175vh]"
    >
      {/* Progress navigation - only shows when section visible (desktop only) */}
      <ProgressDots progress={scrollYProgress} containerRef={containerRef} />

      {/* Sticky viewport that pins during scroll */}
      <div className="sticky top-0 h-screen overflow-hidden bg-gradient-to-b from-background via-muted/30 to-background">
        <PaymentFlowAnimation progress={scrollYProgress} />
      </div>
    </section>
  )
}
