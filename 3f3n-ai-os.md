# 3F3N AI OS — Core Architecture Document
> Version 1.0 | Designed for: Next.js · SaaS · Automation · Conversational Agents  
> Source repos analyzed: `vudovn/antigravity-kit` · `sickn33/antigravity-awesome-skills`

---

## 0. Executive Summary

The **3F3N AI OS** is a minimal, opinionated agent operating system built on top of the Antigravity framework. It is not a collection of files — it is a **set of behaviors, constraints, and composable workflows** that govern how AI agents operate inside a 3F3N project.

The OS is structured around three layers:

```
Skills  →  Raw intelligence (what an agent knows how to do)
Agents  →  Governed personas (who executes the work)
Workflows → Procedures (how complex tasks get done end-to-end)
```

Everything here follows the principle: **minimal surface, maximum leverage**.

---

## 1. Curated Skill List

> **Selection criteria:** High reusability across projects, direct measurable impact, compatibility with Next.js/SaaS stacks, and composability with other skills. 15 skills selected from 1,460+ candidates.

---

### 1.1 Skills from `vudovn/antigravity-kit`

---

#### SK-01 · `systematic-debugging` — Depuração Sistemática

**Rationale:** Replaces random trial-and-error with a reproducible, evidence-based 4-phase method (Reproduce → Isolate → Understand → Fix & Verify). Universally applicable across every language and stack.

**Key behavior:** Forces agents to produce a minimal reproduction before proposing any fix. Blocks "random modification" anti-pattern.

**Tools allowed:** Read, Glob, Grep  
**Output format:** Symptom → Evidence → Hypothesis list → Root cause → Before/After diff → Prevention measure

---

#### SK-02 · `nextjs-react-expert` — Especialista Next.js/React

**Rationale:** 57 performance rules organized by impact tier. Prioritizes Server Components, eliminates data waterfalls, optimizes bundle size. Directly addresses the most common Next.js failure modes in production SaaS apps.

**Key behavior:** "Eliminate waterfalls first, optimize bundles second." Uses a diagnostic decision tree before any optimization.

**Tools allowed:** Read, Write, Edit, Bash  
**Output format:** Impact-tiered recommendations (🔴 Critical → ⚪ Low) with before/after code

---

#### SK-03 · `vulnerability-scanner` — Varredura de Vulnerabilidades

**Rationale:** OWASP Top 10:2025 coverage including the new Supply Chain (A03) and Exceptional Conditions (A10) categories. Includes automated Python assessment script. Essential for any SaaS handling user data.

**Key behavior:** Threat model before scan. Formula: `Risk = Likelihood × Impact`. Never skips supply chain analysis.

**Tools allowed:** Read, Grep, Glob, Bash  
**Output format:** Attack surface map → CVSS-scored findings → Remediation steps (by severity)

---

#### SK-04 · `tdd-workflow` — Fluxo TDD

**Rationale:** RED-GREEN-REFACTOR cycle enforced as a hard constraint, not a suggestion. Includes AI-Augmented TDD pattern (separate agents for test writing, implementation, and optimization). Prevents shipping untested features.

**Key behavior:** "The test is the specification. If you can't write a test, you don't understand the requirement."

**Tools allowed:** Read, Write, Edit, Bash  
**Output format:** Test file (RED) → Minimal implementation (GREEN) → Refactored code → Coverage report

---

#### SK-05 · `api-patterns` — Padrões de API

**Rationale:** Decision framework for REST vs GraphQL vs tRPC — adapted for 2025 stacks. Includes versioning strategy, rate limiting, authentication, and security testing. Prevents the common mistake of defaulting to REST for everything.

**Key behavior:** Starts with "who consumes this API?" before any design decision. Enforces consistent response structures.

**Tools allowed:** Read, Write, Edit  
**Output format:** API contract (OpenAPI or tRPC router) + decision rationale

---

#### SK-06 · `clean-code` — Código Limpo

**Rationale:** Pragmatic coding standards enforced as hard rules: max 20 lines per function, max 3 arguments, guard clauses over nesting, SRP/DRY/KISS/YAGNI. Includes mandatory pre/post-edit verification protocol for agents.

