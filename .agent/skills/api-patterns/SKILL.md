# API Patterns — Padrões de API

**ID:** SK-04 | **Priority:** HIGH | **Scope:** Core

---

## Purpose
Guide API design decisions for 3F3N projects. Choose the right pattern, enforce consistency, prevent common mistakes.

## Decision: Which API Style?

| Scenario | Use |
|---|---|
| Internal Next.js app (fullstack) | tRPC or Server Actions |
| Public API or third-party integration | REST (Route Handlers) |
| Complex querying / multiple consumers | REST with OpenAPI |

Default for 3F3N projects: **tRPC** for internal, **Route Handlers** for public.

## Rules (MUST)

### Response Structure
- MUST return consistent shapes — always `{ data, error, meta? }`
- MUST use correct HTTP status codes (200, 201, 400, 401, 403, 404, 500)
- MUST NOT expose internal error messages or stack traces to clients

### Validation
- MUST validate all inputs with Zod before processing
- MUST return 400 with field-level errors on validation failure

### Auth
- MUST check authentication before any data access
- MUST check authorization (does this user own this resource?) separately from authentication

### Rate Limiting
- MUST implement rate limiting on any public endpoint
- Recommended: Upstash Ratelimit or middleware-level throttle

## Anti-Patterns
- Using verbs in REST endpoints (`/getUser` → `/users/:id`)
- Returning 200 for errors
- Skipping Zod validation and trusting raw request body
- Mixing auth check and business logic in the same function

## Tools Allowed
Read, Write, Edit, Glob, Grep
