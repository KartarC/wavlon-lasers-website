# Current Handoff

Last updated: 2026-08-20 12:18 EDT by Codex

## Current state

- Active branch: `codex/hero-ultrawide-framing`, based on production `main` commit `737193e`.
- Pending change: homepage slide 1 now uses a targeted rule at 1800 px and wider that keeps `object-fit: cover` and anchors `hero-scene-portfolio-v6.webp` to `62% bottom`. This retains the large machine scale while keeping the complete UltraCut and showroom floor visible on ultra-wide screens.
- The slide 1 v6 image asset itself is unchanged.
- Slides 2 and 3 remain on the owner-approved `hero-scene-sheet-v2.webp` and `hero-scene-tube-v2.webp` artwork.
- Slides 4–8 remain on the five background-only `assets/hero-ai/*-background.webp` files.
- Hero copy, transparent navigation behavior, carousel controls, slide order, and ordinary desktop framing are unchanged.
- Validation: ultra-wide static crop simulation visually passed; one scoped responsive rule, one v6 reference, eight scene definitions, balanced CSS braces, and a clean scoped diff were confirmed.
- Deployment: branch push, GitHub pull request, and Vercel verification are pending.
- Preserved work: generated-page line-ending changes, untracked `assets/hero-ai/*-bg.png` source files, and `assets/powercut-guide/` remain outside this task.

## What the next assistant must do

1. Read `AGENTS.md`, `CLAUDE.md`, the newest `CHANGELOG.md` entry, and this file before editing.
2. Run `git status --short --branch` and preserve all unrelated modified and untracked files.
3. Complete the current branch through its pull request and Vercel checks before starting another hero revision.
4. Keep slide 1 to a single foreground machine unless the owner explicitly asks for more.
5. Keep slides 2 and 3 on the owner-approved v2 artwork.
6. Keep slides 4–8 free of added foreground machines.
7. Record every completed Claude or Codex change in `CHANGELOG.md` and refresh this handoff.

## Access notes

- GitHub remote: https://github.com/KartarC/wavlon-lasers-website.git.
- GitHub CLI is authenticated for KartarC.
- Production URL: https://wavlonlasers.com.
- Last verified product deployment before this change: https://vercel.com/infinara/wavlon-lasers-website/7ewFW3ou46jZMbiN2tk3AiHzufAH.
