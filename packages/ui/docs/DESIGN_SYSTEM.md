# RecallAI Design System

This document outlines the core constraints of the RecallAI Design System inside `packages/ui`.

## Core Philosophy
We do not use default generic templates. RecallAI is extremely high contrast, deeply spatial, and optimized for cognitive focus (AI-native workflows).
*   **Grid System:** Base 4px.
*   **Radii:** `0.5rem` (md) is standard for inputs. `1rem` (xl) for Memory Cards.
*   **Theming:** Strict Dark-Mode first utilizing OKLCH spectral tokens to prevent muddy gradients.

## Consuming Tokens
`apps/web` imports `@recallai/ui/tokens/theme.css` into its `globals.css` to bridge Tailwind variables. Do not redeclare colors downstream.
