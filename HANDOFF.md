# Current Handoff

Last updated: 2026-07-20 by Codex

## Current state

- Active branch: `codex/collaboration-workflow`, based on `origin/main` at `75f6a0c`.
- Purpose: collaboration/changelog setup only; no product behavior was intentionally changed.
- Pre-existing work: `assets/powercut-guide/` is untracked and is not part of this branch.
- Production branch: `main`; `CLAUDE.md` says Vercel automatically deploys pushes to it.

## What the next assistant must do

1. Read `AGENTS.md` and `CHANGELOG.md` before editing.
2. Run `git status --short --branch` and confirm the PowerCut asset folder remains untouched.
3. If continuing this setup, review the four collaboration files and the latest publishing-status entry in `CHANGELOG.md` before merging.
4. For product work, start a fresh focused branch from updated `origin/main` after this collaboration branch is merged.

## Access notes

- GitHub remote: `https://github.com/KartarC/wavlon-lasers-website.git`.
- GitHub CLI authentication was re-established for `KartarC` on 2026-07-20.
- Vercel CLI authentication was established for `kartarc` on 2026-07-20. No local `.vercel/project.json` was present before deployment, so project linkage still requires verification.
- `https://wavlonlasers.com` returned `200 OK` from Vercel on 2026-07-20; `https://www.wavlonlasers.com` returned a Vercel `307` redirect to the apex domain. Public headers do not identify the source branch or commit.
