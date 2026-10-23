# Product signature system: art direction

Goal: GRC, Amplify, Sentinel and Aria read as four distinct experiences inside one Aegis system, without
fake dashboards, invented data or capabilities beyond the approved claims.

## Real screenshots audit

No safe, current product screenshots exist, so none are used.

- `aegis-platform/` contains no image files.
- `dana-soc-agent/` has one loose screenshot; Dana is internal and must not appear publicly. Not read.
- `revenuepilot/docs/design/screenshots/*` (45 images) are design prototypes of an unbuilt product
  ("No application code has been built"), carry the RevenuePilot name, invented people and dollar amounts
  and a private tenant. Not usable.
- `aegis-grc-web` holds only brand reference art.

The abstract visuals stay, upgraded to deliberate "system diagrams". When real screenshots exist, each
signature section has a clear slot (see each component's header comment).

## Three concepts

**A. Architectural / system diagrams.** Each product gets a diagram that explains its mechanism: GRC a
framework → control → evidence graph; Amplify a lead flow with a recovery loop; Sentinel a gated
investigation sequence; Aria a layer under three product pillars. Strong on credibility (shows how it
works, needs no data), maintainability (SVG/CSS, no assets) and mobile (each diagram has a real vertical
form). Risk: can feel like a whiteboard if every product uses the same line language.

**B. Product UI storytelling.** Detailed UI panes with annotations. Closest to a product tour, but with no
real screenshots it means inventing UI content and data, which is exactly the "placeholder / fake
dashboard" failure the review called out. Poor on mobile (miniaturised dashboards).

**C. Hybrid.** Diagram structure carrying a few UI-shaped fragments (chips, a case header, a gate card).

## Selected: C, led by A

System diagrams are the primary idea; UI fragments appear only where they clarify (a control row with a
missing-evidence gap, the approval gate card). Each product gets its own line language so they cannot be
mistaken for each other:

| Product  | Mechanism metaphor         | Line language                              | Ground                    | Hero layout        |
| -------- | -------------------------- | ------------------------------------------ | ------------------------- | ------------------ |
| GRC      | Layered structure          | Orthogonal, ruled, still                   | Light, white layers       | Copy left, 58% visual |
| Amplify  | Flow with a recovery loop  | Curved, directional, moving dots           | Saturated azure band      | Stacked, full-width |
| Sentinel | Gated investigation        | Straight rail, one gate, cyan on navy      | Navy workspace            | Mirrored (visual left) |
| Aria     | Layer under three pillars  | Silver-to-blue thread, one wide slab       | Navy slab on light/dark   | Stacked, centred   |

Motion: Amplify dots travel the rail (transform only); Sentinel's gate pulses once; everything is static
under `prefers-reduced-motion`.
