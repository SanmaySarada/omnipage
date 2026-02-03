'use client'

import { useMemo } from 'react'
import {
  DollarOdometer,
  PointsOdometer,
  PercentOdometer,
} from '@/components/how-you-earn/shared/odometer'

interface CalculatorResultsProps {
  tuition: number
  monthlySpend: number
}

export function CalculatorResults({ tuition, monthlySpend }: CalculatorResultsProps) {
  const results = useMemo(() => {
    // Tuition rewards: 1% back as points (100 points per dollar of reward)
    const tuitionPoints = tuition * 0.01 * 100

    // Everyday spend rewards: 5% avg merchant multiplier, 12 months
    const yearlySpend = monthlySpend * 12
    const spendPoints = yearlySpend * 0.05 * 100

    // Total points earned
    const totalPoints = Math.round(tuitionPoints + spendPoints)

    // 1 point = $0.01
    const dollarValue = totalPoints * 0.01

    // Tuition reduction as percentage
    const tuitionReduction = (dollarValue / tuition) * 100

    return {
      totalPoints,
      dollarValue: Math.round(dollarValue),
      tuitionReduction: Math.round(tuitionReduction * 10) / 10, // 1 decimal place
    }
  }, [tuition, monthlySpend])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
      <div className="text-center">
        <div className="font-display text-3xl sm:text-4xl font-bold text-foreground">
          <PointsOdometer value={results.totalPoints} />
        </div>
        <p className="text-sm text-muted-foreground mt-2">Total Points</p>
      </div>

      <div className="text-center">
        <div className="font-display text-3xl sm:text-4xl font-bold text-foreground">
          <DollarOdometer value={results.dollarValue} />
        </div>
        <p className="text-sm text-muted-foreground mt-2">Dollar Value</p>
      </div>

      <div className="text-center">
        <div className="font-display text-3xl sm:text-4xl font-bold text-primary">
          <PercentOdometer value={results.tuitionReduction} />
        </div>
        <p className="text-sm text-muted-foreground mt-2">Tuition Reduction</p>
      </div>
    </div>
  )
}
