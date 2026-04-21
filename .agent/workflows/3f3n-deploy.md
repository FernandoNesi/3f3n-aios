# /3f3n-deploy — FULLY DETERMINISTIC WORKFLOW

**Identity:** 3F3N AI OS Deployment Engine  
**Version:** 2.0 (Deterministic)  
**Strictness Tier:** ABSOLUTE

---

## 🛑 HARD FAIL CONDITIONS

If ANY of the following inputs are missing or null:
- `target` (staging | production)

**ACTION:** 
1. STOP execution immediately.
2. Request the deployment target from the user.
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

1.  **Ask required inputs:** Ensure `target` is selected.
2.  **Verify state:** Use `grep` or `list_dir` to confirm all task artifacts or logs indicate all development tasks are marked as **DONE** and **APPROVED** by the Reviewer.
3.  **Confirm target:** Present the deployment target to the user and request final confirmation.

---

## 👷 STEP 2 — BUILDER (EXECUTABLE)

The Builder MUST execute the following sequence precisely:

### 1. Pre-deployment Validation
Run the following commands in the project root:
- `npm run lint`
- `npm run build`
- `npm test` (if test suite is present)

### 2. Dependency Audit
- Run `npm audit` to check for high/critical vulnerabilities in dependencies.

---

## 🚦 BUILD VALIDATION

Immediately after Step 2, analyze logs:
- `lint` status
- `build` status
- `audit` findings

**If ANY command fails or Critical vulnerabilities are found:**
→ FAIL Workflow  
→ Block deployment.  
→ Builder must resolve issues and re-run.

---

## 🔍 STEP 3 — REVIEWER

The Reviewer MUST perform a final "Deployment Readiness" review:
1.  **Score:** Provide a numerical score from **0 to 10** based on code stability and documentation.
2.  **Gate:** If score is **< 7**, the workflow is BLOCKED.

---

## 🔒 STEP 4 — SECURITY

The Security agent MUST:
1.  **Credential Audit:** Pass all code through a secret-scanning pattern.
2.  **Target Lockdown:** Verify that environment variables for the specific `target` are correctly set in the deployment platform (Vercel/Railway).
3.  **Decision:** CLEAR or HOLD.

---

## 🏁 STEP 5 — FINAL GUARDIAN

The Guardian MUST perform a final audit:
- **Build Verify:** Verify that the build artifact is ready for the selected `target`.
- **Audit:** Ensure no steps (0-4) were skipped or improvised.
- **Authorize:** Issue the `AUTHORIZED` token for the deployment command.

---

## 📤 OUTPUT FORMAT (MANDATORY)

At the end of the workflow, return ONLY this summary:

```
Project: [project_name]
Target: [staging/production]
Build: [PASS/FAIL]
Review Score: [N]/10
Security: [PASS/FAIL]
Deployment: [AUTHORIZED/BLOCKED]
```

---

## 🚫 PROHIBITIONS

- **DO NOT** deploy if the Build or Security checks fail.
- **DO NOT** assume the environment is production-ready without explicit checks.
- **DO NOT** skip the numeric Reviewer scoring.