**Key behavior:** Agents must verify all imports/dependencies before editing and run validation after. "The user wants working code, not a programming lesson."

**Tools allowed:** Read, Write, Edit, Glob, Grep  
**Output format:** Refactored code + validation pass/fail report

---

#### SK-07 · `architecture` — Arquitetura de Sistema

**Rationale:** ADR (Architecture Decision Record) framework with trade-off analysis templates. Includes pattern selection decision trees and anti-pattern guidance for MVP, SaaS, and Enterprise reference implementations.

**Key behavior:** "Simplicity is the ultimate sophistication." Complexity is only added when simpler alternatives have been documented and rejected.

**Tools allowed:** Read, Glob, Grep  
**Output format:** ADR document → Pattern selection rationale → Constraints log

---

#### SK-08 · `database-design` — Design de Banco de Dados

**Rationale:** Schema design, ORM selection (Drizzle vs Prisma vs Kysely), indexing strategy, and safe migration patterns for serverless databases (Neon, Turso). Critical for multi-tenant SaaS where schema mistakes are expensive.

**Key behavior:** Never defaults to PostgreSQL. Always asks about tenant isolation model before schema design.

**Tools allowed:** Read, Write, Edit, Glob, Grep  
**Output format:** ERD (text) + schema file + migration plan + index justification

---

#### SK-09 · `deployment-procedures` — Procedimentos de Deploy

**Rationale:** Zero-downtime deployment (rolling, blue-green, canary) with platform-specific rollback procedures (Vercel, Railway, Docker). Defines emergency protocols and anti-patterns (e.g., "never deploy on Friday").

**Key behavior:** Five-phase pipeline: Prepare → Backup → Deploy → Verify → Confirm/Rollback. Rollback is always planned before deployment begins.

**Tools allowed:** Read, Bash  
**Output format:** Deployment checklist → Deploy log → Health check report → Rollback instructions

---

#### SK-10 · `lint-and-validate` — Lint e Validação

**Rationale:** Mandatory quality gate that runs after every code change. ESLint + TypeScript + Bandit + Ruff. No code is considered "done" until it passes. Prevents broken code from reaching review or production.

**Key behavior:** "Submitting code with FINAL AUDIT failures is NOT allowed." Enforced as a hard stop, not a warning.

**Tools allowed:** Read, Bash  
**Output format:** Lint report → Type coverage → Security flags → Pass/Fail decision

---

#### SK-11 · `code-review-checklist` — Checklist de Code Review

**Rationale:** AI-aware review framework covering correctness, security (including prompt injection), performance, code quality, and testing. Uses emoji severity system (🔴 blocking, 🟡 suggestion, 🟢 minor, ❓ question) for unambiguous communication.

**Key behavior:** Explicitly checks for AI-generated code anti-patterns: unverified logical chains, unsafe external system assumptions, prompt injection surfaces.

**Tools allowed:** Read, Glob, Grep  
**Output format:** Structured review with severity-tagged comments per file

---

#### SK-12 · `intelligent-routing` — Roteamento Inteligente

**Rationale:** Auto-selects agents based on request keywords, domain, and complexity. Eliminates the need for users to know which agent handles what. Essential for the orchestration layer of the 3F3N AI OS.

**Key behavior:** Three complexity tiers (Simple → Moderate → Complex) with corresponding single-agent, sequential, or orchestrated responses. Always notifies user which expertise is being applied.

**Tools allowed:** Read  
**Output format:** Routing decision log → Agent invocation record

---

### 1.2 Skills from `sickn33/antigravity-awesome-skills`

---

#### SK-13 · `autonomous-agents` — Agentes Autônomos

**Rationale:** Defines the behavioral pattern for agents that decompose goals, plan multi-step actions, and self-correct without continuous human input. Foundation for the Builder and Security agents in the 3F3N OS.

**Key behavior:** Goal → Decompose → Plan → Execute → Observe → Self-correct loop. Explicit failure modes and escalation triggers defined.

**Tools allowed:** All (governed by agent)  
**Output format:** Execution plan → Step-by-step log → Final output + self-assessment

---

#### SK-14 · `pricing-strategy` — Estratégia de Precificação

