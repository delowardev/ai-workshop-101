# Sender marketing site (redesign)

The marketing site for Sender's redesign, built with Next.js (App Router), React, TypeScript and Tailwind CSS v4.
It is a static site: it deploys to GitHub Pages as a static export, so there are no API routes or server code.
Only the homepage exists so far; other pages (Features, Pricing, Blog) are built next.

## Commands

- `npm install`: install dependencies
- `npm run dev`: run the site on http://localhost:3000
- `npm run build`: production build (also catches type errors)
- `npm run typecheck`: TypeScript check
- `npm run e2e`: end-to-end tests (Playwright), in `e2e/`. Starts the site itself on port 3100.
- `npm test`: type check, then the end-to-end tests

## Layout

- `src/app/`: routes. `page.tsx` is the homepage; a new page is `src/app/<name>/page.tsx`.
- `src/app/globals.css`: design tokens (`@theme`) and shared type styles (`heading-section`, `eyebrow`)
- `src/components/site/`: header and footer, shared by every page
- `src/components/home/`: one component per homepage section
- `src/components/ui/`: shared building blocks (`ButtonLink`, `EmailSignup`, icons)
- `src/content/site.ts`: navigation, integrations and footer links
- `src/assets/`: logos (SVG), imported so `next/image` adds the GitHub Pages base path
- `docs/acceptance-criteria/`: what each page must do. Treat these as the source of truth.

## Design rules

- Use the tokens, never raw hex: `bg-paper`, `bg-sand`, `border-line`, `brand-50…900`, `ink-100…900`, `text-success`.
- Fonts: `font-display` (Bricolage Grotesque) for headings, `font-sans` (Instrument Sans) for body and UI,
  `font-mono` (IBM Plex Mono) for labels and numbers.
- Orange `brand-500` is for fills and display type of 32px and up. Orange text on paper is `brand-700`.
  Text on an orange surface is `ink-900`, never white.
- One orange (primary) button per view. Buttons are pills with a minimum height of 44px.
- Content is max 1200px wide with 24px side padding. Sections are 96–128px apart.
- Every page must work at 390px wide with no horizontal scroll.

## Rules

- Reuse the components in `src/components/site` and `src/components/ui` before writing new ones.
- Images and logos go in `src/assets/` and are imported, never referenced as `/path` strings: plain paths break on GitHub Pages.
- Accessible markup: real `<a>`, `<button>`, `<label>`; decorative illustrations get `aria-hidden="true"`.
- Forms don't send anything: this is a static concept site.
- New pages get a Playwright spec in `e2e/` covering their acceptance criteria, including the phone width.
- Run `npm test` before every commit. It must pass.
- One issue per pull request. The PR description says what changed and how it was tested, and links the issue with `Fixes #N`.
- Never skip or delete a failing test to get a green build.
