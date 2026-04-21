# Next.js & React Expert — Especialista Next.js/React

**ID:** SK-03 | **Priority:** CRITICAL | **Scope:** Core

---

## Purpose
Apply Next.js App Router best practices and React performance patterns on every feature built for 3F3N projects.

## Core Principle
> Eliminate data waterfalls first. Optimize bundles second. Micro-optimize last.

## Rules (MUST)

### Server Components (default)
- MUST default to Server Components — only add `"use client"` when necessary
- MUST fetch data in Server Components or Server Actions, not in `useEffect`
- MUST use parallel data fetching (`Promise.all`) for independent requests

### Bundle
- MUST use dynamic imports (`next/dynamic`) for heavy client components
- MUST NOT import entire libraries for single functions
- MUST NOT use barrel exports (`index.ts`) that re-export everything

### Data & State
- MUST colocate data fetching with the component that needs it
- MUST use `loading.tsx` and `error.tsx` for async route segments
- MUST use Server Actions for form mutations instead of API routes when possible

### Performance
- MUST use `next/image` for all images — no raw `<img>` tags
- MUST use `next/font` for fonts — no Google Fonts `<link>` tags
- MUST add `generateMetadata` for all public pages

## Stack
- Router: App Router (no Pages Router)
- Styling: Tailwind CSS
- Language: TypeScript strict mode
- State: Server-first; Zustand or Jotai for client state only when needed

## Anti-Patterns
- Wrapping entire app in `"use client"`
- Fetching data in `useEffect` when a Server Component would work
- Creating one mega-component instead of composing small ones

## Tools Allowed
Read, Write, Edit, Bash, Glob, Grep
