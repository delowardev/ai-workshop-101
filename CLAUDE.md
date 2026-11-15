# QuickCart

A small shopping cart (Node.js + Express, plain HTML/JS front end) used as the sample app for our Claude Code workshop.

## Commands

- `npm install`: install dependencies
- `npm start`: run the app on http://localhost:3000
- `npm test`: unit tests (Vitest), in `tests/`
- `npm run e2e`: end-to-end tests (Playwright), in `e2e/`. Starts the server itself on port 3100.

## Layout

- `src/cart.js`: all cart, discount and shipping logic (pure functions)
- `src/server.js`: Express API under `/api`, serves `public/`
- `public/`: the web page (`index.html`, `app.js`, `styles.css`)
- `docs/acceptance-criteria/`: what each feature must do. Treat these as the source of truth.

## Rules

- Money is always integer cents (`1250` = $12.50). Never use floats for money.
- Bug fixes start with a failing test that reproduces the bug. Show it failing, then fix.
- Make the smallest change that solves the problem. Don't refactor unrelated code.
- Run `npm test` and `npm run e2e` before every commit. Both must pass.
- New UI elements get a `data-testid` attribute; e2e tests select by `data-testid`.
- E2E tests call `POST /api/cart/reset` in `beforeEach` so each test starts with an empty cart.
- One issue per pull request. The PR description says what was wrong, what changed and how it was tested, and links the issue with `Fixes #N`.
- Never skip or delete a failing test to get a green build.
