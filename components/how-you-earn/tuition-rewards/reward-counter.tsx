'use client'

import { motion, MotionValue, useTransform } from 'framer-motion'
import { DollarOdometer } from '../shared/odometer'
import { EXAMPLE_DATA } from '../shared/constants'

interface RewardCounterProps {
  progress?: MotionValue<number>
  /** Progress range when counter animates [start, end] */
  counterRange?: [number, number]
  className?: string
}

/**
 * Animated reward counter showing earnings from tuition payment
 */
export function RewardCounter({
  progress,
  counterRange = [0.6, 1.0],
  className = '',
}: RewardCounterProps) {
  const opacity = useTransform(
    progress ?? { get: () => 1 } as MotionValue<number>,
    [counterRange[0], counterRange[0] + 0.1],
    [0, 1]
  )

  const scale = useTransform(
    progress ?? { get: () => 1 } as MotionValue<number>,
    [counterRange[0], counterRange[0] + 0.1],
    [0.8, 1]
  )

  const y = useTransform(
    progress ?? { get: () => 1 } as MotionValue<number>,
    [counterRange[0], counterRange[0] + 0.1],
    [20, 0]
  )

  return (
    <motion.div
      className={`text-center ${className}`}
      style={{ opacity, scale, y }}
    >
      {/* Main counter */}
      <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 md:p-8 border border-primary/20 shadow-lg shadow-primary/10">
        <div className="text-sm text-muted-foreground mb-2 uppercase tracking-wide">
          Rewards Earned
        </div>

        <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
          +<DollarOdometer
            value={EXAMPLE_DATA.rewardAmount}
            progress={progress}
            progressRange={counterRange}
          />
        </div>

        <div className="text-sm text-muted-foreground mt-2">
          in points
        </div>
      </div>

      {/* Subtext */}
      <motion.p
        className="text-muted-foreground mt-4 text-sm md:text-base max-w-xs mx-auto"
        style={{
          opacity: useTransform(
            progress ?? { get: () => 1 } as MotionValue<number>,
            [counterRange[1] - 0.1, counterRange[1]],
            [0, 1]
          ),
        }}
      >
        That's money back on something you're already paying.
      </motion.p>
    </motion.div>
  )
}
