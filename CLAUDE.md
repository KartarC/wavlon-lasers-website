# Wavlon Lasers — Claude Code Instructions

## Shared Claude/Codex workflow

Before making changes, read `AGENTS.md`, `CHANGELOG.md`, and `HANDOFF.md`. `AGENTS.md` is the source of truth for collaboration records, handoffs, branch safety, staging, commits, pushes, and deployment-sensitive actions. Record completed Claude work in `CHANGELOG.md` and refresh `HANDOFF.md` so Codex can continue safely.

## About This Repo
Public website for **Wavlon Lasers**, a fiber laser cutting machine company based in Toronto, Ontario, Canada.
Brand new company. Sells industrial fiber laser cutting machines from entry-level (1kW) to heavy-duty (30kW+).

## Product Line — READ THIS FIRST

The current machines are **ProCut**, **PowerCut**, **UltraCut** (sheet), **TubeCut Double Chuck**, **TubeCut Triple Chuck** (tube), **Tower Storage System** (automation), and **Air-Cooled W-Series** (welding).

**S-Series, P-Series, X-Series, and T-Series are retired.** Never write new content, links, nav entries, or schema for them. Their URLs are redirect stubs (meta-refresh + JS + canonical):

| Retired URL | Redirects to |
|-------------|--------------|
| `/machines/fiber-laser-sheet-cutting/s-series/` | ProCut Series |
| `/machines/fiber-laser-sheet-cutting/p-series/` | PowerCut Series |
| `/machines/fiber-laser-sheet-cutting/x-series/` | UltraCut Series |
| `/machines/fiber-laser-tube-cutting/t-series/` | Tube cutting hub |
| `/machines/laser-head/**` (10 pages) | `/technologies/laser-heads/**` |

`BLT T-Series` on the laser-head pages is a genuine BOCI cutting-head product name — unrelated to the retired machine. Do not rename it.

Some body copy still carries retired names (`about/`, `applications/`, `industries/`, the automation pages, `parts/`). Link targets are already correct; only labels are stale. The old power ranges (S 1–6kW, P 6–20kW, X 20–30kW+) do **not** map onto ProCut/PowerCut/UltraCut (3–12 / 3–12 / 3–20kW+) — get real figures before rewriting any comparison table rather than interpolating.

## Tech Stack
- **Frontend**: Static multi-page HTML — `shared.css` + `nav.js` shared across all pages. No framework, no bundler.
- **Build step**: `npm run sync` (`build.js`) injects `_partials/header.html` and `_partials/footer.html` into every page. Not a bundler — an inliner.
- **Backend**: Vercel serverless functions in `api/` (Node). All Supabase writes happen here.
- **Database**: Supabase (PostgreSQL), shared Rise Tek project
- **Deployment**: Vercel — auto-deploys on every push to `main`
- **CRM**: Lovable (private) — connected to same Supabase project
- **Config**: `vercel.json` — `{"cleanUrls": true, "trailingSlash": false}` — do NOT modify

## Supabase Credentials — server-side only

There are **no Supabase credentials in the frontend** and none should ever be added. Pages POST to an API route; the route holds the keys.

Set as Vercel environment variables, read only inside `api/`:

| Variable | Used by |
|----------|---------|
| `SUPABASE_URL` | `submit-form.js`, `capture-lead.js` |
| `SUPABASE_SERVICE_KEY` | `submit-form.js`, `capture-lead.js` |
| `ANTHROPIC_API_KEY` | `chat.js` |
| `VOICEFLOW_API_KEY` | `chat.js` |

`SUPABASE_SERVICE_KEY` is a service-role key — it bypasses RLS. **Never** reference it in an HTML page, inline script, or anything shipped to the browser.

## Brand
- **Background**: `#ffffff` white (sections alternate with `#f8f9fa`)
- **Dark sections**: `#0d1b2a` (hero, stats strip, footer)
- **Blue accent**: `#0066cc` (matches logo — used for CTAs, links, highlights)
- **Text**: `#1a1a2e` primary · `#495057` secondary · `#868e96` muted
- **Logo**: `wavlon_lasers_full_logo_transparent.png` — in repo root, `filter: brightness(0) invert(1)` on `.footer-logo` for white on dark bg
- **Fonts**: Inter (Google Fonts) + system font stack

