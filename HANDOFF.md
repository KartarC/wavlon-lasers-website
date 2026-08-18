# Current Handoff

Last updated: 2026-08-18 15:37 EDT by Codex

## Current state

- Active branch: `codex/hero-declutter-restore-scenes` from production `main` at `480c7b4`.
- Slide 1: simplified to two real tracked machines on the showroom floor — one ProCut sheet laser and one TubeCut Triple Chuck — using `hero-scene-portfolio-v5.webp`.
- Slides 2 and 3: restored exactly to the previously approved artwork files `hero-scene-sheet-v2.webp` and `hero-scene-tube-v2.webp`.
- Slides 4–8: switched to background-only WebPs derived from the existing `assets/hero-ai/*-bg.png` source plates; the added foreground machines are no longer present.
- Existing hero layout, copy, transparent navigation behavior, carousel controls, and slide order are unchanged.
- Deployment: focused validation passed; GitHub and Vercel publication are pending.
- Preserved work: generated-page line-ending changes, untracked `assets/hero-ai/*-bg.png` source files, and `assets/powercut-guide/` remain outside this task.

## What the next assistant must do

1. Read `AGENTS.md`, `CLAUDE.md`, the newest `CHANGELOG.md` entry, and this file before editing.
2. Run `git status --short --branch` and preserve all unrelated modified and untracked files.
3. Keep slides 2 and 3 on the owner-approved v2 artwork unless the owner explicitly requests another change.
4. Keep slides 4–8 free of added foreground machines; use the background-only assets.
5. Record every completed Claude or Codex change in `CHANGELOG.md` and refresh this handoff.

## Access notes

- GitHub remote: https://github.com/KartarC/wavlon-lasers-website.git.
- GitHub CLI is authenticated for KartarC.
- Production URL: https://wavlonlasers.com.
- Vercel deploys from GitHub `main`; production verification is pending for this revision.