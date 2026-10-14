# Wavlon lead tracking — October 14, 2026

GA4 property 557408052, stream G-1DD05NEHH7. `generate_lead` is a key event, once per event, with no default value. Event dimensions: Lead type (`lead_type`), Lead form (`form_id`), Contact method (`contact_method`). These were saved through the owner's signed-in UI and independently verified through the read API.

GTM account 6382614134, container 267168982 / **GTM-KXFXRNWZ**. Owner explicitly approved Google terms; accepted and created October 14. Version 2 is published with two tags, one custom-event trigger and five data-layer variables. Import source is `gtm-container.json`; GTM remaps internal IDs during import.

The Google tag disables automatic page views, Google signals and ad personalization, and uses sanitized location/referrer. The event tag allows only page_view, generate_lead, lead_form_start, lead_form_submit, lead_form_error and contact_click. Both require analytics_storage consent. Cookie acceptance loads GTM; rejection loads neither GTM nor GA4. No noscript iframe is installed because it would bypass the site's explicit consent gate.

The website replaces its direct gtag loader/config with one GTM loader and structured data-layer events. It clears optional fields on every event, deduplicates successful leads per form per page, and sends no submitted names, emails, phone numbers, company names or message contents. Button clicks and failed submissions are not key events.

Validation: `node tools/test-analytics.cjs` checks consent refusal, single initialization/page view, URL sanitization, lead categorization, deduplication, and separation of failures/contact clicks. Existing API tests pass. Live Analytics receipt must be checked after deployment; configuration success alone does not prove receipt.

Rollback: revert the website tracking commit to restore direct consent-gated GA4. Container version 2 can remain published since the reverted site will not load it. Never load both delivery paths concurrently.
