# Wavlon Lasers — Claude Code Instructions

## About This Repo
Public website for **Wavlon Lasers**, a fiber laser cutting machine company based in Toronto, Ontario, Canada.
Brand new company. Sells industrial fiber laser cutting machines from entry-level (1kW) to heavy-duty (30kW+).

## Tech Stack
- **Frontend**: Single HTML file (`index.html`) — no framework, no build step
- **Database**: Supabase (PostgreSQL) — `machines` + `quote_requests` + `leads` + `contact_messages` tables
- **Deployment**: Vercel — auto-deploys on every push to `main`
- **CRM**: Lovable (private) — connected to same Supabase project

## Supabase Credentials
- **Project URL**: `SUPABASE_URL_PLACEHOLDER`
- **Publishable Key**: `SUPABASE_KEY_PLACEHOLDER`

## Brand
- **Primary**: `#07101f` (Deep Dark Navy)
- **Accent**: `#00c8ff` (Laser Blue)
- **Fonts**: Outfit (display) + Inter (body) from Google Fonts
- **Logo**: Text-based "W" mark in accent blue — never remove the `.nav-logo-mark` or `.nav-logo-text` elements

## Database Schema
```
machines:        id, model, series, category, power_watts, bed_length_mm, bed_width_mm, price, price_display, description, photos, specs (JSONB), sort_order, featured, status
leads:           id, name, email, phone, company, machine_interest, machine_id, budget, message, status, source
quote_requests:  id, name, email, phone, company, machine_interest, machine_id, material, thickness, budget, message, status, source
contact_messages:id, name, email, phone, subject, message, source, status
```

## Rules — ALWAYS FOLLOW
1. **Main file is `index.html`** — never delete, rename, or split into multiple files
2. **Never modify `vercel.json`**
3. **After EVERY change**: `git add . && git commit -m "describe change" && git push origin main`
4. **Always confirm** what was pushed after each operation
5. **Keep Supabase credentials** in the script — they are publishable/safe for frontend use
6. **Update CLAUDE.md** if Supabase credentials change

## Workflow
When given an updated `index.html` from Claude.ai (Lovable):
1. Replace the existing `index.html` with the new one
2. Run: `git add . && git commit -m "Update homepage" && git push origin main`
3. Confirm the push succeeded

## Design Principles
- Dark industrial aesthetic with electric-blue laser accent
- Mobile-first responsive (breakpoints: 1024, 768, 480px)
- All machines fetched live from Supabase `machines` table
- Quote and contact forms post to Supabase
- Clean, no-framework single-file approach — keep it this way