**Rationale:** SaaS monetization design: packaging, willingness-to-pay analysis, tier structure, and upgrade triggers. Directly supports the `/3f3n-saas` workflow and any billing implementation.

**Key behavior:** Starts from customer value, not cost. Defines free tier boundaries and expansion revenue triggers.

**Tools allowed:** Read, Write  
**Output format:** Pricing model document → Tier matrix → Upgrade trigger map

---

#### SK-15 · `ddd-strategic-design` — Design Estratégico DDD

**Rationale:** Bounded context modeling for complex SaaS domains. Essential for multi-tenant architecture where tenant isolation must be enforced at the domain level, not just the database level.

**Key behavior:** Maps bounded contexts before any code. Defines explicit context boundaries and integration patterns (ACL, shared kernel, conformist).

**Tools allowed:** Read, Write  
**Output format:** Context map → Aggregate definitions → Integration contract

---

## 2. System Structure

```
.agent/
│
├── agents/
│   ├── guardian.md          # Governance & rules enforcement
│   ├── builder.md           # Execution & code generation
│   ├── reviewer.md          # Quality checks & validation
│   ├── security.md          # Security audits & vulnerability detection
│   └── planner.md           # Strategic planning (optional, on-demand)
│
├── skills/
│   ├── systematic-debugging/
│   │   └── SKILL.md
│   ├── nextjs-react-expert/
│   │   └── SKILL.md
│   ├── vulnerability-scanner/
│   │   └── SKILL.md
│   ├── tdd-workflow/
│   │   └── SKILL.md
│   ├── api-patterns/
│   │   └── SKILL.md
│   ├── clean-code/
│   │   └── SKILL.md
│   ├── architecture/
│   │   └── SKILL.md
│   ├── database-design/
│   │   └── SKILL.md
│   ├── deployment-procedures/
│   │   └── SKILL.md
│   ├── lint-and-validate/
│   │   └── SKILL.md
│   ├── code-review-checklist/
│   │   └── SKILL.md
│   ├── intelligent-routing/
│   │   └── SKILL.md
│   ├── autonomous-agents/
│   │   └── SKILL.md
│   ├── pricing-strategy/
│   │   └── SKILL.md
│   └── ddd-strategic-design/
│       └── SKILL.md
│
├── workflows/
│   ├── 3f3n-create.md       # Scaffold new feature or module
│   ├── 3f3n-fix.md          # Diagnose and fix a bug
│   ├── prepare-for-deploy.md # Pre-deployment checklist
│   └── 3f3n-saas.md         # SaaS-specific: auth, billing, tenant isolation
│
├── rules/
│   └── 3f3n-rules.md        # Global constraints for all agents
│
└── ARCHITECTURE.md           # This document (living reference)
```

---

## 3. Core Agents

> Each agent is a governed persona with explicit capabilities, constraints, and activation triggers. Agents cannot self-expand their scope.

---

### 3.1 Guardian — Guardião

**Role:** Governance and rules enforcement. The Guardian is the meta-agent that ensures all other agents operate within 3F3N's defined boundaries.

**Capabilities:**
- Reads and enforces `rules/3f3n-rules.md` before any workflow executes
- Intercepts cross-domain violations (e.g., Builder attempting security analysis)
- Enforces naming conventions, output formats, and skill standards
- Blocks any deployment workflow that has not passed the security gate
- Maintains an audit log of all agent activations and their outputs

**Constraints:**
- Does not write application code
- Does not execute builds or deployments
- Does not override another agent's domain decision unilaterally — escalates to human review

**Activation triggers:** Any workflow start, any cross-agent handoff, any rule violation detection

**Tools allowed:** Read, Grep, Glob  
**Model:** Fastest available (rules enforcement is read-heavy, not reasoning-heavy)

**Output format:**
```
GUARDIAN REPORT
- Rule check: [PASS | FAIL]
- Violations: [list or "none"]
- Blocked actions: [list or "none"]
- Escalations: [list or "none"]
```

---

### 3.2 Builder — Construtor

**Role:** Execution and code generation. The Builder implements features, scaffolds modules, and writes production-grade code based on specifications produced by the Planner or user input.

