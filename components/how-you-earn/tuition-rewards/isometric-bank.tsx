'use client'

import { motion, MotionValue, useTransform } from 'framer-motion'

interface IsometricBankProps {
  progress?: MotionValue<number>
  /** Progress range when bank should fade in [start, end] */
  fadeInRange?: [number, number]
  className?: string
}

/**
 * Isometric bank building SVG
 * Represents the user's bank account (source of funds)
 */
export function IsometricBank({
  progress,
  fadeInRange = [0, 0.2],
  className = '',
}: IsometricBankProps) {
  // Fade in animation based on scroll
  const opacity = useTransform(
    progress ?? { get: () => 1 } as MotionValue<number>,
    fadeInRange,
    [0, 1]
  )

  const y = useTransform(
    progress ?? { get: () => 1 } as MotionValue<number>,
    fadeInRange,
    [20, 0]
  )

  return (
    <motion.svg
      viewBox="0 0 120 140"
      className={`w-24 md:w-32 lg:w-40 ${className}`}
      style={{ opacity, y }}
    >
      {/* Shadow */}
      <ellipse
        cx="60"
        cy="130"
        rx="45"
        ry="8"
        fill="oklch(0.20 0.05 260 / 0.15)"
      />

      {/* Base platform - right face */}
      <path
        d="M 60 120 L 105 95 L 105 105 L 60 130 Z"
        fill="oklch(0.85 0.02 260)"
      />

      {/* Base platform - left face */}
      <path
        d="M 60 120 L 15 95 L 15 105 L 60 130 Z"
        fill="oklch(0.90 0.02 260)"
      />

      {/* Base platform - top */}
      <path
        d="M 60 110 L 105 85 L 60 60 L 15 85 Z"
        fill="oklch(0.98 0.01 260)"
      />

      {/* Main building - right face */}
      <path
        d="M 60 60 L 95 42 L 95 85 L 60 103 Z"
        fill="oklch(0.85 0.02 260)"
      />

      {/* Main building - left face */}
      <path
        d="M 60 60 L 25 42 L 25 85 L 60 103 Z"
        fill="oklch(0.90 0.02 260)"
      />

      {/* Roof - right */}
      <path
        d="M 60 30 L 100 50 L 95 42 L 60 60 Z"
        fill="oklch(0.80 0.15 260)"
      />

      {/* Roof - left */}
      <path
        d="M 60 30 L 20 50 L 25 42 L 60 60 Z"
        fill="oklch(0.65 0.25 260)"
      />

      {/* Roof - front peak */}
      <path
        d="M 60 30 L 20 50 L 60 60 L 100 50 Z"
        fill="oklch(0.75 0.20 260)"
      />

      {/* Columns on front face */}
      <rect x="32" y="65" width="5" height="30" fill="oklch(0.95 0.01 260)" />
      <rect x="45" y="65" width="5" height="30" fill="oklch(0.95 0.01 260)" />
      <rect x="58" y="65" width="5" height="30" fill="oklch(0.92 0.01 260)" />

      {/* Dollar sign in center */}
      <text
        x="60"
        y="78"
        textAnchor="middle"
        fontSize="16"
        fontWeight="bold"
        fill="oklch(0.65 0.25 260)"
      >
        $
      </text>

      {/* Bank label */}
      <text
        x="60"
        y="145"
        textAnchor="middle"
        fontSize="10"
        fill="oklch(0.50 0.05 260)"
        className="font-medium"
      >
        Your Bank
      </text>
    </motion.svg>
  )
}
