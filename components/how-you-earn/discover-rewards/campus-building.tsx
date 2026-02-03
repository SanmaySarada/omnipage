'use client'

import { motion, MotionValue, useTransform } from 'framer-motion'

interface CampusBuildingProps {
  progress?: MotionValue<number>
  /** Progress range when building appears */
  appearRange?: [number, number]
  className?: string
}

/**
 * Isometric campus/university building for map center
 */
export function CampusBuilding({
  progress,
  appearRange = [0.15, 0.25],
  className = '',
}: CampusBuildingProps) {
  const opacity = useTransform(
    progress ?? { get: () => 1 } as MotionValue<number>,
    appearRange,
    [0, 1]
  )

  const scale = useTransform(
    progress ?? { get: () => 1 } as MotionValue<number>,
    [appearRange[0], appearRange[0] + 0.05, appearRange[1]],
    [0.8, 1.05, 1]
  )

  return (
    <motion.div
      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${className}`}
      style={{ opacity, scale }}
    >
      <svg viewBox="0 0 80 100" className="w-16 md:w-20 lg:w-24">
        {/* Shadow */}
        <ellipse
          cx="40"
          cy="95"
          rx="35"
          ry="5"
          fill="oklch(0.20 0.05 260 / 0.2)"
        />

        {/* Main building base - right face */}
        <path
          d="M 40 40 L 70 25 L 70 80 L 40 95 Z"
          fill="oklch(0.88 0.03 260)"
        />

        {/* Main building base - left face */}
        <path
          d="M 40 40 L 10 25 L 10 80 L 40 95 Z"
          fill="oklch(0.92 0.02 260)"
        />

        {/* Roof */}
        <path
          d="M 40 30 L 70 15 L 70 25 L 40 40 L 10 25 L 10 15 Z"
          fill="oklch(0.65 0.25 260)"
        />

        {/* Tower - right */}
        <path
          d="M 40 30 L 50 25 L 50 45 L 40 50 Z"
          fill="oklch(0.85 0.03 260)"
        />

        {/* Tower - left */}
        <path
          d="M 40 30 L 30 25 L 30 45 L 40 50 Z"
          fill="oklch(0.90 0.02 260)"
        />

        {/* Tower spire */}
        <path
          d="M 40 15 L 50 25 L 40 30 L 30 25 Z"
          fill="oklch(0.75 0.20 260)"
        />

        {/* Windows left */}
        <rect x="15" y="40" width="8" height="10" fill="oklch(0.70 0.10 240)" opacity="0.7" />
        <rect x="15" y="55" width="8" height="10" fill="oklch(0.70 0.10 240)" opacity="0.7" />
        <rect x="27" y="45" width="8" height="10" fill="oklch(0.70 0.10 240)" opacity="0.7" />
        <rect x="27" y="60" width="8" height="10" fill="oklch(0.70 0.10 240)" opacity="0.7" />

        {/* Windows right */}
        <rect x="47" y="40" width="8" height="10" fill="oklch(0.65 0.10 240)" opacity="0.6" />
        <rect x="47" y="55" width="8" height="10" fill="oklch(0.65 0.10 240)" opacity="0.6" />
        <rect x="59" y="45" width="8" height="10" fill="oklch(0.65 0.10 240)" opacity="0.6" />
        <rect x="59" y="60" width="8" height="10" fill="oklch(0.65 0.10 240)" opacity="0.6" />

        {/* Door */}
        <path
          d="M 35 75 L 45 70 L 45 90 L 35 95 Z"
          fill="oklch(0.50 0.15 260)"
        />

        {/* Flag pole */}
        <line x1="40" y1="15" x2="40" y2="0" stroke="oklch(0.50 0.05 260)" strokeWidth="1" />

        {/* Flag */}
        <path d="M 40 0 L 52 4 L 40 8 Z" fill="oklch(0.65 0.25 260)" />
      </svg>

      {/* Campus label */}
      <div className="text-center mt-1">
        <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded">
          Campus
        </span>
      </div>
    </motion.div>
  )
}
