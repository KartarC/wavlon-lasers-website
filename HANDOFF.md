# Current Handoff

Last updated: 2026-08-20 15:18 EDT by Codex

## Current state

- Active branch: `codex/precitec-laser-heads`, based on production `origin/main` at `463c14d`.
- The laser-head hub now presents BOCI and Precitec as separate brand paths while preserving all existing BOCI head and Bochu controller pages.
- New Precitec routes are `/technologies/laser-heads/precitec/`, `/technologies/laser-heads/precitec/procutter-thunder/`, and `/technologies/laser-heads/precitec/procutter-2-0/`.
- The ProCutter Thunder page uses official specifications for the 6.6–12 kW platform. The ProCutter 2.0 page uses official specifications for configurations up to 85 kW. Do not broaden these values or imply universal compatibility.
- All product media was downloaded from the two official Precitec product pages, optimized to WebP, stored under `assets/laser-heads/precitec/`, and recorded in `assets/data/precitec-source-manifest.json`.
- The shared Technologies mega menu, mobile drawer, footer, Technologies hub, sitemap, and llms.txt include the new Precitec paths. `npm.cmd run sync` verified 59 shared headers and footers.
- `assets/data/laser-heads.json` is the normalized static catalog for the two Precitec options and records its official source URLs.
- Integration language is deliberately cautious: final head, source, fiber, controls, machine geometry, process gas, safety, and regulatory fit must be confirmed by Wavlon engineering for each complete machine package.
- The original OneDrive Desktop checkout remains untouched because it contains unrelated modified and untracked work. This clean worktree is at `C:/Users/Karta/Documents/Codex/2026-07-20/referenced-chatgpt-conversation-this-is-untrusted/wavlon-laser-source-worktree`.

## What Claude or the next assistant must do

1. Read `AGENTS.md`, `CLAUDE.md`, the newest `CHANGELOG.md` entry, and this file before editing.
2. Preserve the official Precitec source links and exact product-level specifications; do not invent certifications or compatibility claims.
3. Use `tools/laser-heads/build-precitec-pages.mjs` for repeatable catalog/page changes and `tools/laser-heads/optimize-precitec.cjs` for any newly downloaded images.
4. Run `npm.cmd run sync` after any shared header/footer edit.
5. Record every Claude or Codex change in `CHANGELOG.md` and refresh this handoff.
6. The current change is locally validated and awaiting GitHub/Vercel publishing; after publication, record the final PR, commit, deployment, and public-route checks.

## Access notes

- GitHub remote: `https://github.com/KartarC/wavlon-lasers-website.git`.
- Production URL: `https://wavlonlasers.com`.
- Official sources: Precitec laser-cutting-head portfolio, ProCutter Thunder, and ProCutter 2.0 product pages.