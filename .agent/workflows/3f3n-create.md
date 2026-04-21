# /3f3n-create — FULLY DETERMINISTIC WORKFLOW

**Identity:** 3F3N AI OS Execution Engine  
**Version:** 2.0 (Deterministic)  
**Strictness Tier:** ABSOLUTE

---

## 🛑 HARD FAIL CONDITIONS

If ANY of the following inputs are missing or null:
- `project_name`
- `project_type`
- `goal`

**ACTION:** 
1. STOP execution immediately.
2. Request the missing items from the user.
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

1.  **Ask required inputs:** If not provided in the trigger, prompt for `project_name`, `project_type`, and `goal`.
2.  **Validate inputs:** Ensure `project_type` is valid (SaaS, Funil, Automação, API, etc) and `goal` is descriptive.
3.  **Confirm inputs:** Present the collected data to the user and request confirmation before activating the Builder.

---

## 👷 STEP 2 — BUILDER (EXECUTABLE)

The Builder MUST execute the following sequence precisely:

### 1. Project Initialization
- Initialize a Next.js project with App Router.
- Install mandatory dependencies: `next`, `react`, `react-dom`, `tailwindcss`, `typescript`, `@types/node`, `@types/react`, `@types/react-dom`.

### 2. File System Structure
Create following directories:
- `/src/app`
- `/src/components`
- `/src/sections`
- `/src/design-system`
- `/public`

### 3. Core Configuration Files
Generate and write:
- `package.json` (with `lint` and `build` scripts)
- `tsconfig.json` (strict mode enabled)
- `next.config.js`
- `tailwind.config.ts`

---

## 🚦 BUILD VALIDATION

Immediately after Step 2, run:
1. `npm run lint`
2. `npm run build`

**If ANY command fails:**
→ FAIL Workflow  
→ Block handoff to Reviewer.  
→ Builder must fix errors and re-run validation.

---

## 🔍 STEP 3 — REVIEWER

The Reviewer MUST evaluate the output against CORE.md and:
1.  **Score:** Provide a numerical score from **0 to 10**.
2.  **Gate:** If score is **< 7**, the workflow is BLOCKED.
3.  **Action:** Return to Builder for refactoring if score < 7.

---

## 🔒 STEP 4 — SECURITY

The Security agent MUST:
1.  **Env Leak Check:** Scan all files for hardcoded secrets or accidental `.env` inclusions.
2.  **API Exposure:** Verify that Server Actions and API Routes have appropriate auth/guards.
3.  **Decision:** CLEAR or HOLD.

---

## 🏁 STEP 5 — FINAL GUARDIAN

The Guardian MUST perform a final audit:
- **Structure Verify:** Confirm all directories and core files exist on disk.
- **Build Verify:** Verify that the last build log reported SUCCESS.
- **Audit:** Ensure no steps (0-4) were skipped or improvised.

---

## 📤 OUTPUT FORMAT (MANDATORY)

At the end of the workflow, return ONLY this summary:

```
Project: [project_name]
Build: [PASS/FAIL]
Review Score: [N]/10
Security: [PASS/FAIL]
```

---

## 🚫 PROHIBITIONS

- **DO NOT** assume any file or state exists without checking.
- **DO NOT** skip any validation step (Lint, Build, Security).
- **DO NOT** continue execution if any step fails.
