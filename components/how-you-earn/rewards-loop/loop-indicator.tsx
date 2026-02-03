'use client'

import { motion, MotionValue, useTransform } from 'framer-motion'

interface LoopIndicatorProps {
  progress?: MotionValue<number>
  /** Progress range when loop appears */
  appearRange?: [number, number]
  className?: string
}

/**
 * Circular arrow indicating the rewards cycle continues
 */
export function LoopIndicator({
  progress,
  appearRange = [0.85, 0.95],
  className = '',
}: LoopIndicatorProps) {
  const opacity = useTransform(
    progress ?? { get: () => 1 } as MotionValue<number>,
    [appearRange[0], appearRange[0] + 0.05],
    [0, 1]
  )

  const y = useTransform(
    progress ?? { get: () => 1 } as MotionValue<number>,
    [appearRange[0], appearRange[1]],
    [20, 0]
  )

  // Arrow rotation animation
  const rotate = useTransform(
    progress ?? { get: () => 1 } as MotionValue<number>,
    [appearRange[0], appearRange[1]],
    [-90, 0]
  )

  return (
    <motion.div
      className={`text-center ${className}`}
      style={{ opacity, y }}
    >
      {/* Circular arrow */}
      <motion.div
        className="inline-block mb-3"
        style={{ rotate }}
      >
        <svg
          viewBox="0 0 60 60"
          className="w-12 h-12 md:w-16 md:h-16"
        >
          {/* Circular path */}
          <circle
            cx="30"
            cy="30"
            r="24"
            fill="none"
            stroke="oklch(0.65 0.25 260 / 0.3)"
            strokeWidth="4"
          />

          {/* Animated arc */}
          <motion.circle
            cx="30"
            cy="30"
            r="24"
            fill="none"
            stroke="oklch(0.65 0.25 260)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="120"
            style={{
              strokeDashoffset: useTransform(
                progress ?? { get: () => 1 } as MotionValue<number>,
                [appearRange[0] + 0.05, appearRange[1]],
                [120, 30]
              ),
            }}
            transform="rotate(-90 30 30)"
          />

          {/* Arrow head */}
          <motion.path
            d="M 50 15 L 56 30 L 50 30"
            fill="none"
            stroke="oklch(0.65 0.25 260)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              opacity: useTransform(
                progress ?? { get: () => 1 } as MotionValue<number>,
                [appearRange[1] - 0.05, appearRange[1]],
                [0, 1]
              ),
            }}
          />
        </svg>
      </motion.div>

      {/* Text */}
      <div className="bg-muted/50 rounded-full px-4 py-2 inline-block">
        <span className="text-sm font-medium text-muted-foreground">
          Earn more next semester
        </span>
      </div>
    </motion.div>
  )
}
