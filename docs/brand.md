# Aegis brand implementation

The site uses the owner-approved Aegis identity. The reference artwork is preserved, unmodified, in
`docs/brand/reference/`:

- `aegis-brand-identity-showcase-board.png`: the usage board (variants, clear space, minimum size, palette)
- `aegis-primary-logo-light.png`: the full-resolution primary logo on a light ground, used as the tracing source

This supersedes the earlier provisional shield (solid shield with an inner peak) and the serif wordmark.

## What is implemented

| Element                          | Where                                                                                                                     | Notes                                                                           |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Shield + AEGIS horizontal lockup | `AegisLogo.astro` (`variant="lockup"`), used by `Logo.astro` in the header, footer and product lockups                    | Default header lockup has no tagline                                            |
| Shield alone                     | `AegisLogo.astro` (`variant="mark"`), `public/favicon.svg`, `public/brand/aegis-mark*.svg`                                | Mobile fallback below 360 px; favicon uses an optimised simplified shield       |
| Light and dark treatments        | wordmark gradient switches on the nearest `data-theme`                                                                    | Light: navy to blue to steel-silver. Dark: blue to white                        |
| Monochrome / reversed            | `mono` prop; `public/brand/aegis-logo-mono.svg`, `aegis-mark-mono.svg`                                                    | Single colour (`currentColor`), leaf and gap cut out                            |
| Tagline                          | `brand/Tagline.astro`                                                                                                     | Homepage brand moment, Company page, footer only                                |
| Product lockups                  | `Logo.astro` with `product`, used in product page heroes                                                                  | Master shield + AEGIS, a divider, then the product glyph and name in its accent |
| Static assets                    | `public/brand/*.svg`, `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `brand/aegis-mark-512.png`, `og/aegis.png` | Generated: `npm run brand`                                                      |

Source of truth: `src/brand/aegis.mjs` (geometry, gradients, wordmark path). The Astro components and the
generator both import it, so the site and the exported files cannot drift apart.

## Vector status and approximations

**Wordmark: traced.** The AEGIS letterforms are a vector trace of the approved artwork (mask from the
full-resolution logo, closed light-streak cracks, potrace). They are faithful to the approved shapes, with edges
smoothed. Not exact: the streak/bevel shading in the artwork is replaced by a diagonal gradient and a faint steel
edge, and minor corner roughness from tracing remains.

**Shield: hand-built approximation.** The silhouette, facets, leaf, shard, white diagonal gap and green/teal
glint were measured from the approved artwork and rebuilt as layered gradient shapes, then compared side by side.
Close, but approximate in: the photographic 3D lighting and micro-bevel texture, the soft floor reflection and
light rays behind the mark (not reproduced), and exact gradient values. Details are simplified in the favicon
version so it stays legible at 16 px.

If exact master vector artwork exists (or can be supplied as SVG/AI/Figma export), replace the shapes in
`src/brand/aegis.mjs` and re-run `npm run brand`.

## Palette (from the board)

| Role                                            | Value     | Source                                                                 |
| ----------------------------------------------- | --------- | ---------------------------------------------------------------------- |
| Aegis Navy (structure, typography, dark anchor) | `#0A2A5B` | board label                                                            |
| Aegis Blue (technology, trust, primary accent)  | `#1E6BFF` | board label                                                            |
| Aegis Green / Teal (selective accent)           | `#00C896` | board label                                                            |
| Aegis Silver                                    | `#BAC3D2` | **sampled** from the board swatch: the printed hex label was illegible |
| Aegis Light (page backgrounds)                  | `#F4F7FB` | board label                                                            |
| Charcoal (secondary text)                       | `#2B2F36` | board label                                                            |

Derived: `--blue-text #1252D6` (text-safe blue on light grounds; the vivid blue is 4.2:1 on the pale ground),
`--navy-deep #061B3F` (dark ground), `--navy-panel #0E3470`. Green stays a selective accent; product accents are
unchanged (GRC emerald, Amplify azure, Sentinel cyan-teal).

## Usage rules applied

- Clear space around the lockup equals the height of the "A" (about 17 px at the 44 px header size).
- Minimum sizes from the board: 120 px wide for the full logo, 24 px for the icon. The header lockup is about 139 px
  wide; below 360 px the shield alone is shown.
- The tagline is not in the header, not on product pages, and not beside every logo.
- Aria is shown as "Aria, the Aegis intelligence layer", never as a fourth product lockup.
