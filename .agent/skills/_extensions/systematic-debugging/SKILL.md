# Systematic Debugging — Depuração Sistemática

**ID:** SK-EXT-01 | **Priority:** MEDIUM | **Scope:** Extension (opt-in)

---

## Purpose
Replace guesswork with a 4-phase evidence-based debugging process. Load this skill when a bug cannot be immediately understood from reading the code.

## When to Load

Load this skill when:
- Error cannot be reproduced consistently
- Root cause is not obvious after 2 minutes of reading
- Bug involves multiple files or async behavior

## The 4 Phases

### Phase 1 — Reproduce
Establish a reliable reproduction before touching anything.
- Document exact steps to trigger the bug
- Confirm: does it happen always, often, or sometimes?
- Create minimal reproduction case if possible
- **Do not propose a fix before this phase is complete.**

### Phase 2 — Isolate
Narrow the problem space.
- When did it start? What changed recently?
- Does it happen in all environments or just one?
- Which specific file, function, or line range is involved?

### Phase 3 — Understand
Find the actual root cause using the 5 Whys.
- Ask "why?" at least 3 times before accepting the answer
- Surface the fundamental cause, not the surface symptom

### Phase 4 — Fix and Verify
- Implement the minimal fix that addresses the root cause
- Confirm the bug no longer reproduces
- Confirm no adjacent features broke
- Write a regression test if the bug is likely to recur

## Anti-Patterns
- Making random changes and hoping one works
- Fixing the symptom and not the cause
- Skipping Phase 1 (reproduction) and guessing

## Tools Allowed
Read, Grep, Glob, Bash
