# Current Handoff

Last updated: 2026-07-20 15:06 EDT by Codex

## Current state

- Active branch: `codex/tubecut-double-chuck-gallery`, based on `origin/main` at `ffafa89`.
- Purpose: publish the complete rebranded Double Chuck image set, transparent homepage/mega-menu image, and dedicated product gallery.
- Pre-existing work: `assets/powercut-guide/` is untracked and is not part of this branch.
- Product commit: `5e93c19`; collaboration-record commit follows.
- GitHub: branch pushed; draft PR #4 is open.
- Vercel preview: deployment `dpl_4VnWSbb9KvHCic5NNAJC8qMyr4nB` is `Ready` at `https://wavlon-lasers-website-9l9iecph7-infinara.vercel.app`.
- Production branch: `main` at `ffafa89`; production remains unchanged until PR #4 is merged.
- New image assets: `assets/tubecut-double-chuck-view-01.png` through `assets/tubecut-double-chuck-view-07.png`, all 1672×941 RGBA with transparent backgrounds.
- Homepage and shared mega menu use `assets/tubecut-double-chuck-view-07.png`; the Double Chuck page contains a seven-view selectable gallery.
- Shared partials now use current Double/Triple Chuck links. `build.js` consumes existing cookie-consent tags during sync, preventing duplicates.
- Brand reference logo for future manufacturer-image edits: `C:\Users\Karta\OneDrive - Rise Tek Inc\Wavlon Lasers\Marketing Department\Design Space\Wavlon Logo\wavlon_lasers_full_logo_transparent.png`.
- Triple Chuck: deliberately unchanged; waiting for user-supplied source pictures.

## Production state

- `main` is at `ffafa89` and `https://wavlonlasers.com` still serves the earlier approved Double Chuck hero update.
- PR #4 is preview-only until reviewed and merged; a merge to `main` triggers the production Vercel deployment.

## What the next assistant must do

1. Read `AGENTS.md` and the newest `CHANGELOG.md` entry before editing.
2. Run `git status --short --branch` and confirm `assets/powercut-guide/` remains untracked.
3. Review PR #4 and its Vercel preview. Do not regenerate or overwrite the seven approved Double Chuck views unless the user requests revisions.
4. If the user approves production, merge PR #4 and verify the resulting production deployment, homepage image, mega-menu image, and gallery asset delivery; then log the deployment in `CHANGELOG.md` and refresh this handoff.
5. Do not start Triple Chuck imagery until the user provides its source pictures.

## Access notes

- GitHub remote: `https://github.com/KartarC/wavlon-lasers-website.git`.
- GitHub CLI authenticated for `KartarC` on 2026-07-20.
- Vercel CLI authenticated for `kartarc` in team `infinara` on 2026-07-20.
- `https://wavlonlasers.com` returns `200 OK` from Vercel; `https://www.wavlonlasers.com` returns `307` redirect to apex domain.
