// Isometric color palette (extending brand tokens)
export const ISO_COLORS = {
  // Primary (from brand)
  primary: 'oklch(0.65 0.25 260)',
  primaryLight: 'oklch(0.80 0.15 260)',
  primaryDark: 'oklch(0.45 0.20 260)',

  // Surfaces for isometric faces
  surfaceTop: 'oklch(0.98 0.01 260)',
  surfaceLeft: 'oklch(0.90 0.02 260)',
  surfaceRight: 'oklch(0.85 0.02 260)',

  // Accents
  success: 'oklch(0.70 0.20 145)',
  amber: 'oklch(0.75 0.15 85)',
  blue: 'oklch(0.65 0.20 240)',

  // Shadow
  shadow: 'oklch(0.20 0.05 260 / 0.15)',
} as const

// Animation timing
export const TIMING = {
  stagger: 0.1,
  duration: {
    fast: 0.3,
    normal: 0.5,
    slow: 0.8,
  },
  spring: {
    stiff: { type: 'spring', stiffness: 300, damping: 30 },
    bouncy: { type: 'spring', stiffness: 400, damping: 25 },
    smooth: { type: 'spring', stiffness: 200, damping: 40 },
  },
} as const

// Example numbers used in animations
export const EXAMPLE_DATA = {
  tuition: 25000,
  rewardRate: 0.01, // 1%
  rewardAmount: 250, // 1% of 25k
  thresholds: {
    tier1: { spend: 0.20, rate: 0.005 }, // 20% spend -> 0.5% rate
    tier2: { spend: 0.40, rate: 0.01 },  // 40% spend -> 1.0% rate
  },
  merchantMultipliers: [3, 5, 7, 10],
  totalPoints: 12450,
  pointValue: 0.01, // 1 point = $0.01
} as const
