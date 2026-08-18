# Current Handoff

Last updated: 2026-08-18 14:49 EDT by Codex

## Current state

- Homepage portfolio correction product commit: `1ea8cf5` (PR #27, Correct portfolio hero staging and branding).
- Homepage portfolio hero: the live v3 artwork places both tube-cutting systems on a clearly visible showroom floor plane with support legs and contact shadows, balances all five machines across foreground and midground, and preserves the dark left copy zone.
- Branding: prominent machine panels follow the official `wavlon_lasers_full_logo_transparent.png` reference; small panels avoid invented wordmarks.
- Performance: the live 1672×941 WebP is 75,886 bytes.
- Existing hero layout, copy, transparent navigation behavior, Sheet Laser scene, Tube Laser scene, and five capability scenes are unchanged.
- Deployment: Vercel production check passed for `1ea8cf5`; https://wavlonlasers.com returned 200 and references `/assets/hero-scene-portfolio-v3.webp`; the live asset returned 200 as `image/webp`.
- Preserved work: generated-page line-ending changes, untracked `assets/hero-ai/*-bg.png` source files, and `assets/powercut-guide/` remain outside this task.

## What the next assistant must do

1. Read `AGENTS.md`, `CLAUDE.md`, the newest `CHANGELOG.md` entry, and this file before editing.
2. Run `git status --short --branch` and preserve all unrelated modified and untracked files.
3. Treat any further visual adjustment as a new focused change and update both collaboration records.
4. Record every completed Claude or Codex change in `CHANGELOG.md` and refresh this handoff.

## Access notes

- GitHub remote: https://github.com/KartarC/wavlon-lasers-website.git.
- GitHub CLI is authenticated for KartarC.
- Production URL: https://wavlonlasers.com.
- Vercel production check: https://vercel.com/infinara/wavlon-lasers-website/BkdSYmXgm1ychjVvbBvUwLsCovyj.