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
