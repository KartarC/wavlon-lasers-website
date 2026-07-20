# Wavlon Lasers — Claude Code Instructions

## Shared Claude/Codex workflow

Before making changes, read `AGENTS.md`, `CHANGELOG.md`, and `HANDOFF.md`. `AGENTS.md` is the source of truth for collaboration records, handoffs, branch safety, staging, commits, pushes, and deployment-sensitive actions. Record completed Claude work in `CHANGELOG.md` and refresh `HANDOFF.md` so Codex can continue safely.

## About This Repo
Public website for **Wavlon Lasers**, a fiber laser cutting machine company based in Toronto, Ontario, Canada.
Brand new company. Sells industrial fiber laser cutting machines from entry-level (1kW) to heavy-duty (30kW+).

## Tech Stack
- **Frontend**: Static multi-page HTML — `shared.css` + `nav.js` shared across all pages. No framework, no build step.
- **Database**: Supabase (PostgreSQL) — `quote_requests`, `leads`, `contact_messages` tables (forms only — machines are static HTML)
- **Deployment**: Vercel — auto-deploys on every push to `main`
- **CRM**: Lovable (private) — connected to same Supabase project
- **Config**: `vercel.json` — `{"cleanUrls": true, "trailingSlash": false}` — do NOT modify

## Supabase Credentials
- **Project URL**: `SUPABASE_URL_PLACEHOLDER`
- **Publishable Key**: `SUPABASE_KEY_PLACEHOLDER`
*(Replace both placeholders in any page that has a form. Credentials are safe for frontend use.)*

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
- **Supabase is used only for form `INSERT`s**: `quote_requests`, `leads`, `contact_messages`
- Every machine series has its own dedicated `.html` file and URL (required for SEO)

### Shared assets
| File | Purpose |
|------|---------|
| `shared.css` | All design tokens, header/footer/nav styles, buttons, forms, spec tables, responsive breakpoints |
| `nav.js` | Mega menu, mobile drawer, sticky CTA bar, scroll shadow, active nav highlighting |
| `header.html` | Source-of-truth header (for reference) |
| `footer.html` | Source-of-truth footer (for reference) |

### Inline header/footer pattern
Every page embeds the full `<header>` and `<footer>` HTML directly — **do not use `fetch()` injection**. Vercel static hosting makes fetch unreliable. Mark inline blocks with `<!-- HEADER — inline copy -->` and `<!-- FOOTER — inline copy -->` comments.

### Paths — all root-absolute
All internal references use `/` prefix: `/shared.css`, `/nav.js`, `/wavlon_lasers_full_logo_transparent.png`

## Full Site Map

```
/                                           → index.html (homepage)
/machines/                                  → machines/index.html
/machines/fiber-laser-sheet-cutting/        → machines/fiber-laser-sheet-cutting/index.html
/machines/fiber-laser-sheet-cutting/s-series/  → machines/fiber-laser-sheet-cutting/s-series/index.html (1–6kW)
/machines/fiber-laser-sheet-cutting/p-series/  → machines/fiber-laser-sheet-cutting/p-series/index.html (6–20kW)
/machines/fiber-laser-sheet-cutting/x-series/  → machines/fiber-laser-sheet-cutting/x-series/index.html (20–30kW+)
/machines/fiber-laser-tube-cutting/         → machines/fiber-laser-tube-cutting/index.html
/machines/fiber-laser-tube-cutting/t-series/   → machines/fiber-laser-tube-cutting/t-series/index.html (2–12kW)
/machines/fiber-laser-automation/           → machines/fiber-laser-automation/index.html
/machines/fiber-laser-automation/tower-system/ → machines/fiber-laser-automation/tower-system/index.html
/machines/fiber-laser-welding/              → machines/fiber-laser-welding/index.html
/machines/fiber-laser-welding/air-cooled-series/ → machines/fiber-laser-welding/air-cooled-series/index.html
/industries/                                → industries/index.html
/applications/                              → applications/index.html
/financing/                                 → financing/index.html
/service/                                   → service/index.html (#installation, #warranty, #remote anchors)
/parts/                                     → parts/index.html (#order anchor)
/about/                                     → about/index.html
/contact/                                   → contact/index.html (#quote anchor)
/machine-showcase/                          → machine-showcase/index.html (scroll-driven animated showcase)
```

## Database Schema
```
quote_requests:   id, name, email, phone, company, machine_interest, machine_id, material,
                  thickness, budget, message, status, source
leads:            id, name, email, phone, company, machine_interest, machine_id, budget, message, status, source
contact_messages: id, name, email, phone, subject, message, source, status
```

## Form Sources (source field values)
| Page | Table | source value |
|------|-------|--------------|
| Homepage | quote_requests | `homepage` |
| S-Series | quote_requests | `s-series-page` |
| S-Series brochure | leads | `s-series-brochure` |
| P-Series | quote_requests | `p-series-page` |
| X-Series | quote_requests | `x-series-page` |
| T-Series | quote_requests | `t-series-page` |
| Tower System | quote_requests | `tower-system-page` |
| W-Series Welding | quote_requests | `w-series-page` |
| Financing | leads | `financing-page` |
| Contact | contact_messages | `contact-page` |
| Parts | leads | `parts-page` |

## Mega Menu Structure
4 categories (left sidebar) → product panels (right):
- **sheet** → S-Series, P-Series, X-Series
- **tube** → T-Series
- **auto** → Tower System
- **weld** → Air-Cooled W-Series

Active panel controlled by `data-panel` attribute on `.mega-cat-btn`. Panel switching handled in `nav.js`.

## Rules — ALWAYS FOLLOW
1. **Never delete** `index.html`, `header.html`, `footer.html`, `shared.css`, `nav.js`, or `wavlon_lasers_full_logo_transparent.png`
2. **Never modify** `vercel.json`
3. **Use the safe Git workflow in `AGENTS.md`**: work on a focused agent branch, stage explicit files, and prefer a reviewed pull request over direct pushes to `main`
4. **Always confirm** what was committed, pushed, and deployed after each operation; never report a push or deployment that was not verified
5. **Keep Supabase credentials** as `SUPABASE_URL_PLACEHOLDER` / `SUPABASE_KEY_PLACEHOLDER` until real credentials are provided
6. **All new pages must**: embed inline header/footer, link to `/shared.css`, link to `/nav.js`, use root-absolute paths

## SEO Requirements (series/machine pages)
- `<link rel="canonical" href="https://wavlonlasers.com/machines/..."/>` on every page
- JSON-LD `Product` schema on machine series pages
- JSON-LD `BreadcrumbList` on all inner pages
- `<nav class="breadcrumbs">` visible HTML breadcrumbs

## Design Principles
- Bodor/Aore-inspired: professional industrial, clean white, bold type
- Dark hero (`#0d1b2a`) with blue accent — rest of page is white/light gray
- Mobile-first responsive (breakpoints: 1024px, 768px, 480px)
- Mega menu on Machines nav item: categories left, product cards right
- SVG placeholder illustrations until real machine photos are added
- No frameworks, no build step — keep it this way
