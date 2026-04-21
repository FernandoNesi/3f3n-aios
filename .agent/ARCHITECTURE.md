# 3F3N AI OS — Architecture Reference

**Version:** 1.0  
**Stack:** Next.js App Router · TypeScript · Tailwind · Vercel/Railway  
**Target:** Landing pages · Funnels · MVP SaaS · AI products  

---

## System Structure

```
.agent/
├── agents/
│   ├── guardian.md              # Rules enforcement, routing, gates
│   ├── builder.md               # Code generation, feature implementation
│   ├── reviewer.md              # Code review, quality gate
│   └── security.md              # Secrets, env vars, auth, input validation
│
├── skills/
│   ├── clean-code/              # SK-01 — Coding standards
│   ├── code-review-checklist/   # SK-02 — Review framework
│   ├── nextjs-react-expert/     # SK-03 — Next.js App Router patterns
│   ├── api-patterns/            # SK-04 — API design decisions
│   ├── frontend-design/         # SK-05 — UI structure and composition
│   ├── lint-and-validate/       # SK-06 — Mandatory quality gate
│   ├── deployment-procedures/   # SK-07 — Deploy and rollback
│   ├── basic-security/          # SK-08 — Lightweight security validation
│   │
│   ├── _extensions/             # Opt-in, load when needed
│   │   └── systematic-debugging/  # SK-EXT-01 — For complex bugs
│   │
│   └── _saas/                   # SaaS module scope only
│       └── database-design/     # SK-SAAS-01 — Schema, ORM, migrations
│
├── workflows/
│   ├── 3f3n-create.md           # /3f3n-create — New feature
│   ├── 3f3n-deploy.md           # /3f3n-deploy — Deploy gate
│   └── 3f3n-saas.md             # /3f3n-saas — Auth/DB/billing
│
└── rules/
    └── 3f3n-rules.md            # 10 global rules — enforced by Guardian
```

---

## Fixed Flow

```
Guardian → Builder → Reviewer → Security → Guardian → Done
```

This flow is invariant. Every workflow follows it.

---

## Agents at a Glance

| Agent | Does | Does NOT |
|---|---|---|
| Guardian | Enforce rules, route tasks, check gates | Write code, fix bugs |
| Builder | Build features, run lint | Review code, audit security |
| Reviewer | Review code, tag issues | Write code, check secrets |
| Security | Validate secrets/env/auth/inputs | Write features, do CVSS scoring |

---

## Skill Scopes

| Scope | Load when |
|---|---|
| Core (SK-01 to SK-08) | Always — every workflow |
| Extensions (`_extensions/`) | Opt-in — Guardian decides based on task |
| SaaS (`_saas/`) | Only during `/3f3n-saas` workflow |

---

## Design Principles

**Fast over thorough.** Speed is the default. Depth is opt-in via extensions.

**Next.js first.** App Router, RSC, Server Actions, Vercel — every decision defaults here.

**Lint is the only hard gate.** Broken code does not proceed. Everything else is judgment.

**Testing is contextual.** Written when risk justifies it. Never mandatory.

**One skill, one concern.** Overlap between skills is a bug in the OS.

**Escalate, don't self-resolve.** Guardian cannot resolve agent conflicts. Humans decide.

---

## Adding to the OS

**New skill:** Must define ID, purpose, MUST rules, output format, and tools allowed. Place in `skills/` (core), `skills/_extensions/` (opt-in), or `skills/_saas/` (SaaS scope).

**New workflow:** Must define trigger, full agent sequence, inputs, and output format. Must follow the fixed flow.

**New agent:** Requires Guardian rule update and a documented boundary (what it does and does NOT do).
