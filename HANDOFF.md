# Current Handoff

Last updated: 2026-08-19 12:46 EDT by Codex

## Current state

- Active branch: `codex/hero-slide1-single-machine` from production `main` at `0b977dc`.
- Slide 1: reduced to one real tracked UltraCut render on the right side of the showroom floor in `hero-scene-portfolio-v6.webp`; no other foreground machines remain.
- Slides 2 and 3: unchanged on the owner-approved `hero-scene-sheet-v2.webp` and `hero-scene-tube-v2.webp` artwork.
- Slides 4–8: unchanged on the five background-only `assets/hero-ai/*-background.webp` files.
- Existing hero layout, copy, transparent navigation behavior, carousel controls, and slide order are unchanged.
- Deployment: focused validation, GitHub publication, and Vercel verification are pending.
- Preserved work: generated-page line-ending changes, untracked `assets/hero-ai/*-bg.png` source files, and `assets/powercut-guide/` remain outside this task.

## What the next assistant must do

1. Read `AGENTS.md`, `CLAUDE.md`, the newest `CHANGELOG.md` entry, and this file before editing.
2. Run `git status --short --branch` and preserve all unrelated modified and untracked files.
3. Keep slide 1 to a single foreground machine unless the owner explicitly asks for more.
4. Keep slides 2 and 3 on the owner-approved v2 artwork.
5. Keep slides 4–8 free of added foreground machines.
6. Record every completed Claude or Codex change in `CHANGELOG.md` and refresh this handoff.

## Access notes

- GitHub remote: https://github.com/KartarC/wavlon-lasers-website.git.
- GitHub CLI is authenticated for KartarC.
- Production URL: https://wavlonlasers.com.
- Vercel deploys from GitHub `main`; production verification is pending for this revision.