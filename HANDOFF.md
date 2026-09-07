# Current Handoff

Last updated: 2026-09-07 03:02 EDT by Codex

## Current state

- The first credibility and conversion sprint is complete on `codex/credibility-conversion-sprint`, based on current `origin/main` at `e99b21e`.
- Product commit `a024696` is pushed and PR #44 is open. Both Vercel checks passed; production is unchanged.
- The homepage hero now contains only the approved portfolio, sheet-laser, and tube-laser scenes. The existing real-machine artwork and responsive framing remain unchanged.
- The W-Series homepage card uses a laser-welding application image instead of an unrelated BOCI cutting head. A real Wavlon W-Series product render is still preferred when available.
- UltraCut is consistently presented as 3–20 kW standard; non-standard configurations require engineering review. The unsupported 160 kW public claim has been removed from the affected product and hub surfaces.
- Generic BOCI ranking and conflicting ingress-protection claims were replaced with model-specific configuration language.
- The ProCut primary and secondary forms now use `pro-cut-series-page` and `pro-cut-series-ul-page`. Historical `s-series-page` records should remain untouched and may be normalized in reporting.
- The affected machine quote forms now verify the API response before displaying success.
- Consent-based analytics remains inactive because no production GA4 Measurement ID is stored in the repository.

## What Claude or the next assistant must do

1. Read `AGENTS.md`, `CLAUDE.md`, the newest `CHANGELOG.md` entry, and this file before editing.
2. Preserve the three-scene homepage hero and the approved real-machine artwork unless the owner requests a new composition.
3. Preserve the engineering-review language for non-standard UltraCut configurations until an owner-approved specification is documented.
4. Do not reactivate analytics with a placeholder ID. Obtain the real GA4 Measurement ID and retain the existing consent gate.
5. When a real W-Series product render becomes available, replace the current application image and update its alternative text.
6. Record every Claude or Codex change in `CHANGELOG.md` and refresh this handoff.
7. Review PR #44 and merge it when approved; production remains unchanged until the reviewed branch is merged.

## Validation completed

- Shared-content sync verified 59 headers and 59 footers with zero drift.
- Inline JavaScript parsed on all affected pages.
- Nine affected routes and the replacement image returned HTTP 200 locally.
- Homepage scene/control count is three and the public-facing 160 kW, WD-3015E, “World #1,” and conflicting generic IP claims are absent from the scoped pages.
- `git diff --check` passed apart from existing Windows line-ending notices.

## Access notes

- GitHub remote: `https://github.com/KartarC/wavlon-lasers-website.git`.
- Pull request: `https://github.com/KartarC/wavlon-lasers-website/pull/44`.
- Vercel preview: `https://wavlon-lasers-website-git-codex-credibility-con-04cd73-infinara.vercel.app` (Vercel authentication protected).
- Production URL: `https://wavlonlasers.com`.
- Active branch: `codex/credibility-conversion-sprint`.
- Active worktree: `C:/Users/Karta/Documents/Codex/2026-07-20/referenced-chatgpt-conversation-this-is-untrusted/wavlon-laser-source-worktree`.
