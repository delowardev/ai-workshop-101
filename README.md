# AI Workshop 101: Claude Code for development & QA

Sample repo for a 30-minute workshop on using Claude Code (locally and in the cloud) for development and QA.

The app is **QuickCart**, a deliberately small shopping cart with a few bugs left in on purpose.
It's small enough to understand in a minute and real enough to show the full loop:
issue → Claude Code session → failing test → fix → pull request → CI → human review.

## Run it

```bash
npm install
npm start          # http://localhost:3000
npm test           # unit tests (Vitest)
npm run e2e        # browser tests (Playwright)
```

## What's in here

| Path | What it is |
|---|---|
| `src/`, `public/` | The QuickCart app (Express API and a plain HTML/JS page) |
| `tests/`, `e2e/` | Unit tests and Playwright tests |
| `docs/acceptance-criteria/` | What each feature must do; used in the QA demo |
| `CLAUDE.md` | Team rules Claude reads at the start of every session |
| `.claude/commands/` | Shared slash commands: `/fix-issue <n>` and `/qa-tests <feature>` |
| `.claude/settings.json` | Pre-approved test commands; blocks Claude from reading `workshop/` |
| `.github/workflows/ci.yml` | Runs both test suites on every pull request |
| `facilitator/` | Facilitator guide, answer key and the GitHub issues to create. Rename it to `workshop/` so Claude can't read the answer key. |

## Try it yourself

1. Open [claude.ai/code](https://claude.ai/code) and pick this repository.
2. Developers: run `/fix-issue 2` and review the pull request it opens.
3. QA: run `/qa-tests discount codes` and read the report.
4. Then try `/code-review` on any open pull request.
