# Current Handoff

Last updated: 2026-09-08 02:00 EDT by Codex

## Current state

- PR #44 merged to `main` as `b67cfe4`; the credibility and conversion sprint is live.
- PR #45 merged to `main` as `78a10b9`; the homepage and technology image-delivery improvements are live at `https://wavlonlasers.com` and Vercel reports the deployment Ready.
- PR #47 merged to `main` as `37c4670`; the large gallery and shared-menu image optimization is live at `https://wavlonlasers.com` and Vercel reports the deployment Ready.
- PR #49 merged to `main` as `d6a12c5`; the accessibility and mobile-conversion pass is live at `https://wavlonlasers.com` and Vercel reports the deployment Ready.
- The Air-Cooled W-Series card has been removed from the homepage machine lineup on `codex/remove-homepage-welder`; the focused change is pending commit, pull request, and production deployment.
- The W-Series product page, welding hub, navigation and footer entries remain intact so this homepage-only removal is reversible.
- Every shared page now has a skip link, a verified `main#main-content` landmark, keyboard-operable desktop and mobile navigation, visible focus styling, improved muted-text contrast, and reduced-motion support.
- Mobile pages now provide a persistent Call / Get a Quote dock. Product-specific sticky quote bars supersede the global dock while visible and use accessible SVG dismiss controls.
- All 11 lead forms now use native required/email validation, associated labels, stable field names, contact autocomplete hints, and live success announcements. The financing FAQ now uses accessible accordion semantics.
- The homepage now preloads the actual first hero scene instead of two below-the-fold product-card PNGs. All three hero images have intrinsic dimensions and asynchronous decoding; the inactive scenes remain lazy-loaded.
- Forty-six browser-delivery images across both performance passes now use right-sized WebP files. The current pass replaces 42 large images and reduces their combined weight from 81,002,711 bytes to 3,625,014 bytes.
- The shared mega menu uses the same optimized ProCut, PowerCut, and UltraCut images across all 59 pages. A repository audit reports zero remaining customer-visible PNG/JPEG references larger than 1 MB.
- The original PNG source files remain in the asset library for future editing.
- Consent-based analytics remains inactive because no production GA4 Measurement ID is stored in the repository.
- The W-Series homepage card still uses an honest welding application image until a real Wavlon W-Series product render is supplied.

## What Claude or the next assistant must do

1. Read `AGENTS.md`, `CLAUDE.md`, the newest `CHANGELOG.md` entries, and this file before editing.
2. Preserve the homepage's three approved real-machine scenes and the new LCP preload unless the owner requests new artwork.
3. Preserve the `*-optimized.webp` browser references and shared-menu images; use the retained PNG files only as source masters or social/structured-data images.
4. Preserve the engineering-review language for non-standard UltraCut configurations until an owner-approved specification is documented.
5. Do not reactivate analytics with a placeholder ID. Obtain the real GA4 Measurement ID and retain the existing consent gate.
6. Keep the W-Series off the homepage until the owner explicitly requests its return. The existing product page and navigation remain available.
7. Record every Claude or Codex change in `CHANGELOG.md` and refresh this handoff.
8. After publishing the homepage removal, begin the technical SEO sprint: repair malformed internal links and sitemap conflicts, then improve key titles/descriptions and retired model references without inventing replacement specifications.

## Validation completed

- Production deployments for PR #44, PR #45, and PR #47 are Ready and aliased to `wavlonlasers.com`.
- New WebP metadata was verified: the optimized assets are 1,600 px wide and retain the expected aspect ratios.
- Shared-content sync verified 59 headers and footers with zero drift.
- Inline JavaScript and JSON-LD parsed on all five affected pages; stale high-cost references returned zero matches.
- The five affected pages and five optimized images returned HTTP 200 locally; `git diff --check` passed apart from repository line-ending notices.
- The live homepage returned HTTP 200 with the intended hero preload and no stale card-image preloads. The live optimized 3D controller asset returned HTTP 200 as `image/webp` at 127,264 bytes.
- For the current pass, 42 new WebP assets and 267 browser references were verified, all 64 changed HTML files parsed, all 59 sitemap routes and 42 new assets returned HTTP 200 locally, and no browser-visible raster reference over 1 MB remains.
- In production, the homepage, ProCut, PowerCut, and laser-head controller routes returned HTTP 200 and referenced optimized WebP files. The sampled menu, ProCut, and PowerCut assets returned HTTP 200 as `image/webp`.
- Accessibility/mobile validation: shared sync verified 59 headers, 59 main landmarks, and 59 footers with zero drift; JavaScript syntax checks passed; a static audit verified 11 forms, 75 labelled and named controls, 1,665 images with alternative text, 717 named buttons, unique IDs, and valid ARIA references; all 59 sitemap URLs returned HTTP 200 locally; `git diff --check` passed apart from line-ending notices.
- Production accessibility validation: the PR checks passed; Vercel deployment `wavlon-lasers-website-4hqh2ip3u-infinara.vercel.app` reached Ready with the production aliases; the live homepage, contact, financing, ProCut, shared CSS, and navigation JavaScript returned HTTP 200 with the expected new markers; the deployment error-log scan was clean.
- Homepage welder-card validation: shared sync completed with zero drift; the homepage contains five machine-lineup cards and no W-Series machine card; inline JavaScript and JSON-LD parse successfully; `git diff --check` passed apart from the line-ending notice.

## Access notes

- GitHub remote: `https://github.com/KartarC/wavlon-lasers-website.git`.
- Published pull requests: `https://github.com/KartarC/wavlon-lasers-website/pull/44`, `https://github.com/KartarC/wavlon-lasers-website/pull/45`, `https://github.com/KartarC/wavlon-lasers-website/pull/47`, and `https://github.com/KartarC/wavlon-lasers-website/pull/49`.
- Production deployment: `https://wavlon-lasers-website-4hqh2ip3u-infinara.vercel.app`.
- Production URL: `https://wavlonlasers.com`.
- Active branch: `codex/remove-homepage-welder` (homepage-only removal; publishing pending).
- Active worktree: `C:/Users/Karta/Documents/Codex/2026-07-20/referenced-chatgpt-conversation-this-is-untrusted/wavlon-laser-source-worktree`.
