# RecallAI Component Contracts

Every component in this repository adheres to a strict 5-pillar contract.

## 1. Directory Structure
```text
Button/
├── index.ts              (Barrel Export)
├── Button.tsx            (Implementation using CVA for variants)
├── Button.test.tsx       (Unit Test suite covering all variants)
├── Button.stories.tsx    (Storybook scenarios)
└── Button.docs.md        (Usage guidelines and edge cases)
```

## 2. Reusability Limits
Components must be purely presentational. They must not make API calls, manage highly specific business state, or contain hardcoded routing logic. They receive data through props and emit events through callbacks.
