# PhDNexus — Design Brainstorm

## Platform Purpose
A global platform for PhD students to share research ideas, find collaborators, join discipline communities, and advance academic discourse.

---

<response>
<probability>0.07</probability>
<text>

## Idea A — "Academic Brutalism"

**Design Movement:** Neo-Brutalism meets Academic Precision

**Core Principles:**
1. Raw structural honesty — no decorative chrome, every element earns its place
2. High-contrast black/white canvas with Sunlight Yellow as the only accent (per DESIGN.md)
3. Dense information architecture — PhD students are comfortable with density
4. Geometric rigidity — square corners everywhere, hairline dividers, no softness

**Color Philosophy:**
- White canvas (#ffffff) for idea feeds and browsing
- Black (#000000) for hero bands, storytelling, and the footer
- Sunlight Yellow (#ffed00) reserved exclusively for primary CTAs, NEW badges, and one accent tile per band
- Text hierarchy: #000000 → #222222 → #333333 → #666666

**Layout Paradigm:**
- Asymmetric left-heavy layout: a fixed 280px left rail for navigation/filters, content fills the rest
- Full-bleed black hero with stacked left-aligned display text
- Tile grid for idea cards: 3-up on desktop, 2-up tablet, 1-up mobile
- Alternating white/black section bands for rhythm

**Signature Elements:**
1. Yellow accent bar (4px) on the left edge of featured idea cards
2. "NEW" pill badges in yellow on recently posted ideas
3. Overline labels in 10px uppercase above all section titles

**Interaction Philosophy:**
- Buttons scale(0.97) on press, 160ms ease-out
- Cards lift with a 1px border change on hover (hairline → hairline-strong)
- No decorative animations — motion is functional only

**Animation:**
- Page transitions: opacity 0→1, 200ms ease-out
- Card entrance: translateY(8px)→0 + opacity 0→1, staggered 50ms per card
- Button press: scale(0.97), 160ms cubic-bezier(0.23,1,0.32,1)

**Typography System:**
- Display: Manrope 700, 56px, lineHeight 0.95 (NouvelR substitute)
- Body: Manrope 400, 16px, lineHeight 1.4
- Captions: Manrope 400, 12px
- Overlines: Manrope 700, 10px uppercase

</text>
</response>

<response>
<probability>0.06</probability>
<text>

## Idea B — "Scientific Precision" (CHOSEN)

**Design Movement:** Swiss International Typographic Style meets Modern SaaS

**Core Principles:**
1. Grid-first precision — every element aligned to an invisible 8px grid
2. Photography-first idea cards — research imagery full-bleed, copy stacked beneath
3. Strict two-tone rhythm: white catalogue mode ↔ black storytelling mode
4. Yellow as a signal flare — one per viewport maximum

**Color Philosophy:**
- The palette is borrowed directly from DESIGN.md: white/black as the structural canvas, yellow as the single brand accent
- Semantic colors (error/success/warning) are functional, never decorative
- Text hierarchy flows from #000000 through #222222, #333333, #666666 — no mid-grey backgrounds

**Layout Paradigm:**
- Top navigation bar (60px) with logo left, nav center, actions right
- Full-bleed black hero band with display-xl headline stacked left
- Sub-nav pill rail below hero for discipline filtering
- 3-column idea card grid on white canvas
- Alternating black storytelling bands for featured researchers/communities
- Yellow accent tile (one per page) for the primary CTA

**Signature Elements:**
1. Yellow left-border accent on featured idea cards (4px solid #ffed00)
2. Circular avatar dots (rounded-full) contrasting with square card geometry
3. "NEW" badge in yellow pill on recently posted ideas

**Interaction Philosophy:**
- Hover: border color transitions from hairline to hairline-strong (1px, 150ms)
- Button press: scale(0.97), 160ms ease-out
- Card hover: subtle translateY(-2px), 200ms ease-out

**Animation:**
- Hero text: staggered word reveal, 30ms per word, translateY(16px)→0
- Cards: staggered entrance 50ms apart, opacity+translateY
- Nav: instant — no animation on keyboard-initiated actions

**Typography System:**
- Manrope (Google Fonts) as NouvelR substitute
- Display XL: 700, 56px, lineHeight 0.95
- Body: 400, 16px, lineHeight 1.4
- Buttons: 700, 14.4px, letterSpacing 0.144px

</text>
</response>

<response>
<probability>0.05</probability>
<text>

## Idea C — "Dark Academia"

**Design Movement:** Dark Academia aesthetic meets Academic Publishing

**Core Principles:**
1. Inverted canvas — black as the default surface, white for accent cards
2. Yellow as a warm lamp-light accent in a dark scholarly environment
3. Dense typographic hierarchy — multiple weight levels create depth without color
4. Catalogue precision — hairline dividers, no shadows, no gradients

**Color Philosophy:**
- Primary surface: #000000 (black)
- Card surfaces: #111111 (surface-deep)
- Accent: #ffed00 (yellow) — even more scarce than in light mode
- Text: #ffffff → rgba(255,255,255,0.72) → #666666

**Layout Paradigm:**
- Full-width dark canvas with white cards inset
- Left sidebar navigation (collapsible)
- Masonry-style idea grid for varied content heights
- Yellow accent band at the very top (4px) as a brand bar

**Signature Elements:**
1. Glowing yellow dot indicators on active/new content
2. White card islands floating on black canvas
3. Overline discipline tags in yellow uppercase

**Interaction Philosophy:**
- Hover: card background shifts from #111111 to #1a1a1a
- Yellow elements pulse subtly on hover (opacity 1→0.8→1)
- Transitions: 200ms ease-out throughout

**Animation:**
- Scroll-triggered section reveals: opacity+translateY, 300ms
- Card hover: border-color transition from divider-dark to on-dark
- Modal: scale(0.95)→scale(1) + opacity, 250ms

**Typography System:**
- Manrope 700 for display, 400 for body
- On dark: on-dark (#ffffff) primary, on-dark-mute (rgba(255,255,255,0.72)) secondary

</text>
</response>

---

## Selected Approach: **Idea B — "Scientific Precision"**

**Rationale:** This approach most faithfully implements the DESIGN.md system — white catalogue mode for browsing, black storytelling bands for featured content, and yellow as a disciplined accent. It creates a platform that feels authoritative and precise, matching the intellectual identity of PhD students, while the full-bleed hero and tile grid architecture provides strong visual hierarchy.

**Design commitment:**
- Font: Manrope (Google Fonts) — geometric, semi-condensed, NouvelR substitute
- Colors: #ffed00 primary, #000000 ink/dark, #ffffff canvas, per DESIGN.md tokens
- Corners: 2px on buttons, 0px on cards/tiles, pill on badges/sub-nav
- Rhythm: white → black → yellow → black band cycling
- Typography: 700/0.95 for display, 400/1.4 for body, strict weight contrast
