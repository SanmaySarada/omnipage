'use client'

import { motion, MotionValue, useTransform } from 'framer-motion'

interface MerchantPinProps {
  /** Merchant name */
  name: string
  /** Reward multiplier (e.g., 3, 5, 10) */
  multiplier: number
  /** Icon/emoji for the merchant */
  icon: string
  /** Pin color */
  color: string
  /** Position on the map (percentage) */
  position: { x: number; y: number }
  /** Scroll progress */
  progress?: MotionValue<number>
  /** Progress range when pin appears [start, end] */
  appearRange?: [number, number]
  className?: string
}

/**
 * Animated merchant pin with reward multiplier badge
 */
export function MerchantPin({
  name,
  multiplier,
  icon,
  color,
  position,
  progress,
  appearRange = [0, 0.1],
  className = '',
}: MerchantPinProps) {
  // Bounce-in animation
  const scale = useTransform(
    progress ?? { get: () => 1 } as MotionValue<number>,
    [appearRange[0], appearRange[0] + 0.02, appearRange[1]],
    [0, 1.3, 1]
  )

  const opacity = useTransform(
    progress ?? { get: () => 1 } as MotionValue<number>,
    [appearRange[0], appearRange[0] + 0.02],
    [0, 1]
  )

  // Subtle float animation after appearing
  const y = useTransform(
    progress ?? { get: () => 1 } as MotionValue<number>,
    [appearRange[1], appearRange[1] + 0.3, appearRange[1] + 0.6],
    [0, -3, 0]
  )

  return (
    <motion.div
      className={`absolute flex flex-col items-center ${className}`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -100%)',
        scale,
        opacity,
        y,
      }}
    >
      {/* Pin body */}
      <div
        className="relative flex flex-col items-center"
        style={{ color }}
      >
        {/* Multiplier badge */}
        <div
          className="px-2 py-0.5 rounded-full text-white text-xs font-bold shadow-lg mb-1"
          style={{ backgroundColor: color }}
        >
          {multiplier}x
        </div>

        {/* Icon circle */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-lg border-2 border-white"
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>

        {/* Pin point */}
        <div
          className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent -mt-1"
          style={{ borderTopColor: color }}
        />

        {/* Shadow ellipse */}
        <div
          className="w-6 h-2 rounded-full mt-1 opacity-30"
          style={{ backgroundColor: color }}
        />
      </div>

      {/* Merchant name (shown on hover/focus in real app, always visible here for demo) */}
      <motion.span
        className="text-xs font-medium mt-1 whitespace-nowrap bg-background/80 px-2 py-0.5 rounded"
        style={{
          opacity: useTransform(
            progress ?? { get: () => 1 } as MotionValue<number>,
            [appearRange[1], appearRange[1] + 0.1],
            [0, 1]
          ),
        }}
      >
        {name}
      </motion.span>
    </motion.div>
  )
}

// Pre-defined merchant data
export const MERCHANTS = [
  {
    id: 'coffee',
    name: 'Campus Coffee',
    icon: '☕',
    multiplier: 5,
    color: '#8B4513',
    position: { x: 25, y: 35 },
  },
  {
    id: 'books',
    name: 'University Books',
    icon: '📚',
    multiplier: 10,
    color: 'oklch(0.65 0.25 260)',
    position: { x: 70, y: 30 },
  },
  {
    id: 'pizza',
    name: 'Campus Pizza',
    icon: '🍕',
    multiplier: 3,
    color: '#E55B3C',
    position: { x: 30, y: 65 },
  },
  {
    id: 'burger',
    name: 'Student Grill',
    icon: '🍔',
    multiplier: 5,
    color: '#D4A574',
    position: { x: 75, y: 60 },
  },
  {
    id: 'store',
    name: 'Quick Mart',
    icon: '🏪',
    multiplier: 7,
    color: '#4A90D9',
    position: { x: 55, y: 75 },
  },
] as const
