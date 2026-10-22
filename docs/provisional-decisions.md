# Provisional decisions

Decisions made during the first implementation of the multi-product Aegis site where the brief left an
owner decision open. Each one is deliberately easy to change. Anything marked **verify** states something
carried over from the previous site or from the brief that this repo cannot prove.

## Identity and domain

| Topic                      | Provisional decision                                                                                                                                                                                                                                                                   | Where to change it                                                 |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Public domain              | Not hardcoded. `PUBLIC_SITE_URL` drives canonical URLs, Open Graph, JSON-LD and the sitemap. **Unset means every page is `noindex`, `robots.txt` disallows crawling and no sitemap is built.**                                                                                         | Hosting environment variable; `astro.config.mjs`, `src/lib/seo.ts` |
| Contact inbox              | Keeps the existing `hello@aegis-grc.com` so production email is untouched. Override with `PUBLIC_CONTACT_EMAIL`.                                                                                                                                                                       | `.env.example`, `src/data/site.ts`                                 |
| Legal entity in the footer | "© <year> Aegis." The previous "Aegis GRC, Inc." could not be verified.                                                                                                                                                                                                                | `src/components/Footer.astro`                                      |
| Application sign-in URLs   | Unconfigured. `/sign-in` only renders a link when `PUBLIC_APP_URL_GRC` / `_AMPLIFY` / `_SENTINEL` is set; otherwise it shows "your link comes from your administrator". `app.aegis-grc.com` was never confirmed.                                                                       | `.env.example`, `src/pages/sign-in.astro`                          |
| Contact form               | No backend. Submitting composes a pre-filled email (and works as a plain `mailto` form without JS). Setting `PUBLIC_FORM_ENDPOINT` turns it into a normal POST form.                                                                                                                   | `src/components/ContactForm.astro`                                 |
| Privacy / Terms            | `/privacy` and `/terms` are `noindex` holding pages that say plainly no policy has been published yet. No legal copy was invented. **A real privacy policy is needed before launch** (the site sets no cookies and loads no third-party scripts, but visitors can email via the form). | `src/pages/privacy.astro`, `terms.astro`                           |
| Hosting                    | Unknown. Output is plain static files in directory form with trailing slashes, which every static host serves identically.                                                                                                                                                             | `astro.config.mjs`                                                 |

## Visual system

| Topic                 | Provisional decision                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Corporate accent      | Restrained steel/cool blue `#7FA8E8` on navy/charcoal surfaces (`--bg #070B14` → `--surface-hi #1A2740`). Silver neutrals for the mark and rules.                                                                                                                                                                                                                                                                                                          |
| GRC / Amplify accents | GRC emerald `#2FC987`; Amplify azure `#4D9BFF`. GRC pages use the same navy surfaces as everything else (no longer a green-black identity).                                                                                                                                                                                                                                                                                                                |
| **Sentinel accent**   | **Cyan-teal `#34D1D1`.** Measured in OKLab against the other three accents, including protan/deutan/tritan simulation. Blue-violet scored ≈0.10 under normal vision but collapsed into the blues for red-green colour-blind viewers (worst case 0.008–0.018); cyan-teal held 0.047–0.099 and avoids the generic "AI purple". Its tightest pair is GRC emerald (36° apart), so distinction also rests on name, glyph, motif and Sentinel's darker surfaces. |
| Master mark           | Provisional: the existing shield silhouette with a faceted left plane and an inner peak (an "A" without the checkmark). Not final artwork. Product glyphs: check (GRC), rising chevrons (Amplify), checkpoint arch (Sentinel).                                                                                                                                                                                                                             |
| Type                  | Cormorant Garamond (display, 500/600/700), Outfit (body), DM Mono (labels), self-hosted at build time through Astro's Fonts API (Fontsource provider; **the first build needs network access to fetch the font files**). Smallest text is 13px.                                                                                                                                                                                                            |
| Motion                | One hero entrance (outline draw-in and facet fade), hover/press states, the mega-menu and drawer. **No scroll-reveal:** it hid content from any renderer that does not scroll and is the generic default.                                                                                                                                                                                                                                                  |
| Eyebrows              | Sentence-case DM Mono with a small diamond marker, used only where they say something (product/section type), not above every heading.                                                                                                                                                                                                                                                                                                                     |

