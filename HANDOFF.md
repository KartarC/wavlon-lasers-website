# Current Handoff

Last updated: 2026-08-26 13:51 EDT by Codex

## Current state

- The ProCutter 2.0 hero overlap is fixed on `codex/fix-procutter-2-hero-overlap`.
- The portrait product image now has a dedicated contained hero layout with protected bottom clearance. Its specification rail uses positive separation instead of overlapping the image card.
- A mobile rule reduces the image and maintains the same layer separation below 720 px.
- The fix is deliberately model-specific. ProCutter Thunder, the shared laser-head hub, product content, navigation, and official imagery remain unchanged.
- The repeatable generator now emits the ProCutter 2.0 modifier class, so future page regeneration preserves the correction.
- Validation passes: generator run, 59 shared header/footer checks, generator syntax, model-class verification, desktop/mobile separation rules, and focused diff checks.
- The branch is based on production `origin/main` at `f3f317a`. The original OneDrive Desktop checkout remains untouched.

## What Claude or the next assistant must do

1. Read `AGENTS.md`, `CLAUDE.md`, the newest `CHANGELOG.md` entry, and this file before editing.
2. Preserve the `lh2-detail-hero--procutter-2-0` modifier and its contained visual/specification spacing when regenerating the Precitec pages.
3. Continue to use `tools/laser-heads/build-precitec-pages.mjs` for generated Precitec page changes, followed by `npm.cmd run sync` when shared partials are touched.
4. Record every Claude or Codex change in `CHANGELOG.md` and refresh this handoff.
5. Complete the normal pull-request/Vercel workflow and use the pull-request status comment as the authoritative final deployment record.

## Access notes

- GitHub remote: `https://github.com/KartarC/wavlon-lasers-website.git`.
- Production URL: `https://wavlonlasers.com`.
- Target route: `https://wavlonlasers.com/technologies/laser-heads/precitec/procutter-2-0/`.
- Active worktree: `C:/Users/Karta/Documents/Codex/2026-07-20/referenced-chatgpt-conversation-this-is-untrusted/wavlon-laser-source-worktree`.
