# Database Design — Design de Banco de Dados

**ID:** SK-SAAS-01 | **Priority:** HIGH | **Scope:** SaaS only

---

## Purpose
Guide schema design, ORM selection, and migration strategy for SaaS products built on 3F3N. Sized for MVPs, not enterprise systems.

## ORM Selection

| Scenario | Recommended ORM |
|---|---|
| New project, serverless DB | Drizzle ORM |
| Existing Prisma project | Prisma (stay consistent) |
| Simple SQLite / local | Drizzle |

Default: **Drizzle + Neon (PostgreSQL serverless)**.

## Schema Rules (MUST)

- MUST include `id`, `createdAt`, `updatedAt` on every table
- MUST add `userId` or `tenantId` foreign key on any user-owned resource
- MUST define indexes on all foreign keys and columns used in WHERE clauses
- MUST NOT store JSON blobs for data that will be queried or filtered
- MUST NOT use `SELECT *` — always select specific columns

## Tenant Isolation (SaaS)

Use Row Level Security (RLS) or application-level filtering:
```typescript
// Always scope queries to the current user/tenant
const posts = await db.query.posts.findMany({
  where: eq(posts.userId, session.user.id)
})
```
Never return unscoped queries for user-owned data.

## Migration Rules

- MUST use the ORM migration system — no raw SQL patches
- MUST test migrations on a staging database before production
- MUST be able to roll back any migration
- MUST NOT run destructive migrations (column drops, renames) without a transition period

## Anti-Patterns
- Storing arrays of IDs as comma-separated strings
- Skipping indexes until performance becomes a problem
- Designing schema for hypothetical future requirements

## Tools Allowed
Read, Write, Edit, Glob, Grep, Bash
