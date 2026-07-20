# Current Handoff

Last updated: 2026-07-20 by Codex

## Current state

- Active branch: `codex/tubecut-double-chuck-production-log`, based on production `main` at `17e6ee1`.
- Purpose: record the verified production deployment of the first Double Chuck image update.
- Pre-existing work: `assets/powercut-guide/` is untracked and is not part of this branch.
- Production branch: `main` at `17e6ee1`; the Double Chuck image update is live at `wavlonlasers.com`.
- Supplied machine render: stored as `assets/tubecut-double-chuck-hero.png` and used on the homepage card and Double Chuck page hero.
- Brand reference logo for future manufacturer-image edits: `C:\Users\Karta\OneDrive - Rise Tek Inc\Wavlon Lasers\Marketing Department\Design Space\Wavlon Logo\wavlon_lasers_full_logo_transparent.png`.
- Triple Chuck: deliberately unchanged; waiting for user-supplied source pictures.
- Review: GitHub PR #2 was squash-merged as `17e6ee1`.
- Production: Vercel deployment `dpl_DHuzNyadjNqkE9tAFUbEVodHzPPo` is `Ready`; live HTML and image delivery were verified.

## What is on production main (live at wavlonlasers.com)

Claude product changes merged to `main` before the collaboration workflow existed:

| Commit | Date | Summary |
|--------|------|---------|
| `0d20ccb` | 2026-06-16 | Remove street address; add FAQ chips + CTA buttons to chat |
| `ff03eb5` | 2026-06-22 | Sitemap update (TubeCut pages, remove stale laser-head URLs) |
| `81aaaef` | 2026-06-24 | UltraCut spec WUC badge |
| `3818de0` | 2026-07-02 | Chat widget full Intercom-style redesign |
| `8b39c2d` | 2026-07-09 | Fix: FAQ chip click was closing the chat panel |

Codex changes also on `main` (on top of the above):

| Commit | Date | Summary |
|--------|------|---------|
| `b56a30c`–`75f6a0c` | 2026-07-09 | ProCut quote/catalog templates, image fixes, dynamic title page, Customer Requirements page |

## What the next assistant must do

1. Read `AGENTS.md` and `CHANGELOG.md` before editing.
2. Run `git status --short --branch` and confirm `assets/powercut-guide/` remains untracked.
3. Review the latest Double Chuck changelog entry and preserve the supplied render unless the user requests a revision.
4. For each new manufacturer image, remove manufacturer wording, recolor blue machine panels to white, and apply the supplied Wavlon logo while preserving machine geometry and realism.
5. Do not start Triple Chuck imagery until the user provides its source pictures.

## Access notes

- GitHub remote: `https://github.com/KartarC/wavlon-lasers-website.git`.
- GitHub CLI authenticated for `KartarC` on 2026-07-20.
- Vercel CLI authenticated for `kartarc` on 2026-07-20. No local `.vercel/project.json` present before deployment.
- `https://wavlonlasers.com` returns `200 OK` from Vercel; `https://www.wavlonlasers.com` returns `307` redirect to apex domain.
