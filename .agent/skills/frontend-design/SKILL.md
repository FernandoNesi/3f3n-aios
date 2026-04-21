# Frontend Design — Design de Interface

**ID:** SK-05 | **Priority:** HIGH | **Scope:** Core

---

## Purpose
Define structure, composition, and visual consistency rules for UI built in 3F3N projects.

## Component Rules (MUST)

- MUST keep components under 150 lines — split if larger
- MUST separate logic from markup: extract hooks, keep JSX declarative
- MUST type all props explicitly — no implicit prop spreading
- MUST handle loading, empty, and error states for every data-driven component
- MUST NOT use inline styles — Tailwind classes only
- MUST use semantic HTML elements (`nav`, `main`, `section`, `article`, `button`)

## Composition Pattern

```
page.tsx          → layout + data fetching only
[feature]/        → co-located components, hooks, and types
  components/     → presentational, no data fetching
  hooks/          → client logic, side effects
  types.ts        → shared types for this feature
```

## Tailwind Guidelines

- Use design tokens (CSS variables) for brand colors — not hardcoded hex
- Prefer utility composition over custom classes
- Use `cn()` (clsx + twMerge) for conditional class merging
- Avoid `!important` modifiers

## Accessibility Baseline

- All interactive elements must be keyboard-accessible
- Images must have `alt` text
- Forms must have `<label>` for every input
- Color must not be the only conveyor of meaning

## Anti-Patterns
- Logic inside JSX (`map`, `filter`, `reduce` in the render)
- One giant `Page.tsx` with everything in it
- Static designs with no loading or empty state handling

## Tools Allowed
Read, Write, Edit, Glob, Grep
