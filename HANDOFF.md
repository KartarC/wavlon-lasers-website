# Current Handoff

Last updated: 2026-08-20 14:25 EDT by Codex

## Current state

- Production: pull request #39 was squash-merged to main as d8ffb076bff4e1bb84556b2083df79e517a09481; Vercel production deployment dpl_9DwxdKv5edNsfrwU57g5KTRfpJek is READY.
- Live routes: https://wavlonlasers.com/technologies/laser-sources/ and https://wavlonlasers.com/technologies/laser-sources/compare/.
- The complete laser-source knowledge system is live: 19 customer-facing routes, 15 MAX Elite model pages, MAX/IPG brand hubs, a four-model manual comparison tool, official-source media, a 40-variant JSON snapshot, and an auditable Excel workbook.
- Supabase project wavlon-autonomous now contains laser_source_brands, laser_source_series, and laser_source_models: 2 brands, 5 series, 40 models, RLS enabled, public SELECT-only policies, and no public write grants.
- Exact certification language is intentionally model-specific. Do not replace it with a blanket “UL certified” or “full coverage” claim. The reviewed MAX 20–50 kW pages use “ETL (UL compatible)”; other models vary.
- Approved service statement: “MAX Photonics Service Center at Rise Tek Machinery.” The Rise Tek logo is stored at assets/laser-sources/rise-tek/rise-tek-logo.webp.
- assets/data/laser-sources.json remains the static website snapshot; Supabase is the maintainable knowledge source. Never put Supabase credentials in the frontend.
- The shared Technologies mega menu, Technologies hub, footer, homepage laser-options link, sitemap and llms.txt all point to the new hub.
- The original OneDrive Desktop checkout remains untouched because it contains unrelated modified and untracked work. This clean worktree is at C:/Users/Karta/Documents/Codex/2026-07-20/referenced-chatgpt-conversation-this-is-untrusted/wavlon-laser-source-worktree.

## What the next assistant must do

1. Read AGENTS.md, CLAUDE.md, the newest CHANGELOG.md entry, and this file before editing.
2. Preserve exact model-level certification, warranty and compatibility wording.
3. Refresh the catalog with tools/laser-sources/build-catalog.mjs, optimize new raster media, regenerate pages/database migration, and review the resulting diff before publishing future source updates.
4. Run npm.cmd run sync after any shared header/footer edit.
5. Record every Claude or Codex change in CHANGELOG.md and refresh this handoff.
6. The production publish is complete. Begin future work from the latest origin/main; do not reuse the merged feature branch.

## Access notes

- GitHub remote: https://github.com/KartarC/wavlon-lasers-website.git.
- GitHub CLI is authenticated for KartarC.
- Production URL: https://wavlonlasers.com.
- Supabase project: wavlon-autonomous (emdgtyaggcbqaxsdrsaa, Canada Central).