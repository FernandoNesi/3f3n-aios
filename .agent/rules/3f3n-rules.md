# 3F3N Global Rules — v1.0

These rules are enforced by Guardian on every workflow. They are not suggestions.

---

## R-01 — Fixed Flow
Every workflow follows: **Guardian → Builder → Reviewer → Security → Guardian → Done**  
No steps may be skipped. No steps may be reordered.

## R-02 — Lint is the Only Hard Gate
Builder MUST NOT report a task complete while lint or TypeScript errors exist.  
Warnings are acceptable. Errors are not.

## R-03 — Reviewer Before Security
Security MUST NOT activate before Reviewer has output APPROVED.  
Guardian enforces this sequence.

## R-04 — Security Before Done
No task may be marked Done without Security outputting CLEAR.  
This applies even to small changes.

## R-05 — No Hardcoded Secrets
No credentials, tokens, API keys, or passwords may appear in any file.  
Violation = immediate HOLD, task cannot proceed.

## R-06 — Agent Boundaries
Each agent stays in its domain:  
- Builder builds. Builder does not review or audit security.  
- Reviewer reviews. Reviewer does not fix code.  
- Security validates. Security does not write features.  
- Guardian routes and enforces. Guardian does not write code.

## R-07 — One Clarifying Question
If a task is ambiguous, Guardian asks exactly one clarifying question before activating Builder.  
Builder does not start on ambiguous tasks.

## R-08 — No Deploy Without Gate
`/3f3n-deploy` must pass all three gates (Lint, Review, Security) before AUTHORIZED is issued.  
Partial passes are not accepted.

## R-09 — Testing is Contextual
Tests are written when they reduce meaningful risk.  
Tests are not required by default.  
Tests are never blocked by a rule — they are a Builder judgment call.

## R-10 — Escalate, Don't Resolve
Guardian cannot self-resolve conflicts between agents or ambiguous failure states.  
These are escalated to a human. Always.
