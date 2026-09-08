# Current Handoff

Last updated: 2026-09-08 02:44 EDT by Codex

## Current state

- PR #44 merged to `main` as `b67cfe4`; the credibility and conversion sprint is live.
- PR #45 merged to `main` as `78a10b9`; the homepage and technology image-delivery improvements are live at `https://wavlonlasers.com` and Vercel reports the deployment Ready.
- PR #47 merged to `main` as `37c4670`; the large gallery and shared-menu image optimization is live at `https://wavlonlasers.com` and Vercel reports the deployment Ready.
- PR #49 merged to `main` as `d6a12c5`; the accessibility and mobile-conversion pass is live at `https://wavlonlasers.com` and Vercel reports the deployment Ready.
- PR #51 merged to `main` as `c47629c`; the Air-Cooled W-Series card removal is live at `https://wavlonlasers.com` and Vercel reports the deployment Ready.
- Current public machine names are ProCut, PowerCut, UltraCut, TubeCut Double Chuck, and TubeCut Triple Chuck. Former Wavlon S-Series, P-Series, X-Series, T-Series, WD-3015, and W-Series names have been removed from customer-facing discovery paths.
- The W-Series welding hub and product page remain as dormant reference pages with `noindex,follow`, but they are absent from navigation, forms, applications, resources, chat knowledge, `llms.txt`, and the sitemap.
- Genuine BOCI BLT T-Series laser-head names remain intentionally; these are active component model names and must not be rewritten as Wavlon TubeCut machine names.
- A shared Secondary Solutions panel, mobile links, footer links, and Machines-hub section now connect customers to Rise Tek Machinery press brakes and Machinists' Vault consumables/tooling.
- Every shared page now has a skip link, a verified `main#main-content` landmark, keyboard-operable desktop and mobile navigation, visible focus styling, improved muted-text contrast, and reduced-motion support.
- Mobile pages now provide a persistent Call / Get a Quote dock. Product-specific sticky quote bars supersede the global dock while visible and use accessible SVG dismiss controls.
- All 11 lead forms now use native required/email validation, associated labels, stable field names, contact autocomplete hints, and live success announcements. The financing FAQ now uses accessible accordion semantics.
- The homepage now preloads the actual first hero scene instead of two below-the-fold product-card PNGs. All three hero images have intrinsic dimensions and asynchronous decoding; the inactive scenes remain lazy-loaded.
- Forty-six browser-delivery images across both performance passes now use right-sized WebP files. The current pass replaces 42 large images and reduces their combined weight from 81,002,711 bytes to 3,625,014 bytes.
- The shared mega menu uses the same optimized ProCut, PowerCut, and UltraCut images across all 59 pages. A repository audit reports zero remaining customer-visible PNG/JPEG references larger than 1 MB.
- The original PNG source files remain in the asset library for future editing.
- Consent-based analytics remains inactive because no production GA4 Measurement ID is stored in the repository.

## What Claude or the next assistant must do

1. Read `AGENTS.md`, `CLAUDE.md`, the newest `CHANGELOG.md` entries, and this file before editing.
2. Preserve the homepage's three approved real-machine scenes and the new LCP preload unless the owner requests new artwork.
3. Preserve the `*-optimized.webp` browser references and shared-menu images; use the retained PNG files only as source masters or social/structured-data images.
4. Preserve the engineering-review language for non-standard UltraCut configurations until an owner-approved specification is documented.
5. Do not reactivate analytics with a placeholder ID. Obtain the real GA4 Measurement ID and retain the existing consent gate.
6. Keep W-Series welding pages dormant and non-indexable until the owner explicitly requests a deliberate relaunch; do not add them back to navigation, forms, resources, chat knowledge, or the sitemap by accident.
7. Record every Claude or Codex change in `CHANGELOG.md` and refresh this handoff.
8. Preserve the verified partner destinations: Rise Tek's press-brake page and Machinists' Vault's fiber-laser-parts collection. Keep external links marked `target="_blank" rel="noopener"`.
9. Continue the technical SEO sprint with high-impact title/description improvements and redirect/canonical review for retired model URLs without inventing replacement specifications.

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
- Production welder-card validation: both PR checks passed; Vercel deployment `wavlon-lasers-website-3b3p8q2e4-infinara.vercel.app` reached Ready with the production aliases; the live homepage contains five machine-lineup cards and no W-Series card; the preserved W-Series product page returns HTTP 200; the deployment error-log scan was clean.
- Current-name and partner validation: shared sync verified 59 headers, 59 main landmarks, and 59 footers; JavaScript syntax checks passed; 32 inline scripts and 67 JSON-LD blocks parsed across 81 HTML files; all 57 sitemap routes resolve locally; public discovery files contain no welding routes or W-Series references; both dormant welding pages retain `noindex,follow`; retired-name audit found only legitimate BOCI BLT T-Series component references; `git diff --check` passed apart from line-ending notices.

## Access notes

- GitHub remote: `https://github.com/KartarC/wavlon-lasers-website.git`.
- Published pull requests: `https://github.com/KartarC/wavlon-lasers-website/pull/44`, `https://github.com/KartarC/wavlon-lasers-website/pull/45`, `https://github.com/KartarC/wavlon-lasers-website/pull/47`, `https://github.com/KartarC/wavlon-lasers-website/pull/49`, and `https://github.com/KartarC/wavlon-lasers-website/pull/51`.
- Production deployment: `https://wavlon-lasers-website-3b3p8q2e4-infinara.vercel.app`.
- Production URL: `https://wavlonlasers.com`.
- Active branch: `codex/current-products-secondary-solutions` (product-name cleanup and partner-solution integration).
- Active worktree: `C:/Users/Karta/Documents/Codex/2026-07-20/referenced-chatgpt-conversation-this-is-untrusted/wavlon-laser-source-worktree`.
