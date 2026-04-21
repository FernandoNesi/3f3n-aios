# Code Review Checklist — Checklist de Revisão

**ID:** SK-02 | **Priority:** HIGH | **Scope:** Core

---

## Purpose
Give the Reviewer a fast, consistent checklist for evaluating Builder output. Severity-tagged so feedback is unambiguous.

## Severity Tags

- 🔴 **Blocking** — must fix before proceeding
- 🟡 **Suggestion** — worth improving, not a blocker
- 🟢 **Minor** — optional, style preference

## Checklist

### Correctness
- 🔴 Does the code do what the task description requires?
- 🔴 Are error states and null cases handled?
- 🔴 Are async operations properly awaited?

### Structure
- 🔴 Are props and function parameters typed? No implicit `any`?
- 🟡 Is logic kept out of JSX/template layer?
- 🟡 Are components/functions reused where obviously applicable?

### API Contracts
- 🔴 Are response shapes consistent with the rest of the codebase?
- 🔴 Are correct HTTP status codes returned?
- 🟡 Is error messaging user-safe (no stack traces exposed)?

### AI-Generated Code Patterns
- 🔴 Are logical chains verified, not just plausible-looking?
- 🔴 Are external system assumptions validated (not assumed)?
- 🟡 Are prompts or LLM inputs sanitized if present?

### Quality
- 🟡 Are variable and function names intention-revealing?
- 🟢 Is there unnecessary complexity that could be simplified?

## Output
Return findings grouped by severity. If no 🔴 issues — output APPROVED.

## Tools Allowed
Read, Grep, Glob