## Content and claims

- **Removed from the old page:** named competitors and their prices (Vanta, Ironclad, AuditBoard), "Legacy GRC"
  comparison figures, hero stats ("12+ modules", "6 frameworks", "5→1"), the decorative dashboard metrics
  (94%, 142/150, +38%, "Vendor Score 94"), "Built to SOC 2 & HIPAA controls", the GDPR/compliance badge strip
  presented as support, "live in days / no implementation project", "no six-figure minimums", packaging limits
  ("up to 25 users", "100 AI actions/mo"), duplicate product sections, broken `#platform` / `#how` anchors, dead CSS.
- **Frameworks** (HIPAA, SOC 2, ISO 27001, GDPR, NIST CSF) are listed without a count and with an explicit
  "does not certify compliance" note. **Verify** that mapping templates exist for each.
- **GRC security statements** (tenant isolation, encryption in transit/at rest, tamper-evident audit logging)
  are carried from the old site with the absolutes ("never reachable", "managed keys") removed. **Verify with engineering.**
- **Contracts:** the brief mentions approvals, but the old site never states an approval workflow, so the page
  does not claim one. **QMS:** the brief mentions corrective actions; the old site never states a CAPA
  capability, so the page does not claim one. Add both once the owner confirms them.
- **Amplify:** capability areas only, no statistics. "Demand Network" is named but not defined, because the brief
  does not define it. **Provide a one-sentence definition.**
- **Sentinel:** limited to the approved capability themes in the brief. Containment is described exactly as
  "gated, plan-only". Vendor names are used descriptively with a trademark note. **Verify** each item against the
  product before launch; this repo has no evidence of its own.
- **Aria** is described as a shared approach and identity, never as one runtime or a fourth product.
- **Atlas / Echo / Warden** appear once, on `/platform/intelligence`, labelled "Conceptual only … not available
  features". **Owner decision:** whether to show them publicly at all.
- **Industries:** a fit matrix only, no certification implication. Sentinel is not shown for MSPs/vCISOs
  because multi-tenancy must not be implied.

## Design review outcomes

An independent Impeccable critique and an Emil Kowalski motion review were run on the built site
(read-only, in separate sessions). Accepted and applied: opaque header and a slimmer product sub-nav (no
duplicated lockup), smaller product-page headlines so CTAs sit above the fold, a copy-first mobile hero,
tags restyled from pills to a ruled list, more varied home compositions, regrouped footer, a persistent
mobile "Contact" action, calmer hero bands and entrance, enter-slow/leave-fast menu timing, one arrow nudge
(3px, 160ms, hover devices only), 140ms colour transitions, an instant skip link.

Declined, with reasons:

- **"Request a briefing" (Sentinel) vs "Contact sales" (others) stays.** Sentinel's availability is not
  verified here, so "briefing" avoids implying general availability. Revisit when its status is known.
- **Card baseline alignment**: already aligned (CTAs are bottom-pinned).
- **Global reduced-motion rule kept blunt** (all transitions to ~0ms). Reviewer called it acceptable.

A class-name collision found along the way (visual components reusing the global `.note` disclaimer class)
was fixed by renaming the component classes. Avoid generic names (`.note`, `.group`, `.items`) in components.

## Tooling notes

- Impeccable telemetry and Astro telemetry are disabled for Claude sessions in this project
  (`.claude/settings.json`).
- `npm run verify` = type check, build, link check, SEO check, Playwright (including axe). `npm run lhci`
  builds with a placeholder origin so Lighthouse's SEO audit can run; it writes reports to `.lighthouseci/` (ignored)
  and never uploads them.
