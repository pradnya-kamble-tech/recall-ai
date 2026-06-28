# RecallAI Motion Guidelines

Do not arbitrary specify `duration` or `stiffness` across the codebase.

## The Principles
Animations exist to reinforce spatial intent (e.g., closing a modal implies moving backward in Z-space), not for decoration.

## Presets (`motionTokens`)
Available globally via `import { motionTokens } from "@recallai/ui"`:
*   `spring.bouncy`: Micro-interactions requiring physical feedback (clicking a button).
*   `spring.smooth`: Fluid entrances (Sidebar, Omni-Node floating up).
*   `ease.productive`: Ultra-fast standard transitions where spring physics would distract (opacity fades).

**Note:** Components must honor accessibility flags. If `reduce-motion` is detected in the environment, springs fallback to instant transitions or safe fades.
