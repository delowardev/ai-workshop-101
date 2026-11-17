# Facilitator guide: Claude Code for Dev & QA (30 minutes)

> **First, rename this folder from `facilitator/` to `workshop/`.** `.claude/settings.json` denies Claude
> read access to `workshop/`, so these notes can't leak into the live demos.
> After the rename, edit these files yourself rather than through Claude.

## Before the day

- [ ] At claude.ai/code, connect GitHub and make sure the cloud environment can reach the npm registry
      and Google Fonts (the default "Trusted" network access allows both). Optional setup script: `npm ci`.
- [ ] Dry run both demos end to end. **Keep the dry-run PR and session open as your fallback**,
      then close that PR without merging so the page doesn't exist yet on the day.
- [ ] Have these tabs ready: the slides, the live site, claude.ai/code, the repo's `CLAUDE.md`.
- [ ] Share the slides from the deck's Share menu if attendees should get them.

## Run sheet

| Time | Slides | What you do |
|---|---|---|
| 00:00–03:00 | 1–4 | Intro: what Claude Code is and where it runs |
| 03:00–10:00 | 5–9 | Local vs cloud, CLAUDE.md, the toolkit, connectors (ClickUp, Sentry), skills, hooks and subagents. Show the real `CLAUDE.md` (its design rules) and `.claude/commands/` on GitHub. |
| 10:00–18:00 | 10–11 | **Demo 1** (below), then the recap slide |
| 18:00–25:00 | 12–13 | **Demo 2** (below), then the recap slide |
| 25:00–30:00 | 14–17 | Prompting, guardrails, homework, Q&A |

## Demo 1: build a new page (8 min)

1. Show the live homepage and point out that Pricing in the nav goes nowhere yet.
2. In claude.ai/code, choose the `ai-workshop-101` repo and ask Claude to build the Pricing page,
   reusing the header, footer and components, with a Playwright spec, and to open a pull request.
3. While it works, narrate: it reads `CLAUDE.md`, reuses `ButtonLink` and the tokens, adds `src/app/pricing/page.tsx`
   and `e2e/pricing.spec.ts`, and runs `npm test`.
4. Open the pull request: the diff, the new tests and the CI run.
5. Merge it (or show the dry-run one) and refresh the live site about a minute later: the page is deployed.

## Demo 2: QA partner (7 min)

1. Start a second cloud session (show that two can run in parallel) and send:

   ```
   /qa-tests homepage
   ```

   It picks up `docs/acceptance-criteria/homepage.md` by itself.
2. Claude writes a Playwright test per criterion, runs them in a real headless browser, including at phone width,
   and reports a table.
3. Show the report and any drafted bug report with `file:line` and a screenshot.
4. If time allows, go back to the demo 1 PR and run `/code-review` in that session.

## Fallbacks

- **Cloud session slow or failing:** switch to the dry-run PR and session you kept open.
- **CI slow:** show the CI run from the dry-run PR.
- **No network:** run `claude` locally in the repo and use the same prompts.

## Resetting after a rehearsal

Close the rehearsal PRs without merging and delete their branches.
