# Current Handoff

Last updated: 2026-07-21 by Claude (SEO technical sprint)

## Current state

- Active branch: `claude/seo-technical`, branched from `origin/main` at `e0fedf9`.
- Purpose: SEO technical sprint — llms.txt creation, T-Series schema, title tag optimisation across all machine pages.
- Pre-existing work: `assets/powercut-guide/` is untracked and is not part of this branch.
- Production `main` is at `e0fedf9` (Triple Chuck gallery, both image sets, shared menu all live).

### Changes on this branch (not yet merged)

| File | Change |
|------|--------|
| `llms.txt` | New — AI search crawler declaration (ChatGPT, Perplexity, Bing Copilot) |
| `machines/fiber-laser-tube-cutting/t-series/index.html` | Added Product + BreadcrumbList JSON-LD schema; shortened title to 56 chars |
| `machines/fiber-laser-sheet-cutting/pro-cut-series/index.html` | Title 67→55 chars: "ProCut Series Fiber Laser Cutter 3–12kW \| Wavlon Lasers" |
| `machines/fiber-laser-sheet-cutting/power-cut-series/index.html` | Title 69→57 chars: "PowerCut Series Fiber Laser Cutter 3–12kW \| Wavlon Lasers" |
| `machines/fiber-laser-sheet-cutting/ultra-cut-series/index.html` | Title 69→57 chars: "UltraCut Series Fiber Laser Cutter 3–20kW \| Wavlon Lasers" |
| `machines/fiber-laser-tube-cutting/double-chuck/index.html` | Title 82→62 chars: "TubeCut Double Chuck Fiber Laser Tube Cutter \| Wavlon Lasers" |
| `machines/fiber-laser-tube-cutting/triple-chuck/index.html` | Title 91→62 chars: "TubeCut Triple Chuck Fiber Laser Tube Cutter \| Wavlon Lasers" |
| `machines/fiber-laser-welding/air-cooled-series/index.html` | Title 75→63 chars: "W-Series Air-Cooled Fiber Laser Welding Machine \| Wavlon Lasers" |

## Production state

- `main` is at `e0fedf9`; Double Chuck and Triple Chuck image sets, homepage cards, site-wide mega-menu images, and selectable galleries are live at `https://wavlonlasers.com`.
- `claude/seo-technical` branch is pending review and PR.

## What the next assistant must do

1. Read `AGENTS.md` and the newest `CHANGELOG.md` entry before editing.
2. Run `git status --short --branch` and confirm `assets/powercut-guide/` remains untracked.
3. Preserve the seven approved Double Chuck views and five Triple Chuck views unless the user requests revisions.
4. Continue the SEO content phase after this PR merges:
   - Write a "fiber laser cutter Canada" pillar page targeting SD 21 keyword "laser cutter metal sheet"
   - Improve ProCut/PowerCut/UltraCut meta descriptions to include "laser cutter metal sheet" naturally
   - Build internal link structure from homepage → machine category → product pages
   - Target "laser welding machine canada" content for Air-Cooled W-Series (SD 44, highest volume 1,300/mo)

## Access notes

- GitHub remote: `https://github.com/KartarC/wavlon-lasers-website.git`.
- GitHub CLI authenticated for `KartarC` on 2026-07-20.
- Vercel CLI authenticated for `kartarc` in team `infinara` on 2026-07-20.
- `https://wavlonlasers.com` returns `200 OK` from Vercel; `https://www.wavlonlasers.com` returns `307` redirect to apex domain.
