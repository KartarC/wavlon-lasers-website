# Collaboration Changelog

Append one entry per completed unit of work. Newest entries go first. This file records both assistant and human changes without replacing Git history.

### 2026-08-18 12:24 EDT — Codex — Publish refined homepage hero product scenes

- Scope: Merged the reviewed first-three hero artwork update through PR #24 and verified the exact production output.
- Files: No product files changed in this deployment-record step; `CHANGELOG.md` and `HANDOFF.md` record the final GitHub/Vercel state.
- Validation: Vercel reported success for production commit `1162947`; the live homepage returned 200 and referenced all three versioned hero assets; each live asset returned 200 as `image/webp` with the expected 65,868, 58,564, and 74,080-byte sizes.
- Git: PR #24 squash-merged to `main` as `1162947`; this deployment record is on `codex/hero-product-art-deployment-log`.
- Remote/deploy: Vercel production check passed at https://vercel.com/infinara/wavlon-lasers-website/4nhqguqw1szqXbejdZjQZZKCSWhm; live at https://wavlonlasers.com.
- Follow-up: Review the live hero during normal browsing and treat any further art-direction request as a separate focused change.

### 2026-08-18 12:17 EDT — Codex — Recompose homepage hero product scenes

- Scope: Rebuilt the first three homepage hero artworks as one premium product-showcase family. The portfolio scene now uses a deliberate five-machine depth composition; the sheet scene presents three systems as a coherent lineup; and the tube scene presents only the double-chuck and triple-chuck systems. All scenes use consistent showroom perspective, grounded contact shadows, clear product scale, and an uncluttered dark copy zone on the left. The original hero assets remain untouched for rollback.
- Files: `assets/hero-scene-portfolio-v2.webp`; `assets/hero-scene-sheet-v2.webp`; `assets/hero-scene-tube-v2.webp`; `index.html`; `CHANGELOG.md`; `HANDOFF.md`.
- Validation: Visually reviewed all three generated compositions; confirmed each optimized WebP is 1672×941; confirmed exactly three new homepage references and all eight carousel scenes remain present; ran `git diff --check`.
- Git: `codex/hero-product-art-direction`; commit follows with this record.
- Remote/deploy: Pending branch push and Vercel preview.
- Follow-up: Review the Vercel preview, then merge through the pull request and verify production.

### 2026-08-18 11:58 EDT — Codex — Redesign homepage hero hierarchy and scene messaging

- Scope: Rebuilt the homepage hero into an editorial split composition with a stable dark copy zone and an unobstructed machine stage. Removed the decorative Three.js canvas to eliminate visual overlap and reduce unnecessary loading. Added dedicated overlines, headings, supporting copy, category labels, and destination links for all eight scenes; the sheet and tube scenes now explicitly say Sheet Laser Cutting Systems and Tube Laser Cutting Systems. Refined the homepage-only navigation so it remains transparent over the hero and becomes white on hover, keyboard focus, or scroll. Added responsive mobile composition and reduced-motion support.
- Files: index.html; assets/home-hero.js; CHANGELOG.md; HANDOFF.md.
- Validation: JavaScript syntax passed; eight scenes match eight controls; all eight scene assets resolve; every scene includes its required content and link attributes; CSS braces balance 235/235; git diff --check passed.
- Git: Committed as e372176 on codex/homepage-hero-redesign; merged through PR #22 as 6037e79.
- Remote/deploy: Vercel preview Ready, then production deployment dpl_F2FehXBSUhp98F5iwtXC5hr6bDGU reached Ready and was aliased to https://wavlonlasers.com.
- Follow-up: Review the live hero visually during normal browsing and log any requested art-direction refinements as a separate change.

### 2026-08-18 — Observed — Human homepage hero scene expansion after the previous handoff

