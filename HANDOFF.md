# Current Handoff

Last updated: 2026-09-07 15:28 EDT by Codex

## Current state

- PR #44 merged to `main` as `b67cfe4`; the credibility and conversion sprint is live.
- PR #45 merged to `main` as `78a10b9`; the homepage and technology image-delivery improvements are live at `https://wavlonlasers.com` and Vercel reports the deployment Ready.
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
8. Continue optimizing remaining large gallery images in focused groups, validating every replaced reference before publishing.

## Validation completed

- Production deployments for PR #44 and PR #45 are Ready and aliased to `wavlonlasers.com`.
- New WebP metadata was verified: the optimized assets are 1,600 px wide and retain the expected aspect ratios.
- Shared-content sync verified 59 headers and footers with zero drift.
- Inline JavaScript and JSON-LD parsed on all five affected pages; stale high-cost references returned zero matches.
- The five affected pages and five optimized images returned HTTP 200 locally; `git diff --check` passed apart from repository line-ending notices.
- The live homepage returned HTTP 200 with the intended hero preload and no stale card-image preloads. The live optimized 3D controller asset returned HTTP 200 as `image/webp` at 127,264 bytes.

## Access notes

- GitHub remote: `https://github.com/KartarC/wavlon-lasers-website.git`.
- Published pull requests: `https://github.com/KartarC/wavlon-lasers-website/pull/44` and `https://github.com/KartarC/wavlon-lasers-website/pull/45`.
- Production deployment: `https://wavlon-lasers-website-dktxvhkqb-infinara.vercel.app`.
- Production URL: `https://wavlonlasers.com`.
- Active branch: `codex/performance-deployment-record` (documentation-only record based on current `origin/main`).
- Active worktree: `C:/Users/Karta/Documents/Codex/2026-07-20/referenced-chatgpt-conversation-this-is-untrusted/wavlon-laser-source-worktree`.
