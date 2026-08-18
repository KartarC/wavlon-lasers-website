# Current Handoff

Last updated: 2026-08-18 15:18 EDT by Codex

## Current state

- Production product commit: `fdddb6e` from PR #29, Use real Wavlon renders in homepage hero scenes.
- Homepage hero: the live portfolio, Sheet Lasers, and Tube Lasers scenes are deterministic composites of actual transparent Wavlon machine renders on one empty showroom background plate.
- Product integrity: AI generated only the empty architectural backdrop. Machine bodies, proportions, Wavlon logos, control panels, rails, chucks, and support legs come directly from tracked real product assets and were not generatively altered.
- Floor placement: every machine is fully below the wall/floor junction with contact shadows; no tube system is mounted on or blended into the wall.
- Live assets: `/assets/hero-scene-portfolio-v4.webp` (107,936 bytes), `/assets/hero-scene-sheet-v3.webp` (85,360 bytes), and `/assets/hero-scene-tube-v3.webp` (107,298 bytes), all 1672×941 WebPs.
- Existing hero layout, copy, transparent navigation behavior, carousel controls, and five capability scenes are unchanged.
- Deployment: Vercel production check passed for `fdddb6e`; https://wavlonlasers.com returned 200 and referenced each new asset exactly once; every live asset returned 200 as `image/webp` with the expected size.
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
- Vercel production deployment: https://vercel.com/infinara/wavlon-lasers-website/BYgMt1GCM92hwYF2srHuT5UGVbDA.