# Country-guide quote context — October 15, 2026

## Purpose

Canada and USA buying guides led to a generic form and suggested location only inside a message placeholder. The contact form now offers optional installation country and city/province/state inputs. Country guide quote CTAs carry an allowlisted country hint; buyers may change or clear it. Existing model selection is independent and preserved.

Location is assembled into the existing CRM message. There are no API/database schema changes and no location values added to analytics. The existing CRM alert workflow can consume the message as before; no live email delivery test or production enquiry was submitted for this change.

Only quote CTAs inside the country-page main content are changed. Shared navigation/footer remain unchanged. No new required fields or artificial buying-stage qualification.

## Verification

Four context tests cover valid/invalid prefill, restored/changed/blank choices, optional inputs, and the actual form handler's failure/retry behavior with intercepted fetch. Five existing API schema/routing tests, five model-selection tests and four analytics consent/privacy tests pass. SEO check passes 73 routes/100 HTML/108 JSON-LD/29 inline scripts. Hosted visual verification pending.

## Measurement

This supports the quality of enquiries from organic/answer-engine visitors; it does not itself prove ranking or traffic improvement. Review successful CRM requests and follow-up usefulness after publication. No new case studies or test-result claims; user has not approved that evidence.

Branch codex/quote-location-context from ec13e63. Publication pending reviewed PR.
