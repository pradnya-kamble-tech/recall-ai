# Input Component

A flexible, accessible text input with support for labels, helper text, validation errors, and icon slots.

## Usage

```tsx
import { Input } from "@recallai/ui";

// Basic
<Input label="Email" placeholder="you@recall.ai" />

// With validation error
<Input
  label="Email"
  error="Please enter a valid email."
  defaultValue="not-an-email"
/>

// With icons
<Input
  label="Search"
  placeholder="Search memories…"
  leftIcon={<Search className="h-4 w-4" />}
  isLoading={isSearching}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Label above the input |
| `helperText` | `string` | — | Descriptive text below |
| `error` | `string` | — | Error message (overrides helperText, sets aria-invalid) |
| `leftIcon` | `ReactNode` | — | Icon inside left edge |
| `rightIcon` | `ReactNode` | — | Icon inside right edge |
| `isLoading` | `boolean` | `false` | Shows spinner (aria-busy), replaces rightIcon |
| `variant` | `default \| ghost \| search` | `default` | Visual style |
| `size` | `sm \| default \| lg` | `default` | Height and text size |
| `disabled` | `boolean` | — | Native disabled attribute |

Plus all standard `<input>` HTML attributes.

## Accessibility

- `label` connects to `input` via `htmlFor`/`id` (auto-generated if not provided)
- `error` message is an `aria-live` `role="alert"` region
- `aria-invalid` is set automatically when `error` is truthy
- `aria-describedby` links input to its helper/error text
- `aria-busy` is set when `isLoading` is true
