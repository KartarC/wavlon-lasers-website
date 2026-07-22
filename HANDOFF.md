# Current Handoff

Last updated: 2026-07-22 by Claude (SEO content phase — pillar page + welding hub)

## Current state

- Active branch: `claude/seo-content-phase`, branched from `origin/main` after PR #13.
- Purpose: First content-phase work — a Canadian buyer's-guide pillar page and a substantive expansion of the welding hub.
- Pre-existing work: `assets/powercut-guide/` is untracked and is not part of this branch.

### Product line

Read the Product Line section at the top of `CLAUDE.md` before writing any content. Short version: the line is ProCut / PowerCut / UltraCut (sheet), TubeCut Double Chuck / Triple Chuck (tube), Tower Storage System, Air-Cooled W-Series. S/P/X/T-Series are retired redirect stubs. `BLT T-Series` is a BOCI head name and stays.

### Changes on this branch

| File | Change |
|------|--------|
| `fiber-laser-cutting-canada/index.html` | **New** pillar page, 1,212 words — targets "fiber laser cutter Canada" / "laser cutter metal sheet" |
| `machines/fiber-laser-welding/index.html` | Expanded from 1 paragraph to 714 words targeting "laser welding machine"; retitled, full OG set, `Product` schema |
| `about/index.html` | Stale series names in the positioning paragraph → current names |
| `_partials/footer.html` | Added "Canadian Buyer's Guide" to the Company column (site-wide link to the pillar page) |
| `sitemap.xml` | 35 → 36 URLs |
| `llms.txt` | New Guides section |

### Sourcing rule used

Every spec and company claim in the new copy was traced to an existing page — the W-Series spec table, the product cards, `service/`, or `financing/`. Nothing was invented. Keep this up: the site's credibility problem is not thin content, it is claims that do not match the spec sheets.

## What the next assistant must do

1. Read `AGENTS.md`, `CLAUDE.md`, and the newest `CHANGELOG.md` entry before editing.
2. Run `git status --short --branch` and confirm `assets/powercut-guide/` remains untracked.
3. **Continue the content phase.** Sensible next targets, in rough priority order:
   - Meta descriptions on ProCut / PowerCut / UltraCut to work in "laser cutter metal sheet" naturally
   - A tube-cutting guide section or page targeting "fiber laser tube cutting" (SD 5, 110/mo — low difficulty, quick win)
   - Link the pillar page from the homepage body, not just the footer
4. **Blocked, needs the owner:**
   - Legacy S/P/X labels remain in `applications/` (incl. a material capability table with S/P/X columns), `industries/`, and both automation pages. Link targets are already correct; only labels are stale. The old ranges (S 1–6kW, P 6–20kW, X 20–30kW+) do **not** map onto ProCut/PowerCut/UltraCut (3–12 / 3–12 / 3–20kW+) — get real figures, or drop the power columns. Do not interpolate.
   - ProCut still submits `source: 's-series-page'`, mislabelling its leads in the CRM.
5. **Known pre-existing bug:** `--bg-light` is used on 7 pages but never defined in `shared.css`, so those backgrounds fall back to transparent. Affects `.ssm-item` and `.series-card-visual`. Worth a small separate PR.

## Access notes

- GitHub remote: `https://github.com/KartarC/wavlon-lasers-website.git`.
- GitHub CLI authenticated for `KartarC` on 2026-07-20.
- Vercel CLI authenticated for `kartarc` in team `infinara` on 2026-07-20.
- `https://wavlonlasers.com` returns `200 OK`; `www` 307-redirects to apex. Vercel `trailingSlash: false`, so directory URLs 308 to the non-slash form — follow redirects when verifying with curl.
- Local preview: `.claude/launch.json` runs `npx serve`, but the harness launches it with cwd = `Desktop` and `serve` v14 rejects `-p`, so it serves the wrong directory. Verify via `file://` URLs instead.