- Scope: Observed newer main-branch commits that were not reflected in the 2026-08-13 handoff: 6e9f8b0 centered the hero typography, 89fca8e added five AI-generated capability scenes and carousel behavior, and f265423 replaced the first hero scenes with sheet and tube lineups. No ownership claimed by Codex.
- Files observed: index.html; assets/home-hero.js; assets/hero-scene-portfolio.webp; assets/hero-scene-sheet.webp; assets/hero-scene-tube.webp; tracked assets/hero-ai/*.webp.
- Git: Already committed on main as 6e9f8b0, 89fca8e, and f265423.
- Workspace note: Untracked assets/hero-ai/*-bg.png source images and assets/powercut-guide/ were preserved and are outside this redesign.
### 2026-08-13 16:20 EDT — Codex — Make homepage hero full-bleed

- Scope: Converted the homepage machine carousel from a padded showroom card to a true edge-to-edge hero. It now uses the existing `assets/machine-floor.png` as the environmental background, with layered gradients and a vignette for readable copy while retaining the existing carousel, CTAs, and mobile composition.
- Files: `index.html`; this collaboration record updates `CHANGELOG.md` and `HANDOFF.md`.
- Validation: `npm.cmd run sync` completed and verified 37 shared headers and footers. Focused diff reviewed; `git diff --check` passes.
- Git: Committed as `b348b85` on `codex/full-width-homepage-hero`; merged through PR #20 as `9c79a17`.
- Remote/deploy: Vercel preview Ready, then production deployment Ready at https://wavlonlasers.com.
- Follow-up: Confirm the live full-width hero after deployment; do not stage the pre-existing untracked `assets/powercut-guide/` directory.
### 2026-07-22 — Claude — Define missing --bg-light CSS token

- Scope: `--bg-light` was referenced 10 times across 7 served pages (`.ssm-item` spec pills, `.series-card-visual`, `.about-story-visual`, `.model-table` zebra rows, `.service-info-box`) but defined nowhere, so all those light-grey panel backgrounds silently fell back to `transparent`. Added `--bg-light: var(--bg-alt);` (aliased to the existing #f8f9fa light grey) to the `:root` token block in `shared.css` — a single-point fix that resolves every current and future usage.
- Files: `shared.css`; `CHANGELOG.md`; `HANDOFF.md`.
- Validation: Per-page audit — every `var(--token)` used on any served page is now defined in either `shared.css` or that page's own `<style>`; `--bg-light` was the last global gap. Aliased rather than hard-coded so it tracks `--bg-alt` if the light grey ever changes. No sync needed — `shared.css` is linked, not injected. NOTE: two orphan fragment files under `_components/` (`exchange-section.html`, `reel-section.html`) still reference an older token vocabulary (`--ink`, `--display`, etc.), but they are not served — `machine-showcase/index.html` carries its own adapted inline copy — so they are out of scope and left untouched.
- Git: `claude/fix-bg-light-token`; not yet committed.
- Remote/deploy: PR pending.
- Follow-up: Only remaining open item — legacy S/P/X labels in `applications/` and the automation pages need confirmed power ranges (blocked on the owner).

### 2026-07-22 — Claude — Fix ProCut lead source label

- Scope: The ProCut quote form submitted `source: 's-series-page'`, a leftover from the S-Series→ProCut rename, so ProCut leads were mislabelled in the CRM. Changed to `pro-cut-series-page`, matching the sibling convention (`power-cut-series-page`, `ultra-cut-series-page`). One line in `machines/fiber-laser-sheet-cutting/pro-cut-series/index.html`.
- Files: `machines/fiber-laser-sheet-cutting/pro-cut-series/index.html`; `CHANGELOG.md`; `HANDOFF.md`.
- Validation: Table routing unchanged — `submit-form.js` routes by substring, and both the old and new value fall to the default `Wavlon_Quote_Requests` (neither is `contact-page` nor contains financing/parts/brochure/chat). The form's `machine_interest` field already sent "ProCut", so leads were always identifiable by machine; only the `source` tag was wrong. Site-wide grep confirms no `s-series-page` references remain. No sync needed (page-body edit, not a partial).
- Git: `claude/fix-procut-source`; not yet committed.
- Remote/deploy: PR pending.
- **CRM note:** existing rows already stored with `source = 's-series-page'` are historical ProCut leads. From this deploy forward new ProCut leads carry `pro-cut-series-page`, so any saved report/filter keyed on `s-series-page` should be updated to include or migrate to the new value.
- Follow-up: Remaining open items — legacy S/P/X labels in `applications/`/automation need confirmed power ranges; `--bg-light` undefined in `shared.css`.

### 2026-07-22 — Claude — Resources center + nav discoverability

- Scope: The content guides existed but were undiscoverable — no nav entry, only a footer link. (1) New `/resources/` hub page: a featured buyer's-guide card plus a card grid linking all four guides (Canada pillar, sheet, tube, welding), financing, service, and parts, with `ItemList` schema. (2) Added a **Resources** dropdown to the desktop header between Financing and Support, cloning the existing `nav-supp-drop`/`supp-panel` pattern (pure CSS hover — no JS or CSS changes needed), linking Resources Center + Buyer's Guide. (3) Added a matching **Resources** section to the mobile drawer (`mobile-nav-btn`/`mobile-sub` pattern) with all five guide links. (4) Repointed the footer Company-column link from the single buyer's guide to the Resources Center. Added `/resources/` to `sitemap.xml` and `llms.txt`.
- Files: `resources/index.html` (new); `_partials/header.html`; `_partials/footer.html`; `sitemap.xml`; `llms.txt`; all pages refreshed by `npm run sync`; `CHANGELOG.md`; `HANDOFF.md`.
- Validation: Sitemap 37 URLs, all resolve. Resources page JSON-LD parses (`BreadcrumbList` + `ItemList`); all 10 internal links resolve. Nav dropdown reuses the byte-identical class scaffolding as the working Support dropdown, so hover behaviour is inherited — no new CSS. `npm run sync` clean at 37/37; Resources nav item confirmed on all 38 pages, footer link on all 38. Resources page body rendered and confirmed (featured card + three guide sections). NOTE: the header dropdown's hover state could not be visually exercised — the harness's file:// preview does not expose a live DOM (read_page/screenshot return empty), and the launch.json dev server serves the wrong directory. Visual confirmation of the dropdown deferred to live deploy.
- Git: `claude/resources-center`; not yet committed.
- Remote/deploy: PR pending.
- Follow-up: Unchanged — legacy S/P/X labels need power ranges; ProCut `source: 's-series-page'`; `--bg-light` undefined.

### 2026-07-22 — Claude — SEO content: sheet cutting hub guide

- Scope: Content phase, sheet category. Unlike the welding and tube hubs (which were thin), the sheet hub was already 719 words of product/comparison/material content — so this adds the *informational* layer it lacked, targeting "laser cutter metal sheet" (SD 21, 170/mo CA) and "fiber laser sheet cutting". New guide section between the "Why Wavlon" strip and the CTA (719 → 1,326 words): how fiber sheet cutting works, an assist-gas table (oxygen/nitrogen/compressed air — the page's biggest knowledge gap), bed formats decoded (3015 = 3,000×1,500mm etc., which the page used but never defined), and choosing power vs enclosure mapped to the three series. Added three-Product `ItemList` JSON-LD, a full OG set (the hub had none), and the guide to `llms.txt`.
- Files: `machines/fiber-laser-sheet-cutting/index.html`; `llms.txt`; `CHANGELOG.md`; `HANDOFF.md`.
- Validation: Machine specs (power ranges, 35/40mm mild steel, bed formats, MAX/FSCUT/Cypcut, 100–120 m/min) traced to the hub's own comparison table and the three product pages. Assist-gas behaviour and bed-code decoding are standard fiber-laser process facts, not company claims — written as general education. Company claims from `service/` and `financing/`. All three schema images (`procut-hero.png`, `wlf-shop-floor.png`, `ultracut-shop-floor.jpg`) confirmed present. Both JSON-LD blocks parse (`BreadcrumbList`, `ItemList` of three Products). All 7 internal links resolve. Every new CSS token defined in `shared.css`. `npm run sync` clean at 36/36. Rendered; heading order and assist-gas table confirmed, section alternation correct.
- Git: `claude/seo-sheet-guide`; not yet committed.
- Remote/deploy: PR pending.
- Follow-up: Content phase now covers all three cutting categories + welding + the Canada pillar. Same open items: legacy S/P/X labels need confirmed power ranges; ProCut `source: 's-series-page'`; `--bg-light` undefined in `shared.css`.

### 2026-07-22 — Claude — SEO content: tube cutting hub guide

- Scope: Content-phase follow-up. Expanded the tube cutting hub `/machines/fiber-laser-tube-cutting/` from ~230 to 968 words of `<main>` targeting "fiber laser tube cutting" (SD 5, 110/mo — low-difficulty quick win, and the hub was already rebuilt). Added a guide section below the existing lineup: how tube cutting works, a tube-laser-vs-saw-and-drill comparison table, what profiles it cuts, sizing by diameter/length/power (in that priority order), a load-weight callout, why the third chuck matters, a Double-vs-Triple comparison table, and Canadian buying notes. Added two-Product `ItemList` JSON-LD and the guide to `llms.txt`. Title/description/OG were already correct from the T-Series PR — left as-is.
- Files: `machines/fiber-laser-tube-cutting/index.html`; `llms.txt`; `CHANGELOG.md`; `HANDOFF.md`.
- Validation: Every spec traced to the Double Chuck / Triple Chuck spec tables — diameters (360/680mm), square (360/570mm), bed lengths (6,000/12,000mm), loads (250/1,500kg), power (1.5–12 / 6–30kW), accuracy (±0.05mm), model names — no invented figures. Company claims taken from `service/` and `financing/`. Both JSON-LD blocks parse (`BreadcrumbList`, `ItemList` of two Products). All 6 internal links resolve. `npm run sync` clean at 36/36. Page rendered; heading hierarchy and both comparison tables confirmed.
- Git: `claude/seo-tube-guide`; not yet committed.
- Remote/deploy: PR pending.
- Follow-up: Same open items — legacy S/P/X labels need confirmed power ranges; ProCut `source: 's-series-page'`; `--bg-light` undefined in `shared.css`.

### 2026-07-22 — Claude — SEO content phase: Canadian buyer's guide + welding hub expansion

- Scope: First content-phase work after the technical sprint. (1) **New pillar page** `/fiber-laser-cutting-canada/` (1,212 words) targeting "fiber laser cutter Canada" / "laser cutter metal sheet" — a buyer's guide covering power selection, sheet vs tube, Canadian-specific concerns (600V three-phase pre-configuration, CAD financing and exchange-rate exposure, who performs service), the full range as a comparison table, financing, and what support should include. Deep-links every product page, both category hubs, `/applications/`, `/financing/`, `/service/`, and `/contact/#quote`. (2) **Welding hub expanded** from 2,846 to ~13,000 bytes of `<main>` (714 words) targeting "laser welding machine" (SD 44, 1,300/mo — the highest-volume term on the list); the page previously held one paragraph and one product card. Added what laser welding is, a MIG/TIG comparison table, materials and thickness, why air-cooled matters, applications, and Canadian buying notes; retitled to lead with "Laser Welding Machines" and given a full OG set plus `Product` schema. (3) Added the pillar page to `sitemap.xml`, `llms.txt`, and the shared footer (site-wide internal link). (4) Fixed the stale series names in the `about/` positioning paragraph — naming only, no power figures involved.
- Files: `fiber-laser-cutting-canada/index.html` (new); `machines/fiber-laser-welding/index.html`; `about/index.html`; `_partials/footer.html`; `sitemap.xml`; `llms.txt`; plus all pages refreshed by `npm run sync`; `CHANGELOG.md`; `HANDOFF.md`.
- Validation: Every spec claim traced to the W-Series spec table or an existing product page — no invented figures. Company claims (2-year warranty, on-site installation, included training, remote diagnostics, 600V pre-configuration, 24–84 month terms, $0 down, 48h approval, 90-day deferred) all taken verbatim from `service/` and `financing/`. Sitemap parses; 36 URLs, no duplicates, all resolve. Both new JSON-LD blocks parse as valid JSON (`BreadcrumbList` + `ItemList`, `BreadcrumbList` + `Product`). All 14 internal links on the pillar page resolve to real files. Every CSS custom property used in the new styles is defined in `shared.css`. `npm run sync` clean at 36 headers and 36 footers. Both pages rendered and confirmed for heading hierarchy, tables, and copy.
- Git: `claude/seo-content-phase`; not yet committed.
- Remote/deploy: PR pending.
- Follow-up: `--bg-light` is referenced on 7 pages but never defined in `shared.css`, so those backgrounds silently fall back to transparent — pre-existing, worth a separate fix. Remaining legacy S/P/X labels in `applications/`, `industries/`, and the automation pages still need confirmed power ranges. ProCut still submits `source: 's-series-page'`.

### 2026-07-21 — Claude — Retire T-Series, rebuild tube hubs, sitemap coverage

- Scope: (1) **T-Series retired** — the page was a full 37KB live product page, self-canonical and linked site-wide, selling a machine no longer offered. Converted to a redirect stub (meta-refresh + JS + canonical) pointing at `/machines/fiber-laser-tube-cutting/`, matching the pattern already used for S/P/X-Series. (2) **Both tube hubs had zero Double Chuck / Triple Chuck body content** — every such link came from the shared header/footer, while `<main>` sold only T-Series. Rewrote the tube category page lineup with two real series cards and rewrote the machines hub tube section with two real product cards, all specs taken from the product pages' own spec tables (no invented figures). (3) Fixed the tube category page's own `<title>`/`<meta description>` which still read "T-Series", and added OG tags. (4) Removed T-Series from `llms.txt`, the root `header.html`/`footer.html` reference copies, three `technologies/laser-heads` CTAs, and the `/parts/` order-form machine dropdown. (5) **Fixed a latent sync bug**: four pages had `</footer>` but no `<!-- FOOTER -->` marker, so `build.js` silently skipped them and their footers could never sync — they were still serving a stale 4-item machine list. Added markers and re-synced. (6) **Sitemap rebuilt** — was missing 11 real self-canonical pages (`/technologies/` hub, 7 laser-head sub-pages, 3 legal pages); added `lastmod` to all 35 entries. (7) `machines/index.html` laser-head CTA pointed at the `/machines/laser-head/` redirect stub; repointed to `/technologies/laser-heads/`.
- Files: `machines/fiber-laser-tube-cutting/t-series/index.html`; `machines/fiber-laser-tube-cutting/index.html`; `machines/index.html`; `parts/index.html`; `technologies/laser-heads/index.html`; `technologies/laser-heads/controllers/tube/index.html`; `technologies/laser-heads/tube-cutting-heads/index.html`; `header.html`; `footer.html`; `llms.txt`; `sitemap.xml`; plus all pages refreshed by `npm run sync`; `CHANGELOG.md`; `HANDOFF.md`.
- Validation: Sitemap parses as valid XML — 35 URLs, no duplicates, every `<loc>` resolves to a file on disk, every one is self-canonical, none is a redirect stub; a reverse check confirms no self-canonical page on disk is missing from the sitemap. Site-wide grep confirms zero remaining references to `tube-cutting/t-series` outside the stub itself, and zero links to any legacy `s/p/x-series` stub. `npm run sync` completes clean, verifying 35 shared headers. Rendered the rebuilt tube hub, machines hub, and parts form and confirmed correct copy, specs, and dropdown options.
- Git: `claude/seo-sitemap-tseries`; not yet committed.
- Remote/deploy: PR pending.
- Follow-up: Stale S/P/X/T-Series product names remain in body copy on `about/`, `applications/` (~17, incl. a material capability table with S/P/X columns), `machines/fiber-laser-automation/` and `tower-system/` (3 comparison cards + meta description), `industries/`, `parts/` (2 part descriptions), and `technologies/laser-heads/*`. Link targets are already correct — only labels are stale — but the old power ranges (S 1–6kW, P 6–20kW, X 20–30kW+) do not map onto ProCut/PowerCut/UltraCut (3–12 / 3–12 / 3–20kW+), so the comparison tables need confirmed figures before rewriting. Note `BLT T-Series` on the laser-head pages is a genuine BOCI head name and must be kept.

### 2026-07-21 — Claude — SEO OG tags + internal cross-links (tube cutting)

- Scope: Technical SEO sprint items 2 & 3 — (1) Fixed `og:image` on homepage (was `favicon-192.png` 192×192; now `tubecut-double-chuck-hero.png` 1672×941, proper social preview); added `og:title`, `og:image`, `og:url` to Triple Chuck, ProCut Series, and Air-Cooled W-Series pages which were missing social preview images; (2) Added "Also Consider" cross-link cards between the two tube cutting product pages so Google can discover the full series and users are nudged to the alternative.
- Files: `index.html`; `machines/fiber-laser-tube-cutting/double-chuck/index.html`; `machines/fiber-laser-tube-cutting/triple-chuck/index.html`; `machines/fiber-laser-sheet-cutting/pro-cut-series/index.html`; `machines/fiber-laser-welding/air-cooled-series/index.html`; `CHANGELOG.md`; `HANDOFF.md`.
- Validation: OG image URLs verified against known asset filenames; cross-link card markup matches existing brand tokens (`--blue`, `--border`, `--text`, `--text2`); no external requests introduced.
- Git: `claude/seo-og-links`; not yet committed.
- Remote/deploy: PR pending.
- Follow-up: Sitemap.xml review (remaining technical item); content phase — "fiber laser cutter Canada" pillar page; W-Series content for "laser welding machine" (SD 44, vol 1,300/mo).

### 2026-07-21 — Claude — SEO technical: llms.txt, T-Series schema, title tag optimisation

- Scope: Technical SEO sprint — (1) Created `/llms.txt` at repo root for AI search crawlers (ChatGPT, Perplexity, Bing Copilot, Googlebot); (2) Added Product + BreadcrumbList JSON-LD schema to `machines/fiber-laser-tube-cutting/t-series/index.html` — the only machine page missing structured data; (3) Shortened and keyword-optimised `<title>` tags on all 7 key machine pages to under 65 characters, eliminating SERP truncation on Double Chuck (82→62 chars) and Triple Chuck (91→62 chars), and naturalising "Fiber Laser Cutter" and "Fiber Laser Tube Cutter" as keyword variants across the series.
- Files: `llms.txt` (new); `machines/fiber-laser-tube-cutting/t-series/index.html`; `machines/fiber-laser-sheet-cutting/pro-cut-series/index.html`; `machines/fiber-laser-sheet-cutting/power-cut-series/index.html`; `machines/fiber-laser-sheet-cutting/ultra-cut-series/index.html`; `machines/fiber-laser-tube-cutting/double-chuck/index.html`; `machines/fiber-laser-tube-cutting/triple-chuck/index.html`; `machines/fiber-laser-welding/air-cooled-series/index.html`; `CHANGELOG.md`; `HANDOFF.md`.
- Validation: Schema JSON-LD verified manually against double-chuck template; title lengths measured (<65 chars all); `llms.txt` follows llms.txt spec with product, technology, and company sections.
- Git: `claude/seo-technical`; commit `1d48cda`.
- Remote/deploy: Branch pushed; PR #10 open at `https://github.com/KartarC/wavlon-lasers-website/pull/10`.
- Follow-up: Content SEO phase — write a "fiber laser cutter Canada" pillar page, optimize ProCut/PowerCut meta descriptions with "laser cutter metal sheet" keyword, build internal link structure from homepage to machine pages.

### 2026-07-20 18:00 EDT — Codex — Publish Triple Chuck gallery to production

- Scope: Merged the reviewed Triple Chuck image update through PR #8 and verified its Vercel production deployment and live website output.
- Files: No product files changed during this deployment-record step; `CHANGELOG.md` and `HANDOFF.md` record the final production state.
- Validation: Production deployment `dpl_AEU7DSiHmKF8gmVvgsrMKTbNp9yt` reached `Ready` and is aliased to `https://wavlonlasers.com`. Live homepage and Triple Chuck page both returned `200`; the homepage references view 01, the Triple Chuck page references the shared menu asset and all five gallery views with its controller, and the live PNG returned `200` as `image/png` (598,799 bytes).
- Git: PR #8 squash-merged to `main` as `e0fedf9`.
- Remote/deploy: Live at `https://wavlonlasers.com`; production deployment `https://wavlon-lasers-website-8qwl19kfl-infinara.vercel.app`.
- Follow-up: None.

### 2026-07-20 18:00 EDT — Codex — Rebrand Triple Chuck image set and add gallery

- Scope: AI-edited all five supplied Triple Chuck manufacturer renders to a white Wavlon-branded finish, removed manufacturer text and logos, converted their backgrounds to transparency, placed the transparent product view on the homepage and shared mega menu, and added a responsive selectable five-view gallery to the Triple Chuck page.
- Files: `assets/tubecut-triple-chuck-view-01.png` through `assets/tubecut-triple-chuck-view-05.png`; `index.html`; `machines/fiber-laser-tube-cutting/triple-chuck/index.html`; `_partials/header.html`; and the 36 generated inline header copies refreshed by `npm.cmd run sync`.
- Validation: Visually reviewed all five generated renders; confirmed each is a 1672×941 PNG with alpha transparency; confirmed all five gallery references plus the gallery controller; ran `npm.cmd run sync`, which refreshed and verified 36 shared headers; ran `git diff --check`.
- Git: `codex/tubecut-triple-chuck-gallery`; committed with this collaboration record (`Add Triple Chuck image gallery`).
- Remote/deploy: Pushed to GitHub and opened draft PR #8. Vercel preview deployment `https://wavlon-lasers-website-hvojptad7-infinara.vercel.app` is `Ready`; its public URL is protected by the team Vercel sign-in.
- Follow-up: Mark PR #8 ready, merge after review, and verify the production deployment.

## Entry template

### YYYY-MM-DD HH:MM TZ — Author — Short title

- Scope: What changed and why.
- Files: Explicit paths changed.
- Validation: Checks run and results.
- Git: Branch and commit, or `not committed`.
- Remote/deploy: Push, pull request, and Vercel state, or `not performed`.
- Follow-up: Remaining action or `none`.

### 2026-07-20 17:14 EDT — Codex — Enforce identical mega menu across pages

- Scope: Diagnosed the reported navigation drift as a risk from independently embedded page headers. Added a shared-header verification guard to the site sync so every rendered header must exactly match the homepage/shared source and an unmarked or stale header fails the build instead of shipping a different mega menu.
- Files: `build.js`; this production-record update also changes `CHANGELOG.md` and `HANDOFF.md`.
- Validation: `npm.cmd run sync` refreshed and verified 36 shared headers; static comparison found zero header differences; live comparison confirmed identical header markup on the homepage, Machines, Double Chuck, About, Service, and Technologies pages; Vercel production deployment `https://wavlon-lasers-website-ea6iwbels-infinara.vercel.app` reached `Ready`.
- Git: PR #6 squash-merged to `main` as `e3868f1`; this production-record branch is `codex/mega-menu-production-log`.
- Remote/deploy: Live at `https://wavlonlasers.com`.
- Follow-up: None. Future header drift will stop the sync with a clear error.

### 2026-07-20 15:10 EDT — Codex — Publish Double Chuck gallery to production

- Scope: Merged the reviewed Double Chuck gallery update through PR #4 and verified the resulting Vercel production deployment and live website output.
- Files: No product files changed during this deployment step; `CHANGELOG.md` and `HANDOFF.md` record the final production state.
- Validation: Production deployment `dpl_FpNhsBznQJDCtawzyyH2uUKq6srH` reached `Ready`; `https://wavlonlasers.com` returned `200` and referenced `/assets/tubecut-double-chuck-view-07.png`; the live Double Chuck page returned `200`, contained the gallery controller, referenced all seven unique gallery assets, and used the transparent image in the mega menu; the live PNG returned `200` as `image/png` with 761,289 bytes.
- Git: PR #4 squash-merged to `main` as `9b9b9af`; this production-record branch is `codex/tubecut-double-chuck-production-log-2`.
- Remote/deploy: Live at `https://wavlonlasers.com`; production deployment `https://wavlon-lasers-website-c15ggwyg2-infinara.vercel.app`.
- Follow-up: Begin Triple Chuck imagery only after the user supplies its source pictures; revise Double Chuck renders only if the user requests visual adjustments.

### 2026-07-20 15:06 EDT — Codex — Rebrand Double Chuck image set and add gallery

- Scope: AI-edited all seven supplied Double Chuck manufacturer renders to a white Wavlon-branded finish, removed T5/TS/LD/Chinese manufacturer markings, converted the backgrounds to transparency, placed a transparent product view on the homepage and shared mega menu, and added a responsive seven-view gallery to the Double Chuck page. Repaired stale shared header/footer product links and made the sync script consume existing cookie-consent tags so repeated syncs remain idempotent.
- Files: `assets/tubecut-double-chuck-view-01.png` through `assets/tubecut-double-chuck-view-07.png`; `index.html`; `machines/fiber-laser-tube-cutting/double-chuck/index.html`; `_partials/header.html`; `_partials/footer.html`; `build.js`; and the 36 generated inline header/footer copies refreshed by `npm run sync`.
- Validation: Visually reviewed all seven generated renders; confirmed each output is a 1672×941 RGBA PNG with a transparent corner; confirmed seven unique gallery asset references; ran `npm.cmd run sync`; confirmed no HTML page has duplicate cookie-consent script references; ran `git diff --check`; Vercel preview deployment `dpl_4VnWSbb9KvHCic5NNAJC8qMyr4nB` reached `Ready`.
- Git: `codex/tubecut-double-chuck-gallery`; product commit `5e93c19`; this collaboration-record commit follows.
- Remote/deploy: Branch pushed to GitHub; draft PR #4 open at `https://github.com/KartarC/wavlon-lasers-website/pull/4`; Ready preview at `https://wavlon-lasers-website-9l9iecph7-infinara.vercel.app`. Production `main` is unchanged.
- Follow-up: Review the preview and merge PR #4 when approved; merging to `main` will trigger the production Vercel deployment.

## 2026-07-20 14:33 EDT — Codex — Publish Double Chuck image to production

- Scope: Investigated the old homepage image reported by the user. Confirmed production was still serving the placeholder because PR #2 had not been merged, then merged the approved Double Chuck image update into `main`.
- Files: No product files changed during this deployment step; `CHANGELOG.md` and `HANDOFF.md` record the verified production state.
- Validation: Vercel production deployment `dpl_DHuzNyadjNqkE9tAFUbEVodHzPPo` reached `Ready`; live homepage HTML references `/assets/tubecut-double-chuck-hero.png`; the live asset returned `200 OK`.
- Git: PR #2 squash-merged to `main` as `17e6ee1`.
- Remote/deploy: Live at `https://wavlonlasers.com`; production deployment `https://wavlon-lasers-website-oo7mqxb8d-infinara.vercel.app`.
- Follow-up: If a browser tab still shows the placeholder, refresh the page to replace its cached HTML.

## 2026-07-20 14:25 EDT — Codex — Add approved Double Chuck machine render

- Scope: Replaced the generic homepage image for TubeCut Double Chuck and added the supplied Wavlon-branded machine render to the dedicated Double Chuck hero. Added responsive hero layout and social-preview metadata. Triple Chuck was intentionally left unchanged until its source images arrive.
- Files: `assets/tubecut-double-chuck-hero.png`, `index.html`, `machines/fiber-laser-tube-cutting/double-chuck/index.html`, `CHANGELOG.md`, `HANDOFF.md`.
- Validation: Asset path and dimensions checked, responsive markup/CSS reviewed, image references verified, and Git diff checks run.
- Git: `codex/tubecut-double-chuck-images`; product update commit `4452d6c`, followed by this publishing-status update.
- Remote/deploy: Branch pushed and PR #2 merged; see the production entry above.
- Follow-up: Add and rebrand further manufacturer images when supplied; begin Triple Chuck only after the user provides its pictures.

## 2026-07-20 15:30 EDT — Claude — Document prior Claude product changes; update handoff

- Scope: Retrospective documentation of five Claude product changes that landed on `main` before the collaboration workflow existed. No code changed in this entry; changes were already pushed.
- Files: `CHANGELOG.md`, `HANDOFF.md` (documentation only).
- Validation: Verified commit SHAs and dates via `git log origin/main`. Confirmed all five commits are present on `origin/main` ahead of the Codex collaboration commits.
- Git: `codex/collaboration-workflow`; committed as documentation-only update.
- Remote/deploy: Pushed to `origin/codex/collaboration-workflow`. Production `main` unchanged.
- Follow-up: Review PR #1 to merge the collaboration files into `main` so the workflow applies going forward.

---

## 2026-07-09 12:42 EDT — Claude — Fix chat panel closing on FAQ chip click (8b39c2d)

- Scope: Clicking a FAQ quick-reply chip called `hideQR()` which removed the button from the DOM before the click event bubbled to the document-level close listener. `panel.contains(e.target)` returned `false` on the detached node, closing the whole widget. Added `e.stopPropagation()` to the chip click handler.
- Files: `assets/wavlon-chat.js` (line 368 — chip event listener).
- Validation: Browser preview — simulated chip click via `preview_eval`; confirmed `panelOpen:true`, `qrHidden:true`, `userMsgCount:1` after click.
- Git: `main`; commit `8b39c2d`.
- Remote/deploy: Pushed to `origin/main`; Vercel auto-deployed to production `wavlonlasers.com`.
- Follow-up: None.

## 2026-07-02 01:22 EDT — Claude — Redesign chat widget to Intercom-style layout (3818de0)

- Scope: Full visual overhaul of `assets/wavlon-chat.js`. Replaced single-screen chat with a two-panel widget: home panel (blue gradient header, WL/AI/CA team avatars, card links for quote/financing/machines, Home+Messages nav bar) → chat panel (back button, Wavlon AI branding, "Sales team can also help" subtitle, bot message meta with green dot, five FAQ quick-reply chips fixed above the input). Converted `sendMessage` to `async/await`.
- Files: `assets/wavlon-chat.js` (complete rewrite, 363 insertions / 311 deletions).
- Validation: Browser preview — panel dimensions, gradient header, home/chat navigation, greeting message, chip count, and header copy all confirmed via `preview_eval`.
- Git: `main`; commit `3818de0`.
- Remote/deploy: Pushed to `origin/main`; Vercel auto-deployed to production.
- Follow-up: FAQ chip close-panel bug discovered and fixed in `8b39c2d`.

## 2026-06-24 16:47 EDT — Claude — UltraCut spec table WUC badge (81aaaef)

- Scope: Added a `WUC (UltraCut)` badge above each power-column header in both spec tables (3015 and 4020 frames) on the UltraCut Series page. New CSS class `.wuc-th-label` — dark blue pill, 9 px caps, `width:fit-content`.
- Files: `machines/fiber-laser-sheet-cutting/ultra-cut-series/index.html`.
- Validation: Reviewed spec table HTML structure; badge rendered correctly in both `<thead>` rows.
- Git: `main`; commit `81aaaef`.
- Remote/deploy: Pushed to `origin/main`; Vercel auto-deployed to production.
- Follow-up: None.

## 2026-06-22 15:47 EDT — Claude — Sitemap update (ff03eb5)

- Scope: Added `/machines/fiber-laser-tube-cutting/double-chuck/` and `/machines/fiber-laser-tube-cutting/triple-chuck/` (priority 0.8) and three `/technologies/laser-heads/` URLs. Removed stale `/machines/laser-head/` URLs that no longer exist as pages.
- Files: `sitemap.xml`.
- Validation: Cross-checked against actual directory structure.
- Git: `main`; commit `ff03eb5`.
- Remote/deploy: Pushed to `origin/main`; Vercel auto-deployed to production.
- Follow-up: Submit sitemap in Google Search Console manually.

## 2026-06-16 18:44 EDT — Claude — Remove street address; add FAQ chips and CTA buttons to chat (0d20ccb)

- Scope: (1) Removed "5250 Solar Dr #32, Mississauga" from JSON-LD Organization schema in `index.html` and from the AI system prompt in `api/chat.js`; replaced with "Toronto, ON". (2) Added five FAQ quick-reply chips to the chat widget (appearing after the greeting) and a `[CTA: Label](/path/)` markdown format parsed by `fmt()` into blue CTA buttons. Updated `WAVLON_SYSTEM_PROMPT` with TubeCut Double/Triple Chuck specs and a list of available CTA links.
- Files: `index.html`, `api/chat.js`, `assets/wavlon-chat.js`.
- Validation: Grepped for "5250 Solar" and "Mississauga" — zero hits. Chat FAQ chips and CTA button rendering confirmed in browser.
- Git: `main`; commit `0d20ccb`.
- Remote/deploy: Pushed to `origin/main`; Vercel auto-deployed to production.
- Follow-up: Chat widget visual redesign (completed in `3818de0`).

---

## 2026-07-20 14:13 EDT — Codex — Publish collaboration workflow

- Scope: Published the collaboration-only branch and verified its Git-integrated Vercel preview.
- Files: `AGENTS.md`, `CHANGELOG.md`, `HANDOFF.md`, `CLAUDE.md`.
- Validation: Staged-scope review, Git diff checks, Vercel deployment inspection, and HTTP header check.
- Git: Setup commit `4e56308` on `codex/collaboration-workflow`; publishing-status commit follows on the same branch.
- Remote/deploy: Branch pushed to GitHub; draft PR #1 opened. Vercel preview is `Ready` at branch alias `https://wavlon-lasers-website-git-codex-collaboration-workflow-infinara.vercel.app`. Preview access is protected by Vercel SSO. Production was not changed.
- Follow-up: Review the draft PR and merge it when approved; the merge to `main` is expected to trigger the production deployment.

## 2026-07-20 14:07 EDT — Codex — Establish shared collaboration workflow

- Scope: Added shared instructions, an append-only collaboration log, and a current-state handoff. Replaced the unsafe automatic direct-to-main rule in `CLAUDE.md` with the shared branch and review workflow.
- Files: `AGENTS.md`, `CHANGELOG.md`, `HANDOFF.md`, `CLAUDE.md`.
- Validation: Markdown review, `git diff --check`, working-tree scope check.
- Git: `codex/collaboration-workflow`; included in the collaboration workflow setup commit.
- Remote/deploy: See the publishing entry above.
- Follow-up: See the publishing entry above.

## Observed baseline

- Local `main` was fast-forwarded from `f2aad8c` to GitHub `origin/main` at `75f6a0c` before collaboration files were created.
- The 64 remote commits were authored under the `KartarC` Git identity and include substantial site, navigation, API, catalog, legal-page, and quotation-template work through 2026-07-09.
- GitHub also contains `claude/bochu-laser-head-section-AQ4M5` at `04547c9`, authored by Claude on 2026-05-30.
- `assets/powercut-guide/` was already untracked and was deliberately left untouched.