**Capabilities:**
- Scaffolds new features using the `/3f3n-create` workflow
- Applies `nextjs-react-expert`, `api-patterns`, `database-design`, and `clean-code` skills
- Generates TypeScript-strict code with zero `any` types
- Creates unit and integration tests alongside implementation (TDD via `tdd-workflow`)
- Runs `lint-and-validate` after every code block before reporting done

**Constraints:**
- Does not make architectural decisions — defers to Planner or user
- Does not perform security audits — hands off to Security agent
- Does not merge or deploy code — hands off to the deploy workflow
- Maximum function length: 20 lines. Maximum file changes per session: scoped to the assigned task

**Activation triggers:** `/3f3n-create`, feature build requests, code generation tasks

**Tools allowed:** Read, Write, Edit, Bash, Glob, Grep  
**Model:** Highest capability available

**Output format:**
```
BUILDER OUTPUT
- Files created/modified: [list with line counts]
- Tests written: [list]
- Lint result: [PASS | FAIL with details]
- TypeScript check: [PASS | FAIL]
- Notes: [any deferred decisions or open questions]
```

---

### 3.3 Reviewer — Revisor

**Role:** Quality checks and validation. The Reviewer is the last human-facing gate before any code is considered complete. It applies the `code-review-checklist` skill with AI-aware evaluation.

**Capabilities:**
- Reviews all code produced by the Builder using `code-review-checklist`
- Checks for AI-generated anti-patterns (unverified logic chains, unsafe external assumptions)
- Validates test coverage against the feature specification
- Produces severity-tagged feedback (🔴 blocking, 🟡 suggestion, 🟢 minor)
- Can block the Builder's output from proceeding to deploy until blocking issues are resolved

**Constraints:**
- Does not rewrite code — reports findings, requests Builder to fix
- Does not perform security penetration testing — flags for Security agent
- Maximum review depth: the files explicitly changed in the current task

**Activation triggers:** After Builder completes any task, before `/prepare-for-deploy`

**Tools allowed:** Read, Grep, Glob  
**Model:** High capability (judgment-heavy task)

**Output format:**
```
REVIEWER REPORT
- Files reviewed: [list]
- 🔴 Blocking issues: [list or "none"]
- 🟡 Suggestions: [list or "none"]
- 🟢 Minor notes: [list or "none"]
- ❓ Questions: [list or "none"]
- Decision: [APPROVED | BLOCKED — reason]
```

---

### 3.4 Security — Segurança

**Role:** Security audits and vulnerability detection. Security is the dedicated threat analysis agent, triggered on any authentication, authorization, data handling, or external integration change.

**Capabilities:**
- Runs full `vulnerability-scanner` analysis (OWASP Top 10:2025)
- Performs supply chain audit on any dependency changes
- Maps attack surface for new features and API endpoints
- Checks for hardcoded secrets, unsafe deserialization, missing security headers
- Produces CVSS-scored findings with remediation priority

**Constraints:**
- Does not fix vulnerabilities — documents them for Builder to resolve
- Does not access production systems or run live penetration tests without explicit human authorization
- Must re-run after Builder resolves any 🔴 Critical finding

**Activation triggers:** Any auth/authorization change, new external API integration, `/3f3n-saas` workflow, `/prepare-for-deploy`

**Tools allowed:** Read, Grep, Glob, Bash (static analysis only)  
**Model:** Highest capability available

**Output format:**
```
SECURITY REPORT
- Scan scope: [files/endpoints analyzed]
- Critical (🔴): [CVSS score + description + remediation]
- High (🟠): [list]
- Medium (🟡): [list]
- Supply chain: [dependencies flagged or "clean"]
- Decision: [CLEAR | HOLD — reason]
```

---

### 3.5 Planner — Planejador *(Optional — activate on complex tasks)*

**Role:** Strategic decomposition and task planning. Planner is invoked when a request spans multiple domains, requires architectural decisions, or cannot be directly executed without a written plan.

