# Current Handoff

Last updated: 2026-08-13 16:23 EDT by Codex

## Current state

- Production branch: main at 9c79a17 (PR #20, Make homepage hero full width).
- Homepage hero: now a true edge-to-edge machine-carousel section. index.html uses the existing assets/machine-floor.png as the showroom background with layered gradients and a vignette for copy readability; carousel behaviour, CTAs, and the responsive mobile layout are retained.
- Deployment: Vercel production deployment dpl_3wYYJSXXyT7gjfYuBE8XXceYVz2G is Ready and aliased to https://wavlonlasers.com. A live HTML check confirms the served homepage references machine-floor.png.
- Validation: npm.cmd run sync verified 37 inline shared headers/footers; git diff --check passed before merge; Vercel preview and production deployments both reached Ready.
- No product copy, machine specifications, shared navigation, Vercel configuration, or backend behaviour changed.
- Pre-existing work: assets/powercut-guide/ remains untracked and must not be staged or modified.

## What the next assistant must do

1. Before editing, read AGENTS.md, CLAUDE.md, the newest CHANGELOG.md entry, and this file.
2. Run git status --short --branch; preserve the untracked assets/powercut-guide/ directory.
3. Record every completed Claude or Codex change in CHANGELOG.md, then refresh this file to describe only the current state.

## Access notes

- GitHub remote: https://github.com/KartarC/wavlon-lasers-website.git.
- GitHub CLI is authenticated for KartarC.
- Vercel CLI is authenticated for kartarc in team infinara.
- Production URL: https://wavlonlasers.com; Vercel is configured with trailingSlash: false.