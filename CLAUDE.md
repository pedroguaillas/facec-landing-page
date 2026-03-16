# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server (localhost:4321)
npm run build     # Build static site to dist/
npm run preview   # Preview production build
```

## Tech Stack

- **Astro 5** — static site generator with file-based routing
- **Tailwind CSS 4** — via `@tailwindcss/vite` plugin (no `tailwind.config.js`; configuration is in CSS or `astro.config.mjs`)
- **Vanilla JS** — no React/Vue/Svelte; interactivity is plain JavaScript in `<script>` tags or `/src/scripts/`

## Architecture

**Pages** (`/src/pages/`) are composed entirely from section components:
- `index.astro` — main invoicing product landing
- `firma-electronica.astro` — electronic signature product
- `carnaval.astro` — limited-time promotional campaign

**Components** (`/src/components/`) are single-responsibility section components (Hero, Prices, FAQ, CTA, etc.) — one per section. Naming convention: prefixed by product (`Signature*`, `Carnaval*`) or unprefixed for the main invoicing product.

**Layout** (`/src/layouts/Layout.astro`) wraps all pages; it injects Header, Footer, global meta tags (Open Graph, Twitter Card), and Spanish `lang="es"`. Pages pass `title` and `description` props.

**Scroll animations** — elements get `.reveal`, `.reveal-up`, `.reveal-left`, `.reveal-right`, or `.reveal-scale` CSS classes. `/src/scripts/scroll-reveal.js` uses IntersectionObserver to trigger them. Use `.reveal-delay-1` through `.reveal-delay-7` for staggered timing.

**Styling** — utility classes from Tailwind are used directly in `.astro` files. Global base styles and animation classes live in `/src/styles/global.css`.

**Assets** (`/src/assets/`) are imported in components with `import img from '../assets/example.png'` and passed to `<Image>` from `astro:assets` for optimization.

## Key Details

- The site is entirely in **Spanish**.
- External app link: `app.facec.ec`
- No backend — all contact/WhatsApp links are external URLs.
- Build output is in `dist/` (static HTML/CSS/JS).