**Capabilities:**
- Decomposes complex requests into typed subtasks (BUILD / REVIEW / SECURITY / DEPLOY)
- Selects which agents to invoke, in what order, with what inputs
- Produces a `PLAN.md` that Guardian validates before any Builder work begins
- Applies `architecture` and `ddd-strategic-design` skills for structural decisions
- Estimates complexity and flags decisions that require human confirmation

**Constraints:**
- Does not write application code
- Does not execute workflows — creates the plan for Guardian to authorize and agents to execute
- Plans expire after the task is complete — no persistent global planning state

**Activation triggers:** `/3f3n-create` for multi-module features, `/3f3n-saas`, multi-agent orchestration requests

**Tools allowed:** Read, Write, Glob, Grep  
**Model:** Highest capability available

**Output format:** `PLAN.md` with task breakdown, agent assignments, dependencies, success criteria, and risk flags

---

## 4. Core Workflows

> Workflows are executable procedures triggered by slash commands. Each workflow defines its trigger, required inputs, agent sequence, and expected output.

---

### W-01 · `/3f3n-create` — Criar Funcionalidade

**Purpose:** Scaffold a new feature or module from specification to working, tested, reviewed code.

**Trigger:** `/3f3n-create [description]`

**Required inputs:**
- Feature description (what it does, who uses it)
- Target layer (frontend / backend / fullstack / API / database)
- Acceptance criteria (or prompt the user to define them)

**Agent sequence:**

```
1. Guardian  → Validate rules, check no existing duplicate feature
2. Planner   → Decompose into typed subtasks, produce PLAN.md (if complex)
3. Builder   → Implement code + tests, run lint-and-validate
4. Reviewer  → Code review, block on 🔴 issues
5. Builder   → Fix blocking issues (if any)
6. Reviewer  → Re-approve
7. Guardian  → Final rules check, mark task complete
```

**Skills activated:** `clean-code`, `nextjs-react-expert`, `api-patterns`, `tdd-workflow`, `lint-and-validate`, `code-review-checklist`

**Output:**
- Feature code (files + tests)
- Reviewer approval report
- Summary: files created, tests written, decisions made

**Constraints:**
- Builder cannot mark task complete without Reviewer approval
- No feature may be created without at least one test file
- Planner step is required for features touching ≥3 files or ≥2 domains

---

### W-02 · `/3f3n-fix` — Corrigir Bug

**Purpose:** Diagnose the root cause of a bug and implement a verified fix without introducing regressions.

**Trigger:** `/3f3n-fix [bug description or error]`

**Required inputs:**
- Error message or unexpected behavior description
- Steps to reproduce (or collect from user if missing)
- Affected files or area (optional — Security deduces if not provided)

**Agent sequence:**

```
1. Guardian  → Check scope, activate systematic-debugging skill
2. Builder   → Phase 1-2: Reproduce + Isolate (read-only investigation)
3. Builder   → Phase 3: Understand (5 Whys root cause analysis)
4. Builder   → Phase 4: Implement fix + write regression test
5. Builder   → Run lint-and-validate
6. Reviewer  → Confirm fix correctness, check for side effects
7. Guardian  → Mark resolved, log root cause for future reference
```

**Skills activated:** `systematic-debugging`, `clean-code`, `lint-and-validate`, `code-review-checklist`

**Output:**
```
BUG REPORT
- Symptom: [description]
- Root cause: [5 Whys conclusion]
- Fix: [before/after diff]
- Regression test: [file + test name]
- Prevention: [what prevents recurrence]
```

**Constraints:**
- Builder cannot propose a fix before completing Phase 1 (reproduction confirmed)
- Every fix must include a regression test — no exceptions
- Fixes touching auth/security code automatically trigger Security agent review

---

### W-03 · `/prepare-for-deploy` — Preparar Deploy

**Purpose:** Execute the complete pre-deployment checklist to ensure code is production-ready. This workflow is a gate — it either clears or blocks the deployment.

**Trigger:** `/prepare-for-deploy [target: staging | production]`

**Required inputs:**
- Deployment target (staging or production)
- Summary of changes since last deploy (or auto-detect from git log)

**Agent sequence:**

```
1. Guardian  → Confirm all previous tasks are Reviewer-approved
2. Builder   → Run full lint-and-validate (TypeScript, ESLint, security audit)
3. Security  → Full vulnerability scan on changed files + dependency audit
4. Reviewer  → Final code review pass on all changed files
5. Guardian  → Compile deployment clearance report
```

