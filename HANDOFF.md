# Current Handoff

Last updated: 2026-08-20 15:24 EDT by Codex

## Current state

- Production: pull request #40 was squash-merged to `main` as `515c5474cf10f9987b81ee72a2cdbce722df66e3`; Vercel production deployment `dpl_8brMBybn7HxG9GVkj4B7TQXcgq1g` is READY.
- Live hub: `https://wavlonlasers.com/technologies/laser-heads/` now presents BOCI and Precitec as separate brand paths while preserving every existing BOCI head and Bochu controller page.
- Live Precitec routes: `/technologies/laser-heads/precitec/`, `/technologies/laser-heads/precitec/procutter-thunder/`, and `/technologies/laser-heads/precitec/procutter-2-0/`.
- The ProCutter Thunder page uses official specifications for the 6.6–12 kW platform. The ProCutter 2.0 page uses official specifications for configurations up to 85 kW. Do not broaden these values or imply universal compatibility.
- All product media was downloaded from the two official Precitec product pages, optimized to WebP, stored under `assets/laser-heads/precitec/`, and recorded in `assets/data/precitec-source-manifest.json`.
- The shared Technologies mega menu, mobile drawer, footer, Technologies hub, sitemap, and llms.txt include the new Precitec paths. `npm.cmd run sync` verified 59 shared headers and footers.
- `assets/data/laser-heads.json` is the normalized static catalog for the two Precitec options and records its official source URLs.
- Integration language is deliberately cautious: final head, source, fiber, controls, machine geometry, process gas, safety, and regulatory fit must be confirmed by Wavlon engineering for each complete machine package.
- Production verification passed: the new routes/catalog/media returned HTTP 200, the homepage navigation contains Precitec, and the post-deploy Vercel runtime-error scan was clean.
- The original OneDrive Desktop checkout remains untouched because it contains unrelated modified and untracked work. This clean worktree is at `C:/Users/Karta/Documents/Codex/2026-07-20/referenced-chatgpt-conversation-this-is-untrusted/wavlon-laser-source-worktree`.

## What Claude or the next assistant must do

1. Read `AGENTS.md`, `CLAUDE.md`, the newest `CHANGELOG.md` entry, and this file before editing.
2. Preserve the official Precitec source links and exact product-level specifications; do not invent certifications or compatibility claims.
3. Use `tools/laser-heads/build-precitec-pages.mjs` for repeatable catalog/page changes and `tools/laser-heads/optimize-precitec.cjs` for any newly downloaded images.
4. Run `npm.cmd run sync` after any shared header/footer edit.
5. Record every Claude or Codex change in `CHANGELOG.md` and refresh this handoff.
6. This production publish is complete. Begin future work from the latest `origin/main`; do not reuse either merged feature branch.

## Access notes

- GitHub remote: `https://github.com/KartarC/wavlon-lasers-website.git`.
- Production URL: `https://wavlonlasers.com`.
- Official sources: Precitec laser-cutting-head portfolio, ProCutter Thunder, and ProCutter 2.0 product pages.