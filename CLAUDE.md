# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page marketing site for Natalia Mordach, a psychodynamic psychotherapist. Built with Vite 8 + React 18 + TypeScript + Tailwind CSS 4 + shadcn/ui. Deployed to Netlify. All user-facing content is in Polish (`pl`, default) and Ukrainian (`uk`).

## Commands

```sh
npm install
npm run dev            # Vite dev server on port 8080
npm run build          # production build to dist/
npm run lint           # ESLint
npm run typecheck      # tsc for the app and node/test projects
npm test               # Vitest unit/component tests (src/test/)
npx vitest run src/test/contact.test.tsx   # a single test file
npm run test:e2e       # Playwright: functional + visual (builds and serves dist/)
npx playwright test --project=chromium     # functional e2e only (what CI runs)
npm run health-check   # validates dist/ after a build (health-check.js)
npm run verify         # everything above, in CI order
```

CI (`.github/workflows/health-check.yml`, Node 24) runs on push/PR to `main`: lint → typecheck → unit tests → build → health-check → functional e2e. Use `npm` (CI and Netlify use `package-lock.json`). Node 24 is pinned in `netlify.toml`, CI and `package.json` `engines`; a test keeps them in sync.

## Tests

- **Unit tests** (`src/test/`) cover localization, page sections and nav anchors, the contact form, and repo invariants: pl/uk key parity, the hidden Netlify form matching `Contact.tsx`, absolute site URLs and `index.html` links resolving to files in `public/`, Netlify headers/CSP, and a **dead-code test** that fails if any file in `src` is unreachable from `main.tsx` or any `dependencies` entry is unused. When you delete a component, uninstall the packages that only it used.
- **E2E** (`e2e/`) serves the build with the headers from `netlify.toml` applied (`e2e/fixtures.ts`) and **fails on any console error or CSP violation**. If you add a third-party script, font, frame or fetch target, update the CSP in `netlify.toml`.
- **Visual tests** (`e2e/visual.spec.ts`, project `visual`) compare screenshots against `e2e/__screenshots__/`. They run locally only (macOS rendering) and use a 1% tolerance, so subtle changes such as shadows or line heights are guarded by explicit computed-style checks in `site.spec.ts`. After an intentional visual change, run `npx playwright test --project=visual --update-snapshots` and review the new images.

## Architecture

- **One page, many sections.** `src/pages/Index.tsx` stacks section components from `src/components/` (Hero, About, Services, ForWho, HowIWork, Pricing, Location, Contact). The nav in `Header` links to section anchors by Polish `id`s (`#o-mnie`, `#oferta`, `#kontakt`, …), so keep the ids and `navItems` in sync. Routing (`App.tsx`, `react-router` v7) only has `/` and a catch-all `NotFound`; add new routes above the `*` route.
- **Localization is custom, not i18next.** `LocalizationProvider` (`src/contexts/LocalizationContext.tsx`) holds the locale; components call `const { t } = useTranslation()` (`src/hooks/useTranslation.ts`) and use dot-notation keys like `t('contact.toast.successTitle')`, with `{{param}}` interpolation. Strings live in `src/locales/pl.json` and `src/locales/uk.json`. **Every new key must be added to both files**; missing keys render as the key itself. Locale is persisted in localStorage under `preferred-locale`, else detected from the browser.
- **Contact form uses Netlify Forms.** `Contact.tsx` POSTs url-encoded data to `/` with `form-name=contact` and a `bot-field` honeypot, and shows the result with the Radix toaster (`@/hooks/use-toast`). A hidden static `<form name="contact">` in `index.html` lets Netlify detect the form at build time. If you add or rename fields, update both.
- **Styling.** Tailwind 4 with a CSS-first config: theme tokens (`@theme`), custom utilities (`section-padding`, `container-wide`, `heading-*`, `text-body*`) and HSL variables all live in `src/index.css`; there is no `tailwind.config.ts`. Don't define a `@theme` token as `var()` of a same-named `:root` variable; it resolves to nothing. Animations come from `tw-animate-css`. `src/components/ui/` contains only the shadcn components in use (`components.json`). Section entrance animations use framer-motion's `useInView`.
- **Assets.** Files referenced from `index.html` or by absolute URL (OG image, icons) must live in `public/` and use root-absolute paths, because hashed `/assets/*` names change on every build. Bundled images must stay under 250 KB (health-check); use WebP.
- `@/` aliases `src/`.
- `public/llms.txt`, `public/ai-readme.md`, and `public/.well-known/ai-plugin.json` are content summaries for AI crawlers; update them when site content (services, pricing, contact info) changes, along with SEO meta in `index.html`.

## Conventions (from `.jules/`)

- Lazy-load large images that appear below the fold.
- External links need `target="_blank"` and `rel="noopener noreferrer"` (covered by a test).
