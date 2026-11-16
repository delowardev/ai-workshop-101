# QuickCart

A small shopping cart built with Next.js (App Router), React and TypeScript, used as the sample app for our Claude Code workshop.

## Commands

- `npm install`: install dependencies
- `npm run dev`: run the app on http://localhost:3000
- `npm run build`: production build (also catches type errors)
- `npm run typecheck`: TypeScript check
- `npm test`: unit tests (Vitest), in `tests/`
- `npm run e2e`: end-to-end tests (Playwright), in `e2e/`. Starts the app itself on port 3100.

## Layout

- `src/lib/cart.ts`: all cart, discount and shipping logic (pure functions, no React or Next imports)
- `src/lib/store.ts`: the in-memory cart and shared helpers for API routes
- `src/app/api/**/route.ts`: the API (route handlers under `/api`)
- `src/app/page.tsx` and `src/components/`: the UI. `Shop.tsx` is the client component that owns state.
- `docs/acceptance-criteria/`: what each feature must do. Treat these as the source of truth.

## Rules

- Business logic belongs in `src/lib/cart.ts`, not in components or route handlers.
- Money is always integer cents (`1250` = $12.50). Never use floats for money.
- Bug fixes start with a failing test that reproduces the bug. Show it failing, then fix.
- Make the smallest change that solves the problem. Don't refactor unrelated code.
- Run `npm test` and `npm run e2e` before every commit. Both must pass.
- New UI elements get a `data-testid` attribute; e2e tests select by `data-testid`.
- E2E tests call `POST /api/cart/reset` in `beforeEach` so each test starts with an empty cart.
- One issue per pull request. The PR description says what was wrong, what changed and how it was tested, and links the issue with `Fixes #N`.
- Never skip or delete a failing test to get a green build.
