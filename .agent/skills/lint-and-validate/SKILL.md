# Lint and Validate — Lint e Validação

**ID:** SK-06 | **Priority:** CRITICAL | **Scope:** Core

---

## Purpose
Mandatory quality gate. Runs after every Builder change. Nothing is "done" until this passes.

## Commands (run in order)

```bash
# 1. TypeScript check
npx tsc --noEmit

# 2. ESLint
npx eslint . --ext .ts,.tsx --fix

# 3. (If package.json changed) Dependency security
npm audit --audit-level=high
```

## Pass Criteria

| Check | Required result |
|---|---|
| TypeScript | Zero errors |
| ESLint | Zero errors (warnings acceptable) |
| npm audit | No high or critical vulnerabilities |

## Fail Protocol

1. Parse the error output
2. Fix the specific issue
3. Re-run the failed check
4. Repeat until all pass
5. Never suppress errors with `// eslint-disable` or `@ts-ignore` unless accompanied by an explanatory comment

## Hard Rule

Builder MUST NOT report a task as complete while any check is failing. No exceptions.

## Tools Allowed
Read, Bash
