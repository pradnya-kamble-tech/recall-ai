export { springs } from "./springs";
export { duration, ease, transitions } from "./transitions";
export { variants } from "./variants";
export { gestures } from "./gestures";

// ---------------------------------------------------------------------------
// Legacy-compatible exports
// These aliases preserve the original `motionTokens` and `baseVariants` names
// so existing code doesn't break.
// ---------------------------------------------------------------------------
import { springs } from "./springs";
import { duration, ease } from "./transitions";
import { variants } from "./variants";

/** @deprecated Import from individual modules. Kept for backward compat. */
export const motionTokens = {
    spring: springs,
    duration,
    ease,
} as const;

/** @deprecated Import from `variants` instead. */
export const baseVariants = {
    fadeIn: variants.fadeIn,
    slideUp: variants.slideUp,
    scalePop: variants.scalePop,
};
