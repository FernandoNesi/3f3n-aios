# Basic Security — Segurança Básica

**ID:** SK-08 | **Priority:** HIGH | **Scope:** Core

---

## Purpose
Fast, practical security validation for landing pages, funnels, and MVP SaaS products. No heavy analysis — just the checks that actually matter.

## Checks (in order)

### 1. Secrets Scan
Search for hardcoded credentials in all changed files:
```bash
grep -rn "sk_live\|pk_live\|api_key\|secret\|password\s*=" --include="*.ts" --include="*.tsx" --include="*.js" .
```
Any match → **HOLD**.

### 2. Env Var Audit
- Every `process.env.VARIABLE` referenced in code must exist in `.env.example`
- Server-only vars must NOT be prefixed `NEXT_PUBLIC_`
- Client vars (`NEXT_PUBLIC_`) must NOT contain secrets

### 3. Auth Route Check
- Every route that returns user-specific data must have an auth guard
- Middleware must protect `/dashboard`, `/api/user/*`, and any route behind login
- Confirm: unauthenticated request to a protected route returns 401, not data

### 4. Input Sanitization
- All form inputs and API body params must be validated with Zod before use
- No raw `req.body` passed directly to database queries
- No `dangerouslySetInnerHTML` unless explicitly required and sanitized

### 5. Dependency Check (only if package.json changed)
```bash
npm audit --audit-level=high
```
High or Critical findings → **HOLD**.

## Decision Rule

One HOLD condition = Security outputs **HOLD**.  
All checks pass = Security outputs **CLEAR**.

## Tools Allowed
Read, Grep, Glob, Bash
