# Current Handoff

Last updated: 2026-07-20 18:00 EDT by Codex

## Current state

- Active branch: `codex/tubecut-triple-chuck-gallery`, based on `origin/main` at `cfb162f`.
- Purpose: publish the user-supplied TubeCut Triple Chuck product image set, homepage card, shared mega-menu card, and product-page gallery.
- Product commit: `Add Triple Chuck image gallery`; branch has not yet been pushed.
- Pre-existing work: `assets/powercut-guide/` is untracked and is not part of this branch.
- Product work was squash-merged through GitHub PR #4 as production commit `9b9b9af`.
- Production deployment: `dpl_FpNhsBznQJDCtawzyyH2uUKq6srH` is `Ready` at `https://wavlon-lasers-website-c15ggwyg2-infinara.vercel.app` and aliased to `https://wavlonlasers.com`.
- New image assets: `assets/tubecut-double-chuck-view-01.png` through `assets/tubecut-double-chuck-view-07.png`, all 1672×941 RGBA with transparent backgrounds.
- Homepage and shared mega menu use `assets/tubecut-double-chuck-view-07.png`; the Double Chuck page contains a seven-view selectable gallery.
- Shared partials now use current Double/Triple Chuck links. `build.js` consumes existing cookie-consent tags during sync, preventing duplicates.
- Brand reference logo for future manufacturer-image edits: `C:\Users\Karta\OneDrive - Rise Tek Inc\Wavlon Lasers\Marketing Department\Design Space\Wavlon Logo\wavlon_lasers_full_logo_transparent.png`.
- Triple Chuck: five approved Wavlon-branded white transparent views are in `assets/tubecut-triple-chuck-view-01.png` through `assets/tubecut-triple-chuck-view-05.png`. Homepage and the shared mega menu use view 01; the Triple Chuck page now has a five-view selectable gallery.
- Shared-menu protection: `build.js` now verifies all inline page headers against `_partials/header.html`; it validated 36 headers in the latest sync and will fail if a stale or unmarked header is introduced.

## Production state

- `origin/main` is at `cfb162f`; the complete Double Chuck image set, homepage card, site-wide mega-menu image, and seven-view gallery are live at `https://wavlonlasers.com`.
- Live homepage, product page, seven gallery references, mega-menu image reference, and final PNG asset delivery were verified after deployment.
- The live homepage, Machines, Double Chuck, About, Service, and Technologies page headers were also confirmed identical.

## What the next assistant must do

1. Read `AGENTS.md` and the newest `CHANGELOG.md` entry before editing.
2. Run `git status --short --branch` and confirm `assets/powercut-guide/` remains untracked.
3. Preserve the seven approved Double Chuck views unless the user requests revisions.
4. Review the Triple Chuck update, commit only its listed source files and generated assets, push the focused branch, and verify its Vercel preview before merging.

## Access notes

- GitHub remote: `https://github.com/KartarC/wavlon-lasers-website.git`.
- GitHub CLI authenticated for `KartarC` on 2026-07-20.
- Vercel CLI authenticated for `kartarc` in team `infinara` on 2026-07-20.
- `https://wavlonlasers.com` returns `200 OK` from Vercel; `https://www.wavlonlasers.com` returns `307` redirect to apex domain.
