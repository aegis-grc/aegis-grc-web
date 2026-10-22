# Aegis corporate website

Static marketing site for **Aegis** and its product family: Aegis GRC (with Contracts and QMS), Aegis Amplify
and Aegis Sentinel, plus the Aria intelligence layer. Built with Astro (TypeScript, static output, no UI framework).

## Run it

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # static site in dist/
npm run preview    # serve dist/ locally
```

Node 22.23.4 or newer. The first build fetches the three web fonts (Cormorant Garamond, Outfit, DM Mono) from
Fontsource and self-hosts them, so it needs network access once.

## Configuration

Copy `.env.example` and set values in your hosting environment. Nothing is hardcoded.

| Variable                                                      | Effect                                                                                                                                  |
| ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `PUBLIC_SITE_URL`                                             | The public origin. **Unset means every page is `noindex`, `robots.txt` disallows crawling and no sitemap is built.** Set it to go live. |
| `PUBLIC_CONTACT_EMAIL`                                        | Inbox for mailto links and the contact form (defaults to the existing `hello@aegis-grc.com`).                                           |
| `PUBLIC_APP_URL_GRC` / `PUBLIC_APP_URL_AMPLIFY` / `_SENTINEL` | Verified application sign-in URLs. `/sign-in` only links a product when its URL is set.                                                 |
| `PUBLIC_FORM_ENDPOINT`                                        | Optional approved form service. When set, `/contact` posts there; otherwise it composes a pre-filled email.                             |

## Quality checks

```sh
npm run check        # astro check (types)
npm run format:check # Prettier
npm run test:links   # internal links and anchors in dist/ (run build first)
npm run test:seo     # canonical/robots/sitemap/JSON-LD rules (works in both site-URL modes)
npm run test:e2e     # Playwright: structure, overflow, axe WCAG A/AA on every route at 3 viewports, navigation, no-JS
npm run lhci         # Lighthouse CI (desktop preset); reports in .lighthouseci/, never uploaded
npm run verify       # check + build + links + seo + e2e
```

Playwright uses the installed Google Chrome (`channel: 'chrome'`), so no browser download is needed.

## Layout

```
src/data/        products, nav/footer, solutions, industries, resources (declare once, used everywhere)
src/styles/      tokens.css (design tokens, per-product accents), base.css, patterns.css
src/components/  header, footer, lockups, page hero, product visuals
src/pages/       one file per route (see docs/superpowers/plans for the route list)
e2e/ scripts/    Playwright tests; link, SEO and OG-image scripts
```

Product pages set `data-product="grc|amplify|sentinel"`, which swaps only the accent variables.

## Decisions and open questions

See `docs/provisional-decisions.md` for every provisional choice (domain, entity name, legal pages, Sentinel
accent, mark artwork, claims to verify) and `.claude/TOOLING.md` for the design/dev tooling used to build this.
