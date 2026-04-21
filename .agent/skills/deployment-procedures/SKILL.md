# Deployment Procedures — Procedimentos de Deploy

**ID:** SK-07 | **Priority:** HIGH | **Scope:** Core

---

## Purpose
Make deployment a managed, repeatable procedure — not an improvised event.

## Pre-Deploy Checklist

Before any deploy, confirm:
- [ ] All tasks are Reviewer-approved
- [ ] Lint and TypeScript pass
- [ ] Security gate is CLEAR
- [ ] `.env.example` is up to date
- [ ] No `console.log` or debug code in changed files
- [ ] Build succeeds locally: `npm run build`

## Platform Procedures

### Vercel (default for Next.js)
```bash
vercel --prod                  # production
vercel                         # preview/staging
vercel rollback [deployment-id] # rollback
```

### Railway
```bash
railway up                     # deploy
railway rollback               # rollback to previous
```

### Docker
```bash
docker build -t app:latest .
docker push registry/app:latest
# rollback: redeploy previous image tag
```

## Post-Deploy Verification

1. Hit the health endpoint or home route — confirm 200
2. Check error monitoring (Sentry / logs) for spike in the first 5 minutes
3. Verify one key user flow manually on production
4. Confirm rollback is available if needed

## Rollback Rule

If any of the following occur within 10 minutes of deploy — rollback immediately:
- Error rate increases by more than 10%
- Any critical page returns 5xx
- Auth flow is broken

## Anti-Patterns
- Deploying directly to production without a staging check
- Skipping the post-deploy verification window
- Not knowing how to rollback before deploying

## Tools Allowed
Read, Bash
