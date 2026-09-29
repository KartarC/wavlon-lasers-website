# Current Handoff

Last updated: 2026-09-29 by Codex

## Current state

- PR #55 merged to main as d14f067 on 2026-09-29. The technical SEO pass is live at https://wavlonlasers.com.
- Vercel production deployment dpl_4HJ941TNpPzRnNDW73dAJJYDMBnR is Ready and has the production domain aliases. Deployment URL: https://wavlon-lasers-website-a61qbjkts-infinara.vercel.app.
- Production validation matched titles, descriptions and canonical URLs on all 54 sitemap pages to the reviewed local files. The sitemap matches the revised 54-URL inventory. The repaired link and section anchor were verified live.
- Legal pages and both dormant welding pages remain noindex and absent from the sitemap.
- Fourteen retained HTML redirects now target final slashless URLs. They remain HTML redirects, not server-side permanent redirects.
- Source/head generators retain the URL policy and distinct cabinet metadata. tools/check-seo.mjs provides repeatable checks.
- Current branch: codex/seo-production-record, a documentation-only record of the verified release, in C:/Users/Karta/Documents/Codex/2026-09-08/ca/work/wavlon-seo.

## Validation completed

- Post-release: all 54 sitemap pages returned HTTP 200 with matching titles, descriptions and canonical URLs; live sitemap matched; all five noindex exclusions passed. Deployment metadata confirms main merge d14f067 is Ready with production aliases.

- All 54 proposed canonical URLs returned HTTP 200 directly on production; all 14 slashless retired URLs returned HTTP 200 with HTML refresh redirects.
- SEO checker passed: 54 sitemap routes, all public internal links/anchors, 81 HTML files, 14 redirect targets, 67 JSON-LD blocks and 32 inline scripts.
- Shared sync verified 59 headers, 59 main landmarks and 59 footers.
- Source/head generators ran successfully in a scratch copy; generated canonicals were normalized, cabinet metadata was distinct, and sitemap still contained 54 unique URLs.
- Edited generator syntax and git diff checks passed. vercel.json remains unchanged.

## Next action

1. The SEO release is complete. Review/merge the documentation-only production record through the usual PR workflow.
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
