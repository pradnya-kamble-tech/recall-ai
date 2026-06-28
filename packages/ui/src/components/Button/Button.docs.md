# Button Primitive

The RecallAI internal button primitive leverages Framer Motion for premium interactions `whileTap` adhering strictly to our `spring.bouncy` motion token.

## Accessibility (A11y)
* **Focus Ring:** When navigated to via Keyboard (`Tab`), it deploys an extremely high contrast `ring-primary`.
* **Semantic Native Elements:** We use `html <button>` (via `motion.button`) to guarantee ARIA roles.
* **Disabled States:** Includes `pointer-events-none` to prevent ghost clicks globally.

## The Glass Variant
The `glass` variant should be heavily favored as an alternate action over standard `outline` buttons inside Layer 1 (Sidebar) or Layer 3 (Modals) to preserve the pure dark space depth.
