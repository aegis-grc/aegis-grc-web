# Aegis Multi-Product Corporate Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the single-page Aegis GRC site into a static, multi-product Aegis corporate site (home, three product families, Aria, solutions, industries, security, resources, company, contact, sign-in) on Astro, without losing the useful GRC content.

**Architecture:** Astro static output, TypeScript, zero UI framework. One typed data module per concern (`products`, `site`, `solutions`, `industries`, `resources`) feeds nav, footer, cards, sign-in, SEO and JSON-LD, so a product is declared once. A token-based design system (`tokens.css`) defines the Aegis corporate surfaces; each product sets only `--accent*` and a motif through a `data-product` attribute on the page wrapper. JS is limited to one small inline module (menu disclosure, reveal, contact mailto composer).

**Tech Stack:** Astro, TypeScript, `@astrojs/sitemap`, self-hosted fonts via `@fontsource*`, Prettier + `prettier-plugin-astro`, `@astrojs/check`, Playwright Test + `@axe-core/playwright`, Lighthouse CI, a dependency-free link checker.

**Spec:** the implementation brief given in the session ("Full multi-product site implementation") plus `docs/provisional-decisions.md` (created in Task 1) for anything the brief left open.

## Global Constraints

- Work only on branch `website/aegis-multiproduct-brand`; logical commits; do **not** push, deploy, or touch DNS/email.
- Astro current stable, TypeScript, static output, minimal client JS; no React; no Tailwind.
- Preserve Git history; same repo; legacy `index.html` is replaced only when the Astro homepage lands.
- Routes: `/`, `/products`, `/products/grc`, `/products/grc/contracts`, `/products/grc/qms`, `/products/amplify`, `/products/sentinel`, `/solutions`, `/industries`, `/resources`, `/security`, `/company`, `/contact`, `/sign-in`; optional `/platform/intelligence` (Aria); footer-linked `/privacy`, `/terms` (holding pages, no invented legal copy).
- Site URL is configurable (`PUBLIC_SITE_URL`); never hardcode an unapproved domain. Unset ⇒ `noindex` + robots `Disallow`.
- App sign-in URLs come only from env (`PUBLIC_APP_URL_GRC|AMPLIFY|SENTINEL`); unset ⇒ no link, no guess.
- Fonts: Cormorant Garamond (display), Outfit (body), DM Mono (labels). Smallest text 0.8125rem.
- Palette: corporate navy / charcoal / near-black blue / silver / cool blue; GRC emerald; Amplify blue-silver; Sentinel blue-violet or cyan-teal (decided by measured distance, recorded).
- Do not use the compliance checkmark as the corporate mark.
- Do not claim: certifications, ROI/customer/performance numbers, competitor prices, autonomous containment/remediation, multi-tenancy/HA-DR/broad SIEM-ITSM coverage/STIX-TAXII for Sentinel, Aria/Atlas/Echo/Warden as shipping features, a literally shared Aria runtime. Atlas/Echo/Warden appear only labelled conceptual.
- Aria is never a fourth product. Nothing references Dana, an external employer, or a source codebase.
- Accessibility: landmarks, skip link, one h1 per page, disclosure mega-menu with `aria-expanded`/`aria-controls`, visible focus, reduced motion, contrast ≥ AA.
- Complete = content coherent, responsive proven in Playwright at desktop/tablet/mobile, no broken links, no developer placeholder copy, no unsupported claims.

## Review Focus

- JS disabled: nav, mega-menu links, contact fallback and all content still reachable and readable.
- `PUBLIC_SITE_URL` unset or malformed: build still succeeds, emits `noindex`, no invented domain in canonical/OG/sitemap.
- Mega-menu keyboard path: Tab into trigger, Enter/Space opens, Esc closes and returns focus, focus leaving closes it, touch devices open on tap.
- 320px-wide viewport and 200% zoom: no horizontal scroll, no clipped nav or cards.
- Very long product/solution names or empty env URLs on `/sign-in` render the "not configured" state without a dead link.

---

### Task 1: Foundation scaffold and tooling commit

**Files:** Create `package.json`, `astro.config.mjs`, `tsconfig.json`, `.prettierrc`, `docs/provisional-decisions.md`; Modify `.gitignore`.
**Interfaces:** Produces npm scripts `dev`, `build`, `preview`, `check`, `format`, `format:check`, `test:e2e`, `test:links`, `lhci`.

