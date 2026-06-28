import { springs } from "./springs";

/**
 * RecallAI Gesture Presets
 * Apply directly to motion components:
 *   <motion.button {...gestures.pressable} />
 *   <motion.div {...gestures.hoverable} />
 */
export const gestures = {
    pressable: {
        whileTap: { scale: 0.97 },
        transition: springs.bouncy,
    },
    pressableSubtle: {
        whileTap: { scale: 0.99 },
        transition: springs.snappy,
    },
    hoverable: {
        whileHover: { scale: 1.02 },
        transition: springs.smooth,
    },
    hoverLift: {
        whileHover: { y: -2, scale: 1.01 },
        transition: springs.smooth,
    },
    draggable: {
        whileDrag: { scale: 1.05, rotate: 2 },
        transition: springs.snappy,
    },
} as const;
