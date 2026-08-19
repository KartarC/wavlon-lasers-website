# Current Handoff

Last updated: 2026-08-19 12:49 EDT by Codex

## Current state

- Production product commit: `7b2d57b` from PR #35, Simplify homepage slide 1 to one machine.
- Slide 1: live on `hero-scene-portfolio-v6.webp`, containing one real tracked UltraCut positioned on the right side of the showroom floor with no overlapping foreground equipment.
- Slides 2 and 3: unchanged on the owner-approved `hero-scene-sheet-v2.webp` and `hero-scene-tube-v2.webp` artwork.
- Slides 4–8: unchanged on the five background-only `assets/hero-ai/*-background.webp` files.
- Existing hero layout, copy, transparent navigation behavior, carousel controls, and slide order are unchanged.
- Deployment: Vercel production check passed for `7b2d57b`; https://wavlonlasers.com returned 200, referenced v6 exactly once and v5 zero times, and served the v6 asset as `image/webp` at 75,488 bytes.
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
- Latest product deployment: https://vercel.com/infinara/wavlon-lasers-website/7ewFW3ou46jZMbiN2tk3AiHzufAH.