# Current Handoff

Last updated: 2026-09-29 by Codex

## Current state

- Production baseline: main at 8c00e80 (PR #54, production-record merge); product changes from PR #53 remain the latest recorded release.
- Current work: codex/technical-seo in C:/Users/Karta/Documents/Codex/2026-09-08/ca/work/wavlon-seo. This isolated checkout preserves the previous workspace.
- The SEO pass is ready for a pull-request preview. Production has not been changed by this pass.
- Canonical, social and structured-data absolute page URLs now match the live slashless routing policy. The sitemap has 54 indexable URLs; legal and dormant welding pages remain excluded.
- Sixteen long titles and 21 descriptions were refined. MFSC 6000 cabinet metadata is distinct. The UltraCut laser-head link and the selection-guide model anchor are fixed.
- Fourteen existing HTML redirect pages point at the final destination without a slash-normalization hop. They are still HTML redirects, not server-side permanent redirects.
- Generator normalization, sitemap-presence checks and tools/check-seo.mjs preserve and verify the changes.

## Validation completed

- All 54 proposed canonical URLs returned HTTP 200 directly on production; all 14 slashless retired URLs returned HTTP 200 with HTML refresh redirects.
- SEO checker passed: 54 sitemap routes, all public internal links/anchors, 81 HTML files, 14 redirect targets, 67 JSON-LD blocks and 32 inline scripts.
- Shared sync verified 59 headers, 59 main landmarks and 59 footers.
- Source/head generators ran successfully in a scratch copy; generated canonicals were normalized, cabinet metadata was distinct, and sitemap still contained 54 unique URLs.
- Edited generator syntax and git diff checks passed. vercel.json remains unchanged.

## Next action

1. Review the technical-seo pull-request preview and checks; obtain release authorization before merging to main, then verify production and record the deployment.
2. Consider true permanent redirects for retired routes as a separate hosting change. AGENTS.md requires an explicit request to modify vercel.json.
3. Consider normalizing internal navigation links to remove remaining slash-normalization hops.
4. Verify Search Console indexing and submit the sitemap when access is available. Analytics still needs a real production GA4 Measurement ID.

## Preserve

- Current public machines: ProCut, PowerCut, UltraCut, TubeCut Double Chuck and TubeCut Triple Chuck; tower automation remains separate.
- Dormant W-Series welding pages stay noindex and excluded from public discovery. Genuine BOCI BLT T-Series cutting-head names remain valid.
- Preserve the three approved homepage hero scenes, image preload and optimized WebP references.
- Preserve engineering review for non-standard configurations, partner links to Rise Tek and Machinists' Vault, accessibility/mobile improvements, and the consent gate for analytics.
- Read AGENTS.md, CLAUDE.md and the newest CHANGELOG.md before editing; stage only explicit paths and preserve unrelated work.

## Access

- Repository: https://github.com/KartarC/wavlon-lasers-website
- Production: https://wavlonlasers.com
- Detailed audit: documentation/seo/2026-09-29-audit.md
