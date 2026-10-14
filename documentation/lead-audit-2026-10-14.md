# Wavlon lead audit — October 14, 2026

## Findings and priority

1. **Critical: quote submissions rolled back by CRM notifications.** The insert trigger emits `wavlon_quote` or `wavlon_contact`, but `notifications_type_check` permitted neither. A rollback-only insert reproduced SQL 23514. Applied migration `fix_wavlon_notification_types`, preserving all existing allowed values and adding those two values. Quote, contact and lead insert tests pass with rollback. No permissions or RLS changed.
2. **Critical: main contact form rejected every company field.** The public POST returned HTTP 500; Vercel logged PGRST204 for the missing company column on Wavlon_Contact_Messages. The form includes company even when blank. Added destination-specific field allowlists; general enquiries preserve company in message text, while Quote Request subjects route to Wavlon_Quote_Requests with company and machine interest.
3. **Measurement gap:** main contact, parts and financing forms lacked successful-lead events. Added consent-gated success events and non-personal form-start/submit events for all ten forms, plus failure events for these three forms. The contact form checks the success JSON, retains entered data on failure and shows accessible retry/phone/email help. Generate_lead is still not configured as a GA4 key event; UI sign-in is required to change it.
4. **Conversion friction:** added Help me choose to contact subjects, preselected for /contact/#quote, and made application details optional. Removed the artificial homepage loader (2.2-second counter plus 0.72-second transition). Fixed mobile ProCut grid overflow and scrollable TubeCut comparison tables. Replaced the service-page 416-555-0191 placeholder with the existing published 888-277-6144 main number; no actual phone call placed.

## Actual traffic evidence

Google Analytics property 557408052 / stream G-1DD05NEHH7 was created October 5, 2026. Reporting window September 14–October 13, Toronto timezone: 3 sessions, 3 users, 8 page views; Direct 2 sessions, Organic Search 1. Recorded pages: home 3 views, contact 2, ProCut 2, showcase 1. No generate_lead or contact_click events recorded. This is consented measurement, not a census of all visitors; earlier traffic cannot be reconstructed from this property. Three measured sessions are insufficient to estimate a reliable conversion rate or judge article performance.

Database counts before testing: quotes 0; contact messages 1; leads 2; catalog records 1. None were dated September 14 or later. Historical records were not edited. No claim is made that every old record is a genuine sales lead.

Search Console connection lists https://wavlonlasers.com/ as siteUnverifiedUser; performance query returned 403. Search impressions, ranking, indexing coverage and query demand remain unverified. Public robots.txt allows crawling and links the sitemap. SEO validation passes 69 sitemap routes. Crawlability does not prove Google indexation.

CRM notification function inserts into the internal notifications table for active team members. Website handler does not send email. An internal notification is not evidence of an email delivered to sales. Email alerts would require an agreed recipient/workflow; none were added.

## Validation

Five API regression tests cover table schemas, quote routing, company preservation, invalid input and failure responses. Browser tests cover ten forms at desktop/mobile widths using intercepted success responses (no analytics or real enquiries sent by those browser tests), failure recovery and consent rejection. Database insert checks run inside rolled-back transactions. Preview and production checks are recorded in HANDOFF.md after publishing.

## Remaining actions

- Verify Search Console using the owner-provided HTML meta tag, then submit sitemap and inspect home, contact and key machine pages. User has been given exact steps; tag pending.
- In the Wavlon GA4 property, configure generate_lead as a key event and review automatic form-interaction settings. Browser currently requires Google sign-in; API connector lists settings only.
- After verified collection, review qualified traffic, form starts, submission attempts, failures and saved records before investing in another large content batch or paid traffic.
- Review actual CRM notifications and assign responsibility for follow-up; agree any email-notification workflow separately.
- Supply real installation evidence, application results and customer references where approved. Do not invent case studies or support guarantees.

Sources: authenticated GA4 reports and Search Console connection; production Vercel logs; Supabase schema/constraints/trigger and aggregate counts; public website source. No Search Console ranking or traffic estimates substituted for unavailable data.
