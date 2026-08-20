# Current Handoff

Last updated: 2026-08-20 12:24 EDT by Codex

## Current state

- Production product commit: `eb1daea` from PR #37, Fix slide 1 framing on ultra-wide screens.
- Slide 1 uses `hero-scene-portfolio-v6.webp`, containing one real tracked UltraCut positioned on the right side of the showroom floor with no overlapping foreground equipment.
- At viewport widths of 1800 px and wider, slide 1 retains `object-fit: cover` and uses `object-position: 62% bottom`, keeping the complete machine and floor visible on ultra-wide displays while preserving its large showcase scale.
- Slides 2 and 3 remain on the owner-approved `hero-scene-sheet-v2.webp` and `hero-scene-tube-v2.webp` artwork.
- Slides 4–8 remain on the five background-only `assets/hero-ai/*-background.webp` files.
- Hero copy, transparent navigation behavior, carousel controls, slide order, and ordinary desktop framing are unchanged.
- Deployment: Vercel production check passed for `eb1daea`; https://wavlonlasers.com returned 200, contained the scoped ultra-wide rule once, referenced v6 once, and served the v6 asset as `image/webp` at 75,488 bytes.
- Preserved work: generated-page line-ending changes, untracked `assets/hero-ai/*-bg.png` source files, and `assets/powercut-guide/` remain outside this task.

## What the next assistant must do

1. Read `AGENTS.md`, `CLAUDE.md`, the newest `CHANGELOG.md` entry, and this file before editing.
2. Run `git status --short --branch` and preserve all unrelated modified and untracked files.
3. Keep slide 1 to a single foreground machine unless the owner explicitly asks for more.
4. Preserve the slide 1 ultra-wide bottom anchor unless the artwork or requested composition changes.
5. Keep slides 2 and 3 on the owner-approved v2 artwork.
6. Keep slides 4–8 free of added foreground machines.
7. Record every completed Claude or Codex change in `CHANGELOG.md` and refresh this handoff.

## Access notes

- GitHub remote: https://github.com/KartarC/wavlon-lasers-website.git.
- GitHub CLI is authenticated for KartarC.
- Production URL: https://wavlonlasers.com.
- Latest product deployment: https://vercel.com/infinara/wavlon-lasers-website/8fvCRqGjCec1FQHNbDjaHZbPYyv4.
