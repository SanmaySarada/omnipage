'use client'

import { GraduationCap, Wallet, MapPin, Bell, TrendingUp } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Benefit {
  icon: LucideIcon
  title: string
  description: string
}

const benefits: Benefit[] = [
  {
    icon: Wallet,
    title: 'Rewards on Tuition',
    description: 'Earn up to 1% cash back on every tuition payment. No caps, no gimmicks.',
  },
  {
    icon: TrendingUp,
    title: 'Better Loan Rates',
    description: 'Unlock lower interest rates as you build payment history with Omni.',
  },
  {
    icon: MapPin,
    title: '3x-10x Merchant Points',
    description: 'Discover local businesses near campus offering boosted reward multipliers.',
  },
  {
    icon: GraduationCap,
    title: 'Campus Discovery',
    description: 'Find the best student deals and rewards at businesses around your school.',
  },
  {
    icon: Bell,
    title: 'Proximity Notifications',
    description: "Get alerts when you're near a partner merchant with elevated rewards.",
  },
]

export function StudentsContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {benefits.map((benefit) => {
        const Icon = benefit.icon
        return (
          <div
            key={benefit.title}
            className="bg-card rounded-xl p-6 border border-border/50"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Icon className="size-5 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">{benefit.title}</h3>
            <p className="text-muted-foreground text-sm">{benefit.description}</p>
          </div>
        )
      })}
    </div>
  )
}