## Architecture — IMPORTANT

### Static-first, forms-only Supabase
- **Machines are static HTML** — no Supabase `SELECT` queries for machine data
- Supabase is used only for form `INSERT`s, and only from `api/` routes
- Every machine series has its own dedicated `.html` file and URL (required for SEO)

### Shared assets
| File | Purpose |
|------|---------|
| `shared.css` | All design tokens, header/footer/nav styles, buttons, forms, spec tables, responsive breakpoints |
| `nav.js` | Mega menu, mobile drawer, sticky CTA bar, scroll shadow, active nav highlighting |
| `_partials/header.html` | **Source of truth** for the header — edit here, then `npm run sync` |
| `_partials/footer.html` | **Source of truth** for the footer — edit here, then `npm run sync` |
| `header.html`, `footer.html` (repo root) | Reference copies only. `build.js` skips them. Keep in step manually or ignore. |

### Inline header/footer pattern
Every page embeds the full `<header>` and `<footer>` HTML directly — **do not use `fetch()` injection**. Vercel static hosting makes fetch unreliable.

Every page rendering a header or footer **must** wrap it in these exact markers:

```html
<!-- HEADER — inline copy -->
<header id="site-header"> … </header>

<!-- FOOTER — inline copy -->
<footer id="site-footer"> … </footer>
```

`build.js` throws on an unmarked or drifted header **or** footer. This is deliberate: an unmarked block is invisible to sync, so the page silently freezes on whatever markup it had. Three product pages drifted that way and sat for weeks missing the legal footer links and the cookie-consent script. If sync throws, add the marker — do not weaken the check.

Workflow: edit `_partials/*.html` → `npm run sync` → commit the regenerated pages alongside the partial.

### Paths — all root-absolute
All internal references use `/` prefix: `/shared.css`, `/nav.js`, `/wavlon_lasers_full_logo_transparent.png`

## Full Site Map

All 35 live URLs are listed in `sitemap.xml` — treat that file as the canonical index and keep it in step when adding or retiring a page.

```
/                                                → homepage
/machines/                                       → all-machines hub
/machines/fiber-laser-sheet-cutting/             → sheet hub
    …/pro-cut-series/                            → ProCut   (3–12kW, WPC)
    …/power-cut-series/                          → PowerCut (3–12kW, WFC, enclosed)
    …/ultra-cut-series/                          → UltraCut (3–20kW+, WUC, dual exchange)
/machines/fiber-laser-tube-cutting/              → tube hub
    …/double-chuck/                              → TubeCut Double Chuck (1.5–12kW, TDC)
    …/triple-chuck/                              → TubeCut Triple Chuck (6–30kW, TTC)
/machines/fiber-laser-automation/                → automation hub
    …/tower-system/                              → Tower Storage System
/machines/fiber-laser-welding/                   → welding hub
    …/air-cooled-series/                         → Air-Cooled W-Series (1.5–3kW)
/technologies/                                   → technologies hub
/technologies/laser-heads/                       → laser heads hub
    …/2d-cutting-heads/  …/3d-cutting-heads/  …/tube-cutting-heads/
    …/features/          …/selection-guide/
    …/controllers/       …/controllers/2d/  …/controllers/3d/  …/controllers/tube/
/industries/   /applications/   /financing/   /machine-showcase/
/service/  (#installation, #warranty, #remote)
/parts/    (#order)
/about/    /contact/ (#quote)
/privacy/  /terms/  /cookies/
```

## Backend — `api/`

Vercel serverless functions. Forms `fetch('/api/submit-form')`; nothing touches Supabase from the browser.

| Route | Purpose |
|-------|---------|
| `api/submit-form.js` | All website forms. Routes to a table by `source` string. |
| `api/capture-lead.js` | Catalog/brochure downloads → `catalog_download_leads` |
| `api/chat.js` | Chat widget (Anthropic + Voiceflow) |
| `api/health.js` | Health check |

### Table routing (`api/submit-form.js`)

Routing is by **substring match on `source`**, not an explicit map — so a new page gets a sane default automatically:

