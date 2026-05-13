# Wavlon Lasers — Claude Code Instructions

## About This Repo
Public website for **Wavlon Lasers**, a fiber laser cutting machine company based in Toronto, Ontario, Canada.
Brand new company. Sells industrial fiber laser cutting machines from entry-level (1kW) to heavy-duty (30kW+).

## Tech Stack
- **Frontend**: `index.html` (main page) + `header.html` + `footer.html` — no framework, no build step
- **Database**: Supabase (PostgreSQL) — `machines`, `quote_requests`, `leads`, `contact_messages` tables
- **Deployment**: Vercel — auto-deploys on every push to `main`
- **CRM**: Lovable (private) — connected to same Supabase project

## Supabase Credentials
- **Project URL**: `SUPABASE_URL_PLACEHOLDER`
- **Publishable Key**: `SUPABASE_KEY_PLACEHOLDER`
*(Update both `index.html` script block AND this file when credentials change)*

## Brand
- **Background**: `#ffffff` white (sections alternate with `#f8f9fa`)
- **Dark sections**: `#0d1b2a` (hero, stats strip, footer)
- **Blue accent**: `#0066cc` (matches logo — used for CTAs, links, highlights)
- **Text**: `#1a1a2e` primary · `#495057` secondary · `#868e96` muted
- **Logo**: `wavlon_lasers_full_logo_transparent.png` — in repo root, referenced in header and footer
- **Fonts**: Inter (Google Fonts) + system font stack

## Header / Footer Architecture — IMPORTANT
The header and footer exist in **two places** — keep them in sync:

| File | Purpose |
|------|---------|
| `header.html` | Source of truth — Lovable/Claude.ai edits this |
| `footer.html` | Source of truth — Lovable/Claude.ai edits this |
| `index.html` | Has header + footer **inline** so they always render on Vercel |

**Why inline in index.html?** Vercel serves static files. The `fetch()` injection approach can fail. Embedding inline guarantees 100% reliable rendering.

**When header.html or footer.html is updated:**
1. Edit the respective file
2. Also copy the same HTML into the matching block in `index.html` (marked with `<!-- HEADER — inline copy -->` and `<!-- FOOTER — inline copy -->` comments)
3. Push both files

**Adding new pages:** New `.html` pages should copy the header/footer inline following the same pattern as `index.html`.

## Mega Menu
The Products mega menu in the header has 5 categories (left sidebar) with product panels (right). To add a machine to the mega menu, add a `.mega-prod-card` block inside the appropriate `#panel-{category}` div in both `header.html` AND the inline header block in `index.html`.

## Database Schema
```
machines:         id, model, series, category, power_watts, bed_length_mm, bed_width_mm,
                  price, price_display, description, photos, specs (JSONB), sort_order, featured, status
quote_requests:   id, name, email, phone, company, machine_interest, machine_id, material,
                  thickness, budget, message, status, source
leads:            id, name, email, phone, company, machine_interest, machine_id, budget, message, status, source
contact_messages: id, name, email, phone, subject, message, source, status
```

## Rules — ALWAYS FOLLOW
1. **Never delete** `index.html`, `header.html`, `footer.html`, or `wavlon_lasers_full_logo_transparent.png`
2. **Never modify** `vercel.json`
3. **After EVERY change**: `git add . && git commit -m "describe change" && git push origin main`
4. **Always confirm** what was pushed after each operation
5. **Keep Supabase credentials** in `index.html` script — they are publishable/safe for frontend use
6. **Keep header/footer in sync** between `index.html` and the separate template files

## Workflow
When given updated HTML from Lovable / Claude.ai:
1. Replace the relevant file(s) with new content
2. If header/footer changed, update the inline copies in `index.html` too
3. Run: `git add . && git commit -m "describe change" && git push origin main`
4. Confirm the push succeeded

## Design Principles
- Bodor/Aore-inspired: professional industrial, clean white, bold type
- Dark hero (`#0d1b2a`) with blue accent — rest of page is white/light gray
- Mobile-first responsive (breakpoints: 1024px, 768px, 480px)
- Mega menu on Products: categories left, product cards right
- All machines fetched live from Supabase `machines` table
- SVG placeholder illustrations until real machine photos are added
- No frameworks, no build step — keep it this way
