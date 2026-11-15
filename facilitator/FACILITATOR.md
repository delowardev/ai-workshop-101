# Facilitator guide: Claude Code for Dev & QA (30 minutes)

> **First, rename this folder from `facilitator/` to `workshop/`.** `.claude/settings.json` already
> denies Claude read access to `workshop/`, so the answer key below can't leak into the live demos.
> After the rename, edit these files yourself rather than through Claude.

## Before the day

- [ ] Merge the setup branch into `main` so cloud sessions start from the sample app.
- [ ] Create the three GitHub issues from `issues/`, in order, so the shipping bug is **#1**.
- [ ] At claude.ai/code, connect GitHub and make sure the cloud environment can reach the npm registry
      (the default "Trusted" network access allows it). Optional setup script: `npm ci`.
- [ ] Dry run both demos end to end. **Keep the dry-run PR and session open as your fallback.**
      Then close that PR without merging so issue #1 is still open on the day.
- [ ] Have these tabs ready: the slides, GitHub issue #1, claude.ai/code, the repo's `CLAUDE.md`.
- [ ] Share the slides from the deck's Share menu if attendees should get them.

## Run sheet

| Time | Slides | What you do |
|---|---|---|
| 00:00–03:00 | 1–4 | Intro: what Claude Code is and where it runs |
| 03:00–10:00 | 5–9 | Local vs cloud, CLAUDE.md, the toolkit, connectors (ClickUp, Sentry), skills, hooks and subagents. Show the real `CLAUDE.md` and `.claude/commands/` on GitHub. |
| 10:00–18:00 | 10–11 | **Demo 1** (below), then the recap slide |
| 18:00–25:00 | 12–13 | **Demo 2** (below), then the recap slide |
| 25:00–30:00 | 14–17 | Prompting, guardrails, homework, Q&A |

## Demo 1: issue to pull request (8 min)

1. Show issue #1 on GitHub (2 T-shirts = $50.00, still charged $5.99).
2. Optional: open the running app and reproduce it in 20 seconds.
3. In claude.ai/code, choose the `ai-workshop-101` repo and send:

   ```
   /fix-issue 1
   ```

4. While it works (2–4 minutes), narrate: it reads the issue, finds `src/cart.js`, writes a failing test
   because `CLAUDE.md` says to, then fixes it. Point at each step as it appears.
5. Open the pull request: the description, the diff (a one-character fix plus a test), and the CI run.
6. Make the point: Claude opened the PR; a person merges it.

**Expected fix:** in `shippingCents()` in `src/cart.js`, `subtotal > FREE_SHIPPING_THRESHOLD_CENTS` becomes `>=`.

## Demo 2: QA partner (7 min)

1. Start a second cloud session (show that two can run in parallel) and send:

   ```
   /qa-tests discount codes
   ```

   It picks up `docs/acceptance-criteria/discount-codes.md` by itself.
2. Claude writes Playwright tests, runs them in a real headless browser and reports a table.
   **Criterion 3 fails:** `save10` and ` SAVE10 ` are rejected. Nobody filed that bug: this is the "aha" moment.
3. Show the drafted bug report with `file:line`. Optionally say "yes, open the issue".
4. If time allows, go back to the demo 1 PR and run `/code-review` in that session.

**Expected finding:** `applyDiscount()` looks up `DISCOUNT_CODES[code]` without `trim()` or `toUpperCase()`.

## Answer key: planted bugs

| Bug | Where | Found by |
|---|---|---|
| $50.00 exactly still pays shipping (`>` instead of `>=`) | `shippingCents()`, `src/cart.js` | Issue #1, demo 1 |
| Discount codes are case- and space-sensitive | `applyDiscount()`, `src/cart.js` | Demo 2, criterion 3 |
| Zero and negative quantities accepted | `addItem()`, `src/cart.js` | Issue #2, homework |
| Codes like `toString` or `constructor` are accepted and make the total `NaN` (plain-object lookup) | `applyDiscount()`, `src/cart.js` | Bonus: `/code-review` or `/security-review` often catches it |

Issue #3 (free-shipping hint) is a small feature for homework: UI, API data and an e2e test.

## Fallbacks

- **Cloud session slow or failing:** switch to the dry-run PR and session you kept open.
- **CI slow:** show the CI run from the dry-run PR.
- **No network:** run `claude` locally in the repo and use the same commands.

## Resetting after a rehearsal

Close the rehearsal PRs without merging and delete their branches. Reopen any issue they closed.
