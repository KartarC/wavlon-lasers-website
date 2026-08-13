# Current Handoff

Last updated: 2026-08-13 16:20 EDT by Codex

## Current state

- Active branch: `codex/full-width-homepage-hero`, created from up-to-date `origin/main`.
- Purpose: Make the homepage machine-carousel hero use the full browser width with a professional machine-floor background.
- Homepage implementation: `index.html` removes the former outer card framing and uses a full-bleed hero scene. The existing `assets/machine-floor.png` provides the showroom background; dark gradient overlays and a subtle vignette preserve headline/CTA contrast. Desktop copy is left-aligned inside the scene, and the mobile layout remains centered and responsive.
- No product copy, machine specifications, shared navigation, Vercel configuration, or backend behaviour changed.
- Pre-existing work: `assets/powercut-guide/` remains untracked and must not be staged or modified.
- Validation completed: `npm.cmd run sync` refreshed and verified 37 inline shared headers/footers; `git diff --check` passes.

## What the next assistant must do

1. Before editing, read `AGENTS.md`, `CLAUDE.md`, the newest `CHANGELOG.md` entry, and this file.
2. Run `git status --short --branch`; preserve the untracked `assets/powercut-guide/` directory.
3. If continuing this task, verify the live hero's edge-to-edge layout and readability after the pending branch is merged and Vercel finishes its production deployment.
4. Record every completed Claude or Codex change in `CHANGELOG.md`, then refresh this file to describe only the current state.

## Access notes

- GitHub remote: `https://github.com/KartarC/wavlon-lasers-website.git`.
- GitHub CLI is authenticated for `KartarC`.
- Vercel CLI is authenticated for `kartarc` in team `infinara`.
- Production URL: `https://wavlonlasers.com`; Vercel is configured with `trailingSlash: false`.