**Skills activated:** `lint-and-validate`, `vulnerability-scanner`, `code-review-checklist`, `deployment-procedures`

**Output:**
```
DEPLOYMENT CLEARANCE REPORT
- Target: [staging | production]
- Code quality: [PASS | FAIL]
- Security scan: [CLEAR | HOLD — findings]
- Review status: [APPROVED | BLOCKED]
- Bundle size: [current vs baseline]
- Environment variables: [verified | missing list]
- Decision: [DEPLOY AUTHORIZED | BLOCKED — reason]
```

**Constraints:**
- Production deployments require both Security CLEAR and Reviewer APPROVED
- Any 🔴 Critical security finding blocks deployment unconditionally
- Staging deployments may proceed with 🟡 findings if documented

---

### W-04 · `/3f3n-saas` — Módulo SaaS

**Purpose:** Implement or audit SaaS-specific concerns: authentication, billing integration, and tenant isolation. This workflow treats multi-tenancy as a first-class architectural constraint, not an afterthought.

**Trigger:** `/3f3n-saas [module: auth | billing | tenancy | all]`

**Required inputs:**
- Module selection (auth / billing / tenancy / all)
- Tenant model (schema-per-tenant / row-level-security / hybrid)
- Auth provider (Clerk / NextAuth / Auth.js / custom)
- Billing provider (Stripe / LemonSqueezy / Paddle)

**Agent sequence:**

```
1. Guardian  → Validate tenant model choice, load ddd-strategic-design
2. Planner   → Map bounded contexts (Auth, Billing, Tenant, User domains)
3. Security  → Threat model for selected modules (auth bypass, data leakage, billing manipulation)
4. Builder   → Implement selected module(s) with Security constraints embedded
5. Builder   → Write integration tests for tenant isolation boundaries
6. Security  → Re-scan implemented code
7. Reviewer  → Final review
8. Guardian  → Generate SaaS compliance summary
```

**Skills activated:** `ddd-strategic-design`, `database-design`, `api-patterns`, `vulnerability-scanner`, `tdd-workflow`, `pricing-strategy` (billing only)

**Sub-module behaviors:**

**Auth module:**
- Implement session management, RBAC, and MFA hooks
- Enforce zero-trust: every request is authenticated, every resource is authorized
- Test: unauthenticated access attempt, cross-tenant session attempt, privilege escalation attempt

**Billing module:**
- Integrate payment provider webhooks with idempotency keys
- Implement usage metering and limit enforcement
- Test: payment failure handling, webhook replay attack, subscription state transitions

**Tenancy module:**
- Enforce Row Level Security (RLS) or schema isolation at database layer
- Implement tenant context propagation across the request lifecycle
- Test: cross-tenant data access attempt (must fail), tenant deletion cascade, tenant onboarding

**Output:**
```
3F3N SAAS REPORT
- Bounded contexts mapped: [list]
- Auth: [implemented | skipped] — provider, patterns used
- Billing: [implemented | skipped] — provider, webhook strategy
- Tenancy: [implemented | skipped] — isolation model, RLS rules
- Security findings: [list or "clear"]
- Tests written: [list with isolation test results]
- Open decisions: [list for human review]
```

---

## 5. Integration Plan with Antigravity

> How to plug the 3F3N AI OS into the existing Antigravity repositories.

### 5.1 From `vudovn/antigravity-kit`

The kit provides the structural foundation (`.agent/` directory schema, agent format, skill format, workflow format). The 3F3N OS is **a specialized instantiation** of this framework — not a fork.

**Integration steps:**

1. **Bootstrap:** Run `npx @vudovn/ag-kit init` in the project root. This creates the base `.agent/` structure.

2. **Replace default agents:** The kit ships with 20 generic specialist agents. Replace with the 4 (+ 1 optional) 3F3N agents defined in this document. The 3F3N agents are more constrained and opinionated — they enforce governance that generic agents don't.

