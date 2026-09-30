# SandBase APIs — Landing Page

A landing page for the [SandBase](https://sandbase.ai) APIs catalog: **966 real-world
endpoints across 30 platforms**, every one priced, reachable from a product or an agent
behind a single key.

The layout borrows its hero treatment from [monid.ai](https://monid.ai) while staying
inside SandBase's own design system.

![SandBase APIs hero](docs/images/hero.png)

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build (fully static) |
| `npm start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |

Built with **Next.js 15** (App Router), **React 19**, **TypeScript** and **Tailwind CSS v4**.

---

## Design system

Every colour, font and spacing value is taken from sandbase.ai's compiled stylesheet
(`/_next/static/css/*.css`, the `:root` block) rather than eyeballed. The live
`html[data-theme=dark]` block is byte-identical to `:root`, so dark is the only theme.

| Token | Value | Use |
| --- | --- | --- |
| `--color-canvas` | `#0e0b1a` | Page background |
| `--color-surface` | `#241d44` | Cards |
| `--color-plate` | `#1e1936` | Filter rail, inset panels |
| `--color-panel` | `#3a3070` | Monogram tiles |
| `--color-accent` | `#d9ff43` | Lime accent, eyebrows, CTAs |
| `--color-tint-cyan` | `#8b6fff` | Purple tint |

Tokens live in two deliberately disjoint places:

| Location | Purpose |
| --- | --- |
| `@theme` (`app/globals.css`) | Tailwind-facing aliases only — `font-sans`, `font-mono`, fluid spacing |
| `:root` (`app/globals.css`) | Everything else, consumed as `var(--token)` |

Keeping the lists disjoint means a value can never drift between two declarations.

### Visual language

Measurements were taken off the live `/apis` page with `getComputedStyle`:

- **Square corners.** Cards, inputs, buttons, chips and tags all compute to
  `border-radius: 0px` on the live site, so `--radius-sm/md/lg` are all `0px`. Only the
  round "live" dot and the price badge stay circular.
- **Eyebrow** — JetBrains Mono 10px/700, uppercase, in the accent colour. It sits above
  each vendor name on its card, showing the raw category slug.
- **Type scale** — display headings 64px/500 with `-1.6px` tracking; vendor names 17px/500;
  body 14px/1.6.
- **Header** — 72px tall; nav reads Explore / Agents / Solutions / Docs / Pricing.
- **Catalog** — a sticky 220px filter rail with square 12px checkboxes, mono labels and
  right-aligned counts; search, sort and the Grid/List toggle sit above the grid.

![SandBase APIs catalog](docs/images/catalog.png)

---

## Brand assets

All three come from sandbase.ai itself rather than being approximated:

- **Logo** — `public/brand/sandbase-logo.png`.
- **Clash Grotesk** — the live site self-hosts a variable woff2 (weight 200–700) at
  `/ClashGrotesk-Variable.woff2`. The same file ships in `public/fonts/`, declared via
  `@font-face` and preloaded, so rendering matches exactly and the display face carries no
  third-party CDN dependency. JetBrains Mono is the one face the live site still pulls from
  Google Fonts, so it does the same here.
- **Vendor brand marks** — 26 official 24×24 paths extracted from sandbase.ai's own client
  bundle (webpack chunk 5068, module 31679) into `lib/vendor-icons.ts`, together with the
  vendor→mark mapping the live catalog uses (`douyin` → TikTok mark, `twitter` → X mark,
  `scholar` → Google Scholar mark). They cover 19 of the 30 catalog platforms. The
  remaining 11 — `lemon8`, `xigua`, `pipixia`, `toutiao`, `dataforseo`, `firecrawl`,
  `agentbody`, `cloudsway`, `exa`, `sandbase`, `tavily` — have no mark in that bundle and
  fall back to a monogram tile via `components/vendor-logo.tsx`.

---

## Data

`lib/vendors.ts` is the single source of truth for the catalog: 30 platforms with
descriptions, tags and endpoint counts copied from the live `/apis` page.

`TOTAL_ENDPOINTS` and `TOTAL_PLATFORMS` are **derived** from that list and consumed by the
hero, stats strip, catalog heading, footer, CTA, quickstart sample output and the document
title. No headline number is hardcoded, so copy cannot drift from the data.

---

## Links

This project only owns `/`. Every destination it links to lives on the real site, so all
outbound paths resolve through `sb()` in `lib/vendors.ts` (`https://sandbase.ai` + path).
Nothing points at a route that does not exist here, so no link can dead-end on a 404.

---

## Project structure

```
app/
  layout.tsx        fonts, metadata (title derived from catalog totals)
  page.tsx          section composition + stats strip
  globals.css       design tokens, primitives, marquee animation
components/
  primitives.tsx    logo, announcement bar, header, footer, section header
  hero.tsx          hero copy + monid-style scrolling tool wall
  catalog.tsx       search / category filter / sort / grid-list toggle
  quickstart.tsx    Discover → Run → In an agent, with simulated output
  sections.tsx      three ways in, pricing, FAQ, final CTA
  vendor-logo.tsx   official brand mark with monogram fallback
lib/
  vendors.ts        catalog data, derived totals, hero wall, link helper
  vendor-icons.ts   26 extracted brand marks
public/
  brand/            logo
  fonts/            Clash Grotesk variable woff2
docs/
  images/           screenshots used by this README
```

---

## Implementation notes

Two details that are easy to get wrong:

**Seamless marquee.** Each column of the hero wall renders its list twice and translates
`-50%`, so the halfway point must be exactly one full copy. Flex `gap` on the track adds a
trailing gap that shifts that point by 12px and makes the loop visibly jump — each half is
therefore wrapped in its own container owning its internal gap and padding.

**Grid overflow.** Long unbreakable strings (`sb agents create --tool …`) force grid items
wider than their track, because grid children default to `min-width: auto`. Cards in a grid
carry `min-w-0` so those strings truncate instead of pushing the page wide.

`prefers-reduced-motion: reduce` disables the marquee and all transitions.

---

## Screenshots

Two are checked in under `docs/images/`. The full set, captured at 1440×900 and 390×844,
lives in `.preview/` (git-ignored).

---

## Status

This is a front-end prototype. The catalog is static data, and the quickstart outputs are
illustrative rather than captured from a live request. Two details are assumptions rather
than verified facts, and should be confirmed before wiring up a backend:

- the `@sandbase/sdk` package name and call shape
- the `api.sandbase.ai` hostname and path structure
