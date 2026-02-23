/**
 * Common transition presets for Framer Motion
 */

export const transitions = {
  // Default smooth transition
  smooth: {
    duration: 0.3,
    ease: 'easeInOut',
  },

  // Quick snap
  quick: {
    duration: 0.15,
    ease: 'easeOut',
  },

  // Slow and smooth
  slow: {
    duration: 0.6,
    ease: 'easeInOut',
  },

  // Bouncy spring
  spring: {
    type: 'spring' as const,
    damping: 15,
    stiffness: 150,
  },

  // Soft spring
  softSpring: {
    type: 'spring' as const,
    damping: 20,
    stiffness: 100,
  },

  // Stiff spring
  stiffSpring: {
    type: 'spring' as const,
    damping: 10,
    stiffness: 300,
  },

  // For layout changes
  layout: {
    duration: 0.4,
    ease: [0.4, 0, 0.2, 1],
  },
}

/**
 * Common easing curves
 */
export const easings = {
  easeInOut: [0.4, 0, 0.2, 1],
  easeOut: [0, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  sharp: [0.4, 0, 0.6, 1],
}
