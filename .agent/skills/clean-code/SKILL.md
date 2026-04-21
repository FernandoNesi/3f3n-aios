# Clean Code — Código Limpo

**ID:** SK-01 | **Priority:** CRITICAL | **Scope:** Core

---

## Purpose
Enforce pragmatic coding standards that keep the codebase readable, maintainable, and non-bloated.

## Rules (MUST)

- MUST follow SRP: one function, one responsibility
- MUST follow DRY: no duplicated logic
- MUST keep functions under 20 lines (target: 5–10)
- MUST use max 3 function arguments — use an object if more are needed
- MUST use guard clauses over nested if-else
- MUST name variables and functions to reveal intent (`userCount`, not `n`)
- MUST use `isActive`, `hasPermission` form for booleans
- MUST NOT leave console.log, commented-out code, or TODOs in final output
- MUST NOT add abstractions before there are 3+ concrete use cases

## Pre/Post Edit Protocol

Before editing any file:
- Identify all imports and dependencies that reference the target
- Confirm the change does not break existing call sites

After editing:
- Verify the function/component still does exactly one thing
- Run lint before marking the task done

## Anti-Patterns

- Over-engineering before there is a real need
- Generic catch-all functions that do too much
- Abstractions built for hypothetical future requirements

## Tools Allowed
Read, Write, Edit, Glob, Grep