| `source` | Table |
|----------|-------|
| exactly `contact-page` | `Wavlon_Contact_Messages` |
| contains `financing`, `parts`, `brochure`, or `chat` | `Wavlon_Leads` |
| anything else (default) | `Wavlon_Quote_Requests` |

Table names are capitalised and prefixed (`Wavlon_Quote_Requests`, `Wavlon_Leads`, `Wavlon_Contact_Messages`) because the Supabase project is shared with other Rise Tek properties. Add a new quote form and it lands in `Wavlon_Quote_Requests` with no code change.

### `source` values currently in use

| Page | `source` |
|------|----------|
| `contact/` | `contact-page` |
| `financing/` | `financing-page` |
| `parts/` | `parts-page` |
| `pro-cut-series/` | `s-series-page` ⚠️ **stale — see below** |
| `power-cut-series/` | `power-cut-series-page` |
| `ultra-cut-series/` | `ultra-cut-series-page` |
| `double-chuck/` | `tubecut-double-chuck-page` |
| `triple-chuck/` | `tubecut-triple-chuck-page` |
| `tower-system/` | `tower-system-page` |
| `air-cooled-series/` | `w-series-page` |

⚠️ The ProCut page still submits `s-series-page`, left over from the rename, so its leads are mislabelled in the CRM. Changing it is a one-line fix but will split historical reporting — confirm with the owner before touching it. The homepage has no form.

## Mega Menu Structure

Three mega menus, all driven by `data-panel` on `.mega-cat-btn`, switched in `nav.js`.

**Machines** — `sheet` → ProCut, PowerCut, UltraCut · `tube` → TubeCut Double Chuck, TubeCut Triple Chuck · `auto` → Tower Storage System · `weld` → Air-Cooled W-Series

**Technologies** — `tech-heads` → 2D Cutting Heads, Tube Cutting Heads, Controllers · `tech-chillers`, `tech-resonators`, `tech-servos` → "coming soon" placeholders linking to `/contact/`

**Industries** — `ind-industries` → Automotive, Structural Steel, HVAC & Mechanical, Aerospace & Defence, Agricultural Equipment, Custom Fabrication · `ind-applications` → Sheet Metal Cutting, Tube & Profile Cutting, Decorative & Panel, Laser Welding

## Rules — ALWAYS FOLLOW
1. **Never delete** `index.html`, `header.html`, `footer.html`, `shared.css`, `nav.js`, or `wavlon_lasers_full_logo_transparent.png`
2. **Never modify** `vercel.json`
3. **Use the safe Git workflow in `AGENTS.md`**: work on a focused agent branch, stage explicit files, and prefer a reviewed pull request over direct pushes to `main`
4. **Always confirm** what was committed, pushed, and deployed after each operation; never report a push or deployment that was not verified
5. **Never put Supabase credentials in frontend code.** All DB access goes through `api/` using server-side env vars. `SUPABASE_SERVICE_KEY` bypasses RLS and must never reach the browser.
6. **All new pages must**: embed inline header/footer **with both marker comments**, link to `/shared.css`, link to `/nav.js`, use root-absolute paths
7. **After editing `_partials/`**, run `npm run sync` and commit the regenerated pages
8. **Never write content for retired series** (S/P/X/T) — see Product Line above

## SEO Requirements (series/machine pages)
- `<link rel="canonical" href="https://wavlonlasers.com/machines/..."/>` on every page
- JSON-LD `Product` schema on machine series pages
- JSON-LD `BreadcrumbList` on all inner pages
- `<nav class="breadcrumbs">` visible HTML breadcrumbs
- `<title>` under 65 characters or it truncates in Google results
- Full OG set on product pages: `og:title`, `og:description`, `og:type`, `og:image`, `og:url`. `og:image` must be a real product image — never a favicon.
- Add new pages to `sitemap.xml`; redirect stubs stay out of it
- `llms.txt` at the repo root lists current products for AI crawlers — keep it in step with the product line

## Design Principles
- Bodor/Aore-inspired: professional industrial, clean white, bold type
- Dark hero (`#0d1b2a`) with blue accent — rest of page is white/light gray
- Mobile-first responsive (breakpoints: 1024px, 768px, 480px)
- Mega menu on Machines nav item: categories left, product cards right
- SVG placeholder illustrations until real machine photos are added
- No frameworks, no build step — keep it this way
