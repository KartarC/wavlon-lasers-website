# Buyer conversion improvements — October 14, 2026

Owner: Codex. Branch: codex/buyer-conversion-paths, based on main 8067d5b.

## Changes

- Added a workflow comparison for ProCut, PowerCut and UltraCut, with individual quote links. Contact form preselection uses six allowlisted models, preserves existing choices, and falls back safely for unknown values.
- Added buyer-fit guidance and quote preparation links to three sheet product pages, plus early sheet/tube/quote paths on the Canadian buyer guide.
- Connected 18 laser-source pages and the head-selection guide to complete-machine comparisons. Updated the source generator so these links survive regeneration.
- Replaced unrelated 30kW maximum-capacity claims in the sheet hub and inconsistent blanket maxima in the Canadian guide. Qualified unsupported installation, safety, speed, financing and warranty assertions in the affected prose. This is not a full engineering validation of all existing site specifications.
- Fixed actual contact and ProCut mobile overflow; moved chat above the mobile call/quote dock. Removed the 5-second chat nudge and 18-second automatic opening that covered buyer content. Chat remains available on click.
- Updated sitemap lastmod for changed pages only. No new shopping schema, fabricated customer proof or Harsel backlinks.

## Validation

- SEO validator: 69 sitemap routes, 96 HTML pages, 100 JSON-LD blocks, 31 inline scripts.
- Shared layout sync: 74 headers, main landmarks and footers verified.
- Five quote-selection cases, five API lead tests, four analytics tests pass.
- Local browser: ProCut quote link reaches contact with ProCut selected; mobile contact, ProCut, sheet hub and Canada guide have no document overflow at the tested 390px viewport (375px content viewport). Comparison table scrolls within its container.
- Desktop comparison and source-page layouts visually inspected. No production lead submissions created in this batch.
- Final diff reviewed for scope, generated-source consistency, safe URL handling and unchanged API/consent behavior.

## Lead operations and evidence

The user identified Kartar and Kulwant as responsible for checking CRM requests and follow-up. No notification recipient or delivery change was authorized or configured by this batch. Approval for public installation photos, sample-cut results or customer references remains outstanding; none were invented or published.

Recommended operating process: one person takes ownership of each new request, records the next action and captures machine type, material/thickness, location and purchase timing. Use GA4 generate_lead for successful form submissions and CRM records for qualification; these are distinct measures. Exclude previously labelled internal tracking tests from sales counts.

## Remaining priorities

- Confirm notification recipients and ownership workflow with Kartar/Kulwant before configuring outbound alerts.
- Obtain approved real machine/application evidence and written configuration/support details.
- Follow Search Console coverage for the changed commercial pages; prior manual indexing requests failed in Google's UI. Sitemap submission was already successful. No indexing or ranking improvement is claimed from this release.
- Compare qualified CRM leads and organic commercial-page traffic after a full 28-day observation period, rather than inferring conversion gains from the current small sample.

Publication: pending reviewed PR and deployment verification.
