import { springs } from "./springs";
import { duration, ease } from "./transitions";

/**
 * RecallAI Animation Variants
 * Use with Framer Motion: `<motion.div variants={fadeIn} initial="hidden" animate="visible" />`
 */
export const variants = {
    fadeIn: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: duration.fast, ease: ease.productive },
        },
        exit: {
            opacity: 0,
            transition: { duration: duration.fast, ease: ease.productive },
        },
    },

    slideUp: {
        hidden: { opacity: 0, y: 12 },
        visible: {
            opacity: 1,
            y: 0,
            transition: springs.smooth,
        },
        exit: {
            opacity: 0,
            y: 8,
            transition: { duration: duration.fast, ease: ease.productive },
        },
    },

    scalePop: {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: springs.bouncy,
        },
        exit: {
            opacity: 0,
            scale: 0.98,
            transition: { duration: duration.fast, ease: ease.productive },
        },
    },

    slideInFromRight: {
        hidden: { opacity: 0, x: 20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: springs.smooth,
        },
        exit: {
            opacity: 0,
            x: 10,
            transition: { duration: duration.fast, ease: ease.productive },
        },
    },

    pageTransition: {
        hidden: { opacity: 0, y: 8 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: duration.normal, ease: ease.expressive },
        },
        exit: {
            opacity: 0,
            y: -4,
            transition: { duration: duration.fast, ease: ease.productive },
        },
    },

    stagger: {
        visible: {
            transition: { staggerChildren: 0.06 },
        },
    },
} as const;
