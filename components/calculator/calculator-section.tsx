'use client'

import { useState } from 'react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { EmailCapture } from '@/components/hero/email-capture'
import { TuitionSlider } from './tuition-slider'
import { SpendSlider } from './spend-slider'
import { CalculatorResults } from './calculator-results'

export function CalculatorSection() {
  const [tuition, setTuition] = useState(25000)
  const [monthlySpend, setMonthlySpend] = useState(500)

  return (
    <section
      id="calculator"
      className="bg-gradient-to-b from-background to-muted/30 py-20 sm:py-24"
    >
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <ScrollReveal className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Calculate Your Rewards
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how much you could earn with Omni
          </p>
        </ScrollReveal>

        {/* Sliders Card */}
        <ScrollReveal delay={0.1}>
          <div className="bg-card rounded-lg p-6 sm:p-8 shadow-sm border mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <TuitionSlider value={tuition} onChange={setTuition} />
              <SpendSlider value={monthlySpend} onChange={setMonthlySpend} />
            </div>
          </div>
        </ScrollReveal>

        {/* Results Card */}
        <ScrollReveal delay={0.2}>
          <div className="bg-primary/5 rounded-lg p-6 sm:p-8 mb-12">
            <CalculatorResults tuition={tuition} monthlySpend={monthlySpend} />
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={0.3} className="text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to start earning?
          </p>
          <EmailCapture />
        </ScrollReveal>
      </div>
    </section>
  )
}
