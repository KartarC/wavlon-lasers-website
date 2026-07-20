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

## 2026-07-20 14:07 EDT — Codex — Establish shared collaboration workflow

- Scope: Added shared instructions, an append-only collaboration log, and a current-state handoff. Replaced the unsafe automatic direct-to-main rule in `CLAUDE.md` with the shared branch and review workflow.
- Files: `AGENTS.md`, `CHANGELOG.md`, `HANDOFF.md`, `CLAUDE.md`.
- Validation: Markdown review, `git diff --check`, working-tree scope check.
- Git: `codex/collaboration-workflow`; included in the collaboration workflow setup commit.
- Remote/deploy: Publishing status will be recorded in a follow-up entry after verification.
- Follow-up: Push the branch, open a draft pull request, and verify its Vercel preview deployment.

## Observed baseline

- Local `main` was fast-forwarded from `f2aad8c` to GitHub `origin/main` at `75f6a0c` before collaboration files were created.
- The 64 remote commits were authored under the `KartarC` Git identity and include substantial site, navigation, API, catalog, legal-page, and quotation-template work through 2026-07-09.
- GitHub also contains `claude/bochu-laser-head-section-AQ4M5` at `04547c9`, authored by Claude on 2026-05-30.
- `assets/powercut-guide/` was already untracked and was deliberately left untouched.
