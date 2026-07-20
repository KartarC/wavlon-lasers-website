# Wavlon Lasers — Shared Agent Instructions

These instructions apply to every assistant working in this repository, including Claude and Codex.

## Start every session

1. Read `CLAUDE.md`, `CHANGELOG.md`, and `HANDOFF.md`.
2. Run `git status --short --branch` and inspect recent commits before editing.
3. Fetch the remote and confirm the working branch is based on current `origin/main`.
4. Preserve all pre-existing modified and untracked files unless the user explicitly places them in scope.
5. If another assistant's work is present but undocumented, add a short observed entry to `CHANGELOG.md` before continuing.

## Collaboration record

- `CHANGELOG.md` is append-only. Each assistant records its own completed work, including files, validation, commit, and push/deployment state.
- `HANDOFF.md` describes only the current state and next action. Replace stale content when handing off.
- Use the author labels `Claude`, `Codex`, or `Human` so ownership is unambiguous.
- Never claim another assistant's changes as your own. When documenting changes you only discovered, label them `Observed`.

## Safe Git workflow

1. Start from current `origin/main` and create a focused branch: `claude/<topic>` or `codex/<topic>`.
2. Make only requested changes. Do not mix unrelated cleanup into the branch.
3. Review `git diff` and run checks appropriate to the touched files.
4. Stage explicit paths with `git add <file>...`; never use `git add .` when unrelated work is present.
5. Commit with a clear imperative summary.
6. Push the feature branch, then merge through a reviewed pull request unless the user explicitly requests a direct push to `main`.
7. Because Vercel deploys from Git, treat a push to `main` as a production action. Confirm the intended files and deployment impact first.
8. Never force-push, reset, discard, or delete another person's work without explicit approval.

## Project guardrails

- Keep the site static-first. `npm run sync` regenerates inline headers and footers from `_partials/` via `build.js`.
- Do not modify `vercel.json` unless the user explicitly asks.
- Do not commit credentials, tokens, `.env` files, or Vercel project secrets.
- Keep internal links root-absolute and preserve the SEO requirements in `CLAUDE.md`.
- Do not hand-edit generated header/footer copies without also updating their source partials and running the sync command.

