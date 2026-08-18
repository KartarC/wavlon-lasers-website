# Current Handoff

Last updated: 2026-08-18 15:12 EDT by Codex

## Current state

- Active product branch: `codex/hero-real-machine-composites` from `origin/main` at `40853ce`.
- Homepage hero: the portfolio, Sheet Lasers, and Tube Lasers scenes have been rebuilt from actual transparent Wavlon product renders on one empty showroom background plate.
- Product integrity: AI generated only the empty architectural backdrop. Machine bodies, proportions, Wavlon logos, control panels, rails, chucks, and support legs come directly from tracked real product assets and were not generatively altered.
- Floor placement: every machine is fully below the wall/floor junction with deterministic contact shadows; no tube system is mounted on or blended into the wall.
- New assets: `hero-scene-portfolio-v4.webp`, `hero-scene-sheet-v3.webp`, and `hero-scene-tube-v3.webp`, all 1672×941 WebP files.
- Homepage references: `index.html` now targets the three new versioned assets while preserving the existing hero layout, copy, transparent navigation behavior, carousel controls, and five capability scenes.
- Deployment: pending focused validation, commit, GitHub pull request, and Vercel verification.
- Preserved work: generated-page line-ending changes, untracked `assets/hero-ai/*-bg.png` source files, and `assets/powercut-guide/` remain outside this task.

## What the next assistant must do

1. Read `AGENTS.md`, `CLAUDE.md`, the newest `CHANGELOG.md` entry, and this file before editing.
2. Run `git status --short --branch` and preserve all unrelated modified and untracked files.
3. Do not replace the real machine cutouts with generated machine imagery; future adjustments should change only scale, order, or placement unless the owner supplies new real renders.
4. Record every completed Claude or Codex change in `CHANGELOG.md` and refresh this handoff.

## Access notes

- GitHub remote: https://github.com/KartarC/wavlon-lasers-website.git.
- GitHub CLI is authenticated for KartarC.
- Production URL: https://wavlonlasers.com.
- Vercel deploys from the GitHub `main` branch; deployment verification is still pending for this product update.