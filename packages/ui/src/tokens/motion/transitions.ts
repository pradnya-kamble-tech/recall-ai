/**
 * RecallAI Transition Presets
 * Duration values and easing curves for tween-based animations.
 */
export const duration = {
    instant: 0.08,
    fast: 0.15,
    normal: 0.3,
    slow: 0.6,
    crawl: 1.0,
} as const;

export const ease = {
    /** Sharp deceleration — best for dashboards and data transitions */
    productive: [0.2, 0, 0, 1] as const,
    /** Softer deceleration — brand moments and page transitions */
    expressive: [0.4, 0.14, 0.3, 1] as const,
    /** Standard ease-in-out */
    standard: [0.4, 0, 0.2, 1] as const,
} as const;

export const transitions = { duration, ease } as const;
