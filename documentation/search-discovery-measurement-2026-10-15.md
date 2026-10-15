# Discovery and quote measurement — October 15, 2026

## Confirmed production evidence

Direct Google URL Inspection API checks: 12 of 15 blog articles indexed. Full results in `blog-index-status-2026-10-15.json`.

- Canadian regional buying guide: discovered, currently not indexed.
- Site preparation checklist: URL unknown to Google in the inspection snapshot.
- Buy versus outsource: crawled, currently not indexed.

The existing production sitemap (including all 15 articles) was successfully resubmitted to Search Console. Sitemap acceptance is not an individual indexing request or a guarantee of indexing. A manual Request indexing attempt for site preparation returned Quota Exceeded on October 15; no further requests were attempted; the existing UltraCut retry remains scheduled separately for October 16.

GA4 property 557408052 has generate_lead configured as a key event. The October 13–15 report returns two generate_lead events, country Canada. A read-only CRM query finds only two October quote records, both explicitly marked as tests, on October 14 (contact and ProCut). No confirmed genuine quote requests are demonstrated by these results. No records were deleted or changed.

## Changes prepared

- Header search on desktop and mobile; searches title, description and main-body text of all 73 sitemap pages, including all 15 blogs. Excludes dormant/noindex pages and navigation boilerplate. Build regenerates the corpus. Search results stay noindex and query text is not sent to analytics.
- Static links from homepage, PowerCut, ProCutter 2.0 and MAX Photonics to the three pending guides. These links work independently of JavaScript search.
- More specific ProCutter and MAX search descriptions connect component research to machine configuration for Canada/USA.
- Optional installation country on all seven public machine quote forms. Server accepts only ca/us/other and stores the label in the existing CRM message; no database migration. Contact already captures country and optional city/province/state.
- Machine success handlers require both HTTP success and `{success:true}` before emitting a lead. Existing API returns success only after the primary database insert succeeds. Errors and button clicks do not count as leads; success remains deduplicated per form/page.
- Preview/local hosts never load production GTM. Staff can set localStorage `wavlon_measurement_test` to the string `true` before reloading to exclude their production-browser checks; remove the key and reload to restore consent-based tracking. This excludes analytics only, not CRM inserts or emails. Do not send fake leads as a substitute for mocked tests.

## Weekly measurement

1. Read GA4 generate_lead by country and landing page/source, with Canada and United States shown separately. GA4 country describes the visitor's inferred location, not the installation address. Consent refusal and blockers can reduce counts.
2. Reconcile against saved CRM quote requests. Use the Installation country message label for buyer-declared market; blank stays unknown. Keep tests out of the business count, preserving their audit trail.
3. Kartar/Kulwant qualify the saved enquiry using actual application, machine need, location and buying timeline. A successful form is not automatically a qualified lead; never infer qualification from a browser event.
4. Compare post-publication blog impressions/clicks and quote outcomes with the earlier baseline. Do not claim AI citations or lead uplift without evidence.

No new production form or email tests were sent for this change. Previous test events remain in historical GA4 reports; excluding future tests cannot retroactively remove them.
