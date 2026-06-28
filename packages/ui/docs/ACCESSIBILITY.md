# RecallAI Accessibility (A11y) Blueprint

This is a mandatory checklist for every component merged into `packages/ui`.

## Checklist
- [ ] **Keyboard Navigable:** Can I reach this element using only `Tab`?
- [ ] **Focus Visible:** Does it deploy the high-contrast `ring-2 ring-primary ring-offset-2` outline when in focus? Never deploy `outline: none` without a fallback.
- [ ] **Screen Reader Compatible:** Are `aria-label` or `aria-describedby` tags present for icon-only inputs?
- [ ] **Color Contrast:** Does typography maintain at least a WCAG AA (4.5:1) contrast ratio against its background?
- [ ] **Reduced Motion:** Do rapid scaling/sliding animations gracefully fallback if `prefers-reduced-motion` is enabled OS-wide?

Headless UI primitives (Radix via shadcn) are encouraged because they natively handle focus trapping and `aria-*` state reflections.
