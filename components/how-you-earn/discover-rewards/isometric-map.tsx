'use client'

import { motion, MotionValue, useTransform } from 'framer-motion'
import { ReactNode } from 'react'

interface IsometricMapProps {
  progress?: MotionValue<number>
  /** Progress range when map appears */
  appearRange?: [number, number]
  children?: ReactNode
  className?: string
}

/**
 * Isometric map base with grid streets
 */
export function IsometricMap({
  progress,
  appearRange = [0.1, 0.2],
  children,
  className = '',
}: IsometricMapProps) {
  const opacity = useTransform(
    progress ?? { get: () => 1 } as MotionValue<number>,
    appearRange,
    [0, 1]
  )

  const scale = useTransform(
    progress ?? { get: () => 1 } as MotionValue<number>,
    appearRange,
    [0.95, 1]
  )

  return (
    <motion.div
      className={`relative w-full max-w-lg mx-auto aspect-square ${className}`}
      style={{ opacity, scale }}
    >
      {/* Map background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 to-green-200/30 rounded-2xl overflow-hidden border border-border shadow-lg">
        {/* Grid pattern (isometric) */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 400 400"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Isometric grid pattern */}
            <pattern
              id="isoGrid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              {/* Horizontal-ish lines (going right-down) */}
              <line
                x1="0"
                y1="20"
                x2="40"
                y2="40"
                stroke="oklch(0.70 0.05 145 / 0.3)"
                strokeWidth="1"
              />
              {/* Vertical-ish lines (going left-down) */}
              <line
                x1="0"
                y1="40"
                x2="40"
                y2="20"
                stroke="oklch(0.70 0.05 145 / 0.3)"
                strokeWidth="1"
              />
            </pattern>
          </defs>

          {/* Apply grid pattern */}
          <rect width="400" height="400" fill="url(#isoGrid)" />

          {/* Main "streets" */}
          {/* Horizontal street */}
          <line
            x1="50"
            y1="200"
            x2="350"
            y2="200"
            stroke="oklch(0.85 0.02 260)"
            strokeWidth="20"
            strokeLinecap="round"
          />

          {/* Vertical street */}
          <line
            x1="200"
            y1="50"
            x2="200"
            y2="350"
            stroke="oklch(0.85 0.02 260)"
            strokeWidth="20"
            strokeLinecap="round"
          />

          {/* Street markings (dashed center lines) */}
          <line
            x1="60"
            y1="200"
            x2="340"
            y2="200"
            stroke="oklch(0.95 0.01 60)"
            strokeWidth="2"
            strokeDasharray="10 10"
          />
          <line
            x1="200"
            y1="60"
            x2="200"
            y2="340"
            stroke="oklch(0.95 0.01 60)"
            strokeWidth="2"
            strokeDasharray="10 10"
          />
        </svg>

        {/* User location pulse */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative">
            {/* Pulse rings */}
            <motion.div
              className="absolute w-8 h-8 rounded-full bg-blue-500/20 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
              animate={{
                scale: [1, 2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
            <motion.div
              className="absolute w-8 h-8 rounded-full bg-blue-500/20 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
              animate={{
                scale: [1, 2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
                delay: 1,
              }}
            />
            {/* User dot */}
            <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-lg" />
          </div>
        </div>

        {/* Children (pins, buildings, etc.) */}
        {children}
      </div>
    </motion.div>
  )
}
