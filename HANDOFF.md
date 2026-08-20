# Current Handoff

Last updated: 2026-08-20 17:36 EDT by Codex

## Current state

- A new visual-refresh change is complete on `codex/technology-visual-refresh` and is pending commit/publish.
- `technologies/index.html` now has four intact, equal-height cards. The previous nested-link markup that caused the laser-head image and text to occupy separate grid cells has been removed.
- The Technologies page uses the official Yaskawa America and TEYU S&A partner logos stored under `assets/technology-partners/`.
- The laser-head hub hero uses a generated, product-free industrial studio background at `assets/laser-heads/laser-head-hero-studio-v2.webp`; real BOCI and Precitec product images are layered over it as transparent cutouts, side by side.
- Transparent product assets are `assets/laser-heads/boci-blt-hero-transparent.png`, `assets/laser-heads/precitec/procutter-thunder/thunder-product-transparent.png`, and `assets/laser-heads/precitec/procutter-2-0/procutter-product-transparent.png`.
- BOCI and Precitec visuals are larger in the hero, brand cards, model cards, and Precitec product hero sections. The generator and static catalog both point to the transparent primary images.
- Visible emojis were removed from customer-facing HTML, JavaScript, and CSS. Chat, contact, financing, mega-menu markers, and source-comparison controls now use inline SVG icons. The Unicode emoji audit passes with zero findings.
- Shared navigation was synchronized to 59 pages. Future shared header/footer edits still require `npm.cmd run sync`.
- Validation passed for HTML structure, nested anchors, local routes/assets, transparency, generator output, shared-content sync, emoji audit, and `git diff --check`.
- The original OneDrive Desktop checkout remains untouched. The active clean worktree is `C:/Users/Karta/Documents/Codex/2026-07-20/referenced-chatgpt-conversation-this-is-untrusted/wavlon-laser-source-worktree`.

## What Claude or the next assistant must do

1. Read `AGENTS.md`, `CLAUDE.md`, the newest `CHANGELOG.md` entry, and this file before editing.
2. Preserve the generated hero background as background-only; use real manufacturer product cutouts above it so product geometry and logos remain accurate.
3. Preserve official partner-logo provenance: Yaskawa from `https://www.yaskawa.com/` and TEYU S&A from `https://www.teyuchiller.com/`.
4. Use `tools/laser-heads/build-precitec-pages.mjs` for Precitec hub/product regeneration, then run `npm.cmd run sync` after shared header/footer changes.
5. Keep customer-facing UI emoji-free and use accessible SVG icons for future interface elements.
6. Record every Claude or Codex change in `CHANGELOG.md` and refresh this handoff.
7. Publish this branch through the normal pull-request/Vercel workflow, then replace the pending state above with the final commit, PR, and production deployment details.

## Access notes

- GitHub remote: `https://github.com/KartarC/wavlon-lasers-website.git`.
- Production URL: `https://wavlonlasers.com`.
- Primary manufacturer sources: Precitec laser-head pages, Yaskawa America, and TEYU S&A.