- [ ] Commit existing project tooling files (`.claude/` minus `ui-ux-pro-max`, `.mcp.json`, `CLAUDE.md`, `.gitignore`) as `chore: add project tooling config`.
- [ ] Install pinned dependencies; confirm `npx astro --version`.
- [ ] `astro.config.mjs` reads `PUBLIC_SITE_URL`, sets `output: 'static'`, `trailingSlash: 'never'`, sitemap integration.
- [ ] Run `npm run build` against an empty `src/pages/index.astro`; expect success.

### Task 2: Design system (tokens, base, typography, logo)

**Files:** `src/styles/tokens.css`, `src/styles/base.css`, `src/components/Logo.astro`, `src/components/ProductGlyph.astro`, `public/favicon.svg`.
**Interfaces:** Produces CSS variables (`--bg*`, `--surface*`, `--text*`, `--accent`, `--accent-ink`, scale `--step-*`), `Logo({ product?: ProductId, size?: 'sm'|'md' })`, `ProductGlyph({ product, size })`.

- [ ] Measure Sentinel candidates (blue-violet vs cyan-teal) against GRC/Amplify/corporate by OKLab distance and contrast; record result in `docs/provisional-decisions.md`.
- [ ] Define tokens and per-product accent sets via `[data-product]`.
- [ ] Build mark + lockups; screenshot at three sizes in Playwright.

### Task 3: Data model and shell

**Files:** `src/data/{products,site,solutions,industries,resources}.ts`, `src/layouts/BaseLayout.astro`, `src/components/{Seo,Header,Footer,Section,Button,CtaBand,Breadcrumbs}.astro`, `src/scripts/ui.ts`.
**Interfaces:** `ProductId = 'grc'|'amplify'|'sentinel'`; `Product { id; name; path; tagline; summary; accent }`; `BaseLayout({ title, description, product?, path, schema?, noindex? })`.

- [ ] Header with accessible disclosure mega-menu and mobile drawer; Footer with required links.
- [ ] Playwright e2e `nav.spec.ts`: keyboard open/close/Esc, `aria-expanded` toggles, mobile drawer. Run: expect PASS.

### Task 4: Homepage + `/products`

**Files:** `src/pages/index.astro`, `src/pages/products/index.astro`, `src/components/{HeroMark,ProductCard,ArIaBand,PrinciplesBand}.astro`.

- [ ] Hero names revenue, risk, security; portfolio, Aria band, governed-AI principles, trust, solutions/industries teaser, resources/company, final CTA.
- [ ] Delete legacy `index.html` in this commit (content survives in git history and on `/products/grc`).
- [ ] Commit.

### Task 5: GRC family (`/products/grc`, `/contracts`, `/qms`)

- [ ] Migrate content per the brief's keep/drop lists; no competitor names, prices, counts, or certification implications.
- [ ] Contracts and QMS carry an "Part of Aegis GRC" endorsement and breadcrumb.

### Task 6: Amplify and Sentinel

- [ ] Amplify: blue/silver pipeline motif, capability areas only, no numbers.
- [ ] Sentinel: darker control-room treatment, evidence-timeline + approval-gate motif, only the approved capability themes, "plan-only, gated" language.

### Task 7: Aria, Solutions, Industries

- [ ] `/platform/intelligence` explains shared philosophy without claiming a shared runtime; conceptual agents labelled.
- [ ] Solutions by problem with product cross-links; Industries with product-relevance matrix and no certification implication.

### Task 8: Security, Resources, Company, Contact, Sign-in, legal holding pages, 404

- [ ] Contact form composes a `mailto:` (JS) with a no-JS `mailto` form fallback, `data-endpoint` hook for a future service.
- [ ] Sign-in cards link only when env URL is set.
- [ ] `/privacy`, `/terms`: noindex holding pages stating policies are not yet published.

### Task 9: SEO

- [ ] Per-page title/description, canonical, OG/Twitter, sitemap, `robots.txt` endpoint, Organization + SoftwareApplication + BreadcrumbList JSON-LD, OG image generated once with Playwright.
- [ ] Test: build with and without `PUBLIC_SITE_URL`; grep `dist` for the invented-domain case.

### Task 10: Quality tooling and verification

- [ ] `astro check`, Prettier, Playwright e2e (nav, axe on every route at desktop and mobile), `scripts/check-links.mjs`, `lighthouserc.json`.
- [ ] Playwright screenshots of every route at 1440 / 820 / 390 reviewed by eye.
- [ ] Impeccable critique pass and Emil motion pass; apply meaningful fixes only.
- [ ] Final: `npm run build && npm run check && npm run test:e2e && npm run test:links && npm run lhci`; paste real output into the report.
