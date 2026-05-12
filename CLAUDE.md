# Wavlon Lasers — Claude Code Instructions

## About This Repo
Public website for **Wavlon Lasers**, a fiber laser cutting machine company based in Toronto, Ontario, Canada.
Brand new company. Sells industrial fiber laser cutting machines from entry-level (1kW) to heavy-duty (30kW+).

## Tech Stack
- **Frontend**: `index.html` + `header.html` + `footer.html` — no framework, no build step
- **Header/Footer**: Separate universal files injected via `fetch()` into every page at runtime
- **Database**: Supabase (PostgreSQL) — `machines` + `quote_requests` + `leads` + `contact_messages` tables
- **Deployment**: Vercel — auto-deploys on every push to `main`
- **CRM**: Lovable (private) — connected to same Supabase project

## Supabase Credentials
- **Project URL**: `SUPABASE_URL_PLACEHOLDER`
- **Publishable Key**: `SUPABASE_KEY_PLACEHOLDER`

## Brand
- **Background**: `#ffffff` white — Apple-style minimal design
- **Accent**: `#0066cc` (Apple blue, matches logo)
- **Text**: `#1d1d1f` primary, `#6e6e73` secondary, `#86868b` tertiary
- **Alt section bg**: `#f5f5f7`
- **Fonts**: System font stack (`-apple-system, BlinkMacSystemFont, "Helvetica Neue"`) + Inter from Google Fonts
- **Logo**: `wavlon_lasers_full_logo_transparent.png` in repo root — referenced in `header.html` and `footer.html` — never remove this file

## Database Schema
```
machines:        id, model, series, category, power_watts, bed_length_mm, bed_width_mm, price, price_display, description, photos, specs (JSONB), sort_order, featured, status
leads:           id, name, email, phone, company, machine_interest, machine_id, budget, message, status, source
quote_requests:  id, name, email, phone, company, machine_interest, machine_id, material, thickness, budget, message, status, source
contact_messages:id, name, email, phone, subject, message, source, status
```

## Rules — ALWAYS FOLLOW
1. **Never delete `index.html`, `header.html`, `footer.html`, or `wavlon_lasers_full_logo_transparent.png`**
2. **Never modify `vercel.json`**
3. **After EVERY change**: `git add . && git commit -m "describe change" && git push origin main`
4. **Always confirm** what was pushed after each operation
5. **Keep Supabase credentials** in `index.html` script — they are publishable/safe for frontend use
6. **Update CLAUDE.md** if Supabase credentials change
7. **header.html and footer.html are universal** — any new pages must load them via `fetch()`

## Workflow
When given updated files from Claude.ai (Lovable):
1. Replace the relevant file(s)
2. Run: `git add . && git commit -m "Update [files]" && git push origin main`
3. Confirm the push succeeded

## Adding New Pages
Each new `.html` page must include this pattern to load header and footer:
```html
<div id="header-placeholder"></div>
<!-- page content -->
<div id="footer-placeholder"></div>
<script>
async function loadPartial(url, id) {
  const res = await fetch(url);
  const html = await res.text();
  document.getElementById(id).outerHTML = html;
}
loadPartial('header.html', 'header-placeholder');
loadPartial('footer.html', 'footer-placeholder');
</script>
```

## Design Principles
- Apple-style: white background, minimal, generous whitespace, clean system fonts
- Mobile-first responsive (breakpoints: 1024, 768, 480px)
- All machines fetched live from Supabase `machines` table
- Quote and contact forms post to Supabase
- No frameworks, no build step — keep it this way
