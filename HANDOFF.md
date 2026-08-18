# Current Handoff

Last updated: 2026-08-18 15:24 EDT by Codex

## Current state

- Production product commit: `1ccb52e` from PR #31, Show real PowerCut in sheet-laser hero; the underlying real-machine hero family was introduced by `fdddb6e` in PR #29.
- Homepage hero: the live portfolio, Sheet Lasers, and Tube Lasers scenes are deterministic composites of actual transparent Wavlon machine renders on one empty showroom background plate.
- Product integrity: AI generated only the empty architectural backdrop. Machine bodies, proportions, Wavlon logos, control panels, rails, chucks, and support legs come directly from tracked real product assets and were not generatively altered.
- Floor placement: every machine is fully below the wall/floor junction with contact shadows; no tube system is mounted on or blended into the wall.
- Sheet product lineup: ProCut, PowerCut/WL-F, and UltraCut are each represented exactly once with their real tracked transparent render.
- Live assets: `/assets/hero-scene-portfolio-v4.webp` (107,936 bytes), `/assets/hero-scene-sheet-v4.webp` (85,712 bytes), and `/assets/hero-scene-tube-v3.webp` (107,298 bytes), all 1672×941 WebPs.
- Existing hero layout, copy, transparent navigation behavior, carousel controls, and five capability scenes are unchanged.
- Deployment: Vercel production checks passed; https://wavlonlasers.com returned 200, referenced each current real-machine scene once, and served each asset as `image/webp` with its expected size.
- Preserved work: generated-page line-ending changes, untracked `assets/hero-ai/*-bg.png` source files, and `assets/powercut-guide/` remain outside this task.

## What the next assistant must do

1. Read `AGENTS.md`, `CLAUDE.md`, the newest `CHANGELOG.md` entry, and this file before editing.
2. Run `git status --short --branch` and preserve all unrelated modified and untracked files.
3. Do not replace the real machine cutouts with generated machine imagery; future adjustments should change only scale, order, or placement unless the owner supplies new real renders.
4. Keep the Sheet Lasers hero product-accurate: one ProCut, one PowerCut/WL-F, and one UltraCut.
5. Record every completed Claude or Codex change in `CHANGELOG.md` and refresh this handoff.

## Access notes

- GitHub remote: https://github.com/KartarC/wavlon-lasers-website.git.
- GitHub CLI is authenticated for KartarC.
- Production URL: https://wavlonlasers.com.
- Latest product deployment: https://vercel.com/infinara/wavlon-lasers-website/5eih5rJwMDpkEtXQW4AAZdadrMpd.