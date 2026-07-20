# Collaboration Changelog

Append one entry per completed unit of work. Newest entries go first. This file records both assistant and human changes without replacing Git history.

## Entry template

### YYYY-MM-DD HH:MM TZ — Author — Short title

- Scope: What changed and why.
- Files: Explicit paths changed.
- Validation: Checks run and results.
- Git: Branch and commit, or `not committed`.
- Remote/deploy: Push, pull request, and Vercel state, or `not performed`.
- Follow-up: Remaining action or `none`.

## 2026-07-20 15:30 EDT — Claude — Document prior Claude product changes; update handoff

- Scope: Retrospective documentation of five Claude product changes that landed on `main` before the collaboration workflow existed. No code changed in this entry; changes were already pushed.
- Files: `CHANGELOG.md`, `HANDOFF.md` (documentation only).
- Validation: Verified commit SHAs and dates via `git log origin/main`. Confirmed all five commits are present on `origin/main` ahead of the Codex collaboration commits.
- Git: `codex/collaboration-workflow`; committed as documentation-only update.
- Remote/deploy: Pushed to `origin/codex/collaboration-workflow`. Production `main` unchanged.
- Follow-up: Review PR #1 to merge the collaboration files into `main` so the workflow applies going forward.

---

## 2026-07-09 12:42 EDT — Claude — Fix chat panel closing on FAQ chip click (8b39c2d)

- Scope: Clicking a FAQ quick-reply chip called `hideQR()` which removed the button from the DOM before the click event bubbled to the document-level close listener. `panel.contains(e.target)` returned `false` on the detached node, closing the whole widget. Added `e.stopPropagation()` to the chip click handler.
- Files: `assets/wavlon-chat.js` (line 368 — chip event listener).
- Validation: Browser preview — simulated chip click via `preview_eval`; confirmed `panelOpen:true`, `qrHidden:true`, `userMsgCount:1` after click.
- Git: `main`; commit `8b39c2d`.
- Remote/deploy: Pushed to `origin/main`; Vercel auto-deployed to production `wavlonlasers.com`.
- Follow-up: None.

## 2026-07-02 01:22 EDT — Claude — Redesign chat widget to Intercom-style layout (3818de0)

- Scope: Full visual overhaul of `assets/wavlon-chat.js`. Replaced single-screen chat with a two-panel widget: home panel (blue gradient header, WL/AI/CA team avatars, card links for quote/financing/machines, Home+Messages nav bar) → chat panel (back button, Wavlon AI branding, "Sales team can also help" subtitle, bot message meta with green dot, five FAQ quick-reply chips fixed above the input). Converted `sendMessage` to `async/await`.
- Files: `assets/wavlon-chat.js` (complete rewrite, 363 insertions / 311 deletions).
- Validation: Browser preview — panel dimensions, gradient header, home/chat navigation, greeting message, chip count, and header copy all confirmed via `preview_eval`.
- Git: `main`; commit `3818de0`.
- Remote/deploy: Pushed to `origin/main`; Vercel auto-deployed to production.
- Follow-up: FAQ chip close-panel bug discovered and fixed in `8b39c2d`.

## 2026-06-24 16:47 EDT — Claude — UltraCut spec table WUC badge (81aaaef)

- Scope: Added a `WUC (UltraCut)` badge above each power-column header in both spec tables (3015 and 4020 frames) on the UltraCut Series page. New CSS class `.wuc-th-label` — dark blue pill, 9 px caps, `width:fit-content`.
- Files: `machines/fiber-laser-sheet-cutting/ultra-cut-series/index.html`.
- Validation: Reviewed spec table HTML structure; badge rendered correctly in both `<thead>` rows.
- Git: `main`; commit `81aaaef`.
- Remote/deploy: Pushed to `origin/main`; Vercel auto-deployed to production.
- Follow-up: None.

## 2026-06-22 15:47 EDT — Claude — Sitemap update (ff03eb5)

- Scope: Added `/machines/fiber-laser-tube-cutting/double-chuck/` and `/machines/fiber-laser-tube-cutting/triple-chuck/` (priority 0.8) and three `/technologies/laser-heads/` URLs. Removed stale `/machines/laser-head/` URLs that no longer exist as pages.
- Files: `sitemap.xml`.
- Validation: Cross-checked against actual directory structure.
- Git: `main`; commit `ff03eb5`.
- Remote/deploy: Pushed to `origin/main`; Vercel auto-deployed to production.
- Follow-up: Submit sitemap in Google Search Console manually.

## 2026-06-16 18:44 EDT — Claude — Remove street address; add FAQ chips and CTA buttons to chat (0d20ccb)

- Scope: (1) Removed "5250 Solar Dr #32, Mississauga" from JSON-LD Organization schema in `index.html` and from the AI system prompt in `api/chat.js`; replaced with "Toronto, ON". (2) Added five FAQ quick-reply chips to the chat widget (appearing after the greeting) and a `[CTA: Label](/path/)` markdown format parsed by `fmt()` into blue CTA buttons. Updated `WAVLON_SYSTEM_PROMPT` with TubeCut Double/Triple Chuck specs and a list of available CTA links.
- Files: `index.html`, `api/chat.js`, `assets/wavlon-chat.js`.
- Validation: Grepped for "5250 Solar" and "Mississauga" — zero hits. Chat FAQ chips and CTA button rendering confirmed in browser.
- Git: `main`; commit `0d20ccb`.
- Remote/deploy: Pushed to `origin/main`; Vercel auto-deployed to production.
- Follow-up: Chat widget visual redesign (completed in `3818de0`).

---

## 2026-07-20 14:13 EDT — Codex — Publish collaboration workflow

- Scope: Published the collaboration-only branch and verified its Git-integrated Vercel preview.
- Files: `AGENTS.md`, `CHANGELOG.md`, `HANDOFF.md`, `CLAUDE.md`.
- Validation: Staged-scope review, Git diff checks, Vercel deployment inspection, and HTTP header check.
- Git: Setup commit `4e56308` on `codex/collaboration-workflow`; publishing-status commit follows on the same branch.
- Remote/deploy: Branch pushed to GitHub; draft PR #1 opened. Vercel preview is `Ready` at branch alias `https://wavlon-lasers-website-git-codex-collaboration-workflow-infinara.vercel.app`. Preview access is protected by Vercel SSO. Production was not changed.
- Follow-up: Review the draft PR and merge it when approved; the merge to `main` is expected to trigger the production deployment.

## 2026-07-20 14:07 EDT — Codex — Establish shared collaboration workflow

- Scope: Added shared instructions, an append-only collaboration log, and a current-state handoff. Replaced the unsafe automatic direct-to-main rule in `CLAUDE.md` with the shared branch and review workflow.
- Files: `AGENTS.md`, `CHANGELOG.md`, `HANDOFF.md`, `CLAUDE.md`.
- Validation: Markdown review, `git diff --check`, working-tree scope check.
- Git: `codex/collaboration-workflow`; included in the collaboration workflow setup commit.
- Remote/deploy: See the publishing entry above.
- Follow-up: See the publishing entry above.

## Observed baseline

- Local `main` was fast-forwarded from `f2aad8c` to GitHub `origin/main` at `75f6a0c` before collaboration files were created.
- The 64 remote commits were authored under the `KartarC` Git identity and include substantial site, navigation, API, catalog, legal-page, and quotation-template work through 2026-07-09.
- GitHub also contains `claude/bochu-laser-head-section-AQ4M5` at `04547c9`, authored by Claude on 2026-05-30.
- `assets/powercut-guide/` was already untracked and was deliberately left untouched.
