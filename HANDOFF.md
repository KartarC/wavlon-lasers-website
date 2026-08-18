# Current Handoff

Last updated: 2026-08-18 12:17 EDT by Codex

## Current state

- Working branch: `codex/hero-product-art-direction`, based on current `origin/main` at `3566448`.
- Homepage hero artwork: the first three scenes now use new versioned product-showcase images. Portfolio has a controlled five-machine lineup, Sheet Lasers has a three-system family composition, and Tube Lasers contains only the double-chuck and triple-chuck platforms.
- Art direction: all three scenes share a premium bright industrial showroom, consistent perspective and floor contact, believable relative scale, a dominant foreground product, and clean dark negative space on the left for the existing live HTML copy.
- Performance: the three 1672×941 WebP assets are approximately 66 KB, 59 KB, and 74 KB.
- Existing homepage layout, navigation behavior, carousel messaging, and the remaining five capability scenes are unchanged.
- Deployment: branch push and Vercel preview are pending.
- Preserved work: generated-page line-ending changes, untracked `assets/hero-ai/*-bg.png` source files, and `assets/powercut-guide/` remain outside this task.

## What the next assistant must do

1. Read `AGENTS.md`, `CLAUDE.md`, the newest `CHANGELOG.md` entry, and this file before editing.
2. Preserve all unrelated modified and untracked files.
3. Finish the reviewed PR/Vercel deployment workflow if it is still pending.
4. Record every completed Claude or Codex change in `CHANGELOG.md` and refresh this handoff.

## Access notes

- GitHub remote: https://github.com/KartarC/wavlon-lasers-website.git.
- GitHub CLI is authenticated for KartarC.
- Vercel CLI is authenticated for kartarc in team infinara.
- Production URL: https://wavlonlasers.com.