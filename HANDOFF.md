# Current Handoff

Last updated: 2026-07-21 by Claude (SEO OG tags + internal cross-links)

## Current state

- Active branch: `claude/seo-og-links`, branched from `origin/main` (after PR #10 merged).
- Purpose: SEO technical sprint items 2 & 3 — Open Graph image fixes + internal cross-linking between tube cutting product pages.
- Pre-existing work: `assets/powercut-guide/` is untracked and is not part of this branch.
- Production `main` is at the merge commit of PR #10 (llms.txt, T-Series schema, title tags).

### Changes on this branch

| File | Change |
|------|--------|
| `index.html` | `og:image` changed from `favicon-192.png` (192×192 icon) → `tubecut-double-chuck-hero.png` (1672×941) |
| `machines/fiber-laser-tube-cutting/triple-chuck/index.html` | `og:title` updated; `og:image` + `og:url` added; "Also Consider → Double Chuck" cross-link section added before footer |
| `machines/fiber-laser-tube-cutting/double-chuck/index.html` | "Also Consider → Triple Chuck" cross-link section added before footer |
| `machines/fiber-laser-sheet-cutting/pro-cut-series/index.html` | `og:title` updated; `og:image` + `og:url` added |
| `machines/fiber-laser-welding/air-cooled-series/index.html` | `og:title` updated; `og:image` + `og:url` added |

## Production state

- `main` is at PR #10 merge; `llms.txt`, T-Series schema, and all 7 machine title tags are live at `https://wavlonlasers.com`.
- `claude/seo-og-links` branch is pending commit/push/PR.

## What the next assistant must do

1. Read `AGENTS.md` and the newest `CHANGELOG.md` entry before editing.
2. Run `git status --short --branch` and confirm `assets/powercut-guide/` remains untracked.
3. **Remaining SEO technical item**: review `sitemap.xml` — check that all current product pages are listed, `lastmod` dates are reasonable, and no defunct URLs (old S/P/X-Series paths if those were renamed) are included.
4. **Content SEO phase** (after sitemap):
   - Write a "fiber laser cutter Canada" pillar page targeting SD 21 keyword "laser cutter metal sheet"
   - Expand W-Series Air-Cooled page body copy to target "laser welding machine" (SD 44, vol 1,300/mo — highest volume keyword)
   - Improve ProCut/PowerCut/UltraCut meta descriptions to include "laser cutter metal sheet" naturally
5. **Product line note**: tube cutting = ONLY Double Chuck + Triple Chuck. T-Series and S-Series are not current products. Do not build new content or links targeting them.

## Access notes

- GitHub remote: `https://github.com/KartarC/wavlon-lasers-website.git`.
- GitHub CLI authenticated for `KartarC` on 2026-07-20.
- Vercel CLI authenticated for `kartarc` in team `infinara` on 2026-07-20.
- `https://wavlonlasers.com` returns `200 OK` from Vercel; `https://www.wavlonlasers.com` returns `307` redirect to apex domain.
