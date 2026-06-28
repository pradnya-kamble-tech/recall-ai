/**
 * RecallAI Spring Physics Presets
 * Use these instead of hardcoding spring parameters anywhere in the codebase.
 */
export const springs = {
    bouncy: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20,
        mass: 0.8,
    },
    smooth: {
        type: "spring" as const,
        stiffness: 260,
        damping: 25,
        mass: 1,
    },
    snappy: {
        type: "spring" as const,
        stiffness: 400,
        damping: 30,
        mass: 0.5,
    },
    gentle: {
        type: "spring" as const,
        stiffness: 160,
        damping: 22,
        mass: 1.2,
    },
} as const;
