# U.S. buyers and lead email alerts — October 14, 2026

## Website scope

- New /fiber-laser-cutting-usa: sheet/tube selection, nationwide U.S. installation, USD quotation process, installation responsibilities and quote CTAs. Owner confirmed offices in Great Neck, Long Island, New York; visits by appointment only. No invented street address, machine prices or maintenance-response guarantee.
- New /blog/fiber-laser-machine-cost: CAD/USD quote framework, cost-factor table and operating-cost considerations. No fabricated price range.
- Added the planned questions 1, 2, 3, 6, 7, 11, 18, 20, 21, 22, 36 and 40 across eight pages. Existing articles retain their main text and forms.
- Added discovery from Canada, Resources, Blog and the shared footer; updated shared topbar to Canada/USA. Removed the unqualified lifetime-support and blanket power-range sentence from the shared footer.
- New pages have canonical, Open Graph, breadcrumb and descriptive WebPage metadata. Sitemap now has 71 routes. No special AI schema, fake reviews or Product offers.

## Production alert architecture

Supabase Rise Tek project tpxadsuaaxoqvhptkltt. Migration wavlon_email_alert_outbox creates a restricted outbox and token-hash configuration. A private trigger snapshots limited lead fields into one row per recipient. No historical backfill, no customer auto-reply.

Recipients are the connected CRM mailboxes authorized by the owner:
- kartar.c@risetekmachinery.com
- info@risetekmachinery.com

Sources: Wavlon_Quote_Requests, Wavlon_Contact_Messages and Wavlon_Leads. Catalog downloads are included only when page_url identifies wavlonlasers.com; other brands' catalog requests are excluded. Chat uses Wavlon_Leads and receives one alert per lead, not another alert for the secondary chat log.

The sender is Wavlon Lead Alerts <chris@mail.risetekmachinery.com>, using Rise Tek's existing verified sending domain and existing server-side Resend configuration. mail.wavlonlasers.com is not verified, so it is not used.

The wavlon-lead-alerts Edge Function authenticates a dedicated random 256-bit scheduler token against its SHA-256 hash. The raw token is generated and retained in Supabase Vault and never returned or committed. verify_jwt=false is intentional: this worker accepts only its own checked token, not anonymous requests or ordinary user JWTs. It uses the existing service-role credential internally; no website/browser credentials or API changes are required.

The database job wavlon-email-alert-worker checks due work every minute. It calls the worker only when rows are due. The worker claims up to eight rows atomically with a five-minute lease, sends separate plain-text emails and records provider IDs. The per-row idempotency key and frozen payload prevent duplicate retries. Retries use exponential delays capped at one hour. After 12 attempts or 23 hours from the first attempt, the row requires review rather than risking a resend beyond the provider's 24-hour idempotency window. An expired processing lease can be reclaimed after a worker crash.

The queue trigger catches its own errors so an email-queue failure does not roll back a customer enquiry. Such failures generate a database warning and require operational investigation; this does not guarantee email under every infrastructure failure. Existing in-app CRM notifications remain intact. A sent outbox status means provider acceptance, not recipient reading; provider delivery is verified separately.

## Security and operations

Both new tables have RLS enabled and no anon/authenticated grants or policies. This deny-all posture is intentional: only the service-role worker reads them. The claim RPC is SECURITY INVOKER and executable only by service_role. The trigger function is private, has an empty search_path and fixed table/recipient allowlists, and is not exposed as a REST RPC. Supabase advisor's RLS-without-policy notices for these two tables are expected; do not grant public access to clear them. The project also reports pre-existing unrelated security findings; this change does not claim to remediate the entire CRM. See [Supabase RLS guidance](https://supabase.com/docs/guides/database/postgres/row-level-security).

To inspect failures: query status, attempts, last_error and provider_id in public.wavlon_email_outbox; review needs_review and overdue processing/pending records. Error codes contain no provider bodies, tokens or lead text. Validate provider status before manually requeueing any uncertain send. Do not simply reset first_attempt_at or use a new idempotency key on a potentially delivered message.

To stop email delivery without affecting CRM capture: unschedule only wavlon-email-alert-worker. Pending rows remain available for review. Do not alter unrelated CRM schedules. Rollback sources are documentation/wavlon-email-alerts.sql and documentation/wavlon-email-schedule.sql; the latter is applied separately after worker deployment.

## Validation

- SEO: 71 routes, 98 HTML files, 104 JSON-LD blocks, 31 inline scripts.
- Layout sync: 76 shared headers, footers and main landmarks.
- Browser: 16 desktop/mobile page checks, exact 12-question mapping, working U.S. quote navigation, no document overflow and no-JavaScript content/CTA checks. New-page screenshots inspected.
- Existing five API, five quote-selection and four analytics tests pass.
- Worker tests cover invalid/missing authentication, recipient and source restrictions, plain-text rendering, idempotency key, retry and expiry behavior.
- Database rollback test created exactly two pending recipient rows and left no test record after rollback. Public/user read and claim privileges are denied; service worker claim permission is confirmed.
- One labelled live quote was saved through /api/submit-form. The worker returned claimed=2, sent=2; Resend confirmed delivered to both recipients. Record 95c61927-7d78-445d-be27-abf1972b89fd is an internal test, not a sales opportunity.
- Automatic schedule delivered the labelled general enquiry to both recipients; provider status is delivered for both. Record 5198068a-7109-496f-be2e-07d554c743b3 is an internal test. One invocation hit the platform idle timeout before claiming work; the following scheduled invocation recovered, and each recipient row was sent once. The next cron run found no due work.
- Live unauthenticated worker call returns HTTP 401. Final website publication and live-page checks pending at this entry.

## Review and limitations

Reviewed for fixed recipients, server-only secrets, safe plain-text handling, atomic claims, stable retry payloads, no blocking network call inside the lead transaction, and unaffected public form success behavior. The catalogue alert links to the Wavlon CRM area and includes its record ID because a catalog detail route was not established.

Search indexing and ranking improvements are not guaranteed by publication. No customer proof or exact New York address was supplied or invented.
