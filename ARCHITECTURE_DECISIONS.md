# Architecture Decision Records — RecallAI

This document records significant architectural decisions made during the development of RecallAI.  
Each ADR captures the context, decision, and consequences.

---

## ADR-001 — Monorepo with Turborepo + pnpm Workspaces

**Date:** 2026-06-28  
**Status:** Accepted

**Context:**  
RecallAI is a multi-app product (web frontend, Python API, background workers, shared packages). Coordinating these requires shared tooling, consistent versioning, and fast incremental builds.

**Decision:**  
Use Turborepo as the build orchestrator with pnpm workspaces. Packages are scoped under `@recallai/*`.

**Consequences:**  
- ✅ Incremental builds via Turborepo remote caching  
- ✅ Shared packages (`@recallai/ui`, `@recallai/types`, etc.) with workspace symlinks  
- ✅ Single `pnpm install` at root installs all workspaces  
- ⚠️ pnpm strict peer dependency resolution requires explicit version alignment

---

## ADR-002 — Frontend-First Development Strategy

**Date:** 2026-06-28  
**Status:** Accepted

**Context:**  
The team is small and the product vision is clearly defined. There is a risk of over-engineering the backend before validating the UI experience.

**Decision:**  
Complete the entire Design System, Application Shell, and Page Templates using mock data before writing any authentication, database schema, or API endpoint.

**Consequences:**  
- ✅ UI validated with real interaction before backend decisions are locked  
- ✅ Design system freeze enforced before application complexity grows  
- ✅ Page templates serve as living specification for API contracts  
- ⚠️ Backend work begins later; backend team must wait for UI contracts

---

## ADR-003 — Radix UI for Accessible Overlay Primitives

**Date:** 2026-06-28  
**Status:** Accepted

**Context:**  
Building a custom focus trap, portal, and keyboard handler for modals and dialogs is error-prone and fails WCAG requirements in edge cases (browser extensions, screen readers, iOS VoiceOver).

**Decision:**  
Use `@radix-ui/react-dialog` (and other Radix primitives as needed) for all overlay components. Apply custom animation via Framer Motion `AnimatePresence` on Radix-controlled visibility.

**Consequences:**  
- ✅ WCAG 2.1 AA compliant out of the box  
- ✅ Focus trap, Escape key, and `aria-*` attributes handled  
- ✅ Works correctly with browser extensions and screen readers  
- ⚠️ Bundle size increases slightly; mitigated by tree-shaking

---

## ADR-004 — Sonner for Toast Notifications

**Date:** 2026-06-28  
**Status:** Accepted

**Context:**  
Toast notifications require: stacking, auto-dismiss, swipe-to-dismiss, promise chaining, keyboard accessibility, and correct ARIA live regions. These are deceptively complex to implement correctly.

**Decision:**  
Use `sonner` (by Emil Kowalski, also used in shadcn/ui) as the toast primitive. Wrap it in a `useToast()` hook with the RecallAI theme applied.

**Consequences:**  
- ✅ Fully accessible (`role="status"`, `aria-live`)  
- ✅ Supports promise-based toasts (useful for AI operations)  
- ✅ Swipe-to-dismiss on mobile  
- ✅ Zero custom state management required for notifications

---

## ADR-005 — Plugin-Based Command Palette Architecture

**Date:** 2026-06-28  
**Status:** Accepted

**Context:**  
A command palette that works only for static navigation becomes a maintenance bottleneck as the product grows. AI features, workspace actions, and integrations all need to register commands.

**Decision:**  
Architect the command palette as a plugin registry from day one. Each feature module exports a `CommandPlugin` that implements a standard interface, registered via `loadPlugins()`. The UI uses `cmdk` for accessible primitives and `Fuse.js` for fuzzy matching.

**Consequences:**  
- ✅ Adding AI commands later requires only a new plugin file  
- ✅ Commands are co-located with their feature, not centralized in a growing array  
- ✅ `cmdk` handles keyboard navigation and ARIA  
- ⚠️ Slightly more upfront complexity than a static array

---

## ADR-006 — Design System Freeze Policy

**Date:** 2026-06-28  
**Status:** Accepted

**Context:**  
Without a clear boundary, developers tend to create one-off components inside application code. Over time this creates design drift and duplication.

**Decision:**  
After Phase 1A (Component Library) is complete, any UI component that is used in more than one place **must** live in `packages/ui`. Components that are strictly application-specific remain in `apps/web/src/components/`. New components added to `packages/ui` require a Storybook story, unit test, and documentation.

**Consequences:**  
- ✅ Single source of truth for the design language  
- ✅ Prevents design drift as new engineers join  
- ✅ Storybook becomes the official component catalogue  
- ⚠️ Small overhead to promote a component from app to package

---

## ADR-007 — Split Motion Token System

**Date:** 2026-06-28  
**Status:** Accepted

**Context:**  
A single `motion.ts` file becomes unwieldy as spring presets, easing curves, animation variants, and gesture configs grow independently.

**Decision:**  
Split into `packages/ui/src/tokens/motion/`:  
- `springs.ts` — spring physics presets  
- `transitions.ts` — tween durations and easing curves  
- `variants.ts` — reusable `fadeIn`, `slideUp`, `scalePop`, `pageTransition` variants  
- `gestures.ts` — `whileHover`, `whileTap`, `whileDrag` presets  
- `index.ts` — re-exports all under `@recallai/ui`

**Consequences:**  
- ✅ Each concern is maintained independently  
- ✅ Tree-shaking imports possible per module  
- ✅ `@recallai/ui` import surface unchanged

---

## ADR-008 — Visual Regression Testing with Chromatic

**Date:** 2026-06-28  
**Status:** Proposed

**Context:**  
Unit tests verify component behaviour, but cannot catch visual regressions — e.g., a CSS change that makes a button 2px shorter or changes its colour.

**Decision:**  
Integrate Chromatic (or Storybook Visual Tests) after Phase 1A is complete. Every Storybook story becomes a visual snapshot. PRs that change component appearance require a visual review step.

**Consequences:**  
- ✅ Prevents accidental design regressions during refactoring  
- ✅ Visual review is as straightforward as code review  
- ⚠️ Requires a Chromatic account and CI integration
