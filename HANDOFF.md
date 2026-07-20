# Current Handoff

Last updated: 2026-07-20 by Claude

## Current state

- Active branch: `codex/collaboration-workflow`, based on `origin/main` at `75f6a0c` and pushed to GitHub.
- Purpose: collaboration/changelog setup only; no product behavior was intentionally changed on this branch.
- Pre-existing work: `assets/powercut-guide/` is untracked and is not part of this branch.
- Production branch: `main` at `75f6a0c` (Codex's "Add Customer Requirements + Commercial Summary" commit, 2026-07-09 17:24 EDT). All Claude product changes (`0d20ccb` → `8b39c2d`) are on `main` and are live at `wavlonlasers.com`.
- Review: Draft GitHub PR #1 is open against `main` — merge it to bring collaboration files into production.
- Preview: Vercel branch alias `https://wavlon-lasers-website-git-codex-collaboration-workflow-infinara.vercel.app` is `Ready` and protected by Vercel SSO.

## What is on production main (live at wavlonlasers.com)

Claude product changes merged to `main` before the collaboration workflow existed:

| Commit | Date | Summary |
|--------|------|---------|
| `0d20ccb` | 2026-06-16 | Remove street address; add FAQ chips + CTA buttons to chat |
| `ff03eb5` | 2026-06-22 | Sitemap update (TubeCut pages, remove stale laser-head URLs) |
| `81aaaef` | 2026-06-24 | UltraCut spec WUC badge |
| `3818de0` | 2026-07-02 | Chat widget full Intercom-style redesign |
| `8b39c2d` | 2026-07-09 | Fix: FAQ chip click was closing the chat panel |

Codex changes also on `main` (on top of the above):

| Commit | Date | Summary |
|--------|------|---------|
| `b56a30c`–`75f6a0c` | 2026-07-09 | ProCut quote/catalog templates, image fixes, dynamic title page, Customer Requirements page |

## What the next assistant must do

1. Read `AGENTS.md` and `CHANGELOG.md` before editing.
2. Run `git status --short --branch` and confirm `assets/powercut-guide/` remains untracked.
3. **Merge PR #1** (or ask the user) to land the collaboration files on `main`.
4. For any new product work: pull latest `origin/main`, create a focused `claude/<topic>` branch, work, then open a PR. Do not push directly to `main`.

## Access notes

- GitHub remote: `https://github.com/KartarC/wavlon-lasers-website.git`.
- GitHub CLI authenticated for `KartarC` on 2026-07-20.
- Vercel CLI authenticated for `kartarc` on 2026-07-20. No local `.vercel/project.json` present before deployment.
- `https://wavlonlasers.com` returns `200 OK` from Vercel; `https://www.wavlonlasers.com` returns `307` redirect to apex domain.