3. **Cherry-pick skills:** Copy the 12 kit skills listed in Section 1.1 from `antigravity-kit/.agent/skills/` into your `.agent/skills/`. Do not copy all 37 — unused skills create noise and confusion.

4. **Replace workflows:** Delete the 11 generic kit workflows. Install the 4 3F3N workflows from this document. They are adapted (not copied) versions of the kit patterns — they add Guardian checkpoints, Security gates, and 3F3N-specific output formats.

5. **Add `rules/3f3n-rules.md`:** The kit doesn't ship a global rules file. Create `rules/3f3n-rules.md` (see Section 6 for the standard template) — this is what Guardian enforces.

---

### 5.2 From `sickn33/antigravity-awesome-skills`

The awesome-skills repo provides 1,460+ community skills. The 3F3N OS pulls only 3 skills from this source.

**Integration steps:**

1. **Install via npx:** `npx antigravity-awesome-skills --path .agent/skills/` — this installs all community skills.

2. **Prune aggressively:** Delete everything except `autonomous-agents/`, `pricing-strategy/`, and `ddd-strategic-design/`. The 3F3N OS is designed to be small.

3. **Lock versions:** Note the commit hash of the installed skills. Treat them like dependencies — update intentionally, not automatically.

4. **Adapt, don't copy:** The awesome-skills files are playbooks written for generic AI assistants. Edit the 3 selected skills to reference 3F3N agent names, output formats, and validation rules from this document.

---

### 5.3 Coexistence Rules

| Concern | Decision |
|---|---|
| `.agent/` in `.gitignore`? | **No.** Track `.agent/` in version control. It is part of the product. |
| Update cadence for upstream skills | Manual review quarterly. Pin to commit hash. |
| Adding new skills | Must follow the 3F3N Skill Standard (Section 6) |
| Adding new agents | Requires Guardian rule update + Reviewer approval |
| New workflows | Must define all 6 required fields (trigger, inputs, agent sequence, skills, output, constraints) |

---

## 6. 3F3N Skill Standard

> Every skill in the 3F3N system must conform to this template. No exceptions.

### 6.1 File Structure

```
.agent/skills/[skill-name]/
├── SKILL.md        ← Required: main skill definition
└── [support files] ← Optional: reference docs, scripts
```

### 6.2 SKILL.md Template

```markdown
# [Skill Name in English] — [Nome da Skill em Português]

**ID:** SK-XX  
**Version:** 1.0  
**Priority:** CRITICAL | HIGH | MEDIUM | LOW  
**Source:** antigravity-kit | antigravity-awesome-skills | 3f3n-original  

---

## Purpose
[One sentence. What does this skill enable an agent to do?]

## Behavior Description
[2-4 sentences. How does the agent behave when this skill is loaded?
What mental model or methodology does it follow?]

## Activation Triggers
[Keywords, agent names, or workflow steps that load this skill]

## Validation Rules
[Hard constraints the agent must enforce. Use "MUST" and "MUST NOT".]

- MUST [rule]
- MUST NOT [rule]
- MUST verify [condition] before [action]

## Output Format
[Exact structure of what this skill produces. Use code blocks for templates.]

```
[OUTPUT TEMPLATE]
- Field 1: [description]
- Field 2: [description]
```

## Related Skills
[Other skills this one composes with or depends on]

## Anti-Patterns
[What behaviors this skill explicitly forbids]

## Tools Allowed
[Read | Write | Edit | Bash | Glob | Grep — list only what's needed]
```

---

### 6.3 Naming Conventions

| Element | Convention | Example |
|---|---|---|
| Skill folder | `kebab-case`, English | `systematic-debugging` |
| Skill display name | English + Português | `Systematic Debugging — Depuração Sistemática` |
| Skill ID | `SK-XX` sequential | `SK-01` |
| Agent file | `kebab-case`, role-based | `guardian.md` |
| Workflow file | `3f3n-` prefix or descriptive | `3f3n-create.md` |
| Output fields | ALL CAPS with colons | `DECISION:`, `SCOPE:` |

---

### 6.4 Validation Checklist (before adding any skill to 3F3N OS)

