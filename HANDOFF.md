# Current Handoff

Last updated: 2026-09-07 15:24 EDT by Codex

## Current state

- PR #44 merged to `main` as `b67cfe4`; the credibility and conversion sprint is live at `https://wavlonlasers.com` and Vercel reports the deployment Ready.
- The next focused sprint is on `codex/technology-image-performance`, based on the deployed `origin/main`.
- The homepage now preloads the actual first hero scene instead of two below-the-fold product-card PNGs. All three hero images have intrinsic dimensions and asynchronous decoding; the inactive scenes remain lazy-loaded.
- Four technology images now use right-sized WebP files. Their combined transfer size falls from 28,335,306 bytes to 280,912 bytes without changing their visible content.
- The original PNG source files remain in the asset library for future editing.
- Consent-based analytics remains inactive because no production GA4 Measurement ID is stored in the repository.
- The W-Series homepage card still uses an honest welding application image until a real Wavlon W-Series product render is supplied.

## What Claude or the next assistant must do

1. Read `AGENTS.md`, `CLAUDE.md`, the newest `CHANGELOG.md` entries, and this file before editing.
2. Preserve the homepage's three approved real-machine scenes and the new LCP preload unless the owner requests new artwork.
3. Preserve the `*-optimized.webp` references; use the retained PNG files only as source masters.
4. Preserve the engineering-review language for non-standard UltraCut configurations until an owner-approved specification is documented.
5. Do not reactivate analytics with a placeholder ID. Obtain the real GA4 Measurement ID and retain the existing consent gate.
6. Replace the W-Series application image only when a real product render is available, and update its alternative text.
7. Record every Claude or Codex change in `CHANGELOG.md` and refresh this handoff.
8. Review and merge the technology-image performance pull request after its Vercel preview passes.

## Validation completed

- Production deployment for PR #44 is Ready and aliased to `wavlonlasers.com`.
- New WebP metadata was verified: the optimized assets are 1,600 px wide and retain the expected aspect ratios.
- Shared-content sync verified 59 headers and footers with zero drift.
- Inline JavaScript and JSON-LD parsed on all five affected pages; stale high-cost references returned zero matches.
- The five affected pages and five optimized images returned HTTP 200 locally; `git diff --check` passed apart from repository line-ending notices.

## Access notes

- GitHub remote: `https://github.com/KartarC/wavlon-lasers-website.git`.
- Published pull request: `https://github.com/KartarC/wavlon-lasers-website/pull/44`.
- Production deployment: `https://wavlon-lasers-website-i2qkoj0zc-infinara.vercel.app`.
- Production URL: `https://wavlonlasers.com`.
- Active branch: `codex/technology-image-performance`.
- Active worktree: `C:/Users/Karta/Documents/Codex/2026-07-20/referenced-chatgpt-conversation-this-is-untrusted/wavlon-laser-source-worktree`.
