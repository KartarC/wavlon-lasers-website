# Current Handoff

Last updated: 2026-08-18 15:40 EDT by Codex

## Current state

- Production product commit: `ef026a5` from PR #33, Declutter and restore homepage hero scenes.
- Slide 1: live simplified two-machine composition using one real tracked ProCut and one real tracked TubeCut Triple Chuck in `hero-scene-portfolio-v5.webp`.
- Slides 2 and 3: live on the owner-approved `hero-scene-sheet-v2.webp` and `hero-scene-tube-v2.webp` artwork.
- Slides 4–8: live on the five `assets/hero-ai/*-background.webp` files derived from the existing background-only source plates; the added foreground hero machines are absent.
- Existing hero layout, copy, transparent navigation behavior, carousel controls, and slide order are unchanged.
- Deployment: Vercel production check passed for `ef026a5`; https://wavlonlasers.com returned 200, referenced every intended hero asset exactly once, and served all eight as `image/webp` with the expected sizes.
- Preserved work: generated-page line-ending changes, untracked `assets/hero-ai/*-bg.png` source files, and `assets/powercut-guide/` remain outside this task.

## What the next assistant must do

1. Read `AGENTS.md`, `CLAUDE.md`, the newest `CHANGELOG.md` entry, and this file before editing.
2. Run `git status --short --branch` and preserve all unrelated modified and untracked files.
3. Keep slides 2 and 3 on the owner-approved v2 artwork unless the owner explicitly requests another change.
4. Keep slides 4–8 free of added foreground machines; use the background-only assets.
5. Keep slide 1 restrained; do not add additional foreground machines without explicit approval.
6. Record every completed Claude or Codex change in `CHANGELOG.md` and refresh this handoff.

## Access notes

- GitHub remote: https://github.com/KartarC/wavlon-lasers-website.git.
- GitHub CLI is authenticated for KartarC.
- Production URL: https://wavlonlasers.com.
- Latest product deployment: https://vercel.com/infinara/wavlon-lasers-website/DpPAqBc3P5cfGmZS9JkAYUpBDV3o.