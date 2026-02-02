'use client'

import { motion } from 'motion/react'
import { CreditCard, ArrowRight, Wallet, Building2 } from 'lucide-react'

const steps = [
  {
    number: 1,
    title: 'Swipe Your Card',
    description: 'Use your Omni card anywhere Visa is accepted',
    icon: CreditCard,
  },
  {
    number: 2,
    title: 'Payment Routes Automatically',
    description: 'Transaction flows through our secure network',
    icon: ArrowRight,
  },
  {
    number: 3,
    title: 'Everyone Wins',
    description: 'School receives ACH payment, you earn rewards',
    icon: Wallet,
  },
]

export function HowItWorksStatic() {
  return (
    <section id="how-it-works" className="py-24 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          How It Works
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-xl bg-background border border-border"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold">
                  {step.number}
                </div>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold">
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
