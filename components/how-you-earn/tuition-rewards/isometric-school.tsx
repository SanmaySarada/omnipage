'use client'

import { motion, MotionValue, useTransform } from 'framer-motion'
import { Check } from 'lucide-react'
import { ISO_COLORS } from '../shared/constants'

interface IsometricSchoolProps {
  progress?: MotionValue<number>
  /** Progress range when school should fade in [start, end] */
  fadeInRange?: [number, number]
  /** Progress range when checkmark appears */
  checkmarkRange?: [number, number]
  className?: string
}

/**
 * Isometric university building - Clean geometric design
 * Represents the school receiving tuition payment
 */
export function IsometricSchool({
  progress,
  fadeInRange = [0.3, 0.5],
  checkmarkRange = [0.5, 0.6],
  className = '',
}: IsometricSchoolProps) {
  // Fade in animation
  const opacity = useTransform(
    progress ?? ({ get: () => 1 } as MotionValue<number>),
    fadeInRange,
    [0, 1]
  )

  const y = useTransform(
    progress ?? ({ get: () => 1 } as MotionValue<number>),
    fadeInRange,
    [20, 0]
  )

  // Checkmark animation
  const checkmarkOpacity = useTransform(
    progress ?? ({ get: () => 1 } as MotionValue<number>),
    checkmarkRange,
    [0, 1]
  )

  const checkmarkScale = useTransform(
    progress ?? ({ get: () => 1 } as MotionValue<number>),
    checkmarkRange,
    [0.5, 1]
  )

  return (
    <motion.div
      className={`relative flex flex-col items-center ${className}`}
      style={{ opacity, y }}
    >
      <div className="relative w-32 md:w-40 lg:w-48">
        <svg
          viewBox="0 0 180 160"
          className="w-full h-auto"
          aria-label="University building"
        >
          {/* Shadow ellipse */}
          <ellipse
            cx="90"
            cy="150"
            rx="65"
            ry="9"
            fill={ISO_COLORS.shadow}
          />

          {/* Main building base - left wing */}
          <polygon
            points="20,130 20,70 60,50 60,110"
            fill={ISO_COLORS.surfaceLeft}
          />
          <polygon
            points="60,50 90,65 90,125 60,110"
            fill={ISO_COLORS.surfaceRight}
          />

          {/* Main building base - right wing */}
          <polygon
            points="90,65 120,50 120,110 90,125"
            fill={ISO_COLORS.surfaceLeft}
          />
          <polygon
            points="120,50 160,70 160,130 120,110"
            fill={ISO_COLORS.surfaceRight}
          />

          {/* Central tower - left face */}
          <polygon
            points="60,110 60,35 90,20 90,95"
            fill={ISO_COLORS.surfaceLeft}
          />

          {/* Central tower - right face */}
          <polygon
            points="90,20 120,35 120,110 90,95"
            fill={ISO_COLORS.surfaceRight}
          />

          {/* Tower roof */}
          <polygon
            points="90,20 120,35 90,50 60,35"
            fill={ISO_COLORS.surfaceTop}
          />

          {/* Spire */}
          <polygon
            points="90,5 95,20 85,20"
            fill={ISO_COLORS.primary}
          />

          {/* Flag */}
          <line
            x1="90"
            y1="5"
            x2="90"
            y2="0"
            stroke={ISO_COLORS.primaryDark}
            strokeWidth="1"
          />
          <polygon
            points="90,0 100,3 90,6"
            fill={ISO_COLORS.primary}
          />

          {/* Tower windows - left side (2x3 grid) */}
          {[0, 1].map((row) =>
            [0, 1, 2].map((col) => (
              <polygon
                key={`tower-left-${row}-${col}`}
                points={`
                  ${66 + col * 8},${50 + row * 25 - col * 4}
                  ${72 + col * 8},${47 + row * 25 - col * 4}
                  ${72 + col * 8},${37 + row * 25 - col * 4}
                  ${66 + col * 8},${40 + row * 25 - col * 4}
                `}
                fill={ISO_COLORS.primaryDark}
                opacity="0.6"
              />
            ))
          )}

          {/* Tower windows - right side (2x3 grid) */}
          {[0, 1].map((row) =>
            [0, 1, 2].map((col) => (
              <polygon
                key={`tower-right-${row}-${col}`}
                points={`
                  ${96 + col * 8},${47 + row * 25 + col * 4}
                  ${102 + col * 8},${50 + row * 25 + col * 4}
                  ${102 + col * 8},${40 + row * 25 + col * 4}
                  ${96 + col * 8},${37 + row * 25 + col * 4}
                `}
                fill={ISO_COLORS.primaryDark}
                opacity="0.5"
              />
            ))
          )}

          {/* Left wing windows (2x2 grid) */}
          {[0, 1].map((row) =>
            [0, 1].map((col) => (
              <polygon
                key={`left-wing-${row}-${col}`}
                points={`
                  ${28 + col * 14},${85 + row * 20 - col * 7}
                  ${36 + col * 14},${81 + row * 20 - col * 7}
                  ${36 + col * 14},${71 + row * 20 - col * 7}
                  ${28 + col * 14},${75 + row * 20 - col * 7}
                `}
                fill={ISO_COLORS.primaryDark}
                opacity="0.6"
              />
            ))
          )}

          {/* Right wing windows (2x2 grid) */}
          {[0, 1].map((row) =>
            [0, 1].map((col) => (
              <polygon
                key={`right-wing-${row}-${col}`}
                points={`
                  ${128 + col * 14},${81 + row * 20 + col * 7}
                  ${136 + col * 14},${85 + row * 20 + col * 7}
                  ${136 + col * 14},${75 + row * 20 + col * 7}
                  ${128 + col * 14},${71 + row * 20 + col * 7}
                `}
                fill={ISO_COLORS.primaryDark}
                opacity="0.5"
              />
            ))
          )}

          {/* Entrance - center base */}
          <polygon
            points="80,125 90,120 100,125 90,130"
            fill={ISO_COLORS.surfaceTop}
          />
          <polygon
            points="80,125 90,130 90,140 80,135"
            fill={ISO_COLORS.surfaceLeft}
          />
          <polygon
            points="90,130 100,125 100,135 90,140"
            fill={ISO_COLORS.surfaceRight}
          />

          {/* Entrance door */}
          <polygon
            points="85,130 90,127 90,135 85,138"
            fill={ISO_COLORS.primaryDark}
          />
          <polygon
            points="90,127 95,130 95,138 90,135"
            fill={ISO_COLORS.primary}
          />

          {/* Steps */}
          <polygon
            points="75,140 105,140 90,132"
            fill={ISO_COLORS.surfaceTop}
          />
          <polygon
            points="75,140 90,132 90,135 75,143"
            fill={ISO_COLORS.surfaceLeft}
          />
          <polygon
            points="90,132 105,140 105,143 90,135"
            fill={ISO_COLORS.surfaceRight}
          />
        </svg>

        {/* Checkmark badge - positioned on illustration */}
        <motion.div
          className="absolute -top-1 -right-1 md:top-0 md:right-0"
          style={{
            opacity: checkmarkOpacity,
            scale: checkmarkScale,
          }}
        >
          <div
            className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-lg"
            style={{ backgroundColor: ISO_COLORS.success }}
          >
            <Check className="w-5 h-5 md:w-6 md:h-6 text-white" strokeWidth={3} />
          </div>
        </motion.div>
      </div>
      <span
        className="mt-2 text-xs font-medium"
        style={{ color: ISO_COLORS.primaryDark }}
      >
        Your School
      </span>
    </motion.div>
  )
}
