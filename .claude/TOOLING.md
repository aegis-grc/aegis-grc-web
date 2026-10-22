# Design / dev tooling record

Installed 2026-10-22 on branch `website/aegis-multiproduct-brand`. No site files were changed.

Approved Aegis brand direction always overrides generic plugin or skill recommendations.
UI/UX Pro Max is a reference library, not a brand authority.

## Plugins (project scope, enabled in `.claude/settings.json`)

| Tool | Upstream | Version / commit | Method |
|---|---|---|---|
| frontend-design | anthropics/claude-plugins-public (`claude-plugins-official`) | `af59ee3a1051` | `claude plugin install frontend-design@claude-plugins-official --scope project` |
| impeccable | pbakaus/impeccable | plugin 4.7.0, commit `e07dc019a75e`, engine 0.1.16 | `claude plugin marketplace add pbakaus/impeccable`, then `claude plugin install impeccable@impeccable --scope project` |

Impeccable notes:
- Ships hooks (SessionStart, PostToolUse on Edit|Write, Stop) that run a local engine binary.
- The engine is fetched once from the upstream GitHub release into `~/.impeccable/bin/<version>/` and checksum-verified.
- Telemetry is disabled for this project via `IMPECCABLE_NO_TELEMETRY=1` in `.claude/settings.json`.

## Skills (copied from reviewed upstream commits, project scope, `.claude/skills/`)

| Skill(s) | Upstream | Commit |
|---|---|---|
| emil-design-eng, animate, animation-performance, animation-vocabulary, find-animation-opportunities, review-animations | emilkowalski/skills (MIT) | `2d228630ba14` |
| ui-ux-pro-max (core skill only; plugin extras brand/design/design-system/slides/ui-styling/banner-design deliberately NOT installed) | nextlevelbuilder/ui-ux-pro-max-skill v2.15.0 (MIT) | `076a2b3a3139` |

- `review-animations` is user-invoked only (`/review-animations`); the others auto-trigger.
- Update by re-copying from a newly reviewed upstream commit and updating this table.
- `ui-ux-pro-max` runs local Python with no network access. Its `design_system.py --persist` can write files into the project; use it as advisory only.

## MCP servers

| Server | Scope | Config | Pinned |
|---|---|---|---|
| astro-docs | project (`.mcp.json`) | HTTP `https://mcp.docs.astro.build/mcp`, tool `search_astro_docs` | n/a (hosted) |
| playwright | project (`.mcp.json`) | `npx @playwright/mcp@0.0.83 --headless --isolated` | 0.0.83 |
| context7 | user (`~/.claude.json`) | HTTP `https://mcp.context7.com/mcp`, header `Authorization: Bearer ${CONTEXT7_API_KEY}` (env reference only; no key stored) | n/a (hosted) |

Project-scoped MCP servers need a one-time approval prompt when Claude Code is started in this repo.

Playwright MCP writes to `.playwright-mcp/` by default, and relative screenshot filenames resolve against the repo root.
`.gitignore` covers `.playwright-mcp/` and root-level images only (`/*.png` etc.), so assets under `public/`, `src/` or `docs/` are unaffected.

## Deferred / not installed

- Graphify: deferred (repo too small).
- GitHub MCP: not needed (git + `gh` available).
- Lighthouse CI, `@axe-core/playwright`, Playwright Test, `astro check`, link checking: add during the Astro phase.
