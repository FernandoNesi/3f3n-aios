# /3f3n-saas — FULLY DETERMINISTIC WORKFLOW

**Identity:** 3F3N AI OS SaaS Module Engine  
**Version:** 2.0 (Deterministic)  
**Strictness Tier:** ABSOLUTE

---

## 🛑 HARD FAIL CONDITIONS

If ANY of the following inputs are missing or null:
- `module` (auth | database | billing | all)
- `auth_provider` (Clerk | NextAuth | Auth.js)
- `db_provider` (Neon | Turso | Supabase)

**ACTION:** 
1. STOP execution immediately.
2. Request the missing module or provider details.
3. DO NOT activate any subsequent steps.

---

## 🛡️ STEP 0 — VALIDATION BLOCK

Before initiating Step 1, the system MUST:
- Load [CORE.md](file:///Users/fernandonesi/Documents/GitHub/3f3n-aios/CORE.md)
- Load [3f3n-rules.md](file:///Users/fernandonesi/Documents/GitHub/3f3n-aios/.agent/rules/3f3n-rules.md)

**If files are not found or paths are invalid:**
→ FAIL Workflow  
→ Report: "CRITICAL ERROR: Governance files missing."

---

## 🛠️ STEP 1 — GUARDIAN INIT

1.  **Ask required inputs:** Obtain `module`, `auth_provider`, `db_provider`, and `billing_provider` (if applicable).
2.  **Define Constraints:** Security agent must output a list of **Hard Security Constraints** for the selected module before any code is written.
3.  **Confirm setup:** Present the architecture plan to the user and request confirmation.

---

## 👷 STEP 2 — BUILDER (EXECUTABLE)

The Builder MUST execute the following sequence precisely:

### 1. Dependency Installation
Execute `npm install` for the selected providers:
- **Auth:** `@clerk/nextjs`, `next-auth`, etc.
- **Database:** `drizzle-orm`, `prisma`, `@neondatabase/serverless`.
- **Billing:** `stripe`, `@stripe/stripe-js`.

### 2. Scaffold Core Modules
- **Auth:** Create middleware, protected routes, and session context.
- **Database:** Generate schema with `tenantId`/`userId` isolation. Perform `npx drizzle-kit push` or equivalent.
- **Billing:** Create webhook handler with idempotency and subscription middleware.

---

## 🚦 BUILD VALIDATION

Immediately after Step 2, run:
1. `npm run lint`
2. `npm run build`

**If ANY command fails:**
→ FAIL Workflow  
→ The SaaS module is considered broken. Builder must fix and re-run.

---

## 🔍 STEP 3 — REVIEWER

The Reviewer MUST evaluate the SaaS implementation:
1.  **Score:** Provide a numerical score from **0 to 10** based on architectural integrity and isolation.
2.  **Gate:** If score is **< 7**, the workflow is BLOCKED.

---

## 🔒 STEP 4 — SECURITY

The Security agent MUST perform high-criticality checks:
1.  **Cross-Tenant Leakage:** Verify that all DB queries are scoped to a session ID.
2.  **Auth Bypass:** Attempt to access a protected route without a session (simulation or tool-based).
3.  **Decision:** CLEAR or HOLD.

---

## 🏁 STEP 5 — FINAL GUARDIAN

The Guardian MUST perform a final audit:
- **Module Verify:** Confirm all selected SaaS layers (Auth, DB, Billing) are correctly integrated.
- **Audit:** Ensure no steps (0-4) were skipped.
- **Success:** Mark the SaaS module as **Operational**.

---

## 📤 OUTPUT FORMAT (MANDATORY)

At the end of the workflow, return ONLY this summary:

```
Project: [project_name]
Modules: [auth | database | billing]
Build: [PASS/FAIL]
Review Score: [N]/10
Security: [PASS/FAIL]
```

---

## 🚫 PROHIBITIONS

- **DO NOT** use generic database schemas without tenant isolation.
- **DO NOT** skip the pre-build Security constraint definition.
- **DO NOT** commit or show API secret keys in the logs.