- [ ] Does this skill have a single, clear purpose?
- [ ] Is it reusable across at least 3 different task types?
- [ ] Does it define explicit MUST/MUST NOT rules?
- [ ] Does it have a defined output format?
- [ ] Is it compatible with Next.js/SaaS/automation contexts?
- [ ] Has it been adapted (not copied) from its source repo?
- [ ] Is the bilingual name defined?
- [ ] Does it fit within an agent's tool allowlist?

---

## 7. Global Rules (`rules/3f3n-rules.md`)

> These rules are enforced by the Guardian agent on every workflow execution.

```markdown
# 3F3N Global Rules v1.0

## R-01 · Agent Boundaries
Each agent operates within its defined domain. Cross-domain work is a VIOLATION.
- Builder writes code. Builder does not audit security.
- Security analyzes threats. Security does not write features.
- Reviewer evaluates quality. Reviewer does not implement fixes.

## R-02 · No Untested Code
Every code change must include at least one test. No exceptions.
Enforcement: Builder cannot complete a task without a test file.

## R-03 · Lint Gate
No code is "done" until lint-and-validate passes.
Enforcement: Builder runs lint before marking any task complete.

## R-04 · Security Gate
Any change to auth, authorization, external APIs, or data models triggers Security agent.
Enforcement: Guardian intercepts and routes before Builder proceeds.

## R-05 · Review Gate
No code reaches the deploy workflow without Reviewer APPROVED status.
Enforcement: Guardian checks Reviewer report before allowing `/prepare-for-deploy`.

## R-06 · No Hardcoded Secrets
No credentials, API keys, or tokens in code or prompts.
Enforcement: Security agent scans for hardcoded secrets on every review.

## R-07 · Skill Fidelity
Agents may only use skills in their allowlist. Skills are not improvised.
Enforcement: Guardian validates skill invocation against agent definition.

## R-08 · Output Format Compliance
Every agent produces output in its defined format. Free-form responses are flagged.
Enforcement: Guardian spot-checks output structure on complex workflows.

## R-09 · Plan First on Complexity
Any task touching ≥3 files or ≥2 domains requires a PLAN.md before Builder starts.
Enforcement: Guardian blocks Builder activation without PLAN.md.

## R-10 · Human Escalation
Architectural decisions, security hold states, and conflicting agent outputs are escalated to a human.
Enforcement: Guardian cannot self-resolve escalations.
```

---

## 8. Quick Reference

### Agent × Skill Matrix

| Skill | Guardian | Builder | Reviewer | Security | Planner |
|---|:---:|:---:|:---:|:---:|:---:|
| SK-01 systematic-debugging | | ✓ | | | |
| SK-02 nextjs-react-expert | | ✓ | | | |
| SK-03 vulnerability-scanner | | | | ✓ | |
| SK-04 tdd-workflow | | ✓ | | | |
| SK-05 api-patterns | | ✓ | | | |
| SK-06 clean-code | | ✓ | ✓ | | |
| SK-07 architecture | | | | | ✓ |
| SK-08 database-design | | ✓ | | | ✓ |
| SK-09 deployment-procedures | | | | | |
| SK-10 lint-and-validate | | ✓ | | | |
| SK-11 code-review-checklist | | | ✓ | | |
| SK-12 intelligent-routing | ✓ | | | | ✓ |
| SK-13 autonomous-agents | | ✓ | | ✓ | |
| SK-14 pricing-strategy | | | | | ✓ |
| SK-15 ddd-strategic-design | | | | | ✓ |

### Workflow × Agent Matrix

| Workflow | Guardian | Builder | Reviewer | Security | Planner |
|---|:---:|:---:|:---:|:---:|:---:|
| /3f3n-create | ✓ | ✓ | ✓ | | ✓ (complex) |
| /3f3n-fix | ✓ | ✓ | ✓ | conditional | |
| /prepare-for-deploy | ✓ | ✓ | ✓ | ✓ | |
| /3f3n-saas | ✓ | ✓ | ✓ | ✓ | ✓ |

---

*3F3N AI OS — Architecture Document v1.0*  
*Built on: antigravity-kit (vudovn) · antigravity-awesome-skills (sickn33)*  
*Framework: Antigravity · Stack: Next.js · SaaS · TypeScript*
