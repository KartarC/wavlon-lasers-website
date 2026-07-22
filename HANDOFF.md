# Current Handoff

Last updated: 2026-07-21 by Claude (T-Series retirement + tube hub rebuild + sitemap)

## Current state

- Active branch: `claude/seo-sitemap-tseries`, branched from `origin/main` (after PR #11 merged).
- Purpose: Retire the discontinued T-Series, rebuild both tube hub pages around the real product line, and close sitemap coverage gaps.
- Pre-existing work: `assets/powercut-guide/` is untracked and is not part of this branch.

### Product line — read this before writing any content

Tube cutting is **only** TubeCut Double Chuck and TubeCut Triple Chuck. T-Series, S-Series, P-Series, and X-Series are **not current products**. Legacy paths are redirect stubs:

| Legacy path | Redirects to |
|-------------|--------------|
| `/machines/fiber-laser-sheet-cutting/s-series/` | ProCut Series |
| `/machines/fiber-laser-sheet-cutting/p-series/` | PowerCut Series |
| `/machines/fiber-laser-sheet-cutting/x-series/` | UltraCut Series |
| `/machines/fiber-laser-tube-cutting/t-series/` | Tube cutting hub |
| `/machines/laser-head/**` (10 pages) | `/technologies/laser-heads/**` |

Verified specs (from the product pages' own spec tables):
- **Double Chuck** — 1.5–12kW, ⌀120–360mm, 6,000mm bed, ±0.05mm, 2 chucks. Models TDC-120/160/240/360.
- **Triple Chuck** — 6–30kW, up to ⌀680mm round / 570mm square, 12,000mm bed, 1,500kg, 3 chucks. Models TTC-360/520/680-570.

### Changes on this branch

| File | Change |
|------|--------|
| `machines/fiber-laser-tube-cutting/t-series/index.html` | Full product page → redirect stub to the tube hub |
| `machines/fiber-laser-tube-cutting/index.html` | Lineup rebuilt: T-Series card → Double Chuck + Triple Chuck cards; title/description/OG fixed (were "T-Series"); stale S/P/X bundle callout corrected |
| `machines/index.html` | Tube section: T-Series card → Double Chuck + Triple Chuck cards; laser-head CTA repointed off the redirect stub |
| `parts/index.html` | Order-form dropdown: "T-Series Tube" → Double Chuck + Triple Chuck |
| `technologies/laser-heads/{index,controllers/tube,tube-cutting-heads}/index.html` | "View T-Series Machine" CTAs → tube hub |
| `header.html`, `footer.html` | Root reference copies: T-Series link → Double + Triple Chuck |
| `llms.txt` | T-Series entry removed |
| `sitemap.xml` | 24 → 35 URLs (added `/technologies/` hub, 7 laser-head sub-pages, 3 legal pages); `lastmod` on every entry |
| `contact/`, `financing/`, `ultra-cut-series/`, `laser-heads/selection-guide/` | Added missing `<!-- FOOTER -->` markers (see bug note below) |

### Latent bug fixed

`build.js` throws on an unmarked inline **header** but silently ignores an unmarked **footer**. Four pages had `</footer>` with no marker, so their footers had drifted and could never sync. Markers added. If you add a page, include both `<!-- HEADER — inline copy -->` and `<!-- FOOTER — inline copy -->` or the footer will silently rot. Consider making `build.js` throw on unmarked footers too.

## What the next assistant must do

1. Read `AGENTS.md` and the newest `CHANGELOG.md` entry before editing.
2. Run `git status --short --branch` and confirm `assets/powercut-guide/` remains untracked.
3. **Finish the legacy-naming cleanup.** Link targets are already correct everywhere; only visible labels are stale. Remaining: `about/` (positioning paragraph), `applications/` (~17, incl. a material capability table with S/P/X columns), `machines/fiber-laser-automation/` + `tower-system/` (3 comparison cards + meta description), `industries/`, `parts/` (2 part descriptions), `technologies/laser-heads/*`.
   - **Blocked on confirmed figures**: the old ranges (S 1–6kW, P 6–20kW, X 20–30kW+) do not map onto ProCut/PowerCut/UltraCut (3–12 / 3–12 / 3–20kW+). Ask the user before rewriting any comparison table — do not interpolate.
   - **Do not rename `BLT T-Series`** on the laser-head pages — that is a genuine BOCI cutting-head product name, unrelated to the retired machine.
4. **Content SEO phase** (after the cleanup):
   - "fiber laser cutter Canada" pillar page targeting "laser cutter metal sheet" (SD 21, 170/mo CA)
   - Expand the W-Series Air-Cooled page for "laser welding machine" (SD 44, 1,300/mo — highest-volume target)
   - Meta descriptions on ProCut/PowerCut/UltraCut to include "laser cutter metal sheet" naturally

## Access notes

- GitHub remote: `https://github.com/KartarC/wavlon-lasers-website.git`.
- GitHub CLI authenticated for `KartarC` on 2026-07-20.
- Vercel CLI authenticated for `kartarc` in team `infinara` on 2026-07-20.
- `https://wavlonlasers.com` returns `200 OK` from Vercel; `https://www.wavlonlasers.com` returns `307` redirect to apex domain.
- Local preview: `.claude/launch.json` runs `npx serve` but the harness launches it with cwd = `Desktop`, so it serves the wrong directory and 404s. Verify via `file://` URLs instead, or fix the config to use an absolute path